import { NextResponse } from "next/server";
import { getArticlePath } from "./lib/article-routes.mjs";

const ARTICLE_QUERY = `*[
  _type == "post" &&
  site == "dholera-insider" &&
  author->name == "Dholera Insider" &&
  slug.current == $slug
][0]{site, "slug": slug.current, "categories": categories[]->title}`;

// A bounded, best-effort cache avoids a network lookup on every article visit.
// A new isolate simply reloads the public metadata; correctness never depends
// on a shared process or on keeping this cache alive.
const articlePaths = new Map();

function lookupArticlePath(projectId, dataset, slug) {
  const key = `${projectId}/${dataset}/${slug}`;
  const cached = articlePaths.get(key);
  if (cached && cached.expiresAt > Date.now()) return cached.promise;

  const entry = { expiresAt: Date.now() + 60000, promise: null };
  if (articlePaths.size >= 500) articlePaths.delete(articlePaths.keys().next().value);
  articlePaths.set(key, entry);
  entry.promise = (async () => {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);
    try {
      // Only public routing metadata crosses this boundary, never article bodies
      // or private tokens. Sanity's CDN also caches the small lookup per slug.
      const url = new URL(`https://${projectId}.apicdn.sanity.io/v2025-01-28/data/query/${dataset}`);
      url.searchParams.set("query", ARTICLE_QUERY);
      url.searchParams.set("$slug", JSON.stringify(slug));
      url.searchParams.set("perspective", "published");
      const response = await fetch(url, { signal: controller.signal });
      if (!response.ok) throw new Error(`Article lookup HTTP ${response.status}`);
      const data = await response.json();
      if (!Object.hasOwn(data, "result")) throw new Error("Missing article lookup result");
      const pathname = getArticlePath(data.result);
      entry.expiresAt = Date.now() + (pathname ? 60000 : 10000);
      return pathname;
    } catch (error) {
      if (articlePaths.get(key) === entry) articlePaths.delete(key);
      throw error;
    } finally {
      clearTimeout(timeout);
    }
  })();
  return entry.promise;
}

export async function middleware(request) {
  const match = request.nextUrl.pathname.match(
    /^\/(about-dholera-sir|dholera-sir-blogs|dholera-sir-updates)\/([^/]+)\/?$/,
  );
  if (!match) return NextResponse.next();

  let slug;
  try {
    slug = decodeURIComponent(match[2]);
  } catch {
    return new NextResponse("Page not found", { status: 404 });
  }

  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
  try {
    if (!projectId || !dataset) throw new Error("Missing Sanity public configuration");
    const pathname = await lookupArticlePath(projectId, dataset, slug);
    if (!pathname) return new NextResponse("Page not found", { status: 404 });

    if (request.nextUrl.pathname !== pathname) {
      const destination = request.nextUrl.clone();
      destination.pathname = pathname;
      const redirect = NextResponse.redirect(destination, 308);
      redirect.headers.set("Cache-Control", "public, max-age=0, must-revalidate");
      return redirect;
    }
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-di-article-path", pathname);
    return NextResponse.next({ request: { headers: requestHeaders } });
  } catch (error) {
    // A temporary CMS outage must not turn alternate URLs into indexable copies.
    console.error("Unable to resolve article route:", error.message);
    return new NextResponse("Page temporarily unavailable. Please try again shortly.", {
      status: 503,
      headers: { "Retry-After": "60" },
    });
  }
}

export const config = {
  matcher: [
    "/about-dholera-sir/:slug",
    "/dholera-sir-blogs/:slug",
    "/dholera-sir-updates/:slug",
  ],
};
