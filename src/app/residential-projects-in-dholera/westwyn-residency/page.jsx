import Image from "next/image";
import westwynEstate1 from "@/app/assets/residential/westwyn-residency-dholera-project-section.webp";
import westwynEstate1M from "@/app/assets/residential/westwyn-residency-dholera-project-section-mobile.webp";
import LazyCommonFormSection from "@/app/components/LazyCommonFormSection";
import PrimeLocationSection from "./PrimeLocations";
import { PhoneIcon, FileMinus } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import FAQSection from "./FAQs";
import {
  WestWynResidencyBrochureButton,
  WestWynResidencyLeadWidgets,
} from "./WestWynResidencyLeadWidgets";
import Link from "next/link";
import { FaDocument } from "react-icons/fa";

const featureIcons = {
  "Plot Sizes": "🏠",
  Price: "💰",
  "Project Type": "🏗️",
  Location: "📍",
};

const amenityIcons = {
  "EV Charging Station": "🚗",
  "Power & Water Supply": "⚡",
  "Jogging Track & Yoga Deck": "🏃‍♂️",
  "Kids Play Area": "🧒",
  "Project Boundary": "🧱",
  "Gated Community": "🏘️",
  "Internal Roads": "🛣️",
  "Senior Citizen Zone": "👵",
  "App-Based Society Management": "📱",
  "24/7 Security & CCTV Surveillance": "📹",
  "Drainage System": "🚿",
  "Clubhouse Lite": "🏡",
};

const FeatureCard = ({ icon, title, value }) => (
  <div className="bg-white rounded-xl p-4 border hover:bg-teal-700 group border-gray-200 text-center transition-colors duration-300 ease-in-out">
    <div className="w-12 h-12 bg-blue-100 group-hover:text-white group-hover:scale-110 rounded-full flex items-center justify-center mx-auto mb-2 transition-all duration-300 ease-in-out">
      {featureIcons[title] || icon}
    </div>
    <p className="group-hover:text-white group-hover:scale-110 font-semibold text-gray-900 text-sm mb-1 transition-all duration-300 ease-in-out">
      {title}
    </p>
    <p className="group-hover:text-white group-hover:scale-110 text-[#151f28] font-bold text-lg transition-all duration-300 ease-in-out">
      {value}
    </p>
  </div>
);

export default function WestWynResidencyContentTemp() {
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
    { icon: "💰", title: "Price", value: "₹6,500/Sq.Yd" },
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
      <title>WestWyn Residency Dholera | Registry Ready Plots in Dholera</title>
      <meta
        name="description"
        content="Buy premium registry-ready plots at WestWyn Residency Dholera. Residential plots in Pipariya with clear title, site visit support, and long-term investment potential."
      />
      <meta
        name="keywords"
        content="WestWyn Residency Dholera, registry ready plots in Dholera, residential plots in Pipariya, plots in Dholera under 10 lakh, Dholera investment"
      />
      <link
        rel="canonical"
        href="https://www.dholerainsider.com/residential-projects-in-dholera/westwyn-residency"
      />
      <div className="relative w-full h-[clamp(28rem,80svh,46rem)] max-sm:h-[clamp(24rem,62svh,34rem)]">
        <Image
          src={westwynEstate1}
          alt="WestWyn Residency in Dholera"
          className="hidden h-full w-full object-cover sm:block"
          priority
          fetchPriority="high"
          sizes="(min-width: 640px) 100vw, 0vw"
        />
        <Image
          src={westwynEstate1M}
          alt="WestWyn Residency in Dholera"
          className="block h-full w-full object-cover sm:hidden"
          loading="eager"
          fetchPriority="high"
          sizes="(max-width: 639px) 100vw, 0vw"
        />
        <div className="absolute bottom-0 left-0 right-0 hidden p-[clamp(0.75rem,1.5vw,1rem)] md:block">
          <div className="bg-white/95 backdrop-blur-md rounded-t-2xl shadow-2xl border border-white/30 max-w-[calc(100vw-2rem)] lg:max-w-6xl mx-auto w-full">
            <div className="flex items-center gap-[clamp(0.75rem,1.5vw,1.25rem)] px-[clamp(1rem,2vw,1.5rem)] py-[clamp(0.75rem,1.5vw,1rem)]">
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

              <div className="shrink-0">
                <Link href="/residential-projects-in-dholera/westwyn-residency">
                  <h2 className="text-teal-900 text-[clamp(1.25rem,2vw,1.5rem)] font-bold leading-tight m-0 hover:text-teal-800 transition-colors">
                    WestWyn Residency
                  </h2>
                </Link>
                <div className="text-teal-700/70 text-xs mt-1">
                  Registry-ready plots in Pipariya, Dholera
                </div>
              </div>

              <div className="w-px h-12 bg-teal-900/10 shrink-0" />

              <div className="shrink-0">
                <div className="text-teal-900 text-[1.625rem] font-extrabold leading-none">
                  ₹6,500{" "}
                  <span className="text-teal-900/40 text-xs font-normal">
                    /Sq.Yd
                  </span>
                </div>
              </div>

              <div className="flex-1" />
              <div className="w-px h-12 bg-teal-900/10 shrink-0" />

              <div className="flex items-center gap-3 shrink-0">
                <Link
                  href="tel:+919958993549"
                  className="flex items-center gap-2 bg-teal-900 hover:bg-teal-800 text-white px-5 py-2.5 rounded-lg text-[0.8125rem] font-bold transition-all duration-200 hover:-translate-y-0.5"
                >
                  <PhoneIcon />
                  Enquire Now
                </Link>

                <WestWynResidencyBrochureButton
                  className="flex cursor-pointer items-center gap-2 rounded-lg border border-teal-900/20 bg-white px-5 py-2.5 text-[0.8125rem] font-semibold text-teal-900 transition-all duration-200 hover:-translate-y-0.5 hover:border-teal-800 hover:bg-teal-50"
                  showIcon
                >
                  Download Brochure
                </WestWynResidencyBrochureButton>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920"
            alt="WestWyn Residency"
            className="w-full h-full object-cover"
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-emerald-900/95 to-teal-900/95"></div>
        </div>

        <div className="relative z-10 container mx-auto px-[clamp(1rem,4vw,2rem)] py-[clamp(2.5rem,6vw,3rem)]">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-[clamp(1.5rem,3vw,2.25rem)] md:text-center font-bold text-white mb-6">
              WestWyn Residency
            </h1>
            <div className="max-w-5xl mx-auto">
              <p className="text-[clamp(1rem,1.5vw,1.125rem)] text-gray-100 leading-relaxed">
                WestWyn Residency is designed for buyers who want an affordable,
                legally verified, and well-connected Dholera investment
                opportunity. Located in Pipariya, Dholera, the project offers
                govt approved residential plots with clear title, NA/NOC status,
                and immediate registry.
              </p>
              <br />
              <p className="text-[clamp(1rem,1.5vw,1.125rem)] text-gray-100 leading-relaxed">
                If you are searching for plots in Dholera under ₹10 lakh,
                WestWyn Residency gives you a practical entry point into the
                Dholera Smart City growth corridor.
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
            <WestWynResidencyBrochureButton
              className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-teal-900 px-[clamp(1rem,2.5vw,1.25rem)] py-3 text-[0.9375rem] font-medium text-white transition-colors hover:bg-white hover:text-teal-900 sm:w-auto"
              
            >
                <FileMinus /> Download Brochure
            </WestWynResidencyBrochureButton>

            <Link
              href="https://wa.me/918130371647"
              className="flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-xl border border-teal-900 bg-white px-[clamp(1rem,2.5vw,1.25rem)] py-3 text-[0.9375rem] font-medium text-teal-900 transition-colors hover:bg-teal-900 hover:text-white sm:w-auto"
            >
              <FaWhatsapp className="text-lg" /> Book Site Visit
            </Link>
          </div>
        </div>
      </div>

      <PrimeLocationSection />

      <LazyCommonFormSection title="Own a Registry Ready Plot in Dholera Starting from ₹8 Lakh" />

      <div className="relative">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920"
            alt="WestWyn Residency"
            className="w-full h-full object-cover"
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-emerald-900/95 to-teal-900/95"></div>
        </div>
        <div className="relative z-10 container mx-auto px-[clamp(1rem,4vw,2rem)] py-[clamp(1.5rem,4vw,2rem)]">
          <div className="max-w-6xl mx-auto">
            <div className="mb-12">
              <h2 className="text-[clamp(1.25rem,3vw,2.25rem)] font-bold text-white mb-8">
                Why Invest in WestWyn Residency?
              </h2>

              <div className="grid md:grid-cols-2 gap-[clamp(1rem,2.5vw,1.5rem)]">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-[clamp(1.25rem,2.5vw,1.5rem)] border border-white/20">
                  <h3 className="text-[clamp(1.125rem,2vw,1.25rem)] font-semibold text-teal-300 mb-3">
                    Affordable Entry in Dholera
                  </h3>
                  <p className="text-gray-200 text-[0.875rem] leading-[1.7]">
                    WestWyn Residency is suitable for buyers who want to start
                    with a smaller investment ticket while still entering a
                    high-potential growth corridor.
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-[clamp(1.25rem,2.5vw,1.5rem)] border border-white/20">
                  <h3 className="text-[clamp(1.125rem,2vw,1.25rem)] font-semibold text-teal-300 mb-3">
                    Govt Approved Plot Project
                  </h3>
                  <p className="text-gray-200 text-[0.875rem] leading-[1.7]">
                    The project offers government-approved residential plots
                    with clear documentation, helping buyers invest with better
                    confidence.
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-[clamp(1.25rem,2.5vw,1.5rem)] border border-white/20">
                  <h3 className="text-[clamp(1.125rem,2vw,1.25rem)] font-semibold text-teal-300 mb-3">
                    Immediate Registry Support
                  </h3>
                  <p className="text-gray-200 text-[0.875rem] leading-[1.7]">
                    Registry-ready documentation allows buyers to move ahead
                    with a smoother and more transparent buying process.
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-[clamp(1.25rem,2.5vw,1.5rem)] border border-white/20">
                  <h3 className="text-[clamp(1.125rem,2vw,1.25rem)] font-semibold text-teal-300 mb-3">
                    Close to Dholera SIR
                  </h3>
                  <p className="text-gray-200 text-[0.875rem] leading-[1.7]">
                    The project’s proximity to Dholera SIR makes it attractive
                    for buyers looking at future growth driven by smart city
                    infrastructure and industrial development.
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-[clamp(1.25rem,2.5vw,1.5rem)] border border-white/20">
                  <h3 className="text-[clamp(1.125rem,2vw,1.25rem)] font-semibold text-teal-300 mb-3">
                    Long-Term Investment Potential
                  </h3>
                  <p className="text-gray-200 text-[0.875rem] leading-[1.7]">
                    As Dholera grows through infrastructure, industries,
                    expressway connectivity, and airport development, nearby
                    residential plots may benefit from rising demand.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-[clamp(1.25rem,3vw,2.25rem)] font-bold text-white mb-8">
                Project Amenities
              </h2>
              <p className="mb-6 text-[clamp(1rem,1.5vw,1.125rem)] leading-[1.7] text-gray-100">
                WestWyn Residency is planned with practical lifestyle and
                security amenities for future residential use.
              </p>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[clamp(0.75rem,2vw,1rem)]">
                {amenities.map((amenity, index) => (
                  <div
                    key={index}
                    className="bg-teal-500/20 backdrop-blur-sm rounded-lg p-[clamp(1rem,2vw,1.25rem)] text-center border border-teal-400/30 hover:bg-teal-500/30 transition-all duration-300"
                  >
                    <div className="text-xl md:text-4xl mb-2">
                      {amenityIcons[amenity.title] || amenity.icon}
                    </div>
                    <p className="text-white font-medium text-[clamp(1rem,1.8vw,1.125rem)] leading-[1.4]">
                      {amenity.title}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <FAQSection />
          </div>
        </div>
      </div>
      <WestWynResidencyLeadWidgets />
    </>
  );
}
