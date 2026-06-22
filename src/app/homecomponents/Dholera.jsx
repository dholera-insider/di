import React from "react";

export default function Dholera() {
  const benefits = [
    {
      title: "1. India's Planned Greenfield Smart City",
      description:
        "Dholera Smart City is being developed with proper planning from the beginning. Roads, residential zones, industrial areas, utilities, drainage, and public infrastructure are planned in advance, unlike many cities that grow without proper structure.",
    },
    {
      title: "2. Strong Industrial Growth Potential",
      description:
        "Dholera is planned as a major industrial and business hub. With upcoming industries, semiconductor projects, logistics zones, and manufacturing opportunities, the city is expected to create future demand for housing, commercial spaces, and investment properties.",
    },
    {
      title: "3. Excellent Connectivity",
      description:
        "Dholera Smart City is connected with major infrastructure projects like the Ahmedabad-Dholera Expressway, upcoming Dholera International Airport, nearby railway access, and major state highways. This makes it a strong location for future growth.",
    },
    {
      title: "4. Affordable Early Investment Opportunity",
      description:
        "Compared to developed cities like Delhi and Gurgaon, Dholera still offers affordable land investment options. Buyers can invest in clear-title and registry-ready plots at an early stage and benefit from the long-term growth potential of Dholera Smart City.",
    },
  ];

  return (
    <section className="bg-gradient-to-br from-gray-900 via-slate-800 to-[#051A3A]">
      <div className="mx-auto max-w-7xl px-[clamp(1rem,4vw,3rem)] py-[clamp(2.5rem,6vw,5rem)]">
        <div className="mb-[clamp(1.5rem,3vw,3rem)] text-center">
          <h2 className="max-w-7xl mx-auto text-[clamp(1.5rem,3vw,2.5rem)] font-bold leading-[clamp(2rem,4vw,3.5rem)] text-white">
            What Makes Dholera Smart City Different from Other Cities in India
          </h2>
          <div className="mx-auto mt-4 h-1 w-32 rounded-full bg-gradient-to-r from-[#F6C343] to-[#e3ae25]" />
          
        </div>

        <div className="grid grid-cols-1 gap-[clamp(1rem,2vw,2rem)] md:grid-cols-2">
          {benefits.map((benefit) => (
            <article
              key={benefit.title}
              className="h-full rounded-lg border border-white/20 bg-white/10 p-[clamp(1.25rem,2.5vw,2rem)] backdrop-blur-sm transition-all duration-300 hover:bg-white/15"
            >
              <h3 className="mb-3 text-[clamp(1.125rem,2vw,1.5rem)] font-semibold leading-[1.4] text-[#F6C343]">
                {benefit.title}
              </h3>
              <p className="text-[clamp(1rem,1.4vw,1.125rem)] leading-[1.7] text-gray-100">
                {benefit.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
