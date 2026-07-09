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
import Link from "next/link";

const DocIconTeal = () => (
  <svg
    width="15"
    height="15"
    fill="none"
    stroke="#051A3A"
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
      <div className="relative w-full h-[clamp(28rem,80svh,46rem)] max-sm:h-[clamp(24rem,62svh,34rem)]">
        <Image
          src={westwynEstate1}
          alt="WestWyn County in Dholera Smart City"
          className="w-full h-full object-cover max-sm:hidden"
          priority
        />
        <Image
          src={westwynEstate1M}
          alt="WestWyn County in Dholera Smart City"
          className="w-full h-full object-cover md:hidden"
          priority
        />
        <div className="absolute bottom-0 left-0 right-0 hidden p-[clamp(0.75rem,1.5vw,1rem)] lg:block">
          <div className="bg-white/95 backdrop-blur-md rounded-t-2xl shadow-2xl border border-white/30 max-w-7xl mx-auto w-full">
            <div className="flex items-center gap-[clamp(0.75rem,1.5vw,1.25rem)] px-[clamp(1rem,2vw,1.5rem)] py-[clamp(0.75rem,1.5vw,1rem)]">
              {/* Status */}
              <div className="flex items-center gap-2 shrink-0">
                <span
                  className="relative flex"
                  style={{ width: 10, height: 10 }}
                >
                  <span className="animate-ping absolute inline-flex rounded-full bg-[#F6C343] w-full h-full opacity-75" />
                  <span className="relative inline-flex rounded-full bg-[#F6C343] w-[10px] h-[10px]" />
                </span>
                <span className="text-[#051A3A] text-[0.6875rem] font-bold tracking-widest uppercase">
                  Ongoing
                </span>
              </div>

              <div className="w-px h-9 bg-[#051A3A]/10 shrink-0" />

              {/* Title + Subtitle */}
              <div className="shrink-0">
                <Link href="/residential-projects-in-dholera/westwyn-estates">
                  <h2 className="text-[#051A3A] text-[clamp(1.25rem,2vw,1.5rem)] font-bold leading-tight m-0 hover:text-[#2B364D] transition-colors">
                    WestWyn Estates
                  </h2>
                </Link>
                <div className="text-[#051A3A]/70 text-xs mt-1 font-bold">
                  Registry Ready Plot under ₹10 Lakh
                </div>
              </div>

              <div className="w-px h-12 bg-[#051A3A]/10 shrink-0" />

              {/* Price */}
              <div className="shrink-0">
                <div className="text-[#051A3A] text-[1.625rem] font-extrabold leading-none">
                  ₹7,000{" "}
                  <span className="text-[#051A3A] text-xs font-bold">
                    /Sq.Yd
                  </span>
                </div>
              </div>

              {/* Spacer */}
              <div className="flex-1" />

              <div className="w-px h-12 bg-[#051A3A]/10 shrink-0" />

              {/* CTAs */}
              <div className="flex items-center gap-3 shrink-0">
                <a
                  href="tel:+919211820887"
                  className="flex items-center gap-2 bg-[#051A3A] hover:bg-[#2B364D] text-white px-5 py-2.5 rounded-lg text-[0.8125rem] font-bold transition-all duration-200 hover:-translate-y-0.5"
                >
                  <PhoneIcon />
                  Site Visit
                </a>

                <button
                  onClick={openBrochureForm}
                  className="flex items-center gap-2 bg-white hover:bg-[#F6C343]/15 border border-[#F6C343]/20 hover:border-[#051A3A] text-[#051A3A] px-5 py-2.5 rounded-lg text-[0.8125rem] font-semibold transition-all duration-200 hover:-translate-y-0.5 cursor-pointer"
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
                <span className="px-3 py-1.5 text-white bg-[#051A3A] rounded-full text-sm font-medium hover:bg-[#2B364D] transition-colors">
                  Residential
                </span>
              </div>
              <div className="text-3xl font-bold text-[#051A3A]">
                ReSale Price ₹12,000
                <span className="text-sm text-gray-600 ml-1">/Sq.Yd</span>
              </div>
            </div>

            {/* Title & Description */}
            <div>
              <p className="text-2xl font-bold text-[#051A3A] mb-2 leading-tight hover:text-[#2B364D] transition-colors">
                WestWyn County
              </p>
            </div>

            {/* Contact & Buttons */}
            <div className="flex flex-col justify-between">
              <div className="flex items-center gap-2 text-gray-700 text-base mb-4">
                <button
                  onClick={openBrochureForm}
                  className="flex-1 bg-[#051A3A] text-white hover:bg-[#2B364D] px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 hover:shadow-lg transform hover:-translate-y-0.5"
                >
                  📄 Download Brochure
                </button>
              </div>
              <div className="text-[#051A3A] text-xl text-center font-semibold hover:text-[#2B364D] transition-colors">
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
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-[#2B364D]/95 to-[#051A3A]/95"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-[clamp(1rem,4vw,2rem)] py-[clamp(2.5rem,6vw,3rem)]">
          <div className="max-w-7xl mx-auto">
            {/* Heading */}
            <h1 className="text-[clamp(1.5rem,3vw,2.25rem)] md:text-center font-bold text-white mb-6">
              About WestWyn County
            </h1>

            <p className="text-[clamp(1rem,1.5vw,1.125rem)] text-gray-100 leading-relaxed">
              WestWyn County is a premium residential plotting project in
              Dholera, strategically located on the Fedra-Pipli State Highway.
              The project has already been fully sold out, which reflects its
              strong market demand and buyer confidence.
            </p>
            <p className="text-[clamp(1rem,1.5vw,1.125rem)] text-gray-100 leading-relaxed">
              For buyers who could not book during the original launch, We are
              offering verified resale plots in WestWyn County. These plots are
              suitable for both future residential construction and long-term
              land investment in Dholera’s fast-developing real estate zone.
            </p>

            <p className="text-[clamp(1rem,1.5vw,1.125rem)] text-gray-200 leading-relaxed">
              With clear documentation, immediate possession, and a prime
              location advantage, WestWyn County resale plots are a reliable
              option for buyers looking for residential plots in Dholera.
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
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-[#2B364D]/95 to-[#051A3A]/95"></div>
        </div>
        <div className="relative z-10 container mx-auto px-[clamp(1rem,4vw,2rem)] py-[clamp(1.5rem,4vw,2rem)]">
          <div className="max-w-7xl mx-auto">
            {/* Amenities Section */}
            <div>
              <h2 className="text-[clamp(1.25rem,3vw,2.25rem)] font-bold text-white mb-4">
                Amenities at WestWyn County
              </h2>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[clamp(0.75rem,2vw,1rem)]">
                {amenities.map((amenity, index) => (
                  <div
                    key={index}
                    className="bg-[#F6C343]/20 backdrop-blur-sm rounded-lg p-[clamp(1rem,2vw,1.25rem)] text-center border border-[#F6C343]/30 hover:bg-[#F6C343]/30 transition-all duration-300"
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

            {/* Why Invest Section */}
            <div className="mt-8">
              <h2 className="text-[clamp(1.25rem,3vw,2.25rem)] font-bold text-white mb-8">
                Why Invest in WestWyn County?
              </h2>

              <div className="grid md:grid-cols-2 gap-[clamp(1rem,2.5vw,1.5rem)]">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-[clamp(1.25rem,2.5vw,1.5rem)] border border-white/20">
                  <h3 className="text-[clamp(1.125rem,2vw,1.25rem)] font-semibold text-[#F6C343] mb-3">
                    Prime Location for Growth
                  </h3>
                  <p className="text-gray-200 text-[0.875rem] leading-[1.7]">
                    Situated close to the growth corridor of Dholera SIR,
                    WestWyn County ensures investors gain early entry into the
                    fastest-developing sectors. Its proximity to mega projects
                    and smooth connectivity to Ahmedabad makes it a smart bet
                    for both living and investment.
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-[clamp(1.25rem,2.5vw,1.5rem)] border border-white/20">
                  <h3 className="text-[clamp(1.125rem,2vw,1.25rem)] font-semibold text-[#F6C343] mb-3">
                    Trusted Developer Legacy
                  </h3>
                  <p className="text-gray-200 text-[0.875rem] leading-[1.7]">
                    Built on years of consistent delivery, superior
                    construction, and glowing customer satisfaction the
                    developer you can depend on for transparency, quality, and
                    long-term value in every project.
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-[clamp(1.25rem,2.5vw,1.5rem)] border border-white/20">
                  <h3 className="text-[clamp(1.125rem,2vw,1.25rem)] font-semibold text-[#F6C343] mb-3">
                    Safe & Legal Investment
                  </h3>
                  <p className="text-gray-200 text-[0.875rem] leading-[1.7]">
                    Fully compliant plots - NA/NOC cleared, layout plan
                    sanctioned, and clear title -ready for registry and extra
                    support such as resale and buy-back. All legal approvals are
                    in place, so you can buy with peace of mind and confidence.
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-[clamp(1.25rem,2.5vw,1.5rem)] border border-white/20">
                  <h3 className="text-[clamp(1.125rem,2vw,1.25rem)] font-semibold text-[#F6C343] mb-3">
                    High Appreciation Potential
                  </h3>
                  <p className="text-gray-200 text-[0.875rem] leading-[1.7]">
                    With Dholera International Airport, Tata’s semiconductor
                    fab, and other industrial investments coming up, WestWyn
                    County plots are positioned for strong appreciation. Early
                    investors stand to gain the most as land values rise in this
                    government-supported smart city.
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-[clamp(1.25rem,2.5vw,1.5rem)] border border-white/20">
                  <h3 className="text-[clamp(1.125rem,2vw,1.25rem)] font-semibold text-[#F6C343] mb-3">
                    Backed by Smart City Infrastructure
                  </h3>
                  <p className="text-gray-200 text-[0.875rem] leading-[1.7]">
                    As part of Dholera Smart City Project, WestWyn County
                    benefits from state and central government-led development.
                    With industrial parks, residential clusters, and mega
                    infrastructure projects underway, the area is primed for
                    sustained growth.
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-[clamp(1.25rem,2.5vw,1.5rem)] border border-white/20">
                  <h3 className="text-[clamp(1.125rem,2vw,1.25rem)] font-semibold text-[#F6C343] mb-3">
                    Trusted Developer Legacy
                  </h3>
                  <p className="text-gray-200 text-[0.875rem] leading-[1.7]">
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
