"use client";

import { useEffect, useRef } from "react";
import { Building2, Landmark, Factory, Route, TrendingUp } from "lucide-react";

const benefits = [
  {
    title: "India’s First Planned Smart City",
    icon: Building2,
  },
  {
    title: "Government-Backed Development",
    icon: Landmark,
  },
  {
    title: "Major Industrial Investments",
    icon: Factory,
  },
  {
    title: "World-Class Connectivity",
    icon: Route,
  },
  {
    title: "Long-Term Investment Potential",
    icon: TrendingUp,
  },
];

export default function WhyDholera() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const items = section.querySelectorAll("[data-reveal]");

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      items.forEach((item) => {
        item.classList.remove("opacity-0", "translate-y-4");
        item.classList.add("opacity-100", "translate-y-0");
      });

      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          entry.target.classList.remove("opacity-0", "translate-y-4");

          entry.target.classList.add("opacity-100", "translate-y-0");

          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -30px 0px",
      },
    );

    items.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="why-dholera-heading"
      className="
        relative
        overflow-hidden
        bg-[#EEF2F9]
        px-4
        py-14
        sm:px-6
        sm:py-16
        lg:px-8
        lg:py-20
      "
    >
      {/* Background decoration */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -left-32
          top-10
          h-72
          w-72
          rounded-full
          bg-[#051A3A]/[0.035]
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
          bg-[#F6C343]/10
          blur-3xl
        "
      />

      <div className="relative mx-auto w-full max-w-5xl">
        {/* Heading */}
        <div
          data-reveal
          className="
            mb-8
            translate-y-4
            opacity-0
            transition-all
            duration-700
            ease-out
            sm:mb-10
          "
        >
          <div className="flex items-center gap-3">
           

            <h2
              id="why-dholera-heading"
              className="
                text-3xl
                font-bold
                leading-tight
                tracking-[-0.03em]
                text-[#051A3A]
                sm:text-4xl
                lg:text-[40px]
              "
            >
              Why Dholera ?
            </h2>
          </div>
        </div>

        {/* Benefits */}
        <ul
          className="
            relative
            flex
            flex-col
            gap-3
            sm:gap-4
          "
        >
          {/* Vertical connector */}
          <div
            aria-hidden="true"
            className="
              absolute
              bottom-8
              left-[31px]
              top-8
              hidden
              w-px
              bg-gradient-to-b
              from-[#051A3A]/15
              via-[#E8ECF2]
              to-[#F6C343]/50
              sm:block
            "
          />

          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;

            return (
              <li
                key={benefit.title}
                data-reveal
                style={{
                  transitionDelay: `${index * 70}ms`,
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
                    grid
                    min-h-[76px]
                    grid-cols-[50px_minmax(0,1fr)]
                    items-center
                    gap-3
                    overflow-hidden
                    rounded-[14px]
                    border
                    border-[#E8ECF2]
                    bg-white
                    px-3
                    py-3
                    shadow-[0_8px_28px_rgba(5,26,58,0.05)]
                    transition-all
                    duration-300

                    hover:-translate-y-[2px]
                    hover:border-[#F6C343]/60
                    hover:shadow-[0_14px_36px_rgba(5,26,58,0.09)]

                    sm:grid-cols-[64px_minmax(0,1fr)_40px]
                    sm:gap-4
                    sm:px-4
                    sm:py-4

                    lg:min-h-[84px]
                    lg:px-5
                  "
                >
                  {/* Left hover accent */}
                  <div
                    aria-hidden="true"
                    className="
                      absolute
                      bottom-3
                      left-0
                      top-3
                      w-[3px]
                      rounded-r-full
                      bg-[#F6C343]
                      opacity-0
                      transition-opacity
                      duration-300
                      group-hover:opacity-100
                    "
                  />

                  {/* Icon */}
                  <div className="flex items-center justify-center">
                    <span
                      aria-hidden="true"
                      className="
                        relative
                        z-10
                        flex
                        h-10
                        w-10
                        items-center
                        justify-center
                        rounded-xl
                        border
                        border-[#E8ECF2]
                        bg-[#EEF2F9]
                        text-[#051A3A]
                        transition-all
                        duration-300

                        group-hover:scale-105
                        group-hover:border-[#F6C343]
                        group-hover:bg-[#F6C343]

                        sm:h-12
                        sm:w-12
                      "
                    >
                      <Icon
                        size={21}
                        strokeWidth={1.8}
                        className="
                          transition-transform
                          duration-300
                          group-hover:scale-105
                        "
                      />
                    </span>
                  </div>

                  {/* Title */}
                  <div className="min-w-0">
                    <h3
                      className="
                        text-[15px]
                        font-semibold
                        leading-6
                        tracking-[-0.015em]
                        text-[#051A3A]
                        sm:text-[17px]
                        lg:text-lg
                      "
                    >
                      {benefit.title}
                    </h3>

                    <span
                      aria-hidden="true"
                      className="
                        mt-2
                        block
                        h-[2px]
                        w-6
                        rounded-full
                        bg-[#F6C343]
                        transition-all
                        duration-300
                        group-hover:w-10
                      "
                    />
                  </div>

                  {/* Right arrow */}
                  <div
                    aria-hidden="true"
                    className="
                      hidden
                      items-center
                      justify-center
                      sm:flex
                    "
                  >
                    <span
                      className="
                        relative
                        flex
                        h-8
                        w-8
                        items-center
                        justify-center
                        rounded-full
                        border
                        border-[#E8ECF2]
                        bg-[#EEF2F9]
                        transition-all
                        duration-300

                        group-hover:translate-x-1
                        group-hover:border-[#F6C343]
                        group-hover:bg-[#F6C343]
                      "
                    >
                      <span
                        className="
                          h-2
                          w-2
                          rotate-45
                          border-r-[1.5px]
                          border-t-[1.5px]
                          border-[#051A3A]
                        "
                      />
                    </span>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
