import React, { useState, useEffect } from "react";
import {
  Plane,
  Building,
  Factory,
  Zap,
  TrendingUp,
  ArrowRight,
  Target,
  Calendar,
} from "lucide-react";

const InvestmentTimeline = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [counterValues, setCounterValues] = useState({
    initial: 0,
    projected: 0,
    profit: 0
  });

  const milestones = [
    {
      year: "2025",
      multiplier: "Current",
      price: "₹6,500/sq.yd",
      title: "Your Investment Entry Point",
      icon: <TrendingUp className="w-8 h-8" />,
      details: [
        "Entry at pre-development pricing",
        "Infrastructure completion in progress",
        "Lowest risk, highest growth potential"
      ],
    },
    {
      year: "2027-2029",
      multiplier: "5x Returns",
      price: "₹32,500/sq.yd",
      title: "Dholera-Ahmedabad Expressway & Airport Launch",
      description: "Direct connectivity to Ahmedabad via expressway and inaugural commercial flights at Dholera Airport",
      icon: <Plane className="w-8 h-8" />,
      details: [
        "5x value appreciation expected",
        "Airport operational with domestic flights",
        "Expressway reduces travel time to 1 hour"
      ],
    },
    {
      year: "2030-2032",
      multiplier: "7x Returns",
      price: "₹45,500/sq.yd",
      title: "Tata Semiconductor Operations",
      description: "Tata's semiconductor manufacturing facility becomes fully operational, creating massive employment and industrial growth",
      icon: <Factory className="w-8 h-8" />,
      details: [
        "7x returns from industrial boom",
        "50,000+ jobs created in region",
        "Semiconductor hub attracts global investment"
      ],
    },
    {
      year: "2033-2035",
      multiplier: "10x Returns",
      price: "₹65,000/sq.yd",
      title: "Complete Smart City Ecosystem",
      description: "All TP zones operational with full smart city infrastructure, making Dholera Gujarat's prime investment destination",
      icon: <Building className="w-8 h-8" />,
      details: [
        "10x returns at full maturity",
        "Complete infrastructure operational",
        "Premium smart city pricing"
      ],
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('timeline-container');
    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, []);

  useEffect(() => {
    if (isVisible) {
      const duration = 2000;
      const steps = 60;
      const interval = duration / steps;
      
      const targets = {
        initial: 981500,
        projected: 9815000,
        profit: 8833500
      };

      let currentStep = 0;
      const timer = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;
        const easeOutQuad = 1 - Math.pow(1 - progress, 2);
        
        setCounterValues({
          initial: Math.floor(targets.initial * easeOutQuad),
          projected: Math.floor(targets.projected * easeOutQuad),
          profit: Math.floor(targets.profit * easeOutQuad)
        });

        if (currentStep >= steps) {
          clearInterval(timer);
        }
      }, interval);

      return () => clearInterval(timer);
    }
  }, [isVisible]);

  const handleCardClick = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const formatCurrency = (value) => {
    if (value >= 10000000) {
      return `₹${(value / 10000000).toFixed(2)}Cr`;
    } else if (value >= 100000) {
      return `₹${(value / 100000).toFixed(2)}L`;
    }
    return `₹${value.toLocaleString('en-IN')}`;
  };

  return (
    <div className="w-full bg-gradient-to-b from-white via-teal-50/30 to-white py-16 px-4 overflow-hidden" id="timeline-container">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'
        }`}>
          <h2 className="text-4xl max-sm:text-xl font-bold text-gray-900 mb-4">
            Your Path to <span className="text-teal-600">10x Returns</span>
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Track your investment's journey as Dholera transforms into India's premier smart city
          </p>
        </div>

        {/* Timeline Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {milestones.map((milestone, index) => (
            <div
              key={index}
              className={`relative transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-x-0' : index % 2 === 0 ? 'opacity-0 -translate-x-12' : 'opacity-0 translate-x-12'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              {/* Card */}
              <div 
                className={`relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border-2 cursor-pointer overflow-hidden group ${
                  activeIndex === index ? 'border-teal-500 ring-4 ring-teal-100' : 'border-gray-200 hover:border-teal-300'
                }`}
                onClick={() => handleCardClick(index)}
              >
                {/* Background Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br from-teal-500/5 to-transparent transition-opacity duration-500 ${
                  activeIndex === index ? 'opacity-100' : 'opacity-0 group-hover:opacity-50'
                }`}></div>

                <div className="relative z-10">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div className={`flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br from-teal-500 to-teal-600 text-white shadow-lg transition-transform duration-500 ${
                      activeIndex === index ? 'scale-110 rotate-6' : 'group-hover:scale-105'
                    }`}>
                      {milestone.icon}
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-semibold text-gray-500 mb-1">{milestone.year}</div>
                      <div className={`text-2xl font-bold transition-colors duration-300 ${
                        activeIndex === index ? 'text-teal-600' : 'text-gray-900'
                      }`}>
                        {milestone.multiplier}
                      </div>
                      <div className="text-xl font-bold text-teal-500 mt-1">{milestone.price}</div>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight">
                    {milestone.title}
                  </h3>

                  {/* Details Expandable */}
                  <div className={`transition-all duration-500 overflow-hidden ${
                    activeIndex === index ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
                  }`}>
                    <div className="border-t border-gray-200 pt-4 mt-4">
                      <div className="text-sm font-semibold text-teal-600 mb-3">Key Benefits:</div>
                      <ul className="space-y-2">
                        {milestone.details.map((detail, i) => (
                          <li key={i} className="flex items-start text-sm text-gray-700">
                            <div className="w-1.5 h-1.5 bg-teal-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Progress Indicator */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-100">
                  <div 
                    className={`h-full bg-gradient-to-r from-teal-500 to-teal-600 transition-all duration-700 ${
                      activeIndex === index ? 'w-full' : 'w-0'
                    }`}
                  ></div>
                </div>
              </div>

              {/* Connection Line for larger screens */}
              {index < milestones.length - 1 && (
                <div className="hidden lg:block absolute -bottom-8 left-1/2 transform -translate-x-1/2">
                  <div className="w-px h-8 bg-gradient-to-b from-teal-500 to-transparent"></div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Investment Summary */}
        <div className={`bg-gradient-to-br from-teal-500 to-teal-600 rounded-3xl p-8 text-white shadow-2xl transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-2xl md:text-3xl font-semibold">Investment Overview</h3>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 hover:bg-white/15 transition-all duration-300">
              <div className="text-sm opacity-90 mb-2">Initial Investment</div>
              <div className="text-lg md:text-xl font-semibold mb-1">
                {formatCurrency(counterValues.initial)}
              </div>
              <div className="text-sm opacity-75">151 sq yd plot @ ₹6,500/sq.yd</div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 hover:bg-white/15 transition-all duration-300">
              <div className="text-sm opacity-90 mb-2">Projected Value (2035)</div>
              <div className="text-lg md:text-xl font-semibold mb-1">
                {formatCurrency(counterValues.projected)}
              </div>
              <div className="text-sm opacity-75">10x returns potential</div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 hover:bg-white/15 transition-all duration-300">
              <div className="text-sm opacity-90 mb-2">Potential Profit</div>
              <div className="text-lg md:text-xl font-semibold mb-1">
                {formatCurrency(counterValues.profit)}
              </div>
              <div className="text-sm opacity-75">≈900% growth rate</div>
            </div>
          </div>

          <p className="text-xs opacity-75 mt-6 text-center">
            *Projections are estimates based on current development plans. Past performance is not indicative of future results.
          </p>
        </div>
      </div>

      <style>{`
        @keyframes pulse-ring {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          100% {
            transform: scale(1.5);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default InvestmentTimeline;