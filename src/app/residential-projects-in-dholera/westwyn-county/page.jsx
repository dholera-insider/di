"use client";
import Image from "next/image";
import React, { useState } from "react";
import westwynEstate1 from "@/app/assets/dholera-residential/county-desktop.webp";
import westwynEstate1M from "@/app/assets/dholera-residential/county-mobile.webp";
import CommonForm from "@/app/components/CommonForm";
import PopupScroll from "@/app/components/PopUpScroll";
import { AnimatePresence } from "framer-motion";
import BrochureDownload from "@/app/components/BrochureDownload";
import { FileMinus, MapPin } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import Link from "next/link";

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
      <section
        className="grid overflow-hidden bg-[#051A3A] lg:grid-cols-[minmax(23rem,38%)_minmax(0,62%)]"
        aria-labelledby="westwyn-county-hero-title"
      >
        <div className="order-2 flex items-center px-5 py-10 sm:px-8 sm:py-14 lg:order-1 lg:min-h-[clamp(34rem,40vw,48rem)] lg:px-[clamp(2.5rem,4vw,5rem)] lg:py-16">
          <div className="w-full max-w-xl">
            <h1
              id="westwyn-county-hero-title"
              className="m-0 text-[#F6C343]"
            >
              <span className="block text-[clamp(2.35rem,5vw,4.25rem)] font-bold leading-[0.95] tracking-[-0.035em]">
                WestWyn
              </span>
              <span className="mt-2 block text-[clamp(1.35rem,2.7vw,2.3rem)] font-medium leading-none tracking-[0.3em] sm:tracking-[0.38em]">
                County
              </span>
            </h1>

            <div className="mt-5 flex items-center gap-2.5 text-sm font-semibold text-white sm:text-base">
              <MapPin
                className="h-5 w-5 shrink-0 text-[#F6C343]"
                aria-hidden="true"
              />
              <span>Fedra-Pipli State Highway, Dholera</span>
            </div>

            <div className="my-8 h-px w-20 bg-[#F6C343]" aria-hidden="true" />

            <p className="text-[clamp(1.75rem,3.3vw,2.8rem)] font-bold leading-[1.12] tracking-[-0.025em] text-white">
              Verified Resale. Immediate Possession.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:flex-col 2xl:flex-row">
              <Link
                href="https://wa.me/919211820887?text=I%20want%20details%20about%20WestWyn%20County"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-14 items-center justify-center gap-2.5 rounded-lg bg-[#22C967] px-5 py-3 text-center text-sm font-bold text-white shadow-lg shadow-black/20 transition-colors hover:bg-[#1db85c] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#051A3A]"
                aria-label="Get WestWyn County details on WhatsApp"
              >
                <FaWhatsapp className="h-5 w-5 shrink-0" aria-hidden="true" />
                Get Details on WhatsApp
              </Link>

              
            </div>
          </div>
        </div>

        <div className="relative order-1 aspect-[9/11] w-full sm:aspect-[3/2] lg:order-2 lg:aspect-auto lg:min-h-[clamp(34rem,40vw,48rem)]">
          <picture>
            <source
              media="(max-width: 639px)"
              srcSet={westwynEstate1M.src}
              type="image/webp"
            />
            <Image
              src={westwynEstate1}
              alt="Entrance and internal road at WestWyn County, Dholera"
              fill
              className="object-cover"
              loading="eager"
              fetchPriority="high"
              sizes="(min-width: 1024px) 62vw, 100vw"
            />
          </picture>
          <div
            className="pointer-events-none absolute inset-y-0 left-0 hidden w-16 bg-gradient-to-r from-[#051A3A]/25 to-transparent lg:block"
            aria-hidden="true"
          />
        </div>
      </section>
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
            <h2 className="text-[clamp(1.5rem,3vw,2.25rem)] md:text-center font-bold text-white mb-6">
              About WestWyn County
            </h2>

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
