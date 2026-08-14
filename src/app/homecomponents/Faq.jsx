"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";

const faqs = [
  {
    question: "Can NRIs buy residential plots in Dholera?",
    answer:
      "Yes. Eligible NRIs can purchase residential plots in India in accordance with applicable Indian laws and regulations.",
  },
  {
    question: "Can I invest without visiting India?",
    answer:
      "Yes. The buying process can generally be completed remotely with the required documentation and legal formalities.",
  },
  {
    question: "What documents should I verify?",
    answer:
      "Review the project details, title documents, NA/NOC, layout plan, pricing, and registry process before making a decision.",
  },
  {
    question: "Why choose Dholera Insider?",
    answer:
      "Dholera Insider is the exclusive channel partner of BookMyAssets for NRI investors, providing verified residential plot opportunities, transparent guidance, and end-to-end support.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="bg-[#FDFCFA] px-4 py-[clamp(3.5rem,6vw,5rem)] sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:gap-16">
        <div>
          <h2 className="text-[clamp(1.75rem,3vw,2.5rem)] font-bold leading-tight text-[#051A3A]">
            FAQ
          </h2>
          <div className="mt-4 h-1 w-14 rounded-full bg-[#F6C343]" />
        </div>

        <div className="divide-y divide-[#2B364D]/15 border-y border-[#2B364D]/15">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div key={faq.question}>
                <button
                  type="button"
                  className="flex min-h-14 w-full items-center justify-between py-4 text-left"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  aria-expanded={isOpen}
                >
                  <span className="pr-4 text-base font-semibold leading-relaxed text-[#162033]">
                    {faq.question}
                  </span>
                  {isOpen ? (
                    <Minus className="h-5 w-5 shrink-0 text-[#F6C343]" />
                  ) : (
                    <Plus className="h-5 w-5 shrink-0 text-[#F6C343]" />
                  )}
                </button>

                <div
                  className={`grid transition-all duration-300 ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="pb-5 text-sm leading-7 text-[#2B364D]">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
