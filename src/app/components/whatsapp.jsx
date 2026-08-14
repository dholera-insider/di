"use client";

import { FaWhatsapp } from "react-icons/fa";
import { usePathname } from "next/navigation";

const WHATSAPP_URL =
  "https://wa.me/919211820887?text=Hello%2C%20I%20am%20interested%20in%20buying%20a%20plot%20in%20Dholera.%20Please%20share%20the%20details.";

export default function Whatsapp() {
  const pathname = usePathname();
  const hasMobileActionBar =
    pathname === "/investor/dubai" || pathname === "/investor/saudi-arabia";

  const handleWhatsappClick = () => {
    if (typeof window === "undefined") {
      return;
    }

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "whatsapp",
      lead_type: "whatsapp",
      device: "mobile",
    });
  };

  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleWhatsappClick}
      aria-label="Chat with a Dholera expert on WhatsApp"
      title="Chat on WhatsApp"
      className={`fixed right-4 z-[60] inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_8px_24px_rgba(5,26,58,0.3)] transition-transform duration-200 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#051A3A] focus-visible:ring-offset-2 md:hidden ${
        hasMobileActionBar
          ? "bottom-[calc(5rem+env(safe-area-inset-bottom))]"
          : "bottom-[calc(1rem+env(safe-area-inset-bottom))]"
      }`}
    >
      <FaWhatsapp className="h-8 w-8" aria-hidden="true" />
    </a>
  );
}
