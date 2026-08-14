import React from "react";

const steps = [
  { number: "01", label: "Speak With RM" },
  { number: "02", label: "Explore Projects" },
  { number: "03", label: "Review Documents" },
  { number: "04", label: "Book Your Plot" },
  { number: "05", label: "Complete Payment" },
  { number: "06", label: "Get Registry" },
];

export default function RemoteBuying() {
  return (
    <section className="bg-[#EEF2F9] px-4 py-[clamp(3.5rem,6vw,5rem)] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Header — split */}
        <div className="mb-4 text-center grid grid-cols-1 gap-6 md:mb-4 lg:items-end lg:gap-16">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-widest text-[#F6C343]">
              Remote Buying
            </p>
            <h2 className="text-[clamp(1.75rem,3vw,2.5rem)] font-bold leading-tight text-[#051A3A]">
              Buy Your Dholera Plot from Anywhere
            </h2>
          </div>
          {/* <div>
            <p className="text-base leading-relaxed text-[#2B364D]">
              You don't need to travel to India to begin your investment
              journey.
            </p>
          </div> */}
        </div>

        {/* Step timeline */}
        <div className="relative">
          <h3 className="mb-8 text-center text-xl font-bold text-[#051A3A] sm:text-2xl">
            Simple Buying Process
          </h3>

          {/* Connecting line — desktop only */}
          <div className="absolute left-0 right-0 top-[4.75rem] hidden h-px bg-[#051A3A]/15 lg:block" />

          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
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

        <div className="mt-10 flex justify-center">
          <a
            href="https://wa.me/919211820887?text=Hello%2C%20I%20am%20interested%20in%20buying%20a%20plot%20in%20Dholera.%20Please%20share%20the%20details."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-12 items-center justify-center rounded-lg bg-[#051A3A] px-7 py-3 text-base font-bold text-[#FDFCFA] shadow-lg transition-colors hover:bg-[#F6C343] hover:text-[#051A3A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F6C343] focus-visible:ring-offset-2"
          >
            Connect with RM
          </a>
        </div>
      </div>
    </section>
  );
}
