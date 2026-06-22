"use client";
import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import icon from "@/app/assets/building.svg";

const countries = [
  { name: "UAE", flag: "https://flagcdn.com/ae.svg", icon: icon },
  { name: "Bahrain", flag: "https://flagcdn.com/bh.svg", icon: icon },
  { name: "Singapore", flag: "https://flagcdn.com/sg.svg", icon: icon },
  { name: "Kuwait", flag: "https://flagcdn.com/kw.svg", icon: icon },
  { name: "Oman", flag: "https://flagcdn.com/om.svg", icon: icon },
  { name: "Saudi Arabia", flag: "https://flagcdn.com/sa.svg", icon: icon },
  { name: "Qatar", flag: "https://flagcdn.com/qa.svg", icon: icon },
];

export default function NRISupport() {
  const [current, setCurrent] = useState(0);
  const [visibleCount, setVisibleCount] = useState(4);
  const [step, setStep] = useState(3);

  useEffect(() => {
    const updateConfig = () => {
      const isMobile = window.innerWidth < 1024;
      setVisibleCount(isMobile ? 2 : 4);
      setStep(isMobile ? 2 : 3);
    };
    updateConfig();
    window.addEventListener("resize", updateConfig);
    return () => window.removeEventListener("resize", updateConfig);
  }, []);

  const gap = 16;
  const maxIndex = Math.max(countries.length - visibleCount, 0);
  const cardWidth = `calc((100% - ${(visibleCount - 1) * gap}px) / ${visibleCount})`;

  const next = () => setCurrent((prev) => Math.min(prev + step, maxIndex));
  const prev = () => setCurrent((prev) => Math.max(prev - step, 0));

  // Snap current to nearest valid page stop when config changes
  useEffect(() => {
    setCurrent((prev) => Math.min(prev, maxIndex));
  }, [maxIndex]);

  // Compute dot stops: 0, step, 2*step, ..., maxIndex
  const pageStops = [];
  for (let i = 0; i <= maxIndex; i += step) {
    pageStops.push(i);
  }
  if (pageStops[pageStops.length - 1] < maxIndex) {
    pageStops.push(maxIndex);
  }
  const activeDot = pageStops.indexOf(current);

  return (
    <section className="bg-[#EEF2F9] py-4 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 text-center">
          <h2 className="text-[clamp(1.75rem,3vw,2.5rem)] font-bold text-[#051A3A] mb-4">
            Dedicated Support for NRIs
          </h2>
          <div className="mx-auto mb-4 h-1 w-14 rounded-full bg-[#F6C343]" />
          <p className="max-w-2xl mx-auto text-[#2B364D]/80 leading-relaxed text-[clamp(0.9rem,1.2vw,1rem)]">
            Every country has different documentation requirements, investment
            concerns, and buying processes. Dholera Insider provides
            country-specific guidance to help overseas Indians invest with
            clarity and confidence. Explore dedicated guides for NRIs in:
          </p>
        </div>

        {/* Carousel */}
        <div className="flex items-center gap-3">
          {/* Left arrow */}
          <button
            onClick={prev}
            disabled={current === 0}
            className="shrink-0 rounded-full bg-white border border-[#2B364D]/10 p-2.5 text-[#051A3A] shadow-sm transition-all hover:bg-[#F6C343] hover:border-[#F6C343] hover:shadow-md disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Previous countries"
          >
            <ChevronLeft size={18} />
          </button>

          {/* Track */}
          <div className="overflow-hidden flex-1 py-3">
            <div
              className="flex gap-4 transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(calc(-${current} * (${cardWidth} + ${gap}px)))`,
              }}
            >
              {countries.map((country) => (
                <div
                  key={country.name}
                  className="group flex flex-col items-center gap-4 rounded-2xl border border-[#2B364D]/10 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:bg-[#051A3A] hover:border-[#051A3A] hover:shadow-xl cursor-pointer"
                  style={{ flex: `0 0 ${cardWidth}` }}
                >
                  {/* Flag */}
                  <div className="overflow-hidden rounded-lg shadow ring-1 ring-black/10">
                    <img
                      src={country.flag}
                      alt={`${country.name} flag`}
                      className="h-10 w-14 object-cover"
                    />
                  </div>

                  {/* Country name */}
                  <p className="text-sm font-semibold text-[#051A3A] group-hover:text-white transition-colors">
                    {country.name}
                  </p>

                  {/* Gold divider */}
                  <div className="h-px w-10 bg-[#F6C343] opacity-50 group-hover:opacity-100 transition-opacity" />

                  {/* Icon */}
                  <Image
                    src={country.icon}
                    alt={`${country.name} investment guide`}
                    className="h-10 w-10 object-contain opacity-50 group-hover:opacity-100 group-hover:brightness-[100] group-hover:invert transition-all sm:h-12 sm:w-12"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Right arrow */}
          <button
            onClick={next}
            disabled={current >= maxIndex}
            className="shrink-0 rounded-full bg-white border border-[#2B364D]/10 p-2.5 text-[#051A3A] shadow-sm transition-all hover:bg-[#F6C343] hover:border-[#F6C343] hover:shadow-md disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Next countries"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        {/* Dot indicators */}
        <div className="mt-7 flex justify-center gap-2">
          {pageStops.map((stop, i) => (
            <button
              key={stop}
              onClick={() => setCurrent(stop)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === activeDot
                  ? "w-7 bg-[#F6C343]"
                  : "w-2 bg-[#2B364D]/25 hover:bg-[#2B364D]/50"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}