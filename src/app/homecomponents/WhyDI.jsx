import React from "react";
import Link from "next/link";
import sample1 from "@/app/assets/home/Invest_in_dholera2.webp";
import Image from "next/image";

export default function WhyDI() {
  return (
    <div className="bg-gradient-to-br from-gray-900 via-slate-800 to-teal-900 ">
      {/* Why Dholera Smart City Section */}
      <div className="pt-8 max-w-6xl mx-auto px-4">
        <div className="text-center ">
          <h2 className="text-4xl max-sm:text-xl font-bold text-white mb-4">
            Why Investors Trust <span className="text-teal-400">Dholera Insider?</span>
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-teal-400 to-teal-600 mx-auto rounded-full"></div>
        </div>

        <div className="">
          <div className="flex flex-col md:flex-row px-4 md:px-8 py-12 gap-6 md:gap-12 max-w-7xl mx-auto">

            {/* Right Section (60%) */}
            <div className="w-full md:w-3/5 pl-2 pr-2 space-y-6">
              <div>
                <p className="text-gray-100">
                  At Dholera Insider, we bring you verified, government-approved
                  projects and end-to-end investment guidance. From exploring
                  plots in Dholera with clear titles to securing the best
                  locations at the right price, we ensure every step of your
                  investment journey is transparent, secure, and profitable.
                </p>
              </div>

              <div>
                <p className="text-gray-100">
                  With strong networks across developers and an on-ground
                  presence in Dholera Smart City Project, we help investors make
                  informed decisions with confidence. Choose Dholera Insider as
                  your trusted partner in building wealth in India’s most
                  ambitious Dholera SIR investment corridor.
                </p>
              </div>
            </div>

            <div className="w-full md:w-2/5 pl-2 pr-2">
              <div className="w-full h-full">
                <Image src={sample1} alt="Invest in Dholera" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
