
import SingaporeInvestorPage from "./SingaporeInvestorPage";



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
      className={`bg-[#F8F7F3] text-[#051A3A]`}
    >
      <SingaporeInvestorPage />
    </div>
  );
}
