"use client";

import { useState ,useId } from "react";
import Image from "next/image";
import Link from "next/link";
import { Inter, Space_Grotesk } from "next/font/google";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  Check,
  ChevronDown,
  CircleCheckBig,
  Factory,
  FileCheck2,
  Globe2,
  Landmark,
  Network,
  Phone,
  Plane,
  SearchCheck,
  TrendingUp,
  ShieldCheck,
} from "lucide-react";

import { FaWhatsapp } from "react-icons/fa";

import heroImage from "@/app/assets/investor/dholera-insider-qatar-banner.webp";
import BrochureDownload from "@/app/components/BrochureDownload";
import { qatarFaqs } from "./data";
import WhyQatar from "./WhyQatar";
import CommonJourney from "../CommonJourney";

const display = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-qatar-display",
});

const body = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-qatar-body",
});

const PHONE_NUMBER = "+919211820887";
const WHATSAPP_URL =
  "https://wa.me/919211820887?text=Hello%2C%20I%20am%20in%20Qatar%20and%20interested%20in%20Dholera%20residential%20plots.%20Please%20share%20the%20details.";



const dholeraReasons = [
  { icon: Landmark, label: "India's first Greenfield Smart City" },
  { icon: Factory, label: "Large-scale industrial development" },
  { icon: BadgeCheck, label: "Semiconductor ecosystem" },
  { icon: Network, label: "Ahmedabad-Dholera Expressway" },
  { icon: Plane, label: "Dholera International Airport" },
  { icon: Building2, label: "Planned residential development" },
  { icon: TrendingUp, label: "Long-term growth potential" },
];

const supportBenefits = [
  "Residential plot opportunities",
  "Project and location guidance",
  "Legal document support",
  "Transparent project information",
  "Remote investment assistance",
  "Registration guidance",
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

function SectionHeading({ eyebrow, title, copy }) {
  return (
    <div className="max-w-3xl">
      <SectionLabel>{eyebrow}</SectionLabel>
      <h2 className="font-[var(--font-qatar-display)] text-[clamp(1.75rem,3vw,2.65rem)] font-bold leading-[1.12] tracking-[-0.035em] text-[#051A3A]">
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

export default function QatarInvestorPage() {
  const [formOpen, setFormOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(-1);


  const [openIndex, setOpenIndex] = useState(-1);

  const headingId = useId();

  return (
    <main
      className={`${display.variable} ${body.variable} min-h-screen overflow-x-clip bg-[#F8F7F3] text-[#051A3A]`}
      style={{ fontFamily: "var(--font-qatar-body)" }}
    >
      {/* Banner Section  */}
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
                <h1 className="font-[var(--font-bahrain-display)] text-[clamp(2rem,4.15vw,4rem)] font-bold leading-[1.02] tracking-[-0.055em]">
                  Dholera Investment from{" "}
                  <span className="text-[#F6C343]">Qatar</span>
                </h1>
    
                <p className="mt-6 max-w-2xl text-base leading-8 text-white/75 sm:text-lg">
                  Living and working in Qatar can keep you away from India for years. But your plans for property,
                  family and the future do not have to wait.
                </p>

                <p className="mt-6 max-w-2xl text-base leading-8 text-white/75 sm:text-lg">
                 Dholera Insider helps Qatar based NRIs explore residential plots in Dholera Smart City with clear information 
                 and dedicated investment support.
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


      {/* Why Qatar Section */}
      <WhyQatar />


      {/* Journey Section */}
      <CommonJourney />




      {/* <section
        id="why-dholera"
        className="relative isolate scroll-mt-20 overflow-hidden bg-white px-5 py-12 sm:px-8 lg:px-10 lg:py-20"
      >
        <div className="mx-auto max-w-7xl">
          <div className="relative overflow-hidden rounded-[30px] bg-[#051A3A] px-6 py-9 shadow-[0_28px_80px_rgba(5,26,58,.18)] sm:px-9 lg:px-12 lg:py-12">
            <div
              className="absolute inset-0 opacity-[0.055]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.8) 1px, transparent 1px)",
                backgroundSize: "34px 34px",
              }}
            />
            <div className="relative grid items-center gap-10 lg:grid-cols-[.82fr_1.18fr] lg:gap-14">
              <div>
                <SectionLabel inverse>Qatar NRI Investment Guide</SectionLabel>
                <h2 className="font-[var(--font-qatar-display)] text-[clamp(1.9rem,4vw,3.35rem)] font-bold leading-[1.08] tracking-[-0.045em] text-white">
                  What Makes Dholera Stand Out?
                </h2>
                <p className="mt-6 text-base leading-7 text-white/70 sm:text-lg sm:leading-8">
                  Dholera combines planned city development with major transport
                  and industrial infrastructure being developed in phases.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {dholeraReasons.map(({ icon: Icon, label }) => (
                  <article
                    key={label}
                    className="flex min-h-20 items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.065] p-4 backdrop-blur-sm transition hover:-translate-y-1 hover:border-[#F6C343]/45"
                  >
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#F6C343] text-[#051A3A]">
                      <Icon className="h-5 w-5" />
                    </span>
                    <h3 className="font-[var(--font-qatar-display)] text-sm font-bold leading-5 text-white">
                      {label}
                    </h3>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* <section
        id="why-us"
        className="scroll-mt-20 border-y border-[#051A3A]/10 bg-[#F8F7F3] px-5 py-12 sm:px-8 lg:px-10 lg:py-20"
      >
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[.9fr_1.1fr] lg:gap-16">
          <div>
             <h4
              id="why-dholera-heading"
              className="
                text-3xl
                font-bold
                leading-tight
                tracking-[-0.03em]
                text-[#051A3A]
                sm:text-4xl
                lg:text-[40px]
              "
            >
              Why Dholera Insider?
            </h4>


            <p className="mt-6 text-base leading-7 text-[#48546A]">
             Your investment decision should be based on information, not promises. 
            </p>


            <p className="mt-6 text-base leading-7 text-[#48546A]">
              As the exclusive channel partner of BookMyAssets for NRI
              investors, we help make Dholera property investment from Qatar
              easier to understand and manage.
            </p>
          </div>

          <div className="rounded-[28px] border border-[#051A3A]/10 bg-white p-5 shadow-[0_16px_45px_rgba(5,26,58,.06)] sm:p-7">
            <p className="mb-5 font-[var(--font-qatar-display)] text-lg font-bold text-[#051A3A]">
              Dholera Insider helps Qatar NRIs with:
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              {supportBenefits.map((benefit) => (
                <div
                  key={benefit}
                  className="flex items-center gap-3 rounded-xl border border-[#051A3A]/10 bg-[#F8F7F3] px-4 py-3.5 text-sm font-semibold text-[#344054]"
                >
                  <CircleCheckBig className="h-4 w-4 shrink-0 text-[#2E8B57]" />
                  {benefit}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section> */}



      <section
        id="why-us"
        aria-labelledby="why-dholera-heading"
        className="scroll-mt-20 bg-[#EEF2F9] px-4 py-12 sm:px-6 sm:py-14 lg:px-8 lg:py-20"
      >
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start lg:gap-16 xl:gap-20">
            {/* =====================================================
                LEFT CONTENT
            ====================================================== */}

            <div className="lg:sticky lg:top-28">
              {/* Small label */}

              {/* Heading */}

              <h2
                id="why-dholera-heading"
                className="
                  mt-5
                  max-w-[520px]
                  text-[clamp(2rem,5vw,3.4rem)]
                  font-bold
                  leading-[1.05]
                  tracking-[-0.045em]
                  text-[#051A3A]
                "
              >
                Why Dholera Insider?
                {/* <span className="block">
                  
                </span> */}
              </h2>

              {/* Accent */}

              <div className="mt-4 h-[3px] w-12 rounded-full bg-[#F6C343]" />

              {/* Intro copy */}

              <div className="mt-6 max-w-xl space-y-4">
              

                <p className="text-[14px] leading-7 text-[#667085] sm:text-[15px] lg:text-base lg:leading-8">
                  Your investment decision should be based on
                  information, not promises.
                </p>
              </div>

              {/* Trust note */}
{/* 
              <div className="mt-7 flex max-w-md items-start gap-3 rounded-2xl border border-[#051A3A]/[0.08] bg-white/70 p-4 backdrop-blur-sm">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#051A3A]">
                  <BadgeCheck
                    className="h-[18px] w-[18px] text-[#F6C343]"
                    strokeWidth={1.8}
                    aria-hidden="true"
                  />
                </div>

                <p className="pt-0.5 text-[12px] leading-5 text-[#667085] sm:text-[13px]">
                  Clear project information, documentation guidance
                  and dedicated NRI support throughout the process.
                </p>
              </div> */}
            </div>

            {/* =====================================================
                RIGHT CONTENT
            ====================================================== */}

            <div>
              {/* Header */}

              <div className="mb-5 sm:mb-6">
                <p className="text-[20px] font-bold tracking-[-0.02em] text-[#051A3A] sm:text-[22px] lg:text-[24px]">
                  Dholera Insider helps Qatar NRIs with:
                </p>
              </div>

              {/* ===================================================
                  BENEFIT CARDS
              ==================================================== */}

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
                {supportBenefits.map((benefit, index) => (
                  <div
                    key={benefit}
                    className="
                      group
                      relative
                      flex
                      min-h-[84px]
                      items-center
                      gap-4
                      overflow-hidden
                      rounded-[18px]
                      border
                      border-white
                      bg-white
                      px-4
                      py-4
                      shadow-[0_8px_28px_rgba(5,26,58,0.045)]
                      transition-all
                      duration-300
                      hover:-translate-y-[2px]
                      hover:border-[#F6C343]/40
                      hover:shadow-[0_16px_36px_rgba(5,26,58,0.08)]
                      sm:min-h-[98px]
                      sm:px-5
                    "
                  >
                    {/* Subtle hover glow */}

                    <div
                      aria-hidden="true"
                      className="
                        pointer-events-none
                        absolute
                        -right-8
                        -top-8
                        h-20
                        w-20
                        rounded-full
                        bg-[#F6C343]/0
                        blur-2xl
                        transition-all
                        duration-300
                        group-hover:bg-[#F6C343]/10
                      "
                    />

                

                    {/* Icon */}

                    <div
                      className="
                        relative
                        flex
                        h-11
                        w-11
                        shrink-0
                        items-center
                        justify-center
                        rounded-full
                        border
                        border-[#F6C343]/30
                        bg-[#FFF7DE]
                        text-[#B77D00]
                        transition-all
                        duration-300
                        group-hover:scale-105
                        group-hover:border-[#F6C343]/60
                      "
                    >
                      <CircleCheckBig
                        className="h-5 w-5"
                        strokeWidth={1.8}
                        aria-hidden="true"
                      />
                    </div>

                    {/* Text */}

                    <p
                      className="
                        relative
                        pr-5
                        text-[13px]
                        font-semibold
                        leading-[1.45]
                        text-[#344054]
                        sm:text-[14px]
                        lg:text-[15px]
                      "
                    >
                      {benefit}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

 

      <section
            id="faqs"
            className="scroll-mt-28 bg-white px-4 py-8 sm:px-6 md:py-12 lg:px-8"
            aria-labelledby={headingId}
          >
            <div className="mx-auto max-w-5xl">
              <h2
                id={headingId}
                className="font-[var(--font-oman-display)] text-[clamp(1.9rem,4vw,3.25rem)] font-bold leading-tight tracking-[-0.045em]"
              >
                FAQ
              </h2>
              <div
              aria-hidden="true"
              className="
                mt-3
                h-[3px]
                w-12
                rounded-full
                bg-[#F6C343]
              "
            />
              <div className="mt-10 divide-y divide-[#051A3A]/15 border-y border-[#051A3A]/15">
                {qatarFaqs.map((item, index) => {
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
              <Check className="h-4 w-4" /> Dholera Investment from Qatar
            </span>
            <h2 className="mt-4 font-[var(--font-qatar-display)] text-[clamp(1.75rem,3vw,2.75rem)] font-bold leading-[1.12] tracking-[-0.045em] text-white">
              Explore Dholera Residential Plots from Qatar
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-white/65">
              Review project information and documents with dedicated guidance
              for Qatar-based NRI investors.
            </p>
            <PrimaryButton onClick={() => setFormOpen(true)} className="mt-8">
              Get Qatar NRI Guidance
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
          title="Explore Dholera Plots from Qatar"
          subtitle="Get clear residential project information, documentation guidance and dedicated NRI investment support."
          buttonName="Request Project Details"
          thankYouMessage="Your request was submitted successfully."
          source="Qatar NRI Dholera Investment Page"
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
