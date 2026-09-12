import Image from "next/image";
import {
  BadgeCheck,
  Building2,
  Check,
  ClipboardCheck,
  FileCheck2,
  MapPin,
  Globe,
} from "lucide-react";



import residencyImage from "@/app/assets/investor/dholera-insider-singapore-banner.webp";
import estatesImage from "@/app/assets/residential/westwyn-estates-dholera-project-section.webp";
import countyImage from "@/app/assets/residential2/county.webp";
import { SingaporeFaq } from "./SingaporeInteractive";
import { FaWhatsapp } from "react-icons/fa";
import WhySingapore from "./WhySingapore";
import CommonJourney from "../CommonJourney";

const WHATSAPP_URL =
  "https://wa.me/919211820887?text=Hello%2C%20I%20am%20interested%20in%20buying%20a%20plot%20in%20Dholera.%20Please%20share%20the%20details.";



const reviewPoints = [
  "Project Location",
  "Plot Size & Pricing",
  "Infrastructure Development",
  "All Legal Documentation",
];

const reasonsToChoose = [
  "Verified Residential Plot Projects",
  "Transparent Project Information",
  "Verified Documentation Support",
  "Dedicated Assistance for Singapore NRIs",
  "100% Remote Buying Process",
  "Exclusive Channel Partner of BookMyAssets",
];

const reviewIcons = [
  MapPin,
  ClipboardCheck,
  Globe,
  FileCheck2,
];

const reviewIconStyles = [
  {
    bg: "bg-[#FFF3D6]",
    text: "text-[#D89E0D]",
  },
  {
    bg: "bg-[#E4F3FF]",
    text: "text-[#2580C4]",
  },
  {
    bg: "bg-[#E4F3FF]",
    text: "text-[#2580C4]",
  },
  {
    bg: "bg-[#E8F7EE]",
    text: "text-[#299A5D]",
  },
  {
    bg: "bg-[#F0E9FF]",
    text: "text-[#7958C9]",
  },
  {
    bg: "bg-[#FFF3D6]",
    text: "text-[#C58B05]",
  },
];

function ProjectImage() {
  return (
    <div className="relative mx-auto w-full max-w-[800px]">
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[28px] border border-white/15">
        <Image
          src={residencyImage}
          alt="Verified residential plots in Dholera for Singapore NRIs"
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

export default function SingaporeInvestorPage() {
  return (
    <main className="min-w-0 overflow-x-clip bg-[#F8F7F3] text-[#051A3A]">
      <div className="h-20" aria-hidden="true" />


      
      <section className="relative overflow-hidden bg-[#051A3A] px-4 py-8 text-white sm:px-6 md:py-12 lg:px-8">
        <Skyline />

        <div className="relative mx-auto grid max-w-7xl items-center gap-8 lg:grid-cols-[.9fr_1.1fr] lg:gap-16">
          <div
            className="
              order-1
              -mx-4
              -mt-8
              w-[calc(100%+2rem)]
              overflow-hidden
              rounded-none
              max-lg:[&_*]:!rounded-none
              sm:-mx-6
              sm:-mt-8
              sm:w-[calc(100%+3rem)]
              md:-mt-12
              lg:order-2
              lg:mx-0
              lg:mt-0
              lg:w-auto
            "
          >
            <ProjectImage />
          </div>

          {/* Content - Below Image on Mobile, Left on Desktop */}
          <div className="order-2 lg:order-1">
            <h1 className="font-[var(--font-bahrain-display)] text-[clamp(2rem,4.15vw,4rem)] font-bold leading-[1.02] tracking-[-0.055em]">
              Dholera Investment from{" "}
              <span className="text-[#F6C343]">Singapore</span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-white/75 sm:text-lg">
              Looking for a long-term investment opportunity in India? Dholera
              Insider helps Singapore NRIs explore verified residential plots
              in Dholera Smart City with complete transparency, verified
              documentation, and expert guidance.
            </p>

            <a
              href="https://wa.me/919211820887?text=Hello%2C%20I%20am%20interested%20in%20buying%20a%20plot%20in%20Dholera.%20Please%20share%20the%20details."
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-flex min-h-12 items-center justify-center rounded-xl bg-[#F6C343] px-6 py-3 text-sm font-bold text-[#051A3A] transition hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              Explore Residential Projects
            </a>
          </div>
        </div>
      </section>

      {/* Why Singopare section */}
      <WhySingapore /> 

    {/* Journey Section */}
      <CommonJourney 
        title="Your Dholera Investment Journey from Singapore"
      />

      <section className="relative overflow-hidden bg-[#051A3A] text-white px-6 py-8 sm:px-6 sm:py-16 lg:px-6 lg:pt-12 lg:pb-16">
        <Skyline />
        <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[.75fr_1.25fr] lg:gap-16">
          <h2 className="font-[var(--font-singapore-display)] text-[clamp(1.9rem,4vw,3.25rem)] font-bold leading-tight tracking-[-0.045em]">
            Why Choose Dholera Insider?
          </h2>
          <div className="divide-y divide-white/15 border-y border-white/15">
            {reasonsToChoose.map((reason) => (
              <div
                key={reason}
                className="flex items-center gap-4 py-5 font-[var(--font-singapore-display)] text-base font-semibold sm:text-lg"
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

      {/* <section className="bg-[#051A3A] px-4 py-8 text-white sm:px-6 md:py-12 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[.9fr_1.1fr] lg:items-center lg:gap-16">
          <div>
            <h2 className="font-[var(--font-singapore-display)] text-[clamp(1.9rem,4vw,3.25rem)] font-bold leading-tight tracking-[-0.045em]">
              Make an Informed Investment Decision
            </h2>
            <p className="mt-5 max-w-xl text-base leading-8 text-white/70 sm:text-lg">
              Before investing, understanding the project is just as important
              as choosing it. At Dholera Insider, we help Singapore NRIs
              evaluate every important aspect before moving forward.
            </p>
          </div>
          <div className="rounded-[26px] border border-white/15 bg-white/[0.06] p-5 sm:p-8">
            <p className="font-[var(--font-singapore-display)] text-lg font-bold text-[#F6C343]">
              You can review:
            </p>
            <div className="mt-5 divide-y divide-white/15">
              {reviewPoints.map((point) => (
                <div
                  key={point}
                  className="flex items-center gap-4 py-4 text-base font-semibold"
                >
                  <ClipboardCheck
                    className="h-5 w-5 shrink-0 text-[#F6C343]"
                    aria-hidden="true"
                  />
                  {point}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section> */}


      <section className="bg-[#EEF2F9] px-6 py-8 sm:px-6 sm:py-16 lg:px-6 lg:pt-12 lg:pb-16">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-center lg:gap-16 xl:gap-20">
          {/* =====================================================
              LEFT CONTENT
          ====================================================== */}

          <div className="max-w-xl">
            <h2
              className="
                font-[var(--font-singapore-display)]
                text-[clamp(2rem,4vw,3.35rem)]
                font-bold
                leading-[1.06]
                tracking-[-0.045em]
                text-[#051A3A]
              "
            >
              Make an Informed
              <span className="block">
                Investment Decision
              </span>
            </h2>

            {/* Accent line */}

            <div className="mt-4 h-[3px] w-10 rounded-full bg-[#F6C343] sm:w-12" />

            <p className="mt-5 max-w-lg text-[14px] leading-7 text-[#667085] sm:text-[15px] sm:leading-7 lg:text-base lg:leading-8">
              Before investing, understanding the project is just as
              important as choosing it. At Dholera Insider, we help
              Singapore NRIs evaluate every important aspect before
              moving forward.
            </p>
          </div>

          {/* =====================================================
              RIGHT SIDE
          ====================================================== */}

          <div>
            {/* Small heading */}

            <div className="mb-5 flex items-center gap-3">
            <p className="font-[var(--font-singapore-display)] text-[20px] font-bold text-[#051A3A] sm:text-[22px] lg:text-[24px]">
              You can review:
            </p>
            </div>

            {/* ===================================================
                REVIEW CARDS
            ==================================================== */}

            <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 sm:gap-4">
              {reviewPoints.map((point, index) => {
                const Icon =
                  reviewIcons[index % reviewIcons.length];

                const iconStyle =
                  reviewIconStyles[
                    index % reviewIconStyles.length
                  ];

                return (
                  <div
                    key={point}
                    className="
                      group
                      flex
                      min-h-[96px]
                      items-center
                      gap-4
                      rounded-[18px]
                      border
                      border-white/90
                      bg-white
                      px-5
                      py-5
                      shadow-[0_8px_28px_rgba(5,26,58,0.045)]
                      transition-all
                      duration-300
                      hover:-translate-y-[2px]
                      hover:border-[#F6C343]/35
                      hover:shadow-[0_14px_35px_rgba(5,26,58,0.08)]
                      sm:min-h-[108px]
                      sm:px-5
                      lg:px-6
                    "
                  >
                    {/* Icon */}

                    <div
                      className={`
                        flex
                        h-12
                        w-12
                        shrink-0
                        items-center
                        justify-center
                        rounded-full
                        ${iconStyle.bg}
                        transition-transform
                        duration-300
                        group-hover:scale-105
                      `}
                    >
                      <Icon
                        className={`h-[21px] w-[21px] ${iconStyle.text}`}
                        strokeWidth={1.8}
                        aria-hidden="true"
                      />
                    </div>

                    {/* Text */}

                    <p
                      className="
                        min-w-0
                        font-[var(--font-singapore-display)]
                        text-[13px]
                        font-bold
                        leading-[1.45]
                        text-[#051A3A]
                        sm:text-[14px]
                        lg:text-[15px]
                      "
                    >
                      {point}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>



      <SingaporeFaq />
    </main>
  );
}
