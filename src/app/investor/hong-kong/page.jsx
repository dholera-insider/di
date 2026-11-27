import PageSchema from "@/app/components/PageSchema";
import socialImage from "@/app/assets/investor/dholera-insider-hong-kong-banner.webp";
import HongKongInvestorPage from "./HongKongInvestorPage";
import { hongKongFaqs } from "./data";
import { createInvestorMetadata } from "../seo";

const PAGE_TITLE = " Dholera Investment from Hong Kong | Plots for Hong Kong NRIs | Dholera Insider";
const PAGE_DESCRIPTION =
  "Explore Dholera investment from Hong Kong with residential plots, clear project information and dedicated NRI support from Dholera Insider";

export const metadata = createInvestorMetadata({
  path: "/investor/hong-kong",
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  image: socialImage.src,
  imageAlt: "Dholera investment guidance for Hong Kong-based NRIs",
  keywords: [
    "Dholera investment Hong Kong",
    "Dholera plots for Hong Kong NRIs",
    "buy property in India from Hong Kong",
    "NRI property investment Hong Kong India",
    "buy Dholera plot from Hong Kong",
  ],
  alternates: {
    canonical: "https://www.dholerainsider.com/investor/hong-kong",
  },
});



export default function HongKongPage() {
  return (
    <div className="bg-[#F8F7F3] text-[#051A3A]">
      <PageSchema metadata={metadata} country="Hong Kong" faqs={hongKongFaqs} />
      <HongKongInvestorPage />
    </div>
  );
}
