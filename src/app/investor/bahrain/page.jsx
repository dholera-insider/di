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
  Image as ImageIcon,
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

export const metadata = {
  title: "Dholera Investment from Bahrain | Dholera Insider",
  description:
    "Planning to make a Dholera investment from Bahrain? Dholera Insider helps Bahrain-based NRIs invest in verified residential plot projects with complete transparency and expert support.",
};

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

function CornerTicks({ color }) {
  const base = "absolute w-4 h-4";
  return (
    <>
      <span
        className={`${base} top-0 left-0 border-t-2 border-l-2`}
        style={{ borderColor: color }}
        aria-hidden="true"
      />
      <span
        className={`${base} top-0 right-0 border-t-2 border-r-2`}
        style={{ borderColor: color }}
        aria-hidden="true"
      />
      <span
        className={`${base} bottom-0 left-0 border-b-2 border-l-2`}
        style={{ borderColor: color }}
        aria-hidden="true"
      />
      <span
        className={`${base} bottom-0 right-0 border-b-2 border-r-2`}
        style={{ borderColor: color }}
        aria-hidden="true"
      />
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
        <ImageIcon
          className="h-7 w-7"
          style={{ color: dark ? "#F6C343" : "#051A3A", opacity: 0.55 }}
          strokeWidth={1.5}
        />
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
  return (
    <main
      className={`${display.variable} ${body.variable}`}
      style={{ backgroundColor: "#FDFCFA", fontFamily: "var(--font-body)" }}
    >
      {/* Hero */}
      <section className="px-6 sm:px-10 lg:px-[clamp(2rem,6vw,5rem)] py-[clamp(3rem,7vw,5.5rem)]">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 items-center">
          <div>
            <Eyebrow>
              Bahrain &rarr; India &middot; Dholera SIR
            </Eyebrow>
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
            <div className="mt-4">
              <ImagePlaceholder
                label="Dholera site visual / aerial plot view"
                ratio="aspect-[4/5]"
                tone="light"
              />
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
            <ImagePlaceholder
              label="Dholera SIR infrastructure visual"
              ratio="aspect-[4/3]"
              tone="dark"
            />
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
          <ol className="relative">
            <span
              className="absolute left-5 top-2 bottom-2 w-px"
              style={{ backgroundColor: "rgba(5,26,58,0.15)" }}
              aria-hidden="true"
            />
            {processSteps.map((step, idx) => (
              <li
                key={idx}
                className="relative flex items-start gap-4 pb-6 last:pb-0"
              >
                <span
                  className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-semibold"
                  style={{
                    backgroundColor: "#051A3A",
                    color: "#F6C343",
                    fontFamily: "var(--font-display)",
                  }}
                >
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <span
                  className="pt-2 text-lg leading-snug"
                  style={{ color: "#162033" }}
                >
                  {step.label}
                </span>
              </li>
            ))}
          </ol>

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
            <ImagePlaceholder
              label="Illustrative plot layout / site map"
              ratio="aspect-square"
              tone="light"
            />
          </div>
        </div>
      </section>

      {/* Assistance with Legal Documentation */}
      <section className="px-6 sm:px-10 lg:px-[clamp(2rem,6vw,5rem)] py-[clamp(3rem,6vw,5rem)]">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[0.9fr_1.1fr] gap-12 lg:gap-16 items-center">
          <div className="lg:order-2">
            <Eyebrow>Documentation</Eyebrow>
            <h2
              className="font-bold text-[clamp(1.9rem,3.6vw,2.6rem)] leading-tight"
              style={{ color: "#051A3A", fontFamily: "var(--font-display)" }}
            >
              Assistance with Legal Documentation
            </h2>
            <p
              className="mt-5 text-[clamp(1.25rem,2vw,1.4rem)] leading-relaxed font-medium"
              style={{ color: "#2B364D" }}
            >
              Many overseas investors are concerned about legal paperwork.
            </p>
            <p
              className="mt-4 text-[clamp(1.1rem,1.8vw,1.25rem)] leading-relaxed"
              style={{ color: "#162033" }}
            >
              We simplify the process by providing complete guidance on Dholera
              legal documents for Bahrain NRIs. Our experts explain every
              document clearly and help you understand the booking process,
              ownership documents, approvals, and registration requirements
              before you invest.
            </p>
            <p
              className="mt-4 text-[clamp(1.1rem,1.8vw,1.25rem)] leading-relaxed"
              style={{ color: "#162033" }}
            >
              Transparency remains our highest priority throughout your
              investment journey.
            </p>
          </div>
          <div className="lg:order-1">
            <ImagePlaceholder
              label="Sample documentation visual"
              ratio="aspect-[4/3]"
              tone="light"
            />
          </div>
        </div>
      </section>

      {/* Why Choose Dholera Insider */}
      <section
        className="relative overflow-hidden px-6 sm:px-10 lg:px-[clamp(2rem,6vw,5rem)] py-[clamp(3rem,6vw,5rem)]"
        style={{ backgroundColor: "#051A3A" }}
      >
        <div className="absolute inset-0" style={dotGrid} aria-hidden="true" />
        <div className="relative max-w-7xl mx-auto">
          <Eyebrow>Why Dholera Insider</Eyebrow>
          <h2
            className="font-bold text-[clamp(1.9rem,3.6vw,2.6rem)] leading-tight"
            style={{ color: "#FDFCFA", fontFamily: "var(--font-display)" }}
          >
            Why Choose Dholera Insider
          </h2>
          <p
            className="mt-5 text-[clamp(1.1rem,1.8vw,1.25rem)] leading-relaxed"
            style={{ color: "#FDFCFA", opacity: 0.92 }}
          >
            Dholera Insider is created exclusively for NRI investors who want
            reliable information and verified investment opportunities.
          </p>

          <p
            className="mt-7 mb-4 text-sm font-mono font-medium uppercase tracking-[0.14em]"
            style={{ color: "#F6C343" }}
          >
            We provide:
          </p>
          <div className="grid sm:grid-cols-2 gap-3">
            {whyChooseUs.map(({ icon: Icon, label }, idx) => (
              <div
                key={idx}
                className="p-4"
                style={{
                  backgroundColor: "rgba(253,252,250,0.05)",
                  border: "1px solid rgba(246,195,67,0.25)",
                }}
              >
                <div className="flex items-start gap-3">
                  <Icon
                    className="h-5 w-5 shrink-0 mt-0.5"
                    style={{ color: "#F6C343" }}
                    strokeWidth={2}
                  />
                  <span
                    className="text-base leading-snug"
                    style={{ color: "#FDFCFA" }}
                  >
                    {label}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <p
            className="mt-6 text-[clamp(1.1rem,1.8vw,1.25rem)] leading-relaxed"
            style={{ color: "#FDFCFA", opacity: 0.92 }}
          >
            Our goal is to make Dholera property investment from Bahrain simple,
            secure, and completely transparent.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 sm:px-10 lg:px-[clamp(2rem,6vw,5rem)] py-[clamp(3rem,6vw,5rem)]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6">
            <ImagePlaceholder
              label="Dholera site banner / skyline"
              ratio="aspect-[21/9]"
              tone="light"
            />
          </div>
          <div className="text-center">
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
        </div>
      </section>
    </main>
  );
}
