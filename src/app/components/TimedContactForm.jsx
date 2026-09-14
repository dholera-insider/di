"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";

const ContactForm = dynamic(() => import("./Contactform"), { ssr: false });

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

function PageTimer() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      // Do not interrupt a form or another modal the visitor already opened.
      if (!document.querySelector('[role="dialog"], [aria-modal="true"]')) {
        setIsOpen(true);
      }
    }, 10_000);

    return () => window.clearTimeout(timer);
  }, []);

  return isOpen ? <ContactForm onClose={() => setIsOpen(false)} /> : null;
}

export default function TimedContactForm() {
  const pathname = usePathname();
  const path = pathname?.replace(/\/+$/, "") || "/";
  const isEligible =
    pathname && (eligiblePages.has(path) || path.startsWith("/investor/"));

  // A different pathname remounts the timer and dismisses the previous popup.
  return isEligible ? <PageTimer key={path} /> : null;
}
