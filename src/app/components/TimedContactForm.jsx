"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";

const ContactForm = dynamic(() => import("./EventConsultationPopup"), {
  ssr: false,
  loading: () => null,
});

function PagePopup() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    let observer;
    const showPopup = () => {
      // Let an existing enquiry dialog finish before showing the event.
      if (document.querySelector('[role="dialog"], [aria-modal="true"], #contact-form-container')) {
        return;
      }

      observer?.disconnect();
      setIsOpen(true);
    };

    const timer = window.setTimeout(() => {
      observer = new MutationObserver(showPopup);
      observer.observe(document.body, { childList: true, subtree: true });
      showPopup();
    }, 2000);

    return () => {
      window.clearTimeout(timer);
      observer?.disconnect();
    };
  }, []);

  return isOpen ? (
    <ContactForm onClose={() => setIsOpen(false)} />
  ) : null;
}

export default function TimedContactForm() {
  const pathname = usePathname();
  const path = pathname?.replace(/\/+$/, "") || "/";

  const isEligible = Boolean(pathname) && path !== "/studio" && !path.startsWith("/studio/");

  // Each public page visit gets a fresh two-second timer, including revisits.
  return isEligible ? <PagePopup key={path} /> : null;
}
