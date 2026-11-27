"use client";

import { galleryImages } from "./images";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import hero from "@/app/assets/dholera-insider-gallery-banner.webp";


export default function DholeraProgressPage() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [mounted, setMounted] = useState(false);



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
      <section
        aria-labelledby="gallery-heading"
        className="max-w-7xl mx-auto py-8 site-gutter"
      >
        <h2 id="gallery-heading" className="sr-only">
          Dholera development photos
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8">
          {galleryImages.map((image) => (
            <button
              key={image.id}
              type="button"
              aria-haspopup="dialog"
              aria-label={`View full image: ${image.alt}`}
              onClick={() => openPopup(image)}
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
              <span className="relative block h-56 sm:h-60 lg:h-64 overflow-hidden">
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

                <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </span>

              <span className="block p-4 text-center">
                <span className="block text-base md:text-lg font-bold text-gray-800 leading-snug">
                  {image.alt}
                </span>
              </span>
            </button>
          ))}
        </div>
      </section>

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
