import {
  Building2,
  FileCheck,
  Users,
  ClipboardList,
  MapPin,
  Globe,
} from "lucide-react";

const features = [
  {
    Icon: Building2,
    title: "Exclusive Residential Plot Projects",
    description:
      "Access carefully selected residential plotted developments in and around Dholera, designed for long-term investment and future residential use.",
  },
  {
    Icon: FileCheck,
    title: "Transparent Documentation",
    description:
      "Receive complete project information, including layout plans, pricing, legal documents, NA/NOC details, and registry guidance before making any investment decision.",
  },
  {
    Icon: Users,
    title: "Dedicated NRI Support",
    description:
      "From your first enquiry to property registration, our team provides personalized assistance for overseas Indian investors across different countries and time zones.",
  },
  {
    Icon: ClipboardList,
    title: "End-to-End Buying Assistance",
    description:
      "We guide you through every stage of your investment journey—from project selection and document verification to booking, payment, registry, and post-purchase support.",
  },
  {
    Icon: MapPin,
    title: "Strategic Project Locations",
    description:
      "Our residential projects are located in well-connected areas near major infrastructure developments, offering strong long-term investment potential.",
  },
  {
    Icon: Globe,
    title: "100% Remote Buying Process",
    description:
      "Buy your residential plot from anywhere in the world through secure digital consultations, online documentation, and remote booking assistance.",
  },
];

export default function WhyDI() {
  return (
    <section className="bg-[#FDFCFA] py-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-5 lg:gap-20">

          {/* Left — sticky header */}
          <div className="lg:col-span-2 lg:sticky lg:top-24 lg:self-start">
            <p className="mb-3 text-xs font-bold uppercase tracking-widest text-[#F6C343]">
              Exclusive Channel Partner
            </p>
            <h2 className="mb-5 text-[clamp(1.75rem,3vw,2.5rem)] font-bold leading-tight text-[#051A3A]">
              Why Investors Choose Dholera Insider
            </h2>
            <div className="mb-6 h-px w-14 bg-[#F6C343]" />
            <p className="mb-4 text-[clamp(0.875rem,1.1vw,0.95rem)] leading-relaxed text-[#2B364D]/70">
              At Dholera Insider, the exclusive Channel Partner of BookMyAssets
              for NRI investors, we go beyond simply showcasing projects. We
              provide exclusive residential plot opportunities, verified project
              information, and dedicated support to make investing in Dholera
              simple, transparent, and secure.
            </p>
            <p className="text-[clamp(0.875rem,1.1vw,0.95rem)] leading-relaxed text-[#2B364D]/70">
              Whether you are buying your first property in India or expanding
              your investment portfolio, our team is committed to helping you
              make an informed decision.
            </p>
          </div>

          {/* Right — feature list */}
          <div className="lg:col-span-3 divide-y divide-[#051A3A]/10">
            {features.map(({ Icon, title, description }) => (
              <div
                key={title}
                className="group flex gap-5 py-7 first:pt-0 last:pb-0 transition-colors duration-300"
              >
                {/* Icon pill */}
                <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F6C343]/15 transition-colors duration-300 group-hover:bg-[#051A3A]">
                  <Icon
                    className="h-5 w-5 text-[#051A3A] transition-colors duration-300 group-hover:text-[#F6C343]"
                    strokeWidth={1.5}
                  />
                </div>

                {/* Text */}
                <div>
                  <h3 className="mb-2 text-sm font-bold text-[#051A3A]">
                    {title}
                  </h3>
                  <p className="text-sm leading-relaxed text-[#2B364D]/60 transition-colors duration-300 group-hover:text-[#2B364D]/90">
                    {description}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}