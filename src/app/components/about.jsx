import React, { useState } from 'react';
import Link from 'next/link';

export default function About() {
  const [activeDropdown, setActiveDropdown] = useState(null);

  const toggleDropdown = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  const reasons = [
    {
      title: "Price Appreciation",
      content: "As development moves forward, the land value in Dholera is increasing year by year. Those who invest early can benefit from significant price growth in the future. Dholera Smart City is still in its early phase — perfect timing for smart buyers."
    },
    {
      title: "Rental Income",
      content: "As businesses, industries, and families start moving into Dholera Smart City, the demand for homes and commercial spaces will grow. This means you can earn steady rental income from your investment, whether it's a plot, shop, or home."
    },
    {
      title: "Government-Backed Development",
      content: "Dholera Smart City is fully supported by both the Central and Gujarat State Governments. It is part of the Delhi-Mumbai Industrial Corridor (DMIC) and is managed by a dedicated authority (DSIRDA). This ensures fast, planned, and safe development."
    },
    {
      title: "Early Mover Advantage",
      content: "Right now, property prices are much lower compared to what they will be in the next 5–10 years. Investing early gives you access to the best locations and highest returns before the city becomes fully developed."
    },
    {
      title: "Industrial Growth Hub",
      content: "Dholera is designed to be a global industrial and economic zone. Companies in sectors like renewable energy, manufacturing, logistics, and IT are already showing interest. As industries set up here, job creation and demand for housing will grow rapidly."
    }
  ];

  return (
    <div className='bg-gradient-to-br from-gray-900 via-slate-800 to-teal-900 min-h-screen pb-8'>
      {/* Why Dholera Smart City Section */}
      <div className="pt-16 max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl max-sm:text-3xl font-bold text-white mb-4">
            Why <span className="text-teal-400">Dholera Smart City</span>?
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-teal-400 to-teal-600 mx-auto rounded-full"></div>
        </div>
        
        <div className="bg-gradient-to-br from-gray-800/40 to-teal-900/20 rounded-3xl p-8 backdrop-blur-sm border border-teal-500/20 shadow-2xl">
          <p className="text-gray-300 text-lg leading-relaxed mb-8 text-center">
            <span className="font-bold text-teal-400">Dholera Smart City</span> is not just a plan — it's a powerful opportunity. 
            Backed by the government and built with world-class infrastructure, this futuristic city is attracting investors 
            from across India and abroad. Here's why smart investors are choosing Dholera:
          </p>

          <div className="space-y-3 mt-8">
            {reasons.map((reason, index) => (
              <div 
                key={index}
                className="bg-gradient-to-br from-gray-700/30 to-teal-800/20 rounded-2xl border border-teal-500/10 transition-all duration-300 overflow-hidden hover:border-teal-500/30"
              >
                <button
                  onClick={() => toggleDropdown(index)}
                  className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                >
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-gradient-to-r from-teal-400 to-teal-600 rounded-full flex items-center justify-center text-white font-bold text-sm mr-3">
                      {index + 1}
                    </div>
                    <h3 className="text-xl font-bold text-teal-400">{reason.title}</h3>
                  </div>
                  <svg
                    className={`w-6 h-6 text-teal-400 transition-transform duration-300 ${
                      activeDropdown === index ? 'transform rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                <div
                  className={`transition-all duration-500 ease-in-out overflow-hidden ${
                    activeDropdown === index 
                      ? 'max-h-96 opacity-100' 
                      : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="px-6 pb-6">
                    <p className="text-gray-300 leading-relaxed pl-11">
                      {reason.content}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Learn More Button */}
          <div className="flex justify-center mt-12">
            <Link href="/inside-dholera">
              <button className="bg-gradient-to-r from-teal-400 to-teal-600 hover:from-teal-500 hover:to-teal-700 px-8 py-3 rounded-full text-white font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                Learn More
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}