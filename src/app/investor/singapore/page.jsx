import { Geist, Space_Grotesk } from "next/font/google";

import SingaporeInvestorPage from "./SingaporeInvestorPage";

const display = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-singapore-display",
});

const body = Geist({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-singapore-body",
});

export const metadata = {
  title:
    "Dholera Investment from Singapore | Verified Residential Plots for NRIs",
  description:
    "Explore verified residential plots in Dholera from Singapore. Compare projects, verify documents, and invest with complete transparency through Dholera Insider.",
  alternates: {
    canonical: "https://www.dholerainsider.com/investor/singapore",
  },
  openGraph: {
    title:
      "Dholera Investment from Singapore | Verified Residential Plots for NRIs",
    description:
      "Explore verified residential plots in Dholera from Singapore. Compare projects, verify documents, and invest with complete transparency through Dholera Insider.",
    url: "https://www.dholerainsider.com/investor/singapore",
    siteName: "Dholera Insider",
    type: "website",
  },
};

export default function SingaporePage() {
  return (
    <div
      className={`${display.variable} ${body.variable} bg-[#F8F7F3] text-[#051A3A]`}
      style={{ fontFamily: "var(--font-singapore-body)" }}
    >
      <SingaporeInvestorPage />
    </div>
  );
}
