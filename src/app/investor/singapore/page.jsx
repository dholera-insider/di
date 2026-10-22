import SingaporeInvestorPage from "./SingaporeInvestorPage";
import socialImage from "@/app/assets/investor/dholera-insider-singapore-banner.webp";
import { createInvestorMetadata } from "../seo";

const PAGE_TITLE = "Dholera Investment for Singapore NRIs | Dholera Insider";
const PAGE_DESCRIPTION =
  "Explore Dholera residential plots for Singapore-based NRIs. Compare projects, verify documents, understand payments, and plan a remote property purchase.";

export const metadata = createInvestorMetadata({
  path: "/investor/singapore",
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  image: socialImage.src,
  imageAlt: "Dholera investment guidance for Singapore-based NRIs",
  keywords: [
    "Dholera investment Singapore",
    "Dholera plots for Singapore NRIs",
    "buy property in India from Singapore",
    "NRI property investment India Singapore",
    "buy Dholera plot from Singapore",
  ],
});

export default function SingaporePage() {
  return (
    <div className="bg-[#F8F7F3] text-[#051A3A]">
      <SingaporeInvestorPage />
    </div>
  );
}
