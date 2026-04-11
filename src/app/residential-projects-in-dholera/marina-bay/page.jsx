"use client";
import Image from "next/image";
import React, { useState } from "react";
import westwynEstate1 from "@/app/assets/residential2/marina.webp";
import westwynEstate1M from "@/app/assets/residential/marinabay-mob.webp";
import CommonForm from "@/app/components/CommonForm";
import PopupScroll from "@/app/components/PopUpScroll";
import { AnimatePresence } from "framer-motion";
import BrochureDownload from "@/app/components/BrochureDownload";
import { PhoneIcon } from "lucide-react";

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

export default function Hero() {
  const [brochureFormOpen, setIsBrochureFormOpen] = useState(false);

  const openBrochureForm = () => {
    setIsBrochureFormOpen(true);
  };

  const closeBrochureForm = () => {
    setIsBrochureFormOpen(false);
  };

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
                "https://dholerainsider.com/residential-projects-in-dholera/marina-bay{search_term_string}",
              "query-input": "required name=search_term_string",
            },
          }),
        }}
      />
      <title>
        Marina bay residential plots on Navda Highway 0 km from Dholera SIR
      </title>
      <meta
        name="description"
        content="Marina Bay residential project in Dholera near the Ahmedabad-Dholera Expressway & Dholera International Airport, offering secure residential plots with approvals and modern facilities."
      />
      <meta
        name="keywords"
        content="Marina Bay Dholera, Dholera plots, smart city Gujarat, Dholera Smart City, Dholera investment"
      />
      <link
        rel="canonical"
        href="https://www.dholerainsider.com/residential-projects-in-dholera/marina-bay"
      />
      <div className="relative w-full h-[80vh] max-sm:h-[50vh]">
        <Image
          src={westwynEstate1}
          alt="Maple Township in Dholera"
          className="w-full h-full max-sm:hidden"
          priority
        />
        <Image
          src={westwynEstate1M}
          alt="Maple Township in Dholera"
          className="w-full h-full md:hidden"
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
                    WestWyn Estates
                  </h2>
                </a>
                <div className="text-teal-700/70 text-xs mt-1">
                  Registry Ready Plot under ₹10 Lakh
                </div>
              </div>

              <div className="w-px h-12 bg-teal-900/10 shrink-0" />

              {/* Price */}
              <div className="shrink-0">
                <div className="text-teal-900 text-[26px] font-extrabold leading-none">
                  ₹6,500{" "}
                  <span className="text-teal-900/40 text-xs font-normal">
                    /Sq.Yd
                  </span>
                </div>
                <div className="text-teal-900/40 text-[10px] tracking-widest uppercase mt-0.5">
                  Starting Price
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
                  Site Visit
                </a>

                <button
                  onClick={openBrochureForm}
                  className="flex items-center gap-2 bg-white hover:bg-teal-50 border border-teal-900/20 hover:border-teal-800 text-teal-900 px-5 py-2.5 rounded-lg text-[13px] font-semibold transition-all duration-200 hover:-translate-y-0.5 cursor-pointer"
                >
                  <DocIconTeal />
                  Brochure
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
                ₹6,500
                <span className="text-sm text-gray-600 ml-1">/Sq.Yd</span>
              </div>
            </div>

            {/* Title & Description */}
            <div>
              <a href="/residential-projects-in-dholera/westwyn-estate">
                <p className="text-2xl font-bold text-teal-900 hover:text-teal-800 mb-2 leading-tight">
                  <span className="text-base font-bold text-teal-900">
                    Explore Our Latest Project
                  </span>{" "}
                  <br /> WestWyn Estates
                </p>
              </a>
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
              <div className="text-teal-900 text-center text-xl font-semibold hover:text-teal-800 transition-colors">
                <p>Immediate Possession</p>
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
            alt="Marina Bay"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-emerald-900/95 to-teal-900/95"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            {/* Heading */}
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">
              About Marina Bay
            </h1>

            <p className="text-lg text-gray-100 leading-relaxed">
              Marina Bay is a modern plotting project situated in Village Gamph,
              Tehsil Dholera, District Ahmedabad, inside Dholera Smart City
              (Dholera SIR). With its strategic location near the
              Ahmedabad-Dholera Expressway and the proposed Dholera
              International Airport, the project offers secure residential plots
              with approvals and modern facilities as part of India’s Greenfield
              Smart City.
            </p>

            <p className="text-lg text-gray-200 leading-relaxed">
              Located on Navda Highway, right at the entrance of Dholera SIR (0
              km) and close to TP 5, Marina Bay places you at the center of a
              rapidly developing smart city corridor. Every plot here is
              designed as a secure, future-ready investment that grows as
              Dholera transforms.
            </p>
          </div>
        </div>
      </div>

      <div>
        <CommonForm title="Registry Ready Plots Under ₹10 Lakh" />
      </div>

      <div className="relative">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920"
            alt="Marina Bay"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-emerald-900/95 to-teal-900/95"></div>
        </div>
        <div className="relative z-10 container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-4xl mx-auto">
            {/* Why Invest Section */}
            <div className="mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
                Why Invest in Marina Bay?
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                  <h3 className="text-xl font-semibold text-teal-300 mb-3">
                    Location Strength
                  </h3>
                  <p className="text-gray-200 text-sm">
                    Inside Dholera SIR, well-connected to the expressway,
                    airport, and Dholera Metro City.
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                  <h3 className="text-xl font-semibold text-teal-300 mb-3">
                    Future Value Growth
                  </h3>
                  <p className="text-gray-200 text-sm">
                    Investing at the development stage of Dholera Smart City
                    ensures strong appreciation.
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                  <h3 className="text-xl font-semibold text-teal-300 mb-3">
                    Safe Purchase
                  </h3>
                  <p className="text-gray-200 text-sm">
                    Every plot is NA/NOC approved, with clear titles and
                    registry-ready documents.
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                  <h3 className="text-xl font-semibold text-teal-300 mb-3">
                    Planned Township
                  </h3>
                  <p className="text-gray-200 text-sm">
                    Gated campus, internal roads, electrification, drainage, and
                    green zones.
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                  <h3 className="text-xl font-semibold text-teal-300 mb-3">
                    Flexible Options
                  </h3>
                  <p className="text-gray-200 text-sm">
                    Various plot sizes and payment flexibility make it suitable
                    for both investors and end-users.
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20 ">
                  <h3 className="text-xl font-semibold text-teal-300 mb-3">
                    Trusted Developer Legacy
                  </h3>
                  <p className="text-gray-200 text-sm">
                    Six projects successfully sold out, reflecting investor
                    trust.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <PopupScroll title="Invest in Verified Plots in Dholera Under ₹10 Lakh" />
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
