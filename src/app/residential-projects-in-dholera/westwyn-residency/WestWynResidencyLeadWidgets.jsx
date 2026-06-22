"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const BROCHURE_EVENT = "westwyn-residency:open-brochure";

const PopupScroll = dynamic(() => import("@/app/components/PopUpScroll"), {
  ssr: false,
  loading: () => null,
});

const BrochureDownload = dynamic(
  () => import("@/app/components/BrochureDownload"),
  {
    ssr: false,
    loading: () => null,
  },
);

const DocIconTeal = () => (
  <svg
    width="15"
    height="15"
    fill="none"
    stroke="#051A3A"
    strokeWidth="2"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
    />
  </svg>
);

export function WestWynResidencyBrochureButton({
  children,
  className,
  showIcon = false,
}) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(BROCHURE_EVENT))}
      className={className}
    >
      {showIcon && <DocIconTeal />}
      {children}
    </button>
  );
}

export function WestWynResidencyLeadWidgets() {
  const [brochureFormOpen, setBrochureFormOpen] = useState(false);

  useEffect(() => {
    const openBrochureForm = () => setBrochureFormOpen(true);

    window.addEventListener(BROCHURE_EVENT, openBrochureForm);

    return () => {
      window.removeEventListener(BROCHURE_EVENT, openBrochureForm);
    };
  }, []);

  return (
    <>
      <PopupScroll title="Book Your Plot in Dholera" />
      {brochureFormOpen && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black bg-opacity-50">
          <BrochureDownload
            title="Get WestWyn Residency Brochure"
            buttonName="Download Brochure"
            onClose={() => setBrochureFormOpen(false)}
            link="https://cdn.sanity.io/files/c3e1h345/projects/c9471499567c096befb9416aa99c7f0077900d11.pdf"
          />
        </div>
      )}
    </>
  );
}
