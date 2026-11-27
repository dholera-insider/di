import PageSchema from "@/app/components/PageSchema";
import { singaporeFaqs } from "./faq-data.mjs";
import SingaporeInvestorPage from "./SingaporeInvestorPage";
import socialImage from "@/app/assets/investor/dholera-insider-singapore-banner.webp";
import { createInvestorMetadata } from "../seo";

const PAGE_TITLE = "Dholera Investment from Singapore | Verified Residential Plots for NRIs";
const PAGE_DESCRIPTION =
  "Explore verified residential plots in Dholera from Singapore. Compare projects, verify documents, and invest with complete transparency through Dholera Insider.";
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
  alternates: {
    canonical: "https://www.dholerainsider.com/investor/singapore",
  },
});

export default function SingaporePage() {
  return (
    <div className="bg-[#F8F7F3] text-[#051A3A]">
      <PageSchema metadata={metadata} country="Singapore" faqs={singaporeFaqs} />
      <SingaporeInvestorPage />
    </div>
  );
}
