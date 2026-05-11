"use client";
import Image from "next/image";
import React, { useState } from "react";
import westwynEstate1 from "@/app/assets/residential/westwyn-estates-dholera-project-section.webp";
import westwynEstate1M from "@/app/assets/residential/westwyn-estates-dholera-project-section-mobile.webp";
import CommonForm from "@/app/components/CommonForm";
import PopupScroll from "@/app/components/PopUpScroll";
import { AnimatePresence } from "framer-motion";
import BrochureDownload from "@/app/components/BrochureDownload";
import PrimeLocationSection from "./PrimeLocations";
import FAQSection from "./FAQs";
import {
  WestWynResidencyBrochureButton,
  WestWynResidencyLeadWidgets,
} from "./WestWynResidencyLeadWidgets";
import Link from "next/link";
import { PhoneIcon, FileMinus } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

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
    <p className="group-hover:text-white group-hover:scale-110 font-semibold text-gray-900 text-sm mb-1 transition-all duration-300 ease-in-out">
      {title}
    </p>
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
      icon: "📍",
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
    { icon: "🏠", title: "Plot Size", value: "152 and 200 Sq.Yards" },
    { icon: "💰", title: "Price", value: "₹6,700/Sq.Yd" },
    { icon: "🏗️", title: "Project Type", value: "Residential Plots" },
    { icon: "📍", title: "Location", value: "Polarpur, Dholera" },
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
                "https://dholerainsider.com/residential-projects-in-dholera/westwyn-estate{search_term_string}",
              "query-input": "required name=search_term_string",
            },
          }),
        }}
      />
      <title>Govt Approved Residential Plots in Dholera Westwyn Estates</title>
      <meta
        name="description"
        content="Govt approved residential plots in Dholera Westwyn Estates with clear title, registry-ready documentation, site visit support."
      />
      <meta
        name="keywords"
        content="WestWyn Estates Dholera, Dholera plots, Dholera Smart City, Dholera investment, investment in Dholera"
      />
      <link
        rel="canonical"
        href="https://www.dholerainsider.com/residential-projects-in-dholera/westwyn-estate"
      />
      <div className="relative w-full h-[clamp(28rem,80svh,46rem)] max-sm:h-[clamp(24rem,62svh,34rem)]">
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
        <div className="absolute bottom-0 left-0 right-0 hidden p-[clamp(0.75rem,1.5vw,1rem)] lg:block">
          <div className="bg-white/95 backdrop-blur-md rounded-t-2xl shadow-2xl border border-white/30 max-w-[calc(100vw-2rem)] lg:max-w-6xl mx-auto w-full">
            <div className="flex items-center gap-[clamp(0.75rem,1.5vw,1.25rem)] px-[clamp(1rem,2vw,1.5rem)] py-[clamp(0.75rem,1.5vw,1rem)]">
              {/* Status */}
              <div className="flex items-center gap-2 shrink-0">
                <span
                  className="relative flex"
                  style={{ width: 10, height: 10 }}
                >
                  <span className="animate-ping absolute inline-flex rounded-full bg-teal-400 w-full h-full opacity-75" />
                  <span className="relative inline-flex rounded-full bg-teal-500 w-[10px] h-[10px]" />
                </span>
                <span className="text-teal-800 text-[0.6875rem] font-bold tracking-widest uppercase">
                  Ongoing
                </span>
              </div>

              <div className="w-px h-9 bg-teal-900/10 shrink-0" />

              {/* Title + Subtitle */}
              <div className="shrink-0">
                <a href="/residential-projects-in-dholera/westwyn-estate">
                  <h2 className="text-teal-900 text-[clamp(1.25rem,2vw,1.5rem)] font-bold leading-tight m-0 hover:text-teal-800 transition-colors">
                    WestWyn Estates
                  </h2>
                </a>
                <div className="text-teal-700/70 text-xs mt-1">
                  Registry-ready plots in Polarpur, Dholera starting from ₹10
                  lakh
                </div>
              </div>

              <div className="w-px h-12 bg-teal-900/10 shrink-0" />

              {/* Price */}
              <div className="shrink-0">
                <div className="text-teal-900 text-[1.625rem] font-extrabold leading-none">
                  ₹6,700{" "}
                  <span className="text-teal-900/40 text-xs font-normal">
                    /Sq.Yd
                  </span>
                </div>
                <div className="text-teal-900/40 text-[0.625rem] tracking-widest uppercase mt-0.5">
                  Price
                </div>
              </div>

              {/* Spacer */}
              <div className="flex-1" />

              <div className="w-px h-12 bg-teal-900/10 shrink-0" />

              {/* CTAs */}
              <div className="flex items-center gap-3 shrink-0">
                <a
                  href="tel:+919958993549"
                  className="flex items-center gap-2 bg-teal-900 hover:bg-teal-800 text-white px-5 py-2.5 rounded-lg text-[0.8125rem] font-bold transition-all duration-200 hover:-translate-y-0.5"
                >
                  <PhoneIcon />
                  Call Now
                </a>

                <button
                  onClick={openBrochureForm}
                  className="flex items-center gap-2 bg-white hover:bg-teal-50 border border-teal-900/20 hover:border-teal-800 text-teal-900 px-5 py-2.5 rounded-lg text-[0.8125rem] font-semibold transition-all duration-200 hover:-translate-y-0.5 cursor-pointer"
                >
                  <DocIconTeal />
                  Brochure
                </button>
              </div>
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
        <div className="relative z-10 container mx-auto px-[clamp(1rem,4vw,2rem)] py-[clamp(2.5rem,6vw,3rem)]">
          <div className="max-w-7xl mx-auto">
            {/* Heading */}
            <h1 className="text-[clamp(1.5rem,3vw,2.25rem)] md:text-center font-bold text-white mb-6">
              WestWyn Estates :{" "}
              <span>Registry-Ready plots in Polarpur, Dholera</span>
            </h1>
            <div className="max-w-5xl mx-auto">
              <p className="text-[clamp(1rem,1.5vw,1.125rem)] text-gray-100 leading-relaxed">
                WestWyn Estates is a premium residential plotting project in
                Polarpur, Dholera, designed for buyers who want a secure and
                future-ready investment near Dholera SIR. The project offers
                residential plots with clear documentation, planned amenities,
                and strong connectivity to important infrastructure locations in
                Dholera. <br />
                <br /> Located with direct access from State Highway-117 and
                close to Bhimnath Railway Junction, WestWyn Estates is suitable
                for investors looking for registry-ready plots in Dholera with
                long-term growth potential.
              </p>
              <br />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-100 border-b">
        <div className="max-w-7xl mx-auto px-[clamp(1rem,4vw,2rem)] py-[clamp(1.25rem,3vw,1.5rem)]">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-[clamp(0.75rem,2vw,1rem)]">
            {projectFeatures.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </div>
      </div>


      <div className="space-y-4 py-[clamp(1.5rem,4vw,2rem)]">
        <div className="h-full px-[clamp(1rem,4vw,2rem)]">
          <div className="flex flex-col items-center justify-center gap-[clamp(0.75rem,1.5vw,1rem)] sm:flex-row">
            <WestWynResidencyBrochureButton className="flex w-full hover:border-teal-900 hover:border-2 cursor-pointer items-center justify-center gap-2 rounded-xl bg-teal-900 px-[clamp(1rem,2.5vw,1.25rem)] py-3 text-[0.9375rem] font-medium text-white transition-colors hover:bg-white hover:text-teal-900 sm:w-auto">
              <FileMinus /> Download Brochure
            </WestWynResidencyBrochureButton>

            <Link
              href="https://wa.me/919211820887"
              className="flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-xl border border-teal-900 bg-white px-[clamp(1rem,2.5vw,1.25rem)] py-3 text-[0.9375rem] font-medium text-teal-900 transition-colors hover:bg-teal-900 hover:text-white sm:w-auto"
            >
              <FaWhatsapp className="text-lg" /> Enquire Now
            </Link>
          </div>
        </div>
      </div>

      <div>
        <PrimeLocationSection />
      </div>
      <div>
        <CommonForm title="Own a Registry Ready Plot in Dholera Starting from ₹10 Lakh" />
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
        <div className="relative z-10 container mx-auto px-[clamp(1rem,4vw,2rem)] py-[clamp(1.5rem,4vw,2rem)]">
          <div className="max-w-6xl mx-auto">
            {/* Why Invest Section */}
            <div className="mb-12">
              <h2 className="text-[clamp(1.25rem,3vw,2.25rem)] font-bold text-white mb-8">
                Why Invest in WestWyn Estates?
              </h2>

              <div className="grid md:grid-cols-2 gap-[clamp(1rem,2.5vw,1.5rem)]">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-[clamp(1.25rem,2.5vw,1.5rem)] border border-white/20">
                  <h3 className="text-[clamp(1.125rem,2vw,1.25rem)] font-semibold text-teal-300 mb-3">
                    Strong Dholera Investment Location
                  </h3>
                  <p className="text-gray-200 text-[0.875rem] leading-[1.7]">
                    WestWyn Estates is located near important infrastructure and
                    industrial development routes, making it suitable for buyers
                    looking at long-term investment in Dholera Smart City.
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-[clamp(1.25rem,2.5vw,1.5rem)] border border-white/20">
                  <h3 className="text-[clamp(1.125rem,2vw,1.25rem)] font-semibold text-teal-300 mb-3">
                    Direct Highway Access
                  </h3>
                  <p className="text-gray-200 text-[0.875rem] leading-[1.7]">
                    The project offers direct access from State Highway-117,
                    helping improve connectivity and future usability.
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-[clamp(1.25rem,2.5vw,1.5rem)] border border-white/20">
                  <h3 className="text-[clamp(1.125rem,2vw,1.25rem)] font-semibold text-teal-300 mb-3">
                    Close to Railway Connectivity
                  </h3>
                  <p className="text-gray-200 text-[0.875rem] leading-[1.7]">
                    Its proximity to Bhimnath Railway Junction adds location
                    strength for buyers who value accessible transport
                    connectivity.
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-[clamp(1.25rem,2.5vw,1.5rem)] border border-white/20">
                  <h3 className="text-[clamp(1.125rem,2vw,1.25rem)] font-semibold text-teal-300 mb-3">
                    Registry Ready Plots
                  </h3>
                  <p className="text-gray-200 text-[0.875rem] leading-[1.7]">
                    The project is positioned with clear-title, NA/NOC approved,
                    and registry-ready documentation, helping buyers complete
                    their investment process smoothly.
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-[clamp(1.25rem,2.5vw,1.5rem)] border border-white/20">
                  <h3 className="text-[clamp(1.125rem,2vw,1.25rem)] font-semibold text-teal-300 mb-3">
                    Planned Community Amenities
                  </h3>
                  <p className="text-gray-200 text-[0.875rem] leading-[1.7]">
                    WestWyn Estates offers practical amenities such as internal
                    roads, gated community planning, security, power, water,
                    drainage, and lifestyle features for future residential use.
                  </p>
                </div>
              </div>
            </div>

            {/* Amenities Section */}
            <div>
              <h2 className="text-[clamp(1.25rem,3vw,2.25rem)] font-bold text-white mb-8">
                Amenities at WestWyn Estates
              </h2>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[clamp(0.75rem,2vw,1rem)]">
                {amenities.map((amenity, index) => (
                  <div
                    key={index}
                    className="bg-teal-500/20 backdrop-blur-sm rounded-lg p-[clamp(1rem,2vw,1.25rem)] text-center border border-teal-400/30 hover:bg-teal-500/30 transition-all duration-300"
                  >
                    <div className="text-xl md:text-4xl mb-2">
                      {amenity.icon}
                    </div>
                    <p className="text-white font-medium text-[clamp(1rem,1.8vw,1.125rem)] leading-[1.4]">
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
      <PopupScroll title="Get Project Details" />
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
      <WestWynResidencyLeadWidgets />
    </>
  );
}
