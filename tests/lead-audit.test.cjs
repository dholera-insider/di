const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { transformSync } = require('@babel/core');

// Local module harness: all upstream network/storage is replaced with explicit fakes.
function harness(overrides = {}) {
  const requests = [], documents = new Map();
  const env = { TELECRM_API_KEY: 'test-only', RECAPTCHA_SECRET_KEY: 'test-only', SANITY_API_WRITE_TOKEN: 'test-only' };
  const context = vm.createContext({
    Response, Request, Headers, URL, URLSearchParams, Buffer, AbortController, AbortSignal,
    setTimeout, clearTimeout, console: { error() {} }, process: { env },
    fetch: async (url, options) => {
      requests.push({ url, options });
      if (String(url).includes('/siteverify')) return Response.json({ success: true, hostname: 'localhost' });
      if (String(url).includes('api.telecrm.in')) return new Response(null, { status: 204 });
      throw new Error('Unexpected network request');
    }, ...overrides,
  });
  const cache = new Map();
  function load(file) {
    file = path.resolve(file);
    if (cache.has(file)) return cache.get(file).exports;
    const module = { exports: {} }; cache.set(file, module);
    const source = fs.readFileSync(file, 'utf8');
    const { code } = transformSync(source, { configFile: false, babelrc: false, plugins: ['@babel/plugin-transform-modules-commonjs'] });
    const localRequire = name => {
      if (name === '@/sanity/lib/client') return { client: { withConfig() { return { async createIfNotExists(doc) {
        if (!documents.has(doc._id)) documents.set(doc._id, doc);
        return documents.get(doc._id);
      } }; } } };
      if (name.startsWith('.')) return load(path.resolve(path.dirname(file), name) + (path.extname(name) ? '' : '.js'));
      return require(name);
    };
    vm.runInContext(`(function(require,module,exports){${code}\n})`, context)(localRequire, module, module.exports);
    return module.exports;
  }
  return { load, requests, documents, context, env };
}
const lead = (phone = '+919999999999') => ({ fullName: 'Test User', phone, recaptchaToken: 'fake-token' });
const request = (body, headers = {}) => new Request('http://localhost/api/lead', {
  method: 'POST', headers: { 'Content-Type': 'application/json', ...headers }, body: JSON.stringify(body),
});

test('lead API rejects malformed, oversized, cross-origin and invalid input before upstream calls', async () => {
  const h = harness(); const { POST } = h.load('src/app/api/lead/route.js');
  for (const body of [null, [], {}, {...lead(), fullName:' '}, {...lead(), phone:'abcdefgh'}, {...lead(), phone:'+012345678'}, {...lead(), recaptchaToken:''}, {fields:{ name:'Test', phone:'+919999999999', email:'bad'},recaptchaToken:'x'}]) {
    assert.equal((await POST(request(body))).status,400);
  }
  assert.equal((await POST(request(lead(), {Origin:'https://other.invalid'}))).status,403);
  assert.equal((await POST(request(lead(), {'Content-Type':'text/plain'}))).status,415);
  assert.equal((await POST(request({...lead(), fullName:'x'.repeat(17000)}))).status,413);
  assert.equal((await POST(new Request('http://localhost/api/lead',{method:'POST',headers:{'Content-Type':'application/json'},body:'{'}))).status,400);
  assert.equal(h.requests.length,0);
});

test('valid legacy and rich forms preserve allowed CRM fields and accept an empty 204 response', async () => {
  const h=harness(); const {POST}=h.load('src/app/api/lead/route.js');
  const response=await POST(request(lead()));
  assert.equal(response.status,200); assert.equal((await response.json()).success,true);
  const rich={fields:{name:'Rich User',phone:'+971501234567',email:'test@example.com',country:'UAE',message:'Details please',interestedIn:'Westwyn',source:'Contact'},source:'Dholera Insider Website - Contact Form',tags:['Contact Form'],recaptchaToken:'token2'};
  assert.equal((await POST(request(rich))).status,200);
  const sent=JSON.parse(h.requests.at(-1).options.body);
  assert.deepEqual(sent.fields,rich.fields); assert.deepEqual(sent.tags,rich.tags);
  assert.equal(sent.recaptchaToken,undefined);
});

test('concurrent/repeated leads for the same phone make only one CRM request', async () => {
  const h=harness(); const {POST}=h.load('src/app/api/lead/route.js');
  const results=await Promise.all([POST(request(lead())),POST(request(lead()))]);
  assert.deepEqual(results.map(r=>r.status).sort(),[200,409]);
  assert.equal(h.requests.filter(r=>r.url.includes('telecrm')).length,1);
});

test('CAPTCHA failure, wrong hostname, and missing secret fail closed', async () => {
  for(const result of [{success:false},{success:true,hostname:'other.invalid'}]) {
    const h=harness({fetch:async()=>Response.json(result)});h.env.RECAPTCHA_ALLOWED_HOSTNAMES='localhost';
    assert.equal((await h.load('src/app/api/lead/route.js').POST(request(lead()))).status,400);
  }
  const h=harness();delete h.env.RECAPTCHA_SECRET_KEY;
  assert.equal((await h.load('src/app/api/lead/route.js').POST(request(lead()))).status,503);
  assert.equal(h.requests.length,0);
});

test('CRM failure is sanitized and ambiguous retries remain blocked', async () => {
  const h=harness({fetch:async url=>String(url).includes('siteverify')?Response.json({success:true}):new Response('private upstream diagnostic',{status:500})});
  const {POST}=h.load('src/app/api/lead/route.js');
  const response=await POST(request(lead()));assert.equal(response.status,502);
  assert.ok(!(await response.text()).includes('private upstream'));
  assert.equal((await POST(request(lead()))).status,409);
});

test('upstream body/network failures are visible without leaking diagnostics', async () => {
  const h=harness({fetch:async url=>{
    if(String(url).includes('siteverify')) return Response.json({success:true});
    const e=new Error('private');e.name='AbortError';throw e;
  }});
  const r=await h.load('src/app/api/lead/route.js').POST(request(lead()));
  assert.equal(r.status,504);assert.match((await r.json()).message,/could not confirm/);
});

test('contact API validates, requires CAPTCHA, and atomically deduplicates documents', async () => {
  const h=harness();const {POST}=h.load('src/app/api/contact/route.js');
  assert.equal((await POST(request({}))).status,400);
  const body={name:'Test',email:'test@example.com',subject:'Enquiry',message:'Project details',recaptchaToken:'fake'};
  assert.equal((await POST(request({...body,email:'invalid'}))).status,400);
  assert.equal((await POST(request({...body,recaptchaToken:''}))).status,400);
  for(const r of await Promise.all([POST(request(body)),POST(request(body))])) assert.equal(r.status,200);
  assert.equal(h.documents.size,1);
});

test('request limiter returns 429 with retry guidance', async () => {
  const h=harness();const {POST}=h.load('src/app/api/lead/route.js');
  for(let i=0;i<120;i++) assert.equal((await POST(request({}))).status,400);
  const r=await POST(request({}));assert.equal(r.status,429);assert.equal(r.headers.get('retry-after'),'60');
});

test('analytics/storage failures cannot break a successful lead', async () => {
  let pushes=0;
  const h=harness({window:{location:{pathname:'/investor/oman'},dataLayer:{push(){pushes++;throw new Error('blocked')}},localStorage:{getItem(){throw Error()},setItem(){throw Error()}}},fetch:async()=>Response.json({success:true})});
  const client=h.load('src/lib/lead-client.js');
  assert.equal((await client.submitLead({method:'POST',body:'{}'})).status,200);
  assert.equal(pushes,1);assert.equal(client.leadStorage.getItem('x'),null);client.leadStorage.setItem('x','y');
});

test('failed submissions never produce conversion events', async () => {
  let pushes=0;const h=harness({window:{dataLayer:{push(){pushes++}}},fetch:async()=>Response.json({success:false,message:'Please retry'},{status:502})});
  await assert.rejects(h.load('src/lib/lead-client.js').submitLead({}),/Please retry/);
  assert.equal(pushes,0);
});

test('CAPTCHA resets only its owning widget, including widget ID zero', () => {
  const resets=[];let id=0;
  const h=harness({window:{grecaptcha:{render:()=>id++,reset:value=>resets.push(value)}}});
  const client=h.load('src/lib/lead-client.js');
  const a={hasChildNodes:()=>true}, b={hasChildNodes:()=>true};
  assert.equal(client.renderLeadCaptcha(a,{}),0);assert.equal(client.renderLeadCaptcha(b,{}),1);
  client.resetLeadCaptcha(a);client.resetLeadCaptcha(b);client.resetLeadCaptcha(null);
  assert.deepEqual(resets,[0,1]);
});
