"use client";
import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
/* import Image from "next/image";
import vikas from "@/assests/testimonials/vikas-patel.webp";
import amit from "@/assests/testimonials/amit-khurana.webp";
import anjali from "@/assests/testimonials/anjali-mehta.webp";
import pooja from "@/assests/testimonials/pooja-shah.webp";
import vikram from "@/assests/testimonials/vikram-singh.webp";
import saransh from "@/assests/testimonials/saransh-pal.webp"; */

const testimonials = [
  {
    quote:
      "I had many questions before investing in Dholera, but the Dholera Insiders team made everything simple and clear. From site details to documentation, they handled it professionally. The process was smooth, and I feel confident about the long-term potential of my investment.",
    name: "Naman Gupta",
    location: "India",
    // avatar: naman,
  },
  {
    quote:
      "What I liked most about Dholera Insiders was their honest guidance. There was no pressure, just clear information and realistic expectations. The pricing was reasonable, the paperwork was transparent, and the overall experience was stress-free.",
    name: "Rakesh Verma",
    location: "India",
    // avatar: rakesh,
  },
  {
    quote:
      "Dholera Insiders helped me understand why Dholera Smart City is a long-term opportunity, not just a trend. Their team explained the development plans clearly and supported me until registration. I’m happy with my decision and would recommend them to serious investors.",
    name: "Harshit Sharma",
    location: "India",
    // avatar: harshit,
  },
  {
    quote:
      "As a first-time land investor, I was nervous, but Dholera Insiders made the journey easy. They were responsive, knowledgeable, and always available to clarify doubts. The project location and future growth prospects give me real confidence.",
    name: "Nitin",
    location: "India",
    // avatar: nitin,
  },
  {
    quote:
      "The team at Dholera Insiders stands out for their professionalism and market knowledge. They guided me in choosing the right plot based on my budget and goals. Everything was well-managed, and the investment already feels well-timed.",
    name: "Sapna Chaudhary",
    location: "India",
    // avatar: sapna,
  },
  {
    quote:
      "My experience with Dholera Insiders was very positive. They focus on facts, not hype, which I really appreciated. From the first discussion to final purchase, the process was smooth and well-organized. I see strong future value in Dholera Smart City.",
    name: "Ankit Kumar",
    location: "India",
    // avatar: ankit,
  },
];


const TestimonialPagination = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const [currentMobileIndex, setCurrentMobileIndex] = useState(0);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    return () => {
      window.removeEventListener("resize", checkIfMobile);
    };
  }, []);

  // Desktop pagination setup
  const testimonialsPerPage = 3;
  const totalPages = Math.ceil(testimonials.length / testimonialsPerPage);

  const indexOfLastTestimonial = currentPage * testimonialsPerPage;
  const indexOfFirstTestimonial = indexOfLastTestimonial - testimonialsPerPage;
  const currentTestimonials = testimonials.slice(
    indexOfFirstTestimonial,
    indexOfLastTestimonial
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Mobile slider navigation
  const prevMobileSlide = () => {
    setCurrentMobileIndex((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  const nextMobileSlide = () => {
    setCurrentMobileIndex((prev) =>
      prev === testimonials.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div className="bg-white py-8">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-3xl font-bold text-teal-700 mb-12">
          What Our Clients Say
        </h2>

        {/* Mobile Slider View */}
        {isMobile && (
          <div className="relative px-4">
            <motion.div
              key={`mobile-${currentMobileIndex}`}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center"
            >
              <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-sm">
                {/* Avatar */}
                {/* <div className="flex justify-center -mt-16 mb-4">
                  <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-teal-700">
                    <Image
                      src={testimonials[currentMobileIndex].avatar}
                      alt={testimonials[currentMobileIndex].name}
                    />
                  </div>
                </div> */}

                {/* Name and Location */}
                <div className="text-center mb-4">
                  <h3 className="text-xl font-bold text-gray-800">
                    {testimonials[currentMobileIndex].name}
                  </h3>
                  <p className="text-sm text-teal-700 font-medium">
                    {testimonials[currentMobileIndex].location}
                  </p>
                </div>

                <div className="px-6 pb-4 relative">
                    <p className="text-gray-600 italic text-center">
                      {testimonials[currentMobileIndex].quote}
                    </p>
                  </div>
              </div>

              {/* Navigation Buttons for Mobile */}
              <div className="flex justify-center space-x-4 mt-6">
                <Button
                  onClick={prevMobileSlide}
                  className="bg-teal-700 hover:bg-teal-700 text-white rounded-full p-2"
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>

                {/* Navigation Dots */}
                <div className="flex items-center space-x-2">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentMobileIndex(index)}
                      className={`w-3 h-3 rounded-full transition-colors ${currentMobileIndex === index ? "bg-teal-700" : "bg-gray-300"}`}
                    />
                  ))}
                </div>

                <Button
                  onClick={nextMobileSlide}
                  className="bg-teal-700 hover:bg-teal-700 text-white rounded-full p-2"
                >
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </div>
            </motion.div>
          </div>
        )}

        {/* Desktop Grid View */}
        {!isMobile && (
          <div className="relative">
            {/* Navigation Arrows */}
            <button
              onClick={prevPage}
              disabled={currentPage === 1}
              className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 p-2 rounded-full ${currentPage === 1 ? "text-gray-400 cursor-not-allowed" : "text-teal-700 hover:bg-teal-700 hover:text-white"}`}
            >
              <ChevronLeft className="h-8 w-8" />
            </button>

            <button
              onClick={nextPage}
              disabled={currentPage === totalPages}
              className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 p-2 rounded-full ${currentPage === totalPages ? "text-gray-400 cursor-not-allowed" : "text-teal-700 hover:bg-teal-700 hover:text-white"}`}
            >
              <ChevronRight className="h-8 w-8" />
            </button>

            {/* Testimonial Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
              {currentTestimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  {/* Avatar */}
                  {/* <div className="flex justify-center mt-4 mb-4">
                    <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-teal-700 shadow-md">
                      <Image
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        fill
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                  </div> */}

                  {/* Name and Location */}
                  <div className="text-center px-6">
                    <h3 className="text-xl font-bold text-gray-800">
                      {testimonial.name}
                    </h3>
                    <p className="text-sm text-teal-700 font-medium mb-4">
                      {testimonial.location}
                    </p>
                  </div>

                  {/* Quote */}
                  <div className="px-6 pb-4 relative">
                    <p className="text-gray-600 italic text-center">
                      {testimonial.quote}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Pagination Dots */}
            <div className="flex justify-center mt-8 space-x-2">
              {Array.from({ length: totalPages }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => paginate(index + 1)}
                  className={`w-3 h-3 rounded-full transition-colors ${currentPage === index + 1 ? "bg-teal-700" : "bg-gray-300"}`}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TestimonialPagination;
