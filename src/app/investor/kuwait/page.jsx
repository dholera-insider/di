import KuwaitInvestorPage from "./KuwaitInvestorPage";
import { kuwaitFaqs } from "./data";
import socialImage from "@/app/assets/investor/dholera-insider-kuwait-banner.webp";
import { createInvestorMetadata } from "../seo";

const PAGE_TITLE = "Dholera Investment for Kuwait NRIs | Dholera Insider";
const PAGE_DESCRIPTION =
  "Explore Dholera residential plots for Kuwait-based NRIs. Review property documents, payment guidance, project details, and remote buying support from Kuwait.";

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
});

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: kuwaitFaqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answer },
  })),
};

export default function KuwaitPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema).replace(/</g, "\\u003c") }}
      />
      <KuwaitInvestorPage />
    </>
  );
}
