"use client";
import Image from "next/image";
import React, { useState } from "react";
import westwynEstate1 from "@/app/assets/residential/westwyn-residency-dholera-project-section.webp";
import westwynEstate1M from "@/app/assets/residential/westwyn-residency-dholera-project-section-mobile.webp";
import CommonForm from "@/app/components/CommonForm";
import PopupScroll from "@/app/components/PopUpScroll";
import { AnimatePresence } from "framer-motion";
import BrochureDownload from "@/app/components/BrochureDownload";
import PrimeLocationSection from "./PrimeLocations";
import { PhoneIcon } from "lucide-react";
import FAQSection from "./FAQs";

const DocIconTeal = () => (
  <svg
    width="15"
    height="15"
    fill="none"
    stroke="#134e4a"
    strokeWidth="2"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
    />
  </svg>
);

const FeatureCard = ({ icon, title, value }) => (
  <div className="bg-white rounded-xl p-4 border hover:bg-teal-700 group border-gray-200 text-center transition-colors duration-300 ease-in-out">
    <div className="w-12 h-12 bg-blue-100 group-hover:text-white group-hover:scale-110 rounded-full flex items-center justify-center mx-auto mb-2 transition-all duration-300 ease-in-out">
      {icon}
    </div>
    <h4 className="group-hover:text-white group-hover:scale-110 font-semibold text-gray-900 text-sm mb-1 transition-all duration-300 ease-in-out">
      {title}
    </h4>
    <p className="group-hover:text-white group-hover:scale-110 text-[#151f28] font-bold text-lg transition-all duration-300 ease-in-out">
      {value}
    </p>
  </div>
);

export default function Hero() {
  const [brochureFormOpen, setIsBrochureFormOpen] = useState(false);

  const openBrochureForm = () => {
    setIsBrochureFormOpen(true);
  };

  const closeBrochureForm = () => {
    setIsBrochureFormOpen(false);
  };

  const amenities = [
    {
      icon: "🚗",
      title: "EV Charging Station",
    },
    {
      icon: "⚡",
      title: "Power & Water Supply",
    },
    {
      icon: "🏃‍♂️",
      title: "Jogging Track & Yoga Deck",
    },
    {
      icon: "🧒",
      title: "Kids Play Area",
    },
    {
      icon: "🧱",
      title: "Project Boundary",
    },
    {
      icon: "🏘️",
      title: "Gated Community",
    },
    {
      icon: "🛣️",
      title: "Internal Roads",
    },
    {
      icon: "👵",
      title: "Senior Citizen Zone",
    },
    {
      icon: "📱",
      title: "App-Based Society Management",
    },
    {
      icon: "📹",
      title: "24/7 Security & CCTV Surveillance",
    },
    {
      icon: "🚿",
      title: "Drainage System",
    },
    {
      icon: "🏡",
      title: "Clubhouse Lite",
    },
  ];

  const projectFeatures = [
    { icon: "🏠", title: "Plot Sizes", value: "124, 154 and 187 Sq.Yards" },
    { icon: "💰", title: "Price", value: "₹6,000/Sq.Yd" },
    { icon: "🏗️", title: "Project Type", value: "Residential Plots" },
    {
      icon: "📍",
      title: "Location",
      value: "Pipariya, Dholera",
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org/",
            "@type": "WebSite",
            name: "Dholera Insider",
            url: "https://dholerainsider.com/",
            potentialAction: {
              "@type": "SearchAction",
              target:
                "https://dholerainsider.com/residential-projects-in-dholera/westwyn-residency{search_term_string}",
              "query-input": "required name=search_term_string",
            },
          }),
        }}
      />
      <title>
        WestWyn Residency - Premium Residential plots in Dholera Smart City
      </title>
      <meta
        name="description"
        content="Invest in WestWyn Residency Dholera. 100% title-clear & AUDA approved residential plots. Located 0 KM from SIR boundary. Immediate registry and possession available."
      />
      <meta
        name="keywords"
        content="WestWyn Residency Dholera, Dholera plots, Dholera Smart City, Dholera investment, investment in Dholera"
      />
      <link
        rel="canonical"
        href="https://www.dholerainsider.com/residential-projects-in-dholera/westwyn-residency"
      />
      <div className="relative w-full h-[80vh] max-sm:h-[50vh]">
        <Image
          src={westwynEstate1}
          alt="WestWyn Estates in Dholera SIR"
          className="w-full h-full object-cover max-sm:hidden"
          priority
        />
        <Image
          src={westwynEstate1M}
          alt="WestWyn Estates in Dholera SIR"
          className="w-full h-full object-cover md:hidden"
          priority
        />
        <div className="absolute bottom-0 left-0 right-0 p-4 hidden md:block">
          <div className="bg-white/95 backdrop-blur-md rounded-t-2xl shadow-2xl border border-white/30 max-w-6xl mx-auto w-full">
            <div className="flex items-center gap-5 px-6 py-4">
              {/* Status */}
              <div className="flex items-center gap-2 shrink-0">
                <span
                  className="relative flex"
                  style={{ width: 10, height: 10 }}
                >
                  <span className="animate-ping absolute inline-flex rounded-full bg-teal-400 w-full h-full opacity-75" />
                  <span className="relative inline-flex rounded-full bg-teal-500 w-[10px] h-[10px]" />
                </span>
                <span className="text-teal-800 text-[11px] font-bold tracking-widest uppercase">
                  Ongoing
                </span>
              </div>

              <div className="w-px h-9 bg-teal-900/10 shrink-0" />

              {/* Title + Subtitle */}
              <div className="shrink-0">
                <a href="/residential-projects-in-dholera/westwyn-estate">
                  <h2 className="text-teal-900 text-2xl font-bold leading-tight m-0 hover:text-teal-800 transition-colors">
                    WestWyn Residency
                  </h2>
                </a>
                <div className="text-teal-700/70 text-xs mt-1">
                  Govt Approved Plot Starting From ₹8 Lakh
                </div>
              </div>

              <div className="w-px h-12 bg-teal-900/10 shrink-0" />

              {/* Price */}
              <div className="shrink-0">
                <div className="text-teal-900 text-[26px] font-extrabold leading-none">
                  ₹6,000{" "}
                  <span className="text-teal-900/40 text-xs font-normal">
                    /Sq.Yd
                  </span>
                </div>
              </div>

              {/* Spacer */}
              <div className="flex-1" />

              <div className="w-px h-12 bg-teal-900/10 shrink-0" />

              {/* CTAs */}
              <div className="flex items-center gap-3 shrink-0">
                <a
                  href="tel:+919958993549"
                  className="flex items-center gap-2 bg-teal-900 hover:bg-teal-800 text-white px-5 py-2.5 rounded-lg text-[13px] font-bold transition-all duration-200 hover:-translate-y-0.5"
                >
                  <PhoneIcon />
                  Enquire Now
                </a>

                <button
                  onClick={openBrochureForm}
                  className="flex items-center gap-2 bg-white hover:bg-teal-50 border border-teal-900/20 hover:border-teal-800 text-teal-900 px-5 py-2.5 rounded-lg text-[13px] font-semibold transition-all duration-200 hover:-translate-y-0.5 cursor-pointer"
                >
                  <DocIconTeal />
                  Download Brochure
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="md:hidden mt-6">
        <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-white/30 w-full">
          <div className="grid gap-6 p-6">
            {/* Categories & Price */}
            <div>
              <div className="flex items-center gap-2 flex-wrap mb-3">
                <span className="px-3 py-1.5 text-white bg-teal-900 rounded-full text-sm font-medium hover:bg-teal-800 transition-colors">
                  Residential
                </span>
              </div>
              <div className="text-3xl font-bold text-teal-900">
                ₹6,000
                <span className="text-sm text-gray-600 ml-1">/Sq.Yd</span>
              </div>
            </div>

            {/* Title & Description */}
            <div>
              <p className="text-3xl font-bold text-teal-900 mb-2 leading-tight hover:text-teal-800 transition-colors">
                Immediate Possession
              </p>
            </div>

            {/* Contact & Buttons */}
            <div className="flex flex-col justify-between">
              <div className="flex items-center gap-2 text-gray-700 text-base mb-4">
                <button
                  onClick={openBrochureForm}
                  className="flex-1 bg-teal-900 text-white hover:bg-teal-800 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 hover:shadow-lg transform hover:-translate-y-0.5"
                >
                  📄 Download Brochure
                </button>
              </div>
              {/* <div className="text-teal-900 text-xl text-center font-semibold hover:text-teal-800 transition-colors">
                <p>Immediate Possession</p>
              </div> */}
            </div>
          </div>
        </div>
      </div>

      <div className="relative">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920"
            alt="WestWyn Estates"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-emerald-900/95 to-teal-900/95"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 py-12">
          <div className="max-w-7xl mx-auto">
            {/* Heading */}
            <h1 className="text-2xl md:text-4xl md:text-center font-bold text-white mb-6">
              WestWyn Residency - Govt Approved Plots in Dholera
            </h1>
            <div className="max-w-5xl mx-auto">
              <p className="text-lg text-gray-100 leading-relaxed">
                If you are planning to invest in a fast-growing location,
                WestWyn Residency in Dholera offers a practical and
                well-connected opportunity. This government approved residential
                plot project is designed for buyers who want a safe investment
                with real growth potential. Located in Pipariya, this project
                gives you access to key infrastructure while offering immediate
                registry plots in Dholera, making the buying process simple and
                transparent.
              </p>
              <br />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-100 border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 ">
            {projectFeatures.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </div>
      </div>
      <div>
        <PrimeLocationSection />
      </div>
      <div>
        <CommonForm title="Own a Registry Ready Plot in Dholera Under ₹10 Lakh" />
      </div>

      <div className="relative">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920"
            alt="WestWyn Estates"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-emerald-900/95 to-teal-900/95"></div>
        </div>
        <div className="relative z-10 container mx-auto px-4 py-4 md:py-8">
          <div className="max-w-6xl mx-auto">
            {/* Why Invest Section */}
            <div className="mb-12">
              <h2 className="text-xl md:text-4xl font-bold text-white mb-8">
                Why Invest in WestWyn Residency?
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                  <h3 className="text-lg md:text-xl font-semibold text-teal-300 mb-3">
                    Dholera Growth Zone Advantage
                  </h3>
                  <p className="text-gray-200 text-sm">
                    Dholera Smart City is growing fast with major government
                    backed infrastructure and industrial projects. WestWyn
                    Residency is well placed to benefit from this growth, making
                    it a strong choice for long term land value.
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                  <h3 className="text-lg md:text-xl font-semibold text-teal-300 mb-3">
                    Well Connected Residential Location
                  </h3>
                  <p className="text-gray-200 text-sm">
                    WestWyn Residency is located in Pipariya on a Major District
                    Road with smooth access to the State Highway and expressway.
                    It is close to Bhimnath Railway Station and the Dholera SIR
                    boundary, giving buyers strong present day connectivity.
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                  <h3 className="text-lg md:text-xl font-semibold text-teal-300 mb-3">
                    Proximity to Industrial Developments
                  </h3>
                  <p className="text-gray-200 text-sm">
                    The project is near key industrial zones such as Tata
                    Semiconductor Plant, ReNew Solar Park, and Hebatpur
                    Industrial Area. This supports future demand and long term
                    value for residential plots.
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                  <h3 className="text-lg md:text-xl font-semibold text-teal-300 mb-3">
                    Access to Key Infrastructure
                  </h3>
                  <p className="text-gray-200 text-sm">
                    WestWyn Residency enjoys good connectivity to the Ahmedabad
                    Dholera Expressway, Activation Area, and airport corridor.
                    This adds both convenience and future growth potential.
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                  <h3 className="text-lg md:text-xl font-semibold text-teal-300 mb-3">
                    Early Stage Entry Benefit
                  </h3>
                  <p className="text-gray-200 text-sm">
                    Dholera is still developing, which gives buyers a chance to
                    enter at an early stage. WestWyn Residency offers verified
                    plots with clear documents at an accessible entry price.
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                  <h3 className="text-lg md:text-xl font-semibold text-teal-300 mb-3">
                    Clear and Verified Documentation
                  </h3>
                  <p className="text-gray-200 text-sm">
                    WestWyn Residency offers plots with clear title, NA
                    approval, and ready documentation. This reduces confusion
                    and helps buyers move forward with confidence.
                  </p>
                </div>
              </div>
            </div>

            {/* Amenities Section */}
            <div>
              <h2 className="text-xl md:text-4xl font-bold text-white mb-8">
                Amenities
              </h2>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {amenities.map((amenity, index) => (
                  <div
                    key={index}
                    className="bg-teal-500/20 backdrop-blur-sm rounded-lg p-4 text-center border border-teal-400/30 hover:bg-teal-500/30 transition-all duration-300"
                  >
                    <div className="text-xl md:text-4xl mb-2">
                      {amenity.icon}
                    </div>
                    <p className="text-white font-medium text-lg">
                      {amenity.title}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <FAQSection />
            </div>
          </div>
        </div>
      </div>
      <PopupScroll title="Get Registry Ready Plots in Dholera Starting from ₹8 Lakh" />
      <AnimatePresence>
        {brochureFormOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[1000]">
            <BrochureDownload
              title="Get WestWyn Estates Brochure"
              buttonName="Download Brochure"
              onClose={() => closeBrochureForm()}
              link="https://cdn.sanity.io/files/c3e1h345/projects/c9471499567c096befb9416aa99c7f0077900d11.pdf"
            />
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
