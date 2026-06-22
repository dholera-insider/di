"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { AnimatePresence, motion } from "framer-motion";
import bg from "@/app/assets/home/pexels2.jpg";
import Image from "next/image";
import Link from "next/link";

const CommonForm = dynamic(() => import("./CommonForm"), {
  ssr: false,
  loading: () => <div className="min-h-[24rem]" />,
});

export default function CTAsection() {
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);

  const openContactForm = () => {
    setIsContactFormOpen(true);
  };

  const closeContactForm = () => {
    setIsContactFormOpen(false);
  };

  return (
    <>
      <div className="relative overflow-hidden bg-[#051A3A] px-4 py-16">
        <Image
          src={bg}
          alt="Background Image"
          fill
          className="absolute inset-0 -z-10 object-cover opacity-30"
          sizes="100vw"
        />
        <div className="pointer-events-none absolute inset-0 bg-[#051A3A]/85"></div>

        <div className="relative z-10 mx-auto max-w-6xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <h2 className="mb-4 text-xl font-bold text-white drop-shadow-lg md:text-4xl">
              Talk To Our Dholera Expert
            </h2>
            <div className="mx-auto h-1 w-24 rounded-full bg-[#F6C343]"></div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12 text-sm leading-relaxed text-[#FDFCFA]/80"
          >
            Have questions about Dholera investments? Our team is here to guide
            you every step of the way.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="mb-8 flex flex-col items-center justify-center gap-6 md:flex-row"
          >
            <Link
              href="tel:+919211820887"
              className="group relative min-w-[200px] rounded-xl border border-[#F6C343]/40 bg-[#FDFCFA] px-8 py-4 text-lg font-semibold text-[#051A3A] shadow-lg transition-all duration-300 hover:bg-[#F6C343] hover:shadow-xl"
            >
              <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-white/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
              <span className="relative z-10 flex items-center justify-center gap-2">
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                Call Now
              </span>
            </Link>

            <Link
              href="https://wa.me/919211820887"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative min-w-[200px]  rounded-xl border border-[#F6C343]/40 bg-[#2B364D] px-8 py-4 text-lg font-semibold text-[#FDFCFA] shadow-lg transition-all duration-300 hover:bg-[#F6C343] hover:text-[#051A3A] hover:shadow-xl"
            >
              <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-white/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
              <span className="relative z-10 flex items-center justify-center gap-2">
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.63z" />
                </svg>
                WhatsApp Now
              </span>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <motion.button
              type="button"
              onClick={openContactForm}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="group relative min-w-[250px] rounded-xl border-2 border-[#F6C343] bg-[#F6C343] px-10 py-4 text-lg font-semibold text-[#051A3A] shadow-lg transition-all duration-300 hover:bg-[#FDFCFA] hover:shadow-xl"
            >
              <span className="absolute inset-0 rounded-xl bg-[#FDFCFA]/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
              <span className="relative z-10 flex items-center justify-center gap-2">
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                    clipRule="evenodd"
                  />
                </svg>
                Get A Call Back
              </span>
            </motion.button>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-8 text-sm text-[#faf8f3]"
          >
            Our investment advisors are available 24/7 to help you make the
            right choice
          </motion.p>
        </div>
      </div>

      <AnimatePresence>
        {isContactFormOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeContactForm}
          >
            <motion.div
              className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-[#F6C343]/30 bg-[#051A3A] shadow-2xl"
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <button
                  type="button"
                  onClick={closeContactForm}
                  className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-[#2B364D] text-[#FDFCFA] backdrop-blur-sm transition-colors duration-200 hover:bg-[#F6C343] hover:text-[#051A3A]"
                >
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>

                <div className="p-6">
                  <div className="mb-6 text-center">
                    <h3 className="mb-2 text-2xl font-bold text-white">
                      Get A Call Back
                    </h3>
                    <div className="mx-auto h-1 w-16 rounded-full bg-[#F6C343]"></div>
                  </div>
                  <CommonForm
                    title="Buy Residential Plots in Dholera"
                    buttonName="Talk To DI Investment Advisor"
                    onClose={closeContactForm}
                    id="faq-form"
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
