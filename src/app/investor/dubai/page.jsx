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
  { label: "Why Dholera", href: "#why-dholera" },
  { label: "Documentation", href: "#documentation" },
  { label: "Our Projects", href: "#our-projects" },
  { label: "Buying Process", href: "#buying-process" },
];

const trustSignals = [
  { icon: ShieldCheck, label: "Full Documentation" },
  { icon: BadgeCheck, label: "Approved Project" },
  { icon: Globe2, label: "Remote NRI assistance" },
];

const stats = [
  { value: "500+", label: "NRI families assisted" },
  { value: "25+", label: "Countries served" },
  { value: "7+", label: "Years of advisory" },
  { value: "100%", label: "Transparent process" },
];

const dholeraReasons = [
  {
    icon: Landmark,
    title: "Planned infrastructure",
    description:
      "A future-focused urban region planned around modern roads, utilities, and civic infrastructure.",
  },
  {
    icon: Plane,
    title: "Strategic connectivity",
    description:
      "Connectivity-led growth supported by major transport and industrial infrastructure around the region.",
  },
  {
    icon: Building2,
    title: "Economic ecosystem",
    description:
      "Large-scale industrial development can support long-term residential and commercial demand.",
  },
  {
    icon: TrendingUp,
    title: "Early-stage opportunity",
    description:
      "An opportunity for patient investors who understand development timelines and long-term holding.",
  },
  {
    icon: WalletCards,
    title: "Accessible entry points",
    description:
      "Multiple plot sizes and payment plans make project comparison easier for different budgets.",
  },
  {
    icon: Video,
    title: "Remote-friendly buying",
    description:
      "Virtual consultations, document sharing, and guided site reviews simplify investing from abroad.",
  },
];

const documentChecks = [
  {
    title: "Title and ownership",
    description:
      "Review the title chain, ownership proof, and seller authority.",
  },
  {
    title: "Land-use approvals",
    description:
      "Check the applicable NA, NOC, layout, and planning documents.",
  },
  {
    title: "Project registration",
    description:
      "Verify the project and developer details wherever registration applies.",
  },
  {
    title: "Commercial clarity",
    description:
      "Confirm the final cost sheet, payment plan, and registry process.",
  },
];

const legalDocuments = [
  "Title documents",
  "NA/NOC details",
  "7/12 extract or relevant land record",
  "Ownership proof",
  "Plan layout",
  "Registry process details",
  "Payment schedule",
  "Developer details",
  "Approved plan pass",
  "Final cost sheet",
];

const projects = [
  {
    name: "WestWyn County",
    label: "Premium plotted community",
    location: "Dholera growth region",
    sizes: "Multiple plot sizes",
    status: "Re-Selling",
    accent: "from-[#0b376f] to-[#051A3A]",
  },
  {
    name: "WestWyn Estates",
    label: "Residential plot investment",
    location: "Dholera growth region",
    sizes: "Flexible configurations",
    status: "Available",
    accent: "from-[#6b4a16] to-[#051A3A]",
  },
  {
    name: "WestWyn Residency",
    label: "Future-ready plotted living",
    location: "Dholera growth region",
    sizes: "Curated plot options",
    status: "Available",
    accent: "from-[#176147] to-[#051A3A]",
  },
];

const buyingSteps = [
  {
    number: "01",
    icon: Phone,
    title: "Discovery call",
    description: "Share your budget, timeline, and investment preferences.",
  },
  {
    number: "02",
    icon: SearchCheck,
    title: "Project shortlist",
    description: "Compare suitable projects, plot sizes, and payment options.",
  },
  {
    number: "03",
    icon: Book,
    title: "Document review",
    description:
      "Receive the relevant documents before making a booking decision.",
  },
  {
    number: "04",
    icon: Video,
    title: "Virtual or site visit",
    description: "Review the location remotely or arrange an on-ground visit.",
  },
  {
    number: "05",
    icon: CalendarCheck2,
    title: "Complete Payment",
    description: "Review the location remotely or arrange an on-ground visit.",
  },
  {
    number: "06",
    icon: FileCheck2,
    title: "Booking and registry",
    description:
      "Complete KYC, payments, agreements, and registry with guidance.",
  },
];

// Static class names keep the curved mobile workflow responsive while allowing
// Tailwind to discover every generated position and colour at build time.
const mobileWorkflowLayout = [
  {
    top: "top-0",
    node: "left-0 bg-[#D9D8F2]",
    card: "left-8 right-0 pl-14 pr-4",
  },
  {
    top: "top-[126px]",
    node: "right-0 bg-[#C9EFE8]",
    card: "left-0 right-8 pl-4 pr-14",
  },
  {
    top: "top-[252px]",
    node: "left-0 bg-[#F2D9D0]",
    card: "left-8 right-0 pl-14 pr-4",
  },
  {
    top: "top-[378px]",
    node: "right-0 bg-[#F4DEB3]",
    card: "left-0 right-8 pl-4 pr-14",
  },
  {
    top: "top-[504px]",
    node: "left-0 bg-[#F6CDB6]",
    card: "left-8 right-0 pl-14 pr-4",
  },
  {
    top: "top-[630px]",
    node: "right-0 bg-[#D7E6F4]",
    card: "left-0 right-8 pl-4 pr-14",
  },
];

const faqs = [
  {
    question: "Can I review a project without travelling to India?",
    answer:
      "Yes. We can arrange an online consultation, project presentation, document sharing, and a guided virtual location review before you decide whether to visit.",
  },
  {
    question: "Will I receive documents before booking?",
    answer:
      "Our process is designed to share the relevant project and commercial documents before a booking decision. We also recommend independent legal verification for your circumstances.",
  },
  {
    question: "How do I compare different plot options?",
    answer:
      "We compare location, project status, plot size, pricing, payment schedule, documentation, and your intended holding period in one clear shortlist.",
  },
  {
    question: "Can my family visit the site on my behalf?",
    answer:
      "Yes. A family member can attend a guided site visit while you join remotely, subject to the project team's scheduling and site-access process.",
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
      {/* HERO */}
      <section className="relative isolate overflow-hidden bg-[#051A3A]">
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

        <div className="mx-auto max-w-7xl px-5 pb-16 pt-6 sm:px-8 lg:px-10 lg:pb-24">
          <div className="grid items-center gap-12 pt-14 lg:grid-cols-[1.02fr_.98fr] lg:gap-16 lg:pt-20">
            <div>
              <SectionLabel inverse>Dubai to Dholera</SectionLabel>
              <h1 className="max-w-3xl font-[var(--font-display)] text-[clamp(2.25rem,4.5vw,4.25rem)] font-bold leading-[1.02] tracking-[-0.05em] text-white">
                Verified plots in Dholera, made clear for NRIs.
              </h1>
              <p className="mt-6 max-w-2xl text-[clamp(1rem,1.8vw,1.25rem)] leading-8 text-white/70">
                Compare projects, review essential documents, and complete your
                buying journey from Dubai with one dedicated advisory team.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-5">
                <Link
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noreferrer"
                  className={`group inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#F6C343] px-6 py-3.5 text-sm font-bold text-[#051A3A] shadow-[0_12px_30px_rgba(246,195,67,0.22)] transition hover:-translate-y-0.5 hover:bg-[#FFD365] focus:outline-none focus:ring-2 focus:ring-[#F6C343] focus:ring-offset-2 focus:ring-offset-[#051A3A] `}
                >
                  <FaWhatsapp className="h-6 w-6 text-[#051A3A]" />
                  Connect with Our RM
                </Link>
                <a
                  href="#our-projects"
                  className="group inline-flex min-h-12 items-center gap-2 text-sm font-bold text-white transition hover:text-[#F6C343]"
                >
                  Explore our projects
                  <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
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

              {/* <div className="absolute -bottom-7 left-4 right-4 rounded-2xl border border-white/10 bg-white p-4 shadow-2xl sm:left-8 sm:right-auto sm:w-[350px] sm:p-5">
                <div className="flex items-start gap-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[#F6C343]/20">
                    <ShieldCheck className="h-6 w-6 text-[#8A6508]" />
                  </span>
                  <div>
                    <p className="font-[var(--font-display)] font-bold text-[#051A3A]">
                      Documents before decisions
                    </p>
                    <p className="mt-1 text-sm leading-6 text-[#667085]">
                      Review title, approvals, layout, pricing, and process
                      before you book.
                    </p>
                  </div>
                </div>
              </div> */}
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

      {/* STATS */}
      <section className="border-b border-[#051A3A]/10 bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-2 px-5 sm:px-8 lg:grid-cols-4 lg:px-10">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={`py-7 ${index % 2 === 0 ? "pr-4" : "border-l border-[#051A3A]/10 pl-4"} lg:border-l lg:px-8 ${index === 0 ? "lg:border-l-0 lg:pl-0" : ""}`}
            >
              <p className="font-[var(--font-display)] text-2xl font-bold tracking-[-0.04em] text-[#051A3A] sm:text-3xl">
                {stat.value}
              </p>
              <p className="mt-1 text-xs font-medium text-[#667085] sm:text-sm">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 01   WHY DHOLERA */}
      <section
        id="why-dholera"
        className="scroll-mt-20 px-5 py-20 sm:px-8 lg:px-10 lg:py-28"
      >
        <div className="mx-auto max-w-7xl">
          <div className="grid items-end gap-8 lg:grid-cols-[1fr_.8fr]">
            <SectionHeading
              eyebrow="01 · Why Dholera"
              title="A long-term opportunity built around infrastructure."
              copy="Dholera is best considered with a patient, evidence-led view: understand the region, verify the specific project, and choose a plot aligned with your time horizon."
            />
            <div className="lg:justify-self-end">
              <div className="flex items-start gap-3 rounded-2xl border border-[#051A3A]/10 bg-white p-5 shadow-[0_16px_40px_rgba(5,26,58,.06)]">
                <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-[#B78B13]" />
                <p className="max-w-md text-sm leading-6 text-[#48546A]">
                  We focus on project-specific verification and transparent
                  comparisons not blanket return promises.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {dholeraReasons.map(({ icon: Icon, title, description }) => (
              <article
                key={title}
                className="group rounded-2xl border border-[#051A3A]/10 bg-white p-6 shadow-[0_14px_35px_rgba(5,26,58,.045)] transition duration-300 hover:-translate-y-1 hover:border-[#F6C343]/60 hover:shadow-[0_20px_50px_rgba(5,26,58,.09)]"
              >
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-[#051A3A] text-[#F6C343] transition group-hover:bg-[#F6C343] group-hover:text-[#051A3A]">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-5 font-[var(--font-display)] text-lg font-bold tracking-[-0.02em] text-[#051A3A]">
                  {title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-[#667085]">
                  {description}
                </p>
              </article>
            ))}
          </div>

          {/*  <div className="mt-12 grid overflow-hidden rounded-[28px] bg-[#051A3A] lg:grid-cols-[.9fr_1.1fr]">
            <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-12">
              <SectionLabel inverse>Investor perspective</SectionLabel>
              <h3 className="font-[var(--font-display)] text-2xl font-bold tracking-[-0.04em] text-white sm:text-3xl">
                Growth potential deserves context.
              </h3>
              <p className="mt-5 max-w-xl text-base leading-7 text-white/70">
                Evaluate location, approvals, development stage, price, and
                holding period together. The right decision is the one you can
                verify and comfortably hold.
              </p>
              <a
                href="#documentation"
                className="mt-7 inline-flex items-center gap-2 self-start text-sm font-bold text-[#F6C343]"
              >
                See what to verify <ArrowRight className="h-4 w-4" />
              </a>
            </div>
            <div className="relative min-h-[320px] lg:min-h-[430px]">
              <Image
                src={roiImage}
                alt="Dholera plot investment context"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 55vw"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#051A3A]/30 to-transparent lg:from-[#051A3A]/50" />
            </div>
          </div> */}
        </div>
      </section>

      {/* 02   DOCUMENTATION */}
      <section
        id="documentation"
        className="scroll-mt-20 bg-[#051A3A] px-5 py-20 sm:px-8 lg:px-10 lg:py-28"
      >
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-[.95fr_1.05fr] lg:gap-16">
            <div>
              <SectionHeading
                eyebrow="02 · Documentation"
                title="Proof first. Payment second."
                copy="Distance should not reduce clarity. Ask for the relevant documents, understand what each one means, stances."
                inverse
              />

              <div className="mt-9 space-y-4">
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
                    Essential project documents
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
                Request Legal Documents
              </PrimaryButton>

              <p className="mt-4 text-center text-xs leading-5 text-[#667085]">
                Documents vary by project. Independent legal and financial
                advice is recommended before purchase.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 03   OUR PROJECTS */}
      <section
        id="our-projects"
        className="scroll-mt-20 px-5 py-20 sm:px-8 lg:px-10 lg:py-28"
      >
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-7 lg:flex-row lg:items-end">
            <SectionHeading
              eyebrow="03 · Our projects"
              title="Compare verified plot opportunities clearly."
              copy="Start with a focused shortlist. We help you compare the essentials without burying the decision in sales material."
            />
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {projects.map((project, index) => (
              <article
                key={project.name}
                className="group overflow-hidden rounded-[24px] border border-[#051A3A]/10 bg-white shadow-[0_16px_45px_rgba(5,26,58,.06)] transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_24px_60px_rgba(5,26,58,.12)]"
              >
                <div
                  className={`relative h-52 overflow-hidden bg-gradient-to-br ${project.accent} p-6`}
                >
                  <div
                    className="absolute inset-0 opacity-10"
                    style={{
                      backgroundImage:
                        "linear-gradient(rgba(255,255,255,.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.8) 1px, transparent 1px)",
                      backgroundSize: "28px 28px",
                    }}
                  />
                  <div className="relative flex h-full flex-col justify-between">
                    <span className="self-start rounded-full border border-white/10 bg-white/10 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-white/80 backdrop-blur">
                      Project {String(index + 1).padStart(2, "0")}
                    </span>
                    <div className="flex items-end justify-between">
                      <div>
                        <p className="text-sm font-semibold text-white/60">
                          {project.label}
                        </p>
                        <h3 className="mt-1 font-[var(--font-display)] text-xl font-bold tracking-[-0.03em] text-white">
                          {project.name}
                        </h3>
                      </div>
                      <Building2
                        className="h-11 w-11 text-[#F6C343]"
                        strokeWidth={1.35}
                      />
                    </div>
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
                          ["sold out", "Re-Selling"].includes(
                            project.status,
                          )
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
                    <FaWhatsapp className="h-6 w-6 text-[#051A3A]" />
                    Connect with Our RM
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
        className="scroll-mt-20 border-y border-[#051A3A]/10 bg-white px-5 py-20 sm:px-8 lg:px-10 lg:py-28"
      >
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="04 · Buying process"
            title="A clear path from first call to registry."
            copy="Every stage has a purpose, an output, and a decision point so you always know what happens next."
            centered
          />

          {/* Curved workflow chart inspired by the supplied reference — mobile only. */}
          <div className="relative mx-auto mt-12 h-[748px] w-full max-w-md lg:hidden">
            <svg
              viewBox="0 0 360 730"
              preserveAspectRatio="none"
              className="pointer-events-none absolute inset-x-0 top-0 h-[730px] w-full"
              aria-hidden="true"
            >
              <path
                d="M32 48 C176 42 330 105 328 174 C326 245 35 230 32 300 C29 372 326 356 328 426 C330 498 35 482 32 552 C29 623 196 600 328 678"
                fill="none"
                stroke="#F6C343"
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray="9 11"
                opacity="0.5"
              />
              <circle cx="32" cy="48" r="4" fill="#F6C343" />
              <circle cx="328" cy="678" r="4" fill="#F6C343" />
            </svg>

            {buyingSteps.map(
              ({ number, icon: Icon, title, description }, index) => {
                const layout = mobileWorkflowLayout[index];

                return (
                  <article
                    key={number}
                    className={`absolute inset-x-0 h-[112px] ${layout.top}`}
                  >
                    <div
                      className={`absolute top-0 z-10 min-h-[112px] rounded-2xl border border-[#051A3A]/10 bg-[#F8F7F3] py-4 text-left shadow-[0_10px_24px_rgba(5,26,58,.07)] ${layout.card}`}
                    >
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

                    <span
                      className={`absolute top-4 z-20 grid h-16 w-16 place-items-center rounded-full border-4 border-white text-[#051A3A] shadow-[0_10px_24px_rgba(5,26,58,.18)] ${layout.node}`}
                    >
                      <Icon className="h-7 w-7" strokeWidth={1.8} />
                    </span>
                  </article>
                );
              },
            )}
          </div>

          {/* Existing horizontal workflow remains unchanged on desktop. */}
          <div className="relative mt-14 hidden lg:block">
            <div className="absolute left-6 top-7 h-px w-[calc(100%-3rem)] bg-[#051A3A]/10" />
            <div className="grid grid-cols-6 gap-5">
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
                  One advisor throughout your journey
                </p>
                <p className="mt-1 text-sm text-white/60">
                  No handoff maze. No guessing who to contact next.
                </p>
              </div>
            </div>
            <Link
              href={`tel:${PHONE_NUMBER}`}
              className="inline-flex min-h-12 shrink-0 items-center gap-2 rounded-xl bg-[#F6C343] px-5 text-sm font-bold text-[#051A3A] transition hover:bg-[#FFD365]"
            >
              <Phone className="h-4 w-4" /> Book a consultation
            </Link>
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF + FAQ */}
      <section className="px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[.78fr_1.22fr] lg:gap-16">
          <div>
            <SectionLabel>Investor confidence</SectionLabel>
            <h2 className="font-[var(--font-display)] text-2xl font-bold tracking-[-0.04em] text-[#051A3A] sm:text-3xl">
              Clarity earns trust.
            </h2>
            <div className="mt-7 rounded-[24px] border border-[#051A3A]/10 bg-white p-6 shadow-[0_16px_45px_rgba(5,26,58,.06)]">
              <div
                className="flex gap-1 text-[#F6C343]"
                aria-label="5 out of 5 stars"
              >
                {[0, 1, 2, 3, 4].map((star) => (
                  <Star key={star} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <blockquote className="mt-5 font-[var(--font-display)] text-xl font-semibold leading-8 text-[#051A3A]">
                “The process was clear, the documents were shared early, and my
                family could visit while I joined from Dubai.”
              </blockquote>
              <div className="mt-5 flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-[#051A3A] text-sm font-bold text-[#F6C343]">
                  AS
                </span>
                <div>
                  <p className="text-sm font-bold text-[#344054]">A. Sharma</p>
                  <p className="text-xs text-[#667085]">Dubai, UAE</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <SectionLabel>Frequently asked questions</SectionLabel>
            <h2 className="font-[var(--font-display)] text-2xl font-bold tracking-[-0.04em] text-[#051A3A] sm:text-3xl">
              Questions before you begin.
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
      <section className="px-5 pb-24 sm:px-8 lg:px-10 lg:pb-32">
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
              <Check className="h-4 w-4" /> Start with the facts
            </span>
            <h2 className="mt-4 font-[var(--font-display)] text-[clamp(1.75rem,3vw,2.75rem)] font-bold leading-[1.12] tracking-[-0.045em] text-white">
              Review the documents before you choose a plot.
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-white/60">
              Get the project shortlist, document checklist, and a clear
              next-step plan for investing from Dubai.
            </p>
            <PrimaryButton
              onClick={() => setDocumentsOpen(true)}
              className="mt-8"
            >
              Request legal documents
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
          title="Get the Dholera Document Pack"
          subtitle="Share your details to receive the project document checklist and available sample documents."
          buttonName="Request Documents"
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
