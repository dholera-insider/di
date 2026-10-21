import DubaiNriClient from "./DubaiNriClient";
import heroImage from "@/app/assets/investor/dholera-insider-dubai-banner.webp";

const SITE_URL = "https://www.dholerainsider.com";

const PAGE_TITLE =
  "Dholera Investment from Dubai | Verified Plots for UAE NRIs";

const PAGE_DESCRIPTION =
  "Explore verified residential plots in Dholera Smart City from Dubai. Get transparent pricing, legal guidance, and dedicated support for UAE NRI investors.";

const SOCIAL_IMAGE_URL = new URL(heroImage.src, SITE_URL).href;

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  keywords: [
    "Dholera Investment from Dubai",
    "Dholera Plots for NRIs in Dubai",
    "Buy Dholera Plot from Dubai",
    "Dholera Smart City Investment Dubai",
    "Dholera Residential Plots for UAE NRIs",
    "Dholera Property Investment from Dubai",
    "Invest in Dholera from UAE",
    "Dholera Plot Investment for NRIs",
  ],
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: `${SITE_URL}/investor/dubai`,
  },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: `${SITE_URL}/investor/dubai`,
    siteName: "Dholera Insider",
    type: "website",
    images: [
      {
        url: SOCIAL_IMAGE_URL,
        width: heroImage.width,
        height: heroImage.height,
        alt: "Dholera investment guidance for NRIs in Dubai and the UAE",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: [SOCIAL_IMAGE_URL],
  },
};

export default function DubaiNriPage() {
  return <DubaiNriClient />;
}