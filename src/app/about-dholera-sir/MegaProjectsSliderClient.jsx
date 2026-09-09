"use client";

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

const AUTOPLAY_DELAY = 4200;
const RESUME_DELAY = 2400;
const SCROLL_END_DELAY = 120;

export default function MegaProjectsSliderClient({
  projects = [],
}) {
  const projectCount = projects.length;

  const initialIndex = Math.min(
    2,
    Math.max(projectCount - 1, 0)
  );

  const loopedProjects = useMemo(() => {
    if (!projectCount) return [];

    return [
      ...projects,
      ...projects,
      ...projects,
    ];
  }, [projects, projectCount]);

  const viewportRef = useRef(null);

  const scrollEndTimerRef = useRef(null);
  const resumeTimerRef = useRef(null);
  const scrollRafRef = useRef(null);
  const resizeRafRef = useRef(null);

  const activeIndexRef = useRef(initialIndex);

  const dragRef = useRef({
    active: false,
    startX: 0,
    scrollLeft: 0,
    moved: false,
  });

  const [activeIndex, setActiveIndex] =
    useState(initialIndex);

  const [isReady, setIsReady] =
    useState(false);

  const [isDragging, setIsDragging] =
    useState(false);

  const [isPaused, setIsPaused] =
    useState(false);

  const [isHovered, setIsHovered] =
    useState(false);

  const [reducedMotion, setReducedMotion] =
    useState(false);

  /* -----------------------------------------
     ACTIVE INDEX
  ----------------------------------------- */

  const updateActiveIndex = useCallback(
    (index) => {
      if (!projectCount) return;

      const normalized =
        ((index % projectCount) +
          projectCount) %
        projectCount;

      activeIndexRef.current = normalized;

      setActiveIndex(normalized);
    },
    [projectCount]
  );

  /* -----------------------------------------
     GET SLIDES
  ----------------------------------------- */

  const getSlides = useCallback(() => {
    const viewport = viewportRef.current;

    if (!viewport) return [];

    return Array.from(
      viewport.querySelectorAll(
        "[data-mega-project-slide]"
      )
    );
  }, []);

  /* -----------------------------------------
     SCROLL SLIDE TO CENTER
  ----------------------------------------- */

  const scrollToAbsoluteIndex = useCallback(
    (index, smooth = true) => {
      const viewport = viewportRef.current;

      if (!viewport) return;

      const slides = getSlides();

      const slide = slides[index];

      if (!slide) return;

      const slideCenter =
        slide.offsetLeft +
        slide.offsetWidth / 2;

      const viewportCenter =
        viewport.clientWidth / 2;

      const targetLeft =
        slideCenter - viewportCenter;

      viewport.scrollTo({
        left: targetLeft,
        behavior:
          smooth && !reducedMotion
            ? "smooth"
            : "auto",
      });
    },
    [getSlides, reducedMotion]
  );

  /* -----------------------------------------
     FIND CENTER SLIDE
  ----------------------------------------- */

  const getNearestAbsoluteIndex =
    useCallback(() => {
      const viewport = viewportRef.current;

      if (!viewport || !projectCount) {
        return (
          projectCount +
          initialIndex
        );
      }

      const slides = getSlides();

      if (!slides.length) {
        return (
          projectCount +
          initialIndex
        );
      }

      const viewportRect =
        viewport.getBoundingClientRect();

      const viewportCenter =
        viewportRect.left +
        viewportRect.width / 2;

      let closestIndex = 0;
      let closestDistance = Infinity;

      slides.forEach((slide, index) => {
        const rect =
          slide.getBoundingClientRect();

        const center =
          rect.left +
          rect.width / 2;

        const distance = Math.abs(
          center - viewportCenter
        );

        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });

      return closestIndex;
    }, [
      getSlides,
      initialIndex,
      projectCount,
    ]);

  /* -----------------------------------------
     INFINITE LOOP
  ----------------------------------------- */

  const normalizeLoopPosition = useCallback(
    (absoluteIndex) => {
      if (!projectCount) {
        return absoluteIndex;
      }

      const realIndex =
        ((absoluteIndex % projectCount) +
          projectCount) %
        projectCount;

      const middleIndex =
        projectCount + realIndex;

      const outsideMiddle =
        absoluteIndex < projectCount ||
        absoluteIndex >= projectCount * 2;

      if (outsideMiddle) {
        scrollToAbsoluteIndex(
          middleIndex,
          false
        );

        return middleIndex;
      }

      return absoluteIndex;
    },
    [
      projectCount,
      scrollToAbsoluteIndex,
    ]
  );

  /* -----------------------------------------
     FINISH SCROLL
  ----------------------------------------- */

  const finalizeScroll = useCallback(() => {
    if (!projectCount) return;

    let absoluteIndex =
      getNearestAbsoluteIndex();

    const realIndex =
      ((absoluteIndex % projectCount) +
        projectCount) %
      projectCount;

    updateActiveIndex(realIndex);

    absoluteIndex =
      normalizeLoopPosition(
        absoluteIndex
      );

    updateActiveIndex(
      absoluteIndex % projectCount
    );
  }, [
    getNearestAbsoluteIndex,
    normalizeLoopPosition,
    projectCount,
    updateActiveIndex,
  ]);

  /* -----------------------------------------
     PAUSE AUTOPLAY
  ----------------------------------------- */

  const pauseAutoplay = useCallback(
    (delay = RESUME_DELAY) => {
      window.clearTimeout(
        resumeTimerRef.current
      );

      setIsPaused(true);

      if (delay === null) return;

      resumeTimerRef.current =
        window.setTimeout(() => {
          setIsPaused(false);
        }, delay);
    },
    []
  );

  /* -----------------------------------------
     NEXT / PREVIOUS
  ----------------------------------------- */

  const moveCarousel = useCallback(
    (direction) => {
      if (!projectCount) return;

      let currentIndex =
        getNearestAbsoluteIndex();

      currentIndex =
        normalizeLoopPosition(
          currentIndex
        );

      scrollToAbsoluteIndex(
        currentIndex + direction,
        true
      );
    },
    [
      getNearestAbsoluteIndex,
      normalizeLoopPosition,
      projectCount,
      scrollToAbsoluteIndex,
    ]
  );

  const handlePrevious = useCallback(() => {
    pauseAutoplay();
    moveCarousel(-1);
  }, [
    moveCarousel,
    pauseAutoplay,
  ]);

  const handleNext = useCallback(() => {
    pauseAutoplay();
    moveCarousel(1);
  }, [
    moveCarousel,
    pauseAutoplay,
  ]);

  /* -----------------------------------------
     DOT NAVIGATION
  ----------------------------------------- */

  const goToProject = useCallback(
    (index) => {
      if (!projectCount) return;

      pauseAutoplay();

      const current =
        getNearestAbsoluteIndex();

      const possibleTargets = [
        index,
        projectCount + index,
        projectCount * 2 + index,
      ];

      const target =
        possibleTargets.reduce(
          (closest, candidate) => {
            const currentDistance =
              Math.abs(
                candidate - current
              );

            const closestDistance =
              Math.abs(
                closest - current
              );

            return currentDistance <
              closestDistance
              ? candidate
              : closest;
          },
          possibleTargets[0]
        );

      updateActiveIndex(index);

      scrollToAbsoluteIndex(
        target,
        true
      );
    },
    [
      getNearestAbsoluteIndex,
      pauseAutoplay,
      projectCount,
      scrollToAbsoluteIndex,
      updateActiveIndex,
    ]
  );

  /* -----------------------------------------
     SCROLL
  ----------------------------------------- */

  const handleScroll = useCallback(() => {
    if (!projectCount) return;

    window.clearTimeout(
      scrollEndTimerRef.current
    );

    if (!scrollRafRef.current) {
      scrollRafRef.current =
        window.requestAnimationFrame(() => {
          const absoluteIndex =
            getNearestAbsoluteIndex();

          const realIndex =
            ((absoluteIndex %
              projectCount) +
              projectCount) %
            projectCount;

          updateActiveIndex(realIndex);

          scrollRafRef.current = null;
        });
    }

    scrollEndTimerRef.current =
      window.setTimeout(() => {
        finalizeScroll();
      }, SCROLL_END_DELAY);
  }, [
    finalizeScroll,
    getNearestAbsoluteIndex,
    projectCount,
    updateActiveIndex,
  ]);

  /* -----------------------------------------
     MOUSE DRAG
  ----------------------------------------- */

  const handlePointerDown = useCallback(
    (event) => {
      /*
       * Don't trigger dragging when clicking
       * links/buttons.
       */
      if (
        event.target.closest?.(
          "a, button"
        )
      ) {
        pauseAutoplay();

        return;
      }

      pauseAutoplay(null);

      /*
       * Mobile/touch uses native scroll.
       */
      if (
        event.pointerType !== "mouse"
      ) {
        return;
      }

      const viewport =
        viewportRef.current;

      if (!viewport) return;

      dragRef.current = {
        active: true,
        startX: event.clientX,
        scrollLeft:
          viewport.scrollLeft,
        moved: false,
      };

      setIsDragging(true);

      try {
        event.currentTarget.setPointerCapture(
          event.pointerId
        );
      } catch {}
    },
    [pauseAutoplay]
  );

  const handlePointerMove = useCallback(
    (event) => {
      if (
        event.pointerType !== "mouse" ||
        !dragRef.current.active
      ) {
        return;
      }

      const viewport =
        viewportRef.current;

      if (!viewport) return;

      const movement =
        event.clientX -
        dragRef.current.startX;

      if (Math.abs(movement) > 4) {
        dragRef.current.moved = true;
      }

      viewport.scrollLeft =
        dragRef.current.scrollLeft -
        movement;
    },
    []
  );

  const handlePointerEnd = useCallback(
    (event) => {
      if (
        event.pointerType === "mouse" &&
        dragRef.current.active
      ) {
        dragRef.current.active = false;

        setIsDragging(false);

        try {
          if (
            event.currentTarget.hasPointerCapture(
              event.pointerId
            )
          ) {
            event.currentTarget.releasePointerCapture(
              event.pointerId
            );
          }
        } catch {}

        if (dragRef.current.moved) {
          window.requestAnimationFrame(
            () => {
              const nearest =
                getNearestAbsoluteIndex();

              scrollToAbsoluteIndex(
                nearest,
                true
              );
            }
          );
        }
      }

      pauseAutoplay();
    },
    [
      getNearestAbsoluteIndex,
      pauseAutoplay,
      scrollToAbsoluteIndex,
    ]
  );

  /* -----------------------------------------
     TRACKPAD
  ----------------------------------------- */

  const handleWheel = useCallback(
    (event) => {
      if (
        Math.abs(event.deltaX) >
        Math.abs(event.deltaY)
      ) {
        pauseAutoplay();
      }
    },
    [pauseAutoplay]
  );

  /* -----------------------------------------
     KEYBOARD
  ----------------------------------------- */

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
    [
      handleNext,
      handlePrevious,
    ]
  );

  /* -----------------------------------------
     REDUCED MOTION
  ----------------------------------------- */

  useEffect(() => {
    const media =
      window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      );

    const updateMotionPreference = () => {
      setReducedMotion(
        media.matches
      );
    };

    updateMotionPreference();

    media.addEventListener?.(
      "change",
      updateMotionPreference
    );

    return () => {
      media.removeEventListener?.(
        "change",
        updateMotionPreference
      );
    };
  }, []);

  /* -----------------------------------------
     INITIAL POSITION
  ----------------------------------------- */

  useEffect(() => {
    if (!projectCount) return;

    const frame =
      window.requestAnimationFrame(() => {
        scrollToAbsoluteIndex(
          projectCount + initialIndex,
          false
        );

        updateActiveIndex(
          initialIndex
        );

        setIsReady(true);
      });

    return () => {
      window.cancelAnimationFrame(
        frame
      );
    };
  }, [
    initialIndex,
    projectCount,
    scrollToAbsoluteIndex,
    updateActiveIndex,
  ]);

  /* -----------------------------------------
     RESIZE
  ----------------------------------------- */

  useEffect(() => {
    const viewport =
      viewportRef.current;

    if (!viewport || !projectCount) {
      return;
    }

    const handleResize = () => {
      if (resizeRafRef.current) {
        window.cancelAnimationFrame(
          resizeRafRef.current
        );
      }

      resizeRafRef.current =
        window.requestAnimationFrame(
          () => {
            scrollToAbsoluteIndex(
              projectCount +
                activeIndexRef.current,
              false
            );

            resizeRafRef.current =
              null;
          }
        );
    };

    let observer;

    if (
      typeof ResizeObserver !==
      "undefined"
    ) {
      observer =
        new ResizeObserver(
          handleResize
        );

      observer.observe(viewport);
    } else {
      window.addEventListener(
        "resize",
        handleResize
      );
    }

    return () => {
      if (observer) {
        observer.disconnect();
      } else {
        window.removeEventListener(
          "resize",
          handleResize
        );
      }

      if (resizeRafRef.current) {
        window.cancelAnimationFrame(
          resizeRafRef.current
        );
      }
    };
  }, [
    projectCount,
    scrollToAbsoluteIndex,
  ]);

  /* -----------------------------------------
     AUTOPLAY
  ----------------------------------------- */

  useEffect(() => {
    if (
      !projectCount ||
      !isReady ||
      isPaused ||
      isDragging ||
      isHovered ||
      reducedMotion
    ) {
      return;
    }

    const autoplayTimer =
      window.setTimeout(() => {
        moveCarousel(1);
      }, AUTOPLAY_DELAY);

    return () => {
      window.clearTimeout(
        autoplayTimer
      );
    };
  }, [
    activeIndex,
    isDragging,
    isHovered,
    isPaused,
    isReady,
    moveCarousel,
    projectCount,
    reducedMotion,
  ]);

  /* -----------------------------------------
     CLEANUP
  ----------------------------------------- */

  useEffect(() => {
    return () => {
      window.clearTimeout(
        scrollEndTimerRef.current
      );

      window.clearTimeout(
        resumeTimerRef.current
      );

      if (scrollRafRef.current) {
        window.cancelAnimationFrame(
          scrollRafRef.current
        );
      }

      if (resizeRafRef.current) {
        window.cancelAnimationFrame(
          resizeRafRef.current
        );
      }
    };
  }, []);

  if (!projectCount) {
    return null;
  }

  return (
    <section
      className="
        relative
        overflow-hidden
        bg-[#FDFCF8]
        py-14
        sm:py-16
        lg:py-20
      "
      aria-labelledby="mega-projects-heading"
    >
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-x-0
          bottom-0
          h-32
          bg-gradient-to-t
          from-[#F6C343]/[0.035]
          to-transparent
        "
      />

      <div
        className="
          relative
          mx-auto
          w-full
          max-w-[1500px]
        "
      >
        {/* Heading */}
        <div
          className="
            mx-auto
            mb-9
            max-w-3xl
            px-5
            text-center
            sm:mb-11
            lg:mb-12
          "
        >

            <h2
                id="mega-projects-heading"
                className="
                    text-left
                    text-[30px]
                    font-semibold
                    leading-[1.12]
                    tracking-[-0.035em]
                    text-[#071A3A]

                    sm:text-center
                    sm:text-4xl

                    lg:text-[44px]
                "
                >
                Mega Projects in Dholera Smart City
            </h2>
            <div
                className="
                    mt-4
                    ml-0
                    mr-auto
                    h-[2px]
                    w-14
                    rounded-full
                    bg-[#F6C343]

                    sm:mx-auto
                "
                />
        </div>

        {/* Slider */}
        <div
          className="relative"
          onMouseEnter={() =>
            setIsHovered(true)
          }
          onMouseLeave={() =>
            setIsHovered(false)
          }
        >
          <div
            ref={viewportRef}
            role="region"
            aria-roledescription="carousel"
            aria-label="Dholera mega projects"
            tabIndex={0}
            onScroll={handleScroll}
            onPointerDown={
              handlePointerDown
            }
            onPointerMove={
              handlePointerMove
            }
            onPointerUp={
              handlePointerEnd
            }
            onPointerCancel={
              handlePointerEnd
            }
            onWheel={handleWheel}
            onKeyDown={handleKeyDown}
            onFocus={() =>
              pauseAutoplay(null)
            }
            onBlur={() =>
              pauseAutoplay()
            }
            className={`
              flex
              w-full
              items-stretch
              gap-4
              overflow-x-auto
              overscroll-x-contain
              px-5
              py-6
              outline-none

              sm:gap-5
              sm:px-7

              lg:gap-6
              lg:px-10

              ${
                isDragging
                  ? "cursor-grabbing snap-none"
                  : "cursor-grab snap-x snap-mandatory"
              }

              ${
                isReady
                  ? "opacity-100"
                  : "opacity-0"
              }

              select-none
              transition-opacity
              duration-300

              [scrollbar-width:none]
              [-ms-overflow-style:none]
              [&::-webkit-scrollbar]:hidden
            `}
            style={{
              WebkitOverflowScrolling:
                "touch",
            }}
          >
            {loopedProjects.map(
              (
                project,
                absoluteIndex
              ) => {
                const realIndex =
                  absoluteIndex %
                  projectCount;

                const isActive =
                  realIndex ===
                  activeIndex;

                const isMiddleCopy =
                  absoluteIndex >=
                    projectCount &&
                  absoluteIndex <
                    projectCount * 2;

                const shouldPrioritize =
                  isMiddleCopy &&
                  realIndex <= 4;

                return (
                  <div
                    key={`${project.title}-${absoluteIndex}`}
                    data-mega-project-slide
                    className="
                      basis-[88%]
                      shrink-0
                      snap-center

                      sm:basis-[calc(50%_-_10px)]

                      lg:basis-[calc(33.333333%_-_16px)]

                      xl:basis-[calc(20%_-_19.2px)]
                    "
                  >
                    <article
                      className={`
                        group
                        relative
                        flex
                        h-full
                        flex-col
                        overflow-hidden
                        rounded-[18px]
                        border
                        bg-white

                        transition-[transform,border-color,box-shadow]
                        duration-300
                        ease-out

                        ${
                          isActive
                            ? `
                              z-20
                              border-[#F6C343]
                              shadow-[0_18px_48px_rgba(7,26,58,0.14)]
                              sm:-translate-y-2
                              sm:scale-[1.025]
                            `
                            : `
                              z-10
                              border-[#E2E5EA]
                              shadow-[0_8px_24px_rgba(7,26,58,0.07)]
                              lg:hover:-translate-y-1
                              lg:hover:border-[#F6C343]/60
                            `
                        }
                      `}
                    >
                      {/* Image */}
                      <div
                        className="
                          relative
                          m-2
                          aspect-[16/10]
                          overflow-hidden
                          rounded-[13px]
                          bg-[#EEF2F9]
                        "
                      >
                        {project.image ? (
                          <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            priority={
                              shouldPrioritize
                            }
                            quality={82}
                            draggable={false}
                            sizes="
                              (max-width: 640px) 88vw,
                              (max-width: 1024px) 50vw,
                              (max-width: 1280px) 33vw,
                              20vw
                            "
                            className="
                              object-cover
                              transition-transform
                              duration-500
                              group-hover:scale-[1.025]
                            "
                          />
                        ) : (
                          <div
                            className="
                              absolute
                              inset-0
                              flex
                              items-center
                              justify-center
                              bg-[#EEF2F9]
                              px-4
                              text-center
                            "
                          >
                            <span
                              className="
                                text-xs
                                font-medium
                                text-[#7A8491]
                              "
                            >
                              {project.title}
                            </span>
                          </div>
                        )}

                        <div
                          aria-hidden="true"
                          className="
                            pointer-events-none
                            absolute
                            inset-0
                            bg-gradient-to-t
                            from-[#071A3A]/10
                            via-transparent
                            to-transparent
                          "
                        />
                      </div>

                      {/* Content */}
                      <div
                        className="
                          flex
                          flex-1
                          flex-col
                          px-4
                          pb-5
                          pt-2
                        "
                      >
                        <h3
                          className="
                            text-[15px]
                            font-semibold
                            leading-[1.35]
                            tracking-[-0.02em]
                            text-[#071A3A]
                            sm:text-base
                          "
                        >
                          {project.title}
                        </h3>

                        <p
                          className="
                            mt-2
                            line-clamp-3
                            text-[12.5px]
                            leading-[1.65]
                            text-[#687282]
                            sm:text-[13px]
                          "
                        >
                          {project.description}
                        </p>

                        <div className="mt-auto pt-5">
                          <Link
                            href={project.href}
                            prefetch={true}
                            aria-label={`Read more about ${project.title}`}
                            onPointerDown={(
                              event
                            ) => {
                              event.stopPropagation();
                            }}
                            className={`
                              inline-flex
                              min-h-10
                              items-center
                              justify-center
                              rounded-full
                              border
                              px-4
                              py-2
                              text-[12px]
                              font-semibold
                              transition-all
                              duration-300
                              active:scale-[0.97]

                              ${
                                isActive
                                  ? `
                                    border-[#F6C343]
                                    bg-[#F6C343]
                                    text-[#071A3A]
                                    hover:bg-[#E9B835]
                                  `
                                  : `
                                    border-[#E6D9B5]
                                    bg-[#FFFDF7]
                                    text-[#A87808]
                                    hover:border-[#F6C343]
                                    hover:bg-[#F6C343]
                                    hover:text-[#071A3A]
                                  `
                              }
                            `}
                          >
                            Read More
                          </Link>
                        </div>
                      </div>
                    </article>
                  </div>
                );
              }
            )}
          </div>

          {/* Controls */}
          <div
            className="
              mt-3
              flex
              items-center
              justify-center
              gap-3
              px-5
              sm:mt-5
            "
          >
            <button
              type="button"
              onClick={handlePrevious}
              aria-label="Previous project"
              className="
                flex
                h-10
                w-10
                shrink-0
                items-center
                justify-center
                rounded-full
                border
                border-[#E2E4E8]
                bg-white
                text-[#071A3A]
                transition-all
                duration-300
                hover:border-[#F6C343]
                hover:bg-[#F6C343]
                active:scale-95
                sm:h-11
                sm:w-11
              "
            >
              <ChevronLeft
                className="h-5 w-5"
                strokeWidth={1.8}
              />
            </button>

            {/* Dots */}
            <div className="flex items-center justify-center gap-0.5">
              {projects.map(
                (_, index) => {
                  const current =
                    activeIndex ===
                    index;

                  return (
                    <button
                      key={index}
                      type="button"
                      onClick={() =>
                        goToProject(
                          index
                        )
                      }
                      aria-label={`Go to project ${
                        index + 1
                      }`}
                      aria-current={
                        current
                          ? "true"
                          : undefined
                      }
                      className="
                        flex
                        h-9
                        w-6
                        items-center
                        justify-center
                        rounded-full
                        active:scale-90
                      "
                    >
                      <span
                        className={`
                          block
                          h-[6px]
                          rounded-full
                          transition-all
                          duration-300

                          ${
                            current
                              ? "w-5 bg-[#D9A927]"
                              : "w-[6px] bg-[#D6D8DC]"
                          }
                        `}
                      />
                    </button>
                  );
                }
              )}
            </div>

            <button
              type="button"
              onClick={handleNext}
              aria-label="Next project"
              className="
                flex
                h-10
                w-10
                shrink-0
                items-center
                justify-center
                rounded-full
                border
                border-[#E2E4E8]
                bg-white
                text-[#071A3A]
                transition-all
                duration-300
                hover:border-[#F6C343]
                hover:bg-[#F6C343]
                active:scale-95
                sm:h-11
                sm:w-11
              "
            >
              <ChevronRight
                className="h-5 w-5"
                strokeWidth={1.8}
              />
            </button>
          </div>

          <p
            className="
              mt-2
              text-center
              text-[11px]
              font-medium
              text-[#8A919B]
              sm:hidden
            "
          >
            Swipe to explore projects
          </p>
        </div>
      </div>
    </section>
  );
}