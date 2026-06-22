"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import maps from "@/app/assets/locations.webp";
import videos from "@/app/assets/videos.webp";
import inventory from "@/app/assets/plot.webp";
import bg from "@/app/assets/bg-image.webp";
import westwynCounty from "@/app/assets/westwyn-county-banner.webp";
import westwynEstate from "@/app/assets/estate-hero.webp";

export default function Info() {
  const items = [
    {
      id: 1,
      title: "Locations",
      description: "Dholera SIR sits 100 km from Ahmedabad on the Delhi–Mumbai Industrial Corridor, with a planned expressway, metro, and international airport nearby.",
      link: "/infopack/locations",
      image: maps,
      tag: "Explore Map",
      highlights: ["100 km from Ahmedabad", "DMIC Corridor", "Airport Planned"],
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    },
    {
      id: 2,
      title: "Videos",
      description: "Watch expert insights from urban planners and investors on why Dholera - India's first greenfield smart city - is a once-in-a-generation opportunity.",
      link: "/infopack/videos",
      image: videos,
      tag: "Watch Now",
      highlights: ["Smart City Vision", "ROI Analysis", "Infrastructure Plans"],
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      id: 3,
      title: "Available Plots",
      description: "Browse live inventory of residential plots from 100 to 500+ sq yd. Prices are rising as milestones are met - secure your plot in Dholera SIR today.",
      link: "/infopack/Inventory",
      image: inventory,
      tag: "Book Now",
      highlights: ["100–500+ sq yd", "RERA Compliant", "Prices Rising"],
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
    },
  ];

  const projects = [
    {
      id: 4,
      title: "WestWyn County: Premium Plots at Dholera's Most Developed Corridor",
      description: "WestWyn County is a premium residential plotting project located on the Fedra–Pipli State Highway, one of the fastest-developing corridors near Dholera. The project offers government-approved residential plots ranging from 150 sq. yds to 325 sq. yds, located just 15 minutes from the upcoming Dholera International Airport. With strong location advantages and connectivity to upcoming infrastructure, WestWyn County is positioned as a planned residential community near the growth zone of Dholera Smart City.",
      link: "/infopack/westwyn-county",
      image: westwynCounty,
      tag: "Premium Plots",
      highlights: ["150–325 sq. yds", "Govt. Approved", "12 min from Airport"],
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
    },
    {
      id: 5,
      title: "WestWyn Estate - Dholera Plots Under ₹10 Lakh",
      description: "WestWyn Estate is strategically located 0 KM from the Dholera SIR boundary, on the Vadhela–Navda State Highway. The project offers register-ready plots just 5 minutes from the Ahmedabad–Dholera Expressway, providing quick connectivity to major infrastructure developments. Located near the Hebatpur Industrial Area, WestWyn Estate offers investors an opportunity to secure Dholera plots in a rapidly developing industrial region with long-term growth potential.",
      link: "/infopack/westwyn-estate",
      image: westwynEstate,
      tag: "Under ₹10 Lakh",
      highlights: ["0 KM from SIR", "Register-Ready", "Near Industrial Area"],
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
        </svg>
      ),
    },
  ];

  const whyReasons = [
    { num: "1", title: "Strategic Location", body: "Positioned in the heart of Gujarat with strong connectivity to Ahmedabad, Bhavnagar, Vadodara, and other major economic centers." },
    { num: "2", title: "Manufacturing Powerhouse", body: "Dholera is emerging as a global hub for industries such as electronics manufacturing, semiconductors, aerospace, and defense production." },
    { num: "3", title: "Sustainable Smart Living", body: "The city is designed with renewable energy integration and modern urban planning for housing, healthcare, and education infrastructure." },
    { num: "4", title: "Plug-and-Play Infrastructure", body: "Industrial zones already feature wide roads, underground utilities, ICT systems, and SCADA-enabled smart monitoring infrastructure." },
    { num: "5", title: "Industrial Magnet", body: "Over ₹3 lakh crore in planned investments from government initiatives and global companies including TATA, Tokyo Electron, and Tillman Global." },
    { num: "6", title: "High ROI Zone", body: "Early-stage investors are entering during the initial growth phase, positioning themselves for long-term appreciation as infrastructure and industries expand." },
  ];

  return (
    <div
      className="min-h-screen py-16 px-6 lg:px-12 relative"
      style={{
        backgroundImage: `url(${bg.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Teal overlay */}
      <div className="absolute inset-0 bg-teal-900 bg-opacity-90" />

      <div className="relative z-10 max-w-screen-xl mx-auto">

        {/* ── Header ── */}
        <div className="mb-6 max-w-3xl">
          <p className="text-teal-400 pt-8 text-xs font-semibold tracking-widest uppercase mb-2">
            Dholera Special Investment Region
          </p>
          <h1 className="text-4xl font-bold text-white leading-tight mb-3">
            Dholera: India's Smart City Revolution
          </h1>
        </div>

        {/* ── Vision Block ── */}
        <div className="mb-8 max-w-3xl">
          <h2 className="text-teal-300 text-lg font-semibold mb-2">The Vision of Dholera SIR</h2>
          <p className="text-teal-200 text-sm leading-relaxed">
            Dholera Special Investment Region (SIR) represents India's smart city vision and is the first city developed under the Gujarat Special Investment Region (SIR) Act. Spread across 922.5 sq. km, it is a greenfield smart city and a key node of the Delhi–Mumbai Industrial Corridor (DMIC), being developed with strong support from the Government of India and the Government of Gujarat.
          </p>
          <p className="text-teal-200 text-sm leading-relaxed mt-3">
            Planned as a self-sustained global hub for manufacturing, innovation, and urban living, Dholera combines advanced technology, world-class infrastructure, and sustainable design setting a new benchmark for future Indian cities.
          </p>
          <p className="text-teal-200 text-sm leading-relaxed mt-3">
            Dholera isn't just a project - it represents India's response to the evolving needs of modern smart cities, bringing together digital governance, green energy, and inclusive growth.
          </p>
          <div className="mt-6 h-px bg-teal-700" />
        </div>

        {/* ── Stats Row ── */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
          {[
            { value: "922.5 km²", label: "Smart City Area" },
            { value: "₹1L Cr+", label: "Planned Investment" },
            /* { value: "2× Delhi", label: "Size Comparison" }, */
            { value: "2047", label: "Target Completion" },
          ].map((s) => (
            <div key={s.label} className="bg-teal-800 bg-opacity-60 rounded-xl px-5 py-4 border border-teal-700">
              <p className="text-white text-2xl font-bold">{s.value}</p>
              <p className="text-teal-300 text-xs mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* ── Info Cards (Locations / Videos / Plots) ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-14">
          {items.map((item) => (
            <Link href={item.link} key={item.id}>
              <div className="bg-white rounded-2xl overflow-hidden flex flex-col h-full hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
                <div className="relative h-40 w-full">
                  <Image src={item.image} alt={item.title} fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-teal-900 via-transparent to-transparent" />
                  <span className="absolute top-3 left-3 bg-teal-800 bg-opacity-80 text-teal-100 text-xs font-semibold px-3 py-1 rounded-full">
                    {item.tag}
                  </span>
                </div>
                <div className="p-4 flex flex-col flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center flex-shrink-0">
                      {item.icon}
                    </div>
                    <h3 className="text-teal-900 font-semibold text-base leading-tight">{item.title}</h3>
                  </div>
                  <p className="text-gray-500 text-xs leading-relaxed mb-4 flex-1">{item.description}</p>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {item.highlights.map((h) => (
                      <span key={h} className="bg-teal-50 text-teal-700 text-xs px-2 py-0.5 rounded-full border border-teal-100">{h}</span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <span className="text-teal-700 text-xs font-semibold tracking-wide uppercase">View Details</span>
                    <div className="w-7 h-7 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* ── Why Dholera Section ── */}
        <div className="mb-14">
          <div className="mb-6">
            <h2 className="text-white text-2xl font-bold mb-2">Why Dholera is the Future of India</h2>
            <p className="text-teal-200 text-sm leading-relaxed max-w-2xl">
              Dholera offers the perfect balance of government support, strategic location, and affordability, making it one of India's most promising long-term development regions.
            </p>
          </div>
          <p className="text-teal-400 text-xs font-semibold tracking-widest uppercase mb-4">Key Reasons Behind Dholera's Growth</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {whyReasons.map((r) => (
              <div key={r.num} className="bg-teal-800 bg-opacity-50 border border-teal-700 rounded-xl p-5">
                <div className="flex items-start gap-3">
                  <span className="text-teal-400 text-lg font-bold leading-none">{r.num}.</span>
                  <div>
                    <p className="text-white text-sm font-semibold mb-1">{r.title}</p>
                    <p className="text-teal-200 text-xs leading-relaxed">{r.body}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10 h-px bg-teal-700" />
        </div>

        {/* ── Our Projects Section ── */}
        <div>
          <div className="mb-6">
            <p className="text-teal-400 text-xs font-semibold tracking-widest uppercase mb-2">Our Projects</p>
            <h2 className="text-white text-2xl font-bold">Our Projects Near Dholera Smart City</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {projects.map((item) => (
              <Link href={item.link} key={item.id}>
                <div className="bg-white rounded-2xl overflow-hidden flex flex-col h-full hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
                  <div className="relative h-80 w-full">
                    <Image src={item.image} alt={item.title} fill className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-teal-900 via-transparent to-transparent" />
                    <span className="absolute top-3 left-3 bg-teal-800 bg-opacity-80 text-teal-100 text-xs font-semibold px-3 py-1 rounded-full">
                      {item.tag}
                    </span>
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <div className="flex items-start gap-2 mb-3">
                      <div className="w-8 h-8 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center flex-shrink-0 mt-0.5">
                        {item.icon}
                      </div>
                      <h3 className="text-teal-900 font-semibold text-base leading-snug">{item.title}</h3>
                    </div>
                    <p className="text-gray-500 text-xs leading-relaxed mb-4 flex-1">{item.description}</p>
                    <div className="flex flex-wrap gap-1 mb-4">
                      {item.highlights.map((h) => (
                        <span key={h} className="bg-teal-50 text-teal-700 text-xs px-2 py-0.5 rounded-full border border-teal-100">{h}</span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                      <span className="text-teal-700 text-xs font-semibold tracking-wide uppercase">View Details</span>
                      <div className="w-7 h-7 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}