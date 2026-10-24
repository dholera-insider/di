"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import hero from "@/app/assets/dholera-insider-gallery-banner.webp";

import img1 from "@/app/assets/gallery/abcd-building-dholera-insider.webp";
import img2 from "@/app/assets/gallery/man-made-river-activation-area-dholera-insider.webp";
import img3 from "@/app/assets/gallery/infrastruction-activation-area-dholera-insider.webp";
import img4 from "@/app/assets/gallery/silk-route-park-activation-area-dholera-insider.webp";
import img5 from "@/app/assets/gallery/dholera-international-airport-dholera-insider.webp";
import img6 from "@/app/assets/gallery/cargo-terminal-dholera-international-airport-dholera-insider.webp";
import img7 from "@/app/assets/gallery/dholera-ahmedabad-expressway-night-dholera-insider.webp";
import img8 from "@/app/assets/gallery/adhelai-diamond-circle-dholera-insider.webp";
import img9 from "@/app/assets/gallery/renew-solar-plant-dholera-insider.webp";
import img10 from "@/app/assets/gallery/asia-largest-solar-park-dholera-insider.webp";
import img11 from "@/app/assets/gallery/tata-solar-park-mahadevpura-dholera-insider.webp";
import img12 from "@/app/assets/gallery/water-reservoir-activation-area-dholera-insider.webp";
import img13 from "@/app/assets/gallery/water-treatment-plant-dholera-insider.webp";
import img14 from "@/app/assets/gallery/tata-semiconductor-plant-dholera-insider.webp";
import img15 from "@/app/assets/gallery/torrent-power-substation-dholera-insider.webp";
import img16 from "@/app/assets/gallery/dholera-solar-park-dholera-insider.webp";
import img17 from "@/app/assets/gallery/522-room-tata-hotel-fedra-pipli-state-highway-dholera-insider.webp";
import img18 from "@/app/assets/gallery/westwyn-estate-residential-plots-dholera-insider.webp";

export default function DholeraProgressPage() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [mounted, setMounted] = useState(false);

  const galleryImages = [
    {
      id: 1,
      src: img1,
      alt: "ABCD Building in Dholera Smart City",
      caption: "ABCD Building – Administrative hub of Dholera Smart City",
    },
    {
      id: 2,
      src: img2,
      alt: "Man-made river in Activation Area of Dholera",
      caption: "Man-made river development in Dholera Activation Area",
    },
    {
      id: 3,
      src: img3,
      alt: "Infrastructure activation area development in Dholera",
      caption: "Infrastructure Activation Area – Dholera Smart City",
    },
    {
      id: 4,
      src: img4,
      alt: "Silk Route Park in Dholera Activation Area",
      caption: "Silk Route Park development in Dholera",
    },
    {
      id: 5,
      src: img5,
      alt: "Dholera International Airport Runway",
      caption: "Dholera International Airport development progress",
    },
    {
      id: 6,
      src: img6,
      alt: "Dholera Airport Cargo Terminal",
      caption: "Cargo Terminal – Dholera International Airport",
    },
    {
      id: 7,
      src: img7,
      alt: "Dholera Expressway Night View",
      caption: "Ahmedabad–Dholera Expressway connectivity",
    },
    {
      id: 8,
      src: img8,
      alt: "Adhelai Diamond Circle in Dholera",
      caption: "Adhelai Diamond Circle – Key road junction in Dholera",
    },
    {
      id: 9,
      src: img9,
      alt: "ReNew Solar Plant in Dholera Smart City",
      caption: "ReNew Solar Power Plant – Dholera",
    },
    {
      id: 10,
      src: img10,
      alt: "Asia’s Largest Solar Park in Dholera",
      caption: "Asia’s Largest Solar Park – Dholera Smart City",
    },
    {
      id: 11,
      src: img11,
      alt: "Tata Solar Park Dholera",
      caption: "Tata Solar Park – Mahadevpura, Dholera",
    },
    {
      id: 12,
      src: img12,
      alt: "Water Reservoir in Dholera",
      caption: "Water Reservoir Infrastructure – Dholera",
    },
    {
      id: 13,
      src: img13,
      alt: "Water Treatment Plant in Dholera",
      caption: "Water Treatment Plant – Dholera Smart City",
    },
    {
      id: 14,
      src: img14,
      alt: "Tata Semiconductor Plant Dholera",
      caption: "Tata Semiconductor Manufacturing Plant – Dholera",
    },
    {
      id: 15,
      src: img15,
      alt: "Torrent Power Substation in Dholera",
      caption: "Torrent Power Electrical Substation – Dholera",
    },
    {
      id: 16,
      src: img16,
      alt: "Dholera Solar Park Infrastructure",
      caption: "Dholera Solar Park renewable energy infrastructure",
    },
    {
      id: 17,
      src: img17,
      alt: "Tata Hotel on Fedra–Pipli Highway",
      caption: "522-Room Tata Hotel – Fedra–Pipli State Highway",
    },
    {
      id: 18,
      src: img18,
      alt: "Residential Plots in Dholera",
      caption: "Westwyn Estate – Residential Plots in Dholera",
    },
  ];

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!selectedImage) return;

    const previousOverflow = document.body.style.overflow;

    // Prevent page scrolling behind popup
    document.body.style.overflow = "hidden";

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setSelectedImage(null);
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleEscape);
    };
  }, [selectedImage]);

  const openPopup = (image) => {
    setSelectedImage(image);
  };

  const closePopup = () => {
    setSelectedImage(null);
  };

  return (
    <div className="min-h-screen">
      <link rel="canonical" href="https://www.dholerainsider.com/gallery" />
      <meta name="robots" content="index, dofollow" />

      {/* Hero Section */}
      <div className="relative bg-white">
        <div className="pt-16 md:pt-8">
          <div className="relative w-full aspect-[3/1] md:h-[60vh] overflow-hidden shadow-lg">
            <Image
              src={hero}
              alt="Dholera SIR Development"
              className="w-full h-auto md:h-[60vh] object-contain md:object-cover aspect-[3/1]"
              quality={100}
              priority
              sizes="100vw"
            />

            <div className="absolute inset-0 bg-black/60" />

            <div className="absolute inset-0 z-10 flex items-center justify-center px-4 text-center">
              <h1 className="text-2xl md:text-5xl font-bold text-white leading-tight">
                Dholera Smart City Project Gallery
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* Gallery */}
      <div className="max-w-7xl mx-auto py-8 site-gutter">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8">
          {galleryImages.map((image) => (
            <div
              key={image.id}
              role="button"
              tabIndex={0}
              onClick={() => openPopup(image)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  openPopup(image);
                }
              }}
              className="
                group
                relative
                overflow-hidden
                rounded-xl
                bg-white
                shadow-lg
                transition-all
                duration-300
                cursor-pointer
                hover:shadow-2xl
                focus:outline-none
                focus-visible:ring-2
                focus-visible:ring-gray-900
                focus-visible:ring-offset-2
              "
            >
              <div className="relative h-56 sm:h-60 lg:h-64 overflow-hidden">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="
                    object-cover
                    transition-transform
                    duration-500
                    ease-out
                    group-hover:scale-105
                  "
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              <div className="p-4 text-center">
                <h3 className="text-base md:text-lg font-bold text-gray-800 leading-snug">
                  {image.alt}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Popup rendered directly under body */}
        {mounted &&
          selectedImage &&
          createPortal(
            <div
              role="dialog"
              aria-modal="true"
              aria-label={selectedImage.alt}
              onClick={closePopup}
              className="
                fixed inset-0 z-[99999]
                flex items-center justify-center
                bg-black/85 backdrop-blur-sm
                p-3 sm:p-5 md:p-8
              "
            >
              <div
                onClick={(event) => event.stopPropagation()}
                className="
                  relative
                  inline-flex flex-col
                  overflow-hidden
                  rounded-xl md:rounded-2xl
                  bg-white shadow-2xl
                  max-w-[calc(100vw-24px)]
                  sm:max-w-[calc(100vw-40px)]
                  md:max-w-[calc(100vw-64px)]
                  max-h-[calc(100dvh-24px)]
                  sm:max-h-[calc(100dvh-40px)]
                  md:max-h-[calc(100dvh-64px)]
                "
              >
                {/* Close Button */}
                <button
                  type="button"
                  onClick={closePopup}
                  aria-label="Close"
                  className="
                    absolute right-2.5 top-2.5 z-20
                    flex h-9 w-9 items-center justify-center
                    rounded-full bg-white/95 text-xl font-medium
                    leading-none text-black shadow-md
                    transition duration-200 hover:bg-white hover:scale-105
                    focus:outline-none focus-visible:ring-2 focus-visible:ring-black
                    md:right-4 md:top-4 md:h-10 md:w-10 md:text-2xl
                  "
                >
                  ×
                </button>

                {/* Image */}
                <div className="relative flex items-center justify-center bg-white">
                  <Image
                    src={selectedImage.src}
                    alt={selectedImage.alt}
                    width={1600}
                    height={1000}
                    sizes="100vw"
                    className="
                      block h-auto w-auto object-contain
                      max-w-[calc(100vw-24px)]
                      sm:max-w-[calc(100vw-40px)]
                      md:max-w-[calc(100vw-64px)]
                      max-h-[calc(100dvh-145px)]
                      sm:max-h-[calc(100dvh-165px)]
                      md:max-h-[calc(100dvh-190px)]
                    "
                  />
                </div>

                {/* Caption */}
                <div className="shrink-0 bg-white px-4 py-4 text-center sm:px-6 sm:py-5">
                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 leading-snug">
                    {selectedImage.alt}
                  </h3>
                  <p className="mt-1 text-sm sm:text-base text-gray-600 leading-relaxed">
                    {selectedImage.caption}
                  </p>
                </div>
              </div>
            </div>,
            document.body
          )
        }
    </div>
  );
}