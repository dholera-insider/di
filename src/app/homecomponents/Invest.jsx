import React from "react";
import Link from "next/link";
import sample1 from "@/app/assets/home/Invest_in_dholera.webp";
import Image from "next/image";

export default function Invest() {
  return (
    <div className="bg-gradient-to-br from-gray-900 via-slate-800 to-teal-900">
      {/* Why Dholera Smart City Section */}
      <div className="pt-8 max-w-6xl mx-auto px-4">
        <div className="text-center ">
          <h2 className="text-4xl max-sm:text-2xl font-bold text-white mb-4">
            <span className="text-teal-400">Dholera Smart City : </span>
             <br className="md:hidden" /> India’s First Semiconductor City
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-teal-400 to-teal-600 mx-auto rounded-full"></div>
        </div>

        <div className="">
          <div className="flex flex-col md:flex-row px-4 md:px-8 py-12 gap-6 md:gap-12 max-w-7xl mx-auto">
            <div className="w-full md:w-2/5 pl-2 pr-2">
              <div className="w-full h-full">
                <Image src={sample1} alt="Dholera Smart City Project" />
              </div>
            </div>

            {/* Right Section (60%) */}
            <div className="w-full md:w-3/5 pl-2 pr-2 space-y-6">
              <div>
                <p className="text-gray-100">
                  Dholera Smart City Project is India’s first greenfield smart city,
                  strategically developed under the Delhi–Mumbai Industrial
                  Corridor (DMIC) in Gujarat. Designed as a next-generation
                  smart city, It is home to India’s first semiconductor fab.
                  Dholera offers world-class infrastructure, plug-and-play
                  industrial zones, and sustainable urban planning. With
                  government-approved semiconductor projects, advanced road
                  networks, smart utilities, and high-speed connectivity, the
                  city is emerging as a global destination for technology,
                  manufacturing, and investment.
                </p>
              </div>

              <div>
                <p className="text-gray-100">
                  Moreover, Dholera offers excellent connectivity via
                  expressways, metro rail, and the upcoming Dholera
                  International Airport. Rapid industrial growth,
                  government-backed development, and future-ready amenities make
                  Dholera an ideal destination for investors, businesses, and
                  homebuyers. Invest in Dholera Smart City Project today to be part of
                  India’s fastest-growing smart urban future.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}