"use client";
import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import Link from "next/link";

const faqs = [
  {
    question: "Are plots legally approved?",
    answer:
      "Yes, all plots are government approved with clear title and NA/NOC.",
  },
  {
    question: "What is the starting price?",
    answer: "Plots start from around ₹10 lakh.",
  },
  {
    question: "Are plots in WestWyn Residency legally approved?",
    answer:
      "Yes, WestWyn Residency offers govt approved residential plots with clear title, NA/NOC status, and registry-ready documentation.",
  },
  {
    question: "What is the starting price of WestWyn Residency?",
    answer:
      "The project offers affordable plot options starting from around ₹8 lakh, depending on plot size and current availability.",
  },
  {
    question: "Is WestWyn Residency good for investment?",
    answer:
      "Yes, it can be suitable for long-term Dholera investment because of its location, affordability, registry-ready documentation, and proximity to Dholera SIR growth zones.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((faq) => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer,
              },
            })),
          }),
        }}
      />

      <div className="">
        <div className="flex flex-col md:flex-row px-[clamp(1rem,4vw,2rem)] py-[clamp(1.5rem,4vw,2rem)] gap-[clamp(1.5rem,4vw,3rem)] max-w-7xl mx-auto">
          <div className="w-full md:w-2/5 md:pl-2 md:pr-2">
            <h2 className="text-[clamp(1.5rem,3vw,2rem)] font-semibold text-white mb-4">
              Frequently Asked Questions
            </h2>

            <p className="text-gray-200 mb-2">
              Got questions about WestWyn Residency?
            </p>

            <div className="pt-4">
              <Link
                className="px-4 py-3 bg-[#051A3A] text-white font-medium rounded-md hover:bg-[#2B364D] transition"
                href="tel:+918130371647"
              >
                Give Us A Missed Call
              </Link>
            </div>
          </div>

          <div className="w-full md:w-3/5 md:pl-[clamp(2rem,6vw,6rem)] md:pr-4 md:mt-0 space-y-1">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-white/20">
                <button
                  className="w-full py-[clamp(0.875rem,2vw,1rem)] flex justify-between items-center text-left hover:bg-white/5 transition-all duration-200"
                  onClick={() => toggleFAQ(index)}
                >
                  <span className="text-white font-medium pr-4 leading-relaxed">
                    {faq.question}
                  </span>

                  <span className="flex-shrink-0 transition-transform duration-200">
                    {openIndex === index ? (
                      <Minus className="w-5 h-5 text-white" />
                    ) : (
                      <Plus className="w-5 h-5 text-white" />
                    )}
                  </span>
                </button>

                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openIndex === index
                      ? "max-h-96 opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="pb-4">
                    <p className="text-gray-200 text-sm leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
