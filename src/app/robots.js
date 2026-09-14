// app/robots.js
export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/_next/",
          "/api/",
          "/studio/",
          "/infopack/",
        ],
      },
    ],
    sitemap: "https://www.dholerainsider.com/sitemap.xml",
  };
}