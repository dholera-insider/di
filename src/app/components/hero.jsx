"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
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
          <div
            className="
              grid
              items-start
              gap-8
              lg:grid-cols-[minmax(0,1fr)_minmax(22rem,26rem)]
              lg:gap-12
            "
          >
            {/* Left Content */}
            <div className="w-full min-w-0 max-w-3xl">
              {/* Heading */}
              <h1
                className="
                  mb-4
                  max-w-2xl
                  text-[clamp(2.45rem,3vw,3rem)]
                  font-bold
                  leading-[1.12]
                  tracking-tight
                  text-[#FDFCFA]
                  sm:mb-5
                "
              >
                Decoding Dholera for NRIs
              </h1>

          

              {/* Description */}
              <p
                className="
                  mb-5
                  hidden
                  max-w-2xl
                  text-[clamp(1rem,1.25vw,1.125rem)]
                  leading-[1.7]
                  text-white
                  md:block
                  lg:mb-6
                "
              >
                Dholera Insider helps NRIs explore verified residential plots in
                Dholera Smart City with transparent information, legal clarity,
                and a smooth remote buying experience.
              </p>

              {/* Trust Points */}
              <div>
                <ul className="space-y-2.5 sm:space-y-3">
                  {trustPoints.map((point) => (
                    <li
                      key={point}
                      className="
                        flex
                        items-start
                        gap-3
                        text-[0.95rem]
                        font-medium
                        leading-6
                        text-white
                        max-sm:font-semibold
                        sm:text-base
                      "
                    >
                      <CheckCircle
                        className="
                          mt-0.5
                          h-5
                          w-5
                          flex-shrink-0
                          text-white
                        "
                      />

                      <span className="min-w-0">{point}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <div className="mt-5 hidden md:flex lg:mt-6">
                  <a
                    href="https://wa.me/919211820887?text=Hello%2C%20I%20am%20interested%20in%20buying%20a%20plot%20in%20Dholera.%20Please%20share%20the%20details."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      inline-flex
                      min-h-12
                      items-center
                      justify-center
                      rounded-lg
                      bg-[#F6C343]
                      px-6
                      py-3
                      text-base
                      font-bold
                      text-[#051A3A]
                      shadow-lg
                      transition-colors
                      duration-200
                      hover:bg-[#FDFCFA]
                      focus-visible:outline-none
                      focus-visible:ring-2
                      focus-visible:ring-[#F6C343]
                      focus-visible:ring-offset-2
                    "
                  >
                    Get Free Consultation
                  </a>
                </div>
              </div>
            </div>

            {/* Hero Lead Form */}
            <div
              className="
                w-full
                min-w-0
                max-w-[26rem]
                justify-self-center
                self-start
                lg:w-full
                lg:justify-self-end
              "
            >
              <HeroLeadForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
