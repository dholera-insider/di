import socialImage from "@/app/assets/investor/dholera-insider-hong-kong-banner.webp";
import HongKongInvestorPage from "./HongKongInvestorPage";
import { hongKongFaqs } from "./data";
import { createInvestorMetadata } from "../seo";

const PAGE_TITLE = "Dholera Investment for Hong Kong NRIs | Dholera Insider";
const PAGE_DESCRIPTION =
  "Explore Dholera residential plots for Hong Kong-based NRIs. Review property documents, project details, payment guidance, and remote buying support.";

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
});

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: hongKongFaqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answer },
  })),
};

export default function HongKongPage() {
  return (
    <div className="bg-[#F8F7F3] text-[#051A3A]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema).replace(/</g, "\\u003c") }}
      />
      <HongKongInvestorPage />
    </div>
  );
}
