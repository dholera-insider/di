"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import Link from "next/link";

const faqs = [
  {
    question: "What is Dholera SIR?",
    answer:
      "Dholera SIR, also called Dholera Special Investment Region, is a planned greenfield smart city in Gujarat located around 100 km from Ahmedabad. It includes residential, industrial, and commercial zones designed for future growth.",
  },
  {
    question: "Is Dholera a good investment in 2026?",
    answer:
      "Yes, Dholera is considered a strong long-term investment option in 2026 as it is India’s first greenfield smart city with major infrastructure projects, industrial growth, and increasing connectivity.",
  },
  {
    question: "What are the mega projects in Dholera?",
    answer:
      "Major projects in Dholera Smart City include Dholera International Airport, Ahmedabad-Dholera Expressway, Tata Semiconductor Plant, ABCD Building, Dholera Solar Park, and the proposed Dholera Monorail.",
  },
  {
    question: "Why choose Dholera Insider for buying plots in Dholera?",
    answer:
      "Dholera Insider is trusted for verified plots, transparent dealings, professional guidance, and long-term investment opportunities in Dholera Smart City.",
  },
  {
    question: "Which projects are offered by Dholera Insider?",
    answer:
      "Dholera Insider offers premium plotted developments including WestWyn Residency and WestWyn Estates in Dholera.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-white px-[clamp(1rem,4vw,3rem)] py-[clamp(2.5rem,6vw,5rem)]">
      <div className="mx-auto grid max-w-7xl gap-[clamp(1.5rem,3vw,3rem)] md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
        <div>
          <h2 className="mb-4 text-[clamp(1.5rem,3vw,2.5rem)] font-semibold leading-[clamp(2rem,4vw,3.5rem)] text-black">
            Frequently Asked Questions 
          </h2>
          <p className="mb-4 text-[clamp(1rem,1.4vw,1.125rem)] leading-[1.7] text-gray-600">
            More Questions about Dholera Smart City Project?
          </p>
          <Link
            className="inline-flex rounded-md bg-gradient-to-r from-teal-400 to-teal-600 px-[clamp(1rem,2vw,1.5rem)] py-3 text-[0.875rem] font-medium text-white"
            href="tel:+919211820887"
          >
            Give Us A Missed Call
          </Link>
        </div>

        <div className="space-y-1">
          {faqs.map((faq, index) => (
            <div key={faq.question} className="border-b border-gray-200">
              <button
                className="flex w-full items-center justify-between py-4 text-left transition-all duration-200 hover:bg-gray-50"
                onClick={() => toggleFAQ(index)}
              >
                <span className="pr-4 text-[clamp(1rem,1.4vw,1.125rem)] font-medium leading-[1.7] text-gray-900">
                  {faq.question}
                </span>
                <span className="flex-shrink-0 transition-transform duration-200">
                  {openIndex === index ? (
                    <Minus className="h-5 w-5 text-gray-600" />
                  ) : (
                    <Plus className="h-5 w-5 text-gray-600" />
                  )}
                </span>
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="pb-4">
                  <p className="text-[0.875rem] leading-[1.7] text-gray-600">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
