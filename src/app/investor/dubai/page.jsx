"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Book,
  Building2,
  CalendarCheck2,
  Check,
  FileCheck2,
  Globe,
  Headphones,
  Landmark,
  MapPin,
  Phone,
  Plane,
  SearchCheck,
  ShieldCheck,
  TrendingUp,
  Video,
  WalletCards,
  PhoneCall,
  CreditCard,
  ScrollText,
} from "lucide-react";

import WhyDholera from "./why";
import { DubaiFaq } from "./Faq";

import heroImage from "@/app/assets/investor/dholera-insider-dubai-banner.webp";
import roiImage from "@/app/assets/dholera-plots-roi.webp";
import BrochureDownload from "@/app/components/BrochureDownload";
import { FaWhatsapp, FaWhatsappSquare } from "react-icons/fa";
import county from "@/app/assets/dholera-residential/county-desktop.webp";
import residency from "@/app/assets/dholera-residential/residency-desktop.webp";
import estates from "@/app/assets/dholera-residential/estates-desktop.webp";



const PHONE_NUMBER = "+919211820887";

const WHATSAPP_URL =
  "https://wa.me/919211820887?text=Hello%2C%20I%20am%20interested%20in%20buying%20a%20plot%20in%20Dholera.%20Please%20share%20the%20details.";

const sectionLinks = [
  {
    label: "Why Invest in Dholera?",
    href: "#why-dholera",
  },
  {
    label: "Build a Long Term Asset in India",
    href: "#documentation",
  },
  {
    label: "Your Dholera Investment Journey from Dubai",
    href: "#buying-process",
  },
];

const trustSignals = [
  {
    icon: ShieldCheck,
    label: "Verified Residential Plot Projects",
  },
  {
    icon: CheckCircle2,
    label: "Transparent Pricing & Documentation",
  },
  {
    icon: Globe,
    label: "Dedicated Support for Dubai NRIs",
  },
];

const journeySteps = [
  {
    number: "1",
    icon: PhoneCall,
    title: "Speak with our Dholera Expert",
  },
  {
    number: "2",
    icon: Building2,
    title: "Explore Projects",
  },
  {
    number: "3",
    icon: FileCheck2,
    title: "Review Documents",
  },
  {
    number: "4",
    icon: CheckCircle2,
    title: "Book Your Plot",
  },
  {
    number: "5",
    icon: CreditCard,
    title: "Complete Payment",
  },
  {
    number: "6",
    icon: ScrollText,
    title: "Get Registry",
  },
];
const dholeraReasons = [
  {
    icon: Building2,
    title: "Tata Semiconductor Project",
    description: "",
  },
  {
    icon: TrendingUp,
    title: "Ahmedabad-Dholera Expressway",
    description: "",
  },
  {
    icon: Plane,
    title: "Dholera International Airport",
    description: "",
  },
  {
    icon: WalletCards,
    title: "Government-Planned Infrastructure",
    description: "",
  },
];

const mobileJourneyColors = [
  "bg-[#D9D8F2]",
  "bg-[#C9EFE8]",
  "bg-[#F2D9D0]",
  "bg-[#F4DEB3]",
  "bg-[#F6CDB6]",
];

const documentChecks = [
  {
    icon: Building2,
    title: "Build a future villa or family home",
    description: "",
  },
  {
    icon: TrendingUp,
    title: "Hold land for long-term appreciation",
    description: "",
  },
  {
    icon: WalletCards,
    title: "Diversify your investment portfolio",
    description: "",
  },
  {
    icon: Landmark,
    title: "Plan for retirement in India",
    description: "",
  },
  {
    icon: ShieldCheck,
    title: "Create a lasting family asset",
    description: "",
  },
];

const projects = [
  {
    name: "WestWyn County",
    label: "Premium plotted community",
    location: "Fedra-Pipli State Highway",
    sizes: "149 sq yd - 325 sq yd",
    status: "Reselling",
    image: county,
    accent: "from-[#0b376f] to-[#051A3A]",
  },
  {
    name: "WestWyn Estates",
    label: "Residential plot investment",
    location: "State Highway 117",
    sizes: "147 sq yd - 250 sq yd",
    status: "Available",
    image: estates,
    accent: "from-[#6b4a16] to-[#051A3A]",
  },
  {
    name: "WestWyn Residency",
    label: "Future-ready plotted living",
    location: "1.5 km from DFC",
    sizes: "124, 152 & 187 sq yd",
    status: "Available",
    image: residency,
    accent: "from-[#176147] to-[#051A3A]",
  },
];

const buyingSteps = [
  {
    number: "01",
    icon: Phone,
    title: "Connect With Our RM",
    description:
      "Speak with our Dholera expert to understand the right residential plot based on your investment plans.",
  },
  {
    number: "02",
    icon: SearchCheck,
    title: "Compare Verified Projects",
    description:
      "Review project locations, pricing, plot sizes, and nearby infrastructure through virtual presentations.",
  },
  {
    number: "03",
    icon: Book,
    title: "Review Legal Documents",
    description:
      "Understand the title documents, NA/NOC, layout plan, and registry process before making your decision.",
  },
  {
    number: "04",
    icon: Video,
    title: "Reserve Your Plot",
    description:
      "Choose your preferred plot and complete the booking process with transparent pricing.",
  },
  {
    number: "05",
    icon: CalendarCheck2,
    title: "Complete Registration",
    description: "Get you plot Registry",
  },
];

const mobileWorkflowColors = [
  "bg-[#D9D8F2]",
  "bg-[#C9EFE8]",
  "bg-[#F2D9D0]",
  "bg-[#F4DEB3]",
  "bg-[#F6CDB6]",
];

const faqs = [
  {
    question: "Can I buy a Dholera plot from Dubai?",
    answer:
      "Yes. NRIs living in Dubai can buy residential plots in Dholera. Dholera Insider helps you explore verified projects, review legal documents, and complete the buying process remotely.",
  },
  {
    question: "Is Dholera a good investment for Dubai NRIs?",
    answer:
      "Dholera is considered a promising long-term investment opportunity due to its planned infrastructure, industrial development, and future growth potential. Investors should always review project documents before making a decision.",
  },
  {
    question: "What documents should NRI buyers verify?",
    answer:
      "Before investing, review the title documents, NA/NOC, approved layout plan, sale deed, ownership details, and registry process to ensure complete transparency.",
  },
  {
    question: "Can I buy a Dholera plot from Dubai without visiting India?",
    answer:
      "Yes. Most of the buying process can be completed remotely through virtual consultations, online documentation, and registration support.",
  },
  {
    question: "Why choose Dholera Insider?",
    answer:
      "Dholera Insider is the exclusive channel partner of BookMyAssets for NRI investors. We provide verified residential plot projects & Bulk Land Deals, transparent documentation, and dedicated support to help you invest with confidence.",
  },
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
    title: "Dedicated Support for Dubai NRIs",
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

function SectionLabel({ children, inverse = false }) {
  return (
    <div
      className={`mb-4 inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.15em] ${
        inverse
          ? "border-white/10 bg-white/5 text-[#F6C343]"
          : "border-[#051A3A]/10 bg-[#051A3A]/[0.035] text-[#8A6508]"
      }`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-[#F6C343]" />
      {children}
    </div>
  );
}

function SectionHeading({
  eyebrow,
  title,
  copy,
  inverse = false,
  centered = false,
}) {
  return (
    <div className="max-w-5xl text-left">
      {/* <SectionLabel inverse={inverse}>{eyebrow}</SectionLabel> */}

      <h2
        className={`font-sans text-left text-[clamp(1.75rem,3vw,2.65rem)] font-bold leading-[1.12] tracking-[-0.035em] ${
          inverse ? "text-white" : "text-[#051A3A]"
        }`}
      >
        {title}
      </h2>

      {copy && (
        <p
          className={`mt-5 text-left text-base leading-7 sm:text-lg ${
            inverse ? "text-white/70" : "text-[#48546A]"
          }`}
        >
          {copy}
        </p>
      )}
    </div>
  );
}

function PrimaryButton({ children, onClick, className = "" }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#F6C343] px-6 py-3.5 text-sm font-bold text-[#051A3A] shadow-[0_12px_30px_rgba(246,195,67,0.22)] transition hover:-translate-y-0.5 hover:bg-[#FFD365] focus:outline-none focus:ring-2 focus:ring-[#F6C343] focus:ring-offset-2 focus:ring-offset-[#051A3A] ${className}`}
    >
      {children}
      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
    </button>
  );
}

export default function DubaiNriPage() {
  const [documentsOpen, setDocumentsOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(-1);

  return (
    <main
      className={`min-h-screen overflow-x-clip bg-[#F8F7F3] text-[#051A3A]`}
    >
      <title>Dholera Investment from Dubai | Verified Plots for UAE NRIs</title>

      <meta
        name="description"
        content="Explore verified residential plots in Dholera Smart City from Dubai. Get transparent pricing, legal guidance, and dedicated support for UAE NRI investors."
      />

      {/* Main Hero Section */}
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

        {/* 
          Mobile:
          - Full-width image first
          - Content underneath

          Desktop:
          - Text left
          - Image right
        */}

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
              <h1 className="font-sans text-[clamp(2rem,4.15vw,4rem)] font-bold leading-[1.02] tracking-[-0.055em]">
                Dholera Investment from{" "}
                <span className="text-[#F6C343]">Dubai</span>
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-8 text-white/75 sm:text-lg">
                Looking for a smart way to diversify your investments in India?
                Dholera Insider helps Dubai NRIs explore verified residential
                plots in Dholera Smart City with transparent information, legal
                clarity, and a smooth remote buying process.
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
                  w-fit
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
                <FaWhatsapp className="mr-2 h-5 w-5 flex-shrink-0 text-[#25D366]" aria-hidden="true" />
                Explore Residential Projects
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 01 WHY DHOLERA */}
      <WhyDholera />

      {/* 04 BUYING PROCESS */}
      <section className="border-y border-[#051A3A]/10 bg-white site-gutter section-space">
        <div className="mx-auto max-w-7xl">
          {/* Heading */}
          <h2
            className="
              w-full
              text-left
              font-sans
              text-[clamp(1.75rem,3vw,2.65rem)]
              font-bold
              leading-[1.12]
              tracking-[-0.035em]
              text-[#051A3A]
              lg:text-center
            "
          >
            Your Dholera Investment Journey from Bahrain
          </h2>

          {/* Mobile / Tablet */}
          <div className="relative mx-auto mt-10 grid w-full max-w-md gap-5 lg:hidden">
            {/* Vertical Journey Line */}
            <span
              className="
                pointer-events-none
                absolute
                bottom-7
                left-6
                top-7
                border-l-2
                border-dashed
                border-[#F6C343]/50
              "
              aria-hidden="true"
            />


          {journeySteps.map(({ number, icon: Icon, title }, index) => (
            <article
              key={number}
              className="
                relative
                z-10
                grid
                grid-cols-[3rem_1fr]
                items-center
                gap-4
              "
            >
              {/* Icon */}
              <span
                className={`
                  grid
                  h-12
                  w-12
                  place-items-center
                  rounded-full
                  border-4
                  border-white
                  text-[#051A3A]
                  shadow-[0_10px_24px_rgba(5,26,58,.18)]
                  ${mobileJourneyColors[index]}
                `}
              >
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>

              {/* Left-aligned Title */}
              <div
                className="
                  flex
                  min-h-16
                  items-center
                  justify-start
                  rounded-2xl
                  border
                  border-[#051A3A]/10
                  bg-[#F8F7F3]
                  px-4
                  py-4
                  text-left
                  shadow-[0_10px_24px_rgba(5,26,58,.07)]
                "
              >
                <h3
                  className="
                    m-0
                    text-[15px]
                    font-bold
                    leading-[1.3]
                    text-[#051A3A]
                    sm:text-base
                  "
                >
                  {title}
                </h3>
              </div>
            </article>
          ))}
          </div>

          {/* Desktop */}
          <div className="relative mt-14 hidden lg:block">
            {/* Horizontal Connector */}
            <div
              className="
                absolute
                left-6
                top-7
                h-px
                w-[calc(100%-3rem)]
                bg-[#051A3A]/10
              "
              aria-hidden="true"
            />

            <div className="grid grid-cols-6 gap-2 xl:gap-5">
              {journeySteps.map(({ number, icon: Icon, title }) => (
                <article key={number} className="relative text-center">
                  <div className="flex flex-col items-center gap-4">
                    {/* Icon */}
                    <span
                      className="
                        relative
                        z-10
                        grid
                        h-14
                        w-14
                        shrink-0
                        place-items-center
                        rounded-full
                        border-4
                        border-white
                        bg-[#051A3A]
                        text-[#F6C343]
                        shadow-[0_8px_20px_rgba(5,26,58,.18)]
                      "
                    >
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>

                    {/* Step + Title */}
                    <div>
                      <span
                        className="
                          text-[11px]
                          font-bold
                          uppercase
                          tracking-[0.14em]
                          text-[#9A740D]
                        "
                      >
                        Step {number}
                      </span>

                      <h3
                        className="
                          mt-1
                          font-sans
                          text-base
                          font-bold
                          leading-snug
                          text-[#051A3A]
                        "
                      >
                        {title}
                      </h3>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="mt-10 flex w-full justify-center px-4 sm:px-6">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              className="
                inline-flex
                min-h-12
                items-center
                justify-center
                gap-2
                rounded-xl
                bg-[#F6C343]
                px-6
                py-3
                text-center
                text-sm
                font-bold
                text-[#051A3A]
                shadow-[0_8px_20px_rgba(5,26,58,.08)]
                transition
                duration-300
                hover:-translate-y-0.5
                hover:bg-[#051A3A]
                hover:text-[#F6C343]
                focus:outline-none
                focus-visible:ring-2
                focus-visible:ring-[#051A3A]
              "
            >
              <FaWhatsapp className="h-5 w-5 flex-shrink-0 text-[#25D366]" aria-hidden="true" />
              Talk to a Dholera Expert
            </a>
          </div>
        </div>
      </section>

      {/* 02 DOCUMENTATION */}
      <section
        id="documentation"
        className="relative isolate scroll-mt-20 overflow-hidden bg-[#051A3A] site-gutter section-space"
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
                  mt-5
                  max-w-xl
                  font-sans
                  text-[clamp(2rem,4vw,3.25rem)]
                  font-bold
                  leading-[1.08]
                  tracking-[-0.045em]
                  text-white
                "
              >
                Build a Long Term Asset in India
              </h2>

              {/* Main copy */}
              <p className="mt-5 max-w-xl text-base leading-7 text-white/70 sm:text-[17px] sm:leading-8">
                For many NRIs living in Dubai, owning land in India is more than
                an investment, it's a long term asset.
              </p>

              {/* Divider */}
              <div className="my-7 h-px max-w-xl bg-white/10" />

              {/* Supporting copy */}
              <p className="max-w-lg text-sm font-medium leading-6 text-white/55 sm:text-base sm:leading-7">
                A residential plot in Dholera gives you the flexibility to:
              </p>

              {/* Small visual indicator */}
              <div className="mt-8 hidden items-center gap-3 lg:flex">
                <div className="flex -space-x-1">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#F6C343]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-white/35" />
                  <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                </div>

                <span className="text-xs font-medium uppercase tracking-[0.14em] text-white/40">
                  Build · Hold · Plan
                </span>
              </div>
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
                {documentChecks.map(
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
                              font-sans
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
                          <Check className="h-4 w-4" strokeWidth={2.2} />
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

      {/* SOCIAL PROOF + FAQ */}
      <section
        aria-labelledby="why-choose-dholera-insider"
        className="bg-[#EEF2F9] site-gutter section-space"
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
                  font-sans
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
              <div className="mt-6 flex items-center gap-2" aria-hidden="true">
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
                        font-sans
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

          {/* ======================================================
              CTA
          ====================================================== */}
          <div
            className="
              relative
              mt-10
              overflow-hidden
              rounded-[24px]
              border
              border-white/10
              bg-[#051A3A]
              px-5
              py-7
              shadow-[0_22px_55px_rgba(5,26,58,0.16)]

              sm:px-7
              sm:py-8

              md:mt-12
              md:px-9

              lg:flex
              lg:items-center
              lg:justify-between
              lg:gap-10
              lg:px-10
              lg:py-9
            "
          >
            {/* Background detail */}
            <div
              className="
                pointer-events-none
                absolute
                inset-0
                opacity-[0.08]
              "
              aria-hidden="true"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 88% 20%, rgba(246,195,67,.55), transparent 22%), linear-gradient(120deg, transparent 55%, rgba(255,255,255,.12) 100%)",
              }}
            />

            {/* CTA Heading */}
            <div className="relative">
              <h2
                className="
                  max-w-2xl
                  font-sans
                  text-[clamp(1.75rem,3.5vw,2.6rem)]
                  font-bold
                  leading-[1.08]
                  tracking-[-0.04em]
                  text-white
                "
              >
                Invest with Confidence from Dubai
              </h2>
            </div>

            {/* CTA Button */}
            <div className="relative mt-6 shrink-0 lg:mt-0">
              <a
                href="https://wa.me/919211820887?text=Hello%2C%20I%20am%20interested%20in%20buying%20a%20plot%20in%20Dholera.%20Please%20share%20the%20details."
                target="_blank"
                rel="noopener noreferrer"
                className="
                  group
                  inline-flex
                  min-h-[52px]
                  w-fit
                  items-center
                  justify-center
                  gap-2.5
                  rounded-xl
                  bg-[#F6C343]
                  px-6
                  py-3
                  text-[15px]
                  font-bold
                  text-[#051A3A]
                  shadow-[0_10px_26px_rgba(246,195,67,0.18)]
                  transition-all
                  duration-200

                  hover:-translate-y-0.5
                  hover:bg-[#FFD365]
                  hover:shadow-[0_14px_32px_rgba(246,195,67,0.24)]

                  active:translate-y-0
                  active:scale-[0.99]

                  focus:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-white
                  focus-visible:ring-offset-2
                  focus-visible:ring-offset-[#051A3A]

                  sm:w-auto
                  sm:min-w-[220px]
                "
              >
                <FaWhatsapp className="h-5 w-5 flex-shrink-0 text-[#25D366]" aria-hidden="true" />
                Get Investment Details
                <ArrowRight
                  className="
                    h-4
                    w-4
                    transition-transform
                    duration-200
                    group-hover:translate-x-1
                  "
                  strokeWidth={2}
                  aria-hidden="true"
                />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <DubaiFaq />

      {/* MOBILE ACTION BAR */}

      {/* 
      <div className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-2 gap-2 border-t border-[#051A3A]/10 bg-white/95 p-2 shadow-[0_-10px_30px_rgba(5,26,58,.12)] backdrop-blur sm:hidden">
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noreferrer"
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#2E9B58] text-sm font-bold text-white"
        >
          <FaWhatsapp className="h-6 w-6" />
          WhatsApp
        </a>

        <Link
          href={`tel:${PHONE_NUMBER}`}
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#051A3A] text-sm font-bold text-white"
        >
          <Phone className="h-6 w-6 text-[#F6C343]" />
          Call
        </Link>
      </div>
      */}

      {documentsOpen && (
        <BrochureDownload
          title="Talk to a Dholera Expert"
          subtitle="Dholera Insider helps Dubai NRIs explore verified residential plots in Dholera Smart City with transparent information, legal clarity, and a smooth remote buying process."
          buttonName="Schedule a Video Call"
          thankYouMessage="Your request was submitted successfully."
          source="Dubai NRI   Dholera Document Pack"
          link="/pdf/Legal%20Verification%20Estates.pdf"
          downloadFilename="Dholera Legal Documents Checklist.pdf"
          downloadLabel="Dholera documents checklist"
          redirectPath={null}
          onClose={() => setDocumentsOpen(false)}
        />
      )}
    </main>
  );
}
