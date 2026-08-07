"use client";

import { useId, useState } from "react";
import { ChevronDown } from "lucide-react";

const faqItems = [
  {
    question: "Can I buy a Dholera plot from Singapore?",
    answer:
      "Yes. NRIs living in Singapore can buy residential plots in Dholera. The buying process can be completed remotely with proper documentation and registration support.",
  },
  {
    question: "Is Dholera a good long-term investment?",
    answer:
      "Dholera is attracting long-term investors because of its planned infrastructure, industrial growth, and future development potential. Always evaluate project documents before investing.",
  },
  {
    question: "What should I verify before buying a plot?",
    answer:
      "Review the title documents, NA/NOC, approved layout plan, ownership details, sale deed, and registry process before making your investment decision.",
  },
  {
    question: "Can I complete the buying process from Singapore?",
    answer:
      "Yes. Most of the investment process can be completed online through virtual consultations, digital documentation, and registration assistance.",
  },
  {
    question: "Why choose Dholera Insider?",
    answer:
      "Dholera Insider is the exclusive channel partner of BookMyAssets for NRI investors. We provide verified residential plot opportunities, transparent guidance, and dedicated support to help Singapore NRIs invest with confidence.",
  },
];

export function SingaporeFaq() {
  const [openIndex, setOpenIndex] = useState(0);
  const headingId = useId();

  return (
    <section
      className="bg-[#F8F7F3] px-4 py-8 sm:px-6 md:py-12 lg:px-8"
      aria-labelledby={headingId}
    >
      <div className="mx-auto max-w-5xl">
        <h2
          id={headingId}
          className="font-[var(--font-singapore-display)] text-[clamp(1.9rem,4vw,3.25rem)] font-bold leading-tight tracking-[-0.045em]"
        >
          FAQs
        </h2>
        <div className="mt-10 divide-y divide-[#051A3A]/15 border-y border-[#051A3A]/15">
          {faqItems.map((item, index) => {
            const isOpen = openIndex === index;
            const answerId = `singapore-faq-answer-${index}`;
            const buttonId = `singapore-faq-button-${index}`;

            return (
              <article key={item.question}>
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? -1 : index)}
                    className="flex min-h-16 w-full items-center justify-between gap-5 py-5 text-left font-[var(--font-singapore-display)] text-base font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F6C343] sm:text-lg"
                    aria-expanded={isOpen}
                    aria-controls={answerId}
                  >
                    <span>{item.question}</span>
                    <ChevronDown
                      className={`h-5 w-5 shrink-0 transition-transform ${
                        isOpen ? "rotate-180" : ""
                      }`}
                      aria-hidden="true"
                    />
                  </button>
                </h3>
                <div
                  id={answerId}
                  role="region"
                  aria-labelledby={buttonId}
                  hidden={!isOpen}
                >
                  <p className="max-w-3xl pb-5 text-sm leading-7 text-[#051A3A]/70 sm:text-base">
                    {item.answer}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
