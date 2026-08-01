import React from "react";
import Link from "next/link";
import Image from "next/image";
import westwynEstatesImage from "@/app/assets/residential/westwyn-estates-dholera-project-section.webp";
import westwynResidencyImage from "@/app/assets/residential/westwyn-residency-dholera-project-section.webp";
import westwynCountyImage from "@/app/assets/westwyn-county-mob1.webp";
import { FaArrowAltCircleRight } from "react-icons/fa";

export default function WestWyn_Estate() {
  const projects = [
    {
      title: "WestWyn Estates",
      buttonLabel: "View WestWyn Estates",
      image: westwynEstatesImage,
      location: "Polarpur, Dholera",
      size: "Approx 147-250 sq. yards",
      href: "/residential-projects-in-dholera/westwyn-estate",
      price: "Starting from ₹10 lakh",
    },
    {
      title: "WestWyn Residency",
      buttonLabel: "View WestWyn Residency",
      image: westwynResidencyImage,
      location: "Pipariya, Dholera",
      size: "124, 154 and 187 Sq.Yards",
      href: "/residential-projects-in-dholera/westwyn-residency",
      price: "Starting from ₹8 lakh",
    },
    {
      title: "WestWyn County",
      buttonLabel: "Sold Out",
      image: westwynCountyImage,
      location: "Fedra-Pipli State Highway, Dholera",
      size: "Minimum 150 Sq.Yards",
      href: "/residential-projects-in-dholera/westwyn-county",
      price: "ReSelling From ₹12,000/sq yard",
      soldOut: true,
    },
  ];

  return (
    <section className="bg-[#051A3A]">
      <div className="mx-auto max-w-7xl px-[clamp(1rem,4vw,3rem)] py-4">  {/* py-[clamp(2.5rem,6vw,5rem)] */}
        <div className="mb-[clamp(1.5rem,3vw,3rem)] text-center">
          <h2 className="text-[clamp(1.5rem,3vw,2.5rem)] font-bold leading-[clamp(2rem,4vw,3.5rem)] text-[#FDFCFA]">
            Residential Plots in{" "}
            <span className="text-[#F6C343]">Dholera Smart City</span>
          </h2>
          <div className="mx-auto mt-4 h-1 w-32 rounded-full bg-[#F6C343]" />
        </div>

        <div className="grid gap-[clamp(1.25rem,2.5vw,2.5rem)] lg:grid-cols-3">
          {projects.map((project) => (
            <article
              key={project.title}
              className="flex h-full flex-col overflow-hidden rounded-lg border border-[#FDFCFA]/20 bg-[#FDFCFA]"
            >
              <div className="relative h-[14rem] w-full bg-[#051A3A] sm:h-[16rem]">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className={`object-cover ${project.soldOut ? "grayscale" : ""}`}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                {project.soldOut && (
                  <div className="absolute inset-0 flex items-center justify-center bg-[#051A3A]/55">
                    <span className="rounded-lg bg-[#B42318] px-5 py-2 text-sm font-bold uppercase tracking-wide text-[#FDFCFA] shadow-lg">
                      Sold Out
                    </span>
                  </div>
                )}
              </div>

              <div className="flex flex-1 flex-col p-[clamp(1.25rem,2.5vw,2rem)] text-center">
                <h3 className="mb-5 text-[clamp(1.125rem,2vw,1.5rem)] font-bold leading-[1.4] text-[#051A3A]">
                  {project.title}
                  {project.soldOut && (
                    <span className="ml-2 inline-flex rounded-full bg-[#B42318]/10 px-3 py-1 align-middle text-xs font-bold uppercase tracking-wide text-[#B42318]">
                      Sold Out
                    </span>
                  )}
                </h3>

                <dl className="mb-4 grid grid-cols-2 gap-3 text-[#162033] sm:grid-cols-1">
                  <div className="rounded-lg border border-[#2B364D]/20 p-4">
                    <dt className="text-xs font-bold uppercase tracking-wide">
                      Location
                    </dt>
                    <dd className="mt-1 text-[clamp(0.95rem,1.3vw,1.05rem)] font-semibold">
                      {project.location}
                    </dd>
                  </div>
                  <div className="rounded-lg border border-[#2B364D]/20 p-4">
                    <dt className="text-xs font-bold uppercase tracking-wide">
                      Plot Size
                    </dt>
                    <dd className="mt-1 text-[clamp(0.95rem,1.3vw,1.05rem)] font-semibold">
                      {project.size}
                    </dd>
                  </div>
                </dl>

                {project.href ? (
                  <Link
                    href={project.href}
                    className="mt-auto inline-flex w-full justify-between rounded-lg bg-[#F6C343] px-[clamp(1.25rem,2.5vw,2rem)] py-3 text-[0.875rem] font-bold text-[#051A3A] transition-all duration-300 hover:scale-105 hover:bg-[#e3ae25]"
                  >
                    <span>{project.buttonLabel}</span>
                    <span>
                      <FaArrowAltCircleRight className="ml-2 mt-1 h-4 w-4" />
                    </span>
                  </Link>
                ) : (
                  <button
                    type="button"
                    disabled
                    className="mt-auto inline-flex w-full cursor-not-allowed justify-center rounded-lg bg-[#2B364D]/70 px-[clamp(1.25rem,2.5vw,2rem)] py-3 text-[0.875rem] font-bold text-[#FDFCFA] opacity-70 duration-200 hover:scale-100"
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
