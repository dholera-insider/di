"use client";

import { useId, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Inter, Space_Grotesk } from "next/font/google";
import {
  BadgeCheck,
  Building2,
  Check,
  ChevronDown,
  CircleCheckBig,
  FileCheck2,
  FileText,
  Landmark,
  MapPin,
  MessageCircle,
  Plane,
  SearchCheck,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

import heroImage from "@/app/assets/investor/dholera-insider-saudi-arabia-banner.webp";
import countyImage from "@/app/assets/dholera-residential/county-desktop.webp";
import estatesImage from "@/app/assets/dholera-residential/estates-desktop.webp";
import residencyImage from "@/app/assets/dholera-residential/residency-desktop.webp";

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

const sectionLinks = [
  { label: "Why Invest in Dholera?", href: "#why-invest" },
  {
    label: "Why Saudi NRIs Are Choosing Dholera",
    href: "#why-saudi-nris",
  },
  {
    label: "Your Investment Journey from Saudi Arabia",
    href: "#investment-journey",
  },
];

const investmentReasons = [
  { icon: Landmark, label: "India's First Greenfield Smart City" },
  { icon: ShieldCheck, label: "Government-Backed Development" },
  { icon: Building2, label: "Tata Semiconductor Project" },
  { icon: TrendingUp, label: "Ahmedabad–Dholera Expressway" },
  { icon: Plane, label: "Dholera International Airport" },
];

const ownershipBenefits = [
  "Build a future family home",
  "Plan for retirement in India",
  "Create a long-term family asset",
  "Invest in a developing smart city",
  "Benefit from future infrastructure growth",
];

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

const journeySteps = [
  {
    number: "1",
    icon: MessageCircle,
    title: "Talk to a Dholera Expert",
    description:
      "Share your investment goals and understand which residential project suits your requirements.",
  },
  {
    number: "2",
    icon: SearchCheck,
    title: "Explore Verified Projects",
    description:
      "Compare project locations, plot sizes, pricing, and nearby infrastructure through online presentations.",
  },
  {
    number: "3",
    icon: FileCheck2,
    title: "Review Legal Documents",
    description:
      "Understand the project approvals, NA/NOC, title documents, and registry process before investing.",
  },
  {
    number: "4",
    icon: MapPin,
    title: "Reserve Your Plot",
    description:
      "Complete the booking process with transparent pricing and secure payment options.",
  },
  {
    number: "5",
    icon: BadgeCheck,
    title: "Complete Registration",
    description: "Get your plot registered",
  },
];

const mobileJourneyColors = [
  "bg-[#D9D8F2]",
  "bg-[#C9EFE8]",
  "bg-[#F2D9D0]",
  "bg-[#F4DEB3]",
  "bg-[#F6CDB6]",
];

const reasonsToChoose = [
  "Verified Residential Plot Projects",
  "Transparent Pricing & Documentation",
  "Dedicated Support for Saudi NRIs",
  "100% Remote Buying Process",
  "Exclusive Channel Partner of BookMyAssets",
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
      <section className="relative isolate overflow-hidden bg-[#051A3A] px-5 py-8 text-white sm:px-8 md:py-12 lg:px-10">
        <div
          className="absolute inset-0 -z-20 opacity-30"
          style={{
            backgroundImage:
              "radial-gradient(circle at 15% 25%, rgba(246,195,67,.18), transparent 24%), radial-gradient(circle at 80% 10%, rgba(65,125,200,.24), transparent 30%)",
          }}
        />
        <div
          className="absolute inset-0 -z-10 opacity-[0.055]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.75) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.75) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        <div className="mx-auto grid max-w-7xl pt-20 items-center gap-12 lg:grid-cols-[1.02fr_.98fr] lg:gap-16">
          <div>
            <SectionLabel inverse>Dholera Investment from Saudi Arabia</SectionLabel>
            <h1 className="max-w-3xl font-[var(--font-saudi-display)] text-[clamp(2rem,4.5vw,4rem)] font-bold leading-[1.02] tracking-[-0.05em] text-white">
              Dholera Investment from Saudi Arabia
            </h1>
            <p className="mt-6 max-w-2xl text-[clamp(1rem,1.8vw,1.25rem)] leading-8 text-white/70">
              Planning to invest in property back home? Dholera Insider helps
              NRIs in Saudi Arabia explore verified residential plots in
              Dholera Smart City with transparent information, legal guidance,
              and dedicated support from enquiry to registration.
            </p>
          </div>

          <div className="relative mx-auto w-full max-w-[800px]">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[28px] border border-white/10 bg-white/5 shadow-[0_30px_90px_rgba(0,0,0,.35)]">
              <Image
                src={heroImage}
                alt="Verified residential plots in Dholera for Saudi NRIs"
                width={800}
                height={600}
                priority
                sizes="(max-width: 1024px) 100vw, 48vw"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#051A3A]/60 via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </section>

      <nav
        className="sticky top-0 z-40 border-b border-[#051A3A]/10 bg-[#F8F7F3]/95 shadow-[0_8px_30px_rgba(5,26,58,.06)] backdrop-blur"
        aria-label="Page sections"
      >
        <div className="mx-auto flex max-w-7xl gap-1 overflow-x-auto px-5 py-2 sm:px-8 lg:px-10">
          {sectionLinks.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="whitespace-nowrap rounded-lg px-4 py-2.5 text-sm font-semibold text-[#48546A] transition hover:bg-white hover:text-[#051A3A]"
            >
              {item.label}
            </a>
          ))}
        </div>
      </nav>

      <section
        id="why-invest"
        className="scroll-mt-20 px-5 py-8 sm:px-8 md:py-12 lg:px-10"
      >
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            label="Dholera Investment from Saudi Arabia"
            title="Why Invest in Dholera?"
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {investmentReasons.map(({ icon: Icon, label }, index) => (
              <article
                key={label}
                className="group relative min-h-40 overflow-hidden rounded-2xl border border-[#051A3A]/10 bg-white p-5 shadow-[0_14px_35px_rgba(5,26,58,.05)] transition duration-300 hover:-translate-y-1 hover:border-[#F6C343]/70 hover:shadow-[0_20px_50px_rgba(5,26,58,.10)] sm:p-6"
              >
                <span className="absolute right-5 top-4 font-[var(--font-saudi-display)] text-4xl font-bold text-[#051A3A]/[0.055]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-[#051A3A] text-[#F6C343] transition-colors group-hover:bg-[#F6C343] group-hover:text-[#051A3A]">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="mt-6 max-w-[16rem] font-[var(--font-saudi-display)] text-lg font-bold leading-6 text-[#051A3A]">
                  {label}
                </h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="why-saudi-nris"
        className="scroll-mt-20 bg-[#051A3A] px-5 py-8 text-white sm:px-8 md:py-12 lg:px-10"
      >
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[.9fr_1.1fr] lg:items-center lg:gap-16">
          <div>
            <SectionHeading
              label="Dholera Investment from Saudi Arabia"
              title="Why Saudi NRIs Are Choosing Dholera"
              inverse
            />
            <p className="mt-6 max-w-2xl text-base leading-8 text-white/70 sm:text-lg">
              Many investors from Saudi Arabia prefer residential plots because
              they provide greater flexibility and long-term ownership.
            </p>
            <p className="mt-6 font-[var(--font-saudi-display)] text-lg font-bold text-[#F6C343]">
              A Dholera residential plot can help you:
            </p>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-white/[0.05] p-5 sm:p-7">
            <div className="space-y-3">
              {ownershipBenefits.map((benefit) => (
                <div
                  key={benefit}
                  className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.05] px-4 py-4 font-[var(--font-saudi-display)] text-sm font-semibold text-white sm:text-base"
                >
                  <CircleCheckBig className="h-5 w-5 shrink-0 text-[#F6C343]" />
                  {benefit}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        id="investment-journey"
        className="scroll-mt-20 border-y border-[#051A3A]/10 bg-white px-5 py-8 sm:px-8 md:py-12 lg:px-10"
      >
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            label="Dholera Investment from Saudi Arabia"
            title="Your Investment Journey from Saudi Arabia"
            centered
          />

          <div className="relative mx-auto mt-10 grid w-full max-w-md gap-5 lg:hidden">
            <span
              className="pointer-events-none absolute bottom-7 left-6 top-7 border-l-2 border-dashed border-[#F6C343]/50"
              aria-hidden="true"
            />
            {journeySteps.map(
              ({ number, icon: Icon, title, description }, index) => (
                <article
                  key={number}
                  className="relative z-10 grid grid-cols-[3rem_1fr] items-start gap-4"
                >
                  <span
                    className={`grid h-12 w-12 place-items-center rounded-full border-4 border-white text-[#051A3A] shadow-[0_10px_24px_rgba(5,26,58,.18)] ${mobileJourneyColors[index]}`}
                  >
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div className="rounded-2xl border border-[#051A3A]/10 bg-[#F8F7F3] p-4 text-left shadow-[0_10px_24px_rgba(5,26,58,.07)]">
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                      <span className="inline-flex rounded-full bg-[#051A3A] px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.14em] text-[#F6C343]">
                        Step {number}
                      </span>
                      <h3 className="font-[var(--font-saudi-display)] text-sm font-bold leading-tight text-[#051A3A]">
                        {title}
                      </h3>
                    </div>
                    <p className="mt-2 text-xs leading-5 text-[#667085]">
                      {description}
                    </p>
                  </div>
                </article>
              ),
            )}
          </div>

          <div className="relative mt-14 hidden lg:block">
            <div className="absolute left-6 top-7 h-px w-[calc(100%-3rem)] bg-[#051A3A]/10" />
            <div className="grid grid-cols-5 gap-5">
              {journeySteps.map(
                ({ number, icon: Icon, title, description }) => (
                  <article key={number} className="relative text-center">
                    <div className="flex flex-col items-center gap-5">
                      <span className="relative z-10 grid h-14 w-14 place-items-center rounded-full border-4 border-white bg-[#051A3A] text-[#F6C343] shadow-[0_8px_20px_rgba(5,26,58,.18)]">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <div>
                        <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#9A740D]">
                          Step {number}
                        </span>
                        <h3 className="mt-1 font-[var(--font-saudi-display)] text-base font-bold text-[#051A3A]">
                          {title}
                        </h3>
                      </div>
                    </div>
                    <p className="mt-4 px-2 text-sm leading-6 text-[#667085]">
                      {description}
                    </p>
                  </article>
                ),
              )}
            </div>
          </div>

          <div className="mt-12 flex flex-col items-center justify-between gap-5 rounded-[24px] bg-[#051A3A] px-6 py-7 text-center sm:flex-row sm:px-8 sm:text-left">
            <p className="font-[var(--font-saudi-display)] text-lg font-bold text-white">
              Connect with RM
            </p>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-12 shrink-0 items-center gap-2 rounded-xl bg-[#F6C343] px-5 text-sm font-bold text-[#051A3A] transition hover:bg-white"
            >
              <FaWhatsapp className="h-5 w-5" /> Connect with RM
            </a>
          </div>
        </div>
      </section>

      <section className="px-5 py-8 sm:px-8 md:py-12 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[.8fr_1.2fr] lg:gap-16">
          <div>
            <SectionLabel>Dholera Investment from Saudi Arabia</SectionLabel>
            <h2 className="font-[var(--font-saudi-display)] text-[clamp(1.75rem,3vw,2.65rem)] font-bold leading-[1.12] tracking-[-0.035em] text-[#051A3A]">
              Why Choose Dholera Insider?
            </h2>
            <div className="mt-7 rounded-[24px] border border-[#051A3A]/10 bg-white p-5 shadow-[0_16px_45px_rgba(5,26,58,.06)] sm:p-6">
              <div className="space-y-3">
                {reasonsToChoose.map((reason) => (
                  <div
                    key={reason}
                    className="flex items-center gap-3 rounded-xl border border-[#051A3A]/10 bg-[#F8F7F3] px-4 py-3.5 text-sm font-semibold text-[#344054]"
                  >
                    <Check className="h-4 w-4 shrink-0 text-[#2E8B57]" />
                    {reason}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div aria-labelledby={faqHeadingId}>
            <h2
              id={faqHeadingId}
              className="font-[var(--font-saudi-display)] text-[clamp(1.75rem,3vw,2.65rem)] font-bold leading-[1.12] tracking-[-0.035em] text-[#051A3A]"
            >
              FAQ
            </h2>
            <div className="mt-7 divide-y divide-[#051A3A]/10 border-y border-[#051A3A]/10">
              {faqItems.map((item, index) => {
                const isOpen = openIndex === index;
                const answerId = `saudi-faq-answer-${index}`;
                const buttonId = `saudi-faq-button-${index}`;

                return (
                  <article key={item.question}>
                    <h3>
                      <button
                        id={buttonId}
                        type="button"
                        onClick={() => setOpenIndex(isOpen ? -1 : index)}
                        className="flex min-h-16 w-full items-center justify-between gap-5 py-5 text-left font-[var(--font-saudi-display)] font-bold text-[#051A3A] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F6C343]"
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
                          className={`h-5 w-5 shrink-0 text-[#9A740D] transition-transform ${
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
                        <p className="text-sm leading-7 text-[#667085]">
                          {item.answer}
                        </p>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <div className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-2 gap-2 border-t border-[#051A3A]/10 bg-white/95 p-2 shadow-[0_-10px_30px_rgba(5,26,58,.12)] backdrop-blur sm:hidden">
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noreferrer"
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#2E9B58] text-sm font-bold text-white"
        >
          <FaWhatsapp className="h-5 w-5" /> Connect with RM
        </a>
        <Link
          href={`tel:${PHONE_NUMBER}`}
          className="inline-flex min-h-12 items-center justify-center rounded-xl bg-[#051A3A] text-sm font-bold text-white"
        >
          Dholera Insider
        </Link>
      </div>
    </main>
  );
}
