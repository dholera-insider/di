import PageSchema from "@/app/components/PageSchema";
import KuwaitInvestorPage from "./KuwaitInvestorPage";
import { kuwaitFaqs } from "./data";
import socialImage from "@/app/assets/investor/dholera-insider-kuwait-banner.webp";
import { createInvestorMetadata } from "../seo";

const PAGE_TITLE = "Dholera Investment from Kuwait | Residential Plots for NRIs";
const PAGE_DESCRIPTION =
  "Dholera investment from Kuwait with verified residential plots, transparent project details and dedicated NRI support from Dholera Insider.";

export const metadata = createInvestorMetadata({
  path: "/investor/kuwait",
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  image: socialImage.src,
  imageAlt: "Dholera investment guidance for Kuwait-based NRIs",
  keywords: [
    "Dholera investment Kuwait",
    "Dholera plots for Kuwait NRIs",
    "buy property in India from Kuwait",
    "buy Dholera plot from Kuwait",
    "NRI property investment Kuwait India",
  ],
  alternates: {
    canonical: "https://www.dholerainsider.com/investor/kuwait",
  },
});



export default function KuwaitPage() {
  return (
    <>
      <PageSchema metadata={metadata} country="Kuwait" faqs={kuwaitFaqs} />
      <KuwaitInvestorPage />
    </>
  );
}
