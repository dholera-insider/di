import { notFound, permanentRedirect } from "next/navigation";
import { headers } from "next/headers";
import { getPostBySlug } from "@/sanity/lib/api";
import { getArticlePath } from "./article-routes.mjs";

// Keep page rendering and metadata protected if middleware is bypassed by a
// direct server render. Ordinary callers cannot render another section's post.
export async function getArticleBySlug(slug, section) {
  const post = await getPostBySlug(slug);
  if (!post) notFound();
  const expectedPath = `/${section}/${encodeURIComponent(slug)}`;
  const requestHeaders = await headers();
  // Middleware overwrites this request header after validating the current CMS
  // owner. Honor it so an older cached category cannot redirect back in a loop.
  const article = requestHeaders.get("x-di-article-path") === expectedPath
    ? { ...post, _articlePath: expectedPath }
    : post;
  const pathname = getArticlePath(article);
  if (!pathname) notFound();
  if (pathname !== expectedPath) {
    permanentRedirect(pathname);
  }
  return article;
}
