"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { CheckCircle } from "lucide-react";
import heroPoster from "@/app/assets/hero/idHero.webp";
import Popup from "./Pop";

const trustPoints = [
  "Legally Verified Residential Projects",
  "Transparent Buying Process",
  "Trusted by NRI Investors Worldwide",
];

const HeroNew = () => {
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);
  const [contactFormOpen, setContactFormOpen] = useState(false);

  const openContactForm = () => {
    setContactFormOpen(true);
  };

  const closeContactForm = () => {
    setContactFormOpen(false);
  };

  useEffect(() => {
    let timeoutId;
    let idleId;

    const loadVideo = () => setShouldLoadVideo(true);

    const scheduleVideoLoad = () => {
      if ("requestIdleCallback" in window) {
        idleId = window.requestIdleCallback(loadVideo, { timeout: 2500 });
      } else {
        timeoutId = window.setTimeout(loadVideo, 2500);
      }
    };

    if (document.readyState === "complete") {
      scheduleVideoLoad();
    } else {
      window.addEventListener("load", scheduleVideoLoad, { once: true });
    }

    return () => {
      window.removeEventListener("load", scheduleVideoLoad);
      if (timeoutId) window.clearTimeout(timeoutId);
      if (idleId && "cancelIdleCallback" in window) {
        window.cancelIdleCallback(idleId);
      }
    };
  }, []);

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-[#FDFCFA]">
      <div className="absolute inset-0">
        <Image
          src={heroPoster}
          alt="Dholera residential plot projects for NRI investors"
          fill
          priority
          fetchPriority="high"
          placeholder="blur"
          sizes="100vw"
          className="absolute inset-0 z-0 h-full w-full object-cover"
        />

        {shouldLoadVideo && (
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="none"
            className="absolute inset-0 z-0 h-full w-full object-cover"
          >
            <source src="/video/video2.mp4" type="video/mp4" />
          </video>
        )}
      </div>

      <div className="absolute inset-0 bg-gradient-to-r from-[#FDFCFA]/95 via-[#FDFCFA]/86 to-[#051A3A]/55"></div>

      <div className="relative z-10 flex min-h-screen items-center">
        <div className="container mx-auto px-4 py-28 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="mb-4 inline-flex rounded-full bg-[#F6C343]/20 px-4 py-2 text-sm font-semibold uppercase tracking-wide text-[#051A3A]">
              Decoding Dholera For NRI
            </p>

            <h1 className="mb-5 text-[clamp(2.5rem,6vw,5rem)] font-bold leading-[1.05] text-[#051A3A]">
              Dholera Insider
            </h1>

            <h2 className="mb-5 text-[clamp(1.25rem,2.5vw,2rem)] font-semibold leading-[1.35] text-[#2B364D]">
              Exclusive residential plot projects for NRIs
            </h2>

            <p className="mb-6 max-w-2xl text-[clamp(1rem,1.5vw,1.125rem)] leading-[1.8] text-[#162033]">
              Dholera Insider is a dedicated platform offering exclusive
              residential plot projects for NRIs. We help overseas investors
              explore premium residential opportunities in Dholera with
              transparent pricing, verified documentation, and a smooth remote
              buying experience.
            </p>

            <div className="mb-8 space-y-3">
              <p className="text-sm font-bold uppercase tracking-wide text-[#2B364D]">
                Trust Points
              </p>
              <ul className="space-y-3">
                {trustPoints.map((point) => (
                  <li
                    key={point}
                    className="flex items-start gap-3 text-[0.95rem] font-medium text-[#162033]"
                  >
                    <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#F6C343]" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={openContactForm}
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#F6C343] px-7 py-3 text-sm font-bold text-[#051A3A] shadow-lg shadow-[#051A3A]/15 transition duration-300 hover:bg-[#e3ae25] focus:outline-none focus:ring-2 focus:ring-[#F6C343] focus:ring-offset-2"
            >
              Get NRI Project Details
            </button>
          </div>
        </div>
      </div>
      {contactFormOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[1000] p-4">
          <div className="w-full max-w-md">
            <Popup
              onClose={closeContactForm}
              title="Get Dholera Project Details"
              buttonName="Get Details"
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default HeroNew;
