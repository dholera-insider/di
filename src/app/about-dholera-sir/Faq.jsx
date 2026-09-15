"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const aboutFaqs = [
  {
    question: "What is Dholera Smart City?",
    answer:
      "Dholera Smart City is India's first Greenfield Smart City, planned with modern infrastructure, industrial development, residential zones, and smart urban planning.",
  },
  {
    question: "Why is Dholera attracting investors?",
    answer:
      "Dholera is attracting investors because of its government-backed development, major infrastructure projects, industrial investments, and long-term growth potential.",
  },
  {
    question: "Can NRIs invest in Dholera?",
    answer:
      "Yes. NRIs can invest in residential plots in Dholera, subject to applicable Indian laws and regulations.",
  },
  {
    question: "Why are residential plots popular in Dholera?",
    answer:
      "Residential plots offer long-term ownership, flexibility for future construction, and the opportunity to invest early in a developing smart city.",
  },
  {
    question: "How does Dholera Insider help NRI investors?",
    answer:
      "Dholera Insider is the exclusive channel partner of BookMyAssets for NRI investors. We help overseas buyers explore verified residential plot projects with transparent documentation, remote buying support, and end-to-end assistance.",
  },
];

export default function AboutFaq() {
  const [openIndex, setOpenIndex] = useState(-1);

  return (
    <section
      id="faqs"
      className="scroll-mt-28 bg-White site-gutter section-space"
      aria-labelledby="about-faq-heading"
    >
      <div className="mx-auto max-w-5xl">
        {/* Heading */}
        <div className="mb-8">
          <h2
            id="about-faq-heading"
            className="text-[30px] font-semibold leading-tight tracking-[-0.035em] text-[#051A3A] sm:text-4xl lg:text-[42px]"
          >
            FAQ
          </h2>
          <div className="mt-2 h-1 w-14 rounded-full bg-[#F6C343]" />

        </div>

        {/* FAQ Items */}
        <div className="divide-y divide-[#051A3A]/15 border-y border-[#051A3A]/15">
          {aboutFaqs.map((item, index) => {
            const isOpen = openIndex === index;

            const answerId = `about-faq-answer-${index}`;
            const buttonId = `about-faq-button-${index}`;

            return (
              <article key={item.question}>
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    onClick={() =>
                      setOpenIndex(isOpen ? -1 : index)
                    }
                    className="
                      flex
                      w-full
                      items-center
                      justify-between
                      gap-5
                      py-5
                      text-left
                      text-base
                      font-semibold
                      text-[#051A3A]
                      transition-colors
                      duration-300
                      hover:text-[#B98500]
                      focus:outline-none
                      focus-visible:ring-2
                      focus-visible:ring-[#F6C343]
                      focus-visible:ring-offset-2
                      sm:text-lg
                    "
                    aria-expanded={isOpen}
                    aria-controls={answerId}
                  >
                    <span className="flex items-start gap-3">
                      <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#F6C343] text-xs font-bold text-[#051A3A]">
                        Q
                      </span>

                      <span>{item.question}</span>
                    </span>

                    <ChevronDown
                      className={`h-5 w-5 shrink-0 transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                      aria-hidden="true"
                    />
                  </button>
                </h3>

                {/* Smooth answer animation */}
                <div
                  id={answerId}
                  role="region"
                  aria-labelledby={buttonId}
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="flex max-w-3xl items-start gap-3 pb-5">
                      <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#051A3A] text-xs font-bold text-[#F6C343]">
                        A
                      </span>

                      <p className="text-sm leading-7 text-[#051A3A]/70 sm:text-base">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}