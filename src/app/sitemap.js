import { client } from "@/sanity/lib/client";

const BASE_URL = "https://www.dholerainsider.com";

export const revalidate = 60;

const sitemapClient = client.withConfig({
  useCdn: false,
  perspective: "published",
});

const POSTS_QUERY = `
  *[
    _type == "post" &&
    $category in categories[]->title &&
    site == "dholera-insider" &&
    (noIndex == null || noIndex == false) &&
    defined(slug.current)
  ]{
    "slug": slug.current,
    _updatedAt
  }
`;

export default async function sitemap() {
  const [blogs, updates, aboutDholera] = await Promise.all([
    sitemapClient.fetch(POSTS_QUERY, { category: "Blog" }, {
      next: { revalidate: 60 },
    }),
    sitemapClient.fetch(POSTS_QUERY, { category: "Updates" }, {
      next: { revalidate: 60 },
    }),
    sitemapClient.fetch(POSTS_QUERY, { category: "project-Info" }, {
      next: { revalidate: 60 },
    }),
  ]);

  const staticPages = [
    { url: BASE_URL, priority: 1.0, changeFrequency: "daily" },
    { url: `${BASE_URL}/about-us`, priority: 0.7, changeFrequency: "monthly" },
    { url: `${BASE_URL}/contact`, priority: 0.6, changeFrequency: "monthly" },
    { url: `${BASE_URL}/gallery`, priority: 0.5, changeFrequency: "monthly" },
    { url: `${BASE_URL}/policies/privacy-policies`, priority: 0.3, changeFrequency: "yearly" },
    { url: `${BASE_URL}/dholera-sir-blogs`, priority: 0.8, changeFrequency: "daily" },
    { url: `${BASE_URL}/dholera-sir-updates`, priority: 0.7, changeFrequency: "daily" },
    { url: `${BASE_URL}/about-dholera-sir`, priority: 0.7, changeFrequency: "monthly" },

    { url: `${BASE_URL}/investor/bahrain`, priority: 0.8, changeFrequency: "monthly" },
    { url: `${BASE_URL}/investor/dubai`, priority: 0.8, changeFrequency: "monthly" },
    { url: `${BASE_URL}/investor/hong-kong`, priority: 0.8, changeFrequency: "monthly" },
    { url: `${BASE_URL}/investor/kuwait`, priority: 0.8, changeFrequency: "monthly" },
    { url: `${BASE_URL}/investor/oman`, priority: 0.8, changeFrequency: "monthly" },
    { url: `${BASE_URL}/investor/qatar`, priority: 0.8, changeFrequency: "monthly" },
    { url: `${BASE_URL}/investor/saudi-arabia`, priority: 0.8, changeFrequency: "monthly" },
    { url: `${BASE_URL}/investor/singapore`, priority: 0.8, changeFrequency: "monthly" },
  ];

  const blogUrls = blogs.map((post) => ({
    url: `${BASE_URL}/dholera-sir-blogs/${post.slug}`,
    lastModified: post._updatedAt,
    changeFrequency: "daily",
    priority: 0.8,
  }));

  const updateUrls = updates.map((post) => ({
    url: `${BASE_URL}/dholera-sir-updates/${post.slug}`,
    lastModified: post._updatedAt,
    changeFrequency: "daily",
    priority: 0.7,
  }));

  const aboutDholeraUrls = aboutDholera.map((post) => ({
    url: `${BASE_URL}/about-dholera-sir/${post.slug}`,
    lastModified: post._updatedAt,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [
    ...staticPages,
    ...blogUrls,
    ...updateUrls,
    ...aboutDholeraUrls,
  ];
}