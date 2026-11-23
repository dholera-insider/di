import { megaProjects } from "./mega-projects.mjs";

export const ARTICLE_ORIGIN = "https://www.dholerainsider.com";
export const ARTICLE_SITE = "dholera-insider";
export const ARTICLE_SECTIONS = [
  "about-dholera-sir",
  "dholera-sir-updates",
  "dholera-sir-blogs",
];

const featuredAboutSlugs = new Set(
  megaProjects.map((project) => project.href.split("/").pop()),
);

export function getArticlePath(post) {
  const slug = typeof post?.slug === "string" ? post.slug : post?.slug?.current;
  if (typeof slug !== "string" || !slug || /[/?#\\]/.test(slug)) return null;
  if (post.site && post.site !== ARTICLE_SITE) return null;

  // Middleware can attach its verified choice to a cached article body. This
  // keeps metadata consistent during the content cache's revalidation window.
  const encodedSlug = encodeURIComponent(slug);
  if (ARTICLE_SECTIONS.some((section) => post._articlePath === `/${section}/${encodedSlug}`)) {
    return post._articlePath;
  }

  const categories = (Array.isArray(post.categories) ? post.categories : [])
    .map((category) => typeof category === "string" ? category : category?.title);

  // One deterministic owner also handles posts with multiple categories.
  let section;
  if (featuredAboutSlugs.has(slug) || categories.includes("project-Info")) {
    section = "about-dholera-sir";
  } else if (categories.includes("Updates")) {
    section = "dholera-sir-updates";
  } else if (categories.includes("Blog")) {
    section = "dholera-sir-blogs";
  } else {
    return null;
  }

  return `/${section}/${encodedSlug}`;
}

export function getArticleUrl(post) {
  const pathname = getArticlePath(post);
  return pathname ? ARTICLE_ORIGIN + pathname : undefined;
}
