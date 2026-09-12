// "use client";

// import { useEffect, useState } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { CheckCircle } from "lucide-react";
// import heroPoster from "@/app/assets/hero/idHero.webp";
// import HeroLeadForm from "../homecomponents/HeroLeadForm";

// const trustPoints = [
//   "Verified Residential Projects",
//   "Registry Ready Plots",
//   "Trusted NRI Guidance",
// ];

// const Hero = () => {
//   const [shouldLoadVideo, setShouldLoadVideo] = useState(false);

//   useEffect(() => {
//     let timeoutId;
//     let idleId;

//     const loadVideo = () => setShouldLoadVideo(true);

//     const scheduleVideoLoad = () => {
//       if ("requestIdleCallback" in window) {
//         idleId = window.requestIdleCallback(loadVideo, { timeout: 2500 });
//       } else {
//         timeoutId = window.setTimeout(loadVideo, 2500);
//       }
//     };

//     if (document.readyState === "complete") {
//       scheduleVideoLoad();
//     } else {
//       window.addEventListener("load", scheduleVideoLoad, { once: true });
//     }

//     return () => {
//       window.removeEventListener("load", scheduleVideoLoad);
//       if (timeoutId) window.clearTimeout(timeoutId);
//       if (idleId && "cancelIdleCallback" in window) {
//         window.cancelIdleCallback(idleId);
//       }
//     };
//   }, []);

//   return (
//     <section className="relative min-h-screen w-full overflow-hidden ">
//       <div className="absolute inset-0">
//         <Image
//           src={heroPoster}
//           alt="Dholera residential plot projects for NRI investors"
//           fill
//           priority
//           fetchPriority="high"
//           placeholder="blur"
//           sizes="100vw"
//           className="absolute inset-0 z-0 h-full w-full object-cover"
//         />

//         {shouldLoadVideo && (
//           <video
//             autoPlay
//             muted
//             loop
//             playsInline
//             preload="none"
//             className="absolute inset-0 z-0 h-full w-full object-cover"
//           >
//             <source src="/video/video2.mp4" type="video/mp4" />
//           </video>
//         )}
//       </div>

//       <div className="absolute inset-0 bg-black/40"></div>

//       <div className="relative max-w-7xl mx-auto z-10 flex min-h-screen items-center">
//         <div className="container mx-auto px-4 py-28 sm:px-6 lg:px-8">
//           <div
//             className="
//               grid
//               items-start
//               gap-8
//               lg:grid-cols-[minmax(0,1fr)_minmax(22rem,26rem)]
//               lg:gap-12
//             "
//           >
//             {/* Left Content */}
//             <div className="w-full min-w-0 max-w-3xl">
//               {/* Heading */}
//               <h1
//                 className="
//                   mb-4
//                   max-w-2xl
//                   text-[clamp(2.45rem,3vw,3rem)]
//                   font-bold
//                   leading-[1.12]
//                   tracking-tight
//                   text-[#FDFCFA]
//                   sm:mb-5
//                 "
//               >
//                 Decoding Dholera for NRIs
//               </h1>

//               {/* Description */}
//               <p
//                 className="
//                   mb-5
//                   hidden
//                   max-w-2xl
//                   text-[clamp(1rem,1.25vw,1.125rem)]
//                   leading-[1.7]
//                   text-white
//                   md:block
//                   lg:mb-6
//                 "
//               >
//                 Dholera Insider helps NRIs explore verified residential plots in
//                 Dholera Smart City with transparent information, legal clarity,
//                 and a smooth remote buying experience.
//               </p>

//               {/* Trust Points */}
//               <div>
//                 <ul className="space-y-2.5 sm:space-y-3">
//                   {trustPoints.map((point) => (
//                     <li
//                       key={point}
//                       className="
//                         flex
//                         items-start
//                         gap-3
//                         text-[0.95rem]
//                         font-medium
//                         leading-6
//                         text-white
//                         max-sm:font-semibold
//                         sm:text-base
//                       "
//                     >
//                       <CheckCircle
//                         className="
//                           mt-0.5
//                           h-5
//                           w-5
//                           flex-shrink-0
//                           text-white
//                         "
//                       />

//                       <span className="min-w-0">{point}</span>
//                     </li>
//                   ))}
//                 </ul>

//                 {/* CTA */}
//                 <div className="mt-5 hidden md:flex lg:mt-6">
//                   <a
//                     href="https://wa.me/919211820887?text=Hello%2C%20I%20am%20interested%20in%20buying%20a%20plot%20in%20Dholera.%20Please%20share%20the%20details."
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="
//                       inline-flex
//                       min-h-12
//                       items-center
//                       justify-center
//                       rounded-lg
//                       bg-[#F6C343]
//                       px-6
//                       py-3
//                       text-base
//                       font-bold
//                       text-[#051A3A]
//                       shadow-lg
//                       transition-colors
//                       duration-200
//                       hover:bg-[#FDFCFA]
//                       focus-visible:outline-none
//                       focus-visible:ring-2
//                       focus-visible:ring-[#F6C343]
//                       focus-visible:ring-offset-2
//                     "
//                   >
//                     Get Free Consultation
//                   </a>
//                 </div>
//               </div>
//             </div>

//             {/* Hero Lead Form */}
//             <div
//               className="
//                 hidden
//                 w-full
//                 min-w-0
//                 max-w-[26rem]
//                 self-start
//                 justify-self-end
//                 lg:block
//               "
//             >
//               <HeroLeadForm />
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Hero;

"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { CheckCircle } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

import heroPoster from "@/app/assets/hero/idHero.webp";
import HeroLeadForm from "../homecomponents/HeroLeadForm";

const trustPoints = [
  "Verified Residential Projects",
  "Registry Ready Plots",
  "Trusted NRI Guidance",
];

const Hero = () => {
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);

  useEffect(() => {
    let timeoutId;
    let idleId;

    const loadVideo = () => setShouldLoadVideo(true);

    const scheduleVideoLoad = () => {
      if ("requestIdleCallback" in window) {
        idleId = window.requestIdleCallback(loadVideo, {
          timeout: 2500,
        });
      } else {
        timeoutId = window.setTimeout(loadVideo, 2500);
      }
    };

    if (document.readyState === "complete") {
      scheduleVideoLoad();
    } else {
      window.addEventListener("load", scheduleVideoLoad, {
        once: true,
      });
    }

    return () => {
      window.removeEventListener("load", scheduleVideoLoad);

      if (timeoutId) {
        window.clearTimeout(timeoutId);
      }

      if (idleId && "cancelIdleCallback" in window) {
        window.cancelIdleCallback(idleId);
      }
    };
  }, []);

  return (
    <section
      className="
        relative
        h-[100svh]
        min-h-[100svh]
        w-full
        overflow-hidden
        md:h-auto
        md:min-h-screen
      "
    >
      {/* ========================================
          BACKGROUND IMAGE + VIDEO
      ======================================== */}
      <div
        className="
          absolute
          inset-0
          h-[100svh]
          w-full
          overflow-hidden
          md:h-full
        "
      >
        {/* Background Poster */}
        <Image
          src={heroPoster}
          alt="Dholera residential plot projects for NRI investors"
          fill
          priority
          fetchPriority="high"
          placeholder="blur"
          sizes="100vw"
          className="
            absolute
            inset-0
            z-0
            h-full
            w-full
            object-cover
          "
        />

        {/* Background Video */}
        {shouldLoadVideo && (
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="none"
            className="
              absolute
              inset-0
              z-0
              h-full
              w-full
              object-cover
            "
          >
            <source src="/video/video2.mp4" type="video/mp4" />
          </video>
        )}
      </div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 z-[1] bg-black/40" />

      {/* ========================================
          HERO CONTENT
      ======================================== */}
      <div
        className="
          relative
          z-10
          mx-auto
          flex
          h-[100svh]
          max-w-7xl
          items-center
          md:h-auto
          md:min-h-screen
        "
      >
        <div
          className="
            container
            mx-auto
            px-4
            py-16
            sm:px-6
            md:py-24
            lg:px-8
            lg:py-28
          "
        >
          <div
            className="
              grid
              items-start
              gap-8
              lg:grid-cols-[minmax(0,1fr)_minmax(22rem,26rem)]
              lg:gap-12
            "
          >
            {/* ========================================
                LEFT CONTENT
            ======================================== */}
            <div className="w-full min-w-0 max-w-3xl">
              {/* Heading */}
              <h1
                className="
                  mb-4
                  max-w-2xl
                  text-[clamp(2.2rem,10vw,3rem)]
                  font-bold
                  leading-[1.1]
                  tracking-tight
                  text-[#FDFCFA]
                  sm:mb-5
                  sm:text-[clamp(2.45rem,6vw,3rem)]
                  lg:text-[clamp(2.45rem,3vw,3rem)]
                "
              >
                Decoding Dholera for NRIs
              </h1>

              {/* Description */}
              <p
                className="
                  mb-5
                  hidden
                  max-w-2xl
                  text-[clamp(1rem,1.25vw,1.125rem)]
                  leading-[1.7]
                  text-white
                  md:block
                  lg:mb-6
                "
              >
                Dholera Insider helps NRIs explore verified residential plots in
                Dholera Smart City with transparent information, legal clarity,
                and a smooth remote buying experience.
              </p>

              {/* Trust Points */}
              <div>
                <ul className="space-y-2.5 sm:space-y-3">
                  {trustPoints.map((point) => (
                    <li
                      key={point}
                      className="
                        flex
                        items-start
                        gap-3
                        text-[0.95rem]
                        font-medium
                        leading-6
                        text-white
                        max-sm:font-semibold
                        sm:text-base
                      "
                    >
                      <CheckCircle
                        className="
                          mt-0.5
                          h-5
                          w-5
                          flex-shrink-0
                          text-white
                        "
                      />

                      <span className="min-w-0">{point}</span>
                    </li>
                  ))}
                </ul>

                {/* ========================================
                    CTA
                    VISIBLE ON PHONE + TABLET + DESKTOP
                ======================================== */}
                <div className="mt-6 flex lg:mt-7">
                  <a
                    href="https://wa.me/919211820887?text=Hello%2C%20I%20am%20interested%20in%20buying%20a%20plot%20in%20Dholera.%20Please%20share%20the%20details."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      inline-flex
                      min-h-12
                      w-auto
                      items-center
                      justify-center
                      rounded-lg
                      bg-[#F6C343]
                      px-5
                      py-3
                      text-[0.95rem]
                      font-bold
                      text-[#051A3A]
                      shadow-lg
                      transition-all
                      duration-200
                      hover:bg-[#FDFCFA]
                      focus-visible:outline-none
                      focus-visible:ring-2
                      focus-visible:ring-[#F6C343]
                      focus-visible:ring-offset-2
                      sm:px-6
                      sm:text-base
                    "
                  >
                    {/* <FaWhatsapp
                      className="mr-2 h-5 w-5 flex-shrink-0"
                      aria-hidden="true"
                    /> */}

                    <FaWhatsapp
                      className="mr-2 h-5 w-5 flex-shrink-0 text-[#25D366]"
                      aria-hidden="true"
                    />

                    <span>Get Free Consultation</span>
                  </a>
                </div>
              </div>
            </div>

            {/* ========================================
                HERO LEAD FORM
                DESKTOP ONLY
            ======================================== */}
            <div
              className="
                hidden
                w-full
                min-w-0
                max-w-[26rem]
                self-start
                justify-self-end
                lg:block
              "
            >
              <HeroLeadForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;