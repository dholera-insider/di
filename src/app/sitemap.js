// app/sitemap.js
import { client } from "@/sanity/lib/client";

const BASE_URL = "https://www.dholerainsider.com";

export default async function sitemap() {

  const [blogs, updates, aboutDholera] = await Promise.all([

    // index 0 → Blogs
    client.fetch(
      `*[_type == "post" && "Blog" in categories[]->title && site == "dholera-insider" && (noIndex == null || noIndex == false)]{
        "slug": slug.current, _updatedAt
      }`
    ),

    // index 1 → Updates
    client.fetch(
      `*[_type == "post" && "Updates" in categories[]->title && site == "dholera-insider" && (noIndex == null || noIndex == false)]{
        "slug": slug.current, _updatedAt
      }`
    ),

    // index 2 → About Dholera SIR
    client.fetch(
      `*[_type == "post" && "project-Info" in categories[]->title && site == "dholera-insider" && (noIndex == null || noIndex == false)]{
        "slug": slug.current, _updatedAt
      }`
    ),
  ]);

  // ✅ Static Pages
  const staticPages = [
    { url: BASE_URL,                              priority: 1.0, changeFrequency: "daily" },
    { url: `${BASE_URL}/about-us`,                priority: 0.7, changeFrequency: "monthly" },
    { url: `${BASE_URL}/contact`,                 priority: 0.6, changeFrequency: "monthly" },
    { url: `${BASE_URL}/bulk-land`,               priority: 0.6, changeFrequency: "monthly" },
    { url: `${BASE_URL}/gallery`,                 priority: 0.5, changeFrequency: "monthly" },
    { url: `${BASE_URL}/infopack`,                priority: 0.5, changeFrequency: "monthly" },
    { url: `${BASE_URL}/policies`,                priority: 0.3, changeFrequency: "yearly" },
    { url: `${BASE_URL}/dholera-sir-blogs`,       priority: 0.8, changeFrequency: "daily" },
    { url: `${BASE_URL}/dholera-sir-updates`,     priority: 0.7, changeFrequency: "daily" },
    { url: `${BASE_URL}/about-dholera-sir`,       priority: 0.7, changeFrequency: "monthly" },
    { url: `${BASE_URL}/investor/bahrain`,         priority: 0.8, changeFrequency: "monthly" },
    { url: `${BASE_URL}/investor/dubai`,           priority: 0.8, changeFrequency: "monthly" },
    { url: `${BASE_URL}/investor/kuwait`,          priority: 0.8, changeFrequency: "monthly" },
    { url: `${BASE_URL}/investor/oman`,            priority: 0.8, changeFrequency: "monthly" },
    { url: `${BASE_URL}/investor/qatar`,           priority: 0.8, changeFrequency: "monthly" },
    { url: `${BASE_URL}/investor/saudi-arabia`,    priority: 0.8, changeFrequency: "monthly" },
    { url: `${BASE_URL}/investor/singapore`,       priority: 0.8, changeFrequency: "monthly" },

/*     { url: `${BASE_URL}/residential-projects-in-dholera/maple`,             priority: 0.8, changeFrequency: "monthly" }, */

  ].map((page) => ({ ...page, lastModified: new Date() }));

  // ✅ Dynamic URLs
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
