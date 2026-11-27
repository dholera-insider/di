import PageSchema from "@/app/components/PageSchema";
import { dubaiFaqs } from "./faq-data.mjs";
import DubaiNriClient from "./DubaiNriClient";
import socialImage from "@/app/assets/investor/dholera-insider-dubai-banner.webp";
import { createInvestorMetadata } from "../seo";

const PAGE_TITLE = "Dholera Investment from Dubai & UAE NRIs | Dholera Insider";
const PAGE_DESCRIPTION =
  "Explore verified residential plots in Dholera Smart City from Dubai. Get transparent pricing, legal guidance, and dedicated support for UAE NRI investors";

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
  alternates: {
    canonical: "https://www.dholerainsider.com/investor/dubai",
  },
});

export default function DubaiNriPage() {
  return (
    <>
      <PageSchema metadata={metadata} country="United Arab Emirates" faqs={dubaiFaqs} />
      <DubaiNriClient />
    </>
  );
}
