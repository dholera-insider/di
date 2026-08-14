"use client";

import { useId, useState } from "react";
import Image from "next/image";
import { Geist, Space_Grotesk } from "next/font/google";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  Check,
  ChevronDown,
  FileCheck2,
  Globe2,
  Landmark,
  MapPin,
  MessageCircle,
  Plane,
  SearchCheck,
  ShieldCheck,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

import projectImage from "@/app/assets/investor/dholera-insider-bahrain-banner.webp";

const display = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-bahrain-display",
});

const body = Geist({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-bahrain-body",
});

const WHATSAPP_URL =
  "https://wa.me/919211820887?text=Hello%2C%20I%20am%20interested%20in%20buying%20a%20plot%20in%20Dholera.%20Please%20share%20the%20details.";

const dholeraReasons = [
  { icon: Landmark, label: "India’s First Planned Smart City" },
  { icon: ShieldCheck, label: "Government-Backed Development" },
  { icon: Building2, label: "Major Industrial Investments" },
  { icon: Plane, label: "World-Class Connectivity" },
  { icon: SearchCheck, label: "Long-Term Investment Potential" },
];

const journeySteps = [
  {
    number: "1",
    icon: MessageCircle,
    title: "Connect with Our Dholera Expert",
    description:
      "Discuss your investment goals, budget, and preferred residential plot options.",
  },
  {
    number: "2",
    icon: SearchCheck,
    title: "Explore Verified Projects",
    description:
      "Review the project location, plot sizes, pricing, and development through virtual presentations.",
  },
  {
    number: "3",
    icon: FileCheck2,
    title: "Verify Legal Documents",
    description:
      "Review the project documents, approvals, NA/NOC, and registry details before investing.",
  },
  {
    number: "4",
    icon: MapPin,
    title: "Book Your Plot",
    description:
      "Select your preferred plot and complete the booking and payment process.",
  },
  {
    number: "5",
    icon: BadgeCheck,
    title: "Complete Registration",
    description:
      "Receive complete support for plot registration and ownership formalities.",
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
  "Verified Residential & Bulk Land Plot Projects",
  "Transparent Pricing & Documentation",
  "Dedicated Support for Bahrain NRIs",
  "100% Remote Buying Process",
  "Exclusive Channel Partner of BookMyAssets",
];

const faqItems = [
  {
    question: "Can I buy a Dholera plot from Bahrain?",
    answer:
      "Yes. NRIs living in Bahrain can buy residential plots in Dholera. Dholera Insider helps you explore verified projects, review legal documents, and complete the buying process remotely.",
  },
  {
    question: "Is Dholera investment from Bahrain safe?",
    answer:
      "Yes, if you invest in a verified project. Always verify the legal documents, project approvals, and ownership details before making an investment decision.",
  },
  {
    question: "What documents should Bahrain NRIs verify?",
    answer:
      "Before buying, verify the title documents, NA/NOC, approved layout plan, sale deed, ownership details, and registry ready plots.",
  },
  {
    question: "Can I complete the process without visiting India?",
    answer:
      "Yes. Most of the buying process can be completed remotely through online documentation, virtual consultations, and registration support.",
  },
  {
    question: "Why choose Dholera Insider?",
    answer:
      "Dholera Insider is the exclusive channel partner of BookMyAssets for NRI investors. We provide verified residential plot projects, transparent documentation, and dedicated support to make your Dholera investment simple and secure.",
  },
];

function ProjectImage() {
  return (
    <div className="relative mx-auto w-full max-w-[800px]">
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[28px] border border-white/15">
        <Image
          src={projectImage}
          alt="Verified residential plots in Dholera for Bahrain NRIs"
          width={800}
          height={600}
          priority
          sizes="(max-width: 1024px) 92vw, 48vw"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#051A3A]/70 via-transparent to-transparent" />
      </div>
    </div>
  );
}

function Skyline() {
  const buildings = [
    "h-16 w-5",
    "h-28 w-8",
    "h-20 w-7",
    "h-36 w-10",
    "h-24 w-6",
    "h-32 w-9",
    "h-20 w-8",
    "h-28 w-7",
    "h-40 w-9",
    "h-24 w-8",
    "h-32 w-10",
    "h-20 w-6",
  ];

  return (
    <div
      className="pointer-events-none absolute inset-x-0 bottom-0 flex h-44 items-end justify-around gap-1 overflow-hidden opacity-10"
      aria-hidden="true"
    >
      {buildings.map((classes, index) => (
        <span
          key={`${classes}-${index}`}
          className={`${classes} block bg-white`}
        />
      ))}
    </div>
  );
}

function BahrainFaq() {
  const [openIndex, setOpenIndex] = useState(0);
  const headingId = useId();

  return (
    <section
      className="bg-[#F8F7F3] px-4 py-8 sm:px-6 md:py-12 lg:px-8"
      aria-labelledby={headingId}
    >
      <div className="mx-auto max-w-5xl">
        <h2
          id={headingId}
          className="font-[var(--font-bahrain-display)] text-[clamp(1.9rem,4vw,3.25rem)] font-bold leading-tight tracking-[-0.045em]"
        >
          FAQs
        </h2>
        <div className="mt-10 divide-y divide-[#051A3A]/15 border-y border-[#051A3A]/15">
          {faqItems.map((item, index) => {
            const isOpen = openIndex === index;
            const answerId = `bahrain-faq-answer-${index}`;
            const buttonId = `bahrain-faq-button-${index}`;

            return (
              <article key={item.question}>
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? -1 : index)}
                    className="flex min-h-16 w-full items-center justify-between gap-5 py-5 text-left font-[var(--font-bahrain-display)] text-base font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F6C343] sm:text-lg"
                    aria-expanded={isOpen}
                    aria-controls={answerId}
                  >
                    <span>{item.question}</span>
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
                  <p className="max-w-3xl pb-5 text-sm leading-7 text-[#051A3A]/70 sm:text-base">
                    {item.answer}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default function DholeraBahrainPage() {
  return (
    <main
      className={`${display.variable} ${body.variable} min-w-0 overflow-x-clip bg-[#F8F7F3] text-[#051A3A]`}
      style={{ fontFamily: "var(--font-bahrain-body)" }}
    >
      <div className="h-20" aria-hidden="true" />

      <section className="relative overflow-hidden bg-[#051A3A] px-4 py-8 text-white sm:px-6 md:py-12 lg:px-8">
        <Skyline />
        <div className="relative mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[.9fr_1.1fr] lg:gap-16">
          <div>
            <h1 className="font-[var(--font-bahrain-display)] text-[clamp(2rem,4.15vw,4rem)] font-bold leading-[1.02] tracking-[-0.055em]">
              Dholera Investment from{" "}
              <span className="text-[#F6C343]">Bahrain</span>
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-white/75 sm:text-lg">
              Planning a Dholera investment from Bahrain? Dholera Insider helps
              Bahrain NRIs explore verified residential plots in Dholera Smart
              City with transparent information, legal guidance, and a simple
              remote buying process.
            </p>
          </div>
          <ProjectImage />
        </div>
      </section>

      <section
        id="why-dholera"
        className="scroll-mt-28 bg-[#F8F7F3] px-4 py-8 sm:px-6 md:py-12 lg:px-8"
      >
        <div className="mx-auto max-w-7xl">
          <h2 className="font-[var(--font-bahrain-display)] text-[clamp(1.9rem,4vw,3.25rem)] font-bold leading-tight tracking-[-0.045em]">
            Why Dholera?
          </h2>
          <div className="mt-10 divide-y divide-[#051A3A]/15 border-y border-[#051A3A]/15">
            {dholeraReasons.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="grid grid-cols-[2.75rem_1fr] items-center gap-3 py-5 sm:grid-cols-[3.25rem_1fr] sm:gap-5 sm:py-6"
              >
                <span className="grid h-11 w-11 place-items-center rounded-full bg-[#F6C343] sm:h-12 sm:w-12">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="font-[var(--font-bahrain-display)] text-base font-bold sm:text-xl">
                  {label}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-[#051A3A]/10 bg-white px-4 py-8 sm:px-6 md:py-12 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="mx-auto max-w-3xl text-center font-[var(--font-bahrain-display)] text-[clamp(1.75rem,3vw,2.65rem)] font-bold leading-[1.12] tracking-[-0.035em]">
            Your Dholera Investment Journey from Bahrain
          </h2>

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
                      <h3 className="font-[var(--font-bahrain-display)] text-sm font-bold leading-tight text-[#051A3A]">
                        {title}
                      </h3>
                    </div>
                    <p className="mt-2 text-xs leading-5 text-[#051A3A]/65">
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
                      <span className="relative z-10 grid h-14 w-14 shrink-0 place-items-center rounded-full border-4 border-white bg-[#051A3A] text-[#F6C343] shadow-[0_8px_20px_rgba(5,26,58,.18)]">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <div>
                        <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#9A740D]">
                          Step {number}
                        </span>
                        <h3 className="mt-1 font-[var(--font-bahrain-display)] text-base font-bold text-[#051A3A]">
                          {title}
                        </h3>
                      </div>
                    </div>
                    <p className="mt-4 px-2 text-sm leading-6 text-[#051A3A]/65">
                      {description}
                    </p>
                  </article>
                ),
              )}
            </div>
          </div>

          <div className="mt-12 flex flex-col items-center justify-between gap-5 rounded-[24px] bg-[#051A3A] px-6 py-7 text-center sm:flex-row sm:px-8 sm:text-left">
            <div className="flex items-center gap-4">
              <span className="hidden h-11 w-11 shrink-0 place-items-center rounded-xl bg-white/10 text-[#F6C343] sm:grid">
                <FaWhatsapp className="h-5 w-5" aria-hidden="true" />
              </span>
              <p className="font-[var(--font-bahrain-display)] text-lg font-bold text-white">
                Get Investment Guidance
              </p>
            </div>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-12 shrink-0 items-center gap-2 rounded-xl bg-[#F6C343] px-5 text-sm font-bold text-[#051A3A] transition hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <FaWhatsapp className="h-5 w-5" aria-hidden="true" />
              Get Investment Guidance
            </a>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#051A3A] px-4 py-8 text-white sm:px-6 md:py-12 lg:px-8">
        <Skyline />
        <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[.75fr_1.25fr] lg:gap-16">
          <h2 className="font-[var(--font-bahrain-display)] text-[clamp(1.9rem,4vw,3.25rem)] font-bold leading-tight tracking-[-0.045em]">
            Why Choose Dholera Insider?
          </h2>
          <div className="divide-y divide-white/15 border-y border-white/15">
            {reasonsToChoose.map((reason) => (
              <div
                key={reason}
                className="flex items-center gap-4 py-5 font-[var(--font-bahrain-display)] text-base font-semibold sm:text-lg"
              >
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#F6C343] text-[#051A3A]">
                  <Check className="h-4 w-4" aria-hidden="true" />
                </span>
                {reason}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-8 sm:px-6 md:py-12 lg:px-8">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[30px] border border-[#F6C343]/30 bg-[#051A3A] px-6 py-12 text-center sm:px-10">
          <div className="relative mx-auto max-w-3xl">
            <h2 className="font-[var(--font-bahrain-display)] text-[clamp(1.75rem,3vw,2.75rem)] font-bold leading-[1.12] tracking-[-0.045em] text-white">
              Planning to invest in India&apos;s future from Bahrain?
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-white/70 sm:text-lg">
              Explore residential plot in Dholera
            </p>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#F6C343] px-6 py-3 text-sm font-bold text-[#051A3A] transition hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              Talk to a Dholera Investment Advisor
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      <BahrainFaq />
    </main>
  );
}
