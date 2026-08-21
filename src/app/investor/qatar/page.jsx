import QatarInvestorPage from "./QatarInvestorPage";
import { qatarFaqs } from "./data";
import socialImage from "@/app/assets/investor/dholera-insider-qatar-banner.webp";

export const metadata = {
  metadataBase: new URL("https://www.dholerainsider.com"),
  title: "Dholera Investment from Qatar | Plots for Qatar NRIs",
  description:
    "Planning property investment from Qatar? Explore residential plots in Dholera Smart City with dedicated NRI guidance from Dholera Insider.",
  keywords: [
    "Dholera Investment from Qatar",
    "Dholera Plots for NRI in Qatar",
    "Buy Dholera Plot from Qatar",
    "Dholera Smart City Investment Qatar",
    "Dholera Residential Plots for Qatar NRIs",
    "Dholera Property Investment from Qatar",
    "Invest in Dholera from Qatar",
    "Dholera Plot Investment for NRIs",
  ],
  alternates: {
    canonical: "https://www.dholerainsider.com/investor/qatar",
  },
  openGraph: {
    title: "Dholera Investment from Qatar | Plots for Qatar NRIs",
    description:
      "Explore residential plots in Dholera Smart City from Qatar with clear information and dedicated NRI guidance.",
    url: "https://www.dholerainsider.com/investor/qatar",
    siteName: "Dholera Insider",
    type: "website",
    images: [
      {
        url: socialImage.src,
        width: 800,
        height: 600,
        alt: "Dholera investment guidance for Qatar NRIs",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dholera Investment from Qatar | Plots for Qatar NRIs",
    description:
      "Explore residential plots in Dholera Smart City from Qatar with clear information and dedicated NRI guidance.",
    images: [socialImage.src],
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: qatarFaqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

export default function QatarPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema).replace(/</g, "\\u003c"),
        }}
      />
      <QatarInvestorPage />
    </>
  );
}
