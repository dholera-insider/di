import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function TestimonialsSection() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [direction, setDirection] = useState('right');

  const testimonials = [
    {
      name: "Kunal Kumar",
      location: "Noida, Uttar Pradesh",
      text: "I had been exploring investment opportunities around Dholera, and I'm glad I came across the team behind WestWyn County. They guided me with full clarity, from plot selection to legal documentation. What I liked most was how transparent and patient they were. WestWyn County feels like a smart, future-ready project, and I'm proud to be a part of it."
    },
    {
      name: "Gaurav Parmar",
      location: "Surat, Gujarat",
      text: "The team helped me understand everything about the Dholera region, future development, government approvals, town planning, everything. WestWyn County stood out because of its layout and the long-term appreciation potential. Their process was smooth and professional. I felt safe investing here."
    },
    {
      name: "Jaspreet Singh",
      location: "Ludhiana, Punjab",
      text: "I was looking for a clear-title plot with proper TP approval and genuine developer support. The team behind WestWyn County made it simple. From explaining the location benefits to arranging a site visit, they handled it all. The pricing was great too. I'm already planning to invest in a second plot!"
    },
    {
      name: "Satendra Dahiya",
      location: "Gurugram, Haryana",
      text: "What impressed me the most was how they explained every detail without any pressure to buy. I felt like I was working with experts, not salespeople. WestWyn County was well-planned, close to the activation zone, and still in my budget. I'm confident this will be a profitable long-term investment."
    },
    {
      name: "Alpa Batra",
      location: "Mumbai, Maharashtra",
      text: "I had looked at multiple projects before, but none matched the kind of service and clarity I got here. They answered all my questions, arranged the paperwork, and made the entire process smooth. WestWyn County gives me the peace of mind that my investment is secure and growing."
    }
  ];

  const nextTestimonial = () => {
    setDirection('right');
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setDirection('left');
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToTestimonial = (index) => {
    setDirection(index > currentTestimonial ? 'right' : 'left');
    setCurrentTestimonial(index);
  };

  return (
    <div className='bg-gradient-to-br from-gray-900 via-slate-800 to-teal-900 min-h-screen'>
      {/* Testimonials Section */}
      <div className="pt-16 max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl max-sm:text-3xl font-bold text-white mb-4">
            What Our <span className="text-teal-400">Clients Say</span>
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-teal-400 to-teal-600 mx-auto rounded-full"></div>
        </div>
        
        <div className="bg-gradient-to-br from-gray-800/40 to-teal-900/20 rounded-3xl p-8 backdrop-blur-sm border border-teal-500/20 shadow-2xl">
          {/* Main Testimonial Card */}
          <div className="relative h-96 overflow-hidden">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-all duration-500 ease-in-out ${
                  index === currentTestimonial
                    ? 'opacity-100 translate-x-0'
                    : direction === 'right'
                      ? index < currentTestimonial
                        ? '-translate-x-full opacity-0'
                        : 'translate-x-full opacity-0'
                      : index > currentTestimonial
                        ? 'translate-x-full opacity-0'
                        : '-translate-x-full opacity-0'
                }`}
              >
                <div className="bg-gradient-to-br from-gray-700/30 to-teal-800/20 p-8 rounded-2xl border border-teal-500/10 h-full">
                  <div className="text-center h-full flex flex-col justify-center">
                    <div className="text-6xl text-teal-400 mb-4">"</div>
                    <p className="text-gray-300 text-lg leading-relaxed italic mb-6">
                      {testimonial.text}
                    </p>
                    <div className="text-center">
                      <h4 className="text-xl font-bold text-teal-400">
                        {testimonial.name}
                      </h4>
                      <p className="text-gray-400">
                        {testimonial.location}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Controls */}
          <div className="flex justify-center items-center space-x-4 mt-8">
            <button
              onClick={prevTestimonial}
              className="bg-gradient-to-r from-teal-400 to-teal-600 hover:from-teal-500 hover:to-teal-700 p-3 rounded-full text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={20} />
            </button>
            
            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentTestimonial
                      ? 'bg-gradient-to-r from-teal-400 to-teal-600 scale-125'
                      : 'bg-gray-600 hover:bg-gray-500'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            
            <button
              onClick={nextTestimonial}
              className="bg-gradient-to-r from-teal-400 to-teal-600 hover:from-teal-500 hover:to-teal-700 p-3 rounded-full text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              aria-label="Next testimonial"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}