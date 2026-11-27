import logo from "./assets/icons/logo.webp";
import { createPageGraph, ORGANIZATION_ID, SITE_URL, WEBSITE_ID } from "../lib/structured-data.mjs";
import { homeFaqs } from "./homecomponents/faq-data.mjs";

const businessSchema = {
  "@type": "RealEstateAgent",
  "@id": ORGANIZATION_ID,
  name: "Dholera Insider",
  alternateName: "Dholera for NRI",
  url: SITE_URL + "/",
  logo: {
    "@type": "ImageObject", "@id": SITE_URL + "/#logo",
    url: SITE_URL + logo.src, width: logo.width, height: logo.height,
  },
  image: SITE_URL + logo.src,
  telephone: "+91-9211820887",
  email: "info@dholerainsider.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "3rd Floor, H-110, Sector 63 Road, H Block, Sector 63",
    addressLocality: "Noida", addressRegion: "Uttar Pradesh",
    postalCode: "201301", addressCountry: "IN",
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    opens: "09:30", closes: "21:00",
  },
  contactPoint: {
    "@type": "ContactPoint", telephone: "+91-9211820887", contactType: "sales",
    availableLanguage: ["English", "Hindi"],
  },
  sameAs: [
    "https://www.facebook.com/dholerainsider/",
    "https://x.com/Dholera_Insider",
    "https://www.instagram.com/dholerainsider/",
    "https://www.youtube.com/@DholeraInsider",
  ],
};

const websiteSchema = {
  "@type": "WebSite", "@id": WEBSITE_ID,
  name: "Dholera Insider", url: SITE_URL + "/",
  publisher: { "@id": ORGANIZATION_ID }, inLanguage: "en-IN",
};

export function withSiteSchema(data) {
  if (!data) return null;
  return { ...data, "@graph": [businessSchema, websiteSchema, ...data["@graph"]] };
}

export const homePageSchema = withSiteSchema(createPageGraph({
  url: SITE_URL + "/",
  name: "Dholera Investment for NRI | Verified Residential Plots",
  description: "Dholera Insider helps NRIs explore verified residential plots in Dholera Smart City with transparent information, legal clarity, and a smooth remote buying experience.",
  mainEntity: { "@id": ORGANIZATION_ID },
  faqs: homeFaqs,
}));

export const aboutPageSchema = withSiteSchema(createPageGraph({
  type: "AboutPage", url: SITE_URL + "/about-us", name: "About Dholera Insider",
  description: "Dholera Insider helps NRIs invest in verified residential plots in Dholera Smart City with transparent guidance, legal clarity, and remote buying support.",
  mainEntity: { "@id": ORGANIZATION_ID },
}));
