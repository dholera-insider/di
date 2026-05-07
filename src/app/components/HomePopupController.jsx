"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const Popup = dynamic(() => import("./Pop"), {
  ssr: false,
  loading: () => null,
});

export default function HomePopupController() {
  const [showpopForm, setpopShowForm] = useState(false);

  useEffect(() => {
    const popupShown = localStorage.getItem("popupShown");

    if (popupShown) return undefined;

    const showPopup = () => {
      setpopShowForm(true);
      localStorage.setItem("popupShown", "true");
    };

    const timer = window.setTimeout(showPopup, 2000);

    const handleScroll = () => {
      if (window.scrollY > window.innerHeight * 0.05) {
        showPopup();
        window.removeEventListener("scroll", handleScroll);
        window.clearTimeout(timer);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.clearTimeout(timer);
    };
  }, []);

  if (!showpopForm) return null;

  return (
    <Popup
      onClose={() => setpopShowForm(false)}
      title="Exclusive Deal: Own a plot at â‚¹11,000/sq. yard â€” hurry, limited units! â€“  left"
      buttonName="Get A Call Back"
      className="font-medium"
    />
  );
}
