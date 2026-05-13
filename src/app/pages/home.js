import Hero from "../components/hero";
import CTAsection from "../components/CTAsection";
import LazyCommonFormSection from "../components/LazyCommonFormSection";
import ScrollToTopButton from "../components/ScrollToTopButton";

import Invest from "../homecomponents/Invest";
import WhyDI from "../homecomponents/WhyDI";
import WestWyn_Estate from "../homecomponents/WestWyn_Estate";
import FAQSection from "../homecomponents/Faq";
import LatestUpdates from "../homecomponents/FeaturedBlogs";
import Dholera from "../homecomponents/Dholera";
import TestimonialPagination from "../homecomponents/Testimonials";
import Groundzero from "../homecomponents/Groundzero";

const HomePage = () => {
  return (
    <div className="dark:bg-bgDark">
      <Hero />
      <Invest />
   
      <WestWyn_Estate />
      <LazyCommonFormSection title="Own a Govt Approved Plot in Dholera" />
      <WhyDI />
      <LatestUpdates />
      <Groundzero />
      <CTAsection />
      <FAQSection />
      <TestimonialPagination />
      <ScrollToTopButton />
    </div>
  );
};

export default HomePage;
