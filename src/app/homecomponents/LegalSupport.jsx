import { Check } from "lucide-react";

const legalServices = [
  "Project Documentation",
  "Title Verification Guidance",
  "Sale Agreement Process",
  "NA & NOC Documentation",
  "Registry Guidance",
  "NRI Documentation Support",
  "Power of Attorney Process",
  "Property Registration Assistance",
];

export function LegalSupport() {
  return (
    <section className="bg-[#051A3A] py-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-5 lg:items-start lg:gap-16">
          {/* Left — heading + description */}
          <div className="lg:col-span-2">
            <p className="mb-3 text-xs font-bold uppercase tracking-widest text-[#F6C343]">
              Legal Support
            </p>
            <h2 className="mb-5 text-[clamp(1.75rem,3vw,2.5rem)] font-bold leading-tight text-white">
              Complete Legal & Documentation Support
            </h2>
            <div className="mb-6 h-px w-14 bg-[#F6C343]" />
            <p className="text-base leading-relaxed text-white/80">
              Buying property from another country requires complete
              transparency. We ensure every buyer understands the project
              documents and buying process before making an investment decision.
            </p>
          </div>

          {/* Right — 2×4 checklist */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:col-span-3">
            {legalServices.map((service) => (
              <div
                key={service}
                className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.05] px-5 py-4"
              >
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#F6C343]/20">
                  <Check
                    className="h-3.5 w-3.5 text-[#F6C343]"
                    strokeWidth={2.5}
                  />
                </div>
                <span className="text-[0.95rem] font-medium text-white/90">
                  {service}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
