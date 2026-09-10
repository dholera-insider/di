
"use client";

import {
  PhoneCall,
  Building2,
  FileCheck2,
  CheckCircle2,
  CreditCard,
  ScrollText,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";


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

const mobileJourneyColors = [
  "bg-[#F6C343]",
  "bg-[#E9EFF8]",
  "bg-[#F8EAC2]",
  "bg-[#E4EDF8]",
  "bg-[#F5E5B7]",
  "bg-[#E9EFF7]",
];

export default function CommonJourney({
  title = "Talk to a Dholera Expert",
  whatsappUrl =
  "https://wa.me/919211820887?text=Hello%2C%20I%20am%20in%20Oman%20and%20interested%20in%20Dholera%20residential%20plots.%20Please%20share%20the%20details.",
    
}) {
  return (
    <section className="border-y border-[#051A3A]/10 bg-white px-4 py-8 sm:px-6 md:py-12 lg:px-8">
      <div className="mx-auto max-w-7xl">
        
        {/* Heading */}
        <h2
          className="
            w-full
            text-left
            font-[var(--font-bahrain-display)]
            text-[clamp(1.75rem,3vw,2.65rem)]
            font-bold
            leading-[1.12]
            tracking-[-0.035em]
            text-[#051A3A]
            lg:text-center
          "
        >
          {title}
        </h2>

        {/* Mobile / Tablet */}
        <div className="relative mx-auto mt-10 grid w-full max-w-md gap-5 lg:hidden">
          {/* Vertical Journey Line */}
          <span
            aria-hidden="true"
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
          />

          {journeySteps.map(({ number, icon: Icon, title }, index) => (
            <article
              key={number}
              className="
                relative
                z-10
                grid
                grid-cols-[3rem_1fr]
                items-start
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

              {/* Content Card */}
              <div
                className="
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
                {/* Step */}
                <span
                  className="
                    inline-flex
                    rounded-full
                    bg-[#051A3A]
                    px-2.5
                    py-1
                    text-[9px]
                    font-bold
                    uppercase
                    tracking-[0.14em]
                    text-[#F6C343]
                  "
                >
                  Step {number}
                </span>

                {/* Step Title */}
                <h3
                  className="
                    mt-2
                    font-[var(--font-bahrain-display)]
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
            aria-hidden="true"
            className="
              absolute
              left-6
              top-7
              h-px
              w-[calc(100%-3rem)]
              bg-[#051A3A]/10
            "
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
                        font-[var(--font-bahrain-display)]
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
        {whatsappUrl && (
          <div className="mt-10 flex w-full justify-center px-4 sm:px-6">

            <a
              href={whatsappUrl}
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
                <FaWhatsapp className="h-5 w-5" aria-hidden="true" />
               Talk to a Dholera Expert
            </a>
          </div>
        )}
      </div>
    </section>
  );
}