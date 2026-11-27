import PageSchema from "@/app/components/PageSchema";
import socialImage from "@/app/assets/investor/dholera-insider-oman-banner.webp";
import OmanInvestorPage from "./OmanInvestorPage";
import { omanFaqs } from "./data";
import { createInvestorMetadata } from "../seo";

const PAGE_TITLE = "Dholera Investment from Oman | Dholera Plots for NRIs";
const PAGE_DESCRIPTION =
  "Explore Dholera investment from Oman with verified residential plots, clear project details, documentation guidance and dedicated NRI support.";

export const metadata = createInvestorMetadata({
  path: "/investor/oman",
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  image: socialImage.src,
  imageAlt: "Dholera investment guidance for Oman-based NRIs",
  keywords: [
    "Dholera investment Oman",
    "Dholera plots for Oman NRIs",
    "buy property in India from Oman",
    "buy Dholera plot from Oman",
    "Dholera property Muscat",
  ],
  alternates: {
    canonical: "https://www.dholerainsider.com/investor/oman",
  },
});



export default function OmanPage() {
  return (
    <div className="bg-[#F8F7F3] text-[#051A3A]">
      <PageSchema metadata={metadata} country="Oman" faqs={omanFaqs} />
      <OmanInvestorPage />
    </div>
  );
}
