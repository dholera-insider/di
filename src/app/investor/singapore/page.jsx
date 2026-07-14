"use client";

import { useState } from "react";
import Link from "next/link";
import BrochureDownload from "@/app/components/BrochureDownload";
import { Space_Grotesk, Inter } from "next/font/google";
import {
  Plus,
  Minus,
  ShieldCheck,
  FileText,
  Building2,
  Headset,
  Globe2,
  BadgeCheck,
  Sparkles,
  Landmark,
  Rocket,
  Signal,
  TrendingUp,
  ImageIcon,
  Wallet,
  UserCheck,
  Users,
  Search,
  PlayCircle,
  CalendarClock,
  FileCheck2,
  Clock,
  MapPin,
  PhoneCall,
} from "lucide-react";

const display = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
});

const body = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
});

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

const dotGrid = {
  backgroundImage:
    "radial-gradient(rgba(246,195,67,0.16) 1px, transparent 1px)",
  backgroundSize: "22px 22px",
};

function CornerTicks({ color }) {
  const base = "absolute w-4 h-4";
  return (
    <>
      <span className={`${base} top-0 left-0 border-t-2 border-l-2`} style={{ borderColor: color }} aria-hidden="true" />
      <span className={`${base} top-0 right-0 border-t-2 border-r-2`} style={{ borderColor: color }} aria-hidden="true" />
      <span className={`${base} bottom-0 left-0 border-b-2 border-l-2`} style={{ borderColor: color }} aria-hidden="true" />
      <span className={`${base} bottom-0 right-0 border-b-2 border-r-2`} style={{ borderColor: color }} aria-hidden="true" />
    </>
  );
}

function ImagePlaceholder({ label, ratio = "aspect-[4/5]", tone = "light" }) {
  const dark = tone === "dark";
  return (
    <div
      className={`relative ${ratio} w-full overflow-hidden`}
      style={{
        backgroundColor: dark ? "rgba(253,252,250,0.04)" : "#EEF1F6",
        border: `1px dashed ${dark ? "rgba(246,195,67,0.4)" : "rgba(5,26,58,0.28)"}`,
      }}
    >
      <div className="absolute inset-3 sm:inset-4 pointer-events-none">
        <CornerTicks color={dark ? "#F6C343" : "#051A3A"} />
      </div>
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2.5 px-8 text-center">
        <ImageIcon className="h-7 w-7" style={{ color: dark ? "#F6C343" : "#051A3A", opacity: 0.55 }} strokeWidth={1.5} />
        <span
          className="text-[11px] font-mono tracking-[0.12em] uppercase leading-relaxed"
          style={{ color: dark ? "rgba(253,252,250,0.6)" : "#6C7484" }}
        >
          {label}
        </span>
      </div>
    </div>
  );
}

function Eyebrow({ children, dark = false }) {
  return (
    <span
      className="inline-flex items-center gap-2 text-[11px] sm:text-xs font-mono font-medium tracking-[0.16em] uppercase mb-4"
      style={{ color: "#F6C343" }}
    >
      <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: "#F6C343" }} aria-hidden="true" />
      {children}
    </span>
  );
}

function RouteLine() {
  return (
    <div className="w-full max-w-[300px]">
      <svg viewBox="0 0 300 24" className="w-full h-auto" aria-hidden="true">
        <line x1="6" y1="12" x2="294" y2="12" stroke="#F6C343" strokeWidth="1.5" strokeDasharray="3 6" />
        <circle cx="6" cy="12" r="4" fill="#051A3A" />
        <circle cx="294" cy="12" r="4" fill="#F6C343" />
      </svg>
      <div className="flex justify-between text-[10px] font-mono uppercase tracking-[0.12em] mt-1" style={{ color: "#6C7484" }}>
        <span>Dubai</span>
        <span>Dholera, India</span>
      </div>
    </div>
  );
}

/* Trust badge strip — mirrors the reference sites' "100% Transparent / Legally Verified / End-to-End Support" row */
const trustBadges = [
  { icon: ShieldCheck, label: "100% Transparent Process" },
  { icon: BadgeCheck, label: "Legally Verified Projects" },
  { icon: Headset, label: "End-to-End NRI Support" },
];

/* Quick stats — mirrors the reference sites' "500+ / 25+ / 7+ / 100%" bar */
const stats = [
  { icon: Users, value: "500+", label: "Happy NRI families" },
  { icon: Globe2, value: "25+", label: "Countries served" },
  { icon: Clock, value: "7+", label: "Years of advisory" },
  { icon: ShieldCheck, value: "100%", label: "Transparent process" },
];

const whyChoosing = [
  { icon: Sparkles, text: "Opportunity to invest early in a developing smart city" },
  { icon: BadgeCheck, text: "Verified residential plot projects" },
  { icon: Wallet, text: "Affordable entry compared to many metro cities" },
  { icon: TrendingUp, text: "Excellent long-term appreciation potential" },
  { icon: Globe2, text: "A simple remote buying process" },
  { icon: UserCheck, text: "Professional guidance designed for NRIs" },
];

const insiderCards = [
  {
    icon: BadgeCheck,
    tint: "#F6C343",
    title: "Verified Residential Plot Projects",
    body: "Every project we recommend is carefully verified, helping you invest with confidence.",
  },
  {
    icon: ShieldCheck,
    tint: "#4C9F70",
    title: "Complete Transparency",
    body: "From pricing to documentation, we ensure every detail is shared clearly with no hidden surprises.",
  },
  {
    icon: Headset,
    tint: "#3E7CB1",
    title: "Dedicated Support for Dubai NRIs",
    body: "We understand the unique needs of investors living in Dubai. Our team provides online consultations, virtual project presentations, and continuous assistance throughout the buying process.",
  },
  {
    icon: Building2,
    tint: "#B4772E",
    title: "End-to-End Assistance",
    body: "From your first enquiry to registration and construction, we guide you through every step, making your investment journey smooth and hassle-free.",
  },
];

const steps = [
  { num: "01", icon: Users, text: "Connect with our investment advisors." },
  { num: "02", icon: Search, text: "Explore verified residential plot projects in Dholera." },
  { num: "03", icon: PlayCircle, text: "Attend a virtual project presentation and receive complete project details." },
  { num: "04", icon: Wallet, text: "Book your residential plot with the token amount ₹50000.", sub: "Complete Your KYC" },
  { num: "05", icon: CalendarClock, text: "Complete payment according to the payment plan" },
  { num: "06", icon: FileCheck2, text: "Get your plot registered." },
];

const legalDocs = [
  "Title documents",
  "NA/NOC details",
  "7/12 extract or relevant land record",
  "Ownership proof",
  "Plan layout",
  "Registry process details",
  "Payment schedule",
  "Developer details",
  "Approved plan pass",
  "Final cost sheet",
];

const buyerDocs = ["Aadhar Card", "Pan Card"];

/* Why Invest — converted to an icon-card grid, matching the reference sites' feature-grid pattern */
const highlights = [
  { icon: Landmark, label: "Planned smart city infrastructure" },
  { icon: ShieldCheck, label: "Strong government support" },
  { icon: Sparkles, label: "India's first semiconductor plant" },
  { icon: Signal, label: "Excellent connectivity through major infrastructure projects" },
  { icon: TrendingUp, label: "Growing demand for residential properties" },
  { icon: Rocket, label: "Long-term investment potential" },
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
  const [openIndex, setOpenIndex] = useState(null);
  const [legalDocumentsFormOpen, setLegalDocumentsFormOpen] = useState(false);
  const toggleFAQ = (index) => setOpenIndex(openIndex === index ? null : index);

  return (
    <main
      className={`${display.variable} ${body.variable}`}
      style={{ backgroundColor: "#FDFCFA", fontFamily: "var(--font-body)" }}
    >
      <meta name="robots" content="noindex, nofollow" />
      <meta name="description" content="" />

      {/* HERO */}
      <section className="px-6 sm:px-10 lg:px-[clamp(2rem,6vw,5rem)] pt-[clamp(3rem,7vw,5.5rem)] pb-[clamp(2rem,4vw,3rem)]">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 items-center">
          <div>
            <Eyebrow>Dubai &rarr; India &middot; Dholera SIR</Eyebrow>
            <h1
              className="font-bold tracking-tight text-[clamp(2.5rem,5.5vw,3.75rem)] leading-[1.05]"
              style={{ color: "#051A3A", fontFamily: "var(--font-display)" }}
            >
              Dholera Residential Plots for Dubai NRIs
            </h1>
            <p className="mt-5 text-[clamp(1.15rem,2vw,1.35rem)] font-semibold leading-snug" style={{ color: "#2B364D" }}>
              Invest in India&apos;s First Greenfield Smart City from Dubai
            </p>
            <p className="mt-5 text-[clamp(1.05rem,1.7vw,1.2rem)] leading-relaxed" style={{ color: "#162033" }}>
              Living in Dubai doesn&apos;t mean you have to miss the opportunity
              to invest in India&apos;s future. At Dholera Insider, we help
              Dubai NRIs invest in verified residential plots in Dholera Smart
              City through a secure, transparent, and fully remote process.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <button
                type="button"
                className="inline-flex items-center gap-2 px-8 py-4 font-semibold text-lg transition-transform hover:scale-[1.02]"
                style={{ backgroundColor: "#051A3A", color: "#F6C343" }}
              >
                Connect With Our Advisors
              </button>
              <Link
                href="tel:+918130371647"
                className="inline-flex items-center gap-2 px-6 py-4 font-semibold text-base transition-colors"
                style={{ border: "1px solid rgba(5,26,58,0.25)", color: "#051A3A" }}
              >
                <PhoneCall className="h-4 w-4" strokeWidth={2} />
                Give Us A Missed Call
              </Link>
            </div>

            {/* Trust badge strip */}
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
              {trustBadges.map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2">
                  <Icon className="h-4 w-4 shrink-0" style={{ color: "#F6C343" }} strokeWidth={2} />
                  <span className="text-sm font-medium" style={{ color: "#2B364D" }}>
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <RouteLine />
            <div className="mt-4">
              <ImagePlaceholder label="Dubai skyline to Dholera site visual" ratio="aspect-[4/3]" tone="light" />
            </div>
          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <section className="px-6 sm:px-10 lg:px-[clamp(2rem,6vw,5rem)]">
        <div
          className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 py-6"
          style={{ borderTop: "1px solid rgba(5,26,58,0.1)", borderBottom: "1px solid rgba(5,26,58,0.1)" }}
        >
          {stats.map(({ icon: Icon, value, label }) => (
            <div key={label} className="flex items-center gap-3">
              <span
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
                style={{ backgroundColor: "rgba(246,195,67,0.16)" }}
              >
                <Icon className="h-5 w-5" style={{ color: "#F6C343" }} strokeWidth={2} />
              </span>
              <div>
                <p className="text-xl font-bold leading-none" style={{ color: "#051A3A", fontFamily: "var(--font-display)" }}>
                  {value}
                </p>
                <p className="mt-1 text-xs leading-tight" style={{ color: "#6C7484" }}>
                  {label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* WHY DUBAI NRIs ARE CHOOSING DHOLERA */}
      <section
        className="relative overflow-hidden px-6 sm:px-10 lg:px-[clamp(2rem,6vw,5rem)] py-[clamp(3rem,6vw,5rem)]"
        style={{ backgroundColor: "#051A3A" }}
      >
        <div className="absolute inset-0" style={dotGrid} aria-hidden="true" />
        <div className="relative max-w-7xl mx-auto grid lg:grid-cols-[0.9fr_1.1fr] gap-12 lg:gap-16 items-center">
          <div className="lg:order-2">
            <Eyebrow>The Opportunity</Eyebrow>
            <h2
              className="font-bold text-[clamp(1.9rem,3.6vw,2.6rem)] leading-tight"
              style={{ color: "#FDFCFA", fontFamily: "var(--font-display)" }}
            >
              Why Dubai NRIs Are Choosing Dholera
            </h2>

            <p className="mt-7 mb-4 text-sm font-mono font-medium uppercase tracking-[0.14em]" style={{ color: "#F6C343" }}>
              For Dubai-based investors, Dholera offers:
            </p>
            <ul className="space-y-3">
              {whyChoosing.map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-center gap-3">
                  <span
                    className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full"
                  >
                    <Icon className="h-8 w-8" style={{ color: "#F6C343" }} strokeWidth={2} />
                  </span>
                  <span style={{ color: "#FDFCFA", opacity: 0.92 }}>{text}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:order-1">
            <ImagePlaceholder label="Dholera SIR infrastructure visual" ratio="aspect-[4/3]" tone="dark" />
          </div>
        </div>
      </section>

      {/* WHY CHOOSE DHOLERA INSIDER */}
      <section className="px-6 sm:px-10 lg:px-[clamp(2rem,6vw,5rem)] py-[clamp(3rem,6vw,5rem)]">
        <div className="max-w-7xl mx-auto">
          <Eyebrow>Why Dholera Insider</Eyebrow>
          <h2
            className="font-bold text-[clamp(1.9rem,3.6vw,2.6rem)] leading-tight"
            style={{ color: "#051A3A", fontFamily: "var(--font-display)" }}
          >
            Why Choose Dholera Insider?
          </h2>
          <p
            className="mt-5 max-w-2xl text-[clamp(1.1rem,1.8vw,1.25rem)] leading-relaxed"
            style={{ color: "#162033" }}
          >
            Buying property from another country requires trust, clarity, and
            reliable support. That&apos;s exactly what we provide.
          </p>

          <div className="mt-10 grid gap-6 sm:grid-cols-4">
            {insiderCards.map(({ icon: Icon, title, body, tint }) => (
              <div
                key={title}
                className="relative p-6"
                style={{
                  border: "1px solid rgba(5,26,58,0.12)",
                  backgroundColor: "#FDFCFA",
                }}
              >
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-full"
                  
                >
                  <Icon
                    className="h-9 w-9"
                    style={{ color: tint }}
                    strokeWidth={2}
                  />
                </div>
                <h3
                  className="mt-4 text-lg font-semibold"
                  style={{
                    color: "#2B364D",
                    fontFamily: "var(--font-display)",
                  }}
                >
                  {title}
                </h3>
                <p
                  className="mt-2 text-sm leading-relaxed"
                  style={{ color: "#162033" }}
                >
                  {body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW DUBAI NRIs CAN BUY — connected step flow, vertical on mobile / horizontal on desktop */}
      <section className="px-6 sm:px-10 lg:px-[clamp(2rem,6vw,5rem)] py-[clamp(3rem,6vw,5rem)]" style={{ backgroundColor: "#EEF1F6" }}>
        <div className="max-w-7xl mx-auto">
          <Eyebrow>Our Process &middot; 6 Steps</Eyebrow>
          <h2
            className="font-bold text-[clamp(1.9rem,3.6vw,2.6rem)] leading-tight"
            style={{ color: "#051A3A", fontFamily: "var(--font-display)" }}
          >
            How Dubai NRIs Can Buy Residential Plots in Dholera
          </h2>
          <p className="mt-2 text-sm font-mono uppercase tracking-[0.12em]" style={{ color: "#6C7484" }}>
            (Step by step process to buy plot in Dholera)
          </p>
          <p className="mt-5 text-[clamp(1.1rem,1.8vw,1.25rem)] leading-relaxed" style={{ color: "#162033" }}>
            Investing from Dubai is easier than ever.
          </p>

          <div className="mt-10 relative">
            <span
              className="absolute md:hidden left-[27px] top-6 bottom-6 w-0 border-l"
              style={{ borderLeftStyle: "dashed", borderColor: "rgba(5,26,58,0.35)" }}
              aria-hidden="true"
            />
            <span
              className="hidden md:block absolute top-6 left-[8%] right-[8%] h-0 border-t"
              style={{ borderTopStyle: "dashed", borderColor: "rgba(5,26,58,0.35)" }}
              aria-hidden="true"
            />

            <div className="relative flex flex-col gap-8 md:flex-row md:justify-between md:gap-4">
              {steps.map(({ num, icon: Icon, text, sub }) => (
                <div
                  key={num}
                  className="relative z-10 flex items-start gap-4 md:flex-col md:items-center md:text-center md:gap-3 md:w-[15%]"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full" style={{ backgroundColor: "#051A3A" }}>
                    <Icon className="h-5 w-5" style={{ color: "#F6C343" }} strokeWidth={2} />
                  </div>
                  <div className="pt-1 md:pt-0">
                    <span className="block text-[11px] font-mono tracking-[0.1em]" style={{ color: "#6C7484" }}>
                      {num}
                    </span>
                    <p className="mt-1 text-sm sm:text-base leading-snug font-semibold" style={{ color: "#2B364D" }}>
                      {text}
                    </p>
                    {sub && (
                      <span
                        className="mt-2 inline-flex w-fit items-center rounded-full px-3 py-1 text-xs font-bold"
                        style={{ backgroundColor: "#F6C343", color: "#051A3A" }}
                      >
                        {sub}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* LEGAL DOCUMENTS */}
      <section className="px-6 sm:px-10 lg:px-[clamp(2rem,6vw,5rem)] py-[clamp(3rem,6vw,5rem)]">
        <div className="max-w-7xl mx-auto gap-12 lg:gap-16 items-center">
          <div>
            <Eyebrow>Documentation</Eyebrow>
            <h2
              className="font-bold text-[clamp(1.9rem,3.6vw,2.6rem)] leading-tight"
              style={{ color: "#051A3A", fontFamily: "var(--font-display)" }}
            >
              Legal Documents You Should Check Before Buying
            </h2>
            <p className="mt-5 text-[clamp(1.1rem,1.8vw,1.25rem)] leading-relaxed" style={{ color: "#162033" }}>
              For Dubai NRIs, legal safety is usually the biggest concern. You
              are far from India, so you need document clarity before making any
              booking decision.
            </p>

            <p className="mt-7 mb-4 text-sm font-medium uppercase " style={{ color: "#051A3A" }}>
              Before buying a Dholera plot, you should ask for:
            </p>
            <div className="flex flex-wrap gap-2.5">
              {legalDocs.map((doc) => (
                <span
                  key={doc}
                  className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium"
                  style={{ border: "1px solid rgba(5,26,58,0.2)", color: "#051A3A", backgroundColor: "#FDFCFA" }}
                >
                  <CheckIcon className="h-3.5 w-3.5" style={{ color: "#F6C343" }} />
                  {doc}
                </span>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setLegalDocumentsFormOpen(true)}
              className="mt-7 inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-[#F6C343] px-6 py-3 text-base font-semibold text-[#051A3A] shadow-sm transition-colors hover:bg-[#e7b536] focus:outline-none focus:ring-2 focus:ring-[#051A3A] focus:ring-offset-2"
            >
              <FileText className="h-5 w-5" aria-hidden="true" />
              Check Documents
            </button>

            <div className="mt-8 flex gap-3 p-5" style={{ border: "1px solid rgba(180,35,24,0.25)", backgroundColor: "rgba(180,35,24,0.04)" }}>
              <svg viewBox="0 0 24 24" fill="none" className="mt-0.5 h-5 w-5 shrink-0" style={{ color: "#B42318" }} aria-hidden="true">
                <path
                  d="M12 9v4m0 4h.01M10.3 3.86l-8.2 14.2A1 1 0 0 0 2.97 19.5h18.06a1 1 0 0 0 .87-1.44l-8.2-14.2a1 1 0 0 0-1.74 0Z"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <p className="text-sm leading-relaxed" style={{ color: "#162033" }}>
                At Dholera Insider, our goal is to help NRI buyers review the
                important documents before they move forward.{" "}
                <span className="font-semibold" style={{ color: "#B42318" }}>
                  You should not feel pressured to book a plot before
                  understanding what you are buying.
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {legalDocumentsFormOpen && (
        <BrochureDownload
          title="Get the Legal Documents Checklist"
          subtitle="Share your details to download the Dholera plot document verification checklist."
          buttonName="Download Checklist"
          thankYouMessage="Your request was submitted successfully."
          source="Dubai Investor Legal Documents Checklist"
          link="/pdf/Legal%20Verification%20Estates.pdf"
          downloadFilename="Legal Verification Estates.pdf"
          downloadLabel="legal documents checklist"
          redirectPath={null}
          onClose={() => setLegalDocumentsFormOpen(false)}
        />
      )}

      {/* DOCUMENTS REQUIRED FROM BUYER */}
      <section className="px-6 sm:px-10 lg:px-[clamp(2rem,6vw,5rem)] py-[clamp(2.5rem,5vw,4rem)]" style={{ backgroundColor: "#EEF1F6" }}>
        <div className="max-w-7xl mx-auto">
          <Eyebrow>From the Buyer</Eyebrow>
          <h2
            className="font-bold text-[clamp(1.4rem,2.8vw,1.9rem)] leading-tight"
            style={{ color: "#051A3A", fontFamily: "var(--font-display)" }}
          >
            Documents Required from Buyer / Investor Living in Dubai
          </h2>
          <div className="mt-5 flex flex-wrap gap-3">
            {buyerDocs.map((doc) => (
              <span
                key={doc}
                className="rounded-full px-5 py-2 text-sm font-semibold"
                style={{ border: "1px solid rgba(5,26,58,0.15)", backgroundColor: "#FDFCFA", color: "#2B364D" }}
              >
                {doc}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* WHY INVEST — icon-card grid (reference-inspired feature grid) */}
      <section className="px-6 sm:px-10 lg:px-[clamp(2rem,6vw,5rem)] py-[clamp(3rem,6vw,5rem)]">
        <div className="max-w-7xl mx-auto">
          <Eyebrow>The Bigger Picture</Eyebrow>
          <h2
            className="font-bold text-[clamp(1.9rem,3.6vw,2.6rem)] leading-tight max-w-2xl"
            style={{ color: "#051A3A", fontFamily: "var(--font-display)" }}
          >
            Why Invest in Dholera Smart City?
          </h2>
          <p className="mt-5 max-w-2xl text-[clamp(1.1rem,1.8vw,1.25rem)] leading-relaxed" style={{ color: "#162033" }}>
            Dholera Smart City is one of India&apos;s most ambitious urban
            development projects, planned with world-class infrastructure and
            modern connectivity. For Dubai NRIs, it represents an opportunity
            to invest in the growth of a future-ready city.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {highlights.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-start gap-3 p-5"
                style={{ backgroundColor: "#EEF1F6" }}
              >
                <span
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
                  style={{ backgroundColor: "#051A3A" }}
                >
                  <Icon className="h-5 w-5" style={{ color: "#F6C343" }} strokeWidth={2} />
                </span>
                <span className="pt-2 text-sm font-medium leading-snug" style={{ color: "#2B364D" }}>
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY TRUST US */}
      <section
        className="relative overflow-hidden px-6 sm:px-10 lg:px-[clamp(2rem,6vw,5rem)] py-[clamp(3rem,6vw,5rem)]"
        style={{ backgroundColor: "#051A3A" }}
      >
        <div className="absolute inset-0" style={dotGrid} aria-hidden="true" />
        <div className="relative max-w-7xl mx-auto">
          <Eyebrow>Why Dubai NRIs Trust Us</Eyebrow>
          <h2
            className="font-bold text-[clamp(1.9rem,3.6vw,2.6rem)] leading-tight"
            style={{ color: "#FDFCFA", fontFamily: "var(--font-display)" }}
          >
            Why Dubai NRIs Trust Dholera Insider
          </h2>

          <div className="mt-7 grid sm:grid-cols-2 gap-3">
            {trustPoints.map((item) => (
              <div key={item} className="p-4" style={{ backgroundColor: "rgba(253,252,250,0.05)", border: "1px solid rgba(246,195,67,0.25)" }}>
                <div className="flex items-start gap-3">
                  <CheckIcon className="mt-0.5 h-5 w-5 shrink-0 text-[#F6C343]" />
                  <span className="text-base leading-snug" style={{ color: "#FDFCFA" }}>
                    {item}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-6 max-w-2xl text-[clamp(1.1rem,1.8vw,1.25rem)] leading-relaxed" style={{ color: "#FDFCFA", opacity: 0.92 }}>
            Our focus is to help every Dubai NRI invest with confidence through
            reliable information, trusted projects, and exceptional service.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 sm:px-10 lg:px-[clamp(2rem,6vw,5rem)] py-[clamp(3rem,6vw,5rem)]">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          <h2
            className="font-bold text-[clamp(1.75rem,3.4vw,2.3rem)] leading-tight"
            style={{ color: "#051A3A", fontFamily: "var(--font-display)" }}
          >
            Start Your Investment Journey from Dubai
          </h2>
          <button
            type="button"
            className="mt-7 inline-flex items-center gap-2 px-8 py-4 font-semibold text-lg transition-transform hover:scale-[1.02]"
            style={{ backgroundColor: "#F6C343", color: "#051A3A" }}
          >
            Connect With Our Advisors
          </button>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 sm:px-10 lg:px-[clamp(2rem,6vw,5rem)] py-[clamp(3rem,6vw,5rem)]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-[clamp(1.5rem,4vw,3rem)]">
          <div className="w-full md:w-2/5">
            <Eyebrow>Questions</Eyebrow>
            <h2
              className="font-bold text-[clamp(1.5rem,3vw,2rem)] leading-tight"
              style={{ color: "#051A3A", fontFamily: "var(--font-display)" }}
            >
              FAQs
            </h2>
            <div className="pt-6">
              <Link
                className="inline-flex items-center gap-2 px-6 py-3 font-semibold text-sm transition-colors"
                style={{ backgroundColor: "#051A3A", color: "#F6C343" }}
                href="tel:+918130371647"
              >
                Give Us A Missed Call
              </Link>
            </div>
          </div>

          <div className="w-full md:w-3/5 space-y-1">
            {faqs.map((faq, index) => (
              <div key={faq.q} style={{ borderBottom: "1px solid rgba(5,26,58,0.12)" }}>
                <button
                  className="w-full py-[clamp(0.875rem,2vw,1rem)] flex justify-between items-center text-left transition-colors"
                  onClick={() => toggleFAQ(index)}
                >
                  <span className="font-medium pr-4 leading-relaxed" style={{ color: "#051A3A" }}>
                    {faq.q}
                  </span>
                  <span className="flex-shrink-0">
                    {openIndex === index ? (
                      <Minus className="w-5 h-5" style={{ color: "#F6C343" }} />
                    ) : (
                      <Plus className="w-5 h-5" style={{ color: "#F6C343" }} />
                    )}
                  </span>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="pb-4">
                    <p className="text-sm leading-relaxed" style={{ color: "#162033" }}>
                      {faq.a}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}