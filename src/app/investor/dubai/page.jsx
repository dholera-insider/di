"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Inter, Space_Grotesk } from "next/font/google";
import {
  ArrowDown,
  ArrowRight,
  BadgeCheck,
  Book,
  Building2,
  CalendarCheck2,
  Check,
  ChevronDown,
  CircleCheckBig,
  FileCheck2,
  FileText,
  Globe2,
  Headphones,
  Landmark,
  MapPin,
  MessageCircle,
  Phone,
  Plane,
  SearchCheck,
  ShieldCheck,
  Sparkles,
  Star,
  TrendingUp,
  UserCheck,
  Users,
  Video,
  WalletCards,
} from "lucide-react";

import heroImage from "@/app/assets/dholera-dubai.webp";
import roiImage from "@/app/assets/dholera-plots-roi.webp";
import BrochureDownload from "@/app/components/BrochureDownload";
import { FaWhatsapp, FaWhatsappSquare } from "react-icons/fa";
import county from "@/app/assets/dholera-residential/county-desktop.webp";
import residency from "@/app/assets/dholera-residential/residency-desktop.webp";
import estates from "@/app/assets/dholera-residential/estates-desktop.webp";

const display = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
});

const body = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
});

const PHONE_NUMBER = "+919211820887";
const WHATSAPP_URL = "https://wa.me/919211820887";

const sectionLinks = [
  { label: "Why Invest in Dholera?", href: "#why-dholera" },
  { label: "Build a Long Term Asset in India", href: "#documentation" },
  { label: "Explore Residential Projects", href: "#our-projects" },
  {
    label: "Your Dholera Investment Journey from Dubai",
    href: "#buying-process",
  },
];

const trustSignals = [
  { icon: ShieldCheck, label: "Verified Residential Plot Projects" },
  { icon: BadgeCheck, label: "Transparent Pricing & Documentation" },
  { icon: Globe2, label: "Dedicated Support for Dubai NRIs" },
];

const stats = [
  { value: "✔", label: "Strategic Project Locations" },
  { value: "✔", label: "100% Remote Buying Process" },
  { value: "✔", label: "Exclusive Channel Partner of BookMyAssets" },
  { value: "✔", label: "Verified Residential Plot Projects" },
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

const documentChecks = [
  {
    title: "Build a future villa or family home",
    description: "",
  },
  {
    title: "Hold land for long-term appreciation",
    description: "",
  },
  {
    title: "Diversify your investment portfolio",
    description: "",
  },
  {
    title: "Plan for retirement in India",
    description: "",
  },
  {
    title: "Create a lasting family asset",
    description: "",
  },
];

const legalDocuments = [
  "Clear Title",
  "NA/NOC",
  "Approved Plan Pass",
  "Sale Deed",
  "Immediate Possesion",
  "Plots Registry",
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
  "Verified Residential Plot Projects",
  "Transparent Pricing & Documentation",
  "Strategic Project Locations",
  "Dedicated Support for Dubai NRIs",
  "100% Remote Buying Process",
  "Exclusive Channel Partner of BookMyAssets",
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
    <div className={centered ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <SectionLabel inverse={inverse}>{eyebrow}</SectionLabel>
      <h2
        className={`font-[var(--font-display)] text-[clamp(1.75rem,3vw,2.65rem)] font-bold leading-[1.12] tracking-[-0.035em] ${
          inverse ? "text-white" : "text-[#051A3A]"
        }`}
      >
        {title}
      </h2>
      {copy && (
        <p
          className={`mt-5 text-base leading-7 sm:text-lg ${
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
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <main
      className={`${display.variable} ${body.variable} min-h-screen overflow-x-clip bg-[#F8F7F3] text-[#051A3A]`}
      style={{ fontFamily: "var(--font-body)" }}
    >
      <title>Dholera Investment from Dubai | Verified Plots for UAE NRIs</title>
      <meta
        name="description"
        content="Explore verified residential plots in Dholera Smart City from Dubai. Get transparent pricing, legal guidance, and dedicated support for UAE NRI investors."
      />
      {/* HERO */}
      <section className="relative isolate overflow-hidden bg-[#051A3A] py-8 md:py-12">
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

        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="grid items-center gap-12 lg:grid-cols-[1.02fr_.98fr] lg:gap-16">
            <div>
              <SectionLabel inverse>Dholera Investment from Dubai</SectionLabel>
              <h1 className="max-w-3xl font-[var(--font-display)] text-[clamp(2rem,4.5vw,4rem)] font-bold leading-[1.02] tracking-[-0.05em] text-white">
                Dholera Investment from Dubai
              </h1>
              <p className="mt-6 max-w-2xl text-[clamp(1rem,1.8vw,1.25rem)] leading-8 text-white/70">
                Looking for a smart way to diversify your investments in India?
                Dholera Insider helps Dubai NRIs explore verified residential
                plots in Dholera Smart City with transparent information, legal
                clarity, and a smooth remote buying process.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-5">
                <Link
                  href="#our-projects"
                  className={`group inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#F6C343] px-6 py-3.5 text-sm font-bold text-[#051A3A] shadow-[0_12px_30px_rgba(246,195,67,0.22)] transition hover:-translate-y-0.5 hover:bg-[#FFD365] focus:outline-none focus:ring-2 focus:ring-[#F6C343] focus:ring-offset-2 focus:ring-offset-[#051A3A] `}
                >
                  Explore Residential Projects
                  <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
                </Link>
              </div>

              <div className="mt-10 grid gap-3 sm:grid-cols-3">
                {trustSignals.map(({ icon: Icon, label }) => (
                  <div
                    key={label}
                    className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.045] px-3.5 py-3 text-sm font-medium text-white/80 backdrop-blur"
                  >
                    <Icon className="h-6 w-6 shrink-0 text-[#F6C343]" />
                    {label}
                  </div>
                ))}
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-2xl lg:mx-0">
              <div className="relative aspect-[4/3] overflow-hidden rounded-[28px] border border-white/10 bg-white/5 shadow-[0_30px_90px_rgba(0,0,0,.35)]">
                <Image
                  src={heroImage}
                  alt="Dholera investment opportunity for Dubai NRIs"
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 48vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#051A3A]/60 via-transparent to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STICKY SECTION NAV */}
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

      {/* 01   WHY DHOLERA */}
      <section
        id="why-dholera"
        className="relative isolate scroll-mt-20 overflow-hidden bg-white px-5 py-8 sm:px-8 md:py-12 lg:px-10"
      >
        <div
          className="absolute inset-0 -z-10 opacity-70"
          style={{
            backgroundImage:
              "radial-gradient(circle at 8% 18%, rgba(246,195,67,.14), transparent 25%), radial-gradient(circle at 92% 82%, rgba(65,125,200,.12), transparent 30%)",
          }}
        />

        <div className="mx-auto max-w-7xl">
          <div className="relative overflow-hidden rounded-[30px] bg-[#051A3A] px-6 py-8 shadow-[0_28px_80px_rgba(5,26,58,.18)] sm:px-9 sm:py-10 lg:px-12 lg:py-12">
            <div
              className="absolute inset-0 opacity-[0.055]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.8) 1px, transparent 1px)",
                backgroundSize: "34px 34px",
              }}
            />

            <div className="relative grid items-center gap-10 lg:grid-cols-[1.08fr_.92fr] lg:gap-14">
              <div>
                <SectionLabel inverse>Dholera Investment from Dubai</SectionLabel>
                <h2 className="max-w-3xl font-[var(--font-display)] text-[clamp(1.9rem,4vw,3.35rem)] font-bold leading-[1.08] tracking-[-0.045em] text-white">
                  Why Dubai Investors Are Looking at Dholera
                </h2>
                <p className="mt-6 max-w-3xl text-base leading-7 text-white/70 sm:text-lg sm:leading-8">
                  Dubai offers many investment opportunities, but many NRIs
                  also want to build long-term assets in India. As India's First
                  Greenfield Smart City, Dholera is attracting investors
                  looking to enter a government-planned growth corridor at an
                  early stage.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 lg:gap-4">
                {stats.map((stat) => (
                  <article
                    key={stat.label}
                    className="flex min-h-20 items-center justify-start gap-3 rounded-2xl border border-white/10 bg-white/[0.065] p-4 backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-[#F6C343]/45 hover:bg-white/[0.09] sm:p-5"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#F6C343] font-[var(--font-display)] text-lg font-bold text-[#051A3A] shadow-[0_8px_20px_rgba(246,195,67,.18)]">
                      {stat.value}
                    </span>
                    <h3 className="font-[var(--font-display)] text-sm font-bold leading-5 text-white">
                      {stat.label}
                    </h3>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 02   DOCUMENTATION */}
      <section
        id="documentation"
        className="scroll-mt-20 bg-[#051A3A] px-5 py-8 sm:px-8 md:py-12 lg:px-10"
      >
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-[.95fr_1.05fr] lg:gap-16">
            <div>
              <SectionHeading
                eyebrow="Dholera Investment from Dubai"
                title="Build a Long Term Asset in India"
                copy="For many NRIs living in Dubai, owning land in India is more than an investment, it's a long term asset."
                inverse
              />

              <p className="mt-7 text-base leading-7 text-white/70 sm:text-lg">
                A residential plot in Dholera gives you the flexibility to:
              </p>

              <div className="mt-5 space-y-4">
                {documentChecks.map((item, index) => (
                  <div
                    key={item.title}
                    className="flex gap-4 rounded-2xl border border-white/10 bg-white/[0.045] p-5"
                  >
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#F6C343] text-sm font-bold text-[#051A3A]">
                      {index + 1}
                    </span>
                    <div>
                      <h3 className="font-[var(--font-display)] font-bold text-white">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-sm leading-6 text-white/60">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="self-start rounded-[28px] border border-[#F6C343]/25 bg-white p-6 shadow-[0_30px_90px_rgba(0,0,0,.25)] sm:p-8">
              <div className="flex items-start justify-between gap-5 border-b border-[#051A3A]/10 pb-6">
                <div>
                  <h3 className="mt-2 font-[var(--font-display)] text-3xl font-bold tracking-[-0.03em] text-[#051A3A]">
                    What documents should NRI buyers verify?
                  </h3>
                </div>
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-[#F6C343]/20">
                  <ShieldCheck className="h-7 w-7 text-[#8A6508]" />
                </span>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {legalDocuments.map((document) => (
                  <div
                    key={document}
                    className="flex items-center gap-3 rounded-xl border border-[#051A3A]/10 bg-[#F8F7F3] px-4 py-3.5 text-sm font-semibold text-[#344054]"
                  >
                    <CircleCheckBig className="h-4 w-4 shrink-0 text-[#2E8B57]" />
                    {document}
                  </div>
                ))}
              </div>

              <PrimaryButton
                onClick={() => setDocumentsOpen(true)}
                className="mt-7 w-full"
              >
                Schedule a Call
              </PrimaryButton>

              <p className="mt-4 text-center text-xs leading-5 text-[#667085]">
                Before investing, review the title documents, NA/NOC, approved
                layout plan, sale deed, ownership details, and registry process
                to ensure complete transparency.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 03   OUR PROJECTS */}
      <section
        id="our-projects"
        className="scroll-mt-20 px-5 py-8 sm:px-8 md:py-12 lg:px-10"
      >
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-7 lg:flex-row lg:items-end">
            <SectionHeading
              eyebrow="Dholera Investment from Dubai"
              title="Explore Residential Projects"
            />
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {projects.map((project, index) => (
              <article
                key={project.name}
                className="group overflow-hidden rounded-[24px] border border-[#051A3A]/10 bg-white shadow-[0_16px_45px_rgba(5,26,58,.06)] transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_24px_60px_rgba(5,26,58,.12)]"
              >
                <div className="relative h-60 overflow-hidden bg-[#E8EDF3] sm:h-[272px]">
                  <Image
                    src={project.image}
                    alt={`${project.name} residential plotted project in Dholera`}
                    width={450}
                    height={550}
                    className="h-full w-full object-contain transition duration-500 group-hover:scale-[1.02]"
                    sizes="(max-width: 1024px) 100vw, 33vw"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#051A3A]/90 via-[#051A3A]/45 to-transparent p-6 pt-20">
                    <h3 className="mt-1 font-[var(--font-display)] text-xl font-bold tracking-[-0.03em] text-white">
                      {project.name}
                    </h3>
                  </div>
                </div>

                <div className="p-6">
                  <dl className="space-y-3 text-sm">
                    <div className="flex items-center justify-between gap-4">
                      <dt className="flex items-center gap-2 text-[#667085]">
                        <MapPin className="h-4 w-4" /> Location
                      </dt>
                      <dd className="text-right font-semibold text-[#344054]">
                        {project.location}
                      </dd>
                    </div>
                    <div className="flex items-center justify-between gap-4">
                      <dt className="flex items-center gap-2 text-[#667085]">
                        <Building2 className="h-4 w-4" /> Plot options
                      </dt>
                      <dd className="text-right font-semibold text-[#344054]">
                        {project.sizes}
                      </dd>
                    </div>
                    <div className="flex items-center justify-between gap-4">
                      <dt className="flex items-center gap-2 text-[#667085]">
                        <FileText className="h-4 w-4" /> Status
                      </dt>
                      <dd
                        className={`text-right font-semibold ${
                          ["sold out", "Reselling"].includes(project.status)
                            ? "text-red-600"
                            : "text-[#2E7D54]"
                        }`}
                      >
                        {project.status}
                      </dd>
                    </div>
                  </dl>

                  <Link
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="group mt-6 inline-flex w-full items-center justify-between rounded-xl border border-[#051A3A]/10 px-4 py-3.5 text-sm font-bold text-[#051A3A] transition hover:border-[#F6C343] hover:bg-[#F6C343]/10"
                  >
                    <FaWhatsapp className="h-6 w-6 text-green-400" />
                    Get A Call Back
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 04   BUYING PROCESS */}
      <section
        id="buying-process"
        className="scroll-mt-20 border-y border-[#051A3A]/10 bg-white px-5 py-8 sm:px-8 md:py-12 lg:px-10"
      >
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Dholera Investment from Dubai"
            title="Your Dholera Investment Journey from Dubai"
            centered
          />

          {/* Mobile workflow keeps natural card heights and consistent gaps. */}
          <div className="relative mx-auto mt-10 grid w-full max-w-md gap-5 lg:hidden">
            <span
              className="pointer-events-none absolute bottom-7 left-6 top-7 border-l-2 border-dashed border-[#F6C343]/50"
              aria-hidden="true"
            />

            {buyingSteps.map(
              ({ number, icon: Icon, title, description }, index) => (
                <article
                  key={number}
                  className="relative z-10 grid grid-cols-[3rem_1fr] items-start gap-4"
                >
                  <span
                    className={`grid h-12 w-12 place-items-center rounded-full border-4 border-white text-[#051A3A] shadow-[0_10px_24px_rgba(5,26,58,.18)] ${mobileWorkflowColors[index]}`}
                  >
                    <Icon className="h-5 w-5" strokeWidth={1.8} />
                  </span>

                  <div className="rounded-2xl border border-[#051A3A]/10 bg-[#F8F7F3] p-4 text-left shadow-[0_10px_24px_rgba(5,26,58,.07)]">
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                      <span className="inline-flex rounded-full bg-[#051A3A] px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.14em] text-[#F6C343]">
                        Step {number}
                      </span>
                      <h3 className="font-[var(--font-display)] text-sm font-bold leading-tight text-[#051A3A]">
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

          {/* Existing horizontal workflow remains unchanged on desktop. */}
          <div className="relative mt-14 hidden lg:block">
            <div className="absolute left-6 top-7 h-px w-[calc(100%-3rem)] bg-[#051A3A]/10" />
            <div className="grid grid-cols-5 gap-5">
              {buyingSteps.map(({ number, icon: Icon, title, description }) => (
                <article
                  key={number}
                  className="relative rounded-2xl border border-[#051A3A]/10 bg-[#F8F7F3] p-5 lg:border-0 lg:bg-transparent lg:p-0 lg:text-center"
                >
                  <div className="flex items-center gap-4 lg:flex-col lg:gap-5">
                    <span className="relative z-10 grid h-14 w-14 shrink-0 place-items-center rounded-full border-4 border-white bg-[#051A3A] text-[#F6C343] shadow-[0_8px_20px_rgba(5,26,58,.18)]">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#9A740D]">
                        Step {number}
                      </span>
                      <h3 className="mt-1 font-[var(--font-display)] text-base font-bold text-[#051A3A]">
                        {title}
                      </h3>
                    </div>
                  </div>
                  <p className="mt-4 text-sm leading-6 text-[#667085] lg:px-2">
                    {description}
                  </p>
                </article>
              ))}
            </div>
          </div>

          <div className="mt-12 flex flex-col items-center justify-between gap-5 rounded-[24px] bg-[#051A3A] px-6 py-7 text-center sm:flex-row sm:px-8 sm:text-left">
            <div className="flex items-center gap-4">
              <span className="hidden h-11 w-11 shrink-0 place-items-center rounded-xl bg-white/10 text-[#F6C343] sm:grid">
                <UserCheck className="h-5 w-5" />
              </span>
              <div>
                <p className="font-[var(--font-display)] text-lg font-bold text-white">
                  Schedule a Call
                </p>
              </div>
            </div>
            <Link
              href={`tel:${PHONE_NUMBER}`}
              className="inline-flex min-h-12 shrink-0 items-center gap-2 rounded-xl bg-[#F6C343] px-5 text-sm font-bold text-[#051A3A] transition hover:bg-[#FFD365]"
            >
              <Phone className="h-4 w-4" /> Connect With Our RM
            </Link>
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF + FAQ */}
      <section className="px-5 py-8 sm:px-8 md:py-12 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[.78fr_1.22fr] lg:gap-16">
          <div>
            <SectionLabel>Dholera Investment from Dubai</SectionLabel>
            <h2 className="font-[var(--font-display)] text-2xl font-bold tracking-[-0.04em] text-[#051A3A] sm:text-3xl">
              Why Choose Dholera Insider?
            </h2>
            <div className="mt-7 rounded-[24px] border border-[#051A3A]/10 bg-white p-6 shadow-[0_16px_45px_rgba(5,26,58,.06)]">
              <div className="space-y-3">
                {dholeraInsiderReasons.map((reason) => (
                  <div
                    key={reason}
                    className="flex items-center gap-3 rounded-xl border border-[#051A3A]/10 bg-[#F8F7F3] px-4 py-3.5 text-sm font-semibold text-[#344054]"
                  >
                    <CircleCheckBig className="h-4 w-4 shrink-0 text-[#2E8B57]" />
                    {reason}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <SectionLabel>Dholera Investment from Dubai</SectionLabel>
            <h2 className="font-[var(--font-display)] text-2xl font-bold tracking-[-0.04em] text-[#051A3A] sm:text-3xl">
              FAQs
            </h2>
            <div className="mt-7 divide-y divide-[#051A3A]/10 border-y border-[#051A3A]/10">
              {faqs.map((faq, index) => {
                const isOpen = openFaq === index;
                return (
                  <div key={faq.question}>
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? -1 : index)}
                      className="flex w-full items-center justify-between gap-5 py-5 text-left"
                      aria-expanded={isOpen}
                      aria-controls={`faq-answer-${index}`}
                    >
                      <span className="font-[var(--font-display)] font-bold text-[#051A3A]">
                        {faq.question}
                      </span>
                      <ChevronDown
                        className={`h-5 w-5 shrink-0 text-[#9A740D] transition-transform ${isOpen ? "rotate-180" : ""}`}
                      />
                    </button>
                    <div
                      id={`faq-answer-${index}`}
                      className={`grid transition-[grid-template-rows,opacity] duration-300 ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
                    >
                      <div className="overflow-hidden">
                        <p className="max-w-2xl pb-5 text-sm leading-7 text-[#667085]">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="px-5 py-8 sm:px-8 md:py-12 lg:px-10">
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
              <Check className="h-4 w-4" /> Dholera Investment from Dubai
            </span>
            <h2 className="mt-4 font-[var(--font-display)] text-[clamp(1.75rem,3vw,2.75rem)] font-bold leading-[1.12] tracking-[-0.045em] text-white">
              Invest with Confidence from Dubai
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-white/60">
              You don't have to travel frequently to explore residential plot
              opportunities in Dholera. With virtual project presentations,
              transparent documentation, and expert guidance, Dholera Insider
              makes investing from Dubai simple and convenient.
            </p>
            <PrimaryButton
              onClick={() => setDocumentsOpen(true)}
              className="mt-8"
            >
              Speak with a Dholera Investment Expert
            </PrimaryButton>
          </div>
        </div>
      </section>

      {/* MOBILE ACTION BAR */}
      <div className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-2 gap-2 border-t border-[#051A3A]/10 bg-white/95 p-2 shadow-[0_-10px_30px_rgba(5,26,58,.12)] backdrop-blur sm:hidden">
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
          <Phone className="h-6 w-6 text-[#F6C343]" /> Call
        </Link>
      </div>

      {documentsOpen && (
        <BrochureDownload
          title="Speak with a Dholera Investment Expert"
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
