/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    domains: ["cdn.sanity.io"],
  },

  async redirects() {
    return [
      /* Consolidate duplicate project articles before page rendering starts. */
      {
        source: "/dholera-sir-updates/tata-semiconductor-plant-in-dholera",
        destination: "/about-dholera-sir/tata-semiconductor-plant-in-dholera",
        permanent: true,
      },
      {
        source: "/dholera-sir-updates/dholera-international-airport-project-update-2025",
        destination: "/about-dholera-sir/dholera-international-airport-project-update-2025",
        permanent: true,
      },
      {
        source: "/dholera-sir-updates/ahmedabad-dholera-expressway-transforming-gujarat-connectivity",
        destination: "/about-dholera-sir/ahmedabad-dholera-expressway-transforming-gujarat-connectivity",
        permanent: true,
      },

      /* REDIRECTIONS AFTER RESTRUCTURE */

      {
        source: "/blogs/:slug*",
        destination: "/dholera-sir-updates/:slug*",
        permanent: true,
      },
      {
        source: "/inside-dholera/:slug*",
        destination: "/about-dholera-sir/:slug*",
        permanent: true,
      },
      {
        source: "/inside-dholera/abcd-building-dholera-sir",
        destination: "/about-dholera-sir/why-abcd-building-makes-dholera-sir-smartest-investment-destination",
        permanent: true,
      },
       {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "dholerainsider.com",
          },
        ],
        destination: "https://www.dholerainsider.com/:path*",
        permanent: true,
      },
    ];
  },

  experimental: {
    cssChunking: true, // default
  },
};

export default nextConfig;
