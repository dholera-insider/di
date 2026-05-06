import React from "react";
import Link from "next/link";
import Image from "next/image";
import westwynEstatesImage from "@/app/assets/residential/westwyn-estates-dholera-project-section.webp";
import westwynResidencyImage from "@/app/assets/residential/westwyn-residency-dholera-project-section.webp";

export default function WestWyn_Estate() {
  const projects = [
    {
      title: "WestWyn Estates - Premium Residential Plots in Dholera",
      buttonLabel: "View WestWyn Estates",
      image: westwynEstatesImage,
      description:
        "WestWyn Estates is a premium residential plotting project developed by Dholera Insider in Polarpur, Dholera. Designed for buyers looking for direct developer-owned plots in the Dholera Smart City growth corridor, the project offers clear-title, registry-ready residential plots with strong location advantages.",
      href: "/residential-projects-in-dholera/westwyn-estate",
      highlights: [
        "Developer - Dholera Insider",
        "Located in Polarpur, Dholera",
        "Starting from ₹10 lakh",
        "Registry-ready documentation",
        "Near Dholera SIR and expressway",
        "Planned residential layout",
      ],
    },
    {
      title: "WestWyn Residency - Affordable Residential Plots in Dholera",
      buttonLabel: "View WestWyn Residency",
      image: westwynResidencyImage,
      description:
        "WestWyn Residency is an affordable residential plotting project developed in Pipariya, Dholera. Near Dholera SIR and key connectivity routes, the project also offers an entry point for buyers who want to invest directly with the developer in Dholera Smart City's growth corridor. It offers clear-title, registry-ready residential plots with strong location advantages.",
      href: "/residential-projects-in-dholera/westwyn-residency",
      highlights: [
        "Developer - Dholera Insider",
        "Located in Pipariya, Dholera",
        "Starting from ₹8 lakh",
        "Clear-title and registry-ready plots",
        "Near Dholera SIR and expressway",
        "Affordable investment option",
      ],
    },
  ];

  return (
    <section className="bg-gradient-to-br from-gray-900 via-slate-800 to-teal-900">
      <div className="mx-auto max-w-7xl px-[clamp(1rem,4vw,3rem)] py-[clamp(2.5rem,6vw,5rem)]">
        <div className="mb-[clamp(1.5rem,3vw,3rem)] text-center">
          <h2 className="text-[clamp(1.5rem,3vw,2.5rem)] font-bold leading-[clamp(2rem,4vw,3.5rem)] text-white">
            Residential Plots in{" "}
            <span className="text-teal-400">Dholera Smart City</span>
          </h2>
          <div className="mx-auto mt-4 h-1 w-32 rounded-full bg-gradient-to-r from-teal-400 to-teal-600" />
        </div>

        <div className=" max-w-7xl mx-auto mb-[clamp(1.5rem,3vw,3rem)] space-y-4 text-center">
          <p className="text-[clamp(1rem,1.4vw,1.125rem)] leading-[1.7] text-gray-100">
            Residential plots in Dholera Smart City are gaining attention from
            buyers who want early entry into Gujarat's planned smart city growth
            corridor. With Dholera SIR, Ahmedabad-Dholera Expressway, Dholera
            International Airport, railway connectivity, and industrial projects
            shaping the region, plotted development is becoming a preferred
            option for long-term real estate investment.
          </p>
          <p className="text-[clamp(1rem,1.4vw,1.125rem)] leading-[1.7] text-gray-100">
            Dholera Insider develops residential plot projects in prime
            locations in Dholera with clear-title documentation, registry-ready
            process, planned layouts, and direct developer inventory. Buyers can
            explore affordable and premium plot options through WestWyn
            Residency and WestWyn Estates.
          </p>
        </div>

        <div className="grid gap-[clamp(1.25rem,2.5vw,2.5rem)] lg:grid-cols-2">
          {projects.map((project) => (
            <article
              key={project.title}
              className="flex h-full flex-col overflow-hidden rounded-lg border border-white/15 bg-gray-800/50"
            >
              <div className="relative h-[14rem] w-full bg-gray-900 sm:h-[16rem]">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>

              <div className="flex flex-1 flex-col p-[clamp(1.25rem,2.5vw,2rem)]">
                <h3 className="mb-4 text-[clamp(1.125rem,2vw,1.5rem)] font-bold leading-[1.4] text-white">
                  {project.title}
                </h3>
                <p className="mb-6 text-[clamp(1rem,1.4vw,1.125rem)] leading-[1.7] text-gray-100">
                  {project.description}
                </p>

                <div className="mb-6">
                  <h4 className="mb-3 text-[clamp(1rem,1.6vw,1.25rem)] font-semibold text-teal-300">
                    Key Highlights
                  </h4>
                  <ul className="space-y-3">
                    {project.highlights.map((highlight) => (
                      <li
                        key={highlight}
                        className="flex items-start gap-3 text-gray-100"
                      >
                        <span className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-teal-400" />
                        <span className="text-[clamp(1rem,1.4vw,1.125rem)] leading-[1.7]">
                          {highlight}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {project.href ? (
                  <Link
                    href={project.href}
                    className="mt-auto inline-flex w-fit rounded-lg bg-gradient-to-r from-teal-500 to-teal-600 px-[clamp(1.25rem,2.5vw,2rem)] py-3 text-[0.875rem] font-bold text-white transition-all duration-300 hover:from-teal-600 hover:to-teal-700"
                  >
                    {project.buttonLabel}
                  </Link>
                ) : (
                  <button
                    type="button"
                    disabled
                    className="mt-auto inline-flex w-fit cursor-not-allowed rounded-lg bg-gray-600 px-[clamp(1.25rem,2.5vw,2rem)] py-3 text-[0.875rem] font-bold text-white opacity-70"
                  >
                    {project.buttonLabel}
                  </button>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
