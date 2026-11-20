import DholeraBahrainPage from "./Bahrain";
import socialImage from "@/app/assets/investor/dholera-insider-bahrain-banner.webp";
import { createInvestorMetadata } from "../seo";

const PAGE_TITLE = "Dholera Investment from Bahrain NRIs | Dholera Insider";
const PAGE_DESCRIPTION =
  "Invest in Dholera Smart City from Bahrain with verified plots, transparent pricing, legal guidance, and complete NRI assistance from start to finish";

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
  alternates: {
    canonical: "https://www.dholerainsider.com/investor/bahrain",
  },
});

export default function Page() {
  return <DholeraBahrainPage />;
}
