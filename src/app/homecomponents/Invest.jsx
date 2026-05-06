import React from "react";
import Image from "next/image";
import sample1 from "@/app/assets/home/Invest_in_dholera.webp";

export default function Invest() {
  return (
    <section className="bg-gradient-to-br from-gray-900 via-slate-800 to-teal-900">
      <div className="mx-auto max-w-7xl px-[clamp(1rem,4vw,3rem)] py-[clamp(2.5rem,6vw,5rem)]">
        <div className="text-center">
          <h2 className="mx-auto max-w-7xl text-[clamp(1.5rem,3vw,2.5rem)] font-bold leading-[clamp(2rem,4vw,3.5rem)] text-white">
            <span className="text-teal-400">Dholera Smart City</span> -
            India's Future-Ready Investment Destination
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
              Dholera Smart City, also known as Dholera SIR (Special Investment Region), is India's first greenfield smart city being developed under the Delhi-Mumbai Industrial Corridor. It is a fully planned city being built from scratch with modern infrastructure like wide roads, underground utilities, and separate zones for residential, commercial, and industrial use. Dholera Smart City is supported by major projects such as the Dholera International Airport, Ahmedabad-Dholera Expressway, and the Tata Semiconductor Plant, which are expected to improve connectivity and bring industrial growth.
            </p>

            <p className="text-[clamp(1rem,1.4vw,1.125rem)] leading-[1.7] text-gray-100">
              With strong government support and future-focused planning, Dholera Smart City is becoming a popular choice for real estate investment. It offers a good mix of affordability, planned development, and long-term growth potential, making it suitable for buyers looking to invest early in a developing smart city.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
