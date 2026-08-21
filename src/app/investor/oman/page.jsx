import { Geist, Space_Grotesk } from "next/font/google";

import socialImage from "@/app/assets/investor/dholera-insider-oman-banner.webp";
import OmanInvestorPage from "./OmanInvestorPage";
import { omanFaqs } from "./data";

const display = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-oman-display",
});

const body = Geist({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-oman-body",
});

export const metadata = {
  metadataBase: new URL("https://www.dholerainsider.com"),
  title: "Dholera Investment from Oman | Dholera Plots for NRIs",
  description:
    "Explore Dholera investment from Oman with verified residential plots, clear project details, documentation guidance and dedicated NRI support.",
  keywords: [
    "Dholera Investment from Oman",
    "Dholera Plots for NRI in Oman",
    "Buy Dholera Plot from Oman",
    "Dholera Smart City Investment Oman",
    "Dholera Residential Plots for Oman NRIs",
    "Dholera Property Investment from Oman",
    "Invest in Dholera from Oman",
    "Dholera Plot Investment for NRIs",
  ],
  alternates: {
    canonical: "https://www.dholerainsider.com/investor/oman",
  },
  openGraph: {
    title: "Dholera Investment from Oman | Dholera Plots for NRIs",
    description:
      "Explore verified Dholera residential plots from Oman with clear project details and dedicated NRI support.",
    url: "https://www.dholerainsider.com/investor/oman",
    siteName: "Dholera Insider",
    type: "website",
    images: [
      {
        url: socialImage.src,
        width: 800,
        height: 600,
        alt: "Dholera investment guidance for NRIs living in Oman",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dholera Investment from Oman | Dholera Plots for NRIs",
    description:
      "Explore verified Dholera residential plots from Oman with clear project details and dedicated NRI support.",
    images: [socialImage.src],
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: omanFaqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

export default function OmanPage() {
  return (
    <div
      className={`${display.variable} ${body.variable} bg-[#F8F7F3] text-[#051A3A]`}
      style={{ fontFamily: "var(--font-oman-body)" }}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema).replace(/</g, "\\u003c"),
        }}
      />
      <OmanInvestorPage />
    </div>
  );
}
