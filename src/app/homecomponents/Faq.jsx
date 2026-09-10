
"use client";

import { useId, useState } from "react";
import { ChevronDown } from "lucide-react";

const HomeFaqs = [
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
  const headingId = useId();

  const handleToggle = (index) => {
    setOpenIndex((currentIndex) =>
      currentIndex === index ? null : index
    );
  };

  return (
    <section
      id="faqs"
      aria-labelledby={headingId}
      className="
        scroll-mt-28
        bg-white
        px-4
        py-10

        sm:px-6
        sm:py-12

        lg:px-8
        lg:py-16
      "
    >
      <div className="mx-auto w-full max-w-5xl">
        {/* =====================================================
            HEADING
        ====================================================== */}

        <div className="mb-8 sm:mb-10">
          <h2
            id={headingId}
            className="
              font-[var(--font-display)]
              text-[clamp(1.9rem,4vw,3.25rem)]
              font-bold
              leading-tight
              tracking-[-0.045em]
              text-[#051A3A]
            "
          >
            FAQ
          </h2>

          <div
            aria-hidden="true"
            className="
              mt-3
              h-[3px]
              w-12
              rounded-full
              bg-[#F6C343]
            "
          />
        </div>

        {/* =====================================================
            FAQ LIST
        ====================================================== */}

        <div
          className="
            divide-y
            divide-[#051A3A]/15
            border-y
            border-[#051A3A]/15
          "
        >
          {HomeFaqs.map((item, index) => {
            const isOpen = openIndex === index;

            const answerId = `home-faq-answer-${index}`;
            const buttonId = `home-faq-button-${index}`;

            return (
              <article key={item.question}>
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    onClick={() => handleToggle(index)}
                    aria-expanded={isOpen}
                    aria-controls={answerId}
                    className="
                      group
                      flex
                      min-h-[72px]
                      w-full
                      items-center
                      justify-between
                      gap-5
                      py-5
                      text-left

                      font-[var(--font-display)]
                      text-base
                      font-semibold
                      leading-6
                      text-[#051A3A]

                      transition-colors
                      duration-300

                      hover:text-[#B8860B]

                      focus:outline-none
                      focus-visible:rounded-lg
                      focus-visible:ring-2
                      focus-visible:ring-[#F6C343]
                      focus-visible:ring-offset-2

                      sm:text-lg
                    "
                  >
                    {/* Question */}

                    <span
                      className="
                        flex
                        min-w-0
                        items-center
                        gap-3
                        sm:gap-4
                      "
                    >
                      <span
                        className="
                          grid
                          h-8
                          w-8
                          shrink-0
                          place-items-center
                          rounded-full
                          bg-[#F6C343]

                          text-xs
                          font-bold
                          text-[#051A3A]
                        "
                        aria-hidden="true"
                      >
                        Q
                      </span>

                      <span>{item.question}</span>
                    </span>

                    {/* Arrow */}

                    <span
                      className={`
                        grid
                        h-9
                        w-9
                        shrink-0
                        place-items-center
                        rounded-full
                        border
                        transition-all
                        duration-300

                        ${
                          isOpen
                            ? "border-[#F6C343] bg-[#F6C343] text-[#051A3A]"
                            : "border-[#051A3A]/10 bg-[#EEF2F9] text-[#051A3A]"
                        }
                      `}
                    >
                      <ChevronDown
                        className={`
                          h-5
                          w-5
                          transition-transform
                          duration-300

                          ${
                            isOpen
                              ? "rotate-180"
                              : "rotate-0"
                          }
                        `}
                        strokeWidth={2}
                        aria-hidden="true"
                      />
                    </span>
                  </button>
                </h3>

                {/* =================================================
                    ANSWER
                ================================================== */}

                <div
                  id={answerId}
                  role="region"
                  aria-labelledby={buttonId}
                  hidden={!isOpen}
                >
                  <div
                    className="
                      flex
                      max-w-3xl
                      items-start
                      gap-3
                      pb-6
                      pl-0

                      sm:gap-4
                    "
                  >
                    <span
                      className="
                        grid
                        h-8
                        w-8
                        shrink-0
                        place-items-center
                        rounded-full
                        bg-[#051A3A]

                        text-xs
                        font-bold
                        text-[#F6C343]
                      "
                      aria-hidden="true"
                    >
                      A
                    </span>

                    <p
                      className="
                        pt-0.5
                        text-sm
                        leading-7
                        text-[#051A3A]/70

                        sm:text-base
                        sm:leading-8
                      "
                    >
                      {item.answer}
                    </p>
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