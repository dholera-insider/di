// "use client";

// import { useEffect, useState } from "react";
// import { usePathname } from "next/navigation";
// import ContactForm from "./Contactform";

// const eligiblePages = new Set([
//   "/",
//   "/dholera-sir-updates",
//   "/gallery",
//   "/about-us",
//   "/about-dholera-sir",
//   "/dholera-sir-blogs",
//   "/investor/bahrain",
//   "/investor/dubai",
//   "/investor/oman",
//   "/investor/kuwait",
//   "/investor/singapore",
//   "/investor/qatar",
//   "/investor/hong-kong",
//   "/investor/saudi-arabia",
// ]);

// function PageTimer() {
//   const [isOpen, setIsOpen] = useState(false);

//   useEffect(() => {
//     const timer = window.setTimeout(() => {
//       // Do not interrupt a form or another modal the visitor already opened.
//       if (!document.querySelector('[role="dialog"], [aria-modal="true"]')) {
//         setIsOpen(true);
//       }
//     }, 5000);

//     return () => window.clearTimeout(timer);
//   }, []);

//   return isOpen ? <ContactForm onClose={() => setIsOpen(false)} /> : null;
// }

// export default function TimedContactForm() {
//   const pathname = usePathname();
//   const path = pathname?.replace(/\/+$/, "") || "/";
//   const isEligible =
//     pathname && (eligiblePages.has(path) || path.startsWith("/investor/"));

//   // A different pathname remounts the timer and dismisses the previous popup.
//   return isEligible ? <PageTimer key={path} /> : null;
// }


"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import ContactForm from "./Contactform";

const eligiblePages = new Set([
  "/",
  "/dholera-sir-updates",
  "/gallery",
  "/about-us",
  "/about-dholera-sir",
  "/dholera-sir-blogs",
  "/investor/bahrain",
  "/investor/dubai",
  "/investor/oman",
  "/investor/kuwait",
  "/investor/singapore",
  "/investor/qatar",
  "/investor/hong-kong",
  "/investor/saudi-arabia",
]);

function PagePopup() {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);

  // Stores the page the user originally wanted to visit.
  const [pendingUrl, setPendingUrl] = useState(null);

  // Prevent scroll popup from appearing repeatedly
  // on the same page.
  const hasScrollTriggered = useRef(false);

  /*
   * ======================================================
   * 1. SHOW POPUP AFTER USER SCROLLS 40%
   * ======================================================
   */
  useEffect(() => {
    const handleScroll = () => {
      // Already shown from scroll on this page.
      if (hasScrollTriggered.current) {
        return;
      }

      const documentElement = document.documentElement;

      const scrollTop =
        window.scrollY ||
        documentElement.scrollTop ||
        0;

      const scrollableHeight =
        documentElement.scrollHeight -
        window.innerHeight;

      // Page is not scrollable.
      if (scrollableHeight <= 0) {
        return;
      }

      const scrollPercentage =
        scrollTop / scrollableHeight;

      if (scrollPercentage >= 0.4) {
        // Do not interrupt another modal/dialog.
        const existingModal = document.querySelector(
          '[role="dialog"], [aria-modal="true"]'
        );

        if (existingModal) {
          return;
        }

        hasScrollTriggered.current = true;

        // This popup is from scrolling,
        // so there is no destination URL.
        setPendingUrl(null);
        setIsOpen(true);
      }
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    // Check restored browser scroll position.
    handleScroll();

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll
      );
    };
  }, []);

  /*
   * ======================================================
   * 2. SHOW POPUP BEFORE INTERNAL PAGE NAVIGATION
   * ======================================================
   *
   * Example:
   *
   * /about-us
   *      ↓
   * User clicks /gallery
   *      ↓
   * Navigation temporarily stops
   *      ↓
   * ContactForm opens
   *      ↓
   * User closes popup
   *      ↓
   * Navigate to /gallery
   */
  useEffect(() => {
    const handleLinkClick = (event) => {
      // Only normal left clicks.
      if (event.button !== 0) {
        return;
      }

      // Allow Ctrl/Cmd/Shift/Alt clicks.
      if (
        event.ctrlKey ||
        event.metaKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const target = event.target;

      if (!(target instanceof Element)) {
        return;
      }

      const anchor = target.closest("a");

      if (!anchor) {
        return;
      }

      const href = anchor.getAttribute("href");

      if (!href) {
        return;
      }

      // Ignore links opening in a new tab/window.
      if (
        anchor.target &&
        anchor.target !== "_self"
      ) {
        return;
      }

      // Ignore downloaded files.
      if (anchor.hasAttribute("download")) {
        return;
      }

      // Ignore special links.
      if (
        href.startsWith("mailto:") ||
        href.startsWith("tel:") ||
        href.startsWith("javascript:")
      ) {
        return;
      }

      let destination;

      try {
        destination = new URL(
          anchor.href,
          window.location.href
        );
      } catch {
        return;
      }

      /*
       * External website:
       * don't show popup and don't interfere.
       */
      if (
        destination.origin !==
        window.location.origin
      ) {
        return;
      }

      const currentPage =
        window.location.pathname +
        window.location.search;

      const destinationPage =
        destination.pathname +
        destination.search;

      /*
       * Ignore same-page links such as:
       *
       * /about-us#contact
       */
      if (
        currentPage === destinationPage
      ) {
        return;
      }

      /*
       * Stop Next.js/browser navigation.
       *
       * The page will only be opened after
       * ContactForm has been closed.
       */
      event.preventDefault();

      const nextUrl =
        destination.pathname +
        destination.search +
        destination.hash;

      setPendingUrl(nextUrl);

      /*
       * Navigation popup should appear even if
       * the 40% scroll popup was already shown
       * earlier on this page.
       */
      setIsOpen(true);
    };

    /*
     * Capture phase allows us to stop navigation
     * before Next.js Link performs router navigation.
     */
    document.addEventListener(
      "click",
      handleLinkClick,
      true
    );

    return () => {
      document.removeEventListener(
        "click",
        handleLinkClick,
        true
      );
    };
  }, []);

  /*
   * ======================================================
   * CLOSE POPUP
   * ======================================================
   *
   * Scroll popup:
   * just close it.
   *
   * Navigation popup:
   * close it and then continue to destination.
   */
  const handleClose = () => {
    setIsOpen(false);

    if (pendingUrl) {
      const destination = pendingUrl;

      setPendingUrl(null);

      router.push(destination);
    }
  };

  return isOpen ? (
    <ContactForm onClose={handleClose} />
  ) : null;
}

export default function TimedContactForm() {
  const pathname = usePathname();

  /*
   * Normalize:
   *
   * /about-us/ -> /about-us
   * /           -> /
   */
  const path =
    pathname?.replace(/\/+$/, "") || "/";

  const isEligible =
    pathname &&
    (eligiblePages.has(path) ||
      path.startsWith("/investor/"));

  /*
   * key={path}
   *
   * Every eligible page receives a completely
   * fresh scroll trigger.
   */
  return isEligible ? (
    <PagePopup key={path} />
  ) : null;
}