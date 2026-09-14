"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/lead-client";

export default function LeadClickTracking() {
  useEffect(() => {
    const onClick = event => {
      if (event.defaultPrevented) return;
      const link = event.target instanceof Element ? event.target.closest("a[href]") : null;
      if (!link) return;
      let url;
      try { url = new URL(link.href); } catch { return; }
      const whatsapp = url.protocol === "https:" && ["wa.me", "api.whatsapp.com"].includes(url.hostname);
      const phone = url.protocol === "tel:";
      if (!whatsapp && !phone) return;
      trackEvent({
        event: whatsapp ? "whatsapp" : "phone_click",
        lead_type: whatsapp ? "whatsapp" : "phone",
        device: window.matchMedia("(max-width: 767px)").matches ? "mobile" : "desktop",
        page_name: window.location.pathname,
      });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);
  return null;
}
