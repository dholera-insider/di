import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  FileCheck2,
  Globe2,
  Handshake,
  MessageCircle,
  Scale,
  ShieldCheck,
  Target,
  Users,
} from "lucide-react";

export const metadata = {
  title: "About Dholera Insider | Dholera Investment for NRIs",
  description:
    "Dholera Insider helps NRIs invest in verified residential plots in Dholera Smart City with transparent guidance, legal clarity, and remote buying support.",
  keywords: [
    "Dholera Investment for NRIs",
    "Dholera plots for NRI",
    "NRI investment in Dholera",
    "Dholera residential plots",
    "Buy Dholera plot from abroad",
    "Dholera Smart City investment",
    "Dholera property investment",
    "Invest in Dholera from abroad",
    "Dholera real estate for NRIs",
    "Verified residential plots in Dholera",
  ],
  alternates: {
    canonical: "https://www.dholerainsider.com/about-us",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "About Dholera Insider | Dholera Investment for NRIs",
    description:
      "Dholera Insider helps NRIs invest in verified residential plots in Dholera Smart City with transparent guidance, legal clarity, and remote buying support.",
    url: "https://www.dholerainsider.com/about-us",
    type: "website",
  },
};

const reasons = [
  {
    Icon: Handshake,
    title: "Exclusive Channel Partner of BookMyAssets",
    description:
      "Get access to selected residential plot projects backed by one of the trusted names in Dholera real estate.",
  },
  {
    Icon: BadgeCheck,
    title: "Verified Residential Plot Projects",
    description:
      "We offer residential plot opportunities with verified documentation and complete project transparency.",
  },
  {
    Icon: FileCheck2,
    title: "Transparent Buying Process",
    description:
      "Understand pricing, legal documents, approvals, and the buying process before making any investment decision.",
  },
  {
    Icon: Users,
    title: "Dedicated NRI Support",
    description:
      "From your first enquiry to plot registration, our team assists you at every stage, wherever you are in the world.",
  },
  {
    Icon: Globe2,
    title: "Remote Buying Assistance",
    description:
      "Explore projects, review documents, and complete your investment with a convenient remote buying process.",
  },
  {
    Icon: Target,
    title: "Long-Term Investment Focus",
    description:
      "Our projects are located near major infrastructure developments with strong long-term residential potential.",
  },
];

const beliefs = [
  {
    Icon: ShieldCheck,
    title: "Trust",
    description:
      "Building long-term relationships through honest advice and dependable service.",
  },
  {
    Icon: FileCheck2,
    title: "Transparency",
    description:
      "Providing clear project information, verified documentation, and straightforward pricing.",
  },
  {
    Icon: Scale,
    title: "Integrity",
    description:
      "Helping investors make informed decisions based on facts, not sales pressure.",
  },
  {
    Icon: Handshake,
    title: "Commitment",
    description:
      "Supporting our clients before, during, and after their property purchase.",
  },
];

const trustPoints = [
  "Exclusive Channel Partner of BookMyAssets",
  "Verified Residential Plot Projects",
  "Registry Ready Opportunities",
  "Transparent Documentation",
  "Dedicated NRI Assistance",
  "Remote Buying Support",
  "Professional Guidance",
  "End-to-End Investment Assistance",
];

const aboutPageSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "About Dholera Insider",
  url: "https://www.dholerainsider.com/about-us",
  description:
    "Dholera Insider is a dedicated platform created exclusively for NRIs looking to invest in verified residential plots in Dholera Smart City.",
  mainEntity: {
    "@type": "Organization",
    name: "Dholera Insider",
    url: "https://www.dholerainsider.com",
  },
};

function SectionHeading({
  eyebrow,
  children,
  inverse = false,
  centered = false,
}) {
  return (
    <div className={`mb-10 md:mb-12 ${centered ? "text-center" : ""}`}>
      {eyebrow && (
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#F6C343]">
          {eyebrow}
        </p>
      )}
      <h2
        className={`text-[clamp(1.75rem,3.4vw,2.75rem)] font-bold leading-tight tracking-[-0.025em] ${
          inverse ? "text-white" : "text-[#051A3A]"
        }`}
      >
        {children}
      </h2>
      <div
        className={`mt-4 h-1 w-16 rounded-full bg-[#F6C343] ${
          centered ? "mx-auto" : ""
        }`}
      />
    </div>
  );
}

export default function AboutUsPage() {
  return (
    <main className="bg-[#FDFCFA] text-[#162033]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageSchema) }}
      />

      <section className="relative overflow-hidden bg-[#051A3A] px-4 pb-[clamp(3.5rem,6vw,5rem)] pt-[clamp(8rem,12vw,11rem)] sm:px-6 lg:px-8">
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "radial-gradient(circle, #F6C343 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        <div className="pointer-events-none absolute -right-24 top-20 h-96 w-80 rounded-full bg-[#F6C343]/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.22em] text-[#F6C343]">
            About Dholera Insider
          </p>
          <h1 className=" text-[clamp(2rem,4vw,4.2rem)] font-bold leading-[1.05] text-white">
            Helping NRIs Invest in Dholera with Confidence
          </h1>
          <div className="mt-6 h-1 w-20 rounded-full bg-[#F6C343]" />

          <div className="mt-10 max-w-4xl space-y-5 text-base leading-8 text-white/80 md:text-lg">
            <p>
              Dholera Insider is a dedicated platform created exclusively for
              NRIs looking to invest in verified residential plots in Dholera
              Smart City.
            </p>
            <p>
              As the exclusive channel partner of BookMyAssets, we help overseas
              Indians understand Dholera, compare residential projects, verify
              legal documents, and complete the buying process with confidence.
            </p>
            <p>
              Whether you are investing for your family's future, building a
              long-term asset, or planning to return to India, our team provides
              the guidance and support you need to make an informed decision.
            </p>
          </div>
        </div>
      </section>

      <section className="px-4 py-[clamp(3.5rem,6vw,5rem)] sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[minmax(0,.8fr)_minmax(0,1.2fr)] lg:gap-16">
          <SectionHeading>Our Mission</SectionHeading>
          <div className="space-y-5 text-base leading-8 text-[#2B364D] md:text-lg">
            <p>
              Our mission is to make Dholera investment for NRIs simple,
              transparent, and trustworthy.
            </p>
            <p>
              We believe investing in Dholera plots from another country should
              be easy. That's why we focus on verified projects, clear
              documentation, honest guidance, and dedicated support throughout
              your investment journey.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[#EEF2F9] px-4 py-[clamp(3.5rem,6vw,5rem)] sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading centered>Why Choose Dholera Insider?</SectionHeading>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {reasons.map(({ Icon, title, description }) => (
              <article
                key={title}
                className="rounded-2xl border border-[#051A3A]/10 bg-white p-6 shadow-sm"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[#F6C343]/20">
                  <Icon
                    className="h-6 w-6 text-[#051A3A]"
                    strokeWidth={1.6}
                    aria-hidden="true"
                  />
                </div>
                <h3 className="mb-3 text-lg font-bold text-[#051A3A]">
                  {title}
                </h3>
                <p className="text-sm leading-7 text-[#2B364D]">
                  {description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#051A3A] px-4 py-[clamp(3.5rem,6vw,5rem)] sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[minmax(0,.8fr)_minmax(0,1.2fr)] lg:gap-16">
          <SectionHeading inverse>
            Our Partnership with BookMyAssets
          </SectionHeading>
          <div className="space-y-5 text-base leading-8 text-white/80 md:text-lg">
            <p>
              Dholera Insider is the exclusive channel partner of BookMyAssets,
              helping NRIs access verified residential plot projects in Dholera.
            </p>
            <p>
              Together, we focus on delivering transparent information, legal
              clarity, and professional guidance so overseas investors can make
              confident property decisions.
            </p>
          </div>
        </div>
      </section>

      <section className="px-4 py-[clamp(3.5rem,6vw,5rem)] sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading centered>What We Believe</SectionHeading>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {beliefs.map(({ Icon, title, description }) => (
              <article
                key={title}
                className="rounded-2xl border border-[#051A3A]/10 bg-white p-6 shadow-sm"
              >
                <Icon
                  className="mb-5 h-8 w-8 text-[#F6C343]"
                  strokeWidth={1.6}
                  aria-hidden="true"
                />
                <h3 className="mb-3 text-lg font-bold text-[#051A3A]">
                  {title}
                </h3>
                <p className="text-sm leading-7 text-[#2B364D]">
                  {description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#EEF2F9] px-4 py-[clamp(3.5rem,6vw,5rem)] sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading centered>
            Why NRIs Trust Dholera Insider
          </SectionHeading>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {trustPoints.map((point) => (
              <li
                key={point}
                className="flex items-start gap-3 rounded-xl border border-[#051A3A]/10 bg-white px-5 py-4 shadow-sm"
              >
                <CheckCircle2
                  className="mt-0.5 h-5 w-5 shrink-0 text-[#F6C343]"
                  aria-hidden="true"
                />
                <span className="text-sm font-semibold leading-6 text-[#162033]">
                  {point}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#051A3A] px-4 py-[clamp(3.5rem,6vw,5rem)] sm:px-6 lg:px-8">
        <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-[#F6C343]/10 blur-3xl" />
        <div className="relative mx-auto max-w-4xl text-center">
          <h2 className="mb-6 text-[clamp(1.75rem,3.4vw,2.75rem)] font-bold leading-tight text-white">
            Start Your Dholera Investment Journey
          </h2>
          

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
        </div>
      </section>
    </main>
  );
}
