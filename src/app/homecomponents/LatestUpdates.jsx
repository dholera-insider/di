import { getUpdates } from "@/sanity/lib/api";
import { urlFor } from "@/sanity/lib/image";
import LatestUpdatesCarousel from "./LatestUpdatesCarousel";
import { getArticlePath } from "@/lib/article-routes.mjs";

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
  timeZone: "Asia/Kolkata",
});

export default async function LatestUpdates() {
  try {
    // Reuse the published Updates feed and its existing 60-second cache.
    const posts = await getUpdates(8);
    const updates = (Array.isArray(posts) ? posts : [])
      .filter((post) => post?.slug?.current)
      .slice(0, 8)
      .map((post) => {
        const date = new Date(post.publishedAt || post._createdAt);
        const hasDate = !Number.isNaN(date.getTime());

        return {
          id: post._id,
          title: post.title || "Dholera Latest Update",
          href: getArticlePath(post),
          imageUrl: post.mainImage?.asset
            ? urlFor(post.mainImage)
                .width(720)
                .height(405)
                .fit("crop")
                .auto("format")
                .quality(75)
                .url()
            : null,
          imageAlt: post.mainImage?.alt || post.title || "Dholera development update",
          dateTime: hasDate ? date.toISOString() : null,
          dateLabel: hasDate ? dateFormatter.format(date) : null,
        };
      });

    // Keep the rest of the homepage available if the CMS has no updates.
    return updates.length > 0 ? <LatestUpdatesCarousel updates={updates} /> : null;
  } catch (error) {
    console.error("Unable to load homepage Dholera updates:", error);
    return null;
  }
}
