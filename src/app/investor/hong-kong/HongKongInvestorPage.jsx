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
  CircleCheckBig 
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

import heroImage from "@/app/assets/investor/dholera-insider-hong-kong-banner.webp";
import { HongKongFaq } from "./HongKongInteractive";
import WhyHongKong from "./WhyHongKong";
import CommonJourney from "../CommonJourney";

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


const supportBenefits = [
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

    
      {/* Main Banner Section */}
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
              <span className="text-[#F6C343]">Hong Kong</span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-white/75 sm:text-lg">
              Living in Hong Kong does not mean you have to put your property
              plans in India on hold.
            </p>

            <p className="mt-6 max-w-2xl text-base leading-8 text-white/75 sm:text-lg">
             Dholera Insider helps Hong Kong based NRIs explore residential
              plots in Dholera Smart City, with project guidance, documentation
              support and a convenient remote buying process.
            </p>


            <a
              href="https://wa.me/919211820887?text=Hello%2C%20I%20am%20interested%20in%20buying%20a%20plot%20in%20Dholera.%20Please%20share%20the%20details."
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-flex min-h-12 items-center justify-center rounded-xl bg-[#F6C343] px-6 py-3 text-sm font-bold text-[#051A3A] transition hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <FaWhatsapp className="mr-2 h-5 w-5 flex-shrink-0 text-[#25D366]" aria-hidden="true" />
              Explore Residential Projects
            </a>
          </div>
        </div>
      </section>

      {/* WHy Dholera */}
      <WhyHongKong />

      {/* Journey Section */}
      <CommonJourney
          title="How Hong Kong NRIs Can Explore Dholera Remotely"
      />

      {/* <section className="relative overflow-hidden bg-[#051A3A] px-4 py-8 text-white sm:px-6 md:py-12 lg:px-8">
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
          </div>
        </div>
      </section> */}

      <section
        id="why-us"
        aria-labelledby="why-dholera-heading"
        className="relative scroll-mt-20 bg-[#051A3A] text-white px-6 py-8 sm:px-6 sm:py-16 lg:px-6 lg:pt-12 lg:pb-16"
      >
        {/* =====================================================
            SKYLINE BACKGROUND
        ====================================================== */}

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            inset-0
            z-0
            overflow-hidden
          "
        >
          <Skyline />
        </div>

        {/* Subtle lighting */}

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            left-[-120px]
            top-[-120px]
            z-0
            h-[360px]
            w-[360px]
            rounded-full
            bg-[#F6C343]/[0.06]
            blur-[110px]
          "
        />

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            bottom-[-160px]
            right-[-100px]
            z-0
            h-[380px]
            w-[380px]
            rounded-full
            bg-white/[0.035]
            blur-[120px]
          "
        />

        {/* =====================================================
            CONTENT
        ====================================================== */}

        <div className="relative z-10 mx-auto w-full max-w-7xl">
          <div
            className="
              grid
              grid-cols-1
              gap-10
              lg:grid-cols-[0.78fr_1.22fr]
              lg:items-start
              lg:gap-14
              xl:gap-20
            "
          >
            {/* ===================================================
                LEFT SIDE
                Sticky only on desktop
            ==================================================== */}

            <div
              className="
                min-w-0
                lg:sticky
                lg:top-28
                lg:self-start
              "
            >
              {/* Heading */}

              <h2
                id="why-dholera-heading"
                className="
                  max-w-[520px]
                  text-[clamp(2rem,5vw,3.4rem)]
                  font-bold
                  leading-[1.06]
                  tracking-[-0.045em]
                  text-white
                  lg:mt-20
                "
              >
               Why Choose Dholera Insider ?
              </h2>

              {/* Gold accent */}

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
         
            </div>

            {/* ===================================================
                RIGHT SIDE
            ==================================================== */}

            <div className="min-w-0">
              {/* Section heading */}

              <div className="mb-6 sm:mb-7">
                <p
                  className="
                    max-w-2xl
                    text-[20px]
                    font-bold
                    leading-[1.3]
                    tracking-[-0.025em]
                    text-white
                    sm:text-[22px]
                    lg:text-[24px]
                  "
                >
                  Your Future in India Can Start From Hong Kong
                </p>
              </div>

              {/* =================================================
                  BENEFIT GRID

                  Mobile: 1 column
                  Tablet/Desktop: 2 columns
              ================================================== */}

              <div
                className="
                  grid
                  grid-cols-1
                  gap-3
                  sm:grid-cols-2
                  sm:gap-4
                "
              >
                {supportBenefits.map((benefit) => (
                  <div
                    key={benefit}
                    className="
                      group
                      relative
                      flex
                      min-h-[82px]
                      min-w-0
                      items-center
                      gap-3.5
                      overflow-hidden
                      rounded-[18px]
                      border
                      border-white/[0.11]
                      bg-white/[0.055]
                      px-4
                      py-4
                      shadow-[0_10px_30px_rgba(0,0,0,0.08)]
                      backdrop-blur-[6px]
                      transition-all
                      duration-300

                      hover:-translate-y-[2px]
                      hover:border-[#F6C343]/40
                      hover:bg-white/[0.08]
                      hover:shadow-[0_16px_36px_rgba(0,0,0,0.14)]

                      sm:min-h-[92px]
                      sm:gap-4
                      sm:px-5
                    "
                  >
                    {/* Decorative hover glow */}

                    <div
                      aria-hidden="true"
                      className="
                        pointer-events-none
                        absolute
                        -right-8
                        -top-8
                        h-24
                        w-24
                        rounded-full
                        bg-[#F6C343]/0
                        blur-3xl
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
                        h-10
                        w-10
                        shrink-0
                        items-center
                        justify-center
                        rounded-full
                        border
                        border-[#F6C343]/25
                        bg-[#F6C343]/10
                        text-[#F6C343]
                        transition-all
                        duration-300

                        group-hover:scale-105
                        group-hover:border-[#F6C343]/55
                        group-hover:bg-[#F6C343]/15

                        sm:h-11
                        sm:w-11
                      "
                    >
                      <CircleCheckBig
                        className="
                          h-[18px]
                          w-[18px]
                          sm:h-5
                          sm:w-5
                        "
                        strokeWidth={1.8}
                        aria-hidden="true"
                      />
                    </div>

                    {/* Benefit text */}

                    <p
                      className="
                        relative
                        min-w-0
                        text-[13px]
                        font-semibold
                        leading-[1.5]
                        text-white/85
                        transition-colors
                        duration-300
                        group-hover:text-white
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



      <HongKongFaq />
    </main>
  );
}
