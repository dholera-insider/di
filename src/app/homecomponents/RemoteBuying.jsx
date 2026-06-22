import React from "react";

const steps = [
  { number: "01", label: "Speak with our Dholera experts" },
  { number: "02", label: "Explore our projects" },
  { number: "03", label: "Review legal documents" },
  { number: "04", label: "Reserve your preferred plot" },
  { number: "05", label: "Complete payment" },
  { number: "06", label: "Registry & ownership" },
];

export default function RemoteBuying() {
  return (
    <section className="bg-[#EEF2F9] py-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Header — split */}
        <div className="mb-16 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-end lg:gap-20">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-widest text-[#F6C343]">
              Remote Buying
            </p>
            <h2 className="text-[clamp(1.75rem,3vw,2.5rem)] font-bold leading-tight text-[#051A3A]">
              Buy Your Dholera Plot From Anywhere
            </h2>
          </div>
          <div>
            <div className="mb-5 h-px w-14 bg-[#F6C343]" />
            <p className="text-base leading-relaxed text-[#2B364D]">
              You don't have to travel to India to begin your investment
              journey. Our remote buying process is designed to make purchasing
              a residential plot simple and convenient for NRIs worldwide.
            </p>
          </div>
        </div>

        {/* Step timeline */}
        <div className="relative">

          {/* Connecting line — desktop only */}
          <div className="absolute top-5 left-0 right-0 hidden h-px bg-[#051A3A]/15 lg:block" />

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-6 lg:gap-4">
            {steps.map(({ number, label }) => (
              <div
                key={number}
                className="flex flex-col items-center gap-4 text-center"
              >
                {/* Numbered circle — ring masks the line */}
                <div className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full bg-[#051A3A] text-sm font-bold text-[#F6C343] ring-4 ring-[#EEF2F9]">
                  {number}
                </div>
                <p className="text-[0.95rem] font-medium text-[#2B364D]">
                  {label}
                </p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}