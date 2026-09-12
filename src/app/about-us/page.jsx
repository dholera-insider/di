import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";
import { aboutPageSchema } from "../schemaMarkup";
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  CheckCircle2,
  FileCheck2,
  Globe,
  Handshake,
  MessageCircle,
  Scale,
  ShieldCheck,
  Target,
  Users,
} from "lucide-react";
import WhyNRIsAbout from "./WhyNRIs";

export const metadata = {
  title: "About Dholera Insider | Dholera Investment for NRIs",
  description:
    "Dholera Insider helps NRIs invest in verified residential plots in Dholera Smart City with transparent guidance, legal clarity, and remote buying support.",
  keywords: [
    "Dholera Investment for NRIs",
    "Dholera plots for NRI",
    "NRI investment in Dholera",
    "Dholera residential plots",
    "Buy Dholera plot from abroad",
    "Dholera Smart City investment",
    "Dholera property investment",
    "Invest in Dholera from abroad",
    "Dholera real estate for NRIs",
    "Verified residential plots in Dholera",
  ],
  alternates: {
    canonical: "https://www.dholerainsider.com/about-us",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "About Dholera Insider | Dholera Investment for NRIs",
    description:
      "Dholera Insider helps NRIs invest in verified residential plots in Dholera Smart City with transparent guidance, legal clarity, and remote buying support.",
    url: "https://www.dholerainsider.com/about-us",
    type: "website",
  },
};

const reasons = [
  {
    Icon: Handshake,
    title: "Exclusive Channel Partner of BookMyAssets",
    description:
      "Get access to selected residential plot projects backed by one of the trusted names in Dholera real estate.",
  },
  {
    Icon: CheckCircle2,
    title: "Verified Residential Plot Projects",
    description:
      "We offer residential plot opportunities with verified documentation and complete project transparency.",
  },
  {
    Icon: FileCheck2,
    title: "Transparent Buying Process",
    description:
      "Understand pricing, legal documents, approvals, and the buying process before making any investment decision.",
  },
  {
    Icon: Users,
    title: "Dedicated NRI Support",
    description:
      "From your first enquiry to plot registration, our team assists you at every stage, wherever you are in the world.",
  },
  {
    Icon: Globe,
    title: "Remote Buying Assistance",
    description:
      "Explore projects, review documents, and complete your investment with a convenient remote buying process.",
  },
  {
    Icon: Target,
    title: "Long-Term Investment Focus",
    description:
      "Our projects are located near major infrastructure developments with strong long-term residential potential.",
  },
];

const beliefs = [
  {
    Icon: ShieldCheck,
    title: "Trust",
    description:
      "Building long-term relationships through honest advice and dependable service.",
  },
  {
    Icon: FileCheck2,
    title: "Transparency",
    description:
      "Providing clear project information, verified documentation, and straightforward pricing.",
  },
  {
    Icon: Scale,
    title: "Integrity",
    description:
      "Helping investors make informed decisions based on facts, not sales pressure.",
  },
  {
    Icon: Handshake,
    title: "Commitment",
    description:
      "Supporting our clients before, during, and after their property purchase.",
  },
];

const trustPoints = [
  "Exclusive Channel Partner of BookMyAssets",
  "Verified Residential Plot Projects",
  "Registry Ready Opportunities",
  "Transparent Documentation",
  "Dedicated NRI Assistance",
  "Remote Buying Support",
  "Professional Guidance",
  "End-to-End Investment Assistance",
];

function SectionHeading({
  eyebrow,
  children,
  inverse = false,
  centered = false,
}) {
  return (
    <div className={`mb-6 sm:mb-8 md:mb-12 ${centered ? "text-center" : ""}`}>
      {eyebrow && (
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#F6C343]">
          {eyebrow}
        </p>
      )}
      <h2
        className={`text-[clamp(1.75rem,3.4vw,2.75rem)] font-bold leading-tight tracking-[-0.025em] ${
          inverse ? "text-white" : "text-[#051A3A]"
        }`}
      >
        {children}
      </h2>
      <div
        className={`mt-3 h-1 w-16 rounded-full bg-[#F6C343] ${
          centered ? "mx-auto" : ""
        }`}
      />
    </div>
  );
}

export default function AboutUsPage() {
  return (
    <main className="bg-[#FDFCFA] text-[#162033]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageSchema) }}
      />

      {/* Main banner section  */}
      <section
        aria-labelledby="about-dholera-insider-heading"
        className="
          relative
          isolate
          overflow-hidden
          bg-[#051A3A]
          px-5
          pb-14
          pt-28
          text-white

          sm:px-7
          sm:pb-16
          sm:pt-32

          lg:px-10
          lg:pb-20
          lg:pt-36

          xl:pt-40
        "
      >
        {/* =====================================================
            BACKGROUND
        ====================================================== */}

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            inset-0
            -z-30
            bg-[linear-gradient(115deg,#04162F_0%,#051A3A_50%,#08264A_100%)]
          "
        />

        {/* =====================================================
            SUBTLE DOT GRID
        ====================================================== */}

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            inset-0
            -z-20
            opacity-[0.05]
          "
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(246,195,67,.85) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        {/* =====================================================
            VERY SOFT DEPTH
        ====================================================== */}

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            inset-0
            -z-10
            bg-[linear-gradient(180deg,transparent_0%,rgba(0,0,0,0.08)_100%)]
          "
        />

        {/* =====================================================
            MAIN CONTAINER
        ====================================================== */}

        <div className="relative mx-auto w-full max-w-7xl">
          {/* ===================================================
              TOP EDITORIAL GRID
          ==================================================== */}

          <div
            className="
              grid
              grid-cols-1
              gap-10

              lg:grid-cols-[1.18fr_0.82fr]
              lg:items-end
              lg:gap-14

              xl:gap-20
            "
          >
            {/* =================================================
                LEFT
            ================================================== */}

            <div className="min-w-0">
              {/* Eyebrow */}

              <div
                className="
                  flex
                  items-center
                  gap-3
                "
              >
                <span
                  aria-hidden="true"
                  className="
                    h-[2px]
                    w-9
                    rounded-full
                    bg-[#F6C343]
                  "
                />

                <p
                  className="
                    text-[12px]
                    font-bold
                    uppercase
                    tracking-[0.22em]
                    text-[#F6C343]

                    sm:text-xs
                    lg:text-[14px]
                  "
                >
                  About Dholera Insider
                </p>
              </div>

              {/* Heading */}

              <h1
                id="about-dholera-insider-heading"
                className="
                  mt-5
                  max-w-[900px]

                  text-[clamp(2.45rem,7vw,4rem)]
                  font-bold
                  leading-[0.99]
                  tracking-[-0.055em]
                  text-white

                  sm:mt-6

                  lg:text-[clamp(3.4rem,5vw,5rem)]
                "
              >
                Helping NRIs Invest in Dholera with{" "}
                <span className="text-[#F6C343]">
                  Confidence
                </span>
              </h1>
            </div>

            {/* =================================================
                RIGHT POSITIONING STATEMENT
            ================================================== */}

            <div
              className="
                relative
                border-l
                border-white/15
                pl-5

                sm:pl-6

                lg:mb-1
                lg:pl-8
              "
            >
              {/* Gold marker */}

              <span
                aria-hidden="true"
                className="
                  absolute
                  -left-px
                  top-0
                  h-14
                  w-[2px]
                  bg-[#F6C343]
                "
              />

              <p
                className="
                  max-w-[520px]
                  text-[16px]
                  leading-8
                  text-white/85

                  sm:text-[17px]

                  lg:text-[18px]
                  lg:leading-8
                "
              >
                Dholera Insider is a dedicated platform created
                exclusively for NRIs looking to invest in verified
                residential plots in Dholera Smart City.
              </p>
            </div>
          </div>

          {/* ===================================================
              DIVIDER
          ==================================================== */}

          <div
            aria-hidden="true"
            className="
              my-10
              h-px
              w-full
              bg-white/10

              sm:my-12

              lg:my-14
            "
          />

          {/* ===================================================
              SUPPORTING CONTENT

              No 01 / 02 labels.
          ==================================================== */}

          <div
            className="
              grid
              grid-cols-1
              gap-7

              md:grid-cols-2
              md:gap-10

              lg:max-w-[1080px]
              lg:gap-16
            "
          >
            {/* =================================================
                CONTENT BLOCK 1
            ================================================== */}

            <div className="min-w-0">
              <p
                className="
                  text-[14px]
                  leading-7
                  text-white/70

                  sm:text-[15px]
                  sm:leading-8

                  lg:text-[16px]
                "
              >
                As the exclusive channel partner of BookMyAssets, we
                help overseas Indians understand Dholera, compare
                residential projects, verify legal documents, and
                complete the buying process with confidence.
              </p>
            </div>

            {/* =================================================
                CONTENT BLOCK 2
            ================================================== */}

            <div className="min-w-0">
              <p
                className="
                  text-[14px]
                  leading-7
                  text-white/70

                  sm:text-[15px]
                  sm:leading-8

                  lg:text-[16px]
                "
              >
                Whether you are investing for your family's future,
                building a long-term asset, or planning to return to
                India, our team provides the guidance and support you
                need to make an informed decision.
              </p>
            </div>
          </div>

          {/* ===================================================
              BOTTOM STRUCTURAL DETAIL
          ==================================================== */}

          <div
            aria-hidden="true"
            className="
              mt-12
              flex
              items-center
              gap-3

              sm:mt-14
            "
          >
            <span className="h-px flex-1 bg-white/10" />

            <span
              className="
                h-1.5
                w-1.5
                rounded-full
                bg-[#F6C343]
              "
            />

            <span className="h-px w-12 bg-white/10" />
          </div>
        </div>
      </section>


      {/* Why NRIs  */}
      <WhyNRIsAbout />




      <section
        id="our-mission"
        aria-labelledby="our-mission-heading"
        className="
          relative
          overflow-hidden
          bg-white
          px-6
          py-8
          sm:px-6
          sm:py-16
          lg:px-6
          lg:pt-12
          lg:pb-16
        "
      >
        {/* =====================================================
            SUBTLE BACKGROUND GRID
        ====================================================== */}

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            inset-0
            opacity-[0.02]
          "
          style={{
            backgroundImage:
              "linear-gradient(rgba(5,26,58,.32) 1px, transparent 1px), linear-gradient(90deg, rgba(5,26,58,.32) 1px, transparent 1px)",
            backgroundSize: "58px 58px",
          }}
        />

        {/* =====================================================
            MAIN CONTAINER
        ====================================================== */}

        <div className="relative mx-auto w-full max-w-7xl">
          {/* ===================================================
              MISSION CONTENT
          ==================================================== */}

          <div
            className="
              grid
              grid-cols-1
              gap-8

              lg:grid-cols-[1.05fr_0.95fr]
              lg:items-start
              lg:gap-16

              xl:gap-24
            "
          >
            {/* =================================================
                LEFT
            ================================================== */}

            <div className="min-w-0">
              {/* Section label */}

              <div className="flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="
                    h-[2px]
                    w-9
                    rounded-full
                    bg-[#F6C343]
                  "
                />

                <p
                  className="
                    text-[12px]
                    font-bold
                    uppercase
                    tracking-[0.2em]
                    text-[#A87300]

                    lg:text-[14px]
                  "
                >
                  Our Mission
                </p>
              </div>

              {/* Mission statement */}

              <h2
                id="our-mission-heading"
                className="
                  mt-5
                  max-w-[760px]

                  text-[clamp(1.9rem,6vw,3.25rem)]
                  font-bold
                  leading-[1.08]
                  tracking-[-0.045em]
                  text-[#051A3A]

                  sm:mt-6

                  lg:text-[clamp(2.6rem,4vw,3.7rem)]
                "
              >
                Our mission is to make Dholera investment for NRIs{" "}
                <span className="text-[#A87300]">
                  simple, transparent, and trustworthy.
                </span>
              </h2>

            
            </div>

            {/* =================================================
                RIGHT
            ================================================== */}

            <div
              className="
                relative

                border-l
                border-[#C9D2DE]

                pl-5

                sm:pl-6

                lg:mt-4
                lg:pl-8
              "
            >
              {/* Gold accent */}

              <span
                aria-hidden="true"
                className="
                  absolute
                  -left-px
                  top-0

                  h-16
                  w-[2px]
                  bg-[#F6C343]
                "
              />

              <p
                className="
                  max-w-[590px]

                  text-[15px]
                  leading-7
                  text-[#667085]

                  sm:text-[16px]
                  sm:leading-8

                  lg:text-[17px]
                  lg:leading-8
                "
              >
                We believe investing in Dholera plots from another
                country should be easy. That's why we focus on verified
                projects, clear documentation, honest guidance, and
                dedicated support throughout your investment journey.
              </p>
            </div>
          </div>

          {/* ===================================================
              DIVIDER
          ==================================================== */}

          <div
            aria-hidden="true"
            className="
              my-10
              h-px
              w-full
              bg-[#C9D2DE]

              sm:my-12

              lg:my-14
            "
          />

          {/* ===================================================
              CTA SECTION
          ==================================================== */}

          <div
            className="
              relative
              overflow-hidden
              bg-[#051A3A]

              px-5
              py-6

              sm:px-7
              sm:py-7

              lg:flex
              lg:items-center
              lg:justify-between
              lg:gap-12
              lg:px-9
              lg:py-8
            "
          >
            {/* Gold top line */}

            <div
              aria-hidden="true"
              className="
                absolute
                inset-x-0
                top-0
                h-[3px]
                bg-[#F6C343]
              "
            />

            {/* CTA heading */}

            <h3
              className="
                max-w-[680px]

                text-[clamp(1.45rem,5vw,2.15rem)]
                font-bold
                leading-[1.15]
                tracking-[-0.035em]
                text-white
              "
            >
              Start Your Dholera Investment Journey
            </h3>

            {/* CTA button */}

            <div
              className="
                mt-5

                lg:mt-0
                lg:shrink-0
              "
            >
              <a
                href="https://wa.me/919211820887?text=Hello%2C%20I%20am%20interested%20in%20buying%20a%20plot%20in%20Dholera.%20Please%20share%20the%20details."
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Connect With RM"
                className="
                  group

                  inline-flex
                  min-h-[52px]
                  w-fit
                  items-center
                  justify-between
                  gap-5

                  rounded-[8px]
                  bg-[#F6C343]

                  px-5
                  py-3

                  text-[14px]
                  font-bold
                  text-[#051A3A]

                  transition-all
                  duration-300

                  hover:bg-white

                  active:scale-[0.99]

                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-[#F6C343]
                  focus-visible:ring-offset-2
                  focus-visible:ring-offset-[#051A3A]

                  sm:w-fit

                  sm:justify-center
                  sm:px-6
                "
              >
                <span className="inline-flex items-center">
                  <FaWhatsapp
                    className="mr-2 h-5 w-5 flex-shrink-0 text-[#25D366]"
                    aria-hidden="true"
                  />
                  <span>Talk to a Dholera Expert</span>
                </span>

              </a>
            </div>
          </div>
        </div>
      </section>

      {/* BookMyAssets Section */}
      <section
        className="
          bg-[#051A3A]
          px-6
          py-8
          sm:px-6
          sm:py-16
          lg:px-6
          lg:pt-12
          lg:pb-16
        "
      >
        <div
          className="
            mx-auto
            grid
            max-w-7xl
            grid-cols-1

            gap-0

            lg:grid-cols-[minmax(0,.8fr)_minmax(0,1.2fr)]
            lg:items-start
            lg:gap-16
          "
        >
          {/* =====================================================
              HEADING

              Uses exact same typography as every other
              SectionHeading on the website.
          ====================================================== */}

          <SectionHeading inverse>
            Our Partnership with BookMyAssets
          </SectionHeading>

          {/* =====================================================
              CONTENT
          ====================================================== */}

          <div
            className="
              space-y-5

              text-base
              leading-8
              text-white/80

              md:text-lg
            "
          >
            <p>
              Dholera Insider is the exclusive channel partner of
              BookMyAssets, helping NRIs access verified residential
              plot projects in Dholera.
            </p>

            <p>
              Together, we focus on delivering transparent
              information, legal clarity, and professional guidance
              so overseas investors can make confident property
              decisions.
            </p>
          </div>
        </div>
      </section>



      <section
        className="bg-[#EEF2F9] px-6 py-8 sm:px-6 sm:py-16 lg:px-6 lg:pt-12 lg:pb-16"
      >
        <div className="mx-auto max-w-7xl">
          {/* =====================================================
              SECTION HEADING

              Mobile  : Left aligned
              Desktop : Center aligned
          ====================================================== */}
          <div
            className="
              mb-7
              text-left

              sm:mb-9

              md:mb-12
              md:text-center
            "
          >
            <h2
              className="
                text-[clamp(1.75rem,3.4vw,2.75rem)]
                font-bold
                leading-tight
                tracking-[-0.025em]
                text-[#051A3A]
              "
            >
              Why Choose Dholera Insider?
            </h2>

            <div
              aria-hidden="true"
              className="
                mt-3
                h-1
                w-16
                rounded-full
                bg-[#F6C343]

                md:mx-auto
              "
            />
          </div>

          {/* =====================================================
              REASONS GRID
          ====================================================== */}
          <div
            className="
              grid
              grid-cols-1
              gap-4

              sm:gap-5

              md:grid-cols-2

              lg:grid-cols-3
              lg:gap-6
            "
          >
            {reasons.map(({ Icon, title, description }) => (
              <article
                key={title}
                className="
                  group
                  flex
                  h-full
                  flex-col

                  rounded-2xl

                  border
                  border-[#051A3A]/10

                  bg-white

                  px-5
                  py-5

                  shadow-[0_4px_16px_rgba(5,26,58,0.045)]

                  transition-all
                  duration-300

                  sm:px-6
                  sm:py-6

                  lg:hover:-translate-y-1
                  lg:hover:border-[#F6C343]/50
                  lg:hover:shadow-[0_14px_32px_rgba(5,26,58,0.08)]
                "
              >
                {/* =================================================
                    ICON + TITLE
                ================================================== */}
                <div
                  className="
                    flex
                    min-h-[48px]
                    items-center
                    gap-3.5
                  "
                >
                  {/* Icon */}
                  <div
                    className="
                      flex
                      h-11
                      w-11
                      shrink-0
                      items-center
                      justify-center

                      rounded-xl

                      bg-[#F6C343]/20

                      transition-all
                      duration-300

                      sm:h-12
                      sm:w-12

                      lg:group-hover:bg-[#F6C343]/30
                    "
                  >
                    <Icon
                      className="
                        h-5
                        w-5
                        text-[#051A3A]

                        sm:h-[22px]
                        sm:w-[22px]
                      "
                      strokeWidth={1.7}
                      aria-hidden="true"
                    />
                  </div>

                  {/* Title */}
                  <h3
                    className="
                      min-w-0
                      flex-1

                      text-[16px]
                      font-bold
                      leading-[1.35]
                      tracking-[-0.015em]
                      text-[#051A3A]

                      sm:text-[17px]

                      lg:text-[18px]
                    "
                  >
                    {title}
                  </h3>
                </div>

                {/* =================================================
                    DIVIDER
                ================================================== */}
                <div
                  aria-hidden="true"
                  className="
                    my-4
                    h-px
                    w-full
                    bg-[#051A3A]/10

                    sm:my-5
                  "
                />

                {/* =================================================
                    DESCRIPTION
                ================================================== */}
                <p
                  className="
                    text-[14px]
                    leading-[1.75]
                    text-[#566174]

                    sm:text-[15px]
                    sm:leading-7
                  "
                >
                  {description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>


<section
  className="relative overflow-hidden bg-[#F6F8FB] px-6 py-8 sm:px-6 sm:py-16 lg:px-6 lg:pt-12 lg:pb-16"
>
  {/* =====================================================
      BACKGROUND DECORATION
  ====================================================== */}

  <div
    aria-hidden="true"
    className="
      pointer-events-none
      absolute
      -left-32
      top-0
      h-64
      w-64
      rounded-full
      bg-[#F6C343]/[0.06]
      blur-3xl
    "
  />

  <div
    aria-hidden="true"
    className="
      pointer-events-none
      absolute
      -right-28
      bottom-0
      h-64
      w-64
      rounded-full
      bg-[#051A3A]/[0.03]
      blur-3xl
    "
  />

  <div className="relative z-10 mx-auto max-w-7xl">
    {/* =====================================================
        SECTION HEADING
    ====================================================== */}

    <div
      className="
        mb-9
        text-left

        sm:mb-10

        md:text-center

        lg:mb-11
      "
    >
      <h2
        className="
          text-[clamp(1.75rem,3.4vw,2.75rem)]
          font-bold
          leading-[1.1]
          tracking-[-0.03em]
          text-[#051A3A]
        "
      >
        What We Believe
      </h2>

      <div
        aria-hidden="true"
        className="
          mt-3
          h-[3px]
          w-14
          rounded-full
          bg-[#F6C343]

          md:mx-auto
        "
      />
    </div>

    {/* =====================================================
        BELIEF CARDS
    ====================================================== */}

    <div
      className="
        grid
        grid-cols-1
        items-start
        justify-items-center

        gap-x-5
        gap-y-10

        pt-4

        sm:grid-cols-2
        sm:justify-items-stretch
        sm:gap-x-5
        sm:gap-y-11

        lg:grid-cols-4
        lg:gap-x-5
        lg:gap-y-0
      "
    >
      {beliefs.map(({ Icon, title, description }, index) => {
        const darkBadge = index % 2 === 0;

        return (
          <article
            key={title}
            className="
              group
              relative

              w-full
              max-w-[330px]

              rounded-[18px]

              border
              border-[#DCE2EA]

              bg-white

              px-5
              pb-5
              pt-10

              text-center

              shadow-[0_5px_18px_rgba(5,26,58,0.05)]

              transition-all
              duration-300
              ease-out

              hover:-translate-y-1
              hover:border-[#E5C25C]
              hover:shadow-[0_12px_26px_rgba(5,26,58,0.08)]

              sm:max-w-none
              sm:px-5
              sm:pb-5
              sm:pt-11

              lg:px-5
              lg:pb-5
              lg:pt-11
            "
          >
            {/* =================================================
                TOP GOLD ACCENT
            ================================================== */}

            <div
              aria-hidden="true"
              className="
                absolute
                left-1/2
                top-0

                h-[3px]
                w-12

                -translate-x-1/2

                rounded-b-full
                bg-[#F6C343]
              "
            />

            {/* =================================================
                FLOATING ICON
            ================================================== */}

            <div
              className={`
                absolute
                -top-[29px]
                left-1/2

                flex
                h-[58px]
                w-[58px]

                -translate-x-1/2

                items-center
                justify-center

                rounded-[17px]

                border-[4px]
                border-[#F6F8FB]

                shadow-[0_7px_17px_rgba(5,26,58,0.14)]

                transition-all
                duration-300
                ease-out

                group-hover:-translate-x-1/2
                group-hover:-translate-y-1

                sm:h-[60px]
                sm:w-[60px]

                ${
                  darkBadge
                    ? "bg-[#051A3A] text-[#F6C343]"
                    : "bg-[#F6C343] text-[#051A3A]"
                }
              `}
            >
              <Icon
                className="
                  h-[25px]
                  w-[25px]

                  sm:h-[27px]
                  sm:w-[27px]
                "
                strokeWidth={1.7}
                aria-hidden="true"
              />
            </div>


            {/* =================================================
                TITLE
            ================================================== */}

            <h3
              className="
                mt-1

                text-[17px]
                font-bold
                leading-[1.3]
                tracking-[-0.015em]
                text-[#051A3A]

                sm:text-[18px]
              "
            >
              {title}
            </h3>

            {/* =================================================
                GOLD DIVIDER
            ================================================== */}

            <div
              aria-hidden="true"
              className="
                mx-auto
                my-2.5

                h-[2px]
                w-7

                rounded-full
                bg-[#F6C343]

                transition-all
                duration-300

                group-hover:w-10
              "
            />

            {/* =================================================
                DESCRIPTION
            ================================================== */}

            <p
              className="
                mx-auto
                max-w-[245px]

                text-[13.5px]
                leading-[1.6]
                text-[#657083]

                sm:max-w-[255px]
                sm:text-[14px]
                sm:leading-[1.65]
              "
            >
              {description}
            </p>
          </article>
        );
      })}
    </div>
  </div>
</section>
    </main>
  );
}
