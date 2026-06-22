"use client";
import React, { useState, useEffect } from "react";
import govtApprovedProject from "@/app/assets/home/govt-approved-project.webp";
import salesDeed from "@/app/assets/home/immediate-sale-deed.webp";
import afterSales from "@/app/assets/home/after-sales.webp";
import buybackguarantee from "@/app/assets/home/buy-back-guarantee.webp";
import location from "@/app/assets/home/location.webp";
import hidden from "@/app/assets/home/hiddenCharges.webp";
import Image from "next/image";
import projectImage from "@/app/assets/home/westwyn-project.webp";
import bg from "@/app/assets/home/pexels2.jpg";

const features = [
  {
    icon: govtApprovedProject,
    title: "Govt Approved Projects",
    description: "Fully government approved and verified",
  },
  {
    icon: salesDeed,
    title: "Immediate Sale Deed",
    description: "Quick documentation and registration",
  },
  {
    icon: afterSales,
    title: "After Sales Support",
    description: "Comprehensive post-purchase assistance",
  },
  {
    icon: hidden,
    title: "Transparent Pricing",
    description: "No hidden charges, clear pricing structure",
  },
  {
    icon: buybackguarantee,
    title: "Buy Back Guarantee",
    description: "*Terms & Conditions Apply*",
  },
];

export default function Westwyn() {
  const [investmentYear, setInvestmentYear] = useState(5);
  const [plotSize, setPlotSize] = useState(200);
  const [customYear, setCustomYear] = useState("");

  const baseRate = 9250; // Current price per sq. yard
  const targetRate = 17000; // Price after 5 years
  const annualGrowthRate = 0.05; // 5% annual growth

  const calculateFutureValue = (years) => {
    // If years is 2 or less, use linear interpolation to match exactly 13000 at 2 years
    if (years <= 5) {
      const incrementPerYear = (targetRate - baseRate) / 5;
      return baseRate + incrementPerYear * years;
    } else {
      // For years > 2, use compound growth at 5% from the 2-year mark
      return targetRate * Math.pow(1 + annualGrowthRate, years - 5);
    }
  };

  const calculateInvestment = () => {
    let years = investmentYear;
    if (customYear) {
      years = parseInt(customYear);
    }

    const futureRate = calculateFutureValue(years);
    const currentInvestment = baseRate * plotSize;
    const futureValue = futureRate * plotSize;
    const profit = futureValue - currentInvestment;
    const percentageGrowth = (futureValue / currentInvestment - 1) * 100;

    return {
      currentValue: currentInvestment,
      futureValue: futureValue,
      profit: profit,
      percentageGrowth: percentageGrowth,
      ratePerSqYard: futureRate,
    };
  };

  const investmentDetails = calculateInvestment();

  useEffect(() => {
    // Initialize animation observers when component mounts
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-visible");
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Observe all animation elements
    document
      .querySelectorAll(
        ".fade-in-up, .feature-item, .project-image, .amenity-item, .investment-calculator"
      )
      .forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
      // Ensure we clean up by enabling scrolling when component unmounts
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <>
      <style jsx global>
        {`
          /* Fade in animation */
          .fade-in-up {
            opacity: 0;
            transform: translateY(30px);
            transition:
              opacity 0.6s ease,
              transform 0.6s ease;
          }

          .fade-in-up.animate-visible {
            opacity: 1;
            transform: translateY(0);
          }

          /* Staggered animation for feature items */
          .feature-item,
          .amenity-item {
            opacity: 0;
            transform: translateX(-30px);
            transition:
              opacity 0.5s ease,
              transform 0.5s ease;
          }

          .feature-item.animate-visible,
          .amenity-item.animate-visible {
            opacity: 1;
            transform: translateX(0);
          }

          .feature-item:nth-child(1),
          .amenity-item:nth-child(1) {
            transition-delay: 0.1s;
          }
          .feature-item:nth-child(2),
          .amenity-item:nth-child(2) {
            transition-delay: 0.2s;
          }
          .feature-item:nth-child(3),
          .amenity-item:nth-child(3) {
            transition-delay: 0.3s;
          }
          .feature-item:nth-child(4),
          .amenity-item:nth-child(4) {
            transition-delay: 0.4s;
          }
          .feature-item:nth-child(5) {
            transition-delay: 0.5s;
          }
          .feature-item:nth-child(6) {
            transition-delay: 0.6s;
          }

          /* Project image animation */
          .project-image {
            opacity: 0;
            transform: translateX(50px);
            transition:
              opacity 0.8s ease,
              transform 0.8s ease;
          }

          .project-image.animate-visible {
            opacity: 1;
            transform: translateX(0);
          }

          /* Calculator animation */
          .investment-calculator {
            opacity: 0;
            transform: translateY(30px);
            transition:
              opacity 0.8s ease,
              transform 0.8s ease;
            transition-delay: 0.3s;
          }

          .investment-calculator.animate-visible {
            opacity: 1;
            transform: translateY(0);
          }

          /* Modal styles */
          .modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(0, 0, 0, 0.7);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
            padding: 1rem;
          }

          .modal-content {
            background: linear-gradient(
              135deg,
              #1f2937 0%,
              #374151 50%,
              #0f766e 100%
            );
            border-radius: 0.5rem;
            width: 100%;
            max-width: 500px;
            max-height: 90vh;
            overflow-y: auto;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
            border: 1px solid rgba(20, 184, 166, 0.2);
          }

          /* Add spacing between sections */
          .westwyn-container section {
            margin-bottom: 5rem;
          }

          /* Glass morphism effect for feature cards */
          .westwyn-feature-card {
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            transition: all 0.3s ease;
          }

          .westwyn-feature-card:hover {
            background: rgba(255, 255, 255, 0.15);
            transform: translateY(-2px);
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
          }

          /* Floating card enhancement */
          .westwyn-floating-card {
            background: linear-gradient(
              135deg,
              rgba(255, 255, 255, 0.9) 0%,
              rgba(255, 255, 255, 0.8) 100%
            );
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.3);
          }
        `}
      </style>

      <div
        id="westwyn-county"
        className="westwyn-container relative overflow-hidden"
      >
        {/* Background decorative elements */}
        <Image
          src={bg}
          alt="Background Image"
          layout="fill"
          objectFit="cover"
          className="absolute inset-0 -z-10 opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/60 to-teal-900/60 pointer-events-none"></div>
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_70%_80%,rgba(20,184,166,0.1),transparent_50%)]"></div>

        {/* Header Section */}
        <section className="max-w-7xl pt-8 mx-auto px-4 mb-16 relative z-10">
          <div className="text-center space-y-4">
            <h1 className="text-xl md:text-4xl font-bold bg-gradient-to-r from-gray-100 to-teal-100 bg-clip-text text-transparent drop-shadow-lg">
              WestWyn County
            </h1>
            <div className="bg-gradient-to-r from-teal-400 to-teal-600 w-48 mx-auto h-1 rounded-full"></div>
            <p className="font-light italic text-gray-200 text-lg max-w-2xl mx-auto leading-relaxed">
              Platinum-rated, AUDA-approved plots on Fedra-Pipli Highway in
              Dholera's growth zone — built for smart investors.
            </p>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4">
          <div className="fade-in-up bg-gradient-to-r from-gray-800/60 to-teal-800/40 border-2 border-teal-500/30 md:rounded-2xl shadow-2xl p-8 backdrop-blur-sm">
            <div className="grid grid-cols-2 md:grid-cols-4 text-center">
              <div className="mb-2">
                <div className="text-3xl font-bold bg-gradient-to-r from-teal-300 to-teal-400 bg-clip-text text-transparent text-center drop-shadow-lg">
                  200+
                </div>
                <div className="text-gray-200 text-sm">Sq. Yards Plots</div>
              </div>
              <div className="mb-2">
                <div className="text-3xl font-bold bg-gradient-to-r from-teal-300 to-teal-400 bg-clip-text text-transparent text-center drop-shadow-lg">
                  24x7
                </div>
                <div className="text-gray-200 text-sm">Security</div>
              </div>
              <div className="mb-2">
                <div className="text-3xl font-bold bg-gradient-to-r from-teal-300 to-teal-400 bg-clip-text text-transparent text-center drop-shadow-lg">
                  100%
                </div>
                <div className="text-gray-200 text-sm">Legal Approval</div>
              </div>
              <div className="mb-2">
                <div className="text-3xl font-bold bg-gradient-to-r from-teal-300 to-teal-400 bg-clip-text text-transparent text-center drop-shadow-lg">
                  70+
                </div>
                <div className="text-gray-200 text-sm">Plots</div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content Section */}
        <section className="max-w-7xl mx-auto px-4 mb-20 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Features */}
            <div className="space-y-8">
              <div className="">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-100 to-teal-100 bg-clip-text text-transparent mb-6 drop-shadow-lg">
                  Why Choose WestWyn County?
                </h2>
                <p className="text-gray-200 mb-8 leading-relaxed">
                  WestWyn County offers premium residential plots with
                  world-class amenities and modern infrastructure—an ideal
                  investment near Dholera's Special investment Zone
                </p>
              </div>

              <div className="space-y-6">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className="westwyn-feature-card feature-item flex items-start space-x-4 p-6 rounded-xl shadow-lg"
                  >
                    <div className="flex-shrink-0 w-16 h-16 flex items-center justify-center bg-gradient-to-br from-teal-500/20 to-teal-600/20 rounded-lg border border-teal-400/30">
                      <div className="relative w-12 h-12">
                        <Image
                          src={feature.icon}
                          alt={feature.title}
                          fill
                          className="object-contain filter brightness-125"
                        />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-100 mb-2 drop-shadow">
                        {feature.title}
                      </h3>
                      <p className="text-gray-200 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Side - Project Image */}
            <div className="lg:pl-8">
              <div className="relative">
                {/* Main Project Image */}
                <div className="relative h-96 lg:h-[600px] rounded-2xl overflow-hidden shadow-2xl border border-teal-500/30">
                  <Image
                    src={projectImage}
                    alt="WestWyn County Project"
                    fill
                    className="object-cover"
                    priority
                  />

                  {/* Enhanced Overlay with project details */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 text-white">
                    <h3 className="text-2xl font-bold mb-2 drop-shadow-lg">
                      WestWyn County
                    </h3>
                    <p className="text-sm opacity-90 mb-3">
                      Premium Plotting Project
                    </p>
                    <div className="flex items-center space-x-4 mt-3">
                      <span className="bg-gradient-to-r from-teal-500 to-teal-600 px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                        AUDA Approved
                      </span>
                      <span className="bg-gradient-to-r from-emerald-500 to-emerald-600 px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                        Possession Ready
                      </span>
                    </div>
                  </div>
                </div>

                {/* Enhanced Floating Info Cards */}
                <div className="westwyn-floating-card absolute -top-4 -right-4 rounded-xl shadow-xl p-6 max-w-48 border border-white/20">
                  <div className="text-center">
                    <div className="text-2xl font-bold bg-gradient-to-r from-teal-600 to-teal-700 bg-clip-text text-transparent drop-shadow">
                      ₹18L+
                    </div>
                    <div className="text-sm text-gray-700 font-medium">
                      Starting Price
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}