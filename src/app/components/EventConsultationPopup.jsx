"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { getImageProps } from "next/image";
import { Check, UserRound, X } from "lucide-react";
import InternationalPhoneInput, {
  getInternationalPhoneValue,
  isValidInternationalPhone,
} from "./InternationalPhoneInput";
import desktopArtwork from "../assets/event/Dholera-Investor-Meetup-desktop.png";
import mobileArtwork from "../assets/event/Dholera-Investor-Meetup-Mobile.png";
import styles from "./EventConsultationPopup.module.css";

const artworkAlt =
  "Dholera investor meetup, 21–22 November 2026, Sector 48, Gurgaon, 9:00 AM–8:00 PM IST.";
const { props: desktopImage } = getImageProps({
  src: desktopArtwork,
  alt: artworkAlt,
  sizes: "min(960px, calc(100vw - 48px))",
});
const { props: mobileImage } = getImageProps({
  src: mobileArtwork,
  alt: artworkAlt,
  sizes: "min(360px, calc(100vw - 32px))",
});

// Reuse the site's CAPTCHA script without resetting any other form's widget.
function loadRecaptcha() {
  return new Promise((resolve, reject) => {
    if (!document.querySelector('script[src^="https://www.google.com/recaptcha/api.js"]')) {
      const script = document.createElement("script");
      script.src = "https://www.google.com/recaptcha/api.js";
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    }

    let attempts = 0;
    const checkReady = () => {
      if (typeof window.grecaptcha?.render === "function") {
        resolve(window.grecaptcha);
      } else if (attempts++ < 100) {
        window.setTimeout(checkReady, 100);
      } else {
        reject(new Error("Verification could not load. Please check your connection and try again."));
      }
    };
    checkReady();
  });
}

export default function EventConsultationPopup({ onClose }) {
  const [formData, setFormData] = useState({ fullName: "", phone: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showVerification, setShowVerification] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const dialogRef = useRef(null);
  const recaptchaRef = useRef(null);
  const widgetIdRef = useRef(null);
  const pendingSubmissionRef = useRef(null);
  const phaseRef = useRef("idle");
  const mountedRef = useRef(false);
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  useEffect(() => {
    mountedRef.current = true;
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialogRef.current?.focus({ preventScroll: true });

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }

      if (event.key === "Tab" && dialogRef.current?.contains(event.target)) {
        const focusable = [...dialogRef.current.querySelectorAll(
          'button:not(:disabled), input:not(:disabled), [tabindex="0"], iframe',
        )].filter((element) => element.getClientRects().length > 0);
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (event.shiftKey && (document.activeElement === first || document.activeElement === dialogRef.current)) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      mountedRef.current = false;
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      if (previousFocus?.isConnected) previousFocus.focus({ preventScroll: true });
      if (widgetIdRef.current !== null) {
        window.grecaptcha?.reset(widgetIdRef.current);
      }
    };
  }, [onClose]);

  const verificationFailed = (message) => {
    if (!mountedRef.current || phaseRef.current === "submitting") return;
    phaseRef.current = "idle";
    setIsSubmitting(false);
    setErrorMessage(message);
  };

  const submitLead = async (recaptchaToken) => {
    if (!mountedRef.current || phaseRef.current !== "verifying") return;
    phaseRef.current = "submitting";

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...pendingSubmissionRef.current, recaptchaToken }),
      });
      const data = await response.json().catch(() => null);

      if (!response.ok || data?.success !== true) {
        throw new Error(data?.message || "Unable to reserve your session. Please try again.");
      }

      phaseRef.current = "success";
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event: "lead_form", form_name: "investor_meetup_consultation" });

      if (mountedRef.current) {
        setIsSuccess(true);
        setErrorMessage("");
      }
    } catch (error) {
      phaseRef.current = "idle";
      if (mountedRef.current) setErrorMessage(error.message || "Unable to submit. Please try again.");
    } finally {
      if (mountedRef.current) {
        setIsSubmitting(false);
        if (widgetIdRef.current !== null) window.grecaptcha?.reset(widgetIdRef.current);
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (phaseRef.current !== "idle") return;
    setErrorMessage("");

    if (!formData.fullName.trim()) {
      setErrorMessage("Please enter your full name.");
      return;
    }
    if (!isValidInternationalPhone(formData.phone)) {
      setErrorMessage("Please enter a valid mobile number with its country code.");
      return;
    }
    if (!siteKey) {
      setErrorMessage("Verification is temporarily unavailable. Please contact us directly.");
      return;
    }

    pendingSubmissionRef.current = {
      fullName: formData.fullName.trim(),
      phone: getInternationalPhoneValue(formData.phone),
    };
    phaseRef.current = "verifying";
    setIsSubmitting(true);
    setShowVerification(true);

    try {
      const captcha = await loadRecaptcha();
      if (!mountedRef.current) return;

      if (widgetIdRef.current === null) {
        widgetIdRef.current = captcha.render(recaptchaRef.current, {
          sitekey: siteKey,
          size: "compact",
          theme: "light",
          callback: submitLead,
          "expired-callback": () => verificationFailed("Verification expired. Please reserve your session again."),
          "error-callback": () => verificationFailed("Verification failed. Please check your connection and try again."),
        });
      } else {
        captcha.reset(widgetIdRef.current);
      }
      recaptchaRef.current?.scrollIntoView({ block: "nearest", behavior: "smooth" });
    } catch (error) {
      verificationFailed(error.message);
    }
  };

  return createPortal(
    <div
      className={styles.backdrop}
      onClick={(event) => { if (event.target === event.currentTarget) onClose(); }}
    >
      <div
        ref={dialogRef}
        className={styles.dialog}
        role="dialog"
        aria-modal="true"
        aria-labelledby="event-consultation-title"
        tabIndex={-1}
      >
        <button className={styles.closeButton} type="button" onClick={onClose} aria-label="Close consultation form">
          <X size={20} aria-hidden="true" />
        </button>

        <div className={styles.artwork}>
          <picture>
            <source media="(min-width: 768px)" srcSet={desktopImage.srcSet} sizes={desktopImage.sizes} />
            {/* getImageProps supplies responsive Next.js image optimization to this picture. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img {...mobileImage} className={styles.artworkImage} alt={artworkAlt} />
          </picture>
        </div>

        <section className={styles.formPanel}>
          {isSuccess ? (
            <div className={styles.success} role="status" aria-live="polite">
              <span className={styles.successIcon}><Check size={30} aria-hidden="true" /></span>
              <h2 id="event-consultation-title">Thank you!</h2>
              <p>Your consultation request has been received. Our team will contact you to confirm your session.</p>
              <button type="button" className={styles.submitButton} onClick={onClose}>Done</button>
            </div>
          ) : (
            <>
              <h2 id="event-consultation-title" className={styles.title}>Book Your<br className={styles.titleBreak} />{" "}Consultation</h2>
              <span className={styles.accent} aria-hidden="true" />

              <form className={styles.form} onSubmit={handleSubmit} aria-busy={isSubmitting}>
                <label className={styles.nameField}>
                  <UserRound size={19} aria-hidden="true" />
                  <span className={styles.srOnly}>Full name</span>
                  <input
                    name="fullName"
                    autoComplete="name"
                    placeholder="Full name"
                    value={formData.fullName}
                    maxLength={200}
                    required
                    disabled={isSubmitting}
                    onChange={(event) => {
                      setFormData((previous) => ({ ...previous, fullName: event.target.value }));
                      setErrorMessage("");
                    }}
                  />
                </label>

                <div className={styles.phoneField}>
                  <InternationalPhoneInput
                    value={formData.phone}
                    onChange={(phone) => {
                      setFormData((previous) => ({ ...previous, phone }));
                      setErrorMessage("");
                    }}
                    containerClass={styles.phoneContainer}
                    inputClass={styles.phoneInput}
                    buttonClass={styles.countryButton}
                    dropdownClass={styles.countryDropdown}
                    inputProps={{
                      id: "event-consultation-phone",
                      name: "phone",
                      "aria-label": "Mobile number with country code",
                      placeholder: "Mobile number",
                      disabled: isSubmitting,
                    }}
                  />
                </div>

                <div className={styles.verification} hidden={!showVerification}>
                  <p>Complete verification to reserve your session.</p>
                  <div ref={recaptchaRef} />
                </div>

                {errorMessage && <p className={styles.error} role="alert">{errorMessage}</p>}

                <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
                  {isSubmitting ? "Verifying & submitting…" : "Book Now"}
                </button>
              </form>
            </>
          )}
        </section>
      </div>
    </div>,
    document.body,
  );
}
