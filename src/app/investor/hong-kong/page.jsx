import { Geist, Space_Grotesk } from "next/font/google";

import socialImage from "@/app/assets/about-dholera-sir-banner-dholera-insider.webp";
import HongKongInvestorPage from "./HongKongInvestorPage";
import { hongKongFaqs } from "./data";

const display = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-hong-kong-display",
});

const body = Geist({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-hong-kong-body",
});

export const metadata = {
  metadataBase: new URL("https://www.dholerainsider.com"),
  title: "Dholera Investment from Hong Kong | Plots for Hong Kong NRIs",
  description:
    "Explore Dholera investment from Hong Kong with residential plots, clear project information and dedicated NRI support from Dholera Insider.",
  keywords: [
    "Dholera Investment from Hong Kong",
    "Dholera Plots for NRI in Hong Kong",
    "Buy Dholera Plot from Hong Kong",
    "Dholera Smart City Investment Hong Kong",
    "Dholera Residential Plots for Hong Kong NRIs",
    "Dholera Property Investment from Hong Kong",
    "Invest in Dholera from Hong Kong",
    "Dholera Plot Investment for NRIs",
  ],
  alternates: {
    canonical: "https://www.dholerainsider.com/investor/hong-kong",
  },
  openGraph: {
    title: "Dholera Investment from Hong Kong | Plots for Hong Kong NRIs",
    description:
      "Explore Dholera investment from Hong Kong with residential plots, clear project information and dedicated NRI support from Dholera Insider.",
    url: "https://www.dholerainsider.com/investor/hong-kong",
    siteName: "Dholera Insider",
    type: "website",
    images: [
      {
        url: socialImage.src,
        width: 1500,
        height: 500,
        alt: "Dholera Smart City investment from Hong Kong",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dholera Investment from Hong Kong | Plots for Hong Kong NRIs",
    description:
      "Explore Dholera investment from Hong Kong with residential plots, clear project information and dedicated NRI support from Dholera Insider.",
    images: [socialImage.src],
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: hongKongFaqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

export default function HongKongPage() {
  return (
    <div
      className={`${display.variable} ${body.variable} bg-[#F8F7F3] text-[#051A3A]`}
      style={{ fontFamily: "var(--font-hong-kong-body)" }}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema).replace(/</g, "\\u003c"),
        }}
      />
      <HongKongInvestorPage />
    </div>
  );
}
