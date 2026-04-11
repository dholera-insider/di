"use client";
import React from "react";
import Link from "next/link";

const Hero = () => {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      <div className="absolute inset-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          poster="/hero-poster.webp"
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          <source src="/video/video2.mp4" type="video/mp4" />
        </video>
      </div>

      <div className="absolute inset-0 bg-black/20"></div>

      <div className="relative z-10 flex h-full items-center justify-center">
        <div className="container mx-auto px-4 text-center text-white">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl md:text-4xl font-semibold mb-6">
              Buy Govt Approved Plots 
            </h1>

            <h2 className="text-3xl md:text-4xl text-teal-300 font-bold mb-4">
              Starting From ₹8 Lakh in Dholera
            </h2>

            <Link
              href="tel:+919211820887"
              className="inline-block mb-6 px-6 py-2 bg-blue-600 rounded-full text-sm font-medium hover:bg-blue-700 transition duration-300"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};


export default Hero;
