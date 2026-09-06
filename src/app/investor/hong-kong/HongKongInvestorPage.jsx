import Image from "next/image";
import {
  BadgeCheck,
  Building2,
  Check,
  Factory,
  FileCheck2,
  Landmark,
  MapPin,
  MessageCircle,
  Network,
  Plane,
  SearchCheck,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

import heroImage from "@/app/assets/investor/dholera-insider-hong-kong-banner.webp";
import { HongKongFaq } from "./HongKongInteractive";

const WHATSAPP_URL =
  "https://wa.me/919211820887?text=Hello%2C%20I%20am%20in%20Hong%20Kong%20and%20interested%20in%20Dholera%20residential%20plots.%20Please%20share%20the%20details.";

const investmentReasons = [
  { icon: Landmark, label: "Greenfield smart city development" },
  { icon: Factory, label: "Major industrial investments" },
  { icon: BadgeCheck, label: "Semiconductor manufacturing ecosystem" },
  { icon: Network, label: "Ahmedabad Dholera Expressway" },
  { icon: Plane, label: "Dholera International Airport" },
  { icon: Building2, label: "Planned residential development" },
  { icon: SearchCheck, label: "Growing infrastructure and connectivity" },
];

const journeySteps = [
  {
    number: "1",
    icon: MessageCircle,
    title: "Talk to a Dholera Expert",
    description: "Discuss your investment goals and requirements.",
  },
  {
    number: "2",
    icon: SearchCheck,
    title: "Explore Residential Projects",
    description:
      "Review project locations, plot sizes and development details.",
  },
  {
    number: "3",
    icon: FileCheck2,
    title: "Understand the Documents",
    description:
      "Get guidance on the relevant project and ownership documents.",
  },
  {
    number: "4",
    icon: MapPin,
    title: "Choose Your Plot",
    description:
      "Select a property based on your requirements and investment plan.",
  },
  {
    number: "5",
    icon: BadgeCheck,
    title: "Complete Payment and Get Registry",
    description: "Complete the full payment and get your plot registry.",
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
  "Verified residential plot opportunities",
  "Project and location guidance",
  "Documentation support",
  "Transparent project information",
  "Virtual consultations",
  "Remote buying assistance",
  "Registration guidance",
  "Dedicated NRI support",
];

function ProjectImage() {
  return (
    <div className="relative mx-auto w-full max-w-[800px]">
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[28px] border border-white/15">
        <Image
          src={heroImage}
          alt="Dholera Smart City investment from Hong Kong"
          fill
          priority
          sizes="(max-width: 1024px) 92vw, 48vw"
          className="object-cover"
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

export default function HongKongInvestorPage() {
  return (
    <main className="min-w-0 overflow-x-clip bg-[#F8F7F3] text-[#051A3A]">
      <div className="h-20" aria-hidden="true" />

      <section className="relative overflow-hidden bg-[#051A3A] px-4 py-8 text-white sm:px-6 md:py-12 lg:px-8">
        <Skyline />
        <div className="relative mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[.9fr_1.1fr] lg:gap-16">
          <div>
            <h1 className="font-[var(--font-hong-kong-display)] text-[clamp(2rem,4.15vw,4rem)] font-bold leading-[1.02] tracking-[-0.055em]">
              Dholera Investment from{" "}
              <span className="text-[#F6C343]">Hong Kong</span>
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-white/75 sm:text-lg">
              Living in Hong Kong does not mean you have to put your property
              plans in India on hold.
            </p>
            <p className="mt-3 max-w-2xl text-base leading-8 text-white/75 sm:text-lg">
              Dholera Insider helps Hong Kong based NRIs explore residential
              plots in Dholera Smart City, with project guidance, documentation
              support and a convenient remote buying process.
            </p>
            <a
              href="#buy-dholera-plot"
              className="mt-7 inline-flex min-h-12 items-center justify-center rounded-xl bg-[#F6C343] px-6 py-3 text-sm font-bold text-[#051A3A] transition hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              Explore Dholera Plots
            </a>
          </div>
          <ProjectImage />
        </div>
      </section>

      <section
        id="why-invest"
        className="scroll-mt-28 bg-[#F8F7F3] px-4 py-8 sm:px-6 md:py-12 lg:px-8"
      >
        <div className="mx-auto max-w-7xl">
          <h2 className="font-[var(--font-hong-kong-display)] text-[clamp(1.9rem,4vw,3.25rem)] font-bold leading-tight tracking-[-0.045em]">
            Why Dholera ?
          </h2>
          <div className="mt-10 divide-y divide-[#051A3A]/15 border-y border-[#051A3A]/15">
            {investmentReasons.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="grid grid-cols-[2.75rem_1fr] items-center gap-3 py-5 sm:grid-cols-[3.25rem_1fr] sm:gap-5 sm:py-6"
              >
                <span className="grid h-11 w-11 place-items-center rounded-full bg-[#F6C343] sm:h-12 sm:w-12">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="font-[var(--font-hong-kong-display)] text-base font-bold sm:text-xl">
                  {label}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="buy-dholera-plot"
        className="scroll-mt-28 border-y border-[#051A3A]/10 bg-white px-4 py-8 sm:px-6 md:py-12 lg:px-8"
      >
        <div className="mx-auto max-w-7xl">
          {/* <h2 className="mx-auto max-w-3xl text-center font-[var(--font-bahrain-display)] text-[clamp(1.75rem,3vw,2.65rem)] font-bold leading-[1.12] tracking-[-0.035em]">
                  Your Dholera Investment Journey from Bahrain
                </h2> */}

          <h2
            className="
                  w-full
                  text-left
                  font-[var(--font-bahrain-display)]
                  text-[clamp(1.75rem,3vw,2.65rem)]
                  font-bold
                  leading-[1.12]
                  tracking-[-0.035em]
                "
          >
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
          <h2 className="font-[var(--font-hong-kong-display)] text-[clamp(1.9rem,4vw,3.25rem)] font-bold leading-tight tracking-[-0.045em]">
            Why Choose Dholera Insider ?
          </h2>
          <div>
            <div className="divide-y divide-white/15 border-y border-white/15">
              {reasonsToChoose.map((reason) => (
                <div
                  key={reason}
                  className="flex items-center gap-4 py-5 font-[var(--font-hong-kong-display)] text-base font-semibold sm:text-lg"
                >
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#F6C343] text-[#051A3A]">
                    <Check className="h-4 w-4" aria-hidden="true" />
                  </span>
                  {reason}
                </div>
              ))}
            </div>

            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#F6C343] px-6 py-3 text-sm font-bold text-[#051A3A] transition hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <FaWhatsapp className="h-5 w-5" aria-hidden="true" />
              Talk to a Dholera Investment Expert
            </a>

            {/* <p className="mt-3 text-sm font-bold">
                Your Future in India Can Start From Hong Kong
              </p> */}
          </div>
        </div>
      </section>

      <HongKongFaq />
    </main>
  );
}
