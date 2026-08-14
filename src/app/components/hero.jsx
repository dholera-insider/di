"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { CheckCircle } from "lucide-react";
import heroPoster from "@/app/assets/hero/idHero.webp";
import HeroLeadForm from "../homecomponents/HeroLeadForm";

const trustPoints = [
  "Verified Residential Projects",
  "Registry Ready Plots",
  "Trusted NRI Guidance",
];

const Hero = () => {
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);

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
    <section className="relative min-h-screen w-full overflow-hidden ">
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

      <div className="absolute inset-0 bg-black/40"></div>

      <div className="relative max-w-7xl mx-auto z-10 flex min-h-screen items-center">
        <div className="container mx-auto px-4 py-28 sm:px-6 lg:px-8">
          <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(22rem,26rem)] lg:gap-12">
            <div className="max-w-3xl">
              <h1 className="mb-5 text-[clamp(2rem,4.5vw,4.5rem)] font-bold leading-[1.05] text-white">
                Decoding Dholera For NRI
              </h1>
              {/*  <p className="mb-4 inline-flex rounded-full bg-[#F6C343]/20 px-4 py-2 text-sm font-semibold uppercase tracking-wide text-[#051A3A]">
                Decoding Dholera For NRI
              </p> */}

              <p className="mb-6 max-w-2xl text-[clamp(1rem,1.5vw,1.125rem)] hidden md:block leading-[1.8] text-white">
                Dholera Insider helps NRIs explore verified residential plots in
                Dholera Smart City with transparent information, legal clarity,
                and a smooth remote buying experience.
              </p>

              <div className="space-y-3">
                <ul className="space-y-3">
                  {trustPoints.map((point) => (
                    <li
                      key={point}
                      className="flex items-start max-sm:font-semibold gap-3 text-[0.95rem] font-medium text-white"
                    >
                      <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-white" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href="https://wa.me/919211820887?text=Hello%2C%20I%20would%20like%20a%20free%20consultation%20about%20Dholera%20investment."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex min-h-12 items-center justify-center rounded-lg bg-[#F6C343] px-6 py-3 text-base font-bold text-white shadow-lg transition-colors hover:bg-[#FDFCFA] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#051A3A] focus-visible:ring-offset-2"
                >
                  Get Free Consultation
                </a>
              </div>
            </div>

            <div className="w-full justify-self-center lg:justify-self-end">
              <HeroLeadForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
