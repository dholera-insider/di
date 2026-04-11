"use client";
import Image from "next/image";
import React, { useState } from "react";
import westwynEstate1 from "@/app/assets/residential2/county.webp";
import westwynEstate1M from "@/app/assets/residential/county-mob.webp";
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

  const amenities = [
    {
      icon: "👥", // Users
      title: "Club House & Co-Working Space",
    },
    {
      icon: "🏰", // Shield
      title: "Gated Community",
    },
    {
      icon: "⚡", // Car
      title: "EV Charging Station",
    },
    {
      icon: "🧒", // Baby
      title: "Kids Play Area",
    },
    {
      icon: "📹", // Shield
      title: "24/7 Security & CCTV Surveillance",
    },
    {
      icon: "🏊", // Waves
      title: "Swimming Pool",
    },
    {
      icon: "📱", // Globe
      title: "App-based Society Management",
    },
    {
      icon: "🌳", // Trees
      title: "Lush Green Surroundings",
    },
    {
      icon: "💪", // Baby
      title: "Indoor Games & Gymnasium",
    },
    {
      icon: "💡", // Lightbulb
      title: "Automated Street Light",
    },
    {
      icon: "🏃", // Activity
      title: "Jogging Track",
    },
    {
      icon: "🛣️", // FaRoad
      title: "Internal Roads",
    },
    {
      icon: "📍", // SquareDashed
      title: "Project Boundary",
    },
    {
      icon: "🧘", // Heart
      title: "Yoga Deck & Senior Citizen Zone",
    },
    {
      icon: "💧", // Zap
      title: "Power & Water Supply",
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
                "https://dholerainsider.com/residential-projects-in-dholera/westwyn-county{search_term_string}",
              "query-input": "required name=search_term_string",
            },
          }),
        }}
      />
      <title>
        WestWyn County Dholera | Secure Your Residential Plots Near Dholera SIR
      </title>
      <meta
        name="description"
        content="WestWyn County offers approved residential plots near Dholera Smart City. Ideal for homebuyers and investors looking for future growth in Dholera SIR."
      />
      <meta
        name="keywords"
        content="WestWyn County Dholera, Dholera plots, Dholera Smart City, Dholera investment, smart city Gujarat"
      />
      <link
        rel="canonical"
        href="https://www.dholerainsider.com/residential-projects-in-dholera/westwyn-county"
      />
      <div className="relative w-full h-[80vh] max-sm:h-[50vh]">
        <Image
          src={westwynEstate1}
          alt="WestWyn County in Dholera Smart City"
          className="w-full h-full max-sm:hidden"
          priority
        />
        <Image
          src={westwynEstate1M}
          alt="WestWyn County in Dholera Smart City"
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
                ₹11,000
                <span className="text-sm text-gray-600 ml-1">/Sq.Yd</span>
              </div>
            </div>

            {/* Title & Description */}
            <div>
              <p className="text-2xl font-bold text-teal-900 mb-2 leading-tight hover:text-teal-800 transition-colors">
                WestWyn County
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
              <div className="text-teal-900 text-xl text-center font-semibold hover:text-teal-800 transition-colors">
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
            alt="WestWyn County"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-emerald-900/95 to-teal-900/95"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            {/* Heading */}
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">
              About WestWyn County
            </h1>

            <p className="text-lg text-gray-100 leading-relaxed">
              WestWyn County brings a secure and future-ready investment
              opportunity in Dholera SIR, offering 100% government-approved,
              clear-title plots. Backed by the vision of Dholera Smart City
              Project, it caters to both Indian and NRI investors with
              registry-ready documentation, flexible payment plans, resale
              support, and buy-back assistance*. It’s a hassle-free way to own a
              piece of India’s most ambitious greenfield smart city.
            </p>

            <p className="text-lg text-gray-200 leading-relaxed">
              Located on the Fedra–Pipli State Highway (100 ft road), WestWyn
              County enjoys one of the most connected addresses in Dholera. The
              project is just 15 minutes away from Dholera International Airport
              and the Ahmedabad–Dholera Expressway, giving residents and
              investors direct access to Gujarat’s next big economic hub.
              Surrounded by upcoming residential sectors, industrial hubs, and
              commercial projects, this location combines convenience with
              long-term value growth.
            </p>
          </div>
        </div>
      </div>

      <div>
        <CommonForm title="Invest in Premium Residential Plots in Dholera Smart City" />
      </div>

      <div className="relative">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920"
            alt="WestWyn County"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-emerald-900/95 to-teal-900/95"></div>
        </div>
        <div className="relative z-10 container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-4xl mx-auto">
            {/* Why Invest Section */}
            <div className="mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
                Why Invest in WestWyn County?
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                  <h3 className="text-xl font-semibold text-teal-300 mb-3">
                    Prime Location for Growth
                  </h3>
                  <p className="text-gray-200 text-sm">
                    Situated close to the growth corridor of Dholera SIR,
                    WestWyn County ensures investors gain early entry into the
                    fastest-developing sectors. Its proximity to mega projects
                    and smooth connectivity to Ahmedabad makes it a smart bet
                    for both living and investment.
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                  <h3 className="text-xl font-semibold text-teal-300 mb-3">
                    Trusted Developer Legacy
                  </h3>
                  <p className="text-gray-200 text-sm">
                    Built on years of consistent delivery, superior
                    construction, and glowing customer satisfaction the
                    developer you can depend on for transparency, quality, and
                    long-term value in every project.
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                  <h3 className="text-xl font-semibold text-teal-300 mb-3">
                    Safe & Legal Investment
                  </h3>
                  <p className="text-gray-200 text-sm">
                    Fully compliant plots - NA/NOC cleared, layout plan
                    sanctioned, and clear title -ready for registry and extra
                    support such as resale and buy-back. All legal approvals are
                    in place, so you can buy with peace of mind and confidence.
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                  <h3 className="text-xl font-semibold text-teal-300 mb-3">
                    High Appreciation Potential
                  </h3>
                  <p className="text-gray-200 text-sm">
                    With Dholera International Airport, Tata’s semiconductor
                    fab, and other industrial investments coming up, WestWyn
                    County plots are positioned for strong appreciation. Early
                    investors stand to gain the most as land values rise in this
                    government-supported smart city.
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                  <h3 className="text-xl font-semibold text-teal-300 mb-3">
                    Backed by Smart City Infrastructure
                  </h3>
                  <p className="text-gray-200 text-sm">
                    As part of Dholera Smart City Project, WestWyn County benefits from
                    state and central government-led development. With
                    industrial parks, residential clusters, and mega
                    infrastructure projects underway, the area is primed for
                    sustained growth.
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

            {/* Amenities Section */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
                Amenities
              </h2>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {amenities.map((amenity, index) => (
                  <div
                    key={index}
                    className="bg-teal-500/20 backdrop-blur-sm rounded-lg p-4 text-center border border-teal-400/30 hover:bg-teal-500/30 transition-all duration-300"
                  >
                    <div className="text-2xl mb-2">{amenity.icon}</div>
                    <p className="text-white font-medium text-sm">
                      {amenity.title}
                    </p>
                  </div>
                ))}
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
              title="Get WestWyn County Brochure"
              buttonName="Download Brochure"
              onClose={() => closeBrochureForm()}
              link="https://cdn.sanity.io/files/c3e1h345/projects/9f32c6d0d835cfc039e42a741e63894f87fd48ce.pdf"
            />
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
