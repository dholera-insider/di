import Link from "next/link";
import { Building2, Cpu, Home, Landmark, Plane } from "lucide-react";

const highlights = [
  {
    number: "01",
    label: "India's First Greenfield Smart City",
    Icon: Landmark,
  },
  {
    number: "02",
    label: "Tata Semiconductor Project",
    Icon: Cpu,
  },
  {
    number: "03",
    label: "Airport, Expressway, Rail and DFC Connectivity",
    Icon: Plane,
  },
  {
    number: "04",
    label: "Government Planned Development",
    Icon: Building2,
  },
  {
    number: "05",
    label: "Future Residential Growth",
    Icon: Home,
  },
];

export default function WhyDholera() {
  return (
    <section className="relative overflow-hidden bg-[#FDFCFA] py-4 px-4 sm:px-6 lg:px-8">

      {/* Watermark */}
      {/* <div className="pointer-events-none hidden md:block select-none absolute inset-0 md:flex items-center justify-center">
        <span className="whitespace-nowrap text-[clamp(5rem,16vw,15rem)] font-black uppercase tracking-[0.2em] text-[#051A3A]/[0.09]">
          DHOLERA
        </span>
      </div> */}

      <div className="relative z-10 mx-auto max-w-7xl">

        {/* Centered header */}
        <div className="mb-16 text-center">
          <p className="mb-3 text-xs font-bold uppercase tracking-widest text-[#F6C343]">
            NRI Investment Destination
          </p>
          <h2 className="mb-5 text-[clamp(1.75rem,4vw,3rem)] font-bold leading-tight text-[#051A3A]">
            Why Invest in Dholera?
          </h2>
          <div className="mx-auto mb-6 h-px w-16 bg-[#F6C343]" />
          <p className="mx-auto max-w-2xl text-[clamp(0.9rem,1.2vw,1.05rem)] leading-relaxed text-[#2B364D]/70">
            Dholera is India's first Greenfield Smart City and one of the country's
            largest planned infrastructure developments. With major industrial
            investments, world-class connectivity, and long-term urban planning, it
            has become an attractive destination for NRI property investors.
          </p>
        </div>

        {/* Highlights — bordered horizontal strip */}
        <div className="grid grid-cols-1 border-y border-[#051A3A]/10 divide-y divide-[#051A3A]/10 lg:grid-cols-5 lg:divide-x lg:divide-y-0">
          {highlights.map(({ number, label, Icon }) => (
            <div
              key={number}
              className="group flex flex-col gap-5 px-8 py-4 transition-colors duration-300 hover:bg-[#051A3A]/[0.03]"
            >
              <span className="font-mono text-4xl font-black leading-none text-[#051A3A] transition-colors group-hover:text-[#F6C343]">
                {number}
              </span>
              <div className="flex items-center gap-3">

              <Icon
                className="h-7 w-7 text-[#F6C343]"
                strokeWidth={1.25}
                />
              <p className="text-sm font-medium leading-relaxed text-[#2B364D] transition-colors group-hover:text-[#051A3A]">
                {label}
              </p>
                </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <Link
            href="/about-dholera-sir"
            className="inline-flex min-h-12 items-center justify-center rounded-lg bg-[#051A3A] px-7 py-3 text-base font-bold text-[#FDFCFA] shadow-lg transition-colors hover:bg-[#F6C343] hover:text-[#051A3A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F6C343] focus-visible:ring-offset-2"
          >
            About Dholera
          </Link>
        </div>

      </div>
    </section>
  );
}
