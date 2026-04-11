import React from "react";
import sample1 from "@/app/assets/residential/estates.webp";
import sample1M from "@/app/assets/home/estate.webp";
import Image from "next/image";

export default function WestWyn_Estate() {
  return (
    <div className="bg-gradient-to-br from-gray-900 via-slate-800 to-teal-900 pb-12">
      {/* WestWyn Estate Section */}
      <div className="pt-12 max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h3 className="text-4xl max-sm:text-xl font-bold text-teal-400 mb-4">
            WestWyn Estates -{" "}
            <span className="text-white">
              {" "}
              Invest in Dholera’s Fastest Growing Zone
            </span>
          </h3>
          <div className="w-32 h-1 bg-gradient-to-r from-teal-400 to-teal-600 mx-auto rounded-full mb-6"></div>
        </div>

        {/* Image Section - Full Width Top */}
        <div className="mb-12">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl">
            <div className="w-full md:h-[50vh] bg-gradient-to-br from-teal-900 to-gray-900 flex items-center justify-center">
              <Image
                src={sample1}
                alt="WestWyn Estate in Dholera"
                className="object-cover max-sm:hidden"
              />
              <Image
                src={sample1M}
                alt="WestWyn Estate in Dholera"
                className="object-contain md:hidden"
              />
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 to-transparent"></div>
            <div className="absolute bottom-6 left-6 text-white">
              <h3 className="text-2xl font-bold mb-2">WestWyn Estates</h3>
              <p className="text-teal-300">
                Direct Entry from State Highway 117
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-5xl mx-auto">
          <p className="mb-8 text-white">
            WestWyn Estates a premium residential plotting project in Polarpur,
            Dholera, Gujarat, designed for smart living and long-term
            investment. The project offers direct entry from State Highway-117
            and is located just minutes from Bhimnath Railway Station, ensuring
            convenient connectivity. It also provides good access to major
            infrastructure and mega developments in the region. Overall, WestWyn
            Estates is a suitable choice for those exploring Dholera plots with
            strong future appreciation potential.
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Strategic Location Card */}
          <div className="bg-gray-800/50 rounded-xl p-6 border-l-4 border-teal-400">
            <h3 className="text-2xl font-bold text-white mb-6">
              Strategic Location
            </h3>
            <div className="grid gap-3">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-teal-400 rounded-full"></div>
                <span className="text-gray-100">
                  Premium residential plots in Polarpur, Dholera
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-teal-400 rounded-full"></div>
                <span className="text-gray-100">
                  5 Minutes from Bhimnath Railway Junction
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-teal-400 rounded-full"></div>
                <span className="text-gray-100">
                  15 Minutes from Dholera SIR boundary
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-teal-400 rounded-full"></div>
                <span className="text-gray-100">
                  15 Minutes from RMS Multi-Specialty Hospital
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-teal-400 rounded-full"></div>
                <span className="text-gray-100">
                  17 Minutes from Ahmedabad Dholera Expressway
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-teal-400 rounded-full"></div>
                <span className="text-gray-100">
                  30 Minutes from Tata Semiconductor Plant
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-teal-400 rounded-full"></div>
                <span className="text-gray-100">
                  45 Minutes from Dholera International Airport
                </span>
              </div>
            </div>
            <p className="text-teal-300 font-semibold mt-4 text-2xl">
              Unbeatable connectivity in Dholera and future-ready growth
              potential.
            </p>
            <button className="bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white mt-4 text-[14px] md:text-base font-bold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105">
              <a href="/residential-projects-in-dholera/westwyn-estate">
                Explore More About WestWyn Estates
              </a>
            </button>
          </div>

          {/* Why Invest Section */}
          <div className="bg-gray-800/50 rounded-xl p-6">
            <h3 className="text-2xl font-bold text-white mb-6">
              Why Invest in WestWyn Estates?
            </h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-teal-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <div>
                  <h4 className="text-teal-300 font-semibold">
                    Prime Location
                  </h4>
                  <p className="text-gray-200">
                    Close proximity to Public Facilities and Transport: Bus
                    stand, school, hospital, shopping complex, park, food
                    courts.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-teal-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <div>
                  <h4 className="text-teal-300 font-semibold">
                   Industrial proximity
                  </h4>
                  <p className="text-gray-200">
                    Seamless connectivity to TATA Semiconductor Plant & ReNew Solar Plant. 25 minutes to Hebatpur Industrial Area
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-teal-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <div>
                  <h4 className="text-teal-300 font-semibold">
                    Government-Backed Development
                  </h4>
                  <p className="text-gray-200">
                    Part of India's first smart city under the Delhi–Mumbai
                    Industrial Corridor (DMIC).
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-teal-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <div>
                  <h4 className="text-teal-300 font-semibold">
                    Safe & Legal Investment
                  </h4>
                  <p className="text-gray-200">
                    Fully NA/NOC approved, plan-passed, and clear-title
                    registry-ready plots.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-teal-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <div>
                  <h4 className="text-teal-300 font-semibold">
                    Exceptional Growth
                  </h4>
                  <p className="text-gray-200">
                    Early entry ensures rapid appreciation as demand rises.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action - Full Width Bottom */}
        {/* <div className="bg-gradient-to-r from-teal-600/20 to-teal-800/20 rounded-xl p-8 text-center border border-teal-500/30">
          <p className="text-xl text-white font-semibold mb-4">
            WestWyn Estate is not just a plot; it's a secure and future-ready
            investment opportunity in the heart of Gujarat's most ambitious
            smart city.
          </p>
          <button className="bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105">
            Explore Plots under ₹ 10 Lakhs in Dholera
          </button>
        </div> */}
      </div>
    </div>
  );
}
