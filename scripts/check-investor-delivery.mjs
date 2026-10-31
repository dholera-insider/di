// Read-only production check. Run: node scripts/check-investor-delivery.mjs [origin]
import http from 'node:http';
import https from 'node:https';
import { gunzipSync, brotliDecompressSync, inflateSync } from 'node:zlib';

const origin = new URL(process.argv[2] || 'https://www.dholerainsider.com').origin;
const countries = ['bahrain', 'dubai', 'oman', 'kuwait', 'singapore', 'qatar', 'hong-kong', 'saudi-arabia'];
const failures = [];
const assets = new Set();

function get(url) {
  return new Promise((resolve, reject) => {
    const transport = url.startsWith('https:') ? https : http;
    const request = transport.get(url, { headers: { 'accept-encoding': 'gzip, br', 'user-agent': 'InvestorDeliveryCheck/1.0' }, timeout: 30000 }, response => {
      const chunks = [];
      response.on('data', chunk => chunks.push(chunk));
      response.on('error', reject);
      response.on('end', () => {
        try {
          const body = Buffer.concat(chunks);
          const encoding = response.headers['content-encoding'];
          const decoded = encoding === 'gzip' ? gunzipSync(body) : encoding === 'br' ? brotliDecompressSync(body) : encoding === 'deflate' ? inflateSync(body) : body;
          resolve({ status: response.statusCode, headers: response.headers, body, decoded });
        } catch (error) { reject(error); }
      });
    });
    request.on('timeout', () => request.destroy(new Error('Request timed out: ' + url)));
    request.on('error', reject);
  });
}

function attributes(tag) {
  return Object.fromEntries([...tag.matchAll(/([\w-]+)="([^"]*)"/g)].map(([, key, value]) => [key.toLowerCase(), value.replaceAll('&amp;', '&')]));
}

for (const country of countries) {
  const url = `${origin}/investor/${country}`;
  const response = await get(url);
  if (response.status !== 200) { failures.push(`${country}: document HTTP ${response.status}`); continue; }
  const html = response.decoded.toString('utf8');
  const links = [...html.matchAll(/<link\b[^>]*>/g)].map(match => attributes(match[0]));
  const scripts = [...html.matchAll(/<script\b[^>]*>/g)].map(match => attributes(match[0]));
  for (const link of links) if (link.rel === 'stylesheet' && link.href?.startsWith('/_next/static/')) assets.add(link.href);
  for (const script of scripts) if (script.src?.startsWith('/_next/static/')) assets.add(script.src);
  const picture = html.match(/<picture>[\s\S]*?<\/picture>/)?.[0];
  const source = attributes(picture?.match(/<source\b[^>]*>/)?.[0] || '');
  const image = attributes(picture?.match(/<img\b[^>]*>/)?.[0] || '');
  if (image['data-investor-hero'] !== country || image.loading !== 'eager' || image.fetchpriority !== 'high') failures.push(`${country}: hero must be eagerly loaded with high priority in server HTML`);
  const preload = links.find(link => link.rel === 'preload' && link.as === 'image' && link.type === 'image/avif');
  if (!preload || preload.imagesrcset !== source.srcset || preload.imagesizes !== source.sizes) failures.push(`${country}: hero preload does not match the picture source`);
  const heroUrl = source.srcset?.split(',').at(-1)?.trim().split(/\s+/)[0];
  if (heroUrl) {
    const hero = await get(new URL(heroUrl, origin).href);
    if (hero.status !== 200 || !hero.headers['content-type']?.includes('image/avif')) failures.push(`${country}: static AVIF hero is unavailable`);
  } else failures.push(`${country}: static AVIF source is missing`);
  console.log(`${country}: HTTP ${response.status}; document ${response.body.length} bytes on wire; hero/preload checked`);
}

let totalRaw = 0;
let totalWire = 0;
for (const asset of assets) {
  const response = await get(new URL(asset, origin).href);
  totalRaw += response.decoded.length;
  totalWire += response.body.length;
  if (response.status !== 200) failures.push(`${asset}: HTTP ${response.status}`);
  if (response.decoded.length >= 1024 && !/^(gzip|br)$/.test(response.headers['content-encoding'] || '')) failures.push(`${asset}: ${response.decoded.length} bytes served without gzip/Brotli`);
  if (response.headers['content-encoding'] && !/accept-encoding/i.test(response.headers.vary || '')) failures.push(`${asset}: compressed response is missing Vary: Accept-Encoding`);
  if (!/immutable/.test(response.headers['cache-control'] || '')) failures.push(`${asset}: versioned static asset is missing immutable cache policy`);
}
console.log(`Checked ${assets.size} unique CSS/JS assets: ${totalRaw} decoded bytes, ${totalWire} bytes on wire.`);
if (failures.length) {
  console.error('\nDeployment delivery check FAILED:\n' + failures.map(failure => '- ' + failure).join('\n'));
  process.exitCode = 1;
} else console.log('Deployment delivery check passed. Run mobile and desktop Lighthouse next; this check does not certify a performance score.');
