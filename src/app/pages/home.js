import Hero from "../components/hero";
import CTAsection from "../components/CTAsection";
import Invest from "../homecomponents/Invest";
import WhyDI from "../homecomponents/WhyDI";
import WestWyn_Estate from "../homecomponents/WestWyn_Estate";
import FAQSection from "../homecomponents/Faq";
import TestimonialPagination from "../homecomponents/Testimonials";
import RemoteBuying from "../homecomponents/RemoteBuying";
import Icon from "../homecomponents/Icon";
import { LegalSupport } from "../homecomponents/LegalSupport";
import CommonForm from "../components/CommonForm";
import DholeraInvestmentForm from "../homecomponents/DholeraInvesmentForm";



const HomePage = () => {
  return (
    <div className="bg-[#FDFCFA] text-[#162033] dark:bg-bgDark">
      <Hero />
      <Icon />
      <Invest />
      <DholeraInvestmentForm/>
      <LegalSupport />
      <RemoteBuying />
      <WhyDI />
      <TestimonialPagination />
      <CTAsection />
      <FAQSection />
    </div>
  );
};

export default HomePage;
