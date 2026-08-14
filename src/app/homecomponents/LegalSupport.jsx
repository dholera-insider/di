import {
  BadgeCheck,
  ClipboardCheck,
  KeyRound,
  ScrollText,
  ShieldCheck,
  Stamp,
} from "lucide-react";

const legalServices = [
  { label: "Clear Title", Icon: BadgeCheck },
  { label: "Sale Deed", Icon: ScrollText },
  { label: "NA & NOC", Icon: ShieldCheck },
  { label: "Plan Pass", Icon: ClipboardCheck },
  { label: "Registry Ready", Icon: Stamp },
  { label: "Immediate Possession", Icon: KeyRound },
];

export function LegalSupport() {
  return (
    <section className="bg-[#051A3A] px-4 py-[clamp(3.5rem,6vw,5rem)] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-5 lg:items-start lg:gap-16">
          {/* Left — heading + description */}
          <div className="lg:col-span-2">
            <h2 className="mb-4 text-[clamp(1.75rem,3vw,2.5rem)] font-bold leading-tight text-white">
              Buy with Complete Confidence
            </h2>
            <div className="h-px w-14 bg-[#F6C343]" />
          </div>

          {/* Right — 2×4 checklist */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:col-span-3">
            {legalServices.map(({ label, Icon }) => (
              <div
                key={label}
                className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.05] px-5 py-4"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F6C343]/15">
                  <Icon
                    className="h-5 w-5 text-[#F6C343]"
                    strokeWidth={1.75}
                  />
                </div>
                <span className="text-[0.95rem] font-medium text-white/90">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
