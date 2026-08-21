import KuwaitInvestorPage from "./KuwaitInvestorPage";
import { kuwaitFaqs } from "./data";
import socialImage from "@/app/assets/investor/dholera-insider-kuwait-banner.webp";

export const metadata = {
  metadataBase: new URL("https://www.dholerainsider.com"),
  title: "Dholera Investment from Kuwait | Residential Plots for NRIs",
  description:
    "Dholera investment from Kuwait with verified residential plots, transparent project details and dedicated NRI support from Dholera Insider.",
  keywords: [
    "Dholera Investment from Kuwait",
    "Dholera Plots for NRI in Kuwait",
    "Buy Dholera Plot from Kuwait",
    "Dholera Smart City Investment Kuwait",
    "Dholera Residential Plots for Kuwait NRIs",
    "Dholera Property Investment from Kuwait",
    "Invest in Dholera from Kuwait",
    "Dholera plot investment for NRIs",
  ],
  alternates: {
    canonical: "https://www.dholerainsider.com/investor/kuwait",
  },
  openGraph: {
    title: "Dholera Investment from Kuwait | Residential Plots for NRIs",
    description:
      "Explore verified residential plots in Dholera from Kuwait with transparent project details and dedicated NRI support.",
    url: "https://www.dholerainsider.com/investor/kuwait",
    siteName: "Dholera Insider",
    type: "website",
    images: [
      {
        url: socialImage.src,
        width: 800,
        height: 600,
        alt: "Dholera investment guidance for NRIs living in Kuwait",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dholera Investment from Kuwait | Residential Plots for NRIs",
    description:
      "Explore verified residential plots in Dholera from Kuwait with transparent project details and dedicated NRI support.",
    images: [socialImage.src],
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: kuwaitFaqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

export default function KuwaitPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema).replace(/</g, "\\u003c"),
        }}
      />
      <KuwaitInvestorPage />
    </>
  );
}
