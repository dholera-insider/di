"use client";
import React, { useState } from "react";
import Image from "next/image";
import hero from "@/app/assets/dholera-insider-gallery-banner.webp";
/* import hero from "@/app/assets/gallery/news.webp"; */
// Updated imports (new image names & location)
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

  const [selectedImage, setSelectedImage] = useState(null);

  const openPopup = (image) => {
    setSelectedImage(image);
  };

  const closePopup = () => {
    setSelectedImage(null);
  };

  return (
    <div className="min-h-screen ">
      <link rel="canonical" href="https://www.dholerainsider.com/gallery" />
      <meta name="robots" content="index, dofollow" />

      {/* Hero Section with Enhanced Overlay */}
      <div className="bg-white relative">
        <div className="pt-16 md:pt-8">
          <div className="relative w-full md:h-[60vh] overflow-hidden shadow-lg aspect-[3/1]">
            {/* Hero Image */}
            <Image
              src={hero}
              alt="Dholera SIR Development"
              className="w-full h-auto md:h-[60vh] object-contain md:object-cover  aspect-[3/1]"
              quality={100}
              priority
              sizes="100vw"
            />

            {/* Black Overlay */}
            <div className="absolute inset-0 bg-black/60"></div>

            {/* Text Content */}
            <div className="absolute inset-0 z-10 flex items-center justify-center px-4 text-center">
              <h1 className="text-2xl md:text-5xl font-bold text-white leading-tight">
                Dholera Smart City Project Gallery
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* Gallery Section with Enhanced Design */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Gallery Grid with Enhanced Hover Effects */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {galleryImages.map((image) => (
            <div
              key={image.id}
              className="group relative overflow-hidden rounded-xl transition-all duration-300 shadow-lg hover:shadow-2xl cursor-pointer bg-white"
              onClick={() => openPopup(image)}
            >
              {/* Image Container */}
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Caption */}
              <div className="p-4 text-center">
                <h3 className="text-lg font-bold text-gray-800 mb-2">
                  {image.alt}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Image Popup */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
          onClick={closePopup}
        >
          <div className="relative max-w-4xl max-h-[90vh] mx-4">
            <button
              onClick={closePopup}
              className="absolute top-4 right-4 bg-white rounded-full w-8 h-8 flex items-center justify-center text-black font-bold z-10"
            >
              ×
            </button>
            <div className="relative w-full h-full">
              <Image
                src={selectedImage.src}
                alt={selectedImage.alt}
                width={1200}
                height={800}
                className="max-h-[90vh] w-auto object-contain"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
            <div className="bg-white p-4 text-center">
              <h3 className="text-lg font-bold">{selectedImage.alt}</h3>
              <p className="text-gray-600">{selectedImage.caption}</p>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}
