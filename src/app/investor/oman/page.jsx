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

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: omanFaqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answer },
  })),
};

export default function OmanPage() {
  return (
    <div className="bg-[#F8F7F3] text-[#051A3A]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema).replace(/</g, "\\u003c") }}
      />
      <OmanInvestorPage />
    </div>
  );
}
