import SaudiArabiaInvestorPage from "./SaudiArabiaInvestorPage";
import socialImage from "@/app/assets/investor/dholera-insider-saudi-arabia-banner.webp";
import { createInvestorMetadata } from "../seo";

const PAGE_TITLE = "Dholera Investment for Saudi Arabia NRIs | Dholera Insider";
const PAGE_DESCRIPTION =
  "Explore Dholera residential plots for Saudi Arabia-based NRIs. Review documents, property verification, payment guidance, and remote buying support.";

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
});

export default function SaudiArabiaPage() {
  return <SaudiArabiaInvestorPage />;
}
