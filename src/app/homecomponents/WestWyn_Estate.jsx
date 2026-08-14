import Image from "next/image";
import Link from "next/link";
import { FaArrowAltCircleRight } from "react-icons/fa";
import westwynEstatesImage from "@/app/assets/residential/westwyn-estates-dholera-project-section.webp";
import westwynResidencyImage from "@/app/assets/residential/westwyn-residency-dholera-project-section.webp";
import westwynCountyImage from "@/app/assets/westwyn-county-mob1.webp";

const projects = [
  {
    title: "WestWyn Estates",
    image: westwynEstatesImage,
    href: "/residential-projects-in-dholera/westwyn-estate",
    details: [
      "📍 Polarpur",
      "State Highway-117",
      "Starting from 10 Lakh",
      "Immediate Possession",
      "Under Development",
    ],
  },
  {
    title: "WestWyn Residency",
    image: westwynResidencyImage,
    href: "/residential-projects-in-dholera/westwyn-residency",
    details: [
      "📍 Pipariya",
      "1.5 km from DFC",
      "MDR Road",
      "Starting from 8 Lakh",
      "Immediate Possession",
    ],
  },
  {
    title: "WestWyn County- Reselling",
    image: westwynCountyImage,
    href: "/residential-projects-in-dholera/westwyn-county",
    details: [
      "📍 Fedra-pipli State Highway",
      "0 km from Tata Hotel",
      "Reselling from 20 Lakh",
      "Immediate Possession",
      "Premium Amenities",
    ],
  },
];

export default function WestWyn_Estate() {
  return (
    <section className="bg-[#051A3A] px-4 py-[clamp(3.5rem,6vw,5rem)] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 text-center md:mb-12">
          <p className="mb-3 text-xs font-bold uppercase tracking-widest text-[#F6C343]">
            Our Projects
          </p>
          <h2 className="text-[clamp(1.75rem,3vw,2.5rem)] font-bold leading-tight text-white">
            Residential Plot Projects in Dholera
          </h2>
          <div className="mx-auto mt-4 h-1 w-20 rounded-full bg-[#F6C343]" />
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {projects.map((project) => (
            <article
              key={project.title}
              className="flex h-full flex-col overflow-hidden rounded-2xl border border-white/15 bg-white shadow-xl"
            >
              <div className="relative h-56 w-full bg-[#051A3A] sm:h-64">
                <Image
                  src={project.image}
                  alt={`${project.title} residential plots in Dholera`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                />
              </div>

              <div className="flex flex-1 flex-col p-6">
                <h3 className="mb-4 text-xl font-bold text-[#051A3A]">
                  {project.title}
                </h3>

                <ul className="mb-6 space-y-3 text-[#162033]">
                  {project.details.map((detail) => (
                    <li
                      key={detail}
                      className="border-b border-[#2B364D]/10 pb-3 text-sm font-medium last:border-0"
                    >
                      {detail}
                    </li>
                  ))}
                </ul>

                <Link
                  href={project.href}
                  className="mt-auto inline-flex min-h-12 w-full items-center justify-between rounded-lg bg-[#F6C343] px-5 py-3 text-sm font-bold text-[#051A3A] transition-colors hover:bg-[#e3ae25] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#051A3A] focus-visible:ring-offset-2"
                >
                  <span>View Project</span>
                  <FaArrowAltCircleRight className="h-5 w-5" aria-hidden="true" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
