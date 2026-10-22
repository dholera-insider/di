import DubaiNriClient from "./DubaiNriClient";
import socialImage from "@/app/assets/investor/dholera-insider-dubai-banner.webp";
import { createInvestorMetadata } from "../seo";

const PAGE_TITLE = "Dholera Investment for Dubai & UAE NRIs | Dholera Insider";
const PAGE_DESCRIPTION =
  "Explore Dholera residential plots for Dubai and UAE-based NRIs. Review documents, payment guidance, property verification, and remote buying support.";

export const metadata = createInvestorMetadata({
  path: "/investor/dubai",
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  image: socialImage.src,
  imageAlt: "Dholera investment guidance for Dubai and UAE-based NRIs",
  keywords: [
    "Dholera investment Dubai",
    "Dholera investment UAE",
    "Dholera plots for UAE NRIs",
    "buy property in India from Dubai",
    "buy Dholera plot from UAE",
    "NRI property investment UAE India",
  ],
});

export default function DubaiNriPage() {
  return <DubaiNriClient />;
}
