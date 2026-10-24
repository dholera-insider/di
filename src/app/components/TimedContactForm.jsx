"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";

const ContactForm = dynamic(() => import("./Contactform"), {
  ssr: false,
});

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
  const [isOpen, setIsOpen] = useState(false);
  const hasScrollTriggered = useRef(false);

  // Show once when scrolling reaches 40%.
  useEffect(() => {
    let frameId = null;

    const checkScroll = () => {
      frameId = null;

      if (hasScrollTriggered.current) {
        return;
      }

      const documentElement = document.documentElement;
      const scrollTop = window.scrollY || documentElement.scrollTop || 0;
      const scrollableHeight =
        documentElement.scrollHeight - window.innerHeight;

      if (scrollableHeight <= 0) {
        return;
      }

      const scrollPercentage = scrollTop / scrollableHeight;

      if (scrollPercentage < 0.4) {
        return;
      }

      // Avoid opening over another modal.
      const existingModal = document.querySelector(
        '[role="dialog"], [aria-modal="true"]'
      );

      if (existingModal) {
        return;
      }

      hasScrollTriggered.current = true;
      setIsOpen(true);

      // No further scroll checks are needed on this page.
      window.removeEventListener("scroll", handleScroll);
    };

    const handleScroll = () => {
      if (frameId === null) {
        frameId = window.requestAnimationFrame(checkScroll);
      }
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, []);

  return isOpen ? (
    <ContactForm onClose={() => setIsOpen(false)} />
  ) : null;
}

export default function TimedContactForm() {
  const pathname = usePathname();
  const path = pathname?.replace(/\/+$/, "") || "/";

  const isEligible =
    Boolean(pathname) &&
    (eligiblePages.has(path) || path.startsWith("/investor/"));

  // Reset the popup and scroll trigger when the pathname changes.
  return isEligible ? <PagePopup key={path} /> : null;
}
