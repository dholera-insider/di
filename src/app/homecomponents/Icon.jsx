"use client";

import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

import icon from "@/app/assets/svg/Bahrain.svg";
import icon2 from "@/app/assets/svg/Dubai.svg";
import icon3 from "@/app/assets/svg/kuwait.svg";
import icon4 from "@/app/assets/svg/Oman.svg";
import icon5 from "@/app/assets/svg/Qatar.svg";
import icon6 from "@/app/assets/svg/Saudi Arabia.svg";
import icon7 from "@/app/assets/svg/Singapore.svg";

const countries = [
  {
    name: "UAE",
    flag: "https://flagcdn.com/ae.svg",
    icon: icon2,
  },
  {
    name: "Saudi Arabia",
    flag: "https://flagcdn.com/sa.svg",
    icon: icon6,
  },
  {
    name: "Bahrain",
    flag: "https://flagcdn.com/bh.svg",
    icon: icon,
  },
  {
    name: "Kuwait",
    flag: "https://flagcdn.com/kw.svg",
    icon: icon3,
  },
  {
    name: "Qatar",
    flag: "https://flagcdn.com/qa.svg",
    icon: icon5,
  },
  {
    name: "Oman",
    flag: "https://flagcdn.com/om.svg",
    icon: icon4,
  },
  {
    name: "Singapore",
    flag: "https://flagcdn.com/sg.svg",
    icon: icon7,
  },
];

export default function NRISupport() {
  const [current, setCurrent] = useState(0);
  const [visibleCount, setVisibleCount] = useState(4);
  const [step, setStep] = useState(3);

  useEffect(() => {
    const updateConfig = () => {
      const width = window.innerWidth;

      if (width < 640) {
        setVisibleCount(1);
        setStep(1);
      } else if (width < 1024) {
        setVisibleCount(2);
        setStep(2);
      } else {
        setVisibleCount(4);
        setStep(3);
      }
    };

    updateConfig();

    window.addEventListener("resize", updateConfig);

    return () => {
      window.removeEventListener("resize", updateConfig);
    };
  }, []);

  const gap = 28;

  const maxIndex = Math.max(countries.length - visibleCount, 0);

  const cardWidth = `calc(
    (100% - ${(visibleCount - 1) * gap}px) / ${visibleCount}
  )`;

  const next = () => {
    setCurrent((prev) => Math.min(prev + step, maxIndex));
  };

  const prev = () => {
    setCurrent((prev) => Math.max(prev - step, 0));
  };

  useEffect(() => {
    setCurrent((prev) => {
      const clampedCurrent = Math.min(prev, maxIndex);
      const stops = [];

      for (let i = 0; i <= maxIndex; i += step) {
        stops.push(i);
      }

      if (stops.length && stops[stops.length - 1] < maxIndex) {
        stops.push(maxIndex);
      }

      if (!stops.length) {
        return 0;
      }

      return stops.reduce(
        (closest, stop) =>
          Math.abs(stop - clampedCurrent) <
          Math.abs(closest - clampedCurrent)
            ? stop
            : closest,
        stops[0]
      );
    });
  }, [maxIndex, step]);

  const pageStops = [];

  for (let i = 0; i <= maxIndex; i += step) {
    pageStops.push(i);
  }

  if (
    pageStops.length &&
    pageStops[pageStops.length - 1] < maxIndex
  ) {
    pageStops.push(maxIndex);
  }

  const activeDot = pageStops.indexOf(current);

  return (
    <section className="bg-[#EEF2F9] px-4 py-[clamp(3.5rem,6vw,5rem)] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-10 text-center md:mb-12">
          <h2 className="mb-4 text-[clamp(1.75rem,3vw,2.5rem)] font-bold text-[#051A3A]">
            Invest in Dholera From Anywhere
          </h2>

        
          <div className="mx-auto mb-4 h-1 w-14 rounded-full bg-[#F6C343]" />

          <p className="mx-auto max-w-2xl text-[clamp(0.9rem,1.2vw,1rem)] leading-relaxed text-[#2B364D]">
            Get dedicated support designed for NRI investors.
          </p>
        </div>

        {/* Carousel */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Left Arrow */}
          <button
            type="button"
            onClick={prev}
            disabled={current === 0}
            className="
              shrink-0
              rounded-full
              border
              border-[#D7DFEA]
              bg-white
              p-2
              text-[#071E3D]
              shadow-sm
              transition-all
              duration-200
              hover:border-[#D8B95B]
              hover:bg-[#FFF9E8]
              hover:shadow-md
              disabled:cursor-not-allowed
              disabled:opacity-30
              sm:p-2.5
            "
            aria-label="Previous countries"
          >
            <ChevronLeft size={18} strokeWidth={2} />
          </button>

          {/* Carousel Track */}
          <div className="flex-1 overflow-hidden py-3">
            <div
              className="flex gap-7 transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(
                  calc(-${current} * (${cardWidth} + ${gap}px))
                )`,
              }}
            >
              {countries.map((country) => (
                <div
                  key={country.name}
                  className="
                    group
                    flex
                    min-h-[210px]
                    flex-col
                    items-center
                    justify-start
                    overflow-hidden
                    rounded-2xl
                    border
                    border-[#173353]
                    bg-[#071E3D]
                    px-4
                    py-3
                    shadow-[0_5px_18px_rgba(5,26,58,0.08)]
                    transition-all
                    duration-300
                    hover:border-[#D8B95B]/60
                    hover:shadow-[0_10px_26px_rgba(5,26,58,0.14)]
                    sm:min-h-[220px]
                    sm:px-5
                    lg:min-h-[225px]
                  "
                  style={{
                    flex: `0 0 ${cardWidth}`,
                  }}
                >
                  {/* Icon Area */}
                  <div
                    className="
                      flex
                      h-[140px]
                      w-full
                      shrink-0
                      items-center
                      justify-center
                      sm:h-[145px]
                      lg:h-[150px]
                    "
                  >
                    <div
                      className="
                        relative
                        h-[140px]
                        w-[140px]
                        sm:h-[150px]
                        sm:w-[150px]
                        lg:h-[160px]
                        lg:w-[160px]
                      "
                    >
                      <Image
                        src={country.icon}
                        alt={`${country.name} investment guide`}
                        fill
                        sizes="160px"
                        className="
                          object-contain
                          brightness-0
                          invert
                          opacity-90
                          transition-opacity
                          duration-300
                          group-hover:opacity-100
                        "
                      />
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="my-1 h-px w-full bg-white/10" />

                  {/* Country Information */}
                  <div
                    className="
                      mt-2
                      flex
                      min-h-[38px]
                      w-full
                      items-center
                      justify-center
                      gap-3
                    "
                  >
                    {/* Flag */}
                    <div
                      className="
                        h-[28px]
                        w-[44px]
                        shrink-0
                        overflow-hidden
                        rounded-md
                        border
                        border-white/10
                        bg-white
                        shadow-sm
                        sm:h-[30px]
                        sm:w-[46px]
                      "
                    >
                      <img
                        src={country.flag}
                        alt={`${country.name} flag`}
                        className="h-full w-full object-cover"
                      />
                    </div>

                    {/* Country Name */}
                    <p
                      className="
                        whitespace-nowrap
                        text-[13px]
                        font-semibold
                        leading-none
                        tracking-[0.01em]
                        text-[#F8FAFC]
                        sm:text-[14px]
                        lg:text-[15px]
                      "
                    >
                      {country.name}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Arrow */}
          <button
            type="button"
            onClick={next}
            disabled={current >= maxIndex}
            className="
              shrink-0
              rounded-full
              border
              border-[#D7DFEA]
              bg-white
              p-2
              text-[#071E3D]
              shadow-sm
              transition-all
              duration-200
              hover:border-[#D8B95B]
              hover:bg-[#FFF9E8]
              hover:shadow-md
              disabled:cursor-not-allowed
              disabled:opacity-30
              sm:p-2.5
            "
            aria-label="Next countries"
          >
            <ChevronRight size={18} strokeWidth={2} />
          </button>
        </div>

        {/* Dot Indicators */}
        <div className="mt-6 flex justify-center gap-2">
          {pageStops.map((stop, i) => (
            <button
              type="button"
              key={stop}
              onClick={() => setCurrent(stop)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === activeDot
                  ? "w-7 bg-[#F6C343]"
                  : "w-2 bg-[#2B364D]/20 hover:bg-[#2B364D]/40"
              }`}
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === activeDot ? "true" : undefined}
            />
          ))}
        </div>
      </div>
    </section>
  );
}