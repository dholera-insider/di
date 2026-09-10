"use client";

import { useState  ,useId } from "react";
import Image from "next/image";
import Link from "next/link";
import { Inter, Space_Grotesk } from "next/font/google";
import {

  BadgeCheck,
  FileText,
  FileCheck2,
  MonitorPlay,
  Handshake,
  ScrollText,
  Headphones,
  ArrowRight,
  Check,
  ChevronDown,
  Globe2,
  ShieldCheck,
  TrendingUp,
  UserCheck,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

import heroImage from "@/app/assets/investor/dholera-insider-kuwait-banner.webp";
import BrochureDownload from "@/app/components/BrochureDownload";
import { kuwaitFaqs } from "./data";
import WhyKuwait from "./WhyKuwait";
import CommonJourney from "../CommonJourney";

const display = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-kuwait-display",
});

const body = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-kuwait-body",
});

const PHONE_NUMBER = "+919211820887";
const WHATSAPP_URL =
  "https://wa.me/919211820887?text=Hello%2C%20I%20am%20in%20Kuwait%20and%20interested%20in%20Dholera%20residential%20plots.%20Please%20share%20the%20details.";

const sectionLinks = [
  { label: "Why Dholera", href: "#why-dholera" },
  { label: "Buying Process", href: "#buy-dholera-plot" },
  { label: "Why Dholera Insider", href: "#why-us" },
  { label: "FAQ", href: "#faqs" },
];

const trustSignals = [
  { icon: ShieldCheck, label: "Verified residential plots" },
  { icon: FileCheck2, label: "Documentation guidance" },
  { icon: Globe2, label: "Remote NRI support" },
];

const documentChecks = [
  {
    icon: BadgeCheck,
    title: "Verified Residential Plot Opportunities",
    description: "",
  },
  {
    icon: FileText,
    title: "Clear Project Information",
    description: "",
  },
  {
    icon: FileCheck2,
    title: "Documentation Guidance",
    description: "",
  },
  {
    icon: MonitorPlay,
    title: "Virtual Project Presentations",
    description: "",
  },
  {
    icon: Handshake,
    title: "Remote Buying Support",
    description: "",
  },
  {
    icon: ScrollText,
    title: "Registration Assistance",
    description: "",
  },
  {
    icon: Headphones,
    title: "Dedicated NRI Support",
    description: "",
  },
];



const supportBenefits = [
  "Verified residential plot opportunities",
  "Clear project information",
  "Documentation guidance",
  "Virtual project presentations",
  "Remote buying support",
  "Registration assistance",
  "Dedicated NRI support",
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

function SectionHeading({ eyebrow, title, copy, centered = false }) {
  return (
    <div className={centered ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <SectionLabel>{eyebrow}</SectionLabel>
      <h2 className="font-[var(--font-kuwait-display)] text-[clamp(1.75rem,3vw,2.65rem)] font-bold leading-[1.12] tracking-[-0.035em] text-[#051A3A]">
        {title}
      </h2>
      {copy && (
        <p className="mt-5 text-base leading-7 text-[#48546A] sm:text-lg">
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

export default function KuwaitInvestorPage() {
  const [formOpen, setFormOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(-1);

  const [openIndex, setOpenIndex] = useState(-1);


      const headingId = useId();
  

  return (
    <main
      className={`${display.variable} ${body.variable} min-h-screen overflow-x-clip bg-[#F8F7F3] text-[#051A3A]`}
      style={{ fontFamily: "var(--font-kuwait-body)" }}
    >

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
              <span className="text-[#F6C343]">Kuwait</span>
            </h1>

            <p className="mt-5 text-xl font-semibold text-[#F6C343] sm:text-2xl">
            Build your investment in India while living in Kuwait.
          </p>

            <p className="mt-6 max-w-2xl text-base leading-8 text-white/75 sm:text-lg">
              Dholera stands out because it is being developed as India&apos;s
              first Greenfield Smart City, with major infrastructure and
              industrial development taking place in phases.
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


    <WhyKuwait />
    <CommonJourney 
        title="Buy a Dholera Plot from Kuwait"
    />              

  

    <section id="documentation"
      className="relative isolate scroll-mt-20 overflow-hidden bg-[#051A3A] px-5 py-14 sm:px-8 md:py-16 lg:px-10 lg:py-20"
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
                font-[var(--font-display)]
                text-[clamp(2rem,4vw,3.25rem)]
                font-bold
                leading-[1.08]
                tracking-[-0.045em]
                text-white
              "
            >
              Why Kuwait NRIs Choose Dholera Insider
            </h2>

            {/* Divider */}
            <div className="my-7 h-px max-w-xl bg-white/10" />


            {/* Main copy */}
            <p className="mt-5 max-w-xl text-base leading-7 text-white/70 sm:text-[17px] sm:leading-8">
              Dholera Insider focuses specifically on helping overseas Indian investors understand Dholera before they invest.
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
          id="faqs"
          className="scroll-mt-28 bg-[#F8F7F3] px-4 py-8 sm:px-6 md:py-12 lg:px-8"
          aria-labelledby={headingId}
        >
          <div className="mx-auto max-w-5xl">
            <h2
              id={headingId}
              className="font-[var(--font-oman-display)] text-[clamp(1.9rem,4vw,3.25rem)] font-bold leading-tight tracking-[-0.045em]"
            >
              FAQ
            </h2>
            <div className="mt-10 divide-y divide-[#051A3A]/15 border-y border-[#051A3A]/15">
              {kuwaitFaqs.map((item, index) => {
                const isOpen = openIndex === index;
                const answerId = `oman-faq-answer-${index}`;
                const buttonId = `oman-faq-button-${index}`;
    
                return (
                  <article key={item.question}>
                    <h3>
                      <button
                        id={buttonId}
                        type="button"
                        onClick={() => setOpenIndex(isOpen ? -1 : index)}
                        className="flex min-h-16 w-full items-center justify-between gap-5 py-5 text-left font-[var(--font-oman-display)] text-base font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F6C343] sm:text-lg"
                        aria-expanded={isOpen}
                        aria-controls={answerId}
                      >
                        <span className="flex items-start gap-3">
                          <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#F6C343] text-xs font-bold text-[#051A3A]">
                            Q
                          </span>
                          <span>{item.question}</span>
                        </span>
                        <ChevronDown
                          className={`h-5 w-5 shrink-0 transition-transform ${
                            isOpen ? "rotate-180" : ""
                          }`}
                          aria-hidden="true"
                        />
                      </button>
                    </h3>
                    <div
                      id={answerId}
                      role="region"
                      aria-labelledby={buttonId}
                      hidden={!isOpen}
                    >
                      <div className="flex max-w-3xl items-start gap-3 pb-5">
                        <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#051A3A] text-xs font-bold text-[#F6C343]">
                          A
                        </span>
                        <p className="text-sm leading-7 text-[#051A3A]/70 sm:text-base">
                          {item.answer}
                        </p>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
    </section>

      {/* <section className="px-5 pb-20 pt-4 sm:px-8 lg:px-10">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[30px] border border-[#F6C343]/30 bg-[#051A3A] px-6 py-12 text-center sm:px-10 lg:py-16">
          <div
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage: "radial-gradient(#fff 1px, transparent 1px)",
              backgroundSize: "22px 22px",
            }}
          />
          <div className="relative mx-auto max-w-3xl">
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.15em] text-[#F6C343]">
              <Check className="h-4 w-4" /> Dholera Investment from Kuwait
            </span>
            <h2 className="mt-4 font-[var(--font-kuwait-display)] text-[clamp(1.75rem,3vw,2.75rem)] font-bold leading-[1.12] tracking-[-0.045em] text-white">
              Explore Dholera Residential Plots from Kuwait
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-white/65">
              Get clear project information, documentation guidance and
              dedicated support for your next step.
            </p>
            <PrimaryButton onClick={() => setFormOpen(true)} className="mt-8">
              Get Kuwait NRI Investment Guidance
            </PrimaryButton>
          </div>
        </div>
      </section> */}

      {/* <div className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-2 gap-2 border-t border-[#051A3A]/10 bg-white/95 p-2 shadow-[0_-10px_30px_rgba(5,26,58,.12)] backdrop-blur sm:hidden">
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noreferrer"
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#2E9B58] text-sm font-bold text-white"
        >
          <FaWhatsapp className="h-6 w-6" /> WhatsApp
        </a>
        <Link
          href={`tel:${PHONE_NUMBER}`}
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#051A3A] text-sm font-bold text-white"
        >
          <Phone className="h-5 w-5 text-[#F6C343]" /> Call
        </Link>
      </div> */}

      {formOpen && (
        <BrochureDownload
          title="Get Kuwait NRI Investment Guidance"
          subtitle="Explore verified Dholera residential plots with clear project information, documentation guidance and remote buying support."
          buttonName="Schedule a Call"
          thankYouMessage="Your request was submitted successfully."
          source="Kuwait NRI Dholera Investment Page"
          link="/pdf/Legal%20Verification%20Estates.pdf"
          downloadFilename="Dholera Legal Documents Checklist.pdf"
          downloadLabel="Dholera documents checklist"
          redirectPath={null}
          onClose={() => setFormOpen(false)}
        />
      )}
    </main>
  );
}
