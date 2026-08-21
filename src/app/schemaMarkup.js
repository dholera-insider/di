import logo from "./assets/icons/logo.webp";

const siteUrl = "https://www.dholerainsider.com";
const organizationId = `${siteUrl}/#organization`;
const websiteId = `${siteUrl}/#website`;
const logoUrl = `${siteUrl}${logo.src}`;

const socialProfiles = [
  "https://www.facebook.com/profile.php?id=61578651603291",
  "https://x.com/Dholera_Insider",
  "https://www.instagram.com/dholerainsider/",
  "https://in.linkedin.com/company/dholera-insider",
  "https://www.youtube.com/@DholeraInsider",
  "https://in.pinterest.com/dholerainsider",
];

const businessSchema = {
  "@type": ["RealEstateAgent", "LocalBusiness", "Organization"],
  "@id": organizationId,
  name: "Dholera Insider",
  alternateName: "Dholera for NRI",
  url: `${siteUrl}/`,
  logo: logoUrl,
  image: logoUrl,
  telephone: "+91-9211820887",
  email: "info@dholerainsider.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "3rd Floor, H-110, Sector 63 Road, H Block, Sector 63",
    addressLocality: "Noida",
    addressRegion: "Uttar Pradesh",
    postalCode: "201301",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 28.6262377,
    longitude: 77.3777322,
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: [
      "https://schema.org/Monday",
      "https://schema.org/Tuesday",
      "https://schema.org/Wednesday",
      "https://schema.org/Thursday",
      "https://schema.org/Friday",
      "https://schema.org/Saturday",
    ],
    opens: "09:30",
    closes: "21:00",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+91-9211820887",
    contactType: "sales",
    areaServed: ["KW", "SG", "OM", "BH", "QA", "SA"],
    availableLanguage: "English",
  },
  sameAs: socialProfiles,
};

const websiteSchema = {
  "@type": "WebSite",
  "@id": websiteId,
  name: "Dholera Insider",
  url: `${siteUrl}/`,
  publisher: { "@id": organizationId },
  inLanguage: "en-IN",
};

const homeFaqSchema = {
  "@type": "FAQPage",
  "@id": `${siteUrl}/#faq`,
  mainEntity: [
    {
      "@type": "Question",
      name: "Can NRIs buy residential plots in Dholera?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Eligible NRIs can purchase residential plots in India in accordance with applicable Indian laws and regulations.",
      },
    },
    {
      "@type": "Question",
      name: "Can I invest without visiting India?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. The buying process can generally be completed remotely with the required documentation and legal formalities.",
      },
    },
    {
      "@type": "Question",
      name: "What documents should I verify?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Review the project details, title documents, NA/NOC, layout plan, pricing, and registry process before making a decision.",
      },
    },
    {
      "@type": "Question",
      name: "Why choose Dholera Insider?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Dholera Insider is the exclusive channel partner of BookMyAssets for NRI investors, providing verified residential plot opportunities, transparent guidance, and end-to-end support.",
      },
    },
  ],
};

export const homePageSchema = {
  "@context": "https://schema.org",
  "@graph": [websiteSchema, businessSchema, homeFaqSchema],
};

export const aboutPageSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "AboutPage",
      "@id": `${siteUrl}/about-us#webpage`,
      url: `${siteUrl}/about-us`,
      name: "About Dholera Insider",
      description:
        "Dholera Insider helps NRIs invest in verified residential plots in Dholera Smart City with transparent guidance, legal clarity, and remote buying support.",
      isPartOf: { "@id": websiteId },
      mainEntity: { "@id": organizationId },
      breadcrumb: { "@id": `${siteUrl}/about-us#breadcrumb` },
      inLanguage: "en-IN",
    },
    websiteSchema,
    businessSchema,
    {
      "@type": "BreadcrumbList",
      "@id": `${siteUrl}/about-us#breadcrumb`,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: `${siteUrl}/`,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "About Us",
          item: `${siteUrl}/about-us`,
        },
      ],
    },
  ],
};

export const contactPageSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ContactPage",
      "@id": `${siteUrl}/contact#webpage`,
      url: `${siteUrl}/contact`,
      name: "Contact Dholera Insider",
      description:
        "Contact Dholera Insider for information about Dholera residential plots, project pricing, documentation and NRI investment assistance.",
      isPartOf: { "@id": websiteId },
      mainEntity: { "@id": organizationId },
      breadcrumb: { "@id": `${siteUrl}/contact#breadcrumb` },
      inLanguage: "en-IN",
    },
    websiteSchema,
    businessSchema,
    {
      "@type": "BreadcrumbList",
      "@id": `${siteUrl}/contact#breadcrumb`,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: `${siteUrl}/`,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Contact Us",
          item: `${siteUrl}/contact`,
        },
      ],
    },
  ],
};
