import { ARTICLE_ORIGIN, getArticleUrl } from "./article-routes.mjs";

export const SITE_URL = ARTICLE_ORIGIN;
export const ORGANIZATION_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

export function absoluteUrl(value) {
  if (typeof value !== "string" || !value.trim()) return undefined;
  try {
    const url = new URL(value, `${SITE_URL}/`);
    return ["https:", "http:"].includes(url.protocol) ? url.href : undefined;
  } catch {
    return undefined;
  }
}

export function serializeJsonLd(data) {
  // Prevent CMS text from closing the JSON-LD script element.
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export function portableTextToPlainText(body) {
  if (!Array.isArray(body)) return "";
  return body
    .filter((block) => block?._type === "block" && Array.isArray(block.children))
    .map((block) => block.children.map((child) => child?.text || "").join(""))
    .filter(Boolean)
    .join("\n\n")
    .trim();
}

function validDate(value) {
  if (typeof value !== "string" || !value.trim()) return undefined;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? undefined : date.toISOString();
}

export function createPageGraph({
  url, name, description, type = "WebPage", parents = [], image,
  items = [], mainEntity, faqs = [],
}) {
  const pageUrl = absoluteUrl(url);
  if (!pageUrl || !name?.trim()) return null;
  const page = {
    "@type": type,
    "@id": `${pageUrl}#webpage`,
    url: pageUrl,
    name: name.trim(),
    ...(description?.trim() ? { description: description.trim() } : {}),
    isPartOf: { "@id": WEBSITE_ID },
    publisher: { "@id": ORGANIZATION_ID },
    inLanguage: "en-IN",
    ...(mainEntity ? { mainEntity } : {}),
  };
  const graph = [page];
  if (absoluteUrl(image)) {
    page.primaryImageOfPage = { "@type": "ImageObject", url: absoluteUrl(image) };
  }
  if (new URL(pageUrl).pathname !== "/") {
    const trail = [
      { name: "Home", url: `${SITE_URL}/` },
      ...parents,
      { name: name.trim(), url: pageUrl },
    ];
    page.breadcrumb = { "@id": `${pageUrl}#breadcrumb` };
    graph.push({
      "@type": "BreadcrumbList",
      "@id": `${pageUrl}#breadcrumb`,
      itemListElement: trail.map((item, index) => ({
        "@type": "ListItem", position: index + 1,
        name: item.name, item: absoluteUrl(item.url),
      })),
    });
  }
  const listItems = items.flatMap((item) => {
    const itemUrl = absoluteUrl(item?.url || item?.contentUrl);
    if (!itemUrl || !item?.name?.trim()) return [];
    return [{ ...item, "@type": item["@type"] || "WebPage", url: itemUrl }];
  });
  if (listItems.length) {
    const listId = `${pageUrl}#items`;
    page.mainEntity = { "@id": listId };
    graph.push({
      "@type": "ItemList", "@id": listId,
      numberOfItems: listItems.length,
      itemListElement: listItems.map((item, index) => ({
        "@type": "ListItem", position: index + 1, item,
      })),
    });
  }
  const questions = faqs.filter((faq) => faq?.question?.trim() && faq?.answer?.trim());
  if (questions.length) {
    page.hasPart = { "@id": `${pageUrl}#faq` };
    graph.push({
      "@type": "FAQPage", "@id": `${pageUrl}#faq`,
      isPartOf: { "@id": page["@id"] },
      mainEntity: questions.map((faq) => ({
        "@type": "Question", name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    });
  }
  return { "@context": "https://schema.org", "@graph": graph };
}

const articleSections = {
  "about-dholera-sir": { name: "About Dholera SIR", type: "Article" },
  "dholera-sir-blogs": { name: "Dholera SIR Blogs", type: "BlogPosting" },
  "dholera-sir-updates": { name: "Dholera SIR Updates", type: "NewsArticle" },
};

export function createArticleGraph(post, { image } = {}) {
  const url = getArticleUrl(post);
  if (!url || !post?.title?.trim()) return null;
  const sectionPath = new URL(url).pathname.split("/")[1];
  const section = articleSections[sectionPath];
  const sectionUrl = `${SITE_URL}/${sectionPath}`;
  const text = portableTextToPlainText(post.body);
  const description = post.metaDescription?.trim() || post.description?.trim() || text.slice(0, 160);
  const data = createPageGraph({
    url, name: post.title, description, image,
    parents: [{ name: section.name, url: sectionUrl }],
    mainEntity: { "@id": `${url}#article` },
  });
  const datePublished = validDate(post.publishedAt);
  const dateModified = validDate(post._updatedAt);
  const wordCount = text ? text.split(/\s+/u).length : 0;
  const authorName = post.author?.name?.trim();
  data["@graph"].push({
    "@type": "CollectionPage", "@id": `${sectionUrl}#webpage`,
    url: sectionUrl, name: section.name, isPartOf: { "@id": WEBSITE_ID },
  }, {
    "@type": section.type, "@id": `${url}#article`,
    url, headline: post.title.trim(),
    ...(description ? { description } : {}),
    mainEntityOfPage: { "@id": `${url}#webpage` },
    isPartOf: { "@id": `${sectionUrl}#webpage` },
    publisher: { "@id": ORGANIZATION_ID },
    ...(authorName ? {
      author: authorName === "Dholera Insider"
        ? { "@id": ORGANIZATION_ID }
        : { "@type": "Person", name: authorName },
    } : {}),
    ...(datePublished ? { datePublished } : {}),
    ...(dateModified && (!datePublished || dateModified >= datePublished) ? { dateModified } : {}),
    ...(absoluteUrl(image) ? { image: absoluteUrl(image) } : {}),
    ...(text ? { wordCount, timeRequired: `PT${Math.ceil(wordCount / 200)}M` } : {}),
    articleSection: section.name,
    inLanguage: "en-IN", isAccessibleForFree: true,
  });
  return data;
}
