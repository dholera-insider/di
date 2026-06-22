import React, { useState, useEffect } from "react";
import {
  ChevronRight,
  Plane,
  Building,
  Factory,
  Zap,
  TrendingUp,
  ArrowUp,
} from "lucide-react";

const InvestmentTimeline = () => {
  const [animatedItems, setAnimatedItems] = useState([]);
  const [flippedCard, setFlippedCard] = useState(null);
  const [progressWidth, setProgressWidth] = useState(0);
  const [counterValues, setCounterValues] = useState({
    initial: 0,
    projected: 0,
    profit: 0
  });
  const [isVisible, setIsVisible] = useState(false);

  const milestones = [
    {
      year: "2025",
      multiplier: "Current",
      price: "₹9,500/sq.ft",
      title: <span>Your Investment<br />Entry Point</span>,
      description: "Prime opportunity to invest in India's first smart city with world-class infrastructure under development",
      icon: <TrendingUp className="w-6 h-6" />,
      flipTitle: "ROI Analysis",
      flipDetails: [
        "Entry at pre-development pricing",
        "Infrastructure completion in progress",
        "Lowest risk, highest growth potential"
      ],
      color: "bg-cyan-600",
      bgColor: "bg-cyan-50",
      borderColor: "border-cyan-200",
      flipColor: "bg-cyan-600",
      progressPercentage: 0,
    },
    {
      year: "2027-2029",
      multiplier: "5x Returns",
      price: "₹47,500/sq.ft",
      title: "Dholera-Ahmedabad Expressway & Airport Launch",
      description: "Direct connectivity to Ahmedabad via expressway and inaugural commercial flights at Dholera Airport",
      icon: <Plane className="w-6 h-6" />,
      flipTitle: "Connectivity ROI",
      flipDetails: [
        "5x value appreciation expected",
        "Airport operational with domestic flights",
        "Expressway reduces travel time to 1 hour"
      ],
      color: "bg-teal-400",
      bgColor: "bg-teal-50",
      borderColor: "border-teal-200",
      flipColor: "bg-teal-400",
      progressPercentage: 33,
    },
    {
      year: "2030-2032",
      multiplier: "7x Returns",
      price: "₹66,500/sq.ft",
      title: "Tata Semiconductor Operations",
      description: "Tata's semiconductor manufacturing facility becomes fully operational, creating massive employment and industrial growth",
      icon: <Factory className="w-6 h-6" />,
      flipTitle: "Industrial Growth ROI",
      flipDetails: [
        "7x returns from industrial boom",
        "50,000+ jobs created in region",
        "Semiconductor hub attracts global investment"
      ],
      color: "bg-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      flipColor: "bg-green-600",
      progressPercentage: 66,
    },
    {
      year: "2033-2035",
      multiplier: "10x Returns",
      price: "₹95,000/sq.ft",
      title: "Complete Smart City Ecosystem",
      description: "All TP zones operational with full smart city infrastructure, making Dholera Gujarat's prime investment destination",
      icon: <Building className="w-6 h-6" />,
      flipTitle: "Smart City ROI",
      flipDetails: [
        "10x returns at full maturity",
        "Complete infrastructure operational",
        "Premium smart city premium pricing"
      ],
      color: "bg-cyan-600",
      bgColor: "bg-cyan-50",
      borderColor: "border-cyan-200",
      flipColor: "bg-cyan-600",
      progressPercentage: 100,
    },
  ];

  // Intersection Observer for scroll animations
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

  // Staggered card animations
  useEffect(() => {
    if (isVisible) {
      const timer = setInterval(() => {
        setAnimatedItems((prev) => {
          if (prev.length < milestones.length) {
            return [...prev, prev.length];
          }
          clearInterval(timer);
          return prev;
        });
      }, 300);

      return () => clearInterval(timer);
    }
  }, [isVisible]);

  // Progress bar animation
  useEffect(() => {
    if (animatedItems.length > 0) {
      const targetWidth = (animatedItems.length / milestones.length) * 100;
      setTimeout(() => setProgressWidth(targetWidth), 100);
    }
  }, [animatedItems]);

  // Counter animation for summary values
  useEffect(() => {
    if (isVisible) {
      const duration = 2000;
      const steps = 60;
      const interval = duration / steps;
      
      const targets = {
        initial: 1425000,
        projected: 14200000,
        profit: 12700000
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

  const formatCurrency = (value) => {
    if (value >= 10000000) {
      return `₹${(value / 10000000).toFixed(2)}Cr`;
    } else if (value >= 100000) {
      return `₹${(value / 100000).toFixed(2)}L`;
    }
    return `₹${value.toLocaleString('en-IN')}`;
  };

  const handleCardHover = (index) => {
    setFlippedCard(index);
  };

  const handleCardLeave = () => {
    setFlippedCard(null);
  };

  const InvestmentCard = ({ milestone, index, isAnimated }) => (
    <div
      className={`relative transition-all duration-700 transform ${
        isAnimated ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-95"
      }`}
    >
      {/* Timeline connector with animated fill */}
      {index < milestones.length - 1 && (
        <div className="absolute top-16 left-1/2 w-full h-1 bg-gray-200 transform -translate-x-1/2 z-0 overflow-hidden">
          <div 
            className={` transition-all duration-1000 ${
              animatedItems.includes(index + 1) ? 'w-full' : 'w-0'
            }`}
          />
          <div className="absolute right-0 top-1/2 transform -translate-y-1/2 -translate-x-1">
            <div className={`w-0 h-0 border-l-[6px] border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent transition-colors duration-500 ${
              animatedItems.includes(index + 1) ? 'border-l-teal-400' : 'border-l-gray-400'
            }`}></div>
          </div>
        </div>
      )}

      {/* Card Container with Flip Effect */}
      <div 
        className="relative w-full h-80 mt-8 cursor-pointer group"
        onMouseEnter={() => handleCardHover(index)}
        onMouseLeave={() => handleCardLeave()}
      >
        <div className={`relative w-full h-full transition-all duration-700 preserve-3d ${
          flippedCard === index ? 'rotate-y-180' : ''
        }`}>
          
          {/* Front of Card */}
          <div className={`absolute inset-0 w-full h-full backface-hidden ${milestone.bgColor} ${milestone.borderColor} border-2 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 z-10 group-hover:border-opacity-70`}>
            {/* Floating particles animation */}
            {index === 0 && (
              <div className="absolute inset-0 overflow-hidden rounded-xl pointer-events-none">
                <div className="particle particle-1"></div>
                <div className="particle particle-2"></div>
                <div className="particle particle-3"></div>
              </div>
            )}

            <div className="text-center mb-4">
              <div
                className={`inline-flex items-center justify-center w-12 h-12 rounded-full ${milestone.color} text-white mb-3 transition-all duration-500 ${
                  isAnimated ? 'animate-bounce-once' : ''
                } group-hover:scale-110 group-hover:rotate-12`}
              >
                {milestone.icon}
              </div>
              <div className="text-lg font-bold text-[#151f28] animate-fade-in">
                {milestone.year}
              </div>
              <div className={`text-lg font-semibold transition-all duration-500 ${
                milestone.color === "bg-cyan-600" ? "text-cyan-600" :
                milestone.color === "bg-teal-400" ? "text-teal-600" :
                "text-green-600"
              } ${isAnimated ? 'animate-slide-up' : ''}`}>
                {milestone.multiplier}
              </div>
              <div className="text-lg font-semibold text-gray-900 mt-1 animate-fade-in">
                {milestone.price}
              </div>
            </div>

            <div className="text-center">
              <h3 className="text-[#151f28] mb-2 font-semibold">
                {milestone.title}
              </h3>
            </div>
          </div>

          {/* Back of Card (ROI Details) */}
          <div className={`absolute inset-0 w-full h-96 backface-hidden rotate-y-180 ${milestone.flipColor} text-white rounded-xl p-6 shadow-2xl overflow-hidden`}>
            {/* Animated background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/10 to-transparent animate-gradient-shift"></div>
            
            <div className="flex flex-col h-full relative z-10">
              <div className="text-center mb-4">
                <Zap className="w-8 h-8 mx-auto mb-2 animate-spin-slow" />
                <div className="text-lg font-bold mb-2">{milestone.flipTitle}</div>
                <div className="text-2xl font-bold mb-1 animate-pulse-subtle">{milestone.multiplier}</div>
                <div className="text-lg font-semibold">{milestone.price}</div>
              </div>
              
              <div className="flex-1">
                <ul className="space-y-3">
                  {milestone.flipDetails.map((detail, i) => (
                    <li key={i} className="flex items-start text-sm leading-relaxed animate-slide-in-delayed" style={{animationDelay: `${i * 100}ms`}}>
                      <div className="w-2 h-2 bg-white rounded-full mt-1.5 mr-3 flex-shrink-0 animate-pulse"></div>
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full max-w-7xl mx-auto p-6" id="timeline-container">
      <div className="text-center mb-6">
        <h2 className={`text-4xl max-sm:text-xl font-bold text-[#151f28] mb-4 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
        }`}>
          Investment Growth Timeline
        </h2>
        <p className={`text-lg text-gray-600 max-w-3xl mx-auto transition-all duration-1000 delay-200 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          Watch your investment multiply as Dholera Smart City reaches key
          development milestones
        </p>
      </div>

      <div className="relative">
        {/* Animated background timeline for desktop */}
        <div className="hidden lg:block absolute top-16 left-0 right-0 h-1 bg-gray-200 z-0 overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-cyan-400 via-teal-400 to-green-400 transition-all duration-2000 ease-out"
            style={{ width: `${progressWidth}%` }}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {milestones.map((milestone, index) => (
            <InvestmentCard
              key={index}
              milestone={milestone}
              index={index}
              isAnimated={animatedItems.includes(index)}
            />
          ))}
        </div>
      </div>

      {/* Investment Summary with animated counters */}
      <div className={`mt-16 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-8 transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
            <ArrowUp className="w-6 h-6 mx-auto mb-2 text-cyan-600 group-hover:animate-bounce" />
            <div className="text-[24px] text-cyan-600 mb-2 font-bold">
              {formatCurrency(counterValues.initial)}
            </div>
            <div className="text-gray-600">Initial Investment</div>
            <div className="text-sm text-gray-500 mt-1">(150 sq.ft plot)</div>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
            <TrendingUp className="w-6 h-6 mx-auto mb-2 text-green-600 group-hover:animate-bounce" />
            <div className="text-[24px] text-green-600 mb-2 font-bold">
              {formatCurrency(counterValues.projected)}
            </div>
            <div className="text-gray-600">Projected Value by 2035</div>
            <div className="text-sm text-gray-500 mt-1">(10x returns)</div>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
            <Zap className="w-6 h-6 mx-auto mb-2 text-teal-600 group-hover:animate-spin" />
            <div className="text-[24px] text-teal-600 mb-2 font-bold">
              {formatCurrency(counterValues.profit)}
            </div>
            <div className="text-gray-600">Potential Profit</div>
            <div className="text-sm text-gray-500 mt-1">(≈900% growth)</div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-gray-600 text-lg mb-4">
            <strong>Why Dholera?</strong> India's first smart city with
            government backing, strategic location, and world-class
            infrastructure
          </p>
        </div>
        <p className="text-xs text-gray-500 mt-4 text-center">
          *Projections are estimates based on current development plans. Past
          performance is not indicative of future results.
        </p>
      </div>

      {/* Enhanced CSS for animations */}
      <style>{`
        .preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
        
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        @keyframes bounce-once {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slide-up {
          from { 
            opacity: 0;
            transform: translateY(20px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slide-in-delayed {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.4; }
        }
        
        @keyframes pulse-subtle {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes gradient-shift {
          0% { transform: translateX(-100%) translateY(-100%); }
          100% { transform: translateX(100%) translateY(100%); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        .animate-bounce-once {
          animation: bounce-once 1s ease-out;
        }
        
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
        
        .animate-slide-up {
          animation: slide-up 0.6s ease-out forwards;
        }
        
        .animate-slide-in-delayed {
          animation: slide-in-delayed 0.6s ease-out forwards;
          opacity: 0;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }
        
        .animate-pulse-subtle {
          animation: pulse-subtle 2s ease-in-out infinite;
        }
        
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
        
        .animate-gradient-shift {
          animation: gradient-shift 3s ease-in-out infinite;
        }
        
        .duration-2000 {
          transition-duration: 2000ms;
        }
        
        /* Floating particles */
        .particle {
          position: absolute;
          width: 4px;
          height: 4px;
          background: rgba(6, 182, 212, 0.6);
          border-radius: 50%;
          animation: float 6s ease-in-out infinite;
        }
        
        .particle-1 {
          top: 20%;
          left: 20%;
          animation-delay: 0s;
        }
        
        .particle-2 {
          top: 60%;
          left: 80%;
          animation-delay: 2s;
        }
        
        .particle-3 {
          top: 80%;
          left: 10%;
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default InvestmentTimeline;