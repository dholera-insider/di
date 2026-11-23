// Run: node --test scripts/article-routing.test.mjs
// Optional: ARTICLE_FIXTURES_PATH can point to a published CMS JSON snapshot.
// PREVIOUS_SITEMAP_PATH can point to the live sitemap saved before deployment.
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { createRequire } from 'node:module';
import test from 'node:test';
import * as routes from '../src/lib/article-routes.mjs';
import { megaProjects } from '../src/lib/mega-projects.mjs';
import nextConfig from '../next.config.mjs';

const require = createRequire(import.meta.url);
const { transformSync } = require('next/dist/build/swc');
const { NextRequest } = require('next/server');
const navigation = require('next/navigation');
const { unstable_doesMiddlewareMatch, unstable_getResponseFromNextConfig, getRedirectUrl } = require('next/experimental/testing/server');
const { getArticlePath, getArticleUrl, ARTICLE_ORIGIN, ARTICLE_SECTIONS } = routes;
const defaults = [
  { slug: 'dholera-land-investment-for-nris', categories: ['Blog'] },
  { slug: 'dholera-legal-land-investment-guide', categories: ['Blog'] },
  { slug: 'newly-published-news', categories: ['Updates'] },
  { slug: 'newly-published-project', categories: ['project-Info'] },
].map(post => ({ site: 'dholera-insider', author: 'Dholera Insider', ...post }));
const snapshot = process.env.ARTICLE_FIXTURES_PATH
  ? JSON.parse(readFileSync(process.env.ARTICLE_FIXTURES_PATH, 'utf8'))
  : defaults;
const articles = snapshot.filter(post => post.site === 'dholera-insider' && getArticlePath(post));
const previousSitemapUrls = process.env.PREVIOUS_SITEMAP_PATH
  ? [...readFileSync(process.env.PREVIOUS_SITEMAP_PATH, 'utf8').matchAll(/<loc>([^<]+)<\/loc>/g)]
    .map(match => new URL(match[1].replaceAll('&amp;', '&')))
  : [];

function publicPagePaths(directory = new URL('../src/app/', import.meta.url), segments = []) {
  return readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
    if (entry.isDirectory()) {
      if (entry.name === 'api' || entry.name === 'studio' || entry.name.startsWith('[') || entry.name.startsWith('_')) return [];
      return publicPagePaths(new URL(entry.name + '/', directory), [...segments, entry.name]);
    }
    return /^page\.(js|jsx|ts|tsx)$/.test(entry.name) ? ['/' + segments.join('/')] : [];
  });
}

function compileSitemap(posts) {
  return compile('src/app/sitemap.js', {
    '@/lib/article-routes.mjs': routes,
    '@/sanity/lib/client': { client: { withConfig: () => ({
      fetch: async (_query, { category }) => posts
        .filter(post => post.site === 'dholera-insider' && post.noIndex !== true && post.categories.includes(category))
        .map(post => ({ ...post, categories: post.categories.map(title => ({ title })) })),
    }) } },
  }).default();
}

function compile(filename, mocks) {
  const source = readFileSync(new URL('../' + filename, import.meta.url), 'utf8');
  const { code } = transformSync(source, {
    filename,
    jsc: { parser: { syntax: 'ecmascript', jsx: true }, target: 'es2022', transform: { react: { runtime: 'automatic' } } },
    module: { type: 'commonjs' },
  });
  const mod = { exports: {} };
  new Function('require', 'module', 'exports', code)(
    name => Object.hasOwn(mocks, name) ? mocks[name] : require(name), mod, mod.exports,
  );
  return mod.exports;
}

const middlewareModule = compile('src/middleware.js', { './lib/article-routes.mjs': routes });
const request = pathname => new NextRequest(ARTICLE_ORIGIN + pathname);

test('configuration redirects the original three project aliases and preserves other routes', async () => {
  const slugs = ['tata-semiconductor-plant-in-dholera', 'dholera-international-airport-project-update-2025', 'ahmedabad-dholera-expressway-transforming-gujarat-connectivity'];
  const responseFor = pathname => unstable_getResponseFromNextConfig({ url: ARTICLE_ORIGIN + pathname, nextConfig });
  for (const slug of slugs) {
    const response = await responseFor(`/dholera-sir-updates/${slug}`);
    assert.equal(response.status, 308);
    assert.equal(getRedirectUrl(response), `${ARTICLE_ORIGIN}/about-dholera-sir/${slug}`);
  }
  for (const pathname of [
    '/', '/about-dholera-sir', '/dholera-sir-updates', '/dholera-sir-updates?page=2',
    '/dholera-sir-updates/tata-electronics-dholera-equipment-investment',
    '/dholera-sir-blogs', '/contact', '/gallery',
    ...slugs.map(slug => `/about-dholera-sir/${slug}`),
    ...slugs.map(slug => `/dholera-sir-updates/${slug}-different-article`),
  ]) {
    const response = await responseFor(pathname);
    assert.equal(response.status, 200, pathname);
    assert.equal(getRedirectUrl(response), null, pathname);
  }
  for (const [source, destination] of [
    ['/blogs/example-article', '/dholera-sir-updates/example-article'],
    ['/inside-dholera/example-article', '/about-dholera-sir/example-article'],
  ]) {
    const response = await responseFor(source);
    assert.equal(response.status, 308);
    assert.equal(getRedirectUrl(response), ARTICLE_ORIGIN + destination);
  }
});

test('CMS categories have a deterministic owner and featured projects keep their About URLs', () => {
  assert.equal(getArticlePath(defaults[0]), '/dholera-sir-blogs/dholera-land-investment-for-nris');
  assert.equal(getArticlePath(defaults[1]), '/dholera-sir-blogs/dholera-legal-land-investment-guide');
  assert.equal(getArticlePath(defaults[2]), '/dholera-sir-updates/newly-published-news');
  assert.equal(getArticlePath(defaults[3]), '/about-dholera-sir/newly-published-project');
  assert.equal(getArticlePath({ slug: 'multi-category', categories: ['Blog', 'Updates', 'project-Info'] }), '/about-dholera-sir/multi-category');
  assert.equal(getArticlePath({ slug: 'multi-category', categories: ['Blog', 'Updates'] }), '/dholera-sir-updates/multi-category');
  assert.equal(megaProjects.length, 9);
  assert.equal(new Set(megaProjects.map(post => post.href)).size, 9);
  const solar = megaProjects.find(project => project.title === 'Dholera Solar Park');
  const renew = megaProjects.find(project => project.title === 'ReNew Solar Manufacturing');
  assert.notEqual(renew.href, solar.href, 'ReNew must not reuse the general Solar Park article');
  assert.equal(getArticlePath({ slug: 'dholera-solar-manufacturing-is-expanding-inox-renew', categories: ['Updates'] }), renew.href);
  for (const project of megaProjects) {
    const slug = project.href.split('/').pop();
    assert.equal(getArticlePath({ slug, categories: ['Blog'] }), project.href);
  }
});

test('missing, foreign-site and unsupported records cannot become article URLs', () => {
  for (const post of [null, {}, { slug: { current: 42 }, categories: ['Blog'] }, { slug: 'not-an-article', categories: ['Project'] }, { slug: 'foreign', site: 'another-site', categories: ['Blog'] }, { slug: '../bad', categories: ['Blog'] }]) {
    assert.equal(getArticlePath(post), null);
  }
  const post = { slug: { current: 'dholera-SIR-example' }, categories: [{ title: 'Blog' }], noIndex: true };
  assert.equal(getArticleUrl(post), ARTICLE_ORIGIN + '/dholera-sir-blogs/dholera-SIR-example');
});

test('middleware only matches the three article detail routes', () => {
  for (const pathname of ['/', '/contact', '/gallery', '/studio/example', '/api/contact', '/_next/example', '/about-dholera-sir', '/dholera-sir-blogs?page=2', '/dholera-sir-updates/example/nested']) {
    assert.equal(unstable_doesMiddlewareMatch({ config: middlewareModule.config, nextConfig: {}, url: ARTICLE_ORIGIN + pathname }), false, pathname);
  }
  for (const section of ARTICLE_SECTIONS) {
    assert.equal(unstable_doesMiddlewareMatch({ config: middlewareModule.config, nextConfig: {}, url: ARTICLE_ORIGIN + '/' + section + '/example' }), true);
  }
});

test(`all ${articles.length} published fixture articles have one allowed section and redirect from the other two`, async context => {
  const records = new Map([...articles, ...defaults].map(post => [post.slug, post]));
  const savedProject = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const savedDataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID = 'routingtest';
  process.env.NEXT_PUBLIC_SANITY_DATASET = 'production';
  context.after(() => {
    if (savedProject === undefined) delete process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
    else process.env.NEXT_PUBLIC_SANITY_PROJECT_ID = savedProject;
    if (savedDataset === undefined) delete process.env.NEXT_PUBLIC_SANITY_DATASET;
    else process.env.NEXT_PUBLIC_SANITY_DATASET = savedDataset;
  });
  const fetched = context.mock.method(globalThis, 'fetch', async (input, options) => {
    const url = new URL(input);
    assert.equal(url.hostname, 'routingtest.apicdn.sanity.io');
    assert.equal(url.searchParams.get('perspective'), 'published');
    assert.ok(url.searchParams.get('query').includes('site == "dholera-insider"'));
    assert.equal(options.headers, undefined, 'private tokens must not enter public routing lookups');
    const slug = JSON.parse(url.searchParams.get('$slug'));
    return Response.json({ result: records.get(slug) || null });
  });
  let primary = 0, redirected = 0;
  for (const post of [...articles, defaults[2], defaults[3]]) {
    const owner = getArticlePath(post);
    for (const section of ARTICLE_SECTIONS) {
      const pathname = `/${section}/${encodeURIComponent(post.slug)}`;
      const response = await middlewareModule.middleware(request(pathname + '?utm_source=seo&ref=a%26b'));
      if (pathname === owner) {
        assert.equal(response.status, 200, pathname);
        assert.equal(response.headers.get('x-middleware-next'), '1');
        assert.equal(response.headers.get('location'), null);
        assert.equal(response.headers.get('x-middleware-request-x-di-article-path'), owner);
        primary++;
      } else {
        assert.equal(response.status, 308, pathname);
        const destination = new URL(response.headers.get('location'));
        assert.equal(destination.pathname, owner);
        assert.equal(destination.origin, ARTICLE_ORIGIN);
        assert.deepEqual([...destination.searchParams], [['utm_source', 'seo'], ['ref', 'a&b']]);
        redirected++;
      }
    }
  }
  assert.equal(redirected, primary * 2);
  assert.equal((await middlewareModule.middleware(request('/about-dholera-sir/not-published'))).status, 404);
  assert.equal((await middlewareModule.middleware(request('/about-dholera-sir/%FF'))).status, 404);
  assert.equal(fetched.mock.callCount(), new Set([...articles, defaults[2], defaults[3]].map(post => post.slug)).size + 1, 'repeated visits must reuse routing metadata');
});

test('routing lookup failures return a temporary error rather than duplicate article content', async context => {
  const project = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID = 'routingtest';
  process.env.NEXT_PUBLIC_SANITY_DATASET = 'production';
  context.after(() => {
    if (project === undefined) delete process.env.NEXT_PUBLIC_SANITY_PROJECT_ID; else process.env.NEXT_PUBLIC_SANITY_PROJECT_ID = project;
    if (dataset === undefined) delete process.env.NEXT_PUBLIC_SANITY_DATASET; else process.env.NEXT_PUBLIC_SANITY_DATASET = dataset;
  });
  context.mock.method(console, 'error', () => {});
  const mockedFetch = context.mock.method(globalThis, 'fetch', async () => { throw new Error('CMS unavailable'); });
  let response = await middlewareModule.middleware(request('/about-dholera-sir/example'));
  assert.equal(response.status, 503);
  assert.equal(response.headers.get('Retry-After'), '60');
  mockedFetch.mock.mockImplementation(async () => Response.json({ error: 'invalid response' }));
  response = await middlewareModule.middleware(request('/about-dholera-sir/example'));
  assert.equal(response.status, 503);
  mockedFetch.mock.mockImplementation(async () => Response.json({ result: { slug: 'example', site: 'foreign-site', categories: ['Blog'] } }));
  response = await middlewareModule.middleware(request('/about-dholera-sir/example'));
  assert.equal(response.status, 404);
  const calls = mockedFetch.mock.callCount();
  response = await middlewareModule.middleware(request('/contact'));
  assert.equal(response.status, 200);
  assert.equal(mockedFetch.mock.callCount(), calls);
});

test('routing cache coalesces lookups, refreshes ownership, and overwrites client-supplied routing headers', async context => {
  const project = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID = 'routingtest';
  process.env.NEXT_PUBLIC_SANITY_DATASET = 'production';
  context.after(() => {
    if (project === undefined) delete process.env.NEXT_PUBLIC_SANITY_PROJECT_ID; else process.env.NEXT_PUBLIC_SANITY_PROJECT_ID = project;
    if (dataset === undefined) delete process.env.NEXT_PUBLIC_SANITY_DATASET; else process.env.NEXT_PUBLIC_SANITY_DATASET = dataset;
  });
  let now = Date.now();
  let category = 'Blog';
  let published = false;
  context.mock.method(Date, 'now', () => now);
  const fetched = context.mock.method(globalThis, 'fetch', async input => {
    const slug = JSON.parse(new URL(input).searchParams.get('$slug'));
    await Promise.resolve();
    return Response.json({ result: slug === 'negative-cache-fixture' && !published ? null : { slug, site: 'dholera-insider', categories: [category] } });
  });
  const slug = 'cache-refresh-fixture';
  const [alias, primary] = await Promise.all([
    middlewareModule.middleware(request(`/about-dholera-sir/${slug}`)),
    middlewareModule.middleware(request(`/dholera-sir-blogs/${slug}`)),
  ]);
  assert.equal(alias.status, 308);
  assert.equal(primary.status, 200);
  assert.equal(fetched.mock.callCount(), 1);
  category = 'Updates';
  now += 60001;
  const refreshed = await middlewareModule.middleware(request(`/dholera-sir-blogs/${slug}`));
  assert.equal(new URL(refreshed.headers.get('location')).pathname, `/dholera-sir-updates/${slug}`);
  assert.equal(fetched.mock.callCount(), 2);
  const forged = new NextRequest(`${ARTICLE_ORIGIN}/dholera-sir-updates/${slug}`, { headers: { 'x-di-article-path': '/about-dholera-sir/another-article' } });
  const sanitized = await middlewareModule.middleware(forged);
  assert.equal(sanitized.headers.get('x-middleware-request-x-di-article-path'), `/dholera-sir-updates/${slug}`);

  assert.equal((await middlewareModule.middleware(request('/about-dholera-sir/negative-cache-fixture'))).status, 404);
  published = true;
  now += 10001;
  const newlyPublished = await middlewareModule.middleware(request('/dholera-sir-updates/negative-cache-fixture'));
  assert.equal(newlyPublished.status, 200);
});

test('server-side article access rethrows redirects and rejects nonexistent or wrong-section posts', async () => {
  const { getArticleBySlug } = compile('src/lib/get-article.js', {
    './article-routes.mjs': routes,
    '@/sanity/lib/api': { getPostBySlug: async slug => defaults.find(post => post.slug === slug) },
    'next/navigation': navigation,
    'next/headers': { headers: async () => new Headers() },
  });
  for (const post of defaults) {
    const owner = getArticlePath(post);
    for (const section of ARTICLE_SECTIONS) {
      if (owner === `/${section}/${post.slug}`) assert.equal(await getArticleBySlug(post.slug, section), post);
      else await assert.rejects(getArticleBySlug(post.slug, section), error => error.digest === `NEXT_REDIRECT;replace;${owner};308;`);
    }
  }
  await assert.rejects(getArticleBySlug('missing', 'dholera-sir-blogs'), error => error.digest?.includes('404'));
});

test('verified middleware ownership prevents loops when an article body has an older cached category', async () => {
  const expected = '/dholera-sir-updates/category-change-fixture';
  const stalePost = { slug: { current: 'category-change-fixture' }, categories: [{ title: 'Blog' }] };
  const { getArticleBySlug } = compile('src/lib/get-article.js', {
    './article-routes.mjs': routes,
    '@/sanity/lib/api': { getPostBySlug: async () => stalePost },
    'next/navigation': navigation,
    'next/headers': { headers: async () => new Headers({ 'x-di-article-path': expected }) },
  });
  const article = await getArticleBySlug('category-change-fixture', 'dholera-sir-updates');
  assert.equal(getArticlePath(article), expected);
  assert.equal(getArticleUrl(article), ARTICLE_ORIGIN + expected);
});

test('sitemap publishes one owning URL per article, including multi-category and featured articles', async () => {
  const entries = [...articles, { site: 'dholera-insider', slug: 'multi-category-fixture', categories: ['Blog', 'Updates'] }];
  const sitemap = await compileSitemap([...entries, ...entries]);
  assert.equal(new Set(sitemap.map(entry => entry.url)).size, sitemap.length);
  const articleUrls = sitemap.filter(entry => ARTICLE_SECTIONS.some(section => entry.url.startsWith(ARTICLE_ORIGIN + '/' + section + '/')));
  const indexableEntries = entries.filter(post => post.noIndex !== true);
  assert.equal(articleUrls.length, indexableEntries.length);
  for (const post of indexableEntries) {
    assert.equal(articleUrls.filter(entry => entry.url.endsWith('/' + encodeURIComponent(post.slug))).length, 1, post.slug);
    assert.ok(articleUrls.some(entry => entry.url === getArticleUrl(post)), post.slug);
  }
  assert.ok(sitemap.some(entry => entry.url === ARTICLE_ORIGIN + '/contact'));
  assert.ok(sitemap.some(entry => entry.url === ARTICLE_ORIGIN + '/investor/dubai'));
});

test('sitemap includes every public static page exactly once', async () => {
  const sitemap = await compileSitemap([]);
  const paths = sitemap.map(entry => new URL(entry.url).pathname);
  assert.deepEqual([...paths].sort(), publicPagePaths().sort());
  assert.equal(new Set(paths).size, paths.length);
});

test('every previous category URL and legacy article URL reaches its single sitemap owner', async context => {
  const middleware = compile('src/middleware.js', { './lib/article-routes.mjs': routes }).middleware;
  const sitemap = await compileSitemap(articles);
  const currentPaths = new Set(sitemap.map(entry => new URL(entry.url).pathname));
  const records = new Map(articles.map(post => [post.slug, post]));
  assert.equal(records.size, articles.length, 'published article slugs must be unique');
  const savedProject = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const savedDataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID = 'compatibilitytest';
  process.env.NEXT_PUBLIC_SANITY_DATASET = 'production';
  context.after(() => {
    if (savedProject === undefined) delete process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
    else process.env.NEXT_PUBLIC_SANITY_PROJECT_ID = savedProject;
    if (savedDataset === undefined) delete process.env.NEXT_PUBLIC_SANITY_DATASET;
    else process.env.NEXT_PUBLIC_SANITY_DATASET = savedDataset;
  });
  context.mock.method(globalThis, 'fetch', async input => {
    const slug = JSON.parse(new URL(input).searchParams.get('$slug'));
    const post = records.get(slug);
    return Response.json({ result: post?.author === 'Dholera Insider' ? post : null });
  });

  async function resolve(pathname) {
    let url = new URL(pathname, ARTICLE_ORIGIN);
    const visited = new Set();
    for (let hop = 0; hop < 4; hop++) {
      assert.ok(!visited.has(url.pathname), `${pathname}: redirect loop`);
      visited.add(url.pathname);
      let response = await unstable_getResponseFromNextConfig({ url: url.href, nextConfig });
      if (!response.headers.get('location')) response = await middleware(new NextRequest(url));
      assert.ok(response.status === 200 || response.status === 308, `${pathname}: returned ${response.status}`);
      if (response.status === 200) {
        assert.ok(currentPaths.has(url.pathname), `${pathname}: missing from the current sitemap`);
        return url.pathname;
      }
      url = new URL(response.headers.get('location'), url);
      assert.equal(url.origin, ARTICLE_ORIGIN, `${pathname}: unexpected redirect origin`);
    }
    assert.fail(`${pathname}: too many redirects`);
  }

  const previousSections = { Blog: 'dholera-sir-blogs', Updates: 'dholera-sir-updates', 'project-Info': 'about-dholera-sir' };
  for (const post of articles) {
    for (const [category, section] of Object.entries(previousSections)) {
      if (post.categories.includes(category)) {
        assert.equal(await resolve(`/${section}/${encodeURIComponent(post.slug)}`), getArticlePath(post));
      }
    }
    for (const prefix of ['blogs', 'inside-dholera']) {
      assert.equal(await resolve(`/${prefix}/${encodeURIComponent(post.slug)}`), getArticlePath(post));
    }
  }
  // A saved production sitemap also catches old slugs that no longer appear in
  // the CMS snapshot, as well as static pages accidentally removed from routing.
  for (const url of previousSitemapUrls) await resolve(url.pathname);
  context.diagnostic(`Checked ${articles.length} published articles, both legacy prefixes, and ${previousSitemapUrls.length} saved production URLs.`);
});
