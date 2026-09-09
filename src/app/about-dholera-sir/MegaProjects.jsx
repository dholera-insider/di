// "use client";

// import React, {
//   useCallback,
//   useEffect,
//   useRef,
//   useState,
// } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import {
//   ArrowUpRight,
//   ChevronLeft,
//   ChevronRight,
// } from "lucide-react";


// const megaProjects = [
//   {
//     image: "/images/mega-projects/abcd-building.webp",
//     title: "ABCD Building",
//     description:
//       "Administrative & Business Centre, Dholera - Single-window system for investors",
//     href: "/about-dholera-sir/abcd-building-dholera-sir",
//   },
//   {
//     image: "/images/mega-projects/tata-semiconductor.webp",
//     title: "TATA Electronics Semiconductor Fab",
//     description:
//       "India's first semiconductor manufacturing project",
//     href: "/about-dholera-sir/tata-semiconductor-plant-in-dholera",
//   },
//   {
//     image: "/images/mega-projects/dholera-airport.webp",
//     title: "Dholera International Airport",
//     description:
//       "Global trade, cargo movement, and international travel",
//     href: "/about-dholera-sir/dholera-international-airport-project-update-2025",
//   },
//   {
//     image: "/images/mega-projects/dholera-expressway.webp",
//     title: "Ahmedabad–Dholera Expressway",
//     description:
//       "High-speed corridor cutting travel time to one hour",
//     href: "/about-dholera-sir/ahmedabad-dholera-expressway-transforming-gujarat-connectivity",
//   },
//   {
//     image: "/images/mega-projects/dholera-railway.webp",
//     title: "High-Speed Monorail & Railway",
//     description:
//       "Links with Ahmedabad and major industrial hubs",
//     href: "/dholera-sir-blogs/how-connectivity-is-shaping-dholera-growth",
//   },
//   {
//     image: "/images/mega-projects/dholera-solar-park.webp",
//     title: "Dholera Solar Park",
//     description:
//       "One of India's largest renewable energy projects",
//     href: "/about-dholera-sir/renewable-energy-solar-park-in-dholera",
//   },
//   {
//     image: "/images/mega-projects/water-treatment.webp",
//     title: "Water Treatment Plant",
//     description:
//       "Reliable long-term water supply for industries and residents",
//     href: "/dholera-sir-blogs/dholera-smart-city-water-scarcity-solutions",
//   },
//   {
//     image: "/images/mega-projects/renew-power.webp",
//     title: "ReNew Power & Activation Area",
//     description:
//       "₹2,000 crore solar plant + ready infrastructure hub",
//     href: "/about-dholera-sir/renewable-energy-solar-park-in-dholera",
//   },
//   {
//     image: "/images/mega-projects/dholera-sea-port.webp",
//     title: "Dholera Sea Port",
//     description:
//       "A planned greenfield port in the Gulf of Khambhat to support Dholera Connectivity.",
//     href: "/dholera-sir-blogs/dholera-sea-port-connectivity-growth",
//   },
// ];

// const PROJECT_COUNT = megaProjects.length;

// const loopedProjects = [
//   ...megaProjects,
//   ...megaProjects,
//   ...megaProjects,
// ];

// const INITIAL_INDEX = 2;
// const AUTOPLAY_DELAY = 4200;
// const RESUME_DELAY = 2400;
// const SCROLL_END_DELAY = 120;

// export default function MegaProjectsSlider() {
//   const viewportRef = useRef(null);

//   const scrollEndTimerRef = useRef(null);
//   const resumeTimerRef = useRef(null);
//   const scrollRafRef = useRef(null);
//   const resizeRafRef = useRef(null);

//   const activeIndexRef = useRef(INITIAL_INDEX);

//   const dragRef = useRef({
//     active: false,
//     startX: 0,
//     scrollLeft: 0,
//     moved: false,
//   });

//   const [activeIndex, setActiveIndex] =
//     useState(INITIAL_INDEX);

//   const [isReady, setIsReady] =
//     useState(false);

//   const [isDragging, setIsDragging] =
//     useState(false);

//   const [isPaused, setIsPaused] =
//     useState(false);

//   const [isHovered, setIsHovered] =
//     useState(false);

//   const [reducedMotion, setReducedMotion] =
//     useState(false);

//   /* ----------------------------------------
//      Update active project
//   ----------------------------------------- */

//   const updateActiveIndex = useCallback(
//     (index) => {
//       const normalized =
//         ((index % PROJECT_COUNT) +
//           PROJECT_COUNT) %
//         PROJECT_COUNT;

//       activeIndexRef.current = normalized;
//       setActiveIndex(normalized);
//     },
//     []
//   );

//   /* ----------------------------------------
//      Slides
//   ----------------------------------------- */

//   const getSlides = useCallback(() => {
//     const viewport = viewportRef.current;

//     if (!viewport) return [];

//     return Array.from(
//       viewport.querySelectorAll(
//         "[data-mega-project-slide]"
//       )
//     );
//   }, []);

//   /* ----------------------------------------
//      Scroll selected slide to center
//   ----------------------------------------- */

//   const scrollToAbsoluteIndex = useCallback(
//     (index, smooth = true) => {
//       const viewport = viewportRef.current;

//       if (!viewport) return;

//       const slides = getSlides();
//       const slide = slides[index];

//       if (!slide) return;

//       const slideCenter =
//         slide.offsetLeft +
//         slide.offsetWidth / 2;

//       const viewportCenter =
//         viewport.clientWidth / 2;

//       const target =
//         slideCenter - viewportCenter;

//       viewport.scrollTo({
//         left: target,
//         behavior:
//           smooth && !reducedMotion
//             ? "smooth"
//             : "auto",
//       });
//     },
//     [getSlides, reducedMotion]
//   );

//   /* ----------------------------------------
//      Find slide closest to center
//   ----------------------------------------- */

//   const getNearestAbsoluteIndex =
//     useCallback(() => {
//       const viewport = viewportRef.current;

//       if (!viewport) {
//         return PROJECT_COUNT + INITIAL_INDEX;
//       }

//       const slides = getSlides();

//       if (!slides.length) {
//         return PROJECT_COUNT + INITIAL_INDEX;
//       }

//       const viewportRect =
//         viewport.getBoundingClientRect();

//       const viewportCenter =
//         viewportRect.left +
//         viewportRect.width / 2;

//       let closestIndex = 0;
//       let closestDistance = Infinity;

//       slides.forEach((slide, index) => {
//         const rect =
//           slide.getBoundingClientRect();

//         const center =
//           rect.left + rect.width / 2;

//         const distance = Math.abs(
//           center - viewportCenter
//         );

//         if (distance < closestDistance) {
//           closestDistance = distance;
//           closestIndex = index;
//         }
//       });

//       return closestIndex;
//     }, [getSlides]);

//   /* ----------------------------------------
//      Infinite loop correction
//   ----------------------------------------- */

//   const normalizeLoopPosition = useCallback(
//     (absoluteIndex) => {
//       const realIndex =
//         ((absoluteIndex % PROJECT_COUNT) +
//           PROJECT_COUNT) %
//         PROJECT_COUNT;

//       const middleIndex =
//         PROJECT_COUNT + realIndex;

//       const outsideMiddleCopy =
//         absoluteIndex < PROJECT_COUNT ||
//         absoluteIndex >=
//           PROJECT_COUNT * 2;

//       if (outsideMiddleCopy) {
//         scrollToAbsoluteIndex(
//           middleIndex,
//           false
//         );

//         return middleIndex;
//       }

//       return absoluteIndex;
//     },
//     [scrollToAbsoluteIndex]
//   );

//   /* ----------------------------------------
//      Complete scrolling
//   ----------------------------------------- */

//   const finalizeScroll = useCallback(() => {
//     let absoluteIndex =
//       getNearestAbsoluteIndex();

//     const realIndex =
//       ((absoluteIndex % PROJECT_COUNT) +
//         PROJECT_COUNT) %
//       PROJECT_COUNT;

//     updateActiveIndex(realIndex);

//     absoluteIndex =
//       normalizeLoopPosition(
//         absoluteIndex
//       );

//     updateActiveIndex(
//       absoluteIndex % PROJECT_COUNT
//     );
//   }, [
//     getNearestAbsoluteIndex,
//     normalizeLoopPosition,
//     updateActiveIndex,
//   ]);

//   /* ----------------------------------------
//      Pause autoplay
//   ----------------------------------------- */

//   const pauseAutoplay = useCallback(
//     (delay = RESUME_DELAY) => {
//       window.clearTimeout(
//         resumeTimerRef.current
//       );

//       setIsPaused(true);

//       if (delay === null) return;

//       resumeTimerRef.current =
//         window.setTimeout(() => {
//           setIsPaused(false);
//         }, delay);
//     },
//     []
//   );

//   /* ----------------------------------------
//      Next / previous
//   ----------------------------------------- */

//   const moveCarousel = useCallback(
//     (direction) => {
//       let current =
//         getNearestAbsoluteIndex();

//       current =
//         normalizeLoopPosition(current);

//       scrollToAbsoluteIndex(
//         current + direction,
//         true
//       );
//     },
//     [
//       getNearestAbsoluteIndex,
//       normalizeLoopPosition,
//       scrollToAbsoluteIndex,
//     ]
//   );

//   const handlePrevious = useCallback(() => {
//     pauseAutoplay();
//     moveCarousel(-1);
//   }, [moveCarousel, pauseAutoplay]);

//   const handleNext = useCallback(() => {
//     pauseAutoplay();
//     moveCarousel(1);
//   }, [moveCarousel, pauseAutoplay]);

//   /* ----------------------------------------
//      Pagination
//   ----------------------------------------- */

//   const goToProject = useCallback(
//     (index) => {
//       pauseAutoplay();

//       const current =
//         getNearestAbsoluteIndex();

//       const targets = [
//         index,
//         PROJECT_COUNT + index,
//         PROJECT_COUNT * 2 + index,
//       ];

//       const nearestTarget =
//         targets.reduce(
//           (closest, candidate) =>
//             Math.abs(
//               candidate - current
//             ) <
//             Math.abs(
//               closest - current
//             )
//               ? candidate
//               : closest,
//           targets[0]
//         );

//       updateActiveIndex(index);

//       scrollToAbsoluteIndex(
//         nearestTarget,
//         true
//       );
//     },
//     [
//       getNearestAbsoluteIndex,
//       pauseAutoplay,
//       scrollToAbsoluteIndex,
//       updateActiveIndex,
//     ]
//   );

//   /* ----------------------------------------
//      Scroll listener
//   ----------------------------------------- */

//   const handleScroll = useCallback(() => {
//     window.clearTimeout(
//       scrollEndTimerRef.current
//     );

//     if (!scrollRafRef.current) {
//       scrollRafRef.current =
//         window.requestAnimationFrame(
//           () => {
//             const absoluteIndex =
//               getNearestAbsoluteIndex();

//             const realIndex =
//               ((absoluteIndex %
//                 PROJECT_COUNT) +
//                 PROJECT_COUNT) %
//               PROJECT_COUNT;

//             updateActiveIndex(
//               realIndex
//             );

//             scrollRafRef.current =
//               null;
//           }
//         );
//     }

//     scrollEndTimerRef.current =
//       window.setTimeout(() => {
//         finalizeScroll();
//       }, SCROLL_END_DELAY);
//   }, [
//     finalizeScroll,
//     getNearestAbsoluteIndex,
//     updateActiveIndex,
//   ]);

//   /* ----------------------------------------
//      Desktop mouse drag
//   ----------------------------------------- */

//   const handlePointerDown = useCallback(
//     (event) => {
//       pauseAutoplay(null);

//       if (
//         event.pointerType !== "mouse"
//       ) {
//         return;
//       }

//       const viewport =
//         viewportRef.current;

//       if (!viewport) return;

//       dragRef.current = {
//         active: true,
//         startX: event.clientX,
//         scrollLeft:
//           viewport.scrollLeft,
//         moved: false,
//       };

//       setIsDragging(true);

//       try {
//         event.currentTarget.setPointerCapture(
//           event.pointerId
//         );
//       } catch {}
//     },
//     [pauseAutoplay]
//   );

//   const handlePointerMove = useCallback(
//     (event) => {
//       if (
//         event.pointerType !== "mouse" ||
//         !dragRef.current.active
//       ) {
//         return;
//       }

//       const viewport =
//         viewportRef.current;

//       if (!viewport) return;

//       const movement =
//         event.clientX -
//         dragRef.current.startX;

//       if (Math.abs(movement) > 3) {
//         dragRef.current.moved = true;
//       }

//       viewport.scrollLeft =
//         dragRef.current.scrollLeft -
//         movement;
//     },
//     []
//   );

//   const handlePointerEnd = useCallback(
//     (event) => {
//       if (
//         event.pointerType === "mouse" &&
//         dragRef.current.active
//       ) {
//         dragRef.current.active = false;

//         setIsDragging(false);

//         try {
//           if (
//             event.currentTarget.hasPointerCapture(
//               event.pointerId
//             )
//           ) {
//             event.currentTarget.releasePointerCapture(
//               event.pointerId
//             );
//           }
//         } catch {}

//         if (dragRef.current.moved) {
//           window.requestAnimationFrame(
//             () => {
//               const nearest =
//                 getNearestAbsoluteIndex();

//               scrollToAbsoluteIndex(
//                 nearest,
//                 true
//               );
//             }
//           );
//         }
//       }

//       pauseAutoplay();
//     },
//     [
//       getNearestAbsoluteIndex,
//       pauseAutoplay,
//       scrollToAbsoluteIndex,
//     ]
//   );

//   /* ----------------------------------------
//      Trackpad
//   ----------------------------------------- */

//   const handleWheel = useCallback(
//     (event) => {
//       if (
//         Math.abs(event.deltaX) >
//         Math.abs(event.deltaY)
//       ) {
//         pauseAutoplay();
//       }
//     },
//     [pauseAutoplay]
//   );

//   /* ----------------------------------------
//      Keyboard
//   ----------------------------------------- */

//   const handleKeyDown = useCallback(
//     (event) => {
//       if (event.key === "ArrowLeft") {
//         event.preventDefault();
//         handlePrevious();
//       }

//       if (event.key === "ArrowRight") {
//         event.preventDefault();
//         handleNext();
//       }
//     },
//     [handleNext, handlePrevious]
//   );

//   /* ----------------------------------------
//      Reduced motion
//   ----------------------------------------- */

//   useEffect(() => {
//     const media =
//       window.matchMedia(
//         "(prefers-reduced-motion: reduce)"
//       );

//     const update = () =>
//       setReducedMotion(media.matches);

//     update();

//     media.addEventListener?.(
//       "change",
//       update
//     );

//     return () => {
//       media.removeEventListener?.(
//         "change",
//         update
//       );
//     };
//   }, []);

//   /* ----------------------------------------
//      Initial position
//   ----------------------------------------- */

//   useEffect(() => {
//     const frame =
//       window.requestAnimationFrame(
//         () => {
//           scrollToAbsoluteIndex(
//             PROJECT_COUNT +
//               INITIAL_INDEX,
//             false
//           );

//           updateActiveIndex(
//             INITIAL_INDEX
//           );

//           setIsReady(true);
//         }
//       );

//     return () =>
//       window.cancelAnimationFrame(
//         frame
//       );
//   }, [
//     scrollToAbsoluteIndex,
//     updateActiveIndex,
//   ]);

//   /* ----------------------------------------
//      Responsive alignment
//   ----------------------------------------- */

//   useEffect(() => {
//     const viewport =
//       viewportRef.current;

//     if (!viewport) return;

//     const handleResize = () => {
//       if (resizeRafRef.current) {
//         cancelAnimationFrame(
//           resizeRafRef.current
//         );
//       }

//       resizeRafRef.current =
//         requestAnimationFrame(() => {
//           scrollToAbsoluteIndex(
//             PROJECT_COUNT +
//               activeIndexRef.current,
//             false
//           );

//           resizeRafRef.current = null;
//         });
//     };

//     const observer =
//       new ResizeObserver(
//         handleResize
//       );

//     observer.observe(viewport);

//     return () => {
//       observer.disconnect();

//       if (resizeRafRef.current) {
//         cancelAnimationFrame(
//           resizeRafRef.current
//         );
//       }
//     };
//   }, [scrollToAbsoluteIndex]);

//   /* ----------------------------------------
//      Autoplay
//   ----------------------------------------- */

//   useEffect(() => {
//     if (
//       !isReady ||
//       isPaused ||
//       isDragging ||
//       isHovered ||
//       reducedMotion
//     ) {
//       return;
//     }

//     const timer = window.setTimeout(
//       () => {
//         moveCarousel(1);
//       },
//       AUTOPLAY_DELAY
//     );

//     return () =>
//       window.clearTimeout(timer);
//   }, [
//     activeIndex,
//     isDragging,
//     isHovered,
//     isPaused,
//     isReady,
//     moveCarousel,
//     reducedMotion,
//   ]);

//   /* ----------------------------------------
//      Cleanup
//   ----------------------------------------- */

//   useEffect(() => {
//     return () => {
//       window.clearTimeout(
//         scrollEndTimerRef.current
//       );

//       window.clearTimeout(
//         resumeTimerRef.current
//       );

//       if (scrollRafRef.current) {
//         cancelAnimationFrame(
//           scrollRafRef.current
//         );
//       }

//       if (resizeRafRef.current) {
//         cancelAnimationFrame(
//           resizeRafRef.current
//         );
//       }
//     };
//   }, []);

//   return (
//     <section
//       className="
//         relative
//         overflow-hidden
//         bg-[#FDFCF8]
//         py-14
//         sm:py-16
//         lg:py-20
//       "
//       aria-labelledby="mega-projects-heading"
//     >
//       {/* Subtle background texture */}
//       <div
//         aria-hidden="true"
//         className="
//           pointer-events-none
//           absolute
//           inset-x-0
//           bottom-0
//           h-32
//           bg-gradient-to-t
//           from-[#F6C343]/[0.035]
//           to-transparent
//         "
//       />

//       <div
//         className="
//           relative
//           mx-auto
//           w-full
//           max-w-[1500px]
//         "
//       >
//         {/* Heading */}
//         <div
//           className="
//             mx-auto
//             mb-9
//             max-w-3xl
//             px-5
//             text-center
//             sm:mb-11
//             lg:mb-12
//           "
//         >
//           <span
//             className="
//               mb-2
//               block
//               text-[11px]
//               font-semibold
//               uppercase
//               tracking-[0.22em]
//               text-[#C39116]
//               sm:text-xs
//             "
//           >
//             Mega Infrastructure
//           </span>

//           <h2
//             id="mega-projects-heading"
//             className="
//               text-[30px]
//               font-semibold
//               leading-[1.12]
//               tracking-[-0.035em]
//               text-[#071A3A]
//               sm:text-4xl
//               lg:text-[44px]
//             "
//           >
//             Building a Dholera Future
//           </h2>

//           <p
//             className="
//               mx-auto
//               mt-2
//               max-w-2xl
//               text-sm
//               leading-6
//               text-[#6D7582]
//               sm:text-base
//             "
//           >
//             World-class infrastructure
//             shaping a future-ready city.
//           </p>

//           <div
//             className="
//               mx-auto
//               mt-4
//               h-[2px]
//               w-14
//               rounded-full
//               bg-[#F6C343]
//             "
//           />
//         </div>

//         {/* Carousel */}
//         <div
//           className="relative"
//           onMouseEnter={() =>
//             setIsHovered(true)
//           }
//           onMouseLeave={() =>
//             setIsHovered(false)
//           }
//         >
//           <div
//             ref={viewportRef}
//             role="region"
//             aria-roledescription="carousel"
//             aria-label="Dholera mega projects"
//             tabIndex={0}
//             onScroll={handleScroll}
//             onPointerDown={
//               handlePointerDown
//             }
//             onPointerMove={
//               handlePointerMove
//             }
//             onPointerUp={
//               handlePointerEnd
//             }
//             onPointerCancel={
//               handlePointerEnd
//             }
//             onWheel={handleWheel}
//             onKeyDown={handleKeyDown}
//             onFocus={() =>
//               pauseAutoplay(null)
//             }
//             onBlur={() =>
//               pauseAutoplay()
//             }
//             className={`
//               flex
//               w-full
//               items-stretch
//               gap-4
//               overflow-x-auto
//               overscroll-x-contain
//               px-5
//               py-6
//               outline-none

//               sm:gap-5
//               sm:px-7

//               lg:gap-6
//               lg:px-10

//               ${
//                 isDragging
//                   ? "cursor-grabbing snap-none"
//                   : "cursor-grab snap-x snap-mandatory"
//               }

//               ${
//                 isReady
//                   ? "opacity-100"
//                   : "opacity-0"
//               }

//               select-none
//               transition-opacity
//               duration-300

//               [scrollbar-width:none]
//               [-ms-overflow-style:none]
//               [&::-webkit-scrollbar]:hidden
//             `}
//             style={{
//               WebkitOverflowScrolling:
//                 "touch",
//             }}
//           >
//             {loopedProjects.map(
//               (project, absoluteIndex) => {
//                 const realIndex =
//                   absoluteIndex %
//                   PROJECT_COUNT;

//                 const isActive =
//                   realIndex === activeIndex;

//                 return (
//                   <div
//                     key={`${project.title}-${absoluteIndex}`}
//                     data-mega-project-slide
//                     className="
//                       basis-[88%]
//                       shrink-0
//                       snap-center

//                       sm:basis-[calc(50%_-_10px)]

//                       lg:basis-[calc(33.333333%_-_16px)]

//                       xl:basis-[calc(20%_-_19.2px)]
//                     "
//                   >
//                     <article
//                       className={`
//                         group
//                         relative
//                         flex
//                         h-full
//                         flex-col
//                         overflow-hidden

//                         rounded-[18px]
//                         border
//                         bg-white

//                         transition-all
//                         duration-500
//                         ease-out

//                         ${
//                           isActive
//                             ? `
//                               z-20
//                               border-[#F6C343]
//                               shadow-[0_20px_55px_rgba(7,26,58,0.15)]
//                               sm:-translate-y-2
//                               sm:scale-[1.035]
//                             `
//                             : `
//                               z-10
//                               border-[#E2E5EA]
//                               shadow-[0_10px_28px_rgba(7,26,58,0.07)]
//                               lg:hover:-translate-y-1
//                               lg:hover:border-[#F6C343]/60
//                               lg:hover:shadow-[0_16px_40px_rgba(7,26,58,0.12)]
//                             `
//                         }
//                       `}
//                     >
//                       {/* Project image */}
//                       <div
//                         className="
//                           relative
//                           m-2
//                           aspect-[16/10]
//                           overflow-hidden
//                           rounded-[13px]
//                           bg-[#EEF2F9]
//                         "
//                       >
//                         <Image
//                           src={project.image}
//                           alt={project.title}
//                           fill
//                           draggable={false}
//                           sizes="
//                             (max-width: 640px) 88vw,
//                             (max-width: 1024px) 50vw,
//                             (max-width: 1280px) 33vw,
//                             20vw
//                           "
//                           className="
//                             object-cover
//                             transition-transform
//                             duration-700
//                             ease-out
//                             group-hover:scale-[1.045]
//                           "
//                         />

//                         {/* Image depth */}
//                         <div
//                           aria-hidden="true"
//                           className="
//                             absolute
//                             inset-0
//                             bg-gradient-to-t
//                             from-[#071A3A]/15
//                             via-transparent
//                             to-transparent
//                           "
//                         />
//                       </div>

//                       {/* Content */}
//                       <div
//                         className="
//                           flex
//                           flex-1
//                           flex-col
//                           px-4
//                           pb-4
//                           pt-2
//                           sm:px-4
//                           sm:pb-5
//                         "
//                       >
//                         <Link
//                           href={project.href}
//                           className="
//                             inline-block
//                             focus-visible:outline-none
//                           "
//                         >
//                           <h3
//                             className="
//                               text-[15px]
//                               font-semibold
//                               leading-[1.35]
//                               tracking-[-0.02em]
//                               text-[#071A3A]
//                               transition-colors
//                               duration-300
//                               group-hover:text-[#B8840C]
//                               sm:text-base
//                             "
//                           >
//                             {project.title}
//                           </h3>
//                         </Link>

//                         <p
//                           className="
//                             mt-2
//                             line-clamp-3
//                             text-[12.5px]
//                             leading-[1.65]
//                             text-[#687282]
//                             sm:text-[13px]
//                           "
//                         >
//                           {project.description}
//                         </p>

//                         <div
//                           className="
//                             mt-auto
//                             flex
//                             justify-end
//                             pt-4
//                           "
//                         >
//                           <Link
//                             href={project.href}
//                             aria-label={`Explore ${project.title}`}
//                             className={`
//                               inline-flex
//                               h-9
//                               w-9
//                               items-center
//                               justify-center
//                               rounded-full
//                               border

//                               transition-all
//                               duration-300

//                               active:scale-95

//                               ${
//                                 isActive
//                                   ? `
//                                     border-[#D9A927]
//                                     bg-[#D9A927]
//                                     text-white
//                                     shadow-[0_5px_14px_rgba(217,169,39,0.32)]
//                                     hover:bg-[#C89A1E]
//                                   `
//                                   : `
//                                     border-[#E8DEBF]
//                                     bg-[#FFFCF4]
//                                     text-[#B8840C]
//                                     hover:border-[#F6C343]
//                                     hover:bg-[#F6C343]
//                                     hover:text-[#071A3A]
//                                   `
//                               }
//                             `}
//                           >
//                             <ArrowUpRight
//                               className="h-4 w-4"
//                               strokeWidth={1.8}
//                             />
//                           </Link>
//                         </div>
//                       </div>
//                     </article>
//                   </div>
//                 );
//               }
//             )}
//           </div>

//           {/* Navigation */}
//           <div
//             className="
//               mt-3
//               flex
//               items-center
//               justify-center
//               gap-3
//               px-5
//               sm:mt-5
//             "
//           >
//             <button
//               type="button"
//               onClick={handlePrevious}
//               aria-label="Previous project"
//               className="
//                 flex
//                 h-10
//                 w-10
//                 shrink-0
//                 items-center
//                 justify-center
//                 rounded-full
//                 border
//                 border-[#E2E4E8]
//                 bg-white
//                 text-[#071A3A]

//                 shadow-[0_5px_15px_rgba(7,26,58,0.07)]

//                 transition-all
//                 duration-300

//                 hover:border-[#F6C343]
//                 hover:bg-[#F6C343]

//                 active:scale-95

//                 sm:h-11
//                 sm:w-11
//               "
//             >
//               <ChevronLeft
//                 className="h-4 w-4 sm:h-5 sm:w-5"
//                 strokeWidth={1.8}
//               />
//             </button>

//             {/* Pagination */}
//             <div
//               className="
//                 flex
//                 items-center
//                 justify-center
//                 gap-0.5
//               "
//             >
//               {megaProjects.map(
//                 (_, index) => {
//                   const isActive =
//                     activeIndex === index;

//                   return (
//                     <button
//                       key={index}
//                       type="button"
//                       onClick={() =>
//                         goToProject(index)
//                       }
//                       aria-label={`Go to project ${
//                         index + 1
//                       }`}
//                       aria-current={
//                         isActive
//                           ? "true"
//                           : undefined
//                       }
//                       className="
//                         flex
//                         h-9
//                         w-6
//                         items-center
//                         justify-center
//                         rounded-full
//                         active:scale-90
//                       "
//                     >
//                       <span
//                         className={`
//                           block
//                           h-[6px]
//                           rounded-full
//                           transition-all
//                           duration-300

//                           ${
//                             isActive
//                               ? "w-5 bg-[#D9A927]"
//                               : "w-[6px] bg-[#D6D8DC] hover:bg-[#B9BDC4]"
//                           }
//                         `}
//                       />
//                     </button>
//                   );
//                 }
//               )}
//             </div>

//             <button
//               type="button"
//               onClick={handleNext}
//               aria-label="Next project"
//               className="
//                 flex
//                 h-10
//                 w-10
//                 shrink-0
//                 items-center
//                 justify-center
//                 rounded-full
//                 border
//                 border-[#E2E4E8]
//                 bg-white
//                 text-[#071A3A]

//                 shadow-[0_5px_15px_rgba(7,26,58,0.07)]

//                 transition-all
//                 duration-300

//                 hover:border-[#F6C343]
//                 hover:bg-[#F6C343]

//                 active:scale-95

//                 sm:h-11
//                 sm:w-11
//               "
//             >
//               <ChevronRight
//                 className="h-4 w-4 sm:h-5 sm:w-5"
//                 strokeWidth={1.8}
//               />
//             </button>
//           </div>

//           <p
//             className="
//               mt-2
//               text-center
//               text-[11px]
//               font-medium
//               text-[#8A919B]
//               sm:hidden
//             "
//           >
//             Swipe to explore projects
//           </p>
//         </div>
//       </div>
//     </section>
//   );
// }



import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";

import MegaProjectsSliderClient from "./MegaProjectsSliderClient";

/* =========================================================
   PROJECT DATA
   ========================================================= */

const megaProjects = [
  {
    title: "ABCD Building",
    description:
      "Administrative & Business Centre, Dholera - Single-window system for investors",
    href: "/about-dholera-sir/abcd-building-dholera-sir",
  },
  {
    title: "TATA Electronics Semiconductor Fab",
    description:
      "India's first semiconductor manufacturing project",
    href: "/about-dholera-sir/tata-semiconductor-plant-in-dholera",
  },
  {
    title: "Dholera International Airport",
    description:
      "Global trade, cargo movement, and international travel",
    href: "/about-dholera-sir/dholera-international-airport-project-update-2025",
  },
  {
    title: "Ahmedabad–Dholera Expressway",
    description:
      "High-speed corridor cutting travel time to one hour",
    href: "/about-dholera-sir/ahmedabad-dholera-expressway-transforming-gujarat-connectivity",
  },
  {
    title: "High-Speed Monorail & Railway",
    description:
      "Links with Ahmedabad and major industrial hubs",
    href: "/dholera-sir-blogs/how-connectivity-is-shaping-dholera-growth",
  },
  {
    title: "Dholera Solar Park",
    description:
      "One of India's largest renewable energy projects",
    href: "/about-dholera-sir/renewable-energy-solar-park-in-dholera",
  },
  {
    title: "Water Treatment Plant",
    description:
      "Reliable long-term water supply for industries and residents",
    href: "/dholera-sir-blogs/dholera-smart-city-water-scarcity-solutions",
  },
  {
    title: "ReNew Power & Activation Area",
    description:
      "₹2,000 crore solar plant + ready infrastructure hub",
    href: "/about-dholera-sir/renewable-energy-solar-park-in-dholera",
  },
  {
    title: "Dholera Sea Port",
    description:
      "A planned greenfield port in the Gulf of Khambhat to support Dholera Connectivity.",
    href: "/dholera-sir-blogs/dholera-sea-port-connectivity-growth",
  },
];

/* =========================================================
   SANITY QUERY

   No title matching.

   We simply fetch 9 main images and assign:
   image 1 -> project 1
   image 2 -> project 2
   image 3 -> project 3
   etc.
   ========================================================= */

const SANITY_IMAGES_QUERY = `
  *[
    defined(mainImage.asset)
  ]
  | order(_createdAt asc)
  [0...9]
  {
    mainImage {
      ...,
      asset-> {
        _id,
        url
      }
    }
  }
`;

/* =========================================================
   IMAGE URL

   Use Sanity CDN resizing instead of sending giant originals.

   900x560 is already more than enough for these cards.
   ========================================================= */

function getOptimizedSanityImage(mainImage) {
  if (!mainImage) return null;

  try {
    return urlFor(mainImage)
      .width(900)
      .height(560)
      .fit("crop")
      .auto("format")
      .quality(82)
      .url();
  } catch (error) {
    return mainImage?.asset?.url || null;
  }
}

/* =========================================================
   SERVER COMPONENT
   ========================================================= */

export default async function MegaProjectsSlider() {
  let sanityDocuments = [];

  try {
    sanityDocuments = await client.fetch(
      SANITY_IMAGES_QUERY,
      {},
      {
        next: {
          revalidate: 3600,
        },
      }
    );
  } catch (error) {
    console.error(
      "Mega Projects: unable to fetch Sanity images:",
      error
    );
  }

  const sanityImages = Array.isArray(sanityDocuments)
    ? sanityDocuments
        .map((document) =>
          getOptimizedSanityImage(document?.mainImage)
        )
        .filter(Boolean)
    : [];

  /*
   * Sequential image assignment.
   *
   * If Sanity temporarily returns fewer than 9 images,
   * existing images are cycled so cards never become blank.
   */
  const projectsWithImages = megaProjects.map(
    (project, index) => ({
      ...project,

      image:
        sanityImages.length > 0
          ? sanityImages[index % sanityImages.length]
          : null,
    })
  );

  return (
    <MegaProjectsSliderClient
      projects={projectsWithImages}
    />
  );
}