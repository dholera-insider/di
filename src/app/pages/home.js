import Hero from "../components/hero";
import CTAsection from "../components/CTAsection";
import LazyCommonFormSection from "../components/LazyCommonFormSection";
import ScrollToTopButton from "../components/ScrollToTopButton";

import Invest from "../homecomponents/Invest";
import WhyDI from "../homecomponents/WhyDI";
import WestWyn_Estate from "../homecomponents/WestWyn_Estate";
import FAQSection from "../homecomponents/Faq";
import LatestUpdates from "../homecomponents/FeaturedBlogs";
import TestimonialPagination from "../homecomponents/Testimonials";
import RemoteBuying from "../homecomponents/RemoteBuying";
import Icon from "../homecomponents/Icon";
import { LegalSupport } from "../homecomponents/LegalSupport";

const HomePage = () => {
  return (
    <div className="bg-[#FDFCFA] text-[#162033] dark:bg-bgDark">
      <Hero />
      {/* <Countries /> */}
      <Icon />
      <Invest />
      {/* <WestWyn_Estate /> */}
      <LazyCommonFormSection title="Own a Govt Approved Plot in Dholera" />
      <WhyDI />
      <LegalSupport/>
      <RemoteBuying />
      <CTAsection />
      <FAQSection />
      <TestimonialPagination />
      <ScrollToTopButton />
    </div>
  );
};

export default HomePage;
