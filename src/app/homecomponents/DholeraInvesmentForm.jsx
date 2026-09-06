"use client";

import CommonForm from "../components/CommonForm";

export default function DholeraInvestmentForm() {
  return (
    <main className="w-full overflow-x-hidden bg-[#F4F7FB]">
      <section
        className="
          relative
          w-full
          px-3
          pt-7
          pb-12
          sm:px-5
          sm:pt-8
          sm:pb-14
          md:px-6
          md:pt-9
          md:pb-16
          lg:px-8
          lg:pt-10
          lg:pb-20
        "
      >
        {/* Soft Background Accent */}
        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            left-1/2
            top-0
            h-[220px]
            w-[220px]
            -translate-x-1/2
            rounded-full
            bg-[#F6C343]/[0.05]
            blur-3xl
            sm:h-[300px]
            sm:w-[300px]
          "
        />

        <div
          className="
            relative
            z-10
            mx-auto
            w-full
            max-w-5xl
          "
        >
          {/* Page Heading */}
          <div
            className="
              mx-auto
              mb-5
              max-w-2xl
              text-center
              sm:mb-6
            "
          >
          
          </div>

          {/* Form */}
          <div
            className="
              w-full
              overflow-hidden
              rounded-2xl
              border
              border-[#051A3A]/10
              bg-[#051A3A]
              shadow-[0_12px_32px_rgba(5,26,58,0.10)]
              sm:rounded-3xl
            "
          >
            <CommonForm />
          </div>
        </div>
      </section>
    </main>
  );
}