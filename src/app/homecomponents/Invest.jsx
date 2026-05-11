import React from "react";
import Image from "next/image";
import sample1 from "@/app/assets/home/Invest_in_dholera.webp";

export default function Invest() {
  return (
    <section className="bg-gradient-to-br from-gray-900 via-slate-800 to-teal-900">
      <div className="mx-auto max-w-7xl px-[clamp(1rem,4vw,3rem)] py-[clamp(2.5rem,6vw,5rem)]">
        <div className="text-center">
          <h2 className="mx-auto max-w-7xl text-[clamp(1.5rem,3vw,2.5rem)] font-bold leading-[clamp(2rem,4vw,3.5rem)] text-white">
            <span className="text-teal-400">Dholera Smart City</span> - India's
            Future Investment Hub
          </h2>
          <div className="mx-auto mt-4 h-1 w-32 rounded-full bg-gradient-to-r from-teal-400 to-teal-600" />
        </div>

        <div className="mx-auto grid max-w-7xl items-center gap-[clamp(1.5rem,3vw,3rem)] py-[clamp(2rem,4vw,3.5rem)] md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
          <div className="w-full">
            <Image
              src={sample1}
              alt="Dholera Smart City Investment"
              className="h-auto w-full rounded-lg object-cover"
            />
          </div>

          <div className="space-y-[clamp(1rem,2vw,2rem)]">
            <p className="text-[clamp(1rem,1.4vw,1.125rem)] leading-[1.7] text-gray-100">
              Dholera Smart City is India’s first planned greenfield smart city
              under the Delhi-Mumbai Industrial Corridor (DMIC) Project. The
              city is being developed with modern infrastructure, wide roads,
              underground utilities, and dedicated residential, commercial, and
              industrial zones. <br /> Major projects like the Dholera International Airport,
              Ahmedabad-Dholera Expressway, and the Tata Semiconductor Plant
              boosts connectivity, jobs, and industrial growth in Dholera.
            </p>

            <p className="text-[clamp(1rem,1.4vw,1.125rem)] leading-[1.7] text-gray-100">
              Due to strong government support, planned infrastructure, and
              future development potential, Dholera Smart City is becoming a
              popular destination for real estate investment. Many investors
              prefer Dholera for affordable plot prices, long-term growth
              opportunities, and smart city development.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
