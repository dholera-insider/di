import { Building2, FileCheck, Globe, MapPin, Users } from "lucide-react";
import Link from "next/link";

const features = [
  {
    Icon: Building2,
    title: "Verified Residential Projects",
    description: "Residential plot with verified documentation.",
  },
  {
    Icon: FileCheck,
    title: "Complete Legal Transparency",
    description:
      "Understand pricing, approvals, NA/NOC, and registry before investing.",
  },
  {
    Icon: Users,
    title: "Dedicated NRI Support",
    description: "Personal assistance from enquiry to registry.",
  },
  {
    Icon: MapPin,
    title: "Strategic Project Locations",
    description:
      "Projects located near major infrastructure and future growth corridors.",
  },
  {
    Icon: Globe,
    title: "Remote Buying Assistance",
    description: "Complete your investment from anywhere in the world.",
  },
];

export default function WhyDI() {
  return (
    <section className="bg-[#FDFCFA] px-4 py-[clamp(3.5rem,6vw,5rem)] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-5 lg:gap-16">
          <div className="lg:col-span-2 lg:sticky lg:top-24 lg:self-start">
            <h2 className="mb-4 text-[clamp(1.75rem,3vw,2.5rem)] font-bold leading-tight text-[#051A3A]">
              Why Choose Dholera Insider?
            </h2>
            <div className="mb-4 h-px w-14 bg-[#F6C343]" />
            <p className="text-[clamp(0.9rem,1vw,1.05rem)] leading-relaxed text-[#2B364D]">
              As the exclusive channel partner of BookMyAssets for NRI
              investors, Dholera Insider helps NRI investors with confidence
              through our verified residential projects and transparent
              guidance.
            </p>
          </div>

          <div className="lg:col-span-3">
            <div className="divide-y divide-[#051A3A]/10">
              {features.map(({ Icon, title, description }) => (
                <div key={title} className="group flex gap-5 py-6 first:pt-0">
                  <div className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#F6C343]/20">
                    <Icon
                      className="h-6 w-6 text-[#051A3A]"
                      strokeWidth={1.5}
                      aria-hidden="true"
                    />
                  </div>
                  <div>
                    <h4 className="mb-2 text-lg font-bold text-[#051A3A]">
                      {title}
                    </h4>
                    <p className="text-sm leading-relaxed text-[#2B364D]">
                      {description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-10 flex justify-start">
              <Link
                href="/about-us"
                className="inline-flex min-h-12 items-center justify-center rounded-lg bg-[#051A3A] px-7 py-3 text-base font-bold text-[#FDFCFA] shadow-lg transition-colors hover:bg-[#F6C343] hover:text-[#051A3A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F6C343] focus-visible:ring-offset-2"
              >
                About Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
