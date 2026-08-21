"use client";

import { useState } from "react";
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
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

import heroImage from "@/app/assets/investor/dholera-insider-qatar-banner.webp";
import BrochureDownload from "@/app/components/BrochureDownload";
import { qatarFaqs } from "./data";

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

const sectionLinks = [
  { label: "Why Dholera", href: "#why-dholera" },
  { label: "Why Dholera Insider", href: "#why-us" },
  { label: "FAQs", href: "#faqs" },
];

const trustSignals = [
  { icon: SearchCheck, label: "Clear project information" },
  { icon: FileCheck2, label: "Legal document support" },
  { icon: Globe2, label: "Remote NRI assistance" },
];

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
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <main
      className={`${display.variable} ${body.variable} min-h-screen overflow-x-clip bg-[#F8F7F3] text-[#051A3A]`}
      style={{ fontFamily: "var(--font-qatar-body)" }}
    >
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

        <div className="mx-auto max-w-7xl px-5 pt-20 sm:px-8 lg:px-10">
          <div className="grid items-center gap-12 lg:grid-cols-[1.02fr_.98fr] lg:gap-16">
            <div>
              <SectionLabel inverse>Dholera Investment from Qatar</SectionLabel>
              <h1 className="max-w-3xl font-[var(--font-qatar-display)] text-[clamp(2rem,4.5vw,4rem)] font-bold leading-[1.02] tracking-[-0.05em] text-white">
                Dholera Investment from Qatar
              </h1>
              <p className="mt-5 text-xl font-semibold text-[#F6C343] sm:text-2xl">
                Build Something for Your Future in India
              </p>
              <p className="mt-5 max-w-2xl text-base leading-8 text-white/70 sm:text-lg">
                Living and working in Qatar can keep you away from India for
                years. But your plans for property, family and the future do not
                have to wait.
              </p>
              <p className="mt-3 max-w-2xl text-base leading-8 text-white/70 sm:text-lg">
                Dholera Insider helps Qatar-based NRIs explore residential plots
                in Dholera Smart City with clear information and dedicated
                investment support.
              </p>
              <PrimaryButton onClick={() => setFormOpen(true)} className="mt-7">
                Explore Dholera Plots
              </PrimaryButton>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
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
                  alt="Dholera residential plot investment guidance for Qatar NRIs"
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

      <nav
        className="sticky top-0 z-40 border-b border-[#051A3A]/10 bg-[#F8F7F3]/95 shadow-[0_8px_30px_rgba(5,26,58,.06)] backdrop-blur"
        aria-label="Qatar investor page sections"
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
      </section>

      <section
        id="why-us"
        className="scroll-mt-20 border-y border-[#051A3A]/10 bg-[#F8F7F3] px-5 py-12 sm:px-8 lg:px-10 lg:py-20"
      >
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[.9fr_1.1fr] lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="Dedicated Qatar NRI Support"
              title="Why Dholera Insider?"
              copy="Your investment decision should be based on information, not promises."
            />
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
      </section>

      <section
        id="faqs"
        className="scroll-mt-20 bg-white px-5 py-12 sm:px-8 lg:px-10 lg:py-20"
      >
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[.65fr_1.35fr] lg:gap-16">
          <div>
            <SectionLabel>Dholera Plots for NRI in Qatar</SectionLabel>
            <h2 className="font-[var(--font-qatar-display)] text-[clamp(1.75rem,3vw,2.65rem)] font-bold tracking-[-0.04em] text-[#051A3A]">
              Frequently Asked Questions
            </h2>
            <p className="mt-5 text-base leading-7 text-[#667085]">
              Practical answers for Qatar NRIs considering residential plots in
              Dholera Smart City.
            </p>
          </div>

          <div className="divide-y divide-[#051A3A]/10 border-y border-[#051A3A]/10">
            {qatarFaqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div key={faq.question}>
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? -1 : index)}
                    className="flex min-h-16 w-full items-center justify-between gap-5 py-5 text-left"
                    aria-expanded={isOpen}
                    aria-controls={`qatar-faq-answer-${index}`}
                  >
                    <span className="font-[var(--font-qatar-display)] font-bold text-[#051A3A]">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`h-5 w-5 shrink-0 text-[#9A740D] transition-transform ${isOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                  <div
                    id={`qatar-faq-answer-${index}`}
                    className={`grid transition-[grid-template-rows,opacity] duration-300 ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
                  >
                    <div className="overflow-hidden">
                      <p className="max-w-3xl pb-5 text-sm leading-7 text-[#667085]">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-5 pb-20 pt-4 sm:px-8 lg:px-10">
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
      </section>

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
          <Phone className="h-5 w-5 text-[#F6C343]" /> Call
        </Link>
      </div>

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
