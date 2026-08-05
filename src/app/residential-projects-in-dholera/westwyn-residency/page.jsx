import Image from "next/image";
import westwynEstate1 from "@/app/assets/dholera-residential/residency-desktop.webp";
import westwynEstateM from "@/app/assets/dholera-residential/residency-mobile.webp";
import LazyCommonFormSection from "@/app/components/LazyCommonFormSection";
import PrimeLocationSection from "./PrimeLocations";
import { FileMinus, MapPin } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import FAQSection from "./FAQs";
import {
  WestWynResidencyBrochureButton,
  WestWynResidencyLeadWidgets,
} from "./WestWynResidencyLeadWidgets";
import Link from "next/link";

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
  <div className="bg-white rounded-xl p-4 border hover:bg-[#2B364D] group border-gray-200 text-center transition-colors duration-300 ease-in-out">
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
      <section
        className="grid overflow-hidden bg-[#051A3A] lg:grid-cols-[minmax(23rem,38%)_minmax(0,62%)]"
        aria-labelledby="westwyn-hero-title"
      >
        <div className="order-2 flex items-center px-5 py-10 sm:px-8 sm:py-14 lg:order-1 lg:min-h-[clamp(34rem,40vw,48rem)] lg:px-[clamp(2.5rem,4vw,5rem)] lg:py-16">
          <div className="w-full max-w-xl">
            <h1
              id="westwyn-hero-title"
              className="m-0  text-[#F6C343]"
            >
              <span className="block text-[clamp(2.35rem,5vw,4.25rem)] font-semibold tracking-[-0.035em]">
                WestWyn
              </span>
              <span className="mt-2 block text-[clamp(1.35rem,2.7vw,2.3rem)] font-medium leading-none tracking-[0.3em] sm:tracking-[0.38em]">
                Residency
              </span>
            </h1>

            <div className="mt-5 flex items-center gap-2.5 text-sm font-semibold text-white sm:text-base">
              <MapPin
                className="h-5 w-5 shrink-0 text-[#F6C343]"
                aria-hidden="true"
              />
              <span>1.5 km from DFC, Pipariya</span>
            </div>

            <div className="my-8 h-px w-20 bg-[#F6C343]" aria-hidden="true" />

            <p className="text-[clamp(1.75rem,3.3vw,2.8rem)] font-bold leading-[1.12] tracking-[-0.025em] text-white">
              Registry-Ready. Future-Ready.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:flex-col 2xl:flex-row">
              <Link
                href="https://wa.me/919211820887?text=I%20want%20details%20about%20WestWyn%20Residency"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-14 items-center justify-center gap-2.5 rounded-lg bg-[#22C967] px-5 py-3 text-center text-sm font-bold text-white shadow-lg shadow-black/20 transition-colors hover:bg-[#1db85c] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#051A3A]"
                aria-label="Get WestWyn Residency details on WhatsApp"
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
              srcSet={westwynEstateM.src}
              type="image/webp"
            />
            <Image
              src={westwynEstate1}
              alt="Entrance gate and internal road at WestWyn Residency, Pipariya"
              fill
              className="object-contain md:object-cover"
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
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920"
            alt="WestWyn Residency"
            className="w-full h-full object-cover"
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-[#2B364D]/95 to-[#051A3A]/95"></div>
        </div>

        <div className="relative z-10 container mx-auto px-[clamp(1rem,4vw,2rem)] py-[clamp(2.5rem,6vw,3rem)]">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-[clamp(1.5rem,3vw,2.25rem)] md:text-center font-bold text-white mb-6">
              WestWyn Residency
            </h2>
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
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-[#2B364D]/95 to-[#051A3A]/95"></div>
        </div>
        <div className="relative z-10 container mx-auto px-[clamp(1rem,4vw,2rem)] py-[clamp(1.5rem,4vw,2rem)]">
          <div className="max-w-7xl mx-auto">
            <div>
              <h2 className="text-[clamp(1.25rem,3vw,2.25rem)] font-bold text-white mb-4">
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
                    className="bg-[#F6C343]/20 backdrop-blur-sm rounded-lg p-[clamp(1rem,2vw,1.25rem)] text-center border border-[#F6C343]/30 hover:bg-[#F6C343]/30 transition-all duration-300"
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

            <div className="mt-8">
              <h2 className="text-[clamp(1.25rem,3vw,2.25rem)] font-bold text-white mb-8">
                Why Invest in WestWyn Residency?
              </h2>

              <div className="grid md:grid-cols-2 gap-[clamp(1rem,2.5vw,1.5rem)]">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-[clamp(1.25rem,2.5vw,1.5rem)] border border-white/20">
                  <h3 className="text-[clamp(1.125rem,2vw,1.25rem)] font-semibold text-[#F6C343] mb-3">
                    Affordable Entry in Dholera
                  </h3>
                  <p className="text-gray-200 text-[0.875rem] leading-[1.7]">
                    WestWyn Residency is suitable for buyers who want to start
                    with a smaller investment ticket while still entering a
                    high-potential growth corridor.
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-[clamp(1.25rem,2.5vw,1.5rem)] border border-white/20">
                  <h3 className="text-[clamp(1.125rem,2vw,1.25rem)] font-semibold text-[#F6C343] mb-3">
                    Govt Approved Plot Project
                  </h3>
                  <p className="text-gray-200 text-[0.875rem] leading-[1.7]">
                    The project offers government-approved residential plots
                    with clear documentation, helping buyers invest with better
                    confidence.
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-[clamp(1.25rem,2.5vw,1.5rem)] border border-white/20">
                  <h3 className="text-[clamp(1.125rem,2vw,1.25rem)] font-semibold text-[#F6C343] mb-3">
                    Immediate Registry Support
                  </h3>
                  <p className="text-gray-200 text-[0.875rem] leading-[1.7]">
                    Registry-ready documentation allows buyers to move ahead
                    with a smoother and more transparent buying process.
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-[clamp(1.25rem,2.5vw,1.5rem)] border border-white/20">
                  <h3 className="text-[clamp(1.125rem,2vw,1.25rem)] font-semibold text-[#F6C343] mb-3">
                    Close to Dholera SIR
                  </h3>
                  <p className="text-gray-200 text-[0.875rem] leading-[1.7]">
                    The project’s proximity to Dholera SIR makes it attractive
                    for buyers looking at future growth driven by smart city
                    infrastructure and industrial development.
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-[clamp(1.25rem,2.5vw,1.5rem)] border border-white/20">
                  <h3 className="text-[clamp(1.125rem,2vw,1.25rem)] font-semibold text-[#F6C343] mb-3">
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

          </div>
        </div>
      </div>

      <div>
        <FAQSection />
      </div>
      <WestWynResidencyLeadWidgets />
    </>
  );
}
