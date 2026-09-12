import Image from "next/image";
import {
  Check,
  ClipboardCheck,
  PhoneCall,
  Building2,
  FileCheck2,
  CheckCircle2,
  CreditCard,
  ScrollText,


} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

import heroImage from "@/app/assets/investor/dholera-insider-oman-banner.webp";
import { OmanFaq } from "./OmanInteractive";
import WhyOman from "./WhyOman";
import CommonJourney from "../CommonJourney";


const WHATSAPP_URL =
  "https://wa.me/919211820887?text=Hello%2C%20I%20am%20in%20Oman%20and%20interested%20in%20Dholera%20residential%20plots.%20Please%20share%20the%20details.";


const reviewPoints = [
  "Title and ownership",
  "NA/NOC and approved layout",
  "Project location and approvals",
  "Total cost and registration process",
];


const journeySteps = [
  {
    number: "1",
    icon: PhoneCall,
    title: "Speak with our Dholera Expert",
  },
  {
    number: "2",
    icon: Building2,
    title: "Explore Projects",
  },
  {
    number: "3",
    icon: FileCheck2,
    title: "Review Documents",
  },
  {
    number: "4",
    icon: CheckCircle2,
    title: "Book Your Plot",
  },
  {
    number: "5",
    icon: CreditCard,
    title: "Complete Payment",
  },
  {
    number: "6",
    icon: ScrollText,
    title: "Get Registry",
  },
];

const mobileJourneyColors = [
  "bg-[#D9D8F2]",
  "bg-[#C9EFE8]",
  "bg-[#F2D9D0]",
  "bg-[#F4DEB3]",
  "bg-[#F6CDB6]",
];

const reasonsToChoose = [
  "Verified residential plot opportunities",
  "Clear project information",
  "Documentation guidance",
  "Virtual project presentations",
  "Remote buying assistance",
  "Registration support",
  "Dedicated NRI assistance",
];

function ProjectImage() {
  return (
    <div className="relative mx-auto w-full max-w-[800px]">
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[28px] border border-white/15">
        <Image
          src={heroImage}
          alt="Dholera residential plots for NRIs living in Oman"
          width={800}
          height={600}
          priority
          sizes="(max-width: 1024px) 92vw, 48vw"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#051A3A]/70 via-transparent to-transparent" />
      </div>
    </div>
  );
}

function Skyline() {
  const buildings = [
    "h-16 w-5",
    "h-28 w-8",
    "h-20 w-7",
    "h-36 w-10",
    "h-24 w-6",
    "h-32 w-9",
    "h-20 w-8",
    "h-28 w-7",
    "h-40 w-9",
    "h-24 w-8",
    "h-32 w-10",
    "h-20 w-6",
  ];

  return (
    <div
      className="pointer-events-none absolute inset-x-0 bottom-0 flex h-44 items-end justify-around gap-1 overflow-hidden opacity-10"
      aria-hidden="true"
    >
      {buildings.map((classes, index) => (
        <span
          key={`${classes}-${index}`}
          className={`${classes} block bg-white`}
        />
      ))}
    </div>
  );
}

export default function OmanInvestorPage() {
  return (
    <main className="min-w-0 overflow-x-clip bg-[#F8F7F3] text-[#051A3A]">
      <div className="h-20" aria-hidden="true" />
      <section className="relative overflow-hidden bg-[#051A3A] px-4 py-8 text-white sm:px-6 md:py-12 lg:px-8">
        <Skyline />
        <div className="relative mx-auto grid max-w-7xl items-center gap-8 lg:grid-cols-[.9fr_1.1fr] lg:gap-16">
          <div
            className="
              order-1
              -mx-4
              -mt-8
              w-[calc(100%+2rem)]
              overflow-hidden
              rounded-none
              max-lg:[&_*]:!rounded-none
              sm:-mx-6
              sm:-mt-8
              sm:w-[calc(100%+3rem)]
              md:-mt-12
              lg:order-2
              lg:mx-0
              lg:mt-0
              lg:w-auto
            "
          >
            <ProjectImage />
          </div>

          {/* Content - Below Image on Mobile, Left on Desktop */}
          <div className="order-2 lg:order-1">
            <h1 className="font-[var(--font-bahrain-display)] text-[clamp(2rem,4.15vw,4rem)] font-bold leading-[1.02] tracking-[-0.055em]">
              Dholera Investment from{" "}
              <span className="text-[#F6C343]">Oman</span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-white/75 sm:text-lg">
              Living in Oman should not stop you from building a property asset
              in India. Dholera Insider helps Oman-based NRIs explore verified
              residential plots in Dholera Smart City with clear information,
              documentation guidance and remote buying support.
            </p>

            <a
              href="https://wa.me/919211820887?text=Hello%2C%20I%20am%20interested%20in%20buying%20a%20plot%20in%20Dholera.%20Please%20share%20the%20details."
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-flex min-h-12 items-center justify-center rounded-xl bg-[#F6C343] px-6 py-3 text-sm font-bold text-[#051A3A] transition hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              Explore Residential Projects
            </a>
          </div>
        </div>
      </section>

      <WhyOman />

      <CommonJourney
        title="How to Buy a Dholera Plot from Oman"
      />


      <section
        id="why-us"
        className="relative scroll-mt-28 overflow-hidden bg-[#051A3A] text-white px-6 py-8 sm:px-6 sm:py-16 lg:px-6 lg:pt-12 lg:pb-16"
      >
        <Skyline />
        <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[.75fr_1.25fr] lg:gap-16">
          <div>
            <h2 className="font-[var(--font-oman-display)] text-[clamp(1.9rem,4vw,3.25rem)] font-bold leading-tight tracking-[-0.045em]">
              Why Choose Dholera Insider?
            </h2>
            <p className="mt-5 text-base leading-8 text-white/70 sm:text-lg">
              Dholera Insider is focused on helping overseas Indian investors
              understand Dholera before making an investment decision.
            </p>
          </div>
          <div>
            <div className="divide-y divide-white/15 border-y border-white/15">
              {reasonsToChoose.map((reason) => (
                <div
                  key={reason}
                  className="flex items-center gap-4 py-5 font-[var(--font-oman-display)] text-base font-semibold sm:text-lg"
                >
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#F6C343] text-[#051A3A]">
                    <Check className="h-4 w-4" aria-hidden="true" />
                  </span>
                  {reason}
                </div>
              ))}
            </div>
            {/* <p className="mt-7 text-base leading-8 text-white/70">
              As the exclusive channel partner of BookMyAssets for NRI
              investors, we help make Dholera property investment from Oman
              simple and transparent.
            </p> */}
          </div>
        </div>
      </section>

      <OmanFaq />
    </main>
  );
}
