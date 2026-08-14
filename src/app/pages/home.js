import Hero from "../components/hero";
import CTAsection from "../components/CTAsection";
import ScrollToTopButton from "../components/ScrollToTopButton";

import Invest from "../homecomponents/Invest";
import WhyDI from "../homecomponents/WhyDI";
import WestWyn_Estate from "../homecomponents/WestWyn_Estate";
import FAQSection from "../homecomponents/Faq";
import TestimonialPagination from "../homecomponents/Testimonials";
import RemoteBuying from "../homecomponents/RemoteBuying";
import Icon from "../homecomponents/Icon";
import { LegalSupport } from "../homecomponents/LegalSupport";
import CommonForm from "../components/CommonForm";

const HomePage = () => {
  return (
    <div className="bg-[#FDFCFA] text-[#162033] dark:bg-bgDark">
      <Hero />
      <Icon />
      <Invest />
      <CommonForm/>
      <LegalSupport />
      
      <RemoteBuying />
      <WhyDI />
      <TestimonialPagination />
      <CTAsection />
      <FAQSection />
      <ScrollToTopButton />
    </div>
  );
};

export default HomePage;
