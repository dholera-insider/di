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
