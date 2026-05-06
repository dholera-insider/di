import React from "react";
import Image from "next/image";
import sample1 from "@/app/assets/home/Invest_in_dholera2.webp";

export default function WhyDI() {
  return (
    <section className="bg-gradient-to-br from-gray-900 via-slate-800 to-teal-900">
      <div className="mx-auto max-w-6xl px-[clamp(1rem,4vw,3rem)] py-[clamp(2.5rem,6vw,5rem)]">
        <div className="text-center">
          <h2 className="text-[clamp(1.5rem,3vw,2.5rem)] font-bold leading-[clamp(2rem,4vw,3.5rem)] text-white">
            Why Choose <span className="text-teal-400">Dholera Insider</span>
          </h2>
          <div className="mx-auto mt-4 h-1 w-32 rounded-full bg-gradient-to-r from-teal-400 to-teal-600" />
        </div>

        <div className="grid items-center gap-[clamp(1.5rem,3vw,3rem)] py-[clamp(2rem,4vw,3.5rem)] md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
          <div className="space-y-[clamp(1rem,2vw,2rem)]">
            <p className="text-[clamp(1rem,1.4vw,1.125rem)] leading-[1.7] text-gray-100">
              Dholera Insider is a Dholera-focused real estate developer offering residential plotted developments in Dholera Smart City and Dholera SIR. We develop premium residential plot projects for buyers looking for direct developer inventory, clear-title documentation, strategic locations, and long-term investment potential.
            </p>
            <p className="text-[clamp(1rem,1.4vw,1.125rem)] leading-[1.7] text-gray-100">
              Our focus is simple: create planned residential plot projects in high-potential Dholera locations and offer them directly to buyers.
            </p>
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
