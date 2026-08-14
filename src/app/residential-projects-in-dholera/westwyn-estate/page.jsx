"use client";
import Image from "next/image";
import React, { useState } from "react";
import westwynEstate1 from "@/app/assets/dholera-residential/estates-desktop.webp";
import westwynEstate1M from "@/app/assets/dholera-residential/estates-mobile.webp";
import CommonForm from "@/app/components/CommonForm";
import { AnimatePresence } from "framer-motion";
import BrochureDownload from "@/app/components/BrochureDownload";
import PrimeLocationSection from "./PrimeLocations";
import FAQSection from "./FAQs";
import {
  WestWynResidencyBrochureButton,
  WestWynResidencyLeadWidgets,
} from "./WestWynResidencyLeadWidgets";
import Link from "next/link";
import { FileMinus, MapPin } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

const FeatureCard = ({ icon, title, value }) => (
  <div className="bg-white rounded-xl p-4 border hover:bg-[#2B364D] group border-gray-200 text-center transition-colors duration-300 ease-in-out">
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
  ];

  const projectFeatures = [
    { icon: "🏠", title: "Plot Size", value: "Approx 147-250 sq. yards" },
    { icon: "💰", title: "Price", value: "₹7,500/Sq.Yd" },
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
      <meta name="robots" content="noindex, nofollow" />

      <link
        rel="canonical"
        href="https://www.dholerainsider.com/residential-projects-in-dholera/westwyn-estate"
      />
      <section
        className="grid overflow-hidden bg-[#051A3A] lg:grid-cols-[minmax(23rem,38%)_minmax(0,62%)]"
        aria-labelledby="westwyn-estates-hero-title"
      >
        <div className="order-2 flex items-center px-5 py-10 sm:px-8 sm:py-14 lg:order-1 lg:min-h-[clamp(34rem,40vw,48rem)] lg:px-[clamp(2.5rem,4vw,5rem)] lg:py-16">
          <div className="w-full max-w-xl">
            <h1
              id="westwyn-estates-hero-title"
              className="m-0 text-[#F6C343]"
            >
              <span className="block text-[clamp(2.35rem,5vw,4.25rem)] font-bold leading-[0.95] tracking-[-0.035em]">
                WestWyn
              </span>
              <span className="mt-2 block text-[clamp(1.35rem,2.7vw,2.3rem)] font-medium leading-none tracking-[0.3em] sm:tracking-[0.38em]">
                Estates
              </span>
            </h1>

            <div className="mt-5 flex items-center gap-2.5 text-sm font-semibold text-white sm:text-base">
              <MapPin
                className="h-5 w-5 shrink-0 text-[#F6C343]"
                aria-hidden="true"
              />
              <span>State Highway 117, Polarpur</span>
            </div>

            <div className="my-8 h-px w-20 bg-[#F6C343]" aria-hidden="true" />

            <p className="text-[clamp(1.75rem,3.3vw,2.8rem)] font-bold leading-[1.12] tracking-[-0.025em] text-white">
              Registry-Ready. Future-Ready.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:flex-col 2xl:flex-row">
              <Link
                href="https://wa.me/919211820887?text=I%20want%20details%20about%20WestWyn%20Estates"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-14 items-center justify-center gap-2.5 rounded-lg bg-[#22C967] px-5 py-3 text-center text-sm font-bold text-white shadow-lg shadow-black/20 transition-colors hover:bg-[#1db85c] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#051A3A]"
                aria-label="Get WestWyn Estates details on WhatsApp"
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
              alt="Entrance and internal road at WestWyn Estates, Polarpur"
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
            alt="WestWyn Estates"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-[#2B364D]/95 to-[#051A3A]/95"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-[clamp(1rem,4vw,2rem)] py-[clamp(2.5rem,6vw,3rem)]">
          <div className="max-w-7xl mx-auto">
            {/* Heading */}
            <h2 className="text-[clamp(1.5rem,3vw,2.25rem)] md:text-center font-bold text-white mb-6">
              WestWyn Estates :{" "}
              <span>Registry-Ready plots in Polarpur, Dholera</span>
            </h2>
            <div className="max-w-5xl mx-auto">
              <p className="text-[clamp(1rem,1.5vw,1.125rem)] text-gray-100 leading-relaxed">
                WestWyn Estates is a premium residential plotting project in
                Polarpur, Dholera, designed for buyers who want a secure and
                future-ready investment near Dholera SIR. The project offers
                residential plots with clear documentation, planned amenities,
                and strong connectivity to important infrastructure locations in
                Dholera. <br />
                <br /> Located with direct access from bang on 150 ft wide
                4-lane State Highway-117 and close to Bhimnath Railway Junction,
                WestWyn Estates is suitable for investors looking for
                registry-ready plots in Dholera with long-term growth potential.
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
            <WestWynResidencyBrochureButton className="flex w-full hover:border-[#051A3A] hover:border-2 cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#051A3A] px-[clamp(1rem,2.5vw,1.25rem)] py-3 text-[0.9375rem] font-medium text-white transition-colors hover:bg-white hover:text-[#2B364D] sm:w-auto">
              <FileMinus /> Download Brochure
            </WestWynResidencyBrochureButton>

            <Link
              href="https://wa.me/919211820887"
              className="flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-xl border border-[#F6C343] bg-white px-[clamp(1rem,2.5vw,1.25rem)] py-3 text-[0.9375rem] font-medium text-[#051A3A] transition-colors hover:bg-[#2B364D] hover:text-white sm:w-auto"
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
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-[#2B364D]/95 to-[#051A3A]/95"></div>
        </div>
        <div className="relative z-10 container mx-auto px-[clamp(1rem,4vw,2rem)] py-[clamp(1.5rem,4vw,2rem)]">
          <div className="max-w-7xl mx-auto">
            {/* Amenities Section */}
            <div>
              <h2 className="text-[clamp(1.25rem,3vw,2.25rem)] font-bold text-white mb-4">
                Amenities at WestWyn Estates
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
                Why Invest in WestWyn Estates?
              </h2>

              <div className="grid md:grid-cols-2 gap-[clamp(1rem,2.5vw,1.5rem)]">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-[clamp(1.25rem,2.5vw,1.5rem)] border border-white/20">
                  <h3 className="text-[clamp(1.125rem,2vw,1.25rem)] font-semibold text-[#F6C343] mb-3">
                    Strong Dholera Investment Location
                  </h3>
                  <p className="text-gray-200 text-[0.875rem] leading-[1.7]">
                    WestWyn Estates is located near important infrastructure and
                    industrial development routes, making it suitable for buyers
                    looking at long-term investment in Dholera Smart City.
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-[clamp(1.25rem,2.5vw,1.5rem)] border border-white/20">
                  <h3 className="text-[clamp(1.125rem,2vw,1.25rem)] font-semibold text-[#F6C343] mb-3">
                    Direct Highway Access
                  </h3>
                  <p className="text-gray-200 text-[0.875rem] leading-[1.7]">
                    The project offers direct access from 150 ft wide 4-lane
                    State Highway (SH-117), helping improve connectivity and
                    future usability.
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-[clamp(1.25rem,2.5vw,1.5rem)] border border-white/20">
                  <h3 className="text-[clamp(1.125rem,2vw,1.25rem)] font-semibold text-[#F6C343] mb-3">
                    Close to Railway Connectivity
                  </h3>
                  <p className="text-gray-200 text-[0.875rem] leading-[1.7]">
                    Its proximity to Bhimnath Railway Junction adds location
                    strength for buyers who value accessible transport
                    connectivity.
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-[clamp(1.25rem,2.5vw,1.5rem)] border border-white/20">
                  <h3 className="text-[clamp(1.125rem,2vw,1.25rem)] font-semibold text-[#F6C343] mb-3">
                    Registry Ready Plots
                  </h3>
                  <p className="text-gray-200 text-[0.875rem] leading-[1.7]">
                    The project is positioned with NA/NOC, Title Clear, Plan
                    Pass Approved, and registry-ready documentation, helping
                    buyers complete their investment process smoothly.
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-[clamp(1.25rem,2.5vw,1.5rem)] border border-white/20">
                  <h3 className="text-[clamp(1.125rem,2vw,1.25rem)] font-semibold text-[#F6C343] mb-3">
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
          </div>
        </div>
      </div>

      <div>
        <FAQSection />
      </div>
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
