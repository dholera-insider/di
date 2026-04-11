import React from "react";
import { MapPin, Route, Plane, RailSymbol, Fence } from "lucide-react";
import { FaHospitalAlt, FaIndustry } from "react-icons/fa";

const LocationCard = ({ icon, distance, title, description, time }) => (
  <div className="bg-teal-900 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out group hover:-translate-y-1">
    <div className="flex items-start gap-4">
      <div className="w-14 h-14 bg-teal-100 group-hover:bg-teal-700 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ease-in-out">
        <div className="text-gray-900 group-hover:text-white transition-colors duration-300 ease-in-out">
          {icon}
        </div>
      </div>
      <div className="flex-1">
        <div className="flex items-baseline gap-2 mb-2">
          <span className="text-xl font-bold text-white">{distance}</span>
        </div>
        <h3 className="font-semibold text-white text-lg mb-1">{title}</h3>
        <p className="text-white text-sm">{description}</p>
      </div>
    </div>
  </div>
);

const PrimeLocationSection = () => {
  const locations = [
    {
      icon: <RailSymbol size={28} />,
      distance: "2 Minutes",
      title: "Railway Connectivity",
      description: "Fast & seamless road connectivity",
      time: "15 min",
    },
    {
      icon: <Fence size={28} />,
      distance: "5 Minutes",
      title: "Dholera SIR boundary",
      description: "High-growth development zone",
      time: "30 min",
    },
    {
      icon: <MapPin size={28} />,
      distance: "12 Minutes",
      title: "Ahmedabad Dholera Expressway",
      description: "Located at the entrance of India's Smart City",
      time: null,
    },

    {
      icon: <FaHospitalAlt size={28} />,
      distance: "17 Minutes",
      title: "RMS Multi-Specialty Hospital",
      description: "High-growth development zone",
      time: "30 min",
    },
    {
      icon: <FaIndustry size={28} />,
      distance: "22 Minutes",
      title: "Tata Semiconductor Plant",
      description: "Global connectivity advantage",
      time: "57 min",
    },

    {
      icon: <Plane size={28} />,
      distance: "30 Minutes",
      title: "Dholera International Airport",
      description: "Global connectivity advantage",
      time: "57 min",
    },
  ];

  return (
    <section className="py-8 px-4 ">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-4xl font-bold text-teal-800 mb-4">
            Prime Location
          </h2>
          <div className="w-24 h-1 bg-gray-900 mx-auto rounded-full"></div>
          <p className="text-gray-900 mt-4 text-lg max-w-2xl mx-auto">
            Strategically positioned for maximum growth and connectivity
          </p>
        </div>

        {/* Location Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {locations.map((location, index) => (
            <LocationCard
              key={index}
              icon={location.icon}
              distance={location.distance}
              title={location.title}
              time={location.time}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PrimeLocationSection;
