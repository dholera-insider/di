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

import { client } from "@/sanity/lib/client";

/* SLIDER SETTINGS */

const AUTOPLAY_DELAY = 1700;
const RESUME_DELAY = 2000;
const SCROLL_END_DELAY = 110;

/* SANITY QUERY */

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

/* NORMALIZE TEXT */

function normalizeText(value = "") {
  return String(value)
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[–—-]/g, " ")
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/* NORMALIZE SLUG */

function normalizeSlug(value = "") {
  return String(value)
    .toLowerCase()
    .replace(/^\/+|\/+$/g, "")
    .trim();
}

/* GET SLUG FROM PROJECT HREF */

function getHrefSlug(href = "") {
  if (!href) return "";

  try {
    const cleanHref = String(href)
      .split("?")[0]
      .split("#")[0]
      .replace(/\/+$/, "");

    const parts = cleanHref.split("/");

    return normalizeSlug(parts[parts.length - 1] || "");
  } catch {
    return "";
  }
}

/* STOP WORDS */

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
    .filter((word) => word && word.length > 2 && !STOP_WORDS.has(word));
}

/* BUILT-IN IMAGE TITLE ALIASES */

const DEFAULT_PROJECT_ALIASES = {
  [normalizeText("ABCD Building")]: [
    "ABCD Building",
    "ABCD Building Dholera",
    "ABCD Building Dholera SIR",
    "ABCD Building in Dholera",
    "Administrative Business Centre Dholera",
    "Administrative and Business Centre Dholera",
  ],

  [normalizeText("TATA Electronics Semiconductor Fab")]: [
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

  [normalizeText("Dholera International Airport")]: [
    "Dholera International Airport",
    "Dholera International Airport Project",
    "Dholera International Airport Project Update 2025",
    "Dholera Airport",
    "Dholera Airport Project",
    "International Airport Dholera",
  ],

  [normalizeText("Ahmedabad–Dholera Expressway")]: [
    "Ahmedabad Dholera Expressway",
    "Ahmedabad-Dholera Expressway",
    "Ahmedabad–Dholera Expressway",
    "Ahmedabad Dholera Expressway Transforming Gujarat Connectivity",
    "Dholera Expressway",
    "Ahmedabad Dholera Highway",
  ],

  [normalizeText("High-Speed Monorail & Railway")]: [
    "High Speed Monorail and Railway",
    "High-Speed Monorail & Railway",
    "Dholera Railway",
    "Dholera Rail Connectivity",
    "Dholera Railway Connectivity",
    "Ahmedabad Dholera Railway",
    "Dholera Monorail",
    "Railway Dholera",
  ],

  [normalizeText("Dholera Solar Park")]: [
    "Dholera Solar Park",
    "Solar Park Dholera",
    "Renewable Energy Solar Park in Dholera",
    "Dholera Renewable Energy Solar Park",
    "Renewable Energy Dholera",
  ],

  [normalizeText("Water Treatment Plant")]: [
    "Water Treatment Plant",
    "Dholera Water Treatment Plant",
    "Water Treatment Plant Dholera",
    "Dholera Water Infrastructure",
    "Dholera Smart City Water Scarcity Solutions",
  ],

  [normalizeText("ReNew Power & Activation Area")]: [
    "ReNew Power and Activation Area",
    "Renew Power and Activation Area",
    "ReNew Power Dholera",
    "Renew Power Dholera",
    "Dholera Activation Area",
    "Activation Area Dholera",
    "ReNew Power",
  ],

  [normalizeText("Dholera Sea Port")]: [
    "Dholera Sea Port",
    "Dholera Seaport",
    "Dholera Port",
    "Dholera Sea Port Connectivity Growth",
    "Dholera Port Connectivity",
    "Sea Port Dholera",
  ],
};

/* GET EVERY POSSIBLE PROJECT TITLE */

function getProjectSearchTitles(project) {
  if (!project) return [];

  const normalizedProjectTitle = normalizeText(project.title);

  const builtInAliases = DEFAULT_PROJECT_ALIASES[normalizedProjectTitle] || [];

  const customAliases = Array.isArray(project.imageMatchTitles)
    ? project.imageMatchTitles
    : [];

  return [project.title, ...customAliases, ...builtInAliases]
    .filter(Boolean)
    .map(normalizeText)
    .filter(Boolean)
    .filter((value, index, array) => array.indexOf(value) === index);
}

/* CALCULATE SANITY MATCH SCORE */

function calculateMatchScore(project, sanityItem) {
  if (!project || !sanityItem?.imageUrl) {
    return 0;
  }

  const projectSlug = getHrefSlug(project.href);

  const sanitySlug = normalizeSlug(sanityItem.slug);

  const sanityTitle = normalizeText(sanityItem.title);

  const searchTitles = getProjectSearchTitles(project);

  let score = 0;

  /* EXACT SLUG */

  if (projectSlug && sanitySlug && projectSlug === sanitySlug) {
    score = Math.max(score, 3000);
  }

  /* PARTIAL SLUG */

  if (projectSlug && sanitySlug && projectSlug !== sanitySlug) {
    if (projectSlug.includes(sanitySlug) || sanitySlug.includes(projectSlug)) {
      score = Math.max(score, 2200);
    }
  }

  /* EXACT TITLE */

  searchTitles.forEach((searchTitle) => {
    if (sanityTitle && sanityTitle === searchTitle) {
      score = Math.max(score, 2800);
    }
  });

  /* TITLE CONTAINS ALIAS */

  searchTitles.forEach((searchTitle) => {
    if (!searchTitle || !sanityTitle) {
      return;
    }

    if (
      sanityTitle.includes(searchTitle) ||
      searchTitle.includes(sanityTitle)
    ) {
      score = Math.max(score, 1900);
    }
  });

  /* KEYWORD / TOKEN MATCH */

  const sanityTokens = getTokens(sanityItem.title);

  searchTitles.forEach((searchTitle) => {
    const projectTokens = getTokens(searchTitle);

    if (!projectTokens.length || !sanityTokens.length) {
      return;
    }

    const matchedTokens = projectTokens.filter((token) =>
      sanityTokens.includes(token),
    );

    if (!matchedTokens.length) {
      return;
    }

    const denominator = Math.max(
      1,
      Math.min(projectTokens.length, sanityTokens.length),
    );

    const similarity = matchedTokens.length / denominator;

    if (matchedTokens.length >= 2) {
      score = Math.max(
        score,
        900 + matchedTokens.length * 100 + similarity * 500,
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

    if (matchedTokens.length === 1) {
      const token = matchedTokens[0];

      if (token.length >= 7) {
        score = Math.max(score, 650);
      }
    }
  });

  return score;
}

/* FIND BEST MATCHED SANITY ITEM */

function findBestSanityMatch(project, sanityItems) {
  if (!project || !Array.isArray(sanityItems) || !sanityItems.length) {
    return null;
  }

  let bestItem = null;
  let bestScore = 0;

  sanityItems.forEach((item) => {
    const score = calculateMatchScore(project, item);

    if (score > bestScore) {
      bestScore = score;
      bestItem = item;
    }
  });

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

/* UNIQUE IMAGE URLS */

function getUniqueImageUrls(sanityItems) {
  return Array.from(
    new Set(sanityItems.map((item) => item?.imageUrl).filter(Boolean)),
  );
}

/* CREATE IMAGE CANDIDATES FOR A PROJECT */

function createImageCandidates(project, projectIndex, sanityItems) {
  const allUrls = getUniqueImageUrls(sanityItems);

  if (!allUrls.length) {
    return [];
  }

  const bestMatch = findBestSanityMatch(project, sanityItems);

  /* CORRECT MATCH FOUND */

  if (bestMatch?.imageUrl) {
    return [
      bestMatch.imageUrl,

      ...allUrls.filter((url) => url !== bestMatch.imageUrl),
    ];
  }

  /* NO CORRECT MATCH */

  const startIndex = projectIndex % allUrls.length;

  return [...allUrls.slice(startIndex), ...allUrls.slice(0, startIndex)];
}

/* COMPONENT */

export default function MegaProjectsSliderClient({ projects = [] }) {
  const projectCount = projects.length;

  const initialIndex = 0;

  /* REFS AND STATE */
  const viewportRef = useRef(null);
  const scrollEndTimerRef = useRef(null);
  const resumeTimerRef = useRef(null);
  const scrollRafRef = useRef(null);
  const resizeRafRef = useRef(null);
  const activeIndexRef = useRef(initialIndex);
  const scrollStopsRef = useRef([]);
  const targetIndexRef = useRef(null);
  const directionRef = useRef(1);
  const reducedMotionRef = useRef(false);
  const dragRef = useRef({
    active: false,
    startX: 0,
    scrollLeft: 0,
    moved: false,
  });

  const [sanityItems, setSanityItems] = useState([]);
  const [sanityLoaded, setSanityLoaded] = useState(false);
  const [imageFallbackIndexes, setImageFallbackIndexes] = useState({});
  const [activeIndex, setActiveIndex] = useState(initialIndex);
  const [scrollStops, setScrollStops] = useState([]);
  const [isReady, setIsReady] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isMoving, setIsMoving] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  const stopCount = scrollStops.length;

  /* LOAD SANITY IMAGES */

  useEffect(() => {
    let cancelled = false;

    async function loadSanityImages() {
      try {
        const data = await client.fetch(SANITY_IMAGES_QUERY);

        if (cancelled) {
          return;
        }

        const validData = Array.isArray(data)
          ? data.filter((item) => item?.imageUrl)
          : [];

        setSanityItems(validData);

        /*
         * Useful during development.

         * Open browser console and you can see exactly
         * what Sanity returned.
         */

        // console.log("Mega Projects Sanity Images:", validData);
      } catch (error) {
        console.error("Mega Projects: Sanity image fetch failed", error);

        if (!cancelled) {
          setSanityItems([]);
        }
      } finally {
        if (!cancelled) {
          setSanityLoaded(true);
        }
      }
    }

    loadSanityImages();

    return () => {
      cancelled = true;
    };
  }, []);

  /* ATTACH SANITY IMAGE CANDIDATES TO EVERY PROJECT */

  const projectsWithImages = useMemo(() => {
    return projects.map((project, index) => ({
      ...project,

      imageCandidates: createImageCandidates(project, index, sanityItems),
    }));
  }, [projects, sanityItems]);

  /* SIDE COPIES FILL THE SPACE AROUND THE CENTERED ORIGINAL CARDS */
  const renderedProjects = useMemo(() => {
    const originals = projectsWithImages.map((project, realIndex) => ({
      project,
      realIndex,
      isPreview: false,
      copy: "original",
    }));

    if (originals.length <= 1) return originals;

    return [
      ...originals.map((item) => ({
        ...item,
        isPreview: true,
        copy: "before",
      })),
      ...originals,
      ...originals.map((item) => ({ ...item, isPreview: true, copy: "after" })),
    ];
  }, [projectsWithImages]);

  /* NAVIGATION USES ONLY THE ORIGINAL PROJECTS */
  const updateActiveIndex = useCallback((index) => {
    const next = Math.max(
      0,
      Math.min(scrollStopsRef.current.length - 1, index),
    );
    activeIndexRef.current = next;
    setActiveIndex(next);
  }, []);

  const getSlides = useCallback(() => {
    return Array.from(
      viewportRef.current?.querySelectorAll("[data-mega-project-slide]") || [],
    );
  }, []);

  /* FIND THE ORIGINAL CARD NEAREST THE CENTER */
  const getNearestIndex = useCallback(() => {
    const viewport = viewportRef.current;
    if (!viewport) return 0;
    let nearest = 0;
    let smallestDistance = Infinity;
    scrollStopsRef.current.forEach((stop, index) => {
      const distance = Math.abs(stop.left - viewport.scrollLeft);
      if (distance < smallestDistance) {
        smallestDistance = distance;
        nearest = index;
      }
    });
    return nearest;
  }, []);

  /* SETTLE BEFORE STARTING THE NEXT AUTOPLAY DELAY */
  const finalizeScroll = useCallback(() => {
    if (!projectCount || dragRef.current.active) return;
    window.clearTimeout(scrollEndTimerRef.current);
    const index = getNearestIndex();
    updateActiveIndex(index);
    targetIndexRef.current = null;
    setIsMoving(false);
    if (index === 0) directionRef.current = 1;
    else if (index === scrollStopsRef.current.length - 1)
      directionRef.current = -1;
  }, [getNearestIndex, projectCount, updateActiveIndex]);

  const scrollToPosition = useCallback(
    (index, smooth = true) => {
      const viewport = viewportRef.current;
      const stops = scrollStopsRef.current;
      const target = Math.max(0, Math.min(stops.length - 1, index));
      const stop = stops[target];
      if (!viewport || !stop) return;
      const left = stop.left;

      window.clearTimeout(scrollEndTimerRef.current);
      targetIndexRef.current = target;

      if (Math.abs(viewport.scrollLeft - left) <= 1) {
        updateActiveIndex(target);
        targetIndexRef.current = null;
        setIsMoving(false);
        return;
      }

      setIsMoving(true);
      viewport.scrollTo({
        left,
        behavior: smooth && !reducedMotionRef.current ? "smooth" : "instant",
      });
      scrollEndTimerRef.current = window.setTimeout(
        finalizeScroll,
        SCROLL_END_DELAY,
      );
    },
    [finalizeScroll, updateActiveIndex],
  );

  /* PAUSE AFTER MANUAL INTERACTION */
  const pauseAutoplay = useCallback((delay = RESUME_DELAY) => {
    window.clearTimeout(resumeTimerRef.current);
    setIsPaused(true);
    if (delay !== null) {
      resumeTimerRef.current = window.setTimeout(
        () => setIsPaused(false),
        delay,
      );
    }
  }, []);

  /* ARROWS NEVER WRAP AROUND */
  const handlePrevious = useCallback(() => {
    const current = targetIndexRef.current ?? activeIndexRef.current;
    if (!isReady || current <= 0) return;
    pauseAutoplay();
    const target = current - 1;
    directionRef.current = target === 0 ? 1 : -1;
    scrollToPosition(target);
  }, [isReady, pauseAutoplay, scrollToPosition]);

  const handleNext = useCallback(() => {
    const current = targetIndexRef.current ?? activeIndexRef.current;
    const lastIndex = scrollStopsRef.current.length - 1;
    if (!isReady || current >= lastIndex) return;
    pauseAutoplay();
    const target = current + 1;
    directionRef.current = target === lastIndex ? -1 : 1;
    scrollToPosition(target);
  }, [isReady, pauseAutoplay, scrollToPosition]);

  const goToPosition = useCallback(
    (index) => {
      const count = scrollStopsRef.current.length;
      if (!isReady || index < 0 || index >= count) return;
      pauseAutoplay();
      const current = targetIndexRef.current ?? activeIndexRef.current;
      if (index !== current) directionRef.current = index > current ? 1 : -1;
      if (index === 0) directionRef.current = 1;
      else if (index === count - 1) directionRef.current = -1;
      scrollToPosition(index);
    },
    [isReady, pauseAutoplay, scrollToPosition],
  );

  /* TRACK THE VISIBLE ROW DURING SCROLLING */
  const handleScroll = useCallback(() => {
    if (!projectCount) return;
    const viewport = viewportRef.current;
    const stops = scrollStopsRef.current;
    if (viewport && stops.length) {
      const boundedLeft = Math.max(
        stops[0].left,
        Math.min(stops[stops.length - 1].left, viewport.scrollLeft),
      );
      if (Math.abs(viewport.scrollLeft - boundedLeft) > 1) {
        viewport.scrollTo({ left: boundedLeft, behavior: "instant" });
      }
    }
    setIsMoving(true);
    window.clearTimeout(scrollEndTimerRef.current);
    if (scrollRafRef.current === null) {
      scrollRafRef.current = window.requestAnimationFrame(() => {
        const nearest = getNearestIndex();
        if (
          targetIndexRef.current === null &&
          nearest !== activeIndexRef.current
        ) {
          directionRef.current = nearest > activeIndexRef.current ? 1 : -1;
        }
        updateActiveIndex(nearest);
        scrollRafRef.current = null;
      });
    }
    scrollEndTimerRef.current = window.setTimeout(
      finalizeScroll,
      SCROLL_END_DELAY,
    );
  }, [finalizeScroll, getNearestIndex, projectCount, updateActiveIndex]);

  /* MOUSE DRAG AND NATIVE TOUCH SWIPING */
  const handlePointerDown = useCallback(
    (event) => {
      if (event.pointerType === "mouse" && event.button !== 0) return;
      if (event.target.closest?.("a, button")) {
        pauseAutoplay();
        return;
      }
      pauseAutoplay(null);
      targetIndexRef.current = null;
      if (event.pointerType !== "mouse") return;
      const viewport = viewportRef.current;
      if (!viewport) return;
      dragRef.current = {
        active: true,
        startX: event.clientX,
        scrollLeft: viewport.scrollLeft,
        moved: false,
      };
      setIsDragging(true);
    },
    [pauseAutoplay],
  );

  const handlePointerMove = useCallback((event) => {
    if (event.pointerType !== "mouse" || !dragRef.current.active) return;
    const viewport = viewportRef.current;
    if (!viewport) return;
    const movement = event.clientX - dragRef.current.startX;
    if (Math.abs(movement) > 4 && !dragRef.current.moved) {
      dragRef.current.moved = true;
      try {
        event.currentTarget.setPointerCapture(event.pointerId);
      } catch {}
    }
    if (dragRef.current.moved) {
      const stops = scrollStopsRef.current;
      const minimum = stops[0]?.left ?? 0;
      const maximum =
        stops[stops.length - 1]?.left ??
        viewport.scrollWidth - viewport.clientWidth;
      viewport.scrollLeft = Math.max(
        minimum,
        Math.min(maximum, dragRef.current.scrollLeft - movement),
      );
    }
  }, []);

  const handlePointerEnd = useCallback(
    (event) => {
      const wasDragging = dragRef.current.active;
      dragRef.current.active = false;
      setIsDragging(false);
      try {
        if (event.currentTarget.hasPointerCapture(event.pointerId)) {
          event.currentTarget.releasePointerCapture(event.pointerId);
        }
      } catch {}
      if (wasDragging) {
        const nearest = getNearestIndex();
        scrollToPosition(nearest);
      }
      pauseAutoplay();
    },
    [getNearestIndex, pauseAutoplay, scrollToPosition],
  );

  const handleWheel = useCallback(
    (event) => {
      if (Math.abs(event.deltaX) > Math.abs(event.deltaY)) {
        targetIndexRef.current = null;
        pauseAutoplay();
      }
    },
    [pauseAutoplay],
  );

  const handleKeyDown = useCallback(
    (event) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        handlePrevious();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        handleNext();
      }
    },
    [handleNext, handlePrevious],
  );

  /* RESPECT REDUCED MOTION */
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      reducedMotionRef.current = media.matches;
      setReducedMotion(media.matches);
    };
    update();
    media.addEventListener?.("change", update);
    return () => media.removeEventListener?.("change", update);
  }, []);

  /* CENTER THE ACTIVE CARD AND USE SIDE COPIES TO FILL THE EDGES */
  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport || !projectCount) return;

    const measurePositions = () => {
      const slides = getSlides();
      if (!slides.length) return;
      const padding =
        parseFloat(window.getComputedStyle(viewport).paddingLeft) || 0;
      const singleCardSpace =
        projectCount === 1
          ? Math.max(
              0,
              (viewport.clientWidth - slides[0].offsetWidth) / 2 - padding,
            )
          : 0;
      viewport.style.setProperty("--mega-single-edge", `${singleCardSpace}px`);
      const viewportRect = viewport.getBoundingClientRect();
      const maximum = Math.max(0, viewport.scrollWidth - viewport.clientWidth);
      const stops = slides.map((slide, projectIndex) => {
        const rect = slide.getBoundingClientRect();
        const left = Math.max(
          0,
          Math.min(
            maximum,
            viewport.scrollLeft +
              rect.left -
              viewportRect.left -
              viewport.clientLeft +
              rect.width / 2 -
              viewport.clientWidth / 2,
          ),
        );
        return { left, projectIndex };
      });

      scrollStopsRef.current = stops;
      setScrollStops(stops);
      const index = Math.max(
        0,
        Math.min(activeIndexRef.current, stops.length - 1),
      );
      scrollToPosition(index, false);
      updateActiveIndex(index);
      setIsReady(true);
    };

    const scheduleMeasurement = () => {
      if (resizeRafRef.current !== null)
        window.cancelAnimationFrame(resizeRafRef.current);
      resizeRafRef.current = window.requestAnimationFrame(() => {
        resizeRafRef.current = null;
        measurePositions();
      });
    };

    scheduleMeasurement();
    const observer =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(scheduleMeasurement)
        : null;
    observer?.observe(viewport);
    window.addEventListener("resize", scheduleMeasurement);
    return () => {
      observer?.disconnect();
      window.removeEventListener("resize", scheduleMeasurement);
      if (resizeRafRef.current !== null)
        window.cancelAnimationFrame(resizeRafRef.current);
    };
  }, [getSlides, projectCount, scrollToPosition, updateActiveIndex]);

  /* 1 -> 2 -> ... -> LAST -> ... -> 2 -> 1 */
  useEffect(() => {
    if (
      stopCount <= 1 ||
      !isReady ||
      isMoving ||
      isPaused ||
      isDragging ||
      isHovered ||
      isFocused ||
      reducedMotion
    )
      return;
    const timer = window.setTimeout(() => {
      const current = activeIndexRef.current;
      if (current === scrollStopsRef.current.length - 1)
        directionRef.current = -1;
      else if (current === 0) directionRef.current = 1;
      scrollToPosition(current + directionRef.current);
    }, AUTOPLAY_DELAY);
    return () => window.clearTimeout(timer);
  }, [
    activeIndex,
    isDragging,
    isFocused,
    isHovered,
    isMoving,
    isPaused,
    isReady,
    stopCount,
    reducedMotion,
    scrollToPosition,
  ]);

  /* CLEANUP */
  useEffect(
    () => () => {
      window.clearTimeout(scrollEndTimerRef.current);
      window.clearTimeout(resumeTimerRef.current);
      if (scrollRafRef.current !== null)
        window.cancelAnimationFrame(scrollRafRef.current);
      if (resizeRafRef.current !== null)
        window.cancelAnimationFrame(resizeRafRef.current);
    },
    [],
  );

  if (!projectCount) return null;

  /* UI */

  return (
    <section
      className="relative overflow-hidden bg-[#FDFCF8] site-gutter section-space"
      aria-labelledby="mega-projects-heading"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#F6C343]/[0.035] to-transparent"
      />

      <div className="relative mx-auto w-full max-w-[1500px]">
        {/* HEADING */}

        <div className="mx-auto mb-6 max-w-3xl px-5 text-center sm:mb-11 lg:mb-12">
          <h2
            id="mega-projects-heading"
            className="text-left text-[30px] font-semibold leading-[1.12] tracking-[-0.035em] text-[#071A3A] sm:text-center sm:text-4xl lg:text-[44px]"
          >
            Mega Projects in Dholera Smart City
          </h2>

          <div className="mt-3 h-1 w-14 rounded-full bg-[#F6C343] sm:mx-auto" />
        </div>

        {/* SLIDER */}

        <div
          className="relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div
            ref={viewportRef}
            role="region"
            aria-roledescription="carousel"
            aria-label="Dholera mega projects"
            tabIndex={0}
            onScroll={handleScroll}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerEnd}
            onPointerCancel={handlePointerEnd}
            onLostPointerCapture={(event) => {
              if (dragRef.current.active) handlePointerEnd(event);
            }}
            onPointerLeave={(event) => {
              if (dragRef.current.active && !dragRef.current.moved)
                handlePointerEnd(event);
            }}
            onWheel={handleWheel}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsFocused(true)}
            onBlur={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget)) {
                setIsFocused(false);
                pauseAutoplay();
              }
            }}
            className={`flex w-full items-stretch gap-4 overflow-x-auto overscroll-x-contain px-5 py-6 outline-none sm:gap-5 sm:px-7 lg:gap-6 lg:px-10 ${isDragging ? "cursor-grabbing snap-none" : "cursor-grab snap-x snap-mandatory"} ${isReady ? "opacity-100" : "opacity-0"} select-none transition-opacity duration-300 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden`}
            style={{
              WebkitOverflowScrolling: "touch",
            }}
          >
            {renderedProjects.map(({ project, realIndex, isPreview, copy }) => {
              const isActive = !isPreview && realIndex === activeIndex;

              const candidateIndex = imageFallbackIndexes[realIndex] || 0;

              const candidates = project.imageCandidates || [];

              const imageUrl = candidates.length
                ? candidates[candidateIndex % candidates.length]
                : null;

              const priorityImage = !isPreview && realIndex <= 2;

              return (
                <div
                  key={`${copy}-${project.title}-${realIndex}`}
                  data-mega-project-slide={isPreview ? undefined : true}
                  data-mega-project-preview={isPreview ? true : undefined}
                  data-project-index={realIndex}
                  aria-hidden={isPreview ? true : undefined}
                  style={
                    projectCount === 1
                      ? {
                          marginInlineStart: "var(--mega-single-edge, 0px)",
                          marginInlineEnd: "var(--mega-single-edge, 0px)",
                        }
                      : undefined
                  }
                  className={`basis-[88%] shrink-0 ${isPreview ? "snap-align-none" : "snap-center"} sm:basis-[calc(50%_-_10px)] lg:basis-[calc(33.333333%_-_16px)] xl:basis-[calc(20%_-_19.2px)]`}
                >
                  <article
                    className={`group relative flex h-full flex-col overflow-hidden rounded-[18px] border bg-white transition-[transform,border-color,box-shadow] duration-300 ease-out ${isActive ? ` z-20 border-[#F6C343] shadow-[0_18px_48px_rgba(7,26,58,0.14)] sm:-translate-y-2 sm:scale-[1.025] ` : ` z-10 border-[#E2E5EA] shadow-[0_8px_24px_rgba(7,26,58,0.07)] lg:hover:-translate-y-1 lg:hover:border-[#F6C343]/60 `}`}
                  >
                    {/* IMAGE */}

                    <div className="relative m-2 aspect-[16/10] overflow-hidden rounded-[13px] bg-[#EEF2F9]">
                      {imageUrl ? (
                        <Image
                          key={`${realIndex}-${imageUrl}`}
                          src={imageUrl}
                          alt={project.title}
                          fill
                          priority={priorityImage}
                          quality={85}
                          draggable={false}
                          sizes="
                              (max-width: 640px) 88vw,
                              (max-width: 1024px) 50vw,
                              (max-width: 1280px) 33vw,
                              20vw
                            "
                          className="object-cover transition-transform duration-500 group-hover:scale-[1.025]"
                          onError={() => {
                            /*
                             * Current Sanity image failed.
                             * Automatically try another Sanity image.
                             */

                            setImageFallbackIndexes((previous) => {
                              const current = previous[realIndex] || 0;

                              if (
                                current !== candidateIndex ||
                                current >= candidates.length - 1
                              ) {
                                return previous;
                              }

                              return {
                                ...previous,

                                [realIndex]: current + 1,
                              };
                            });
                          }}
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center bg-[#EEF2F9] px-5 text-center">
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
                          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#071A3A]/10 via-transparent to-transparent"
                        />
                      )}
                    </div>

                    {/* CONTENT */}

                    <div className="flex flex-1 flex-col px-4 pb-5 pt-2">
                      <h3 className="text-[15px] font-semibold leading-[1.35] tracking-[-0.02em] text-[#071A3A] sm:text-base">
                        {project.title}
                      </h3>

                      <p className="mt-2 line-clamp-3 text-[12.5px] leading-[1.65] text-[#687282] sm:text-[13px]">
                        {project.description}
                      </p>

                      <div className="mt-auto pt-5">
                        <Link
                          href={project.href}
                          prefetch={!isPreview}
                          tabIndex={isPreview ? -1 : undefined}
                          aria-label={`Read more about ${project.title}`}
                          onPointerDown={(event) => {
                            event.stopPropagation();
                          }}
                          className={`inline-flex min-h-10 items-center justify-center rounded-full border px-4 py-2 text-[12px] font-semibold transition-all duration-300 active:scale-[0.97] ${isActive ? ` border-[#F6C343] bg-[#F6C343] text-[#071A3A] hover:bg-[#E9B835] ` : ` border-[#E6D9B5] bg-[#FFFDF7] text-[#A87808] hover:border-[#F6C343] hover:bg-[#F6C343] hover:text-[#071A3A] `}`}
                        >
                          Read More
                          <span className="sr-only">{` about ${project.title}`}</span>
                        </Link>
                      </div>
                    </div>
                  </article>
                </div>
              );
            })}
          </div>

          {/* CONTROLS */}

          <div className="mt-3 flex items-center justify-center gap-2 px-2 sm:mt-5 sm:gap-3 sm:px-5">
            <button
              type="button"
              onClick={handlePrevious}
              aria-label="Previous project"
              disabled={!isReady || stopCount <= 1 || activeIndex === 0}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#E2E4E8] bg-white text-[#071A3A] transition-all duration-300 hover:border-[#F6C343] hover:bg-[#F6C343] active:scale-95 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-[#E2E4E8] disabled:hover:bg-white disabled:active:scale-100 sm:h-11 sm:w-11"
            >
              <ChevronLeft className="h-5 w-5" strokeWidth={1.8} />
            </button>

            <div className="flex min-w-0 items-center justify-center gap-0.5">
              {scrollStops.map((_, index) => {
                const current = activeIndex === index;

                return (
                  <button
                    key={index}
                    type="button"
                    onClick={() => goToPosition(index)}
                    aria-label={`Go to project ${index + 1}`}
                    aria-current={current ? "true" : undefined}
                    className="flex h-10 w-5 items-center justify-center rounded-full active:scale-90 sm:h-9 sm:w-6"
                  >
                    <span
                      className={`block h-[6px] rounded-full transition-all duration-300 ${current ? "w-5 bg-[#D9A927]" : "w-[6px] bg-[#D6D8DC]"}`}
                    />
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              onClick={handleNext}
              aria-label="Next project"
              disabled={
                !isReady || stopCount <= 1 || activeIndex === stopCount - 1
              }
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#E2E4E8] bg-white text-[#071A3A] transition-all duration-300 hover:border-[#F6C343] hover:bg-[#F6C343] active:scale-95 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-[#E2E4E8] disabled:hover:bg-white disabled:active:scale-100 sm:h-11 sm:w-11"
            >
              <ChevronRight className="h-5 w-5" strokeWidth={1.8} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
