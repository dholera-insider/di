import QatarInvestorPage from "./QatarInvestorPage";
import { qatarFaqs } from "./data";
import socialImage from "@/app/assets/investor/dholera-insider-qatar-banner.webp";
import { createInvestorMetadata } from "../seo";

const PAGE_TITLE = "Dholera Investment from Qatar | Plots for Qatar NRIs | Dholera Insider";
const PAGE_DESCRIPTION =
  "Planning property investment from Qatar? Explore residential plots in Dholera Smart City with dedicated NRI guidance from Dholera Insider.";

export const metadata = createInvestorMetadata({
  path: "/investor/qatar",
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  image: socialImage.src,
  imageAlt: "Dholera investment guidance for Qatar-based NRIs",
  keywords: [
    "Dholera investment Qatar",
    "Dholera plots for Qatar NRIs",
    "buy property in India from Qatar",
    "buy property in India from Doha",
    "NRI property investment Qatar India",
  ],
  alternates: {
    canonical: "https://www.dholerainsider.com/investor/qatar",
  },
});

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: qatarFaqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answer },
  })),
};

export default function QatarPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema).replace(/</g, "\\u003c") }}
      />
      <QatarInvestorPage />
    </>
  );
}
