import { Suspense } from "react";
import Hero from "../components/hero";
import CTAsection from "../components/CTAsection";
import Invest from "../homecomponents/Invest";
import WhyDI from "../homecomponents/WhyDI";
import FAQSection from "../homecomponents/Faq";
import TestimonialPagination from "../homecomponents/Testimonials";
import LatestUpdates from "../homecomponents/LatestUpdates";
import RemoteBuying from "../homecomponents/RemoteBuying";
import Icon from "../homecomponents/Icon";
import { LegalSupport } from "../homecomponents/LegalSupport";
import HomePageForm from "../components/HomePageForm";
import DholeraInvestmentForm from "../homecomponents/DholeraInvesmentForm";
import CommonForm from "../components/CommonForm";

const PAGE_TITLE =
  "Dholera Insider | Dholera Smart City Plots for NRIs";

const PAGE_DESCRIPTION =
  "Explore residential plots in Dholera Smart City with Dholera Insider. Get transparent pricing, property documentation guidance, and dedicated NRI investment support.";

const PAGE_URL = "https://www.dholerainsider.com/";

export const metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,

  keywords: [
    "Dholera Insider",
    "Dholera Smart City",
    "Dholera SIR",
    "Dholera investment",
    "Dholera residential plots",
    "Plots in Dholera",
    "Dholera Smart City investment",
    "Buy plots in Dholera",
    "Dholera property investment",
    "Dholera NRI investment",
    "Invest in Dholera",
    "Dholera real estate",
  ],

  alternates: {
    canonical: PAGE_URL,
  },

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: PAGE_URL,
    type: "website",
    siteName: "Dholera Insider",
    locale: "en_IN",
  },

  twitter: {
    card: "summary",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
  },
};

const HomePage = () => {
  return (
    <div className="bg-[#FDFCFA] text-[#162033] dark:bg-bgDark">
      <Hero />
      <Icon />
      <Invest />
      <HomePageForm/>
      <LegalSupport />
      <RemoteBuying />
      <WhyDI />
      <TestimonialPagination />
      <Suspense fallback={null}>
        <LatestUpdates />
      </Suspense>
      <CTAsection />
      <FAQSection />
    </div>
  );
};

export default HomePage;
