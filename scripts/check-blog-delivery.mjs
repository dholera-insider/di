// Read-only post-deployment check; does not certify a Lighthouse score.
// Run: node scripts/check-blog-delivery.mjs [origin]
import { gzipSync } from 'node:zlib';

const origin = new URL(process.argv[2] || 'https://www.dholerainsider.com').origin;
const failures = [];
const assets = new Set();
const attributes = tag => Object.fromEntries(
  [...tag.matchAll(/([\w-]+)="([^"]*)"/g)]
    .map(([, key, value]) => [key.toLowerCase(), value.replaceAll('&amp;', '&')]),
);
const get = path => fetch(new URL(path, origin), {
  headers: { 'accept-encoding': 'gzip, br', 'user-agent': 'BlogDeliveryCheck/1.0' },
  signal: AbortSignal.timeout(30000),
});

const response = await get('/dholera-sir-blogs');
if (response.status !== 200) throw new Error(`Document HTTP ${response.status}`);
const html = await response.text();
const links = [...html.matchAll(/<link\b[^>]*>/g)].map(match => attributes(match[0]));
const picture = html.match(/<picture>[\s\S]*?data-blog-hero="true"[\s\S]*?<\/picture>/)?.[0];
const source = attributes(picture?.match(/<source\b[^>]*>/)?.[0] || '');
const image = attributes(picture?.match(/<img\b[^>]*>/)?.[0] || '');
const preload = links.find(link => link.rel === 'preload' && link.as === 'image' && link.type === 'image/avif');
if (image.loading !== 'eager' || image.fetchpriority !== 'high') failures.push('Blog hero is missing eager loading/high fetch priority in server HTML.');
if (!preload || preload.imagesrcset !== source.srcset || preload.imagesizes !== source.sizes) failures.push('Hero preload must match the responsive AVIF source.');
if (!links.some(link => link.rel === 'canonical' && link.href === `${origin}/dholera-sir-blogs`)) failures.push('Listing canonical is missing or unexpected (use the production origin).');

for (const link of links) if (link.rel === 'stylesheet' && link.href?.startsWith('/_next/static/')) assets.add(link.href);
for (const match of html.matchAll(/<script\b[^>]*>/g)) {
  const script = attributes(match[0]);
  if (!/\bnomodule\b/i.test(match[0]) && script.src?.startsWith('/_next/static/')) assets.add(script.src);
}
for (const candidate of (source.srcset || '').split(',')) {
  const path = candidate.trim().split(/\s+/)[0];
  if (!path) continue;
  const hero = await get(path);
  if (!hero.ok || !hero.headers.get('content-type')?.includes('image/avif')) failures.push(`${path}: AVIF unavailable.`);
  if (!/immutable/.test(hero.headers.get('cache-control') || '')) failures.push(`${path}: versioned image is missing immutable caching.`);
  await hero.arrayBuffer();
}

let decodedBytes = 0;
let gzipBytes = 0;
await Promise.all([...assets].map(async path => {
  const asset = await get(path);
  const body = Buffer.from(await asset.arrayBuffer());
  decodedBytes += body.length;
  gzipBytes += gzipSync(body).length;
  if (!asset.ok) failures.push(`${path}: HTTP ${asset.status}.`);
  const compressed = /^(gzip|br)$/.test(asset.headers.get('content-encoding') || '');
  if (body.length >= 1024 && !compressed) failures.push(`${path}: ${body.length} bytes served without gzip/Brotli.`);
  if (compressed && !/accept-encoding/i.test(asset.headers.get('vary') || '')) failures.push(`${path}: missing Vary: Accept-Encoding.`);
  if (!/immutable/.test(asset.headers.get('cache-control') || '')) failures.push(`${path}: versioned asset is missing immutable caching.`);
}));
console.log(`Checked ${assets.size} CSS/JS assets: ${decodedBytes} decoded bytes; ${gzipBytes} bytes if gzipped locally.`);
if (failures.length) {
  console.error('Blog delivery check FAILED:\n' + failures.map(failure => `- ${failure}`).join('\n'));
  process.exitCode = 1;
} else console.log('Delivery checks passed. Run mobile/desktop Lighthouse and verify navigation, forms and tracking next.');
