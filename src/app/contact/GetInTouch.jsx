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
      className="relative isolate overflow-hidden bg-white site-gutter section-space"
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
          -z-20
          bg-white
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
            gap-10

            lg:grid-cols-[0.72fr_1.28fr]
            lg:items-stretch
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
              flex
              translate-y-4
              flex-col
              justify-center
              opacity-0
              transition-all
              duration-700
              ease-out
            "
          >
            <div
              className="
                flex
                w-full
                max-w-[520px]
                flex-col
                items-start
                justify-center
                text-left
              "
            >
              {/* =============================================
                  DESKTOP EYEBROW
              ============================================== */}
              <div
                className="
                  mb-5
                  hidden
                  items-center
                  justify-start
                  gap-3

                  lg:flex
                "
              >
                {/* Yellow line */}
                <span
                  aria-hidden="true"
                  className="
                    h-[2px]
                    w-8
                    shrink-0
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

                    xl:text-xs
                  "
                >
                  Dholera Insider
                </span>
              </div>

              {/* =============================================
                  HEADING
              ============================================== */}
              <h2
                id="get-in-touch-heading"
                className="
                  max-w-[520px]
                  text-left
                  text-[clamp(2rem,5vw,3.5rem)]
                  font-bold
                  leading-[1.04]
                  tracking-[-0.045em]
                  text-[#051A3A]

                  lg:text-[48px]

                  xl:text-[54px]
                "
              >
                Connect with our team to discuss:
              </h2>

              {/* =============================================
                  GOLD UNDERLINE
              ============================================== */}
              <div
                aria-hidden="true"
                className="
                  mt-4
                  h-[3px]
                  w-12
                  rounded-full
                  bg-[#F6C343]
                "
              />

              {/* =============================================
                  DECORATIVE LINE
                  DESKTOP ONLY
              ============================================== */}
              <div
                aria-hidden="true"
                className="
                  mt-8
                  hidden
                  h-px
                  w-full
                  max-w-[300px]
                  bg-gradient-to-r
                  from-[#051A3A]/15
                  to-transparent

                  lg:block
                "
              />
            </div>
          </div>

          {/* =================================================
              RIGHT TOPIC LIST
          ================================================== */}
          <div className="relative min-w-0">
            {/* =================================================
                MOBILE CONNECTOR
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
            ================================================== */}
            <div
              className="
                grid
                grid-cols-1
                gap-3

                sm:gap-4

                lg:grid-cols-2
                lg:gap-4
              "
            >
              {contactTopics.map((topic, index) => {
                const Icon = topic.icon;

                return (
                  <article
                    key={topic.title}
                    data-reveal
                    style={{
                      transitionDelay: `${index * 65}ms`,
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
                        border-[#E5E8EE]
                        bg-[#FDFCFA]
                        px-3.5
                        py-3.5

                        transition-all
                        duration-300

                        hover:-translate-y-[2px]
                        hover:border-[#F6C343]/70
                        hover:bg-white
                        hover:shadow-[0_12px_32px_rgba(5,26,58,0.07)]

                        sm:min-h-[84px]
                        sm:gap-4
                        sm:px-4

                        lg:min-h-[96px]
                        lg:px-5
                        lg:py-4
                      "
                    >
                      {/* Gold hover accent */}
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

                      {/* ICON */}
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
                          bg-[#FFF7DD]
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
                          strokeWidth={1.8}
                          aria-hidden="true"
                        />
                      </div>

                      {/* TITLE */}
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
              })}
            </div>

            {/* =================================================
                BOTTOM DIVIDER
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