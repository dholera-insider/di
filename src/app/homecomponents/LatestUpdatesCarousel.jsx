"use client";

import { useEffect, useId, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Newspaper } from "lucide-react";

export default function LatestUpdatesCarousel({ updates }) {
  const headingId = useId();
  const trackId = useId();
  const trackRef = useRef(null);
  const [navigation, setNavigation] = useState({
    positions: [0],
    activeIndex: 0,
    canGoBack: false,
    canGoForward: false,
  });

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const updateNavigation = () => {
      const maxScroll = Math.max(0, track.scrollWidth - track.clientWidth);
      const firstCard = track.firstElementChild;
      const positions = [];

      // Each dot is a reachable position: eight on mobile, fewer on desktop.
      for (const card of track.children) {
        const position = Math.min(card.offsetLeft - firstCard.offsetLeft, maxScroll);
        if (!positions.length || position - positions[positions.length - 1] > 1) {
          positions.push(position);
        }
      }

      const activeIndex = positions.reduce(
        (closest, position, index) =>
          Math.abs(position - track.scrollLeft) <
          Math.abs(positions[closest] - track.scrollLeft)
            ? index
            : closest,
        0,
      );

      setNavigation({
        positions,
        activeIndex,
        canGoBack: track.scrollLeft > 1,
        canGoForward: maxScroll - track.scrollLeft > 1,
      });
    };

    updateNavigation();
    const resizeObserver = new ResizeObserver(updateNavigation);
    resizeObserver.observe(track);
    track.addEventListener("scroll", updateNavigation, { passive: true });

    return () => {
      resizeObserver.disconnect();
      track.removeEventListener("scroll", updateNavigation);
    };
  }, [updates.length]);

  const goToPosition = (index) => {
    const track = trackRef.current;
    if (!track) return;

    const nextIndex = Math.max(0, Math.min(index, navigation.positions.length - 1));
    track.scrollTo({
      left: navigation.positions[nextIndex],
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
    });
  };

  const handleKeyDown = (event) => {
    // Preserve keyboard behavior for the links inside each card.
    if (event.target !== event.currentTarget) return;

    let nextIndex;
    if (event.key === "ArrowLeft") nextIndex = navigation.activeIndex - 1;
    if (event.key === "ArrowRight") nextIndex = navigation.activeIndex + 1;
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = navigation.positions.length - 1;
    if (nextIndex === undefined) return;

    event.preventDefault();
    goToPosition(nextIndex);
  };

  const arrowClassName =
    "flex h-11 w-11 items-center justify-center rounded-full border border-[#F6C343] bg-[#F6C343] text-[#051A3A] transition-colors hover:border-[#051A3A] hover:bg-[#051A3A] hover:text-[#FDFCFA] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#051A3A] focus-visible:ring-offset-4 disabled:cursor-not-allowed disabled:border-[#051A3A]/10 disabled:bg-transparent disabled:text-[#051A3A]/25 sm:h-12 sm:w-12";

  return (
    <section
      id="latest-dholera-updates"
      aria-labelledby={headingId}
      aria-roledescription="carousel"
      className="overflow-hidden bg-[#FDFCFA] site-gutter section-space"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 text-center sm:mb-8 lg:mb-10">
          <h2
            id={headingId}
            className="mx-auto max-w-[44rem] text-[clamp(1.75rem,3vw,2.5rem)] font-bold leading-tight text-[#051A3A]"
          >
            Latest Dholera News &amp; Updates
          </h2>
          <div
            aria-hidden="true"
            className="mx-auto mt-3 h-1 w-14 rounded-full bg-[#F6C343]"
          />
        </div>

        <ul
          id={trackId}
          ref={trackRef}
          tabIndex={0}
          aria-label="Latest Dholera updates. Use the left and right arrow keys to browse."
          onKeyDown={handleKeyDown}
          className="relative flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain pb-2 [scrollbar-width:none] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#051A3A] sm:gap-6 [&::-webkit-scrollbar]:hidden"
        >
          {updates.map((update) => (
            <li
              key={update.id}
              className="flex min-w-0 shrink-0 basis-[86%] snap-start sm:basis-[calc((100%-24px)/2)] lg:basis-[calc((100%-48px)/3)] xl:basis-[calc((100%-96px)/5)]"
            >
              <article className="flex w-full flex-col overflow-hidden rounded-2xl border border-[#051A3A]/15 bg-white transition-colors hover:border-[#F6C343]">
                <Link
                  href={update.href}
                  prefetch={false}
                  tabIndex={-1}
                  aria-hidden="true"
                  className="relative block aspect-video shrink-0 overflow-hidden bg-[#051A3A]/5"
                >
                  {update.imageUrl ? (
                    <Image
                      src={update.imageUrl}
                      alt={update.imageAlt}
                      fill
                      sizes="(min-width: 1280px) 240px, (min-width: 1024px) 31vw, (min-width: 640px) 46vw, 86vw"
                      quality={75}
                      className="object-cover"
                    />
                  ) : (
                    <span className="flex h-full items-center justify-center">
                      <Newspaper className="h-12 w-12 text-[#051A3A]/40" aria-hidden="true" />
                    </span>
                  )}
                </Link>

                <div className="flex flex-1 flex-col p-4 sm:p-5 lg:p-3">
                  <h3 className="mb-5 h-14 text-lg font-semibold leading-7 text-[#051A3A] sm:mb-6 sm:h-16 sm:text-xl sm:leading-8 lg:mb-3 lg:h-14 lg:text-lg lg:leading-7">
                    <Link
                      href={update.href}
                      prefetch={false}
                      className="line-clamp-2 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#051A3A]"
                    >
                      {update.title}
                    </Link>
                  </h3>
                  <div className="mt-auto flex items-center justify-between gap-3 border-t border-[#051A3A]/10 pt-3 sm:pt-4 lg:pt-2">
                    {update.dateTime ? (
                      <time dateTime={update.dateTime} className="shrink-0 whitespace-nowrap text-xs text-[#6C7484] sm:text-sm">
                        {update.dateLabel}
                      </time>
                    ) : (
                      <span />
                    )}
                    <Link
                      href={update.href}
                      prefetch={false}
                      aria-label={`Read more: ${update.title}`}
                      className="inline-flex min-h-11 shrink-0 items-center rounded-sm text-sm font-semibold text-[#051A3A] underline decoration-[#F6C343] decoration-2 underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#051A3A] focus-visible:ring-offset-2"
                    >
                      Read More
                    </Link>
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ul>

        {navigation.positions.length > 1 && (
          <div className="mt-5 flex items-center justify-between gap-3 sm:mt-7">
            <div className="flex min-w-0 items-center" aria-label="Choose updates to display">
              {navigation.positions.map((position, index) => (
                <button
                  key={position}
                  type="button"
                  aria-label={`Go to update position ${index + 1} of ${navigation.positions.length}`}
                  aria-controls={trackId}
                  aria-current={navigation.activeIndex === index ? "true" : undefined}
                  onClick={() => goToPosition(index)}
                  className="flex h-11 min-w-5 items-center justify-center rounded-sm px-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#051A3A]"
                >
                  <span
                    className={`block h-1.5 rounded-full ${
                      navigation.activeIndex === index
                        ? "w-6 bg-[#F6C343]"
                        : "w-1.5 bg-[#051A3A]/20"
                    }`}
                  />
                </button>
              ))}
            </div>
            <div className="flex shrink-0 gap-2 sm:gap-3">
              <button
                type="button"
                aria-label="Previous updates"
                aria-controls={trackId}
                disabled={!navigation.canGoBack}
                onClick={() => goToPosition(navigation.activeIndex - 1)}
                className={arrowClassName}
              >
                <ChevronLeft className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                aria-label="Next updates"
                aria-controls={trackId}
                disabled={!navigation.canGoForward}
                onClick={() => goToPosition(navigation.activeIndex + 1)}
                className={arrowClassName}
              >
                <ChevronRight className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
