"use client";

import { useId, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Inter, Space_Grotesk } from "next/font/google";
import {
  BadgeCheck,
  Check,
  ChevronDown,
  House,
  Landmark,
  ShieldCheck,
  Building2,
  Route,
  FileCheck2,
  MapPin,
  Headphones,
  Globe,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

import heroImage from "@/app/assets/investor/dholera-insider-saudi-arabia-banner.webp";
import countyImage from "@/app/assets/dholera-residential/county-desktop.webp";
import estatesImage from "@/app/assets/dholera-residential/estates-desktop.webp";
import residencyImage from "@/app/assets/dholera-residential/residency-desktop.webp";
import WhySaudiArabia from "./WhySaudiArabia";
import CommonJourney from "../CommonJourney";
import { SaudiArabiaFaq } from "./Faq";

const display = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-saudi-display",
});

const body = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-saudi-body",
});

const PHONE_NUMBER = "+919211820887";
const WHATSAPP_URL =
  "https://wa.me/919211820887?text=Hello%2C%20I%20am%20interested%20in%20buying%20a%20plot%20in%20Dholera.%20Please%20share%20the%20details.";




const projects = [
  {
    name: "WestWyn County",
    location: "Fedra-Pipli State Highway",
    sizes: "149 sq yd - 325 sq yd",
    status: "Reselling",
    image: countyImage,
  },
  {
    name: "WestWyn Estates",
    location: "State Highway 117",
    sizes: "147 sq yd - 250 sq yd",
    status: "Available",
    image: estatesImage,
  },
  {
    name: "WestWyn Residency",
    location: "1.5 km from DFC",
    sizes: "124, 152 & 187 sq yd",
    status: "Available",
    image: residencyImage,
  },
];

const ownershipBenefits = [
  {
    icon: House,
    title: "Build a Future Family Home",
    description: "",
  },
  {
    icon: Landmark,
    title: "Plan for Retirement in India",
    description: "",
  },
  {
    icon: ShieldCheck,
    title: "Create a Long-Term Family Asset",
    description: "",
  },
  {
    icon: Building2,
    title: "Invest in a Developing Smart City",
    description: "",
  },
  {
    icon: Route,
    title: "Benefit from Future Infrastructure Growth",
    description: "",
  },
];

const reasonsToChoose = [
  "Verified Residential Plot Projects",
  "Transparent Pricing & Documentation",
  "Dedicated Support for Saudi NRIs",
  "100% Remote Buying Process",
  "Exclusive Channel Partner of BookMyAssets",
];



const dholeraInsiderReasons = [
  {
    title: "Verified Residential Plot Projects",
    icon: Building2,
    iconBg: "bg-[#FFF3D6]",
    iconColor: "text-[#B77900]",
  },
  {
    title: "Transparent Pricing & Documentation",
    icon: FileCheck2,
    iconBg: "bg-[#E3F2FF]",
    iconColor: "text-[#1769AA]",
  },
  {
    title: "Strategic Project Locations",
    icon: MapPin,
    iconBg: "bg-[#E5F3FF]",
    iconColor: "text-[#205C9E]",
  },
  {
    title: "Dedicated Support for Saudi NRIs",
    icon: Headphones,
    iconBg: "bg-[#FFF0CF]",
    iconColor: "text-[#9A6A00]",
  },
  {
    title: "100% Remote Buying Process",
    icon: Globe,
    iconBg: "bg-[#E9F7EE]",
    iconColor: "text-[#237A4B]",
  },
  {
    title: "Exclusive Channel Partner of BookMyAssets",
    icon: CheckCircle2,
    iconBg: "bg-[#EEE8FF]",
    iconColor: "text-[#6550A8]",
  },
];
const faqItems = [
  {
    question: "Can I buy a Dholera plot from Saudi Arabia?",
    answer:
      "Yes. NRIs living in Saudi Arabia can buy residential plots in Dholera. Dholera Insider helps you complete the buying process remotely with verified project information and registration support.",
  },
  {
    question: "Why are Saudi NRIs investing in Dholera?",
    answer:
      "Saudi NRIs are investing in Dholera because of its government-backed development, planned infrastructure, industrial growth, and long-term investment potential.",
  },
  {
    question: "Can I buy a plot without visiting India?",
    answer:
      "Yes. Most of the buying process can be completed remotely through virtual consultations, online documentation, and registration assistance.",
  },
  {
    question: "What documents should I verify before investing?",
    answer:
      "Before investing, review the title documents, NA/NOC, approved layout plan, sale deed, ownership details, and registry process.",
  },
  {
    question: "Why choose Dholera Insider?",
    answer:
      "Dholera Insider is the exclusive channel partner of BookMyAssets for NRI investors. We offer verified residential plot projects, transparent documentation, and dedicated support to make your investment journey simple and secure.",
  },
];

function SectionLabel({ children, inverse = false }) {
  return (
    <span
      className={`mb-4 inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.15em] ${
        inverse
          ? "border-white/10 bg-white/5 text-[#F6C343]"
          : "border-[#051A3A]/10 bg-[#051A3A]/[0.035] text-[#8A6508]"
      }`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-[#F6C343]" />
      {children}
    </span>
  );
}

function SectionHeading({ label, title, centered = false, inverse = false }) {
  return (
    <div className={centered ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <SectionLabel inverse={inverse}>{label}</SectionLabel>
      <h2
        className={`font-[var(--font-saudi-display)] text-[clamp(1.75rem,3vw,2.65rem)] font-bold leading-[1.12] tracking-[-0.035em] ${
          inverse ? "text-white" : "text-[#051A3A]"
        }`}
      >
        {title}
      </h2>
    </div>
  );
}

export default function SaudiArabiaInvestorPage() {
  const [openIndex, setOpenIndex] = useState(-1);
  const faqHeadingId = useId();

  return (
    <main
      className={`${display.variable} ${body.variable} min-h-screen overflow-x-clip bg-[#F8F7F3] text-[#051A3A]`}
      style={{ fontFamily: "var(--font-saudi-body)" }}
    >

      {/* Main Banner Section */}
      <section className="relative isolate overflow-hidden bg-[#051A3A] pt-20 text-white lg:py-12">
        {/* Background Glow */}
        <div
          className="absolute inset-0 -z-20 opacity-30"
          style={{
            backgroundImage:
              "radial-gradient(circle at 15% 25%, rgba(246,195,67,.18), transparent 24%), radial-gradient(circle at 80% 10%, rgba(65,125,200,.24), transparent 30%)",
          }}
        />

        {/* Background Grid */}
        <div
          className="absolute inset-0 -z-10 opacity-[0.055]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.75) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.75) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* Mobile */}

        <div className="mx-auto max-w-7xl lg:px-10 lg:pt-20">
          <div className="grid items-center lg:grid-cols-[1.02fr_.98fr] lg:gap-16">
            {/* =========================
                IMAGE
                First on mobile
                Right side on desktop
            ========================== */}

            <div className="order-1 w-full lg:order-2">
              <div
                className="
                  relative
                  aspect-[4/3]
                  w-full
                  overflow-hidden
                  bg-white/5
                  lg:mx-0
                  lg:rounded-[28px]
                  lg:border
                  lg:border-white/10
                  lg:shadow-[0_30px_90px_rgba(0,0,0,.35)]
                "
              >
                <Image
                  src={heroImage}
                  alt="Dholera investment opportunity for Dubai NRIs"
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1023px) 100vw, 48vw"
                />

                {/* Image overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#051A3A]/35 via-transparent to-transparent lg:from-[#051A3A]/60" />
              </div>
            </div>

            {/* =========================
                CONTENT
                Second on mobile
                Left side on desktop
            ========================== */}

            <div
              className="
                order-2
                px-5
                pb-10
                pt-8
                sm:px-8
                sm:pb-12
                sm:pt-10
                lg:order-1
                lg:px-0
                lg:py-0
              "
            >
            <h1 className="font-[var(--font-bahrain-display)] text-[clamp(2rem,4.15vw,4rem)] font-bold leading-[1.02] tracking-[-0.055em]">
              Dholera Investment from{" "}
              <span className="text-[#F6C343]">Saudi Arabia</span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-white/75 sm:text-lg">
              Planning to invest in property back home? Dholera Insider helps
              NRIs in Saudi Arabia explore verified residential plots in
              Dholera Smart City with transparent information, legal guidance,
              and dedicated support from enquiry to registration.
            </p>

              {/* CTA */}
              <a
                href="https://wa.me/919211820887?text=Hello%2C%20I%20am%20interested%20in%20buying%20a%20plot%20in%20Dholera.%20Please%20share%20the%20details."
                target="_blank"
                rel="noopener noreferrer"
                className="
                  mt-7
                  inline-flex
                  min-h-[52px]
                  w-full
                  items-center
                  justify-center
                  rounded-xl
                  bg-[#F6C343]
                  px-6
                  py-3
                  text-[15px]
                  font-bold
                  text-[#051A3A]
                  transition-colors
                  duration-200
                  hover:bg-white
                  focus:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-white
                  focus-visible:ring-offset-2
                  focus-visible:ring-offset-[#051A3A]
                  sm:w-auto
                "
              >
                Explore Residential Projects
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Why Saudi Arabia */}
      <WhySaudiArabia />

      {/* Journey Section */}
      <CommonJourney 
        title="Your Investment Journey from Saudi Arabia"
      />


      <section id="documentation"
            className="relative isolate scroll-mt-20 overflow-hidden bg-[#051A3A] px-6 py-8 sm:px-6 sm:py-16 lg:px-6 lg:pt-12 lg:pb-16"
          >
            {/* Background glow */}
            <div
              className="pointer-events-none absolute inset-0 -z-20"
              aria-hidden="true"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 8% 20%, rgba(246,195,67,.08), transparent 25%), radial-gradient(circle at 88% 45%, rgba(43,54,77,.55), transparent 35%)",
              }}
            />
    
            {/* Subtle grid */}
            <div
              className="pointer-events-none absolute inset-0 -z-10 opacity-[0.035]"
              aria-hidden="true"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,.7) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.7) 1px, transparent 1px)",
                backgroundSize: "48px 48px",
              }}
            />
    
            <div className="mx-auto max-w-7xl">
              <div className="grid items-start gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16 xl:gap-20">
                {/* =====================================================
                    LEFT CONTENT
                ====================================================== */}
                <div className="lg:sticky lg:top-28">
                  {/* Eyebrow */}
              
                  {/* Heading */}
                    <h2
                      className="
                        max-w-xl
                        font-[var(--font-display)]
                        text-[clamp(2rem,4vw,3.25rem)]
                        font-bold
                        leading-[1.08]
                        tracking-[-0.045em]
                        text-white
                        lg:mt-5
                      "
                    >
                      Why{" "}
                      <span className="text-[#F6C343]">
                        Saudi NRIs
                      </span>{" "}
                        Are Choosing Dholera
                    </h2>
    
                  {/* Main copy */}
                  <p className="mt-5 max-w-xl text-base leading-7 text-white/70 sm:text-[17px] sm:leading-8">
                    Many investors from Saudi Arabia prefer residential plots because they provide greater flexibility
                      and long term ownership.
                  </p>
    
                  {/* Divider */}
                  <div className="my-7 h-px max-w-xl bg-white/10" />

                  <p className="mt-5 max-w-xl text-base leading-7 text-white/70 sm:text-[17px] sm:leading-8">
                    A Dholera residential plot can help you:
                  </p>
    
    
                </div>
    
                {/* =====================================================
                    RIGHT BENEFIT LIST
                ====================================================== */}
                <div className="relative">
                  {/* Vertical rail - desktop */}
                  <div
                    className="absolute bottom-8 left-[27px] top-8 hidden w-px bg-gradient-to-b from-[#F6C343]/45 via-white/15 to-transparent sm:block"
                    aria-hidden="true"
                  />
    
                  <div className="space-y-3 sm:space-y-4">
                    {ownershipBenefits.map(
                      ({ icon: Icon, title, description }, index) => (
                        <article
                          key={title}
                          className="
                            group
                            relative
                            overflow-hidden
                            rounded-2xl
                            border
                            border-white/10
                            bg-white/[0.055]
                            p-4
                            backdrop-blur-sm
                            transition-all
                            duration-300
    
                            hover:border-[#F6C343]/30
                            hover:bg-white/[0.075]
                            hover:shadow-[0_18px_50px_rgba(0,0,0,.12)]
    
                            sm:p-5
                            md:p-6
                          "
                        >
                          {/* Hover highlight */}
                          <div
                            className="
                              pointer-events-none
                              absolute
                              inset-y-0
                              left-0
                              w-[3px]
                              origin-bottom
                              scale-y-0
                              bg-[#F6C343]
                              transition-transform
                              duration-300
                              group-hover:scale-y-100
                            "
                            aria-hidden="true"
                          />
    
                          <div className="relative flex items-center gap-4 sm:gap-5">
                            {/* Icon */}
                            <div
                              className="
                                relative
                                z-10
                                grid
                                h-14
                                w-14
                                shrink-0
                                place-items-center
                                rounded-2xl
                                border
                                border-white/10
                                bg-[#0A2449]
                                text-[#F6C343]
                                shadow-[0_10px_24px_rgba(0,0,0,.16)]
                                transition-all
                                duration-300
    
                                group-hover:border-[#F6C343]/25
                                group-hover:bg-[#0D2C58]
    
                                sm:h-[58px]
                                sm:w-[58px]
                              "
                            >
                              <Icon
                                className="h-5 w-5 sm:h-[22px] sm:w-[22px]"
                                strokeWidth={1.8}
                                aria-hidden="true"
                              />
                            </div>
    
                            {/* Content */}
                            <div className="min-w-0 flex-1">
    
                              <h3
                                className="
                                  mt-1.5
                                  font-[var(--font-display)]
                                  text-base
                                  font-bold
                                  leading-snug
                                  text-white
                                  sm:text-lg
                                "
                              >
                                {title}
                              </h3>
    
                              {description && (
                                <p className="mt-2 text-sm leading-6 text-white/55">
                                  {description}
                                </p>
                              )}
                            </div>
    
                            {/* Check mark */}
                            <div
                              className="
                                hidden
                                h-9
                                w-9
                                shrink-0
                                place-items-center
                                rounded-full
                                border
                                border-white/10
                                bg-white/[0.04]
                                text-white/40
                                transition-all
                                duration-300
    
                                group-hover:border-[#F6C343]/25
                                group-hover:bg-[#F6C343]
                                group-hover:text-[#051A3A]
    
                                sm:grid
                              "
                              aria-hidden="true"
                            >
                              <Check
                                className="h-4 w-4"
                                strokeWidth={2.2}
                              />
                            </div>
                          </div>
                        </article>
                      ),
                    )}
                  </div>
                </div>
              </div>
            </div>
      </section>


          <section
        aria-labelledby="why-choose-dholera-insider"
        className="bg-[#EEF2F9] px-6 py-8 sm:px-6 sm:py-16 lg:px-6 lg:pt-12 lg:pb-16"
      >
        <div className="mx-auto max-w-7xl">
          {/* ======================================================
              TRUST SECTION
          ====================================================== */}
          <div className="grid items-start gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-14 xl:gap-20">
            {/* Heading */}
            <div className="lg:pt-3">
              <h2
                id="why-choose-dholera-insider"
                className="
                  max-w-xl
                  font-[var(--font-display)]
                  text-[clamp(2rem,4vw,3.35rem)]
                  font-bold
                  leading-[1.06]
                  tracking-[-0.045em]
                  text-[#051A3A]
                "
              >
                Why Choose Dholera Insider ?
              </h2>

              {/* Decorative line */}
              <div
                className="mt-3 flex items-center gap-2"
                aria-hidden="true"
              >
                <span className="h-[3px] w-10 rounded-full bg-[#F6C343]" />
              </div>
            </div>

            {/* ======================================================
                BENEFIT GRID
            ====================================================== */}
            <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
              {dholeraInsiderReasons.map(
                ({ title, icon: Icon, iconBg, iconColor }) => (
                  <article
                    key={title}
                    className="
                      group
                      relative
                      flex
                      min-h-[105px]
                      items-center
                      gap-4
                      overflow-hidden
                      rounded-2xl
                      border
                      border-[#051A3A]/[0.07]
                      bg-white
                      px-4
                      py-5
                      shadow-[0_8px_26px_rgba(5,26,58,0.045)]
                      transition-all
                      duration-300

                      hover:-translate-y-0.5
                      hover:border-[#051A3A]/15
                      hover:shadow-[0_14px_34px_rgba(5,26,58,0.08)]

                      sm:px-5
                      md:min-h-[112px]
                      md:px-6
                    "
                  >
                    {/* Left hover accent */}
                    <span
                      className="
                        absolute
                        inset-y-0
                        left-0
                        w-[3px]
                        origin-bottom
                        scale-y-0
                        bg-[#F6C343]
                        transition-transform
                        duration-300
                        group-hover:scale-y-100
                      "
                      aria-hidden="true"
                    />

                    {/* Icon */}
                    <span
                      className={`
                        grid
                        h-12
                        w-12
                        shrink-0
                        place-items-center
                        rounded-full
                        ${iconBg}
                        ${iconColor}
                        transition-all
                        duration-300
                        group-hover:scale-[1.05]

                        sm:h-13
                        sm:w-13
                      `}
                      aria-hidden="true"
                    >
                      <Icon
                        className="h-5 w-5 sm:h-[22px] sm:w-[22px]"
                        strokeWidth={1.9}
                      />
                    </span>

                    {/* Title */}
                    <h3
                      className="
                        min-w-0
                        font-[var(--font-display)]
                        text-[15px]
                        font-bold
                        leading-[1.35]
                        text-[#051A3A]

                        sm:text-base
                        md:text-[17px]
                      "
                    >
                      {title}
                    </h3>
                  </article>
                ),
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Faq section */}
      
      <SaudiArabiaFaq />
    </main>
  );
}
