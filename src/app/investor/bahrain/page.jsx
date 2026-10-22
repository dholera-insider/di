import DholeraBahrainPage from "./Bahrain";
import socialImage from "@/app/assets/investor/dholera-insider-bahrain-banner.webp";
import { createInvestorMetadata } from "../seo";

const PAGE_TITLE = "Dholera Investment for Bahrain NRIs | Dholera Insider";
const PAGE_DESCRIPTION =
  "Explore Dholera residential plots for Bahrain-based NRIs. Learn about property verification, documents, payments, legal guidance, and remote buying support.";

export const metadata = createInvestorMetadata({
  path: "/investor/bahrain",
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  image: socialImage.src,
  imageAlt: "Dholera investment guidance for Bahrain-based NRIs",
  keywords: [
    "Dholera investment Bahrain",
    "Dholera plots for Bahrain NRIs",
    "buy property in India from Bahrain",
    "buy Dholera plot from Bahrain",
    "NRI property investment Bahrain India",
  ],
});

export default function Page() {
  return <DholeraBahrainPage />;
}
