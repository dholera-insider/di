import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  absoluteUrl, createArticleGraph, portableTextToPlainText, serializeJsonLd, SITE_URL,
} from "../src/lib/structured-data.mjs";
import { getArticlePath } from "../src/lib/article-routes.mjs";

const require = createRequire(import.meta.url);
const React = require("react");
const { renderToStaticMarkup } = require("react-dom/server");
const { transformSync } = require("next/dist/build/swc");
const imageSize = require("next/dist/compiled/image-size");
const root = fileURLToPath(new URL("../", import.meta.url));
require("@next/env").loadEnvConfig(root, false, { info() {}, error() {} });
const imageBuilder = require("@sanity/image-url")({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "example",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
});
const post = {
  _id: "example-post", site: "dholera-insider", title: "Dholera infrastructure guide",
  slug: { current: "schema-validation-example" }, categories: [{ title: "Blog" }],
  author: { name: "Dholera Insider" },
  publishedAt: "2026-01-05T10:00:00Z", _updatedAt: "2026-02-06T11:00:00Z",
  mainImage: { asset: { _ref: "image-abc123-1600x900-jpg" } },
  body: [{ _type: "block", children: [{ text: Array(450).fill("development").join(" ") }] }],
};
const fixtures = process.env.SCHEMA_ARTICLES_PATH
  ? JSON.parse(readFileSync(process.env.SCHEMA_ARTICLES_PATH, "utf8"))
  : ["Blog", "Updates", "project-Info"].map((title, i) => ({
    ...post, _id: `article-${i}`, slug: { current: `example-${i}` }, categories: [{ title }],
  }));
const routableFixtures = fixtures.filter((item) => getArticlePath(item));

function publicPages(directory = path.join(root, "src/app")) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    if (entry.name === "api" || entry.name === "studio" || entry.name.startsWith("[")) return [];
    const file = path.join(directory, entry.name);
    return entry.isDirectory() ? publicPages(file) : /^page\.(js|jsx)$/.test(entry.name) ? [file] : [];
  });
}

// Execute the real route and schema components without starting a Next server.
// Unrelated UI components and CMS reads are replaced at their import boundaries.
function routeLoader(currentPost = post, feed = fixtures) {
  const cache = new Map();
  const ui = () => null;
  const api = { getblogs: async () => feed, getUpdates: async () => feed, projectInfo: async () => feed };
  function load(file) {
    if (cache.has(file)) return cache.get(file).exports;
    if (/\.(webp|avif|png|jpg|svg)$/.test(file)) {
      const dimensions = imageSize(readFileSync(file));
      return { src: `/_next/static/media/${path.basename(file)}`, width: dimensions.width, height: dimensions.height };
    }
    const source = readFileSync(file, "utf8");
    const isSchema = /(?:schemaMarkup\.js|structured-data\.mjs|article-routes\.mjs|mega-projects\.mjs|PageSchema\.jsx|JsonLd\.jsx|ArticleSchemaMarkup\.jsx|BlogSchemaMarkup\.jsx|SchemaMarkup\.jsx|faq-data\.mjs|images\.js|data\.js|seo\.js)$/.test(file);
    if (/^["']use client["']/.test(source.trimStart()) || (!isSchema && !/[/\\](?:page|layout)\.(js|jsx)$/.test(file))) {
      return new Proxy({ __esModule: true, default: ui }, { get: (target, key) => target[key] || ui });
    }
    const module = { exports: {} };
    cache.set(file, module);
    const compiled = transformSync(source, {
      filename: file, jsc: { parser: { syntax: "ecmascript", jsx: true }, transform: { react: { runtime: "automatic" } } },
      module: { type: "commonjs" },
    }).code;
    function localRequire(name) {
      if (name === "@/sanity/lib/api") return api;
      if (name === "@/lib/get-article") return { getArticleBySlug: async () => currentPost };
      if (name === "@/sanity/lib/image") return { urlFor: (image) => imageBuilder.image(image) };
      if (name === "next/navigation") return {
        notFound() { throw new Error("NEXT_NOT_FOUND"); }, unstable_rethrow() {},
      };
      if (name === "lucide-react" || name.startsWith("react-icons/") || name === "@portabletext/react") {
        return new Proxy({}, { get: () => ui });
      }
      if (name === "next/link" || name === "next/image") return ui;
      if (name.startsWith("@/") || name.startsWith(".")) {
        const target = name.startsWith("@/") ? path.join(root, "src", name.slice(2)) : path.resolve(path.dirname(file), name);
        const resolved = [target, ...[".js", ".jsx", ".mjs"].map((extension) => target + extension)].find((candidate) => existsSync(candidate));
        if (!resolved) throw new Error(`Unresolved import ${name} in ${file}`);
        return load(resolved);
      }
      return require(name);
    }
    new Function("require", "module", "exports", compiled)(localRequire, module, module.exports);
    return module.exports;
  }
  return load;
}

async function resolve(element) {
  element = await element;
  if (Array.isArray(element)) return Promise.all(element.map(resolve));
  if (!React.isValidElement(element)) return element;
  if (typeof element.type === "function") return resolve(element.type(element.props));
  if (element.type === React.Suspense) return resolve(element.props.children);
  return React.createElement(element.type, { ...element.props, key: element.key }, await resolve(element.props.children));
}

async function renderRoute(file, { article = post, feed = fixtures, page = 1 } = {}) {
  const load = routeLoader(article, feed);
  const route = load(file);
  let tree = await route.default({ params: Promise.resolve({ slug: article.slug.current }), searchParams: Promise.resolve({ page }) });
  const layout = path.join(path.dirname(file), "layout.js");
  if (existsSync(layout) && path.dirname(file) !== path.join(root, "src/app")) {
    tree = load(layout).default({ children: tree });
  }
  const html = renderToStaticMarkup(await resolve(tree));
  const schemas = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((match) => JSON.parse(match[1]));
  return { html, schemas };
}

function validateGraph(data, url) {
  assert.equal(data["@context"], "https://schema.org");
  assert.ok(data["@graph"].length >= 3);
  const graph = data["@graph"];
  const identities = graph.map((node) => node["@id"]);
  assert.equal(new Set(identities).size, identities.length, "No duplicate graph entities");
  const webpage = graph.find((node) => node["@id"] === `${url}#webpage`);
  assert.ok(webpage, `Missing page identity for ${url}`);
  assert.equal(webpage.url, url);
  assert.ok(webpage.name.trim());
  const definitions = new Map();
  const references = [];
  function walk(value) {
    if (!value || typeof value !== "object") return;
    if (value["@id"]) {
      if (value["@type"]) definitions.set(value["@id"], value);
      else references.push(value["@id"]);
    }
    for (const [key, child] of Object.entries(value)) {
      assert.notEqual(child, undefined, `Undefined value at ${key}`);
      if (["url", "contentUrl", "item"].includes(key) && typeof child === "string") assert.match(child, /^https?:\/\//);
      walk(child);
    }
  }
  walk(data);
  for (const reference of references) assert.ok(definitions.has(reference), `Unresolved entity ${reference}`);
  const breadcrumb = graph.find((node) => node["@type"] === "BreadcrumbList");
  if (new URL(url).pathname !== "/") {
    assert.ok(breadcrumb);
    assert.equal(breadcrumb.itemListElement.at(-1).item, url);
    breadcrumb.itemListElement.forEach((item, index) => assert.equal(item.position, index + 1));
  }
}

const allRenderedGraphs = [];

test("every public static route renders one connected JSON-LD graph", async (context) => {
  const files = publicPages();
  assert.ok(files.length);
  for (const file of files) {
    const pathname = "/" + path.relative(path.join(root, "src/app"), path.dirname(file)).split(path.sep).join("/");
    const { schemas } = await renderRoute(file);
    assert.equal(schemas.length, 1, `Expected one JSON-LD graph on ${pathname}`);
    validateGraph(schemas[0], SITE_URL + pathname);
    const expectedType = pathname === "/gallery" ? "ImageGallery"
      : pathname === "/contact" ? "ContactPage"
      : ["/about-us", "/about-dholera-sir"].includes(pathname) ? "AboutPage"
      : ["/dholera-sir-blogs", "/dholera-sir-updates"].includes(pathname) ? "CollectionPage"
      : "WebPage";
    assert.equal(schemas[0]["@graph"].find((node) => node["@id"] === SITE_URL + pathname + "#webpage")["@type"], expectedType);
    assert.ok(!JSON.stringify(schemas[0]).includes("SearchAction"), "Do not advertise a nonexistent search endpoint");
    allRenderedGraphs.push(schemas[0]);
  }
  context.diagnostic(`Validated ${files.length} static public pages.`);
});

test("paginated archives describe only the 12 visible posts with the correct canonical URL", async () => {
  const feed = Array.from({ length: 25 }, (_, index) => ({ ...post, _id: String(index), slug: { current: `post-${index}` } }));
  for (const section of ["dholera-sir-blogs", "dholera-sir-updates"]) {
    const { schemas } = await renderRoute(path.join(root, "src/app", section, "page.jsx"), { feed, page: 2 });
    const url = `${SITE_URL}/${section}?page=2`;
    validateGraph(schemas[0], url);
    const list = schemas[0]["@graph"].find((node) => node["@type"] === "ItemList");
    assert.equal(list.numberOfItems, 12);
    assert.ok(list.itemListElement[0].item.url.endsWith("post-12"));
    assert.ok(list.itemListElement.at(-1).item.url.endsWith("post-23"));
    allRenderedGraphs.push(schemas[0]);
  }
});

test("gallery schema describes all 18 images from the same data as the gallery UI", async () => {
  const load = routeLoader();
  const { galleryImages } = load(path.join(root, "src/app/gallery/images.js"));
  const { schemas } = await renderRoute(path.join(root, "src/app/gallery/page.js"));
  const graph = schemas[0]["@graph"];
  assert.equal(graph.find((node) => node.url === `${SITE_URL}/gallery`)["@type"], "ImageGallery");
  const items = graph.find((node) => node["@type"] === "ItemList").itemListElement;
  assert.equal(items.length, 18);
  items.forEach(({ item }, index) => {
    assert.equal(item.name, galleryImages[index].alt);
    assert.equal(item.caption, galleryImages[index].caption);
    assert.equal(item.contentUrl, SITE_URL + galleryImages[index].src.src);
    assert.ok(item.width > 0 && item.height > 0);
  });
});

test("each investor service identifies its actual provider and market", async () => {
  for (const market of ["bahrain", "dubai", "oman", "kuwait", "singapore", "qatar", "hong-kong", "saudi-arabia"]) {
    const file = path.join(root, "src/app/investor", market, "page.jsx");
    const { schemas } = await renderRoute(file);
    const service = schemas[0]["@graph"].find((node) => node["@type"] === "Service");
    assert.ok(service.areaServed.name);
    assert.equal(service.provider["@id"], `${SITE_URL}/#organization`);
    const breadcrumbs = schemas[0]["@graph"].find((node) => node["@type"] === "BreadcrumbList");
    assert.deepEqual(breadcrumbs.itemListElement.map((item) => item.item), [
      `${SITE_URL}/`, `${SITE_URL}/investor/${market}`,
    ]);
    const languages = routeLoader()(file).metadata.alternates.languages;
    assert.equal(Object.keys(languages).length, 8);
    for (const target of Object.values(languages)) {
      const pathname = new URL(target).pathname;
      assert.notEqual(pathname, "/investor", "language alternatives must not reference the removed overview");
      assert.ok(existsSync(path.join(root, "src/app", pathname, "page.jsx")));
    }
  }
});

test("home FAQ uses the exact questions and answers shared with the visible accordion", async () => {
  const { homeFaqs } = await import("../src/app/homecomponents/faq-data.mjs");
  const { schemas } = await renderRoute(path.join(root, "src/app/page.js"));
  const faq = schemas[0]["@graph"].find((node) => node["@type"] === "FAQPage");
  assert.deepEqual(faq.mainEntity.map((item) => ({ question: item.name, answer: item.acceptedAnswer.text })), homeFaqs);
});

test("all article routes use canonical ownership, valid article types and complete text", async (context) => {
  const types = { "about-dholera-sir": "Article", "dholera-sir-blogs": "BlogPosting", "dholera-sir-updates": "NewsArticle" };
  assert.ok(routableFixtures.length);
  for (const article of routableFixtures) {
    const pathname = getArticlePath(article);
    const section = pathname.split("/")[1];
    const { schemas } = await renderRoute(path.join(root, "src/app", section, "[slug]/page.js"), { article });
    assert.equal(schemas.length, 1, pathname);
    validateGraph(schemas[0], SITE_URL + pathname);
    const entity = schemas[0]["@graph"].find((node) => node["@type"] === types[section]);
    assert.ok(entity, pathname);
    assert.equal(entity.headline, article.title.trim());
    const text = portableTextToPlainText(article.body);
    if (text) {
      assert.equal(entity.wordCount, text.split(/\s+/u).length);
      assert.equal(entity.timeRequired, `PT${Math.ceil(text.split(/\s+/u).length / 200)}M`);
    }
    allRenderedGraphs.push(schemas[0]);
  }
  context.diagnostic(`Validated ${routableFixtures.length} article pages.`);
});

test("article schema rendering tolerates broken image assets and escapes CMS content", async () => {
  const load = routeLoader();
  const Component = load(path.join(root, "src/app/components/ArticleSchemaMarkup.jsx")).default;
  const headline = '</script><script>alert("xss")</script>';
  const html = renderToStaticMarkup(await resolve(React.createElement(Component, {
    post: { ...post, title: headline, mainImage: { asset: {} } },
  })));
  assert.ok(!html.includes('<script>alert("xss")</script>'));
  const json = JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);
  const article = json["@graph"].find((node) => node["@type"] === "BlogPosting");
  assert.equal(article.headline, headline);
  assert.equal(article.image, undefined);
});

test("reading time uses the full article and does not truncate at 160 characters", () => {
  const article = createArticleGraph(post)["@graph"].at(-1);
  assert.equal(article.wordCount, 450);
  assert.equal(article.timeRequired, "PT3M");
  assert.ok(portableTextToPlainText(post.body).length > 160);
});

test("missing CMS text, images and invalid dates do not produce invented values", () => {
  const article = createArticleGraph({ ...post, body: null, publishedAt: "not-a-date", _createdAt: "2025-01-01T00:00:00Z", _updatedAt: "not-a-date", author: null })["@graph"].at(-1);
  for (const property of ["datePublished", "dateModified", "wordCount", "timeRequired", "image", "author"]) assert.equal(article[property], undefined);
  assert.equal(createArticleGraph({ ...post, title: "" }), null);
  assert.equal(createArticleGraph({ ...post, site: "another-site" }), null);
  assert.equal(createArticleGraph({ ...post, categories: [] }), null);
});

test("unsafe CMS text remains JSON and cannot close the script element", () => {
  const unsafe = { headline: '</script><script>alert("xss")</script>', description: "A < B & C" };
  const output = serializeJsonLd(unsafe);
  assert.ok(!output.includes("<"));
  assert.deepEqual(JSON.parse(output), unsafe);
  assert.equal(absoluteUrl("javascript:alert(1)"), undefined);
});

test("all rendered types and properties exist in the official Schema.org vocabulary", { skip: !process.env.SCHEMA_VOCAB_PATH }, () => {
  const vocabulary = JSON.parse(readFileSync(process.env.SCHEMA_VOCAB_PATH, "utf8"));
  const terms = new Set(vocabulary["@graph"].map((entry) => entry["@id"]?.replace(/^schema:|^https?:\/\/schema.org\//, "")));
  function check(value) {
    if (!value || typeof value !== "object") return;
    for (const [key, child] of Object.entries(value)) {
      if (key === "@type") for (const type of [].concat(child)) assert.ok(terms.has(type), `Unknown type ${type}`);
      if (!key.startsWith("@") && !/^\d+$/.test(key)) assert.ok(terms.has(key), `Unknown property ${key}`);
      check(child);
    }
  }
  assert.equal(allRenderedGraphs.length, publicPages().length + 2 + routableFixtures.length);
  allRenderedGraphs.forEach(check);
});
