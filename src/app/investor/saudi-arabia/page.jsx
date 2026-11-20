import SaudiArabiaInvestorPage from "./SaudiArabiaInvestorPage";
import socialImage from "@/app/assets/investor/dholera-insider-saudi-arabia-banner.webp";
import { createInvestorMetadata } from "../seo";

const PAGE_TITLE = "Dholera Investment from Saudi Arabia  | Residential Plots for NRIs | Dholera Insider";
const PAGE_DESCRIPTION =
  "Explore verified residential plots in Dholera from Saudi Arabia. Invest with transparent pricing, verified documents, and dedicated NRI support through Dholera Insider";

export const metadata = createInvestorMetadata({
  path: "/investor/saudi-arabia",
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  image: socialImage.src,
  imageAlt: "Dholera investment guidance for Saudi Arabia-based NRIs",
  keywords: [
    "Dholera investment Saudi Arabia",
    "Dholera plots for Saudi NRIs",
    "buy property in India from Saudi Arabia",
    "Dholera investment Riyadh",
    "Dholera investment Jeddah",
  ],
  alternates: {
    canonical: "https://www.dholerainsider.com/investor/saudi-arabia",
  },
});

export default function SaudiArabiaPage() {
  return <SaudiArabiaInvestorPage />;
}
