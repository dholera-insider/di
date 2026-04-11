"use client";
import { useState } from "react";
import { Plus, Minus } from "lucide-react";


const faqs = [
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
    <>
      <div className="p-8">
        <div className="flex flex-col md:flex-row px-4 md:px-8 py-12 md:py-20 gap-6 md:gap-12 max-w-7xl mx-auto">
          
          {/* Left Section (40%) */}
          <div className="w-full md:w-2/5 pl-2 pr-2">
            <h2 className="text-4xl max-sm:text-xl font-semibold text-black mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600 mb-2">
              More Questions about Dholera Smart City Project?
            </p>
            <div className="pt-4">
              <a className="px-2 py-3 bg-gradient-to-r from-teal-400 to-teal-600 text-white rounded-md" href="tel:+919211820887">Give Us A Missed Call</a>
            </div>
          </div>

          {/* Right Section (60%) */}
          <div className="w-full md:w-3/5 md:pl-24 md:pr-4  md:mt-0 space-y-1">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-gray-200">
                <button
                  className="w-full py-4 flex justify-between items-center text-left hover:bg-gray-50 transition-all duration-200"
                  onClick={() => toggleFAQ(index)}
                >
                  <span className="text-gray-900 font-medium pr-4 leading-relaxed">
                    {faq.question}
                  </span>
                  <div className="flex-shrink-0 transition-transform duration-200">
                    {openIndex === index ? (
                      <Minus className="w-5 h-5 text-gray-600" />
                    ) : (
                      <Plus className="w-5 h-5 text-gray-600" />
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
                  <div className="pb-4 px-0">
                    <p className="text-gray-600 text-sm leading-relaxed">
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