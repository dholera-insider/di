"use client";
import { useState } from "react";
import { Plus, Minus } from "lucide-react";

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
    question: "Is registry available immediately?",
    answer: "Yes, you can complete the registry without delay.",
  },
  {
    question: "Is the location well connected?",
    answer: "Yes, it is close to expressway, railway, airport, and industrial zones.",
  },
  {
    question: "Is it good for investment?",
    answer: "Yes, due to location and infrastructure growth, it is a strong long-term investment option.",
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
        <div className="flex flex-col md:flex-row px-4 md:px-8 py-4 md:py-8 gap-6 md:gap-12 max-w-7xl mx-auto">

          {/* Left Section */}
          <div className="w-full md:w-2/5 pl-2 pr-2">
            <h2 className="text-[32px] font-semibold text-white mb-4">
              Frequently Asked Questions
            </h2>

            <p className="text-gray-200 mb-2">
              Got questions about WestWyn Residency?
            </p>

            <div className="pt-4">
              <a
                className="px-4 py-3 bg-teal-800 text-white font-medium rounded-md hover:bg-teal-950 transition"
                href="tel:+918130371647"
              >
                Give Us A Missed Call
              </a>
            </div>
          </div>

          {/* Right Section */}
          <div className="w-full md:w-3/5 md:pl-24 md:pr-4 md:mt-0 space-y-1">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-white/20">
                <button
                  className="w-full py-4 flex justify-between items-center text-left hover:bg-white/5 transition-all duration-200"
                  onClick={() => toggleFAQ(index)}
                >
                  <span className="text-white font-medium pr-4 leading-relaxed">
                    {faq.question}
                  </span>

                  <div className="flex-shrink-0 transition-transform duration-200">
                    {openIndex === index ? (
                      <Minus className="w-5 h-5 text-white" />
                    ) : (
                      <Plus className="w-5 h-5 text-white" />
                    )}
                  </div>
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