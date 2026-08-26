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
      "Buying property from abroad felt challenging at first, but Dholera Insider made the process simple and clear. Their team was transparent, responsive, and guided me at every step.",
    name: "Rajesh Patel",
    location: "USA",
    designation: "IT Consultant",
  },
  {
    quote:
      "I appreciated the clear communication and verified project details. Everything was explained honestly, which gave me more confidence in my Dholera investment.",
    name: "Mehul Shah",
    location: "Canada",
    designation: "Business Owner",
  },
  {
    quote:
      "The remote buying experience was smooth and professional. From documentation to booking, Dholera Insider handled everything with proper follow-up.",
    name: "Priya Desai",
    location: "Australia",
    designation: "Finance Professional",
  },
  {
    quote:
      "As an NRI, trust was my biggest concern. Dholera Insider answered my questions patiently and helped me understand the right residential plot option.",
    name: "Amit Mehta",
    location: "UAE",
    designation: "Senior Engineer",
  },
  {
    quote:
      "Their guidance and transparent approach made investing in Dholera easier than I expected. I would recommend them to NRIs who want clear information before investing.",
    name: "Neha Joshi",
    location: "United Kingdom",
    designation: "Healthcare Professional",
  },
  {
    quote:
      "The team was knowledgeable, supportive, and always available whenever I needed help. The complete experience, from enquiry to booking, felt seamless.",
    name: "Kunal Bhatt",
    location: "Singapore",
    designation: "Real Estate Investor",
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
    <div className="overflow-x-clip bg-[#FDFCFA] py-[clamp(3.5rem,6vw,5rem)]">
      <div className="container mx-auto px-4">
        <div className="mb-10 text-center md:mb-12">
          <p className="mb-3 text-xs font-bold uppercase tracking-widest text-[#F6C343]">
            Testimonials
          </p>
          <h2 className="mb-4 text-[clamp(1.5rem,3vw,2.5rem)] font-bold leading-[clamp(2rem,4vw,3.5rem)] text-[#051A3A]">
            What Our NRI Investors Say
          </h2>
          <p className="mx-auto max-w-2xl text-sm leading-relaxed text-[#2B364D] sm:text-base">
            Read how overseas Indian investors made informed property decisions
            with Dholera Insider.
          </p>
        </div>

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
              <div className="w-full max-w-sm rounded-xl border border-[#2B364D]/10 bg-[#FDFCFA] p-6 shadow-lg">
                {/* Avatar */}
                {/* <div className="flex justify-center -mt-16 mb-4">
                  <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-[#F6C343]">
                    <Image
                      src={testimonials[currentMobileIndex].avatar}
                      alt={testimonials[currentMobileIndex].name}
                    />
                  </div>
                </div> */}

                {/* Name and Location */}
                <div className="text-center mb-4">
                  <h3 className="text-xl font-bold text-[#051A3A]">
                    {testimonials[currentMobileIndex].name}
                  </h3>
                  <p className="text-sm font-medium text-[#F6C343]">
                    {testimonials[currentMobileIndex].location}
                  </p>
                </div>

                <div className="px-6 pb-4 relative">
                    <p className="text-center italic text-[#162033]">
                      {testimonials[currentMobileIndex].quote}
                    </p>
                  </div>
              </div>

              {/* Navigation Buttons for Mobile */}
              <div className="flex justify-center space-x-4 mt-6">
                <Button
                  onClick={prevMobileSlide}
                  className="rounded-full bg-[#051A3A] p-2 text-[#FDFCFA] hover:bg-[#2B364D]"
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>

                {/* Navigation Dots */}
                <div className="flex items-center space-x-2">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentMobileIndex(index)}
                      className={`h-3 w-3 rounded-full transition-colors ${currentMobileIndex === index ? "bg-[#F6C343]" : "bg-[#2B364D]/25"}`}
                    />
                  ))}
                </div>

                <Button
                  onClick={nextMobileSlide}
                  className="rounded-full bg-[#051A3A] p-2 text-[#FDFCFA] hover:bg-[#2B364D]"
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
              className={`absolute left-0 top-1/2 z-10 -translate-y-1/2 rounded-full p-2 ${currentPage === 1 ? "cursor-not-allowed text-[#6C7484]" : "text-[#051A3A] hover:bg-[#051A3A] hover:text-[#FDFCFA]"}`}
            >
              <ChevronLeft className="h-8 w-8" />
            </button>

            <button
              onClick={nextPage}
              disabled={currentPage === totalPages}
              className={`absolute right-0 top-1/2 z-10 -translate-y-1/2 rounded-full p-2 ${currentPage === totalPages ? "cursor-not-allowed text-[#6C7484]" : "text-[#051A3A] hover:bg-[#051A3A] hover:text-[#FDFCFA]"}`}
            >
              <ChevronRight className="h-8 w-8" />
            </button>

            {/* Testimonial Cards */}
            <div className="grid grid-cols-1 gap-6 px-12 md:grid-cols-3">
              {currentTestimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="overflow-hidden py-6 rounded-xl border border-[#2B364D]/10 bg-[#FDFCFA] shadow-lg transition-shadow duration-300 hover:shadow-xl"
                >
                  {/* Avatar */}
                  {/* <div className="flex justify-center mt-4 mb-4">
                    <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-[#F6C343] shadow-md">
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
                    <h3 className="text-xl font-bold text-[#051A3A]">
                      {testimonial.name}
                    </h3>
                    <p className="mb-4 text-sm font-medium text-[#F6C343]">
                      {testimonial.location}
                    </p>
                  </div>

                  {/* Quote */}
                  <div className="px-6 pb-4 relative">
                    <p className="text-center italic text-[#162033]">
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
                  className={`h-3 w-3 rounded-full transition-colors ${currentPage === index + 1 ? "bg-[#F6C343]" : "bg-[#2B364D]/25"}`}
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
