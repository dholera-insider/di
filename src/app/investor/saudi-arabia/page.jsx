import SaudiArabiaInvestorPage from "./SaudiArabiaInvestorPage";
import socialImage from "@/app/assets/investor/dholera-insider-saudi-arabia-banner.webp";

export const metadata = {
  metadataBase: new URL("https://www.dholerainsider.com"),
  title: "Dholera Investment from Saudi Arabia",
  description:
    "Explore verified residential plots in Dholera from Saudi Arabia. Invest with transparent pricing, verified documents, and dedicated NRI support through Dholera Insider.",
  keywords: [
    "Dholera Investment from Saudi Arabia",
    "Dholera Plots for NRIs in Saudi Arabia",
    "Buy Dholera Plot from Saudi Arabia",
    "Dholera Smart City Investment Saudi Arabia",
    "Dholera Residential Plots for Saudi Arabia NRIs",
    "Dholera Property Investment from Saudi Arabia",
    "Invest in Dholera from Saudi Arabia",
    "Dholera Plot Investment for NRIs",
  ],
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://www.dholerainsider.com/investor/saudi-arabia",
  },
  openGraph: {
    title: "Dholera Investment from Saudi Arabia",
    description:
      "Explore residential plots in Dholera Smart City from Saudi Arabia with transparent pricing and dedicated NRI guidance from Dholera Insider.",
    url: "https://www.dholerainsider.com/investor/saudi-arabia",
    siteName: "Dholera Insider",
    type: "website",
    images: [
      {
        url: socialImage.src,
        width: 800,
        height: 600,
        alt: "Dholera investment guidance for NRIs in Saudi Arabia",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dholera Investment from Saudi Arabia",
    description:
      "Explore residential plots in Dholera Smart City from Saudi Arabia with transparent pricing and dedicated NRI guidance from Dholera Insider.",
    images: [socialImage.src],
  },
};

export default function SaudiArabiaPage() {
  return <SaudiArabiaInvestorPage />;
}
