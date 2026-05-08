"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import heroPoster from "@/app/assets/hero/idHero.webp";
import Popup from "./Pop";
const Hero = () => {
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
    <div className="relative h-screen w-full overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src={heroPoster}
          alt=""
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

      <div className="absolute inset-0 bg-black/20"></div>

      <div className="relative z-10 flex h-full items-center justify-center">
        <div className="container mx-auto px-4 text-center text-white">
          <div className="mx-auto max-w-4xl">
            <h1 className="mb-6 text-2xl font-semibold md:text-4xl">
              Buy Govt Approved Plots in Dholera
            </h1>

            <h2 className="mb-4 text-3xl font-bold text-teal-300 md:text-4xl">
              Starting From ₹8 Lakh
            </h2>

            <button
              onClick={openContactForm}
              className="mb-6 inline-block rounded-full bg-blue-600 px-6 py-2 text-sm font-medium transition duration-300 hover:bg-blue-700"
            >
            Book Your Plot Now
            </button>
          </div>
        </div>
      </div>
      {contactFormOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[1000] p-4">
          <div className="w-full max-w-md">
            <Popup
              onClose={closeContactForm}
              title="Get Full Project Details"
              buttonName="Get Brochure"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Hero;
