"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import scrollIcon from "../assets/icons/topArrowIcon.png";

export default function ScrollToTopButton() {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY > 500);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (!showButton) return null;

  return (
    <div className="fixed bottom-24 right-10 z-50">
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="overflow-visible rounded bg-slate-100 shadow-xl"
        aria-label="Scroll to top"
      >
        <Image src={scrollIcon} alt="" />
      </button>
    </div>
  );
}
