"use client";

import { useState } from "react";
import Image from "next/image";
import bg from "@/app/assets/home/pexels2.jpg";
import ContactForm from "@/app/components/Contactform";

export default function CTAsection() {
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);

  return (
    <>
      <section className="relative overflow-hidden bg-[#051A3A] px-4 py-[clamp(3.5rem,6vw,5rem)] sm:px-6 lg:px-8">
        <Image
          src={bg}
          alt="Dholera Smart City investment consultation"
          fill
          className="object-cover opacity-20"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[#051A3A]/80" />

        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <h2 className="mb-4 text-[clamp(1.75rem,4vw,3rem)] font-bold leading-tight text-white">
            Ready to Invest in Dholera?
          </h2>
          <p className="mx-auto mb-10 max-w-2xl text-base leading-relaxed text-white/85">
            Explore verified residential plot opportunities with dedicated support
            designed for NRIs.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="https://wa.me/919211820887?text=Hello%2C%20I%20am%20interested%20in%20buying%20a%20plot%20in%20Dholera.%20Please%20share%20the%20details."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 w-full items-center justify-center rounded-lg bg-[#F6C343] px-7 py-3 text-base font-bold text-[#051A3A] transition-colors hover:bg-white sm:w-auto"
            >
              Get Project Details
            </a>
            <button
              type="button"
              onClick={() => setIsContactFormOpen(true)}
              aria-haspopup="dialog"
              className="inline-flex min-h-12 w-full items-center justify-center rounded-lg border border-white/60 bg-white/10 px-7 py-3 text-base font-bold text-white transition-colors hover:bg-white hover:text-[#051A3A] sm:w-auto"
            >
              Book Free Consultation
            </button>
          </div>
        </div>
      </section>

      {isContactFormOpen && (
        <ContactForm
          onClose={() => setIsContactFormOpen(false)}
          title="Talk to a Dholera Expert"
        />
      )}
    </>
  );
}
