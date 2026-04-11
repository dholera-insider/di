import React from "react";

export default function Dholera() {
  const benefits = [
    {
      title: "India's First Greenfield Smart City",
      description:
        "Dholera Smart City Project is one of India's most ambitious government-backed projects, strategically developed under the Delhi–Mumbai Industrial Corridor (DMIC) in Gujarat. Planned as a next-generation smart city, Dholera is designed for sustainable urban living, advanced infrastructure, and large-scale industrial growth.",
    },
    {
      title: "Strong Government & Corporate Support",
      description:
        "Dholera is emerging as a major semiconductor and industrial hub, backed by strong government initiatives and investments from leading companies such as TATA, ReNew, Jabil, INOX Air Products, Reliance Industries, Adani Group, and NextGen Group.",
    },
    {
      title: "World-Class Infrastructure",
      description:
        "The city offers plug-and-play industrial infrastructure, smart road networks, well-planned industrial zones, and sustainable urban development with modern utilities and smart governance systems.",
    },
    {
      title: "Excellent Connectivity",
      description:
        "Dholera enjoys seamless connectivity through the Ahmedabad–Dholera Expressway, the upcoming Dholera International Airport, the proposed metro rail, and its close proximity to Ahmedabad.",
    },
    {
      title: "High Investment Returns",
      description:
        "With affordable land prices at present, rapid industrial development, and rising demand for residential and commercial plots, Dholera presents a strong opportunity for long-term real estate investment.",
    },
    {
      title: "Single-Window Governance & Faster Approvals",
      description:
        "Dholera follows a single-window approval system that simplifies permissions and reduces delays. This makes investing and doing business faster and more transparent than in traditional cities.",
    },
  ];

  return (
    <div className="bg-gradient-to-br from-gray-900 via-slate-800 to-teal-900">
      {/* Why Dholera Smart City Section */}
      <div className="py-16 max-w-7xl mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-4xl max-sm:text-xl font-bold text-white mb-4">
            What Makes Dholera Smart City Different from Other Cities in India
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-teal-400 to-teal-600 mx-auto rounded-full"></div>
        </div>

        {/* 3 Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-sm rounded-lg p-6 h-auto md:h-64 hover:bg-white/15 transition-all duration-300 border border-white/20"
            >
              <h3 className="text-xl font-semibold text-teal-300 mb-3">
                {benefit.title}
              </h3>
              <p className="text-gray-100 text-sm leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}