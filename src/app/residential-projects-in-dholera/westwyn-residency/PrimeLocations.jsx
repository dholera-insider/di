import React from "react";
import { MapPin, Plane, RailSymbol, Fence } from "lucide-react";
import { FaHospitalAlt, FaIndustry } from "react-icons/fa";

const LocationCard = ({ icon, distance, title, description, time }) => (
  <div className="bg-[#051A3A] rounded-xl p-[clamp(1.25rem,2.5vw,1.5rem)] shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out group hover:-translate-y-1">
    <div className="flex items-start gap-[clamp(0.75rem,2vw,1rem)]">
      <div className="w-[clamp(3rem,5vw,3.5rem)] h-[clamp(3rem,5vw,3.5rem)] bg-[#F6C343] group-hover:bg-[#2B364D] rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ease-in-out">
        <div className="text-gray-900 group-hover:text-white transition-colors duration-300 ease-in-out">
          {icon}
        </div>
      </div>
      <div className="flex-1">
        <div className="flex items-baseline gap-2 mb-2">
          <span className="text-[clamp(1.125rem,2vw,1.25rem)] font-bold text-white">
            {distance}
          </span>
        </div>
        <h3 className="font-semibold text-white text-[clamp(1rem,1.8vw,1.125rem)] mb-1">
          {title}
        </h3>
        <p className="text-white text-sm">{description}</p>
      </div>
    </div>
  </div>
);

const PrimeLocationSection = () => {
  const locations = [
    {
      icon: <RailSymbol size={28} />,
      distance: "2 minutes",
      title: "Railway Connectivity",
      description: "Fast & seamless road connectivity",
      time: "15 min",
    },
    {
      icon: <Fence size={28} />,
      distance: "5 minutes",
      title: "Dholera SIR boundary",
      description: "High-growth development zone",
      time: "30 min",
    },
    {
      icon: <MapPin size={28} />,
      distance: "12 minutes",
      title: "Ahmedabad-Dholera Expressway",
      description: "Located at the entrance of India's Smart City",
      time: null,
    },
    {
      icon: <FaHospitalAlt size={28} />,
      distance: "17 minutes",
      title: "RMS Multi-Specialty Hospital",
      description: "High-growth development zone",
      time: "30 min",
    },
    {
      icon: <FaIndustry size={28} />,
      distance: "22 minutes",
      title: "Tata Semiconductor Plant",
      description: "Global connectivity advantage",
      time: "57 min",
    },
    {
      icon: <Plane size={28} />,
      distance: "30 minutes",
      title: "Dholera International Airport",
      description: "Global connectivity advantage",
      time: "57 min",
    },
  ];

  return (
    <section className="py-[clamp(2rem,4vw,3.5rem)] px-[1rem]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-[clamp(1.5rem,3vw,2.25rem)] font-bold text-[#051A3A] mb-4">
            Prime Locations
          </h2>
          <div className="w-24 h-1 bg-gray-900 mx-auto rounded-full"></div>
          
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-[clamp(1rem,2.5vw,1.5rem)]">
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
