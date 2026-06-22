"use client";
import React from "react";

const countries = [
  { name: "UAE", flag: "https://flagcdn.com/ae.svg" },
  { name: "Bahrain", flag: "https://flagcdn.com/bh.svg" },
  { name: "Singapore", flag: "https://flagcdn.com/sg.svg" },
  { name: "Kuwait", flag: "https://flagcdn.com/kw.svg" },
  { name: "Oman", flag: "https://flagcdn.com/om.svg" },
  { name: "Saudi Arabia", flag: "https://flagcdn.com/sa.svg" },
  { name: "Qatar", flag: "https://flagcdn.com/qa.svg" },
];

export default function Countries() {
  return (
    <div className="mx-auto max-w-7xl bg-[#FDFCFA] p-4">
      <div className="mb-4">
        <h2 className="text-center text-2xl font-bold text-[#051A3A]">
          Countries
        </h2>
        
      </div>

      <div className="overflow-x-auto pb-2">
        <div className="flex min-w-max gap-3 lg:min-w-0">
          {countries.map((country) => (
            <div
              key={country.name}
              className="min-w-[10rem] flex-1 rounded-xl border border-[#2B364D]/15 bg-[#FDFCFA] p-4 text-[#162033] shadow-sm transition-all duration-300 hover:-translate-y-1 hover:bg-[#051A3A] hover:text-[#FDFCFA] hover:shadow-md lg:min-w-0"
            >
              <div className="flex flex-col items-center justify-center gap-2">
                <img
                  src={country.flag}
                  alt={country.name}
                  className="h-8 w-10 shrink-0 rounded object-cover"
                />
                <span className="text-sm font-medium lg:text-base">
                  {country.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
