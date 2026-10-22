const SITE_URL = "https://www.dholerainsider.com";

export const investorLanguages = {
  "en-BH": `${SITE_URL}/investor/bahrain`,
  "en-AE": `${SITE_URL}/investor/dubai`,
  "en-OM": `${SITE_URL}/investor/oman`,
  "en-KW": `${SITE_URL}/investor/kuwait`,
  "en-SG": `${SITE_URL}/investor/singapore`,
  "en-QA": `${SITE_URL}/investor/qatar`,
  "en-HK": `${SITE_URL}/investor/hong-kong`,
  "en-SA": `${SITE_URL}/investor/saudi-arabia`,
  "x-default": `${SITE_URL}/investor`,
};

export function createInvestorMetadata({
  path,
  title,
  description,
  keywords = [],
  image,
  imageAlt,
}) {
  const canonical = `${SITE_URL}${path}`;

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    keywords,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    alternates: {
      canonical,
      languages: investorLanguages,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: "Dholera Insider",
      locale: "en_IN",
      type: "website",
      ...(image
        ? {
            images: [
              {
                url: image,
                alt: imageAlt || title,
              },
            ],
          }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(image ? { images: [image] } : {}),
    },
  };
}
