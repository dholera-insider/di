"use client";

import { useEffect, useRef } from "react";

import {
  ShieldCheck,
  Building2,
  IndianRupee,
  FileText,
  Laptop,
  Users,
  CircleCheck,
} from "lucide-react";

/* =========================================================
   GET IN TOUCH ITEMS
========================================================= */
const contactTopics = [
  {
    title: "Verified residential plot projects",
    icon: ShieldCheck,
  },
  {
    title: "Dholera Smart City investment opportunities",
    icon: Building2,
  },
  {
    title: "Project pricing and availability",
    icon: IndianRupee,
  },
  {
    title: "Legal documentation guidance",
    icon: FileText,
  },
  {
    title: "Remote buying process",
    icon: Laptop,
  },
  {
    title: "NRI investment assistance",
    icon: Users,
  },
];
/* =========================================================
   GET IN TOUCH SECTION
========================================================= */

export default function GetInTouch() {
  const sectionRef = useRef(null);

  /* =======================================================
     SCROLL REVEAL
  ======================================================= */

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const items =
      section.querySelectorAll("[data-reveal]");

    const prefersReducedMotion =
      window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

    if (prefersReducedMotion) {
      items.forEach((item) => {
        item.classList.remove(
          "opacity-0",
          "translate-y-4",
        );

        item.classList.add(
          "opacity-100",
          "translate-y-0",
        );
      });

      return;
    }

    const observer =
      new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) {
              return;
            }

            entry.target.classList.remove(
              "opacity-0",
              "translate-y-4",
            );

            entry.target.classList.add(
              "opacity-100",
              "translate-y-0",
            );

            observer.unobserve(
              entry.target,
            );
          });
        },
        {
          threshold: 0.14,
          rootMargin:
            "0px 0px -35px 0px",
        },
      );

    items.forEach((item) =>
      observer.observe(item),
    );

    return () =>
      observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="get-in-touch"
      aria-labelledby="get-in-touch-heading"
      className="
        relative
        isolate
        overflow-hidden
        bg-[#FDFCFA]
        px-5
        py-14

        sm:px-7
        sm:py-16

        lg:px-10
        lg:py-20

        xl:py-24
      "
    >
      {/* =====================================================
          BACKGROUND DECORATION
      ====================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          -z-20
        "
       
      />

      {/* Very subtle grid */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          -z-10
          opacity-[0.022]
        "
       
      />

      {/* =====================================================
          MAIN CONTAINER
      ====================================================== */}

      <div
        className="
          relative
          mx-auto
          w-full
          max-w-7xl
        "
      >
        <div
          className="
            grid
            grid-cols-1
            items-start
            gap-10

            lg:grid-cols-[0.72fr_1.28fr]
            lg:gap-14

            xl:gap-20
          "
        >
          {/* =================================================
              LEFT CONTENT
          ================================================== */}

            <div
            data-reveal
            className="
                translate-y-4
                opacity-0
                transition-all
                duration-700
                ease-out

                lg:sticky
                lg:top-28
            "
            >
            {/* Small eyebrow */}

            <div
                className="
                mb-4
                flex
                items-center
                gap-3
                "
            >
                <span
                aria-hidden="true"
                className="
                    h-[2px]
                    w-8
                    rounded-full
                    bg-[#F6C343]
                "
                />

                <span
                className="
                    text-[11px]
                    font-bold
                    uppercase
                    tracking-[0.18em]
                    text-[#B67E00]

                    sm:text-xs
                "
                >
                Dholera Insider
                </span>
            </div>

            {/* Heading */}

            <h2
                id="get-in-touch-heading"
                className="
                max-w-[520px]
                text-[clamp(2rem,5vw,3.5rem)]
                font-bold
                leading-[1.04]
                tracking-[-0.045em]
                text-[#051A3A]
                "
            >
                Get in Touch
            </h2>

            {/* Gold underline */}

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

            {/* Intro */}

            <p
                className="
                mt-6
                max-w-[440px]
                text-[14px]
                leading-7
                text-[#667085]

                sm:text-[15px]

                lg:text-base
                lg:leading-8
                "
            >
                Connect with our team to discuss:
            </p>

            {/* Decorative desktop line */}

            <div
                aria-hidden="true"
                className="
                mt-8
                hidden
                h-px
                max-w-[340px]
                bg-gradient-to-r
                from-[#051A3A]/15
                to-transparent

                lg:block
                "
            />
            </div>

          {/* =================================================
              RIGHT TOPIC LIST
          ================================================== */}

          <div className="relative min-w-0">
            {/* =================================================
                MOBILE CONNECTOR

                Creates the vertical visual flow from
                your reference without cluttering desktop.
            ================================================== */}

            <div
              aria-hidden="true"
              className="
                absolute
                bottom-8
                left-[21px]
                top-8
                z-0
                w-px
                bg-gradient-to-b
                from-[#F6C343]/65
                via-[#E2D39B]
                to-transparent

                sm:left-[23px]

                lg:hidden
              "
            />

            {/* =================================================
                TOPICS

                Phone:
                1 column

                Desktop:
                2 columns
            ================================================== */}

            <div
              className="
                grid
                grid-cols-1
                gap-3

                sm:gap-4

                lg:grid-cols-2
              "
            >
              {contactTopics.map(
                (
                  topic,
                  index,
                ) => {
                  const Icon =
                    topic.icon;

                  return (
                    <article
                      key={topic.title}
                      data-reveal
                      style={{
                        transitionDelay: `${
                          index * 65
                        }ms`,
                      }}
                      className="
                        group
                        relative
                        z-10
                        translate-y-4
                        opacity-0
                        transition-all
                        duration-700
                        ease-out
                      "
                    >
                      <div
                        className="
                          relative
                          flex
                          min-h-[76px]
                          items-center
                          gap-3.5
                          overflow-hidden
                          rounded-[16px]
                          border
                          border-[#DDE3EC]
                          bg-white
                          px-3.5
                          py-3.5

                          transition-all
                          duration-300

                          hover:-translate-y-[2px]
                          hover:border-[#F6C343]/70
                          hover:shadow-[0_12px_32px_rgba(5,26,58,.07)]

                          sm:min-h-[84px]
                          sm:gap-4
                          sm:px-4

                          lg:min-h-[96px]
                          lg:px-5
                          lg:py-4
                        "
                      >
                        {/* ===================================
                            GOLD LEFT ACCENT
                        ==================================== */}

                        <div
                          aria-hidden="true"
                          className="
                            absolute
                            inset-y-3
                            left-0
                            w-[3px]
                            origin-bottom
                            scale-y-0
                            rounded-r-full
                            bg-[#F6C343]

                            transition-transform
                            duration-300

                            group-hover:scale-y-100
                          "
                        />

                        {/* ===================================
                            ICON
                        ==================================== */}

                        <div
                          className="
                            relative
                            z-10
                            grid
                            h-11
                            w-11
                            shrink-0
                            place-items-center
                            rounded-full
                            border
                            border-[#E7D69A]
                            bg-[#FFF8DE]
                            text-[#C48700]

                            transition-all
                            duration-300

                            group-hover:scale-105
                            group-hover:border-[#F6C343]
                            group-hover:bg-[#F6C343]
                            group-hover:text-[#051A3A]

                            sm:h-12
                            sm:w-12
                          "
                        >
                          <Icon
                            className="
                              h-[19px]
                              w-[19px]

                              sm:h-5
                              sm:w-5
                            "
                            strokeWidth={
                              1.8
                            }
                            aria-hidden="true"
                          />
                        </div>

                        {/* ===================================
                            TITLE
                        ==================================== */}

                        <div
                          className="
                            min-w-0
                            flex-1
                          "
                        >
                          <h3
                            className="
                              text-[13.5px]
                              font-semibold
                              leading-[1.45]
                              tracking-[-0.012em]
                              text-[#051A3A]

                              sm:text-[14px]

                              lg:text-[15px]
                            "
                          >
                            {topic.title}
                          </h3>
                        </div>
                      </div>
                    </article>
                  );
                },
              )}
            </div>

            {/* =================================================
                BOTTOM VISUAL NOTE

                Decorative only. No new copy is introduced.
            ================================================== */}

            <div
              aria-hidden="true"
              className="
                mt-6
                hidden
                h-px
                w-full
                bg-gradient-to-r
                from-transparent
                via-[#D8DEE8]
                to-transparent

                lg:block
              "
            />
          </div>
        </div>
      </div>
    </section>
  );
}