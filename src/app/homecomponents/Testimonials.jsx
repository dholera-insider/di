  "use client";

  import React, { useCallback, useEffect, useRef, useState } from "react";
  import { ChevronLeft, ChevronRight } from "lucide-react";
  import Image from "next/image";

  import Priya from "@/app/assets/testimonials/priya-testimonial-img.webp";
  import amit from "@/app/assets/testimonials/amit-testimonial-img.webp";
  import Neha from "@/app/assets/testimonials/neha-testimonial-img.webp";
  import Mehul from "@/app/assets/testimonials/Mehul-testimonial-img.webp";
  import Kunal from "@/app/assets/testimonials/kunal-testimonial-img.webp";
  import Rajesh from "@/app/assets/testimonials/rajesh-testimonial-img.webp";

  const testimonials = [
    {
      quote:
        "Buying property from abroad felt challenging at first, but Dholera Insider made the process simple and clear. Their team was transparent, responsive, and guided me at every step.",
      name: "Rajesh Patel",
      location: "USA",
      avatar: Rajesh,
    },
    {
      quote:
        "I appreciated the clear communication and verified project details. Everything was explained honestly, which gave me more confidence in my Dholera investment.",
      name: "Mehul Shah",
      location: "Canada",
      avatar: Mehul,
    },
    {
      quote:
        "The remote buying experience was smooth and professional. From documentation to booking, Dholera Insider handled everything with proper follow-up.",
      name: "Priya Desai",
      location: "Australia",
      avatar: Priya,
    },
    {
      quote:
        "As an NRI, trust was my biggest concern. Dholera Insider answered my questions patiently and helped me understand the right residential plot option.",
      name: "Amit Mehta",
      location: "UAE",
      avatar: amit,
    },
    {
      quote:
        "Their guidance and transparent approach made investing in Dholera easier than I expected. I would recommend them to NRIs who want clear information before investing.",
      name: "Neha Joshi",
      location: "United Kingdom",
      avatar: Neha,
    },
    {
      quote:
        "The team was knowledgeable, supportive, and always available whenever I needed help. The complete experience, from enquiry to booking, felt seamless.",
      name: "Kunal Bhatt",
      location: "Singapore",
      avatar: Kunal,
    },
  ];

  const TESTIMONIAL_COUNT = testimonials.length;
  const loopedTestimonials = [...testimonials, ...testimonials, ...testimonials];

  const AUTOPLAY_DELAY = 4500;
  const RESUME_DELAY = 2500;
  const SCROLL_END_DELAY = 150;

  export default function TestimonialPagination() {
    const viewportRef = useRef(null);

    const scrollEndTimerRef = useRef(null);
    const resumeTimerRef = useRef(null);
    const scrollRafRef = useRef(null);
    const resizeRafRef = useRef(null);

    const activeIndexRef = useRef(0);

    const dragRef = useRef({
      active: false,
      startX: 0,
      startScrollLeft: 0,
      moved: false,
    });

    const [activeIndex, setActiveIndex] = useState(0);
    const [isReady, setIsReady] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [reducedMotion, setReducedMotion] = useState(false);

    const updateActiveIndex = useCallback((index) => {
      const normalizedIndex =
        ((index % TESTIMONIAL_COUNT) + TESTIMONIAL_COUNT) % TESTIMONIAL_COUNT;

      activeIndexRef.current = normalizedIndex;
      setActiveIndex(normalizedIndex);
    }, []);

    const getSlides = useCallback(() => {
      const viewport = viewportRef.current;
      if (!viewport) return [];

      return Array.from(viewport.querySelectorAll("[data-testimonial-slide]"));
    }, []);

    const getSlideLeft = useCallback((slide) => {
      const viewport = viewportRef.current;
      if (!viewport || !slide) return 0;

      const viewportRect = viewport.getBoundingClientRect();
      const slideRect = slide.getBoundingClientRect();

      return viewport.scrollLeft + slideRect.left - viewportRect.left;
    }, []);

    const scrollToAbsoluteIndex = useCallback(
      (index, smooth = true) => {
        const viewport = viewportRef.current;
        if (!viewport) return;

        const slides = getSlides();
        const slide = slides[index];
        if (!slide) return;

        const targetLeft = getSlideLeft(slide);

        viewport.scrollTo({
          left: targetLeft,
          behavior: smooth && !reducedMotion ? "smooth" : "auto",
        });
      },
      [getSlideLeft, getSlides, reducedMotion]
    );

    const getNearestAbsoluteIndex = useCallback(() => {
      const viewport = viewportRef.current;
      if (!viewport) return TESTIMONIAL_COUNT;

      const slides = getSlides();
      if (!slides.length) return TESTIMONIAL_COUNT;

      const viewportLeft = viewport.getBoundingClientRect().left;

      let closestIndex = 0;
      let closestDistance = Infinity;

      slides.forEach((slide, index) => {
        const slideLeft = slide.getBoundingClientRect().left;
        const distance = Math.abs(slideLeft - viewportLeft);

        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });

      return closestIndex;
    }, [getSlides]);

    const normalizeLoopPosition = useCallback(
      (absoluteIndex) => {
        const realIndex =
          ((absoluteIndex % TESTIMONIAL_COUNT) + TESTIMONIAL_COUNT) %
          TESTIMONIAL_COUNT;

        const middleIndex = TESTIMONIAL_COUNT + realIndex;

        const isOutsideMiddleCopy =
          absoluteIndex < TESTIMONIAL_COUNT ||
          absoluteIndex >= TESTIMONIAL_COUNT * 2;

        if (isOutsideMiddleCopy) {
          scrollToAbsoluteIndex(middleIndex, false);
          return middleIndex;
        }

        return absoluteIndex;
      },
      [scrollToAbsoluteIndex]
    );

    const finalizeScroll = useCallback(() => {
      let absoluteIndex = getNearestAbsoluteIndex();

      const realIndex =
        ((absoluteIndex % TESTIMONIAL_COUNT) + TESTIMONIAL_COUNT) %
        TESTIMONIAL_COUNT;

      updateActiveIndex(realIndex);

      absoluteIndex = normalizeLoopPosition(absoluteIndex);

      const normalizedRealIndex =
        ((absoluteIndex % TESTIMONIAL_COUNT) + TESTIMONIAL_COUNT) %
        TESTIMONIAL_COUNT;

      updateActiveIndex(normalizedRealIndex);
    }, [getNearestAbsoluteIndex, normalizeLoopPosition, updateActiveIndex]);

    const pauseAutoplay = useCallback((delay = RESUME_DELAY) => {
      window.clearTimeout(resumeTimerRef.current);
      setIsPaused(true);

      if (delay === null) return;

      resumeTimerRef.current = window.setTimeout(() => {
        setIsPaused(false);
      }, delay);
    }, []);

    const moveCarousel = useCallback(
      (direction) => {
        let currentAbsoluteIndex = getNearestAbsoluteIndex();
        currentAbsoluteIndex = normalizeLoopPosition(currentAbsoluteIndex);

        const targetIndex = currentAbsoluteIndex + direction;
        scrollToAbsoluteIndex(targetIndex, true);
      },
      [getNearestAbsoluteIndex, normalizeLoopPosition, scrollToAbsoluteIndex]
    );

    const goToTestimonial = useCallback(
      (index) => {
        const currentAbsoluteIndex = getNearestAbsoluteIndex();

        const possibleTargets = [
          index,
          TESTIMONIAL_COUNT + index,
          TESTIMONIAL_COUNT * 2 + index,
        ];

        const targetIndex = possibleTargets.reduce((closest, candidate) => {
          const candidateDistance = Math.abs(candidate - currentAbsoluteIndex);
          const closestDistance = Math.abs(closest - currentAbsoluteIndex);

          return candidateDistance < closestDistance ? candidate : closest;
        }, possibleTargets[0]);

        scrollToAbsoluteIndex(targetIndex, true);
        updateActiveIndex(index);
      },
      [getNearestAbsoluteIndex, scrollToAbsoluteIndex, updateActiveIndex]
    );

    const handlePrevious = useCallback(() => {
      pauseAutoplay();
      moveCarousel(-1);
    }, [moveCarousel, pauseAutoplay]);

    const handleNext = useCallback(() => {
      pauseAutoplay();
      moveCarousel(1);
    }, [moveCarousel, pauseAutoplay]);

    const handleScroll = useCallback(() => {
      window.clearTimeout(scrollEndTimerRef.current);

      if (!scrollRafRef.current) {
        scrollRafRef.current = window.requestAnimationFrame(() => {
          const absoluteIndex = getNearestAbsoluteIndex();

          const realIndex =
            ((absoluteIndex % TESTIMONIAL_COUNT) + TESTIMONIAL_COUNT) %
            TESTIMONIAL_COUNT;

          updateActiveIndex(realIndex);
          scrollRafRef.current = null;
        });
      }

      scrollEndTimerRef.current = window.setTimeout(() => {
        finalizeScroll();
      }, SCROLL_END_DELAY);
    }, [finalizeScroll, getNearestAbsoluteIndex, updateActiveIndex]);

    const handlePointerDown = useCallback(
      (event) => {
        pauseAutoplay(null);

        if (event.pointerType !== "mouse") return;

        const viewport = viewportRef.current;
        if (!viewport) return;

        dragRef.current = {
          active: true,
          startX: event.clientX,
          startScrollLeft: viewport.scrollLeft,
          moved: false,
        };

        setIsDragging(true);

        try {
          event.currentTarget.setPointerCapture(event.pointerId);
        } catch {}
      },
      [pauseAutoplay]
    );

    const handlePointerMove = useCallback((event) => {
      if (event.pointerType !== "mouse" || !dragRef.current.active) return;

      const viewport = viewportRef.current;
      if (!viewport) return;

      const deltaX = event.clientX - dragRef.current.startX;

      if (Math.abs(deltaX) > 3) {
        dragRef.current.moved = true;
      }

      viewport.scrollLeft = dragRef.current.startScrollLeft - deltaX;
    }, []);

    const handlePointerEnd = useCallback(
      (event) => {
        const wasMouseDrag =
          event.pointerType === "mouse" && dragRef.current.active;

        if (wasMouseDrag) {
          dragRef.current.active = false;
          setIsDragging(false);

          try {
            if (event.currentTarget.hasPointerCapture(event.pointerId)) {
              event.currentTarget.releasePointerCapture(event.pointerId);
            }
          } catch {}

          if (dragRef.current.moved) {
            window.requestAnimationFrame(() => {
              const nearestIndex = getNearestAbsoluteIndex();
              scrollToAbsoluteIndex(nearestIndex, true);
            });
          }
        }

        pauseAutoplay(RESUME_DELAY);
      },
      [getNearestAbsoluteIndex, pauseAutoplay, scrollToAbsoluteIndex]
    );

    const handleWheel = useCallback(
      (event) => {
        if (Math.abs(event.deltaX) > Math.abs(event.deltaY)) {
          pauseAutoplay();
        }
      },
      [pauseAutoplay]
    );

    const handleKeyDown = useCallback(
      (event) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          handlePrevious();
        }

        if (event.key === "ArrowRight") {
          event.preventDefault();
          handleNext();
        }
      },
      [handleNext, handlePrevious]
    );

    useEffect(() => {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

      const updatePreference = () => {
        setReducedMotion(mediaQuery.matches);
      };

      updatePreference();

      if (mediaQuery.addEventListener) {
        mediaQuery.addEventListener("change", updatePreference);

        return () => {
          mediaQuery.removeEventListener("change", updatePreference);
        };
      }

      mediaQuery.addListener(updatePreference);

      return () => {
        mediaQuery.removeListener(updatePreference);
      };
    }, []);

    useEffect(() => {
      const frame = window.requestAnimationFrame(() => {
        scrollToAbsoluteIndex(TESTIMONIAL_COUNT, false);
        updateActiveIndex(0);
        setIsReady(true);
      });

      return () => {
        window.cancelAnimationFrame(frame);
      };
    }, [scrollToAbsoluteIndex, updateActiveIndex]);

    useEffect(() => {
      const viewport = viewportRef.current;
      if (!viewport) return;

      const handleResize = () => {
        if (resizeRafRef.current) {
          window.cancelAnimationFrame(resizeRafRef.current);
        }

        resizeRafRef.current = window.requestAnimationFrame(() => {
          scrollToAbsoluteIndex(TESTIMONIAL_COUNT + activeIndexRef.current, false);
          resizeRafRef.current = null;
        });
      };

      let resizeObserver;

      if (typeof ResizeObserver !== "undefined") {
        resizeObserver = new ResizeObserver(handleResize);
        resizeObserver.observe(viewport);
      } else {
        window.addEventListener("resize", handleResize);
      }

      return () => {
        if (resizeObserver) {
          resizeObserver.disconnect();
        } else {
          window.removeEventListener("resize", handleResize);
        }

        if (resizeRafRef.current) {
          window.cancelAnimationFrame(resizeRafRef.current);
        }
      };
    }, [scrollToAbsoluteIndex]);

    useEffect(() => {
      if (
        !isReady ||
        reducedMotion ||
        isHovered ||
        isPaused ||
        isDragging
      ) {
        return;
      }

      const autoplayTimer = window.setTimeout(() => {
        moveCarousel(1);
      }, AUTOPLAY_DELAY);

      return () => {
        window.clearTimeout(autoplayTimer);
      };
    }, [activeIndex, isDragging, isHovered, isPaused, isReady, moveCarousel, reducedMotion]);

    useEffect(() => {
      return () => {
        window.clearTimeout(scrollEndTimerRef.current);
        window.clearTimeout(resumeTimerRef.current);

        if (scrollRafRef.current) {
          window.cancelAnimationFrame(scrollRafRef.current);
        }

        if (resizeRafRef.current) {
          window.cancelAnimationFrame(resizeRafRef.current);
        }
      };
    }, []);


    
    return (
      <section
        className="relative overflow-hidden bg-[#EEF2F9] px-4 py-8 sm:py-16 lg:py-12"
        aria-labelledby="testimonial-heading"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 overflow-hidden"
        >
          <div className="absolute left-[-140px] top-[-160px] h-[380px] w-[380px] rounded-full bg-[#F6C343]/10 blur-[110px]" />
          <div className="absolute bottom-[-180px] right-[-120px] h-[360px] w-[360px] rounded-full bg-[#051A3A]/[0.06] blur-[110px]" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8 xl:px-10">
          <div className="mx-auto mb-8 max-w-2xl text-center sm:mb-12">
        

            <h2
              id="testimonial-heading"
              className="text-[30px] font-semibold leading-[1.15] tracking-[-0.03em] text-[#051A3A] sm:text-4xl lg:text-[42px]"
            >
              What Our NRI Investors Say
            </h2>

            <div className="mx-auto mt-4 h-[2px] w-14 rounded-full bg-[#F6C343]" />

              {/* <span className="mb-3 inline-block text-[11px] font-semibold uppercase tracking-[0.24em] text-[#B88B14] sm:text-xs">
              Read how overseas Indian investors made informed property decisions with Dholera Insider.
            </span> */}
          </div>

          <div
            className="relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div
              ref={viewportRef}
              role="region"
              aria-roledescription="carousel"
              aria-label="Client testimonials"
              tabIndex={0}
              onScroll={handleScroll}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerEnd}
              onPointerCancel={handlePointerEnd}
              onWheel={handleWheel}
              onKeyDown={handleKeyDown}
              onFocus={() => pauseAutoplay(null)}
              onBlur={() => pauseAutoplay()}
              className={`
                flex w-full gap-5 overflow-x-auto overscroll-x-contain py-2 outline-none bg-[#EEF2F9]
                transition-opacity duration-300 sm:gap-6
                ${isDragging ? "cursor-grabbing snap-none" : "cursor-grab snap-x snap-mandatory"}
                ${isReady ? "opacity-100" : "opacity-0"}
                select-none
                [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden
                focus-visible:ring-2 focus-visible:ring-[#F6C343] focus-visible:ring-offset-4 focus-visible:ring-offset-[#EEF2F9]
              `}
              style={{ WebkitOverflowScrolling: "touch" }}
            >
              {loopedTestimonials.map((testimonial, absoluteIndex) => {
                const copyIndex = Math.floor(absoluteIndex / TESTIMONIAL_COUNT);

                return (
                  <div
                    key={`${testimonial.name}-${absoluteIndex}`}
                    data-testimonial-slide
                    aria-hidden={copyIndex !== 1 ? "true" : undefined}
                    className="
                      basis-full shrink-0 snap-start
                      sm:basis-[calc(50%-12px)]
                      lg:basis-[calc(33.333333%-16px)]
                      xl:basis-[calc(25%-18px)]
                    "
                  >
                    <article
                      className="
                        group relative flex h-full min-h-[310px] flex-col overflow-hidden
                        rounded-[22px] border border-[#D7DEE8] bg-white
                        p-5 shadow-[0_10px_35px_rgba(15,23,42,0.06)]
                        transition-all duration-300 ease-out
                        sm:min-h-[320px] sm:p-6
                        lg:min-h-[330px]
                        hover:-translate-y-1 hover:border-[#F6C343]/70
                        hover:shadow-[0_18px_45px_rgba(15,23,42,0.11)]
                      "
                    >
                      <div
                        aria-hidden="true"
                        className="absolute left-0 top-0 h-[3px] w-full bg-gradient-to-r from-[#F6C343] via-[#E8B62A] to-[#F6C343]"
                      />

                      <div className="flex items-center gap-4 border-b border-[#EDF1F6] pb-5">
                        <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full border-2 border-[#F6C343] bg-[#EEF2F9] sm:h-16 sm:w-16">
                          <Image
                            src={testimonial.avatar}
                            alt={testimonial.name}
                            fill
                            draggable={false}
                            sizes="64px"
                            className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                          />
                        </div>

                        <div className="min-w-0">
                          <h3 className="truncate text-[17px] font-semibold tracking-[-0.02em] text-[#051A3A] sm:text-lg">
                            {testimonial.name}
                          </h3>
                          <p className="mt-1 text-[13px] font-medium text-[#B88B14]">
                            {testimonial.location}
                          </p>
                        </div>
                      </div>

                      <blockquote className="relative flex flex-1 flex-col pt-6">
                        <span
                          aria-hidden="true"
                          className="absolute left-0 top-1 font-serif text-[54px] leading-none text-[#F6C343]/20"
                        >
                          “
                        </span>

                        <p className="relative z-10 text-[14px] leading-[1.85] text-[#5C6675] sm:text-[14.5px]">
                          {testimonial.quote}
                        </p>

                        <div className="mt-auto pt-5">
                          <div className="h-px w-8 bg-[#F6C343]/70" />
                        </div>
                      </blockquote>
                    </article>
                  </div>
                );
              })}
            </div>

            <div className="mt-7 flex items-center justify-between gap-4 sm:mt-8 lg:justify-center">
              <button
                type="button"
                onClick={handlePrevious}
                aria-label="Previous testimonial"
                className="

                
                  flex h-11 w-11 shrink-0 items-center justify-center rounded-full
                  border border-[#D6DDE8] bg-white text-[#F6C343]
                  shadow-[0_6px_18px_rgba(15,23,42,0.08)]
                  transition-all duration-300
                  hover:scale-[1.03] hover:border-[#F6C343]
                  active:scale-95
                  sm:h-12 sm:w-12
                "
              >
                <ChevronLeft className="h-5 w-5" strokeWidth={2} />
              </button>

              <div className="flex flex-1 items-center justify-center gap-1 sm:flex-none">
                {testimonials.map((_, index) => {
                  const isActive = activeIndex === index;

                  return (
                    <button
                      key={index}
                      type="button"
                      aria-label={`Go to testimonial ${index + 1}`}
                      aria-current={isActive ? "true" : undefined}
                      onClick={() => {
                        pauseAutoplay();
                        goToTestimonial(index);
                      }}
                      className="flex h-10 w-7 items-center justify-center rounded-full transition-transform duration-200 active:scale-90"
                    >
                      <span
                        className={`block h-[7px] rounded-full transition-all duration-300 ${
                          isActive
                            ? "w-6 bg-[#F6C343]"
                            : "w-[7px] bg-[#B7C2D1] hover:bg-[#8C99AA]"
                        }`}
                      />
                    </button>
                  );
                })}
              </div>

              <button
                type="button"
                onClick={handleNext}
                aria-label="Next testimonial"
                className="
                  flex h-11 w-11 shrink-0 items-center justify-center rounded-full
                  border border-[#D6DDE8] bg-white text-[#F6C343]
                  shadow-[0_6px_18px_rgba(15,23,42,0.08)]
                  transition-all duration-300
                  hover:scale-[1.03] hover:border-[#F6C343]
                  active:scale-95
                  sm:h-12 sm:w-12
                "
              >
                <ChevronRight className="h-5 w-5" strokeWidth={2} />
              </button>
            </div>

          </div>
        </div>
      </section>
    );
  }