
"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  BadgeCheck,
  ClipboardCheck,
  KeyRound,
  ScrollText,
  ShieldCheck,
  Stamp,
  X,
} from "lucide-react";

const legalServices = [
  {
    label: "Clear Title",
    Icon: BadgeCheck,
    description:
      "A Clear Title means the ownership of the land is clearly established and there are no known title disputes or ownership claims.",
  },
  {
    label: "Sale Deed",
    Icon: ScrollText,
    description:
      "A Sale Deed is the legal document used to transfer ownership of the property from the seller to the buyer.",
  },
  {
    label: "NA & NOC",
    Icon: ShieldCheck,
    description:
      "NA (Non-Agricultural) permission allows land to be used for approved non-agricultural purposes. NOC (No Objection Certificate) refers to required permissions or clearances from the relevant authorities.",
  },
  {
    label: "Plan Pass",
    Icon: ClipboardCheck,
    description:
      "A Plan Pass is the approval of the project layout or development plan by the Dholera Special Investment Region Development Authority (DSIRDA).",
  },
  {
    label: "Registry Ready",
    Icon: Stamp,
    description:
      "Registry Ready means the property is ready to proceed with the registration process after completing the required documentation and formalities.",
  },
  {
    label: "Immediate Possession",
    Icon: KeyRound,
    description:
      "Immediate Possession means the buyer can receive possession of the plot after completing the required purchase and registration formalities.",
  },
];

export function LegalSupport() {
  const [selectedService, setSelectedService] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const dialogRef = useRef(null);
  const closeButtonRef = useRef(null);
  const lastFocusedElementRef = useRef(null);
  const closeTimerRef = useRef(null);
  const openFrameRef = useRef(null);

  const SelectedServiceIcon = selectedService?.Icon;

  const closeModal = useCallback(() => {
    setIsModalVisible(false);

    if (closeTimerRef.current) {
      window.clearTimeout(closeTimerRef.current);
    }

    closeTimerRef.current = window.setTimeout(() => {
      setIsModalOpen(false);
      setSelectedService(null);
    }, 220);
  }, []);

  const openModal = (event, service) => {
    lastFocusedElementRef.current = event.currentTarget;
    setSelectedService(service);

    if (closeTimerRef.current) {
      window.clearTimeout(closeTimerRef.current);
    }

    setIsModalOpen(true);

    openFrameRef.current = window.requestAnimationFrame(() => {
      setIsModalVisible(true);
    });
  };

  useEffect(() => {
    if (!isModalOpen) return undefined;

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    const focusFrame = window.requestAnimationFrame(() => {
      closeButtonRef.current?.focus();
    });

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeModal();
        return;
      }

      if (event.key !== "Tab" || !dialogRef.current) return;

      const focusableElements = dialogRef.current.querySelectorAll(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );

      if (!focusableElements.length) {
        event.preventDefault();
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement =
        focusableElements[focusableElements.length - 1];

      if (
        event.shiftKey &&
        document.activeElement === firstElement
      ) {
        event.preventDefault();
        lastElement.focus();
      } else if (
        !event.shiftKey &&
        document.activeElement === lastElement
      ) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;

      lastFocusedElementRef.current?.focus();
    };
  }, [closeModal, isModalOpen]);

  useEffect(() => {
    return () => {
      if (closeTimerRef.current) {
        window.clearTimeout(closeTimerRef.current);
      }

      if (openFrameRef.current) {
        window.cancelAnimationFrame(openFrameRef.current);
      }
    };
  }, []);

  return (
    <>
      {/* =========================
          LEGAL SUPPORT SECTION
      ========================== */}
      <section 
        className="
        relative
        overflow-hidden
        bg-[#051A3A]

        px-4
        py-8

        sm:px-6
        sm:py-[clamp(4rem,7vw,6rem)]

        lg:px-8
      "
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
        >
          <div className="absolute -right-32 -top-32 h-[420px] w-[420px] rounded-full bg-[#F6C343]/[0.035] blur-3xl" />

          <div className="absolute bottom-0 left-1/3 h-px w-1/3 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </div>

        <div className="relative mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-5 lg:items-start lg:gap-16">

            {/* LEFT */}
            <div className="lg:col-span-2 lg:pt-2">

              <h2
                className="
                  mx-auto
                  max-w-lg
                  text-center
                  text-[clamp(2rem,3.2vw,2.75rem)]
                  font-bold
                  leading-[1.12]
                  tracking-[-0.03em]
                  text-white

                  lg:mx-0
                  lg:text-left
                "
              >
                Buy with Complete
                <span className="block">
                  Confidence
                </span>
              </h2>

              <div className="mx-auto mt-4 h-[2px] w-14 rounded-full bg-[#F6C343] lg:mx-0" />

              {/* <p className="mx-auto mt-6 max-w-md text-center text-sm leading-7 text-white/55 sm:mx-0 sm:text-left sm:text-[15px]">
                Every essential property document and approval,
                clearly explained before you make your decision.
              </p> */}
            </div>

            {/* RIGHT */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-3">
              {legalServices.map((service, index) => {
                const { label, Icon } = service;

                return (
                  <button
                    key={label}
                    type="button"
                    onClick={(event) => openModal(event, service)}
                    aria-haspopup="dialog"
                    aria-label={`View details about ${label}`}
                    style={{
                      animationDelay: `${index * 70}ms`,
                    }}
                    className="
                      group
                      relative
                      flex
                      min-h-[86px]
                      w-full
                      items-center
                      gap-4
                      overflow-hidden
                      rounded-2xl
                      border
                      border-white/[0.09]
                      bg-white/[0.045]
                      px-5
                      py-4
                      text-left
                      transition-all
                      duration-300
                      ease-out
                      hover:-translate-y-1
                      hover:border-[#F6C343]/35
                      hover:bg-white/[0.075]
                      hover:shadow-[0_18px_45px_rgba(0,0,0,0.20)]
                      focus:outline-none
                      focus-visible:ring-2
                      focus-visible:ring-[#F6C343]
                      focus-visible:ring-offset-2
                      focus-visible:ring-offset-[#051A3A]
                      motion-reduce:transform-none
                      motion-reduce:transition-none
                    "
                  >
                    {/* Hover glow */}
                    <span
                      aria-hidden="true"
                      className="
                        absolute
                        -right-10
                        -top-12
                        h-28
                        w-28
                        rounded-full
                        bg-[#F6C343]/10
                        blur-2xl
                        opacity-0
                        transition-opacity
                        duration-300
                        group-hover:opacity-100
                      "
                    />

                    {/* Icon */}
                    <span
                      className="
                        relative
                        flex
                        h-11
                        w-11
                        shrink-0
                        items-center
                        justify-center
                        rounded-xl
                        border
                        border-[#F6C343]/10
                        bg-[#F6C343]/[0.12]
                        transition-all
                        duration-300
                        group-hover:scale-[1.06]
                        group-hover:border-[#F6C343]/25
                        group-hover:bg-[#F6C343]/20
                      "
                    >
                      <Icon
                        className="
                          h-5
                          w-5
                          text-[#F6C343]
                          transition-transform
                          duration-300
                          group-hover:scale-110
                        "
                        strokeWidth={1.8}
                        aria-hidden="true"
                      />
                    </span>

                    {/* Label */}
                    <span className="relative min-w-0 flex-1">
                      <span className="block text-[0.95rem] font-semibold text-white">
                        {label}
                      </span>
                     
                    </span>

                    {/* Arrow */}
                    <span className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[#F6C343]/70 transition-all duration-300 group-hover:text-[#F6C343] group-active:scale-95">
                      <svg
                        aria-hidden="true"
                        viewBox="0 0 40 40"
                        className="pointer-events-none absolute inset-0 h-full w-full"
                      >
                        {/* Static base circle */}
                        <circle
                          cx="20"
                          cy="20"
                          r="18"
                          fill="none"
                          stroke="rgba(246,195,67,0.22)"
                          strokeWidth="1"
                        />

                        {/* Static gold border */}
                        <circle
                          cx="20"
                          cy="20"
                          r="18"
                          fill="none"
                          stroke="rgba(246,195,67,0.70)"
                          strokeWidth="1.4"
                        />
                      </svg>

                      <ArrowUpRight
                        className="legal-arrow-pop relative z-10 h-3.5 w-3.5 text-[#F6C343]"
                        strokeWidth={1.8}
                        aria-hidden="true"
                      />
                    </span>    
                           
                  </button>

                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* =========================
          MODAL
      ========================== */}
      {isModalOpen && selectedService && (
        <div
          className={`
            fixed
            inset-0
            z-[1000]
            flex
            items-center
            justify-center
            bg-[#020B18]/75
            px-4
            py-6
            backdrop-blur-[6px]
            transition-opacity
            duration-200
            sm:px-6
            ${
              isModalVisible
                ? "opacity-100"
                : "opacity-0"
            }
          `}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeModal();
            }
          }}
        >
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="legal-support-modal-title"
            aria-describedby="legal-support-modal-description"
            className={`
              relative
              w-full
              max-w-[520px]
              overflow-hidden
              rounded-[24px]
              border
              border-white/80
              bg-white
              shadow-[0_30px_100px_rgba(0,0,0,0.35)]
              transition-all
              duration-[220ms]
              ease-out
              motion-reduce:transition-none

              ${
                isModalVisible
                  ? "translate-y-0 scale-100 opacity-100"
                  : "translate-y-4 scale-[0.97] opacity-0"
              }
            `}
          >
            {/* Gold top accent */}
            <div className="h-1 w-full bg-[#F6C343]" />

            {/* Close */}
            <button
              ref={closeButtonRef}
              type="button"
              onClick={closeModal}
              aria-label="Close"
              className="
                absolute
                right-4
                top-5
                z-10
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-full
                border
                border-[#051A3A]/10
                bg-[#F8F9FA]
                text-[#051A3A]/60
                transition-all
                duration-200
                hover:rotate-90
                hover:border-[#051A3A]/20
                hover:bg-[#051A3A]/[0.07]
                hover:text-[#051A3A]
                focus:outline-none
                focus-visible:ring-2
                focus-visible:ring-[#F6C343]
                sm:right-5
                sm:top-5
              "
            >
              <X
                className="h-[18px] w-[18px]"
                strokeWidth={1.8}
                aria-hidden="true"
              />
            </button>

            {/* Modal Content */}
            <div className="px-6 pb-7 pt-7 sm:px-8 sm:pb-8 sm:pt-8">

              {/* ICON + TITLE — SAME ROW */}
              <div className="flex items-center gap-4 pr-12">
                <div
                  className="
                    flex
                    h-14
                    w-14
                    shrink-0
                    items-center
                    justify-center
                    rounded-2xl
                    border
                    border-[#F6C343]/30
                    bg-[#F6C343]/[0.12]
                    shadow-[0_8px_24px_rgba(246,195,67,0.10)]
                  "
                >
                  <SelectedServiceIcon
                    className="h-6 w-6 text-[#A77600]"
                    strokeWidth={1.8}
                    aria-hidden="true"
                  />
                </div>

                <h3
                  id="legal-support-modal-title"
                  className="
                    min-w-0
                    text-[1.25rem]
                    font-bold
                    leading-tight
                    tracking-[-0.02em]
                    text-[#051A3A]
                    sm:text-[1.4rem]
                  "
                >
                  {selectedService.label}
                </h3>
              </div>

              {/* HORIZONTAL DIVIDER */}
              <div
                aria-hidden="true"
                className="my-6 h-px w-full bg-[#051A3A]/10"
              />

              {/* DESCRIPTION */}
              <p
                id="legal-support-modal-description"
                className="
                  text-[15px]
                  leading-7
                  text-[#051A3A]/65
                  sm:text-[15px]
                  sm:leading-7
                "
              >
                {selectedService.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}