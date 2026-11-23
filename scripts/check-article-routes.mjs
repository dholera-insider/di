// Read-only deployment check. Run after deploying:
// node scripts/check-article-routes.mjs https://www.dholerainsider.com
// Optional third argument: path to the sitemap XML saved before deployment.
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { ARTICLE_ORIGIN, ARTICLE_SECTIONS } from '../src/lib/article-routes.mjs';

const origin = new URL(process.argv[2] || ARTICLE_ORIGIN).origin;
const get = pathname => fetch(new URL(pathname, origin), {
  redirect: 'manual',
  headers: { 'user-agent': 'ArticleOwnershipCheck/1.0' },
  signal: AbortSignal.timeout(30000),
});
const attributes = tag => Object.fromEntries(
  [...tag.matchAll(/([\w-]+)="([^"]*)"/g)].map(([, key, value]) => [key.toLowerCase(), value.replaceAll('&amp;', '&')]),
);
const sitemapResponse = await get('/sitemap.xml');
assert.equal(sitemapResponse.status, 200, 'Sitemap must load without a redirect');
const sitemap = await sitemapResponse.text();
const entries = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match => new URL(match[1].replaceAll('&amp;', '&')));
assert.equal(new Set(entries.map(url => url.href)).size, entries.length, 'Sitemap contains duplicate URLs');
assert.equal(new Set(entries.map(url => url.pathname)).size, entries.length, 'Sitemap contains duplicate paths');
for (const url of entries) {
  assert.equal(url.origin, ARTICLE_ORIGIN, `${url.href}: sitemap must use the canonical origin`);
  assert.equal(url.search, '', `${url.href}: sitemap must not contain query variants`);
  assert.equal(url.hash, '', `${url.href}: sitemap must not contain fragments`);
}
const articles = entries.filter(url => ARTICLE_SECTIONS.some(section => url.pathname.startsWith('/' + section + '/')));
const staticPages = entries.filter(url => !articles.includes(url));
assert.ok(articles.length, 'Sitemap contains no articles');
const owners = new Map();
for (const article of articles) {
  const slug = article.pathname.split('/').pop();
  assert.ok(!owners.has(slug), `${slug}: sitemap exposes more than one primary URL`);
  owners.set(slug, article.pathname);
}

const failures = [];
const documentTitles = new Map();
let cursor = 0;
let checked = 0;
let staticChecked = 0;
let previousChecked = 0;
await Promise.all(Array.from({ length: Math.min(4, articles.length) }, async () => {
  while (cursor < articles.length) {
    const article = articles[cursor++];
    try {
      const canonicalPath = article.pathname;
      const slug = canonicalPath.split('/').pop();
      const primary = await get(canonicalPath);
      assert.equal(primary.status, 200, `${canonicalPath}: primary must render, not redirect`);
      const html = await primary.text();
      const head = html.match(/<head\b[^>]*>([\s\S]*?)<\/head>/i)?.[1] || '';
      // SVG title elements within article illustrations are not document titles.
      const titles = [...head.matchAll(/<title\b[^>]*>([\s\S]*?)<\/title>/gi)];
      assert.equal(titles.length, 1, `${canonicalPath}: expected one document title`);
      assert.ok(titles[0][1].trim(), `${canonicalPath}: title is empty`);
      const title = titles[0][1].trim().toLowerCase();
      assert.ok(!documentTitles.has(title), `${canonicalPath}: duplicates the title at ${documentTitles.get(title)}`);
      documentTitles.set(title, canonicalPath);
      const canonical = [...head.matchAll(/<link\b[^>]*>/gi)]
        .map(match => attributes(match[0])).filter(link => link.rel === 'canonical');
      assert.equal(canonical.length, 1, `${canonicalPath}: expected one canonical`);
      assert.equal(canonical[0].href, ARTICLE_ORIGIN + canonicalPath);
      for (const section of ARTICLE_SECTIONS) {
        const alternatePath = `/${section}/${slug}`;
        if (alternatePath === canonicalPath) continue;
        const alternate = await get(alternatePath + '?utm_source=ownership-check');
        assert.equal(alternate.status, 308, `${alternatePath}: alternate still renders or uses an HTML-only redirect`);
        const location = alternate.headers.get('location');
        assert.ok(location, `${alternatePath}: missing redirect destination`);
        const destination = new URL(location, origin);
        assert.equal(destination.origin, origin);
        assert.equal(destination.pathname, canonicalPath, `${alternatePath}: wrong destination or redirect chain`);
        assert.equal(destination.searchParams.get('utm_source'), 'ownership-check');
        await alternate.arrayBuffer();
      }
      checked++;
    } catch (error) {
      failures.push(error.message);
    }
  }
}));

const previousUrls = process.argv[3]
  ? [...readFileSync(process.argv[3], 'utf8').matchAll(/<loc>([^<]+)<\/loc>/g)]
    .map(match => new URL(match[1].replaceAll('&amp;', '&')))
  : [];
const currentPaths = new Set(entries.map(url => url.pathname));
const requiredPages = ['/investor', '/policies/terms-and-conditions', '/policies/copyright-policy'];
for (const pathname of requiredPages) {
  if (!currentPaths.has(pathname)) failures.push(`${pathname}: public page is missing from the sitemap`);
}
// Fetch static pages as well; article-only checks can miss deleted public pages.
const remaining = [
  ...staticPages.map(url => ({ url, previous: false })),
  ...previousUrls.map(url => ({ url, previous: true })),
];
cursor = 0;
await Promise.all(Array.from({ length: Math.min(4, remaining.length) }, async () => {
  while (cursor < remaining.length) {
    const { url, previous } = remaining[cursor++];
    try {
      let pathname = url.pathname;
      const visited = new Set();
      for (let hop = 0; hop < 4; hop++) {
        assert.ok(!visited.has(pathname), `${url.pathname}: redirect loop`);
        visited.add(pathname);
        const response = await get(pathname);
        await response.arrayBuffer();
        if (response.status === 200) {
          assert.ok(currentPaths.has(pathname), `${url.pathname}: destination is missing from the current sitemap`);
          if (previous) previousChecked++; else staticChecked++;
          break;
        }
        assert.ok(previous, `${pathname}: sitemap entries must render directly`);
        assert.equal(response.status, 308, `${url.pathname}: previous URL no longer works`);
        const location = response.headers.get('location');
        assert.ok(location, `${pathname}: missing redirect destination`);
        const destination = new URL(location, origin);
        assert.equal(destination.origin, origin, `${pathname}: unexpected redirect origin`);
        pathname = destination.pathname;
        assert.ok(hop < 3, `${url.pathname}: too many redirects`);
      }
    } catch (error) {
      failures.push(error.message);
    }
  }
}));

for (const slug of ['dholera-land-investment-for-nris', 'dholera-legal-land-investment-guide']) {
  if (owners.get(slug) !== `/dholera-sir-blogs/${slug}`) failures.push(`${slug}: reported Blog article is missing from its primary sitemap path`);
}
if (failures.length) {
  console.error(`FAILED: ${failures.length} checks; ${checked} articles, ${staticChecked} pages and ${previousChecked} previous URLs passed.\n` + failures.map(failure => '- ' + failure).join('\n'));
  process.exitCode = 1;
} else {
  console.log(`PASS: ${checked} articles, ${staticChecked} public pages, ${previousChecked} previous URLs, ${checked * 2} direct HTTP 308 redirects, unique titles, matching canonicals, and ${entries.length} unique sitemap URLs.`);
}
