"use client";

import { useId, useState } from "react";
import { ChevronDown } from "lucide-react";

import { omanFaqs } from "./data";

export function OmanFaq() {
  const [openIndex, setOpenIndex] = useState(0);
  const headingId = useId();

  return (
    <section
      id="faqs"
      className="scroll-mt-28 bg-[#F8F7F3] px-4 py-8 sm:px-6 md:py-12 lg:px-8"
      aria-labelledby={headingId}
    >
      <div className="mx-auto max-w-5xl">
        <h2
          id={headingId}
          className="font-[var(--font-oman-display)] text-[clamp(1.9rem,4vw,3.25rem)] font-bold leading-tight tracking-[-0.045em]"
        >
          FAQs
        </h2>
        <div className="mt-10 divide-y divide-[#051A3A]/15 border-y border-[#051A3A]/15">
          {omanFaqs.map((item, index) => {
            const isOpen = openIndex === index;
            const answerId = `oman-faq-answer-${index}`;
            const buttonId = `oman-faq-button-${index}`;

            return (
              <article key={item.question}>
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? -1 : index)}
                    className="flex min-h-16 w-full items-center justify-between gap-5 py-5 text-left font-[var(--font-oman-display)] text-base font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F6C343] sm:text-lg"
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
