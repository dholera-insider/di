"use client"
import img1 from "@/app/assets/dholera-plots-roi.webp";
import Image from "next/image";
import BrochureDownload from "@/app/components/BrochureDownload";
import { Space_Grotesk, Inter } from "next/font/google";
import {
  ShieldCheck,
  FileText,
  Building2,
  ClipboardCheck,
  Users,
  Globe2,
  BadgeCheck,
  MapPin,
  Ruler,
  Network,
  Target,
  TrendingUp,
  Headset,
  ScrollText,
  ArrowRight,
  CheckIcon
} from "lucide-react";
import { useState } from "react";

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


const processSteps = [
  { icon: Globe2, label: "Virtual project presentation" },
  { icon: BadgeCheck, label: "Verified residential plot options" },
  { icon: ShieldCheck, label: "Transparent pricing" },
  { icon: FileText, label: "Documentation support" },
  { icon: ClipboardCheck, label: "Booking assistance" },
  { icon: ScrollText, label: "Registration guidance" },
  { icon: Users, label: "Dedicated NRI relationship manager" },
];

const comparePoints = [
  { icon: MapPin, label: "Location advantages" },
  { icon: Ruler, label: "Plot sizes" },
  { icon: Network, label: "Infrastructure nearby" },
  { icon: Target, label: "Investment objectives" },
  { icon: TrendingUp, label: "Future development potential" },
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

const whyChooseUs = [
  { icon: BadgeCheck, label: "Verified residential projects" },
  { icon: ShieldCheck, label: "Transparent pricing" },
  { icon: Users, label: "Personalized investment consultation" },
  { icon: Globe2, label: "Virtual property assistance" },
  { icon: FileText, label: "Documentation support" },
  { icon: Building2, label: "End-to-end NRI guidance" },
  { icon: Headset, label: "Dedicated customer support" },
];

const dotGrid = {
  backgroundImage:
    "radial-gradient(rgba(246,195,67,0.16) 1px, transparent 1px)",
  backgroundSize: "22px 22px",
};

function DholeraImage({ alt }) {
  return (
    <div className="relative aspect-[5/4] w-full overflow-hidden">
      <Image
        src={img1}
        alt={alt}
        fill
        className="object-cover"
        sizes="(max-width: 1024px) 100vw, 50vw"
        priority={false}
      />
    </div>
  );
}

function Eyebrow({ children, light = false }) {
  return (
    <span
      className="inline-flex items-center gap-2 text-[11px] sm:text-xs font-mono font-medium tracking-[0.16em] uppercase mb-4"
      style={{ color: "#F6C343" }}
    >
      <span
        className="h-1.5 w-1.5 rounded-full"
        style={{ backgroundColor: "#F6C343" }}
        aria-hidden="true"
      />
      {children}
    </span>
  );
}

function RouteLine() {
  return (
    <div className="w-full max-w-[300px]">
      <svg viewBox="0 0 300 24" className="w-full h-auto" aria-hidden="true">
        <line
          x1="6"
          y1="12"
          x2="294"
          y2="12"
          stroke="#F6C343"
          strokeWidth="1.5"
          strokeDasharray="3 6"
        />
        <circle cx="6" cy="12" r="4" fill="#051A3A" />
        <circle cx="294" cy="12" r="4" fill="#F6C343" />
      </svg>
      <div
        className="flex justify-between text-[10px] font-mono uppercase tracking-[0.12em] mt-1"
        style={{ color: "#6C7484" }}
      >
        <span>Bahrain</span>
        <span>Dholera, India</span>
      </div>
    </div>
  );
}

export default function DholeraBahrainPage() {
  const [openIndex, setOpenIndex] = useState(null);
  const [legalDocumentsFormOpen, setLegalDocumentsFormOpen] = useState(false);
 
  return (
    <main
      className={`${display.variable} ${body.variable}`}
      style={{ backgroundColor: "#FDFCFA", fontFamily: "var(--font-body)" }}
    >
      {/* Hero */}
      <section className="px-6 sm:px-10 lg:px-[clamp(2rem,6vw,5rem)] pt-[clamp(3rem,7vw,5.5rem)] pb-[clamp(2rem,4vw,3rem)]">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 items-center">
          <div>
            <Eyebrow>Bahrain &rarr; India &middot; Dholera SIR</Eyebrow>
            <h1
              className="font-bold tracking-tight text-[clamp(2.5rem,5.5vw,3.75rem)] leading-[1.05]"
              style={{ color: "#051A3A", fontFamily: "var(--font-display)" }}
            >
              Dholera Investment from Bahrain
            </h1>
            <p
              className="mt-6 text-[clamp(1.05rem,1.7vw,1.2rem)] leading-relaxed"
              style={{ color: "#162033" }}
            >
              Planning to make a Dholera investment from Bahrain? Dholera
              Insider helps Bahrain-based NRIs invest in verified residential
              plot projects with complete transparency and expert support.
            </p>
            <p
              className="mt-5 text-[clamp(1.05rem,1.7vw,1.2rem)] leading-relaxed"
              style={{ color: "#162033" }}
            >
              We make it easy to explore projects, verify documents, and
              complete your investment from Bahrain without unnecessary travel.
              Whether you are investing for future returns or planning to own
              property in India, our team ensures a smooth and secure
              experience.
            </p>
          </div>
          <div>
            <RouteLine />
            <div className="lg:order-1">
              <DholeraImage alt="Dholera plots ROI growth chart" />
            </div>
          </div>
        </div>
      </section>

      {/* Why Bahrain NRIs Are Looking at Dholera */}
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
              Why Bahrain NRIs Are Looking at Dholera?
            </h2>
            <p
              className="mt-5 text-[clamp(1.1rem,1.8vw,1.25rem)] leading-relaxed"
              style={{ color: "#FDFCFA", opacity: 0.92 }}
            >
              Many Indian families living in Bahrain want to build long-term
              assets in India while staying connected to their roots. Real
              estate continues to be one of the preferred investment choices,
              and Dholera is attracting attention because it is building from
              scratch, with planned infrastructure and future development.
            </p>
            <p
              className="mt-4 text-[clamp(1.1rem,1.8vw,1.25rem)] leading-relaxed"
              style={{ color: "#FDFCFA", opacity: 0.92 }}
            >
              Dholera plot investment from Bahrain offers an opportunity to own
              property in a government-backed smart city designed for future
              growth. With modern infrastructure, excellent connectivity, and
              increasing investor interest, Dholera has become a preferred
              destination for NRI investors.
            </p>
          </div>
          <div className="lg:order-1">
            <DholeraImage alt="Dholera plots ROI growth chart" />
          </div>
        </div>
      </section>

      {/* Buy a Dholera Plot from Bahrain with Complete Confidence */}
      <section className="px-6 sm:px-10 lg:px-[clamp(2rem,6vw,5rem)] py-[clamp(3rem,6vw,5rem)]">
        <div className="max-w-7xl mx-auto">
          <Eyebrow>Our Process &middot; 7 Steps</Eyebrow>
          <h2
            className="font-bold text-[clamp(1.9rem,3.6vw,2.6rem)] leading-tight"
            style={{ color: "#051A3A", fontFamily: "var(--font-display)" }}
          >
            Buy a Dholera Plot from Bahrain with Complete Confidence
          </h2>
          <p
            className="mt-5 text-[clamp(1.25rem,2vw,1.4rem)] leading-relaxed font-medium"
            style={{ color: "#2B364D" }}
          >
            Buying property while living abroad should be simple, not stressful.
          </p>
          <p
            className="mt-4 text-[clamp(1.1rem,1.8vw,1.25rem)] leading-relaxed"
            style={{ color: "#162033" }}
          >
            At Dholera Insider, we help you buy a Dholera plot from Bahrain
            through a transparent and guided process. From your first
            consultation to project selection and documentation, every step is
            managed by experienced professionals.
          </p>

          <p
            className="mt-8 mb-5 text-sm font-mono font-medium uppercase tracking-[0.14em]"
            style={{ color: "#051A3A" }}
          >
            Our process includes:
          </p>
          <div className="mt-10 relative">
            <span
              className="absolute md:hidden left-[27px] top-6 bottom-6 w-0 border-l"
              style={{
                borderLeftStyle: "dashed",
                borderColor: "rgba(5,26,58,0.35)",
              }}
              aria-hidden="true"
            />
            <span
              className="hidden md:block absolute top-6 left-[7%] right-[7%] h-0 border-t"
              style={{
                borderTopStyle: "dashed",
                borderColor: "rgba(5,26,58,0.35)",
              }}
              aria-hidden="true"
            />
            <ol className="relative flex flex-col gap-8 md:flex-row md:justify-between md:gap-3">
              {processSteps.map(({ icon: Icon, label }, idx) => (
                <li
                  key={label}
                  className="relative z-10 flex items-start gap-4 md:w-[13.5%] md:flex-col md:items-center md:gap-3 md:text-center"
                >
                  <span
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full"
                    style={{ backgroundColor: "#051A3A" }}
                  >
                    <Icon
                      className="h-5 w-5"
                      style={{ color: "#F6C343" }}
                      strokeWidth={2}
                    />
                  </span>
                  <span className="pt-1 md:pt-0">
                    <span
                      className="block text-[11px] font-mono tracking-[0.1em]"
                      style={{ color: "#6C7484" }}
                    >
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <span
                      className="mt-1 block text-sm sm:text-base leading-snug font-semibold"
                      style={{ color: "#2B364D" }}
                    >
                      {label}
                    </span>
                  </span>
                </li>
              ))}
            </ol>
          </div>

          <p
            className="mt-2 text-[clamp(1.1rem,1.8vw,1.25rem)] leading-relaxed"
            style={{ color: "#162033" }}
          >
            Everything can be completed remotely while you remain in Bahrain.
          </p>
        </div>
      </section>

      {/* Verified Residential Plots for Bahrain NRIs */}
      <section
        className="px-6 sm:px-10 lg:px-[clamp(2rem,6vw,5rem)] py-[clamp(3rem,6vw,5rem)]"
        style={{ backgroundColor: "#EEF1F6" }}
      >
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 items-center">
          <div>
            <Eyebrow>Project Selection</Eyebrow>
            <h2
              className="font-bold text-[clamp(1.9rem,3.6vw,2.6rem)] leading-tight"
              style={{ color: "#051A3A", fontFamily: "var(--font-display)" }}
            >
              Verified Residential Plots for Bahrain NRIs
            </h2>
            <p
              className="mt-5 text-[clamp(1.25rem,2vw,1.4rem)] leading-relaxed font-medium"
              style={{ color: "#2B364D" }}
            >
              Choosing the right project is one of the most important decisions
              when investing.
            </p>
            <p
              className="mt-4 text-[clamp(1.1rem,1.8vw,1.25rem)] leading-relaxed"
              style={{ color: "#162033" }}
            >
              We offer Dholera residential plots for Bahrain NRIs located in
              approved residential developments. Every project is evaluated for
              transparency, legal compliance, and long-term investment
              potential.
            </p>

            <p
              className="mt-7 mb-4 text-sm font-mono font-medium uppercase tracking-[0.14em]"
              style={{ color: "#051A3A" }}
            >
              Our team helps you compare projects based on:
            </p>
            <div className="flex flex-wrap gap-2.5">
              {comparePoints.map(({ icon: Icon, label }, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium"
                  style={{
                    border: "1px solid rgba(5,26,58,0.2)",
                    color: "#051A3A",
                    backgroundColor: "#FDFCFA",
                  }}
                >
                  <Icon
                    className="h-3.5 w-3.5"
                    style={{ color: "#F6C343" }}
                    strokeWidth={2.25}
                  />
                  {label}
                </span>
              ))}
            </div>

            <p
              className="mt-6 text-[clamp(1.1rem,1.8vw,1.25rem)] leading-relaxed"
              style={{ color: "#162033" }}
            >
              This allows you to make informed decisions with confidence.
            </p>
          </div>
          <div>
            <DholeraImage alt="Dholera plots ROI growth chart" />
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
            <p
              className="mt-5 text-[clamp(1.1rem,1.8vw,1.25rem)] leading-relaxed"
              style={{ color: "#162033" }}
            >
              For Dubai NRIs, legal safety is usually the biggest concern. You
              are far from India, so you need document clarity before making any
              booking decision.
            </p>

            <p
              className="mt-7 mb-4 text-sm font-medium uppercase "
              style={{ color: "#051A3A" }}
            >
              Before buying a Dholera plot, you should ask for:
            </p>
            <div className="flex flex-wrap gap-2.5">
              {legalDocs.map((doc) => (
                <span
                  key={doc}
                  className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium"
                  style={{
                    border: "1px solid rgba(5,26,58,0.2)",
                    color: "#051A3A",
                    backgroundColor: "#FDFCFA",
                  }}
                >
                  <CheckIcon
                    className="h-3.5 w-3.5"
                    style={{ color: "#F6C343" }}
                  />
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

            <div
              className="mt-8 flex gap-3 p-5"
              style={{
                border: "1px solid rgba(180,35,24,0.25)",
                backgroundColor: "rgba(180,35,24,0.04)",
              }}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="mt-0.5 h-5 w-5 shrink-0"
                style={{ color: "#B42318" }}
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
              <p
                className="text-sm leading-relaxed"
                style={{ color: "#162033" }}
              >
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

      {/* Why Choose Dholera Insider */}
      <section className="px-6 sm:px-10 lg:px-[clamp(2rem,6vw,5rem)] py-[clamp(3rem,6vw,5rem)]">
        <div className="max-w-7xl mx-auto">
          <Eyebrow>Why Dholera Insider</Eyebrow>
          <h2
            className="font-bold text-[clamp(1.9rem,3.6vw,2.6rem)] leading-tight"
            style={{ color: "#051A3A", fontFamily: "var(--font-display)" }}
          >
            Why Choose Dholera Insider
          </h2>
          <p
            className="mt-5 text-[clamp(1.1rem,1.8vw,1.25rem)] leading-relaxed"
            style={{ color: "#162033" }}
          >
            Dholera Insider is created exclusively for NRI investors who want
            reliable information and verified investment opportunities.
          </p>

          <p
            className="mt-7 mb-4 text-sm font-mono font-medium uppercase tracking-[0.14em]"
            style={{ color: "#051A3A" }}
          >
            We provide:
          </p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {whyChooseUs.map(({ icon: Icon, label }, idx) => (
              <div
                key={idx}
                className="relative p-6"
                style={{
                  backgroundColor: "#FDFCFA",
                  border: "1px solid rgba(5,26,58,0.12)",
                }}
              >
                <div className="flex items-start gap-3">
                  <Icon
                    className="h-9 w-9 shrink-0"
                    style={{ color: "#F6C343" }}
                    strokeWidth={2}
                  />
                  <span
                    className="text-base font-semibold leading-snug"
                    style={{ color: "#2B364D" }}
                  >
                    {label}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <p
            className="mt-6 text-[clamp(1.1rem,1.8vw,1.25rem)] leading-relaxed"
            style={{ color: "#162033" }}
          >
            Our goal is to make Dholera property investment from Bahrain simple,
            secure, and completely transparent.
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
            Start Your Dholera Investment Journey Today
          </h2>
          <button
            type="button"
            className="mt-7 inline-flex items-center gap-2 px-8 py-4 font-semibold text-lg transition-transform hover:scale-[1.02]"
            style={{ backgroundColor: "#F6C343", color: "#051A3A" }}
          >
            Start Your Dholera Investment Journey Today
            <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
          </button>
        </div>
      </section>
    </main>
  );
}
