// Run: node --test scripts/contact-form.test.mjs
// Google and TeleCRM are mocked; these tests never create real leads.
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import test from "node:test";

const require = createRequire(import.meta.url);
const { JSDOM } = require("jsdom");
const { transformSync } = require("next/dist/build/swc");
const dom = new JSDOM("<!doctype html><html><head></head><body></body></html>", {
  url: "https://www.dholerainsider.com/",
});
for (const name of ["window", "document", "localStorage", "HTMLElement", "Event", "MouseEvent"]) {
  globalThis[name] = dom.window[name];
}
globalThis.IS_REACT_ACT_ENVIRONMENT = true;
const React = require("react");
const { act } = React;
const { createRoot } = require("react-dom/client");

function compile(filename, mocks = {}) {
  const { code } = transformSync(readFileSync(new URL("../" + filename, import.meta.url), "utf8"), {
    filename,
    jsc: { parser: { syntax: "ecmascript", jsx: true }, target: "es2022", transform: { react: { runtime: "automatic" } } },
    module: { type: "commonjs" },
  });
  const mod = { exports: {} };
  new Function("require", "module", "exports", code)(
    (name) => Object.hasOwn(mocks, name) ? mocks[name] : require(name), mod, mod.exports,
  );
  return mod.exports;
}

const phoneModule = compile("src/app/components/InternationalPhoneInput.jsx", {
  "react-phone-input-2/lib/style.css": {},
});
const ContactForm = compile("src/app/components/Contactform.jsx", {
  "./InternationalPhoneInput": phoneModule,
  "framer-motion": {
    motion: { div: ({ initial, animate, exit, transition, ...props }) => React.createElement("div", props) },
  },
}).default;
const { POST } = compile("src/app/api/lead/route.js");
const json = (body, status = 200) => Response.json(body, { status });
const validLead = { fullName: "Test Visitor", phone: "+919876543210", recaptchaToken: "test-token" };
const leadRequest = (body = validLead, url = "https://www.dholerainsider.com/api/lead") => new Request(url, {
  method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body),
});

function serverConfig(t, overrides = {}) {
  const config = {
    TELECRM_API_KEY: "test-server-key", RECAPTCHA_SECRET_KEY: "test-secret", RECAPTCHA_ALLOWED_HOSTNAMES: "",
    NODE_ENV: "production", ...overrides,
  };
  for (const [key, value] of Object.entries(config)) {
    const previous = process.env[key];
    process.env[key] = value;
    t.after(() => previous === undefined ? delete process.env[key] : process.env[key] = previous);
  }
}

async function mountForm(t, {
  widgetId = 7, ready = true, strict = false, existingScript = false, storage = {},
  url = "https://www.dholerainsider.com/", nodeEnv = "production", siteKey = "test-site-key",
  submit = () => json({ success: true }),
} = {}) {
  const previousUrl = window.location.href;
  const previousNodeEnv = process.env.NODE_ENV;
  dom.reconfigure({ url });
  process.env.NODE_ENV = nodeEnv;
  document.head.innerHTML = "";
  document.body.innerHTML = "<div id='root'></div>";
  if (existingScript) {
    const script = document.createElement("script");
    script.src = "https://www.google.com/recaptcha/api.js";
    script.id = "another-form-captcha-script";
    document.head.appendChild(script);
  }
  localStorage.clear();
  for (const [key, value] of Object.entries(storage)) localStorage.setItem(key, value);
  window.dataLayer = [];
  const previousKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
  process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY = siteKey;
  t.after(() => previousKey === undefined ? delete process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY : process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY = previousKey);

  const requests = [];
  const resets = [];
  const renders = [];
  const captcha = {
    render(container, options) {
      assert.ok(container instanceof HTMLElement);
      renders.push(options);
      return widgetId;
    },
    reset(id) { resets.push(id); },
  };
  window.grecaptcha = ready ? captcha : {};
  t.mock.method(globalThis, "fetch", async (url, options) => {
    if (url === "/api/country") return json({ country: "in" });
    assert.equal(url, "/api/lead", "the browser must submit through the existing server endpoint");
    requests.push({ url, ...options });
    return submit(url, options);
  });
  t.mock.method(console, "error", () => {});
  let closeCount = 0;
  const root = createRoot(document.getElementById("root"));
  t.after(async () => {
    await act(() => root.unmount());
    delete window.grecaptcha;
    dom.reconfigure({ url: previousUrl });
    if (previousNodeEnv !== nodeEnv) {
      if (previousNodeEnv === undefined) delete process.env.NODE_ENV;
      else process.env.NODE_ENV = previousNodeEnv;
    }
  });
  const element = React.createElement(ContactForm, { onClose: () => { closeCount++; } });
  await act(() => root.render(strict ? React.createElement(React.StrictMode, null, element) : element));

  const change = async (name, value) => {
    const input = document.querySelector(`input[name="${name}"]`);
    assert.ok(input, `missing ${name} input`);
    await act(() => {
      Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value").set.call(input, value);
      input.dispatchEvent(new Event("input", { bubbles: true }));
    });
  };
  return {
    requests, resets, renders, captcha, root,
    change,
    fill: async (name = "Test Visitor", phone = "+91 98765 43210") => {
      await change("fullName", name);
      await change("phone", phone);
    },
    verify: async (token = "test-token") => act(() => renders[0].callback(token)),
    submit: async () => act(async () => {
      document.querySelector("form").dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
    }),
    button: () => document.querySelector('button[type="submit"]'),
    alert: () => document.querySelector('[role="alert"]')?.textContent || "",
    closeCount: () => closeCount,
  };
}

test("visitors can fill the real name/phone inputs and submit current values through /api/lead", async (t) => {
  const form = await mountForm(t);
  await form.fill();
  await form.verify();
  assert.equal(form.requests.length, 0, "completing CAPTCHA must not submit stale input values");
  await form.change("fullName", "  Updated Visitor  ");
  await form.submit();
  assert.deepEqual(JSON.parse(form.requests[0].body), { ...validLead, fullName: "Updated Visitor" });
  assert.deepEqual(form.requests[0].headers, { "Content-Type": "application/json" });
  assert.match(document.body.textContent, /Thank You!/);
  assert.deepEqual(window.dataLayer, [{ event: "lead_form" }]);
  assert.equal(localStorage.getItem("formSubmissionCount"), "1");
  assert.deepEqual(form.resets, [7]);
});

test("missing, expired, or failed CAPTCHA never submits and permits verification again", async (t) => {
  const form = await mountForm(t);
  await form.fill();
  await form.submit();
  assert.match(form.alert(), /complete the verification/i);
  assert.equal(form.button().disabled, false);
  await form.verify();
  await act(() => form.renders[0]["expired-callback"]());
  assert.match(form.alert(), /expired/i);
  await form.submit();
  assert.equal(form.requests.length, 0);
  await act(() => form.renders[0]["error-callback"]());
  assert.match(form.alert(), /check your connection/i);
  await form.verify("replacement-token");
  await form.submit();
  assert.equal(JSON.parse(form.requests[0].body).recaptchaToken, "replacement-token");
  assert.match(document.body.textContent, /Thank You!/);
});

test("a CRM rejection preserves input and retries with a new token, including widget ID zero", async (t) => {
  let attempt = 0;
  const form = await mountForm(t, { widgetId: 0, submit: () => ++attempt === 1
    ? json({ success: false, message: "CRM is temporarily unavailable." }, 502)
    : json({ success: true }) });
  await form.fill();
  await form.verify();
  await form.submit();
  assert.match(form.alert(), /CRM is temporarily unavailable/);
  assert.equal(document.querySelector('input[name="fullName"]').value, "Test Visitor");
  assert.equal(document.querySelector('input[name="phone"]').value.replace(/\D/g, ""), "919876543210");
  assert.equal(localStorage.getItem("formSubmissionCount"), null);
  assert.equal(window.dataLayer.length, 0);
  assert.deepEqual(form.resets, [0]);
  await form.submit();
  assert.equal(form.requests.length, 1, "a used token must not be submitted again");
  await form.verify("retry-token");
  await form.submit();
  assert.equal(form.requests.length, 2);
  assert.equal(localStorage.getItem("formSubmissionCount"), "1");
  assert.deepEqual(form.resets, [0, 0]);
});

test("network failures leave the form editable and recover on retry", async (t) => {
  let attempt = 0;
  const form = await mountForm(t, { submit: () => {
    if (++attempt === 1) throw new TypeError("Failed to fetch");
    return json({ success: true });
  } });
  await form.fill();
  await form.verify();
  await form.submit();
  assert.match(form.alert(), /Failed to fetch/);
  assert.equal(form.button().disabled, false);
  assert.equal(document.querySelector('input[name="fullName"]').disabled, false);
  await form.verify("new-token");
  await form.submit();
  assert.match(document.body.textContent, /Thank You!/);
});

test("duplicate submit events produce one request while the input is locked", async (t) => {
  let resolve;
  const pending = new Promise((done) => { resolve = done; });
  const form = await mountForm(t, { submit: () => pending });
  await form.fill();
  await form.verify();
  await form.submit();
  await form.submit();
  assert.equal(form.requests.length, 1);
  assert.equal(form.button().disabled, true);
  assert.equal(document.querySelector('input[name="fullName"]').disabled, true);
  assert.equal(document.querySelector('input[name="phone"]').disabled, true);
  await act(() => resolve(json({ success: true })));
  assert.match(document.body.textContent, /Thank You!/);
});

test("HTTP 200 without explicit server success does not show success or count a lead", async (t) => {
  const form = await mountForm(t, { submit: () => json({ success: false, message: "Lead was rejected." }) });
  await form.fill();
  await form.verify();
  await form.submit();
  assert.match(form.alert(), /Lead was rejected/);
  assert.doesNotMatch(document.body.textContent, /Thank You!/);
  assert.equal(localStorage.getItem("formSubmissionCount"), null);
});

test("restricted browser storage and analytics errors do not turn accepted leads into failures", async (t) => {
  t.mock.method(window.Storage.prototype, "getItem", () => { throw new Error("Storage blocked"); });
  t.mock.method(window.Storage.prototype, "setItem", () => { throw new Error("Storage blocked"); });
  const form = await mountForm(t);
  window.dataLayer = { push() { throw new Error("Analytics blocked"); } };
  await form.fill();
  await form.verify();
  await form.submit();
  assert.match(document.body.textContent, /Thank You!/);
  assert.equal(form.alert(), "");
});

test("whitespace names and incomplete phone numbers never reach the server", async (t) => {
  const form = await mountForm(t);
  await form.fill("   ");
  await form.verify();
  await form.submit();
  assert.match(form.alert(), /fill in all fields/i);
  await form.fill("Test Visitor", "+91 123");
  await form.submit();
  assert.match(form.alert(), /valid international phone/i);
  assert.equal(form.requests.length, 0);
});

test("the existing daily submission limit is preserved", async (t) => {
  const form = await mountForm(t, { storage: { formSubmissionCount: "3", lastSubmissionTime: String(Date.now()) } });
  await form.fill();
  await form.verify();
  await form.submit();
  assert.match(form.alert(), /maximum submission limit/);
  assert.equal(form.requests.length, 0);
});

test("an expired limit starts at one after the next successful submission", async (t) => {
  const form = await mountForm(t, { storage: {
    formSubmissionCount: "3", lastSubmissionTime: String(Date.now() - 25 * 60 * 60 * 1000),
  } });
  await form.fill();
  await form.verify();
  await form.submit();
  assert.match(document.body.textContent, /Thank You!/);
  assert.equal(localStorage.getItem("formSubmissionCount"), "1");
});

test("an existing loading script is reused until the widget API becomes ready", async (t) => {
  const form = await mountForm(t, { ready: false, existingScript: true });
  const script = document.querySelector('script[src^="https://www.google.com/recaptcha/api.js"]');
  assert.equal(script.id, "another-form-captcha-script");
  await act(() => script.dispatchEvent(new Event("load")));
  assert.equal(form.button().disabled, true, "script load alone does not make CAPTCHA ready");
  await act(async () => {
    window.grecaptcha = form.captcha;
    await new Promise((resolve) => setTimeout(resolve, 125));
  });
  assert.equal(document.querySelectorAll('script[src^="https://www.google.com/recaptcha/api.js"]').length, 1);
  assert.equal(form.renders.length, 1);
  assert.equal(form.button().disabled, false);
});

test("script failures report the problem without falsely enabling verification", async (t) => {
  const form = await mountForm(t, { ready: false });
  await act(() => document.querySelector("script").dispatchEvent(new Event("error")));
  assert.match(form.alert(), /Verification could not load/);
  assert.equal(form.button().disabled, true);
  assert.equal(form.requests.length, 0);
});

test("Strict Mode reuses this widget and never resets another form's widget", async (t) => {
  const form = await mountForm(t, { widgetId: 12, strict: true });
  assert.equal(form.renders.length, 1);
  await form.fill();
  await form.verify();
  await form.submit();
  assert.match(document.body.textContent, /Thank You!/);
  assert.ok(form.resets.length >= 1);
  assert.ok(form.resets.every((id) => id === 12));
});

test("the actual server route verifies CAPTCHA then maps the UI submission to CRM fields", async (t) => {
  serverConfig(t);
  const upstream = [];
  const form = await mountForm(t, { submit: (_url, options) => POST(leadRequest(JSON.parse(options.body))) });
  t.mock.method(globalThis, "fetch", async (url, options) => {
    if (url === "/api/country") return json({ country: "in" });
    if (url === "/api/lead") return POST(leadRequest(JSON.parse(options.body)));
    upstream.push({ url, ...options });
    if (url === "https://www.google.com/recaptcha/api/siteverify") return json({ success: true });
    assert.equal(url, "https://api.telecrm.in/enterprise/67a30ac2989f94384137c2ff/autoupdatelead");
    return new Response(null, { status: 204 });
  });
  await form.fill("  Test Visitor  ");
  await form.verify();
  await form.submit();
  assert.equal(upstream.length, 2);
  assert.equal(new URLSearchParams(upstream[0].body).get("response"), "test-token");
  assert.equal(upstream[1].headers.Authorization, "Bearer test-server-key");
  assert.deepEqual(JSON.parse(upstream[1].body), {
    fields: { name: "Test Visitor", phone: "+919876543210", source: "Dholera Insider" },
    source: "Dholera Insider Website", tags: ["Dholera Investment", "Website Lead"],
  });
  assert.match(document.body.textContent, /Thank You!/);
});

test("the server blocks invalid fields or rejected CAPTCHA before contacting CRM", async (t) => {
  serverConfig(t);
  const upstream = [];
  t.mock.method(globalThis, "fetch", async (url) => {
    upstream.push(url);
    return json({ success: false, "error-codes": ["timeout-or-duplicate"] });
  });
  for (const body of [{ ...validLead, fullName: "   " }, { ...validLead, recaptchaToken: "" }]) {
    assert.equal((await POST(leadRequest(body))).status, 400);
  }
  assert.equal(upstream.length, 0);
  const response = await POST(leadRequest());
  assert.equal(response.status, 400);
  assert.equal((await response.json()).success, false);
  assert.deepEqual(upstream, ["https://www.google.com/recaptcha/api/siteverify"]);
});

test("the server never reports CRM authentication, rate limit, or service failures as success", async (t) => {
  serverConfig(t);
  t.mock.method(console, "error", () => {});
  for (const status of [401, 429, 500]) {
    const mock = t.mock.method(globalThis, "fetch", async (url) => url.includes("siteverify")
      ? json({ success: true }) : json({ message: "CRM rejected lead" }, status));
    const response = await POST(leadRequest());
    assert.equal(response.status, status === 429 ? 429 : 502);
    assert.equal((await response.json()).success, false);
    mock.mock.restore();
  }
});

for (const hostname of ["localhost", "127.0.0.1", "[::1]"]) {
  test(`the development modal on ${hostname} submits to CRM without loading CAPTCHA`, async (t) => {
    serverConfig(t, { NODE_ENV: "development", RECAPTCHA_SECRET_KEY: "" });
    const baseUrl = `http://${hostname}:3000/`;
    const form = await mountForm(t, {
      url: baseUrl, nodeEnv: "development", siteKey: "", ready: false, strict: true,
    });
    const upstream = [];
    t.mock.method(globalThis, "fetch", async (url, options) => {
      if (url === "/api/country") return json({ country: "in" });
      if (url === "/api/lead") {
        assert.deepEqual(JSON.parse(options.body), {
          fullName: "Test Visitor", phone: "+919876543210", formType: "contact-modal",
        });
        return POST(leadRequest(JSON.parse(options.body), `${baseUrl}api/lead`));
      }
      upstream.push({ url, ...options });
      assert.equal(url, "https://api.telecrm.in/enterprise/67a30ac2989f94384137c2ff/autoupdatelead");
      return new Response(null, { status: 204 });
    });
    assert.equal(form.alert(), "");
    assert.equal(form.button().disabled, false);
    assert.equal(document.querySelector("script"), null);
    assert.equal(form.renders.length, 0);
    await form.fill("  Test Visitor  ");
    await form.submit();
    assert.equal(upstream.length, 1);
    assert.deepEqual(JSON.parse(upstream[0].body), {
      fields: { name: "Test Visitor", phone: "+919876543210", source: "Dholera Insider" },
      source: "Dholera Insider Website", tags: ["Dholera Investment", "Website Lead"],
    });
    assert.equal(upstream[0].headers.Authorization, "Bearer test-server-key");
    assert.match(document.body.textContent, /Thank You!/);
    assert.deepEqual(window.dataLayer, [{ event: "lead_form" }]);
    assert.equal(localStorage.getItem("formSubmissionCount"), "1");
  });
}

for (const [nodeEnv, hostname] of [
  ["production", "localhost"],
  ["production", "www.dholerainsider.com"],
  ["development", "www.dholerainsider.com"],
  ["development", "localhost.example.com"],
]) {
  test(`${nodeEnv} on ${hostname} still requires verification in the modal and server`, async (t) => {
    serverConfig(t, { NODE_ENV: nodeEnv });
    const baseUrl = `http://${hostname}:3000/`;
    const form = await mountForm(t, { url: baseUrl, nodeEnv });
    assert.equal(form.renders.length, 1);
    await form.fill();
    await form.submit();
    assert.match(form.alert(), /complete the verification/i);
    assert.equal(form.requests.length, 0);
    const response = await POST(leadRequest({
      fullName: "Test Visitor", phone: "+919876543210", formType: "contact-modal",
    }, `${baseUrl}api/lead`));
    assert.equal(response.status, 400, "a client flag alone must not bypass verification");
  });
}

test("other forms on localhost still require CAPTCHA in development", async (t) => {
  serverConfig(t, { NODE_ENV: "development" });
  const upstream = [];
  t.mock.method(globalThis, "fetch", async (url) => {
    upstream.push(url);
    return json({ success: false });
  });
  for (const formType of [undefined, "event-consultation"]) {
    const response = await POST(leadRequest({
      fullName: "Test Visitor", phone: "+919876543210", formType,
    }, "http://localhost:3000/api/lead"));
    assert.equal(response.status, 400);
  }
  assert.deepEqual(upstream, []);
  const response = await POST(leadRequest(validLead, "http://localhost:3000/api/lead"));
  assert.equal(response.status, 400);
  assert.deepEqual(upstream, ["https://www.google.com/recaptcha/api/siteverify"]);
});

test("a localhost CRM failure preserves the form and can retry without CAPTCHA", async (t) => {
  let attempt = 0;
  const form = await mountForm(t, {
    url: "http://localhost:3000/", nodeEnv: "development", ready: false,
    submit: () => ++attempt === 1
      ? json({ success: false, message: "CRM is temporarily unavailable." }, 502)
      : json({ success: true }),
  });
  await form.fill();
  await form.submit();
  assert.match(form.alert(), /CRM is temporarily unavailable/);
  assert.equal(document.querySelector('input[name="fullName"]').value, "Test Visitor");
  assert.equal(localStorage.getItem("formSubmissionCount"), null);
  assert.equal(form.button().disabled, false);
  await form.submit();
  assert.equal(form.requests.length, 2);
  assert.match(document.body.textContent, /Thank You!/);
});
