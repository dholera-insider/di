import React from "react";
import Image from "next/image";
import sample1 from "@/app/assets/home/Invest_in_dholera2.webp";

export default function WhyDI() {

  const COUNTERS = [
  { value: "7+ Projects", label: "Successfully Sold Out" },
  { value: "2 Lakh+ Sq. Yd", label: "Dholera Land Sold" },
  { value: "957+ Plots", label: "Registry Delivered" },
  { value: "561+ Clients", label: "Investor Client Base" },
];

  return (
    <section className="bg-gradient-to-br from-gray-900 via-slate-800 to-teal-900">
      <div className="mx-auto max-w-7xl px-[clamp(1rem,4vw,3rem)] py-[clamp(2.5rem,6vw,5rem)]">
        <div className="text-center">
          <h2 className="text-[clamp(1.5rem,3vw,2.5rem)] font-bold leading-[clamp(2rem,4vw,3.5rem)] text-white">
            Why Choose <span className="text-teal-400">Dholera Insider</span>
          </h2>
          <div className="mx-auto mt-4 h-1 w-32 rounded-full bg-gradient-to-r from-teal-400 to-teal-600" />
        </div>

        <div className="flex flex-col-reverse items-center gap-[clamp(1.5rem,3vw,3rem)] py-[clamp(2rem,4vw,3.5rem)] md:grid md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
          <div className="space-y-[clamp(1rem,2vw,2rem)]">
            <p className="text-[clamp(1rem,1.4vw,1.125rem)] leading-[1.7] text-gray-100">
              Dholera Insider is a leading Real Estate Developer offering verified
              plots in Dholera. We develop premium residential plot projects for
              buyers looking for direct developer inventory, registry ready
              documentation, clear guidance, and complete support before and
              after booking.{" "}
            </p>

            <div className="px-[calc(0.5rem+1vw)] max-w-7xl mx-auto">
              <div className="grid grid-cols-2 gap-[calc(0.75rem+0.5vw)]">
                {COUNTERS.map(({ value, label }) => (
                  <div
                    key={label}
                    className="
                    flex flex-col justify-center items-center
                    p-[calc(0.75rem+0.2vw)]
                    bg-white rounded-2xl shadow-md
                    hover:shadow-xl transition-shadow
                  "
                  >
                    <div className="text-[clamp(1.25rem,2.5vw,1.5rem)] font-bold text-teal-600 mb-2">
                      {value}
                    </div>
                    <p className="text-[clamp(0.75rem,1.5vw,0.875rem)] text-gray-700 font-medium text-center">
                      {label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="w-full">
            <Image
              src={sample1}
              alt="Dholera Insider"
              className="h-auto w-full rounded-lg object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
