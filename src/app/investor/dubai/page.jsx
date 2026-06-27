"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Minus } from "lucide-react";

const CheckIcon = ({ className = "" }) => (
  <svg viewBox="0 0 20 20" fill="none" className={className} aria-hidden="true">
    <circle cx="10" cy="10" r="10" fill="currentColor" opacity="0.12" />
    <path
      d="M6 10.2l2.4 2.4L14 7"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ChevronIcon = ({ open }) => (
  <svg
    viewBox="0 0 20 20"
    fill="none"
    className={`h-5 w-5 shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
    aria-hidden="true"
  >
    <path
      d="M5 7.5l5 5 5-5"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const whyChoosing = [
  "Opportunity to invest early in a developing smart city",
  "Verified residential plot projects",
  "Affordable entry compared to many metro cities",
  "Excellent long-term appreciation potential",
  "A simple remote buying process",
  "Professional guidance designed for NRIs",
];

const insiderCards = [
  {
    title: "Verified Residential Plot Projects",
    body: "Every project we recommend is carefully verified, helping you invest with confidence.",
  },
  {
    title: "Complete Transparency",
    body: "From pricing to documentation, we ensure every detail is shared clearly with no hidden surprises.",
  },
  {
    title: "Dedicated Support for Dubai NRIs",
    body: "We understand the unique needs of investors living in Dubai. Our team provides online consultations, virtual project presentations, and continuous assistance throughout the buying process.",
  },
  {
    title: "End-to-End Assistance",
    body: "From your first enquiry to registration and construction, we guide you through every step, making your investment journey smooth and hassle-free.",
  },
];

const steps = [
  { num: "01", text: "Connect with our investment advisors." },
  { num: "02", text: "Explore verified residential plot projects in Dholera." },
  {
    num: "03",
    text: "Attend a virtual project presentation and receive complete project details.",
  },
  {
    num: "04",
    text: "Book your residential plot with the token amount ₹50000.",
    sub: "Complete Your KYC",
  },
  { num: "05", text: "Complete payment according to the payment plan" },
  { num: "06", text: "Get your plot registered." },
];

const legalDocs = [
  "Title documents",
  "NA/NOC details",
  "7/12 extract or relevant land record",
  "Ownership proof",
  "Project map",
  "Plot layout",
  "Registry process details",
  "Payment schedule",
  "Developer details",
  "Approved plan pass",
  "Final cost sheet",
];

const buyerDocs = ["Aadhar Card", "Pan Card"];

const highlights = [
  "Planned smart city infrastructure",
  "Strong government support",
  "India's first semiconductor Plant",
  "Excellent connectivity through major infrastructure projects",
  "Growing demand for residential properties",
  "Long-term investment potential",
];

const trustPoints = [
  "Verified residential plot projects in Dholera",
  "Transparent pricing and documentation",
  "Professional investment guidance",
  "Dedicated support for NRIs",
  "Secure remote buying experience",
  "Personalized assistance from enquiry to plot registry",
];

const faqs = [
  {
    q: "Can NRIs in Dubai invest in property or land in India?",
    a: "Yes. NRIs living in the UAE can freely invest in residential and commercial properties.",
  },
  {
    q: "Is Dholera a good investment for NRIs?",
    a: "Yes Dholera is a good Investment for NRI as it is India's First greenfield Smart City backed by government, expressway, airport, and industrial development.",
  },
  {
    q: "What documents should NRIs check before booking a plot in Dholera?",
    a: "Before Booking a plot in Dholera Check title documents, NA/NOC details, project ownership proof, layout/map, payment terms, registry process details, and plan pass.",
  },
  {
    q: "Can an NRI buy a Dholera plot without visiting India?",
    a: "Yes, NRIs can buy a plot in dholera remotely by reviewing the project map, legal documents, price sheet, and payment process. However, a personal site visit or family verification is strongly recommended before final decision-making.",
  },
  {
    q: "Why should I choose Dholera Insider for Dholera Investment?",
    a: "Dholera Insider helps NRIs invest in verified residential plots in Dholera Smart City through a secure, transparent, and fully remote process.",
  },
];

export default function DubaiNriPage() {
  const [openFaq, setOpenFaq] = useState(0);
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <main className="bg-[#FDFCFA] text-[#162033]">
      <meta name="robots" content="noindex, nofollow" />
      {/* HERO */}
      <section className="px-[clamp(1.25rem,5vw,2rem)] pt-[clamp(3rem,8vw,5.5rem)] pb-[clamp(2.5rem,6vw,4rem)]">
        <div className="mx-auto max-w-7xl">
          <span className="inline-block rounded-full bg-[#F6C343] px-4 py-1.5 text-xs font-bold tracking-wide text-[#051A3A]">
            DUBAI → DHOLERA
          </span>

          <h1 className="mt-5 max-w-3xl text-[clamp(2rem,5vw,3.25rem)] font-bold leading-[1.1] text-[#051A3A]">
            Dholera Residential Plots for Dubai NRIs
          </h1>

          <p className="mt-3 max-w-2xl text-[clamp(1.05rem,2.2vw,1.375rem)] font-semibold text-[#2B364D]">
            Invest in India&apos;s First Greenfield Smart City from Dubai
          </p>

          <div className="mt-6 max-w-2xl space-y-4 text-[clamp(0.95rem,1.6vw,1.0625rem)] leading-relaxed text-[#162033]">
            <p>
              Living in Dubai doesn&apos;t mean you have to miss the opportunity
              to invest in India&apos;s future. At Dholera Insider, we help
              Dubai NRIs invest in verified residential plots in Dholera Smart
              City through a secure, transparent, and fully remote process.
            </p>
            <p>
              Whether you&apos;re planning for your family&apos;s future,
              building long-term wealth, or diversifying your investments,
              Dholera offers one of India&apos;s most promising real estate
              destinations. Our team makes the entire journey simple from
              project selection to documentation and registration without
              requiring frequent travel to India.
            </p>
          </div>

          <button
            type="button"
            className="mt-8 rounded-lg bg-[#051A3A] px-7 py-3.5 text-sm font-bold text-[#F6C343] transition-colors hover:bg-[#2B364D] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#051A3A] focus-visible:ring-offset-2"
          >
            Connect With Our Advisors
          </button>
        </div>
      </section>

      {/* WHY DUBAI NRIs ARE CHOOSING DHOLERA */}
      <section className="bg-[#2B364D]/[0.04] px-[clamp(1.25rem,5vw,2rem)] py-[clamp(3rem,7vw,5rem)]">
        <div className="mx-auto max-w-7xl grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="text-[clamp(1.5rem,3.2vw,2.25rem)] font-bold text-[#051A3A]">
              Why Dubai NRIs Are Choosing Dholera
            </h2>
            <p className="mt-4 text-[#162033] leading-relaxed">
              Dubai is home to one of the largest Indian communities, and many
              NRIs are looking for reliable investment opportunities back home.
              Dholera Smart City is gaining attention because it combines
              government-backed infrastructure, modern urban planning, and
              long-term growth potential.
            </p>
          </div>

          <div>
            <p className="font-semibold text-[#2B364D]">
              For Dubai-based investors, Dholera offers:
            </p>
            <ul className="mt-4 space-y-3">
              {whyChoosing.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckIcon className="mt-0.5 h-5 w-5 shrink-0 text-[#F6C343]" />
                  <span className="text-[#162033]">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE DHOLERA INSIDER */}
      <section className="px-[clamp(1.25rem,5vw,2rem)] py-[clamp(3rem,7vw,5rem)]">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-[clamp(1.5rem,3.2vw,2.25rem)] font-bold text-[#051A3A]">
            Why Choose Dholera Insider?
          </h2>
          <p className="mt-4 max-w-2xl text-[#162033] leading-relaxed">
            Buying property from another country requires trust, clarity, and
            reliable support. That&apos;s exactly what we provide.
          </p>

          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {insiderCards.map((card) => (
              <div
                key={card.title}
                className="rounded-2xl border border-[#2B364D]/10 bg-[#FDFCFA] p-6 shadow-sm"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F6C343]/20">
                  <CheckIcon className="h-5 w-5 text-[#F6C343]" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-[#2B364D]">
                  {card.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#162033]">
                  {card.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW DUBAI NRIs CAN BUY */}
      <section className="bg-[#2B364D]/[0.04] px-[clamp(1.25rem,5vw,2rem)] py-[clamp(3rem,7vw,5rem)]">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-[clamp(1.5rem,3.2vw,2.25rem)] font-bold text-[#051A3A]">
            How Dubai NRIs Can Buy Residential Plots in Dholera
          </h2>
          <p className="mt-2 text-sm font-medium text-[#6C7484]">
            (Step by step process to buy plot in Dholera)
          </p>
          <p className="mt-4 text-[#162033]">
            Investing from Dubai is easier than ever.
          </p>

          <ol className="mt-10 space-y-8 border-l-2 border-[#2B364D]/15 pl-6">
            {steps.map((step) => (
              <li key={step.num} className="relative">
                <span className="absolute -left-[2.55rem] flex h-9 w-9 items-center justify-center rounded-full bg-[#051A3A] text-xs font-bold text-[#F6C343]">
                  {step.num}
                </span>
                <p className="font-semibold text-[#2B364D]">{step.text}</p>
                {step.sub && (
                  <span className="mt-2 inline-block rounded-full bg-[#F6C343] px-3 py-1 text-xs font-bold text-[#051A3A]">
                    {step.sub}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* LEGAL DOCUMENTS */}
      <section className="px-[clamp(1.25rem,5vw,2rem)] py-[clamp(3rem,7vw,5rem)]">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-[clamp(1.5rem,3.2vw,2.25rem)] font-bold text-[#051A3A]">
            Legal Documents You Should Check Before Buying
          </h2>
          <p className="mt-4 max-w-2xl text-[#162033] leading-relaxed">
            For Dubai NRIs, legal safety is usually the biggest concern. You are
            far from India, so you need document clarity before making any
            booking decision.
          </p>

          <p className="mt-6 font-semibold text-[#2B364D]">
            Before buying a Dholera plot, you should ask for:
          </p>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {legalDocs.map((doc) => (
              <li
                key={doc}
                className="flex items-start gap-2 rounded-lg border border-[#2B364D]/10 bg-[#2B364D]/[0.03] px-4 py-3 text-sm text-[#162033]"
              >
                <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-[#F6C343]" />
                <span>{doc}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex gap-3 rounded-xl border border-[#B42318]/25 bg-[#B42318]/[0.04] p-5">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="mt-0.5 h-5 w-5 shrink-0 text-[#B42318]"
              aria-hidden="true"
            >
              <path
                d="M12 9v4m0 4h.01M10.3 3.86l-8.2 14.2A1 1 0 0 0 2.97 19.5h18.06a1 1 0 0 0 .87-1.44l-8.2-14.2a1 1 0 0 0-1.74 0Z"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <p className="text-sm leading-relaxed text-[#162033]">
              At Dholera Insider, our goal is to help NRI buyers review the
              important documents before they move forward.{" "}
              <span className="font-semibold text-[#B42318]">
                You should not feel pressured to book a plot before
                understanding what you are buying.
              </span>
            </p>
          </div>
        </div>
      </section>

      {/* DOCUMENTS REQUIRED FROM BUYER */}
      <section className="bg-[#2B364D]/[0.04] px-[clamp(1.25rem,5vw,2rem)] py-[clamp(2.5rem,6vw,4rem)]">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-[clamp(1.25rem,2.6vw,1.75rem)] font-bold text-[#051A3A]">
            Documents Required from Buyer / Investor Living in Dubai
          </h2>
          <div className="mt-5 flex flex-wrap gap-3">
            {buyerDocs.map((doc) => (
              <span
                key={doc}
                className="rounded-full border border-[#2B364D]/15 bg-[#FDFCFA] px-5 py-2 text-sm font-semibold text-[#2B364D]"
              >
                {doc}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* WHY INVEST */}
      <section className="px-[clamp(1.25rem,5vw,2rem)] py-[clamp(3rem,7vw,5rem)]">
        <div className="mx-auto max-w-7xl grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="text-[clamp(1.5rem,3.2vw,2.25rem)] font-bold text-[#051A3A]">
              Why Invest in Dholera Smart City?
            </h2>
            <p className="mt-4 text-[#162033] leading-relaxed">
              Dholera Smart City is one of India&apos;s most ambitious urban
              development projects, planned with world-class infrastructure and
              modern connectivity. As development continues, the city is
              attracting increasing attention from homebuyers and investors
              alike.
            </p>
            <p className="mt-4 text-[#162033] leading-relaxed">
              For Dubai NRIs looking to invest in India, Dholera represents an
              opportunity to invest in the growth of a future-ready city.
            </p>
          </div>

          <div>
            <p className="font-semibold text-[#2B364D]">
              Key highlights include:
            </p>
            <ul className="mt-4 space-y-3">
              {highlights.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckIcon className="mt-0.5 h-5 w-5 shrink-0 text-[#F6C343]" />
                  <span className="text-[#162033]">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* WHY TRUST US */}
      <section className="bg-[#2B364D]/[0.04] px-[clamp(1.25rem,5vw,2rem)] py-[clamp(3rem,7vw,5rem)]">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-[clamp(1.5rem,3.2vw,2.25rem)] font-bold text-[#051A3A]">
            Why Dubai NRIs Trust Dholera Insider
          </h2>

          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {trustPoints.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <CheckIcon className="mt-0.5 h-5 w-5 shrink-0 text-[#F6C343]" />
                <span className="text-[#162033]">{item}</span>
              </li>
            ))}
          </ul>

          <p className="mt-6 max-w-2xl text-[#162033] leading-relaxed">
            Our focus is to help every Dubai NRI invest with confidence through
            reliable information, trusted projects, and exceptional service.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#051A3A] px-[clamp(1.25rem,5vw,2rem)] py-[clamp(3rem,7vw,5rem)]">
        <div className="mx-auto max-w-7xl flex flex-col items-center text-center">
          <h2 className="text-[clamp(1.5rem,3.2vw,2.25rem)] font-bold text-[#FDFCFA]">
            Start Your Investment Journey from Dubai
          </h2>
          <button
            type="button"
            className="mt-7 rounded-lg bg-[#F6C343] px-8 py-3.5 text-sm font-bold text-[#051A3A] transition-colors hover:bg-[#FDFCFA] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F6C343] focus-visible:ring-offset-2 focus-visible:ring-offset-[#051A3A]"
          >
            Connect With Our Advisors
          </button>
        </div>
      </section>

      {/* FAQ */}
      <div className="">
        <div className="flex flex-col md:flex-row px-[clamp(1rem,4vw,2rem)] py-[clamp(1.5rem,4vw,2rem)] gap-[clamp(1.5rem,4vw,3rem)] max-w-7xl mx-auto">
          <div className="w-full md:w-2/5 md:pl-2 md:pr-2">
            <h2 className="text-[clamp(1.5rem,3vw,2rem)] font-semibold text-[#051A3A] mb-4">
              FAQs
            </h2>

            {/* <p className="text-[#051A3A] mb-2">
              Got questions about WestWyn Estates?
            </p> */}

            <div className="pt-4">
              <Link
                className="px-4 py-3 bg-[#051A3A] text-white font-medium rounded-md hover:bg-[#2B364D] transition"
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
                  <span className="text-[#051A3A] font-medium pr-4 leading-relaxed">
                    {faq.q}
                  </span>

                  <span className="flex-shrink-0 transition-transform duration-200">
                    {openIndex === index ? (
                      <Minus className="w-5 h-5 text-[#F6C343]" />
                    ) : (
                      <Plus className="w-5 h-5 text-[#F6C343]" />
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
                    <p className="text-[#051A3A] text-sm leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
