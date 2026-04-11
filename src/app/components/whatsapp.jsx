"use client";

import React from "react";
import Image from "next/image";
import whatsapp from "../assets/icons/whatsapp.svg";

export default function Whatsapp() {
  const handleWhatsappClick = () => {
    if (typeof window !== "undefined") {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "whatsapp",
        lead_type: "whatsapp",
        device: window.innerWidth <= 768 ? "mobile" : "desktop",
      });

      window.open("https://wa.link/2wrz0f", "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div
      onClick={handleWhatsappClick}
      className="fixed bottom-6 right-4 md:bottom-8 md:right-8 z-50 hover:scale-105 transition-transform duration-300 cursor-pointer"
    >
      <div className="relative h-20 w-20 md:h-24 md:w-24 rounded-full bg-white shadow-xl flex items-center justify-center">
        {/* Rotating SVG Text */}
        <svg
          className="absolute w-full h-full animate-spin-slow"
          viewBox="0 0 100 100"
          style={{ animationDuration: "5s" }}
        >
          <defs>
            <path
              id="circlePath"
              d="M 50,50 m -37,0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
            />
          </defs>
          <text
            fill="black"
            fontSize="11"
            fontWeight="bold"
            fontFamily="Arial, sans-serif"
          >
            {" "}
            <textPath
              href="#circlePath"
              startOffset="0%"
              textAnchor="bold"
              className="tracking-wider"
            >
              {" "}
              DHOLERA INSIDER ● LET'S CONNECT ●{" "}
            </textPath>{" "}
          </text>
        </svg>

        {/* WhatsApp Icon */}
        <div className="absolute flex items-center justify-center rounded-full p-2 md:p-3">
          <Image
            src={whatsapp}
            alt="WhatsApp"
            width={20}
            height={20}
            className="w-12 h-12 md:w-16 md:h-16"
          />
        </div>
      </div>
    </div>
  );
}
