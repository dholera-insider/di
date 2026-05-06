"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import Link from "next/link";

const faqs = [
   {
    question: "Is Dholera Smart City good for investment?",
    answer:
      "Yes, Dholera is considered a strong long-term investment option due to planned infrastructure, growing industrial development, and improving connectivity.",
  },
  {
    question: "What is Dholera SIR?",
    answer:
      "Dholera SIR is a Special Investment Region, a planned smart city with residential, commercial, and industrial zones designed for future growth.",
  },
  {
    question: "Is Dholera a safe investment?",
    answer:
      "Absolutely. It’s a government-backed project with clear approvals, mega infrastructure, and strong growth drivers, making it a secure investment with clear titles and registry-ready plots.",
  },
  {
    question: "What industries are coming to Dholera?",
    answer:
      "High-tech sectors like semiconductors, EVs, electronics, logistics, and IT are setting up here, driving employment and real estate demand.",
  },
  {
    question: "What is the minimum plot size available?",
    answer:
      "Most residential plots start from 100 sq. yards (900 sq. ft.), making it ideal for both first-time buyers and seasoned investors. Even those planning to buy under 10 lakh plot in Dholera can find options in projects like WestWyn Estate.",
  },
  {
    question: "How soon can I register my plot?",
    answer:
      "Plots in projects like WestWyn Estate are registry-ready, meaning you can complete your registry immediately after booking.",
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
            FAQ
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
