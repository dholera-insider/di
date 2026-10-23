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
  const headingId = "singapore-faq-heading";

  return (
    <section
      className="bg-white site-gutter section-space"
      aria-labelledby={headingId}
    >
      <div className="mx-auto max-w-5xl">
        <h2
          id={headingId}
          className="font-sans text-[clamp(1.9rem,4vw,3.25rem)] font-bold leading-tight tracking-[-0.045em]"
        >
          FAQ
        </h2>
        <div
              aria-hidden="true"
              className="
                mt-2
                h-[3px]
                w-12
                rounded-full
                bg-[#F6C343]
              "
            />
        <div className="mt-10 divide-y divide-[#051A3A]/15 border-y border-[#051A3A]/15">
          {faqItems.map((item, index) => (
            <details key={item.question} name="singapore-faq" className="group">
              <summary
                id={`singapore-faq-question-${index}`}
                className="flex min-h-16 w-full cursor-pointer list-none items-center py-5 text-left font-sans text-base font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F6C343] sm:text-lg [&::-webkit-details-marker]:hidden"
              >
                <h3 className="flex w-full items-center justify-between gap-5">
                  <span className="flex items-start gap-3">
                    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#F6C343] text-xs font-bold text-[#051A3A]">
                      Q
                    </span>
                    <span>{item.question}</span>
                  </span>
                  <ChevronDown
                    className="h-5 w-5 shrink-0 transition-transform group-open:rotate-180"
                    aria-hidden="true"
                  />
                </h3>
              </summary>
              <div
                id={`singapore-faq-answer-${index}`}
                role="region"
                aria-labelledby={`singapore-faq-question-${index}`}
              >
                <div className="flex max-w-3xl items-start gap-3 pb-5">
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#051A3A] text-xs font-bold text-[#F6C343]">
                    A
                  </span>
                  <p className="text-sm leading-7 text-[#051A3A]/70 sm:text-base">
                    {item.answer}
                  </p>
                </div>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
