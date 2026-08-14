import Image from "next/image";
import Link from "next/link";
import {
  Building2,
  CheckCircle2,
  Globe2,
  Home,
  Landmark,
  Users,
} from "lucide-react";

import heroImage from "@/app/assets/about-dholera-sir-banner-dholera-insider.webp";
import tataLogo from "@/app/assets/tata-logo.png";

export const metadata = {
  title: "About Dholera Smart City | Why NRIs Are Investing in Dholera",
  description:
    "Learn about Dholera Smart City, its infrastructure, major developments, and why NRIs are investing in residential plots for long-term growth.",
  keywords: [
    "About Dholera Smart City",
    "Dholera Smart City",
    "Dholera SIR",
    "Dholera Investment",
    "Dholera Residential Plots",
    "Invest in Dholera",
    "Dholera Smart City Investment",
    "Dholera Property Investment",
    "Residential Plots in Dholera",
    "Dholera Infrastructure",
    "Dholera for NRI Investors",
  ],
  alternates: {
    canonical: "https://www.dholerainsider.com/about-dholera-sir",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "About Dholera Smart City | Why NRIs Are Investing in Dholera",
    description:
      "Learn about Dholera Smart City, its infrastructure, major developments, and why NRIs are investing in residential plots for long-term growth.",
    url: "https://www.dholerainsider.com/about-dholera-sir",
    type: "website",
  },
};

const standoutPoints = [
  "India's First Greenfield Smart City",
  "Part of the Delhi Mumbai Industrial Corridor (DMIC)",
  "Government-Backed Smart City Development",
  "Dedicated Industrial & Residential Zones",
  "World-Class Infrastructure & Connectivity",
  "Long-Term Investment Potential",
];

const megaProjects = [
  {
    icon: "🏢",
    title: "ABCD Building",
    description:
      "Administrative & Business Centre, Dholera - Single-window system for investors",
    href: "/about-dholera-sir/abcd-building-dholera-sir",
  },
  {
    image: tataLogo,
    title: "TATA Electronics Semiconductor Fab",
    description: "India's first semiconductor manufacturing project",
    href: "/about-dholera-sir/tata-semiconductor-plant-in-dholera",
  },
  {
    icon: "✈️",
    title: "Dholera International Airport",
    description: "Global trade, cargo movement, and international travel",
    href: "/about-dholera-sir/dholera-international-airport-project-update-2025",
  },
  {
    icon: "🛣️",
    title: "Ahmedabad–Dholera Expressway",
    description: "High-speed corridor cutting travel time to one hour",
    href: "/about-dholera-sir/ahmedabad-dholera-expressway-transforming-gujarat-connectivity",
  },
  {
    icon: "🚇",
    title: "High-Speed Monorail & Railway",
    description: "Links with Ahmedabad and major industrial hubs",
    href: "/dholera-sir-blogs/how-connectivity-is-shaping-dholera-growth",
  },
  {
    icon: "☀️",
    title: "Dholera Solar Park",
    description: "One of India's largest renewable energy projects",
    href: "/about-dholera-sir/renewable-energy-solar-park-in-dholera",
  },
  {
    icon: "💧",
    title: "Water Treatment Plant",
    description: "Reliable long-term water supply for industries and residents",
    href: "/dholera-sir-blogs/dholera-smart-city-water-scarcity-solutions",
  },
  {
    icon: "⚡",
    title: "ReNew Power & Activation Area",
    description: "₹2,000 crore solar plant + ready infrastructure hub",
    href: "/about-dholera-sir/renewable-energy-solar-park-in-dholera",
  },
  {
    icon: "🚢",
    title: "Dholera Sea Port",
    description:
      "A planned greenfield port in the Gulf of Khambhat to support Dholera Connectivity.",
    href: "/dholera-sir-blogs/dholera-sea-port-connectivity-growth",
  },
];

const nriBenefits = [
  "Long-term land ownership",
  "Opportunity to build a future home",
  "Investment in a developing smart city",
  "Potential for future appreciation",
  "A long-term family asset in India",
];

const insiderBenefits = [
  "Verified Residential Plot Projects",
  "Transparent Pricing",
  "Legal Documentation Support",
  "Virtual Project Presentations",
  "100% Remote Buying Assistance",
  "Exclusive Channel Partner of BookMyAssets",
];

const suitableFor = [
  {
    Icon: Globe2,
    text: "NRIs looking for long-term property investment",
  },
  {
    Icon: Home,
    text: "Families planning a future home in India",
  },
  {
    Icon: Landmark,
    text: "Investors seeking residential land",
  },
  {
    Icon: Building2,
    text: "Buyers interested in government-planned developments",
  },
  {
    Icon: Users,
    text: "Individuals building long-term wealth through real estate",
  },
];

const faqs = [
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

const faqSchema = {
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
};

function SectionHeading({ children, inverse = false }) {
  return (
    <div className="mb-10 md:mb-12">
      <h2
        className={`text-[clamp(1.75rem,3.4vw,2.75rem)] font-bold leading-tight tracking-[-0.025em] ${
          inverse ? "text-white" : "text-[#051A3A]"
        }`}
      >
        {children}
      </h2>
      <div className="mt-4 h-1 w-16 rounded-full bg-[#F6C343]" />
    </div>
  );
}

function CheckList({ items, inverse = false }) {
  return (
    <ul className="grid gap-4 sm:grid-cols-2">
      {items.map((item) => (
        <li
          key={item}
          className={`flex items-start gap-3 rounded-xl border px-5 py-4 ${
            inverse
              ? "border-white/10 bg-white/[0.06] text-white"
              : "border-[#051A3A]/10 bg-white text-[#162033] shadow-sm"
          }`}
        >
          <CheckCircle2
            className="mt-0.5 h-5 w-5 shrink-0 text-[#F6C343]"
            aria-hidden="true"
          />
          <span className="text-sm font-semibold leading-6">{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default function AboutDholeraSirPage() {
  return (
    <main className="bg-[#FDFCFA] text-[#162033]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <section className="relative flex min-h-[62vh] items-end overflow-hidden bg-[#051A3A] pt-20">
        <Image
          src={heroImage}
          alt="About Dholera Smart City"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#051A3A] via-[#051A3A]/65 to-[#051A3A]/20" />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-14 pt-28 sm:px-6 md:pb-20 lg:px-8">
          <h1 className="max-w-4xl text-[clamp(2.25rem,5vw,4.75rem)] font-bold leading-[1.05] tracking-[-0.04em] text-white">
            About Dholera Smart City
          </h1>
        </div>
      </section>

      <section className="px-4 py-[clamp(3.5rem,6vw,5rem)] sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl space-y-6 text-base leading-8 text-[#2B364D] md:text-lg">
          <p>
            Dholera Smart City is India’s first Greenfield Smart City, being
            developed with planned infrastructure, industrial zones, and
            residential areas. Major projects like the Ahmedabad Dholera
            Expressway, Dholera International Airport, and Tata Semiconductor
            Plant are driving its future growth.
          </p>
        </div>
      </section>

      <section className="bg-[#EEF2F9] px-4 py-[clamp(3.5rem,6vw,5rem)] sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading>Why Does Dholera Stand Out?</SectionHeading>
          <CheckList items={standoutPoints} />
        </div>
      </section>

      <section className="px-4 py-[clamp(3.5rem,6vw,5rem)] sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading>Mega Projects in Dholera Smart City</SectionHeading>
          <div className="grid gap-6 md:grid-cols-3">
            {megaProjects.map((project) => (
              <article
                key={project.title}
                className="rounded-2xl border border-[#051A3A]/10 bg-white p-6 shadow-[0_16px_40px_rgba(5,26,58,.08)] transition-transform duration-300 hover:-translate-y-1"
              >
                <div className="mb-5 flex h-10 items-center">
                  {project.image ? (
                    <Image
                      src={project.image}
                      alt="TATA"
                      className="h-8 w-auto object-contain"
                    />
                  ) : (
                    <span className="text-3xl" aria-hidden="true">
                      {project.icon}
                    </span>
                  )}
                </div>
                <h3 className="mb-3 text-lg font-bold text-[#051A3A]">
                  <Link
                    href={project.href}
                    className="transition-colors hover:text-[#B98500]"
                  >
                    {project.title}
                  </Link>
                </h3>
                <p className="text-sm leading-7 text-[#2B364D]">
                  {project.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#051A3A] px-4 py-[clamp(3.5rem,6vw,5rem)] sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-16">
          <div>
            <SectionHeading inverse>
              Why NRIs Are Considering Dholera
            </SectionHeading>
            <p className="text-base leading-8 text-white/80">
              Many NRIs are exploring Dholera because it combines
              government-backed planning with long-term development potential.
            </p>
          </div>
          <div>
            <h3 className="mb-6 text-xl font-bold text-white">
              A residential plot in Dholera offers:
            </h3>
            <CheckList items={nriBenefits} inverse />
          </div>
        </div>
      </section>

      <section className="px-4 py-[clamp(3.5rem,6vw,5rem)] sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading>Why Invest Through Dholera Insider?</SectionHeading>
          <p className="mb-8 max-w-3xl text-base leading-8 text-[#2B364D]">
            Dholera Insider helps NRIs invest with confidence by providing:
          </p>
          <CheckList items={insiderBenefits} />
        </div>
      </section>

      <section className="bg-[#EEF2F9] px-4 py-[clamp(3.5rem,6vw,5rem)] sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading>
            Who Should Consider Investing in Dholera?
          </SectionHeading>
          <p className="mb-8 text-base leading-8 text-[#2B364D]">
            Dholera may be suitable for:
          </p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {suitableFor.map(({ Icon, text }) => (
              <div
                key={text}
                className="rounded-2xl border border-[#051A3A]/10 bg-white p-6 shadow-sm"
              >
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-[#F6C343]/20">
                  <Icon
                    className="h-6 w-6 text-[#051A3A]"
                    strokeWidth={1.6}
                    aria-hidden="true"
                  />
                </div>
                <p className="text-sm font-semibold leading-6 text-[#162033]">
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#051A3A] px-4 py-[clamp(3.5rem,6vw,5rem)] sm:px-6 lg:px-8">
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#F6C343]/10 blur-3xl" />
        <div className="relative mx-auto max-w-4xl text-center">
          <h2 className="mb-6 text-[clamp(1.75rem,3.4vw,2.75rem)] font-bold leading-tight text-white">
            Start Your Dholera Investment Journey
          </h2>
        </div>
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="https://wa.me/919211820887?text=Hello%2C%20I%20am%20interested%20in%20buying%20a%20plot%20in%20Dholera.%20Please%20share%20the%20details."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-[#F6C343] px-7 py-3 text-base font-bold text-[#051A3A] transition-colors hover:bg-white sm:w-auto"
          >
            Connect With RM
          </a>
        </div>
      </section>

      <section className="px-4 py-[clamp(3.5rem,6vw,5rem)] sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <SectionHeading>FAQs</SectionHeading>
          <div className="divide-y divide-[#051A3A]/15 border-y border-[#051A3A]/15">
            {faqs.map((faq) => (
              <details key={faq.question} className="group py-1">
                <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-4 py-4 text-left text-base font-bold text-[#051A3A] marker:hidden">
                  {faq.question}
                  <span
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#F6C343]/20 text-xl font-medium text-[#051A3A] transition-transform group-open:rotate-45"
                    aria-hidden="true"
                  >
                    +
                  </span>
                </summary>
                <p className="max-w-4xl pb-6 pr-10 text-sm leading-7 text-[#2B364D]">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
