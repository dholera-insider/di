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
import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { client } from "@/sanity/lib/client";

/* =========================================================
   SLIDER SETTINGS
========================================================= */

const AUTOPLAY_DELAY = 1700;
const RESUME_DELAY = 2000;
const SCROLL_END_DELAY = 110;

/* =========================================================
   SANITY QUERY

   First preference:
   mainImage

   Then try other common Sanity image fields.

   IMPORTANT:
   Every fallback still comes from Sanity.
========================================================= */

const SANITY_IMAGES_QUERY = `
  *[
    !(_id in path("drafts.**")) &&
    (
      defined(mainImage.asset) ||
      defined(projectImage.asset) ||
      defined(heroImage.asset) ||
      defined(bannerImage.asset) ||
      defined(coverImage.asset) ||
      defined(featuredImage.asset) ||
      defined(thumbnail.asset) ||
      defined(image.asset) ||
      defined(ogImage.asset) ||
      defined(seoImage.asset) ||
      defined(gallery[0].asset) ||
      defined(gallery[0].image.asset) ||
      defined(images[0].asset) ||
      defined(images[0].image.asset)
    )
  ]{
    _id,
    _type,

    "title": coalesce(
      title,
      name,
      projectName,
      heading,
      seo.title
    ),

    "slug": coalesce(
      slug.current,
      pageSlug.current,
      currentSlug.current
    ),

    "imageUrl": coalesce(
      mainImage.asset->url,
      projectImage.asset->url,
      heroImage.asset->url,
      bannerImage.asset->url,
      coverImage.asset->url,
      featuredImage.asset->url,
      thumbnail.asset->url,
      image.asset->url,
      ogImage.asset->url,
      seoImage.asset->url,
      gallery[0].asset->url,
      gallery[0].image.asset->url,
      images[0].asset->url,
      images[0].image.asset->url
    )
  }
`;

/* =========================================================
   NORMALIZE TEXT
========================================================= */

function normalizeText(value = "") {
  return String(value)
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[–—-]/g, " ")
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/* =========================================================
   NORMALIZE SLUG
========================================================= */

function normalizeSlug(value = "") {
  return String(value)
    .toLowerCase()
    .replace(/^\/+|\/+$/g, "")
    .trim();
}

/* =========================================================
   GET SLUG FROM PROJECT HREF
========================================================= */

function getHrefSlug(href = "") {
  if (!href) return "";

  try {
    const cleanHref = String(href)
      .split("?")[0]
      .split("#")[0]
      .replace(/\/+$/, "");

    const parts =
      cleanHref.split("/");

    return normalizeSlug(
      parts[parts.length - 1] || "",
    );
  } catch {
    return "";
  }
}

/* =========================================================
   STOP WORDS

   Don't let generic words like "Dholera" or "project"
   create false matches.
========================================================= */

const STOP_WORDS = new Set([
  "a",
  "an",
  "the",
  "and",
  "or",
  "of",
  "in",
  "at",
  "to",
  "for",
  "with",
  "from",
  "on",
  "is",
  "are",
  "dholera",
  "sir",
  "smart",
  "city",
  "project",
  "projects",
  "india",
  "latest",
  "update",
  "updates",
]);

function getTokens(value = "") {
  return normalizeText(value)
    .split(" ")
    .filter(
      (word) =>
        word &&
        word.length > 2 &&
        !STOP_WORDS.has(word),
    );
}

/* =========================================================
   BUILT-IN IMAGE TITLE ALIASES

   This handles differences between the title displayed
   in your slider and the title stored inside Sanity.
========================================================= */

const DEFAULT_PROJECT_ALIASES = {
  [normalizeText(
    "ABCD Building",
  )]: [
    "ABCD Building",
    "ABCD Building Dholera",
    "ABCD Building Dholera SIR",
    "ABCD Building in Dholera",
    "Administrative Business Centre Dholera",
    "Administrative and Business Centre Dholera",
  ],

  [normalizeText(
    "TATA Electronics Semiconductor Fab",
  )]: [
    "TATA Electronics Semiconductor Fab",
    "Tata Electronics Semiconductor Fab",
    "TATA Semiconductor Plant",
    "TATA Semiconductor Plant in Dholera",
    "Tata Semiconductor Plant in Dholera",
    "TATA Semiconductor Fab",
    "TATA Semiconductor Fab Dholera",
    "Tata Semiconductor Fab Dholera",
    "Tata Electronics Dholera",
    "TATA Electronics Dholera",
    "Semiconductor Plant Dholera",
  ],

  [normalizeText(
    "Dholera International Airport",
  )]: [
    "Dholera International Airport",
    "Dholera International Airport Project",
    "Dholera International Airport Project Update 2025",
    "Dholera Airport",
    "Dholera Airport Project",
    "International Airport Dholera",
  ],

  [normalizeText(
    "Ahmedabad–Dholera Expressway",
  )]: [
    "Ahmedabad Dholera Expressway",
    "Ahmedabad-Dholera Expressway",
    "Ahmedabad–Dholera Expressway",
    "Ahmedabad Dholera Expressway Transforming Gujarat Connectivity",
    "Dholera Expressway",
    "Ahmedabad Dholera Highway",
  ],

  [normalizeText(
    "High-Speed Monorail & Railway",
  )]: [
    "High Speed Monorail and Railway",
    "High-Speed Monorail & Railway",
    "Dholera Railway",
    "Dholera Rail Connectivity",
    "Dholera Railway Connectivity",
    "Ahmedabad Dholera Railway",
    "Dholera Monorail",
    "Railway Dholera",
  ],

  [normalizeText(
    "Dholera Solar Park",
  )]: [
    "Dholera Solar Park",
    "Solar Park Dholera",
    "Renewable Energy Solar Park in Dholera",
    "Dholera Renewable Energy Solar Park",
    "Renewable Energy Dholera",
  ],

  [normalizeText(
    "Water Treatment Plant",
  )]: [
    "Water Treatment Plant",
    "Dholera Water Treatment Plant",
    "Water Treatment Plant Dholera",
    "Dholera Water Infrastructure",
    "Dholera Smart City Water Scarcity Solutions",
  ],

  [normalizeText(
    "ReNew Power & Activation Area",
  )]: [
    "ReNew Power and Activation Area",
    "Renew Power and Activation Area",
    "ReNew Power Dholera",
    "Renew Power Dholera",
    "Dholera Activation Area",
    "Activation Area Dholera",
    "ReNew Power",
  ],

  [normalizeText(
    "Dholera Sea Port",
  )]: [
    "Dholera Sea Port",
    "Dholera Seaport",
    "Dholera Port",
    "Dholera Sea Port Connectivity Growth",
    "Dholera Port Connectivity",
    "Sea Port Dholera",
  ],
};

/* =========================================================
   GET EVERY POSSIBLE PROJECT TITLE
========================================================= */

function getProjectSearchTitles(project) {
  if (!project) return [];

  const normalizedProjectTitle =
    normalizeText(
      project.title,
    );

  const builtInAliases =
    DEFAULT_PROJECT_ALIASES[
      normalizedProjectTitle
    ] || [];

  const customAliases =
    Array.isArray(
      project.imageMatchTitles,
    )
      ? project.imageMatchTitles
      : [];

  return [
    project.title,
    ...customAliases,
    ...builtInAliases,
  ]
    .filter(Boolean)
    .map(normalizeText)
    .filter(Boolean)
    .filter(
      (value, index, array) =>
        array.indexOf(value) ===
        index,
    );
}

/* =========================================================
   CALCULATE SANITY MATCH SCORE
========================================================= */

function calculateMatchScore(
  project,
  sanityItem,
) {
  if (
    !project ||
    !sanityItem?.imageUrl
  ) {
    return 0;
  }

  const projectSlug =
    getHrefSlug(
      project.href,
    );

  const sanitySlug =
    normalizeSlug(
      sanityItem.slug,
    );

  const sanityTitle =
    normalizeText(
      sanityItem.title,
    );

  const searchTitles =
    getProjectSearchTitles(
      project,
    );

  let score = 0;

  /* -------------------------------------------------------
     EXACT SLUG
  ------------------------------------------------------- */

  if (
    projectSlug &&
    sanitySlug &&
    projectSlug === sanitySlug
  ) {
    score = Math.max(
      score,
      3000,
    );
  }

  /* -------------------------------------------------------
     PARTIAL SLUG
  ------------------------------------------------------- */

  if (
    projectSlug &&
    sanitySlug &&
    projectSlug !== sanitySlug
  ) {
    if (
      projectSlug.includes(
        sanitySlug,
      ) ||
      sanitySlug.includes(
        projectSlug,
      )
    ) {
      score = Math.max(
        score,
        2200,
      );
    }
  }

  /* -------------------------------------------------------
     EXACT TITLE
  ------------------------------------------------------- */

  searchTitles.forEach(
    (searchTitle) => {
      if (
        sanityTitle &&
        sanityTitle === searchTitle
      ) {
        score = Math.max(
          score,
          2800,
        );
      }
    },
  );

  /* -------------------------------------------------------
     TITLE CONTAINS ALIAS
  ------------------------------------------------------- */

  searchTitles.forEach(
    (searchTitle) => {
      if (
        !searchTitle ||
        !sanityTitle
      ) {
        return;
      }

      if (
        sanityTitle.includes(
          searchTitle,
        ) ||
        searchTitle.includes(
          sanityTitle,
        )
      ) {
        score = Math.max(
          score,
          1900,
        );
      }
    },
  );

  /* -------------------------------------------------------
     KEYWORD / TOKEN MATCH
  ------------------------------------------------------- */

  const sanityTokens =
    getTokens(
      sanityItem.title,
    );

  searchTitles.forEach(
    (searchTitle) => {
      const projectTokens =
        getTokens(
          searchTitle,
        );

      if (
        !projectTokens.length ||
        !sanityTokens.length
      ) {
        return;
      }

      const matchedTokens =
        projectTokens.filter(
          (token) =>
            sanityTokens.includes(
              token,
            ),
        );

      if (!matchedTokens.length) {
        return;
      }

      const denominator =
        Math.max(
          1,
          Math.min(
            projectTokens.length,
            sanityTokens.length,
          ),
        );

      const similarity =
        matchedTokens.length /
        denominator;

      if (
        matchedTokens.length >= 2
      ) {
        score = Math.max(
          score,
          900 +
            matchedTokens.length *
              100 +
            similarity * 500,
        );
      }

      /*
       * One distinctive long keyword can still
       * be useful:
       *
       * semiconductor
       * expressway
       * monorail
       * airport
       */

      if (
        matchedTokens.length === 1
      ) {
        const token =
          matchedTokens[0];

        if (
          token.length >= 7
        ) {
          score = Math.max(
            score,
            650,
          );
        }
      }
    },
  );

  return score;
}

/* =========================================================
   FIND BEST MATCHED SANITY ITEM
========================================================= */

function findBestSanityMatch(
  project,
  sanityItems,
) {
  if (
    !project ||
    !Array.isArray(
      sanityItems,
    ) ||
    !sanityItems.length
  ) {
    return null;
  }

  let bestItem = null;
  let bestScore = 0;

  sanityItems.forEach(
    (item) => {
      const score =
        calculateMatchScore(
          project,
          item,
        );

      if (
        score > bestScore
      ) {
        bestScore = score;
        bestItem = item;
      }
    },
  );

  /*
   * Anything below this level is considered
   * unreliable. In that situation we deliberately
   * use another Sanity image as fallback.
   */

  if (bestScore < 600) {
    return null;
  }

  return bestItem;
}

/* =========================================================
   UNIQUE IMAGE URLS
========================================================= */

function getUniqueImageUrls(
  sanityItems,
) {
  return Array.from(
    new Set(
      sanityItems
        .map(
          (item) =>
            item?.imageUrl,
        )
        .filter(Boolean),
    ),
  );
}

/* =========================================================
   CREATE IMAGE CANDIDATES FOR A PROJECT

   Example:

   TATA card
     ↓
   correct Tata image
     ↓ if failed
   other Sanity image
     ↓ if failed
   another Sanity image
     ↓ etc.

   Therefore, provided Sanity has images, there should
   always be something available for the card.
========================================================= */

function createImageCandidates(
  project,
  projectIndex,
  sanityItems,
) {
  const allUrls =
    getUniqueImageUrls(
      sanityItems,
    );

  if (!allUrls.length) {
    return [];
  }

  const bestMatch =
    findBestSanityMatch(
      project,
      sanityItems,
    );

  /* -------------------------------------------------------
     CORRECT MATCH FOUND
  ------------------------------------------------------- */

  if (bestMatch?.imageUrl) {
    return [
      bestMatch.imageUrl,

      ...allUrls.filter(
        (url) =>
          url !==
          bestMatch.imageUrl,
      ),
    ];
  }

  /* -------------------------------------------------------
     NO CORRECT MATCH

     Use another Sanity image.

     Rotate list based on project index so every unmatched
     card doesn't immediately display the exact same image.
  ------------------------------------------------------- */

  const startIndex =
    projectIndex %
    allUrls.length;

  return [
    ...allUrls.slice(
      startIndex,
    ),

    ...allUrls.slice(
      0,
      startIndex,
    ),
  ];
}

/* =========================================================
   COMPONENT
========================================================= */

export default function MegaProjectsSliderClient({
  projects = [],
}) {
  const projectCount =
    projects.length;

  const initialIndex = 0;

  /* =======================================================
     REFS
  ======================================================= */

  const viewportRef =
    useRef(null);

  const scrollEndTimerRef =
    useRef(null);

  const resumeTimerRef =
    useRef(null);

  const scrollRafRef =
    useRef(null);

  const resizeRafRef =
    useRef(null);

  const activeIndexRef =
    useRef(initialIndex);

  /*
   * 1  = forwards
   * -1 = backwards
   */

  const directionRef =
    useRef(1);

  const dragRef =
    useRef({
      active: false,
      startX: 0,
      scrollLeft: 0,
      moved: false,
    });

  /* =======================================================
     STATE
  ======================================================= */

  const [
    sanityItems,
    setSanityItems,
  ] = useState([]);

  const [
    sanityLoaded,
    setSanityLoaded,
  ] = useState(false);

  /*
   * If an actual CDN image fails,
   * move to the next Sanity image.
   */

  const [
    imageFallbackIndexes,
    setImageFallbackIndexes,
  ] = useState({});

  const [
    activeIndex,
    setActiveIndex,
  ] = useState(initialIndex);

  const [
    isReady,
    setIsReady,
  ] = useState(false);

  const [
    isDragging,
    setIsDragging,
  ] = useState(false);

  const [
    isPaused,
    setIsPaused,
  ] = useState(false);

  const [
    isHovered,
    setIsHovered,
  ] = useState(false);

  const [
    reducedMotion,
    setReducedMotion,
  ] = useState(false);

  /* =======================================================
     LOAD SANITY IMAGES
  ======================================================= */

  useEffect(() => {
    let cancelled = false;

    async function loadSanityImages() {
      try {
        const data =
          await client.fetch(
            SANITY_IMAGES_QUERY,
          );

        if (cancelled) {
          return;
        }

        const validData =
          Array.isArray(data)
            ? data.filter(
                (item) =>
                  item?.imageUrl,
              )
            : [];

        setSanityItems(
          validData,
        );

        /*
         * Useful during development.

         * Open browser console and you can see exactly
         * what Sanity returned.
         */

        console.log(
          "Mega Projects Sanity Images:",
          validData,
        );
      } catch (error) {
        console.error(
          "Mega Projects: Sanity image fetch failed",
          error,
        );

        if (!cancelled) {
          setSanityItems([]);
        }
      } finally {
        if (!cancelled) {
          setSanityLoaded(
            true,
          );
        }
      }
    }

    loadSanityImages();

    return () => {
      cancelled = true;
    };
  }, []);

  /* =======================================================
     ATTACH SANITY IMAGE CANDIDATES TO EVERY PROJECT
  ======================================================= */

  const projectsWithImages =
    useMemo(() => {
      return projects.map(
        (
          project,
          index,
        ) => ({
          ...project,

          imageCandidates:
            createImageCandidates(
              project,
              index,
              sanityItems,
            ),
        }),
      );
    }, [
      projects,
      sanityItems,
    ]);

  /* =======================================================
     THREE COPIES
  ======================================================= */

  const loopedProjects =
    useMemo(() => {
      if (
        !projectsWithImages.length
      ) {
        return [];
      }

      return [
        ...projectsWithImages,
        ...projectsWithImages,
        ...projectsWithImages,
      ];
    }, [
      projectsWithImages,
    ]);

  const middleStart =
    projectCount;

  const middleEnd =
    projectCount > 0
      ? projectCount * 2 - 1
      : 0;

  /* =======================================================
     ACTIVE INDEX
  ======================================================= */

  const updateActiveIndex =
    useCallback(
      (index) => {
        if (!projectCount) {
          return;
        }

        const normalized =
          ((index %
            projectCount) +
            projectCount) %
          projectCount;

        activeIndexRef.current =
          normalized;

        setActiveIndex(
          normalized,
        );
      },
      [projectCount],
    );

  /* =======================================================
     ALL SLIDES
  ======================================================= */

  const getSlides =
    useCallback(() => {
      const viewport =
        viewportRef.current;

      if (!viewport) {
        return [];
      }

      return Array.from(
        viewport.querySelectorAll(
          "[data-mega-project-slide]",
        ),
      );
    }, []);

  /* =======================================================
     SCROLL INTO CENTER
  ======================================================= */

  const scrollToAbsoluteIndex =
    useCallback(
      (
        index,
        smooth = true,
      ) => {
        const viewport =
          viewportRef.current;

        if (!viewport) {
          return;
        }

        const slides =
          getSlides();

        const slide =
          slides[index];

        if (!slide) {
          return;
        }

        const slideCenter =
          slide.offsetLeft +
          slide.offsetWidth /
            2;

        const viewportCenter =
          viewport.clientWidth /
          2;

        const targetLeft =
          slideCenter -
          viewportCenter;

        viewport.scrollTo({
          left: targetLeft,

          behavior:
            smooth &&
            !reducedMotion
              ? "smooth"
              : "auto",
        });
      },
      [
        getSlides,
        reducedMotion,
      ],
    );

  /* =======================================================
     NEAREST CARD
  ======================================================= */

  const getNearestAbsoluteIndex =
    useCallback(() => {
      const viewport =
        viewportRef.current;

      if (
        !viewport ||
        !projectCount
      ) {
        return (
          middleStart +
          initialIndex
        );
      }

      const slides =
        getSlides();

      if (!slides.length) {
        return (
          middleStart +
          initialIndex
        );
      }

      const viewportRect =
        viewport.getBoundingClientRect();

      const viewportCenter =
        viewportRect.left +
        viewportRect.width /
          2;

      let closestIndex = 0;
      let closestDistance =
        Infinity;

      slides.forEach(
        (
          slide,
          index,
        ) => {
          const rect =
            slide.getBoundingClientRect();

          const slideCenter =
            rect.left +
            rect.width / 2;

          const distance =
            Math.abs(
              slideCenter -
                viewportCenter,
            );

          if (
            distance <
            closestDistance
          ) {
            closestDistance =
              distance;

            closestIndex =
              index;
          }
        },
      );

      return closestIndex;
    }, [
      getSlides,
      initialIndex,
      middleStart,
      projectCount,
    ]);

  /* =======================================================
     FINALIZE SCROLL
  ======================================================= */

  const finalizeScroll =
    useCallback(() => {
      if (!projectCount) {
        return;
      }

      const absoluteIndex =
        getNearestAbsoluteIndex();

      const realIndex =
        ((absoluteIndex %
          projectCount) +
          projectCount) %
        projectCount;

      updateActiveIndex(
        realIndex,
      );

      if (realIndex === 0) {
        directionRef.current =
          1;
      }

      if (
        realIndex ===
        projectCount - 1
      ) {
        directionRef.current =
          -1;
      }
    }, [
      getNearestAbsoluteIndex,
      projectCount,
      updateActiveIndex,
    ]);

  /* =======================================================
     PAUSE
  ======================================================= */

  const pauseAutoplay =
    useCallback(
      (
        delay = RESUME_DELAY,
      ) => {
        window.clearTimeout(
          resumeTimerRef.current,
        );

        setIsPaused(true);

        if (delay === null) {
          return;
        }

        resumeTimerRef.current =
          window.setTimeout(
            () => {
              setIsPaused(
                false,
              );
            },
            delay,
          );
      },
      [],
    );

  /* =======================================================
     PREVIOUS
  ======================================================= */

  const handlePrevious =
    useCallback(() => {
      if (!projectCount) {
        return;
      }

      pauseAutoplay();

      const current =
        activeIndexRef.current;

      const target =
        Math.max(
          0,
          current - 1,
        );

      directionRef.current =
        target === 0
          ? 1
          : -1;

      updateActiveIndex(
        target,
      );

      scrollToAbsoluteIndex(
        middleStart +
          target,
        true,
      );
    }, [
      middleStart,
      pauseAutoplay,
      projectCount,
      scrollToAbsoluteIndex,
      updateActiveIndex,
    ]);

  /* =======================================================
     NEXT
  ======================================================= */

  const handleNext =
    useCallback(() => {
      if (!projectCount) {
        return;
      }

      pauseAutoplay();

      const current =
        activeIndexRef.current;

      const lastIndex =
        projectCount - 1;

      const target =
        Math.min(
          lastIndex,
          current + 1,
        );

      directionRef.current =
        target === lastIndex
          ? -1
          : 1;

      updateActiveIndex(
        target,
      );

      scrollToAbsoluteIndex(
        middleStart +
          target,
        true,
      );
    }, [
      middleStart,
      pauseAutoplay,
      projectCount,
      scrollToAbsoluteIndex,
      updateActiveIndex,
    ]);

  /* =======================================================
     DOT CLICK
  ======================================================= */

  const goToProject =
    useCallback(
      (index) => {
        if (!projectCount) {
          return;
        }

        pauseAutoplay();

        const current =
          activeIndexRef.current;

        if (index > current) {
          directionRef.current =
            1;
        } else if (
          index < current
        ) {
          directionRef.current =
            -1;
        }

        if (index === 0) {
          directionRef.current =
            1;
        }

        if (
          index ===
          projectCount - 1
        ) {
          directionRef.current =
            -1;
        }

        updateActiveIndex(
          index,
        );

        scrollToAbsoluteIndex(
          middleStart +
            index,
          true,
        );
      },
      [
        middleStart,
        pauseAutoplay,
        projectCount,
        scrollToAbsoluteIndex,
        updateActiveIndex,
      ],
    );

  /* =======================================================
     SCROLL
  ======================================================= */

  const handleScroll =
    useCallback(() => {
      if (!projectCount) {
        return;
      }

      window.clearTimeout(
        scrollEndTimerRef.current,
      );

      if (
        !scrollRafRef.current
      ) {
        scrollRafRef.current =
          window.requestAnimationFrame(
            () => {
              const absoluteIndex =
                getNearestAbsoluteIndex();

              const realIndex =
                ((absoluteIndex %
                  projectCount) +
                  projectCount) %
                projectCount;

              updateActiveIndex(
                realIndex,
              );

              scrollRafRef.current =
                null;
            },
          );
      }

      scrollEndTimerRef.current =
        window.setTimeout(
          finalizeScroll,
          SCROLL_END_DELAY,
        );
    }, [
      finalizeScroll,
      getNearestAbsoluteIndex,
      projectCount,
      updateActiveIndex,
    ]);

  /* =======================================================
     DRAG
  ======================================================= */

  const handlePointerDown =
    useCallback(
      (event) => {
        if (
          event.target.closest?.(
            "a, button",
          )
        ) {
          pauseAutoplay();

          return;
        }

        pauseAutoplay(null);

        if (
          event.pointerType !==
          "mouse"
        ) {
          return;
        }

        const viewport =
          viewportRef.current;

        if (!viewport) {
          return;
        }

        dragRef.current = {
          active: true,
          startX:
            event.clientX,
          scrollLeft:
            viewport.scrollLeft,
          moved: false,
        };

        setIsDragging(true);

        try {
          event.currentTarget.setPointerCapture(
            event.pointerId,
          );
        } catch {}
      },
      [pauseAutoplay],
    );

  const handlePointerMove =
    useCallback(
      (event) => {
        if (
          event.pointerType !==
            "mouse" ||
          !dragRef.current
            .active
        ) {
          return;
        }

        const viewport =
          viewportRef.current;

        if (!viewport) {
          return;
        }

        const movement =
          event.clientX -
          dragRef.current
            .startX;

        if (
          Math.abs(
            movement,
          ) > 4
        ) {
          dragRef.current.moved =
            true;
        }

        viewport.scrollLeft =
          dragRef.current
            .scrollLeft -
          movement;
      },
      [],
    );

  const handlePointerEnd =
    useCallback(
      (event) => {
        if (
          event.pointerType ===
            "mouse" &&
          dragRef.current
            .active
        ) {
          dragRef.current.active =
            false;

          setIsDragging(false);

          try {
            if (
              event.currentTarget.hasPointerCapture(
                event.pointerId,
              )
            ) {
              event.currentTarget.releasePointerCapture(
                event.pointerId,
              );
            }
          } catch {}

          if (
            dragRef.current
              .moved
          ) {
            window.requestAnimationFrame(
              () => {
                const nearest =
                  getNearestAbsoluteIndex();

                scrollToAbsoluteIndex(
                  nearest,
                  true,
                );
              },
            );
          }
        }

        pauseAutoplay();
      },
      [
        getNearestAbsoluteIndex,
        pauseAutoplay,
        scrollToAbsoluteIndex,
      ],
    );

  /* =======================================================
     WHEEL
  ======================================================= */

  const handleWheel =
    useCallback(
      (event) => {
        if (
          Math.abs(
            event.deltaX,
          ) >
          Math.abs(
            event.deltaY,
          )
        ) {
          pauseAutoplay();
        }
      },
      [pauseAutoplay],
    );

  /* =======================================================
     KEYBOARD
  ======================================================= */

  const handleKeyDown =
    useCallback(
      (event) => {
        if (
          event.key ===
          "ArrowLeft"
        ) {
          event.preventDefault();
          handlePrevious();
        }

        if (
          event.key ===
          "ArrowRight"
        ) {
          event.preventDefault();
          handleNext();
        }
      },
      [
        handleNext,
        handlePrevious,
      ],
    );

  /* =======================================================
     REDUCED MOTION
  ======================================================= */

  useEffect(() => {
    const media =
      window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      );

    const updateMotion =
      () => {
        setReducedMotion(
          media.matches,
        );
      };

    updateMotion();

    media.addEventListener?.(
      "change",
      updateMotion,
    );

    return () => {
      media.removeEventListener?.(
        "change",
        updateMotion,
      );
    };
  }, []);

  /* =======================================================
     INITIAL POSITION
  ======================================================= */

  useEffect(() => {
    if (!projectCount) {
      return;
    }

    const frame =
      window.requestAnimationFrame(
        () => {
          directionRef.current =
            1;

          scrollToAbsoluteIndex(
            middleStart,
            false,
          );

          updateActiveIndex(0);

          setIsReady(true);
        },
      );

    return () =>
      window.cancelAnimationFrame(
        frame,
      );
  }, [
    middleStart,
    projectCount,
    scrollToAbsoluteIndex,
    updateActiveIndex,
  ]);

  /* =======================================================
     RESIZE
  ======================================================= */

  useEffect(() => {
    const viewport =
      viewportRef.current;

    if (
      !viewport ||
      !projectCount
    ) {
      return;
    }

    const handleResize =
      () => {
        if (
          resizeRafRef.current
        ) {
          window.cancelAnimationFrame(
            resizeRafRef.current,
          );
        }

        resizeRafRef.current =
          window.requestAnimationFrame(
            () => {
              scrollToAbsoluteIndex(
                middleStart +
                  activeIndexRef.current,
                false,
              );

              resizeRafRef.current =
                null;
            },
          );
      };

    let observer;

    if (
      typeof ResizeObserver !==
      "undefined"
    ) {
      observer =
        new ResizeObserver(
          handleResize,
        );

      observer.observe(
        viewport,
      );
    } else {
      window.addEventListener(
        "resize",
        handleResize,
      );
    }

    return () => {
      observer?.disconnect();

      window.removeEventListener(
        "resize",
        handleResize,
      );

      if (
        resizeRafRef.current
      ) {
        window.cancelAnimationFrame(
          resizeRafRef.current,
        );
      }
    };
  }, [
    middleStart,
    projectCount,
    scrollToAbsoluteIndex,
  ]);

  /* =======================================================
     PING-PONG AUTOPLAY
  ======================================================= */

  useEffect(() => {
    if (
      !projectCount ||
      !isReady ||
      isPaused ||
      isDragging ||
      isHovered ||
      reducedMotion ||
      projectCount <= 1
    ) {
      return;
    }

    const timer =
      window.setTimeout(
        () => {
          const lastIndex =
            projectCount - 1;

          const current =
            activeIndexRef.current;

          let direction =
            directionRef.current;

          if (
            current >=
            lastIndex
          ) {
            direction = -1;
          }

          if (
            current <= 0
          ) {
            direction = 1;
          }

          directionRef.current =
            direction;

          const nextIndex =
            Math.max(
              0,
              Math.min(
                lastIndex,
                current +
                  direction,
              ),
            );

          updateActiveIndex(
            nextIndex,
          );

          scrollToAbsoluteIndex(
            middleStart +
              nextIndex,
            true,
          );
        },
        AUTOPLAY_DELAY,
      );

    return () =>
      window.clearTimeout(
        timer,
      );
  }, [
    activeIndex,
    isDragging,
    isHovered,
    isPaused,
    isReady,
    middleStart,
    projectCount,
    reducedMotion,
    scrollToAbsoluteIndex,
    updateActiveIndex,
  ]);

  /* =======================================================
     CLEANUP
  ======================================================= */

  useEffect(() => {
    return () => {
      window.clearTimeout(
        scrollEndTimerRef.current,
      );

      window.clearTimeout(
        resumeTimerRef.current,
      );

      if (
        scrollRafRef.current
      ) {
        window.cancelAnimationFrame(
          scrollRafRef.current,
        );
      }

      if (
        resizeRafRef.current
      ) {
        window.cancelAnimationFrame(
          resizeRafRef.current,
        );
      }
    };
  }, []);

  if (!projectCount) {
    return null;
  }

  /* =======================================================
     UI
  ======================================================= */

  return (
    <section
      className="relative overflow-hidden bg-[#FDFCF8] site-gutter section-space"
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

      <div className="relative mx-auto w-full max-w-[1500px]">

        {/* HEADING */}

        <div className="mx-auto mb-6 max-w-3xl px-5 text-center sm:mb-11 lg:mb-12">
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

          <div className="mt-3 h-1 w-14 rounded-full bg-[#F6C343] sm:mx-auto" />

        </div>

        {/* SLIDER */}

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
            onKeyDown={
              handleKeyDown
            }
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
                absoluteIndex,
              ) => {
                const realIndex =
                  absoluteIndex %
                  projectCount;

                const isActive =
                  realIndex ===
                  activeIndex;

                const isMiddleCopy =
                  absoluteIndex >=
                    middleStart &&
                  absoluteIndex <=
                    middleEnd;

                const candidateIndex =
                  imageFallbackIndexes[
                    realIndex
                  ] || 0;

                const candidates =
                  project.imageCandidates ||
                  [];

                const imageUrl =
                  candidates.length
                    ? candidates[
                        candidateIndex %
                          candidates.length
                      ]
                    : null;

                const priorityImage =
                  isMiddleCopy &&
                  realIndex <= 2;

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
                      {/* IMAGE */}

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
                        {imageUrl ? (
                          <Image
                            key={`${realIndex}-${imageUrl}`}
                            src={imageUrl}
                            alt={project.title}
                            fill
                            priority={
                              priorityImage
                            }
                            quality={85}
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
                            onError={() => {
                              /*
                               * Current Sanity image failed.
                               * Automatically try another Sanity image.
                               */

                              setImageFallbackIndexes(
                                (previous) => {
                                  const current =
                                    previous[
                                      realIndex
                                    ] || 0;

                                  if (
                                    current >=
                                    candidates.length -
                                      1
                                  ) {
                                    return previous;
                                  }

                                  return {
                                    ...previous,

                                    [realIndex]:
                                      current +
                                      1,
                                  };
                                },
                              );
                            }}
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
                              px-5
                              text-center
                            "
                          >
                            <span className="text-xs font-medium text-[#788394]">
                              {sanityLoaded
                                ? "No Sanity images found"
                                : "Loading image..."}
                            </span>
                          </div>
                        )}

                        {imageUrl && (
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
                        )}
                      </div>

                      {/* CONTENT */}

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
                          {
                            project.title
                          }
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
                          {
                            project.description
                          }
                        </p>

                        <div className="mt-auto pt-5">
                          <Link
                            href={
                              project.href
                            }
                            prefetch
                            aria-label={`Read more about ${project.title}`}
                            onPointerDown={(
                              event,
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
              },
            )}
          </div>

          {/* CONTROLS */}

          <div className="mt-3 flex items-center justify-center gap-3 px-5 sm:mt-5">
            <button
              type="button"
              onClick={
                handlePrevious
              }
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
                          index,
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
                },
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
        </div>
      </div>
    </section>
  );
}