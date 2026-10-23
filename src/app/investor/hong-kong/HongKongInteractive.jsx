import { ChevronDown } from "lucide-react";

import { hongKongFaqs } from "./data";

export function HongKongFaq() {
  const headingId = "hong-kong-faq-heading";

  return (
    <section
      id="faq"
      className="scroll-mt-28 bg-white site-gutter section-space"
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
          {hongKongFaqs.map((item, index) => (
            <details key={item.question} name="hong-kong-faq" className="group">
              <summary
                id={`hong-kong-faq-question-${index}`}
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
                id={`hong-kong-faq-answer-${index}`}
                role="region"
                aria-labelledby={`hong-kong-faq-question-${index}`}
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
