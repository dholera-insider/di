"use client";
import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import Link from "next/link";

const faqs = [
  {
    question: "Where is WestWyn Estates located?",
    answer:
      "WestWyn Estates is situated along State Highway-117, just a short drive from Bhimnath Railway Station, within a developing corridor of Dholera SIR, Gujarat.",
  },
  {
    question: "What is the starting price of plots?",
    answer:
      "Plots at WestWyn Estates start from ₹10 Lakh, with plot sizes ranging approximately between 151 to 198 square yards.",
  },
  {
    question: "Are the plots legally approved?",
    answer:
      "Yes, the plots come with NA, NOC, and clear title documentation and are designed to be registry-ready, ensuring transparency in the purchase process.",
  },
  {
    question: "What amenities are available at WestWyn Estates?",
    answer:
      "WestWyn Estates includes planned amenities such as internal roads, gated community planning, power and water supply, drainage system, security, kids play area, jogging track, yoga deck, senior citizen zone, and clubhouse lite.",
  },
  {
    question: "Is WestWyn Estates close to key Dholera infrastructure?",
    answer:
      "Yes, the project is connected to Bhimnath Railway Junction, Dholera SIR boundary, Ahmedabad-Dholera Expressway, Dholera International Airport, RMS Multi-Specialty Hospital, and the Tata Semiconductor Plant.",
  },
  {
    question: "Can I get site visit and documentation support?",
    answer:
      "Yes, buyers can get support for current availability, pricing, plot size details, site visit schedule, documentation, and registry process for WestWyn Estates.",
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
              Got questions about WestWyn Estates?
            </p>

            <div className="pt-4">
              <Link
                className="px-4 py-3 bg-teal-800 text-white font-medium rounded-md hover:bg-teal-950 transition"
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
