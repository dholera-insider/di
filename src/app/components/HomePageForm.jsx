"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import React from "react";

import "../about-us/about.css";

import InternationalPhoneInput, {
  getInternationalPhoneValue,
  isValidInternationalPhone,
} from "./HomePageFormInput";

export default function CommonForm({
  title = "Start Your Dholera Investment",
}) {
  // =========================================================
  // STATES
  // =========================================================

  const [isLoading, setIsLoading] =
    useState(false);

  const [formData, setFormData] =
    useState({
      fullName: "",
      phone: "",
    });

  const [showPopup, setShowPopup] =
    useState(false);

  const [
    submissionCount,
    setSubmissionCount,
  ] = useState(0);

  const [
    lastSubmissionTime,
    setLastSubmissionTime,
  ] = useState(0);

  const [
    errorMessage,
    setErrorMessage,
  ] = useState("");

  const [
    recaptchaLoaded,
    setRecaptchaLoaded,
  ] = useState(false);

  const [
    userInteracted,
    setUserInteracted,
  ] = useState(false);

  const recaptchaRef =
    useRef(null);

  const recaptchaWidgetId =
    useRef(null);

  const siteKey =
    process.env
      .NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  // =========================================================
  // LOAD RECAPTCHA
  // =========================================================

  const loadRecaptcha = () => {
    if (
      typeof window === "undefined" ||
      recaptchaLoaded
    ) {
      return;
    }

    if (window.grecaptcha) {
      setRecaptchaLoaded(true);

      return;
    }

    try {
      const existingScript =
        document.querySelector(
          'script[src="https://www.google.com/recaptcha/api.js"]',
        );

      if (existingScript) {
        existingScript.addEventListener(
          "load",
          () => {
            setRecaptchaLoaded(true);
          },
          {
            once: true,
          },
        );

        return;
      }

      const script =
        document.createElement(
          "script",
        );

      script.src =
        "https://www.google.com/recaptcha/api.js";

      script.async = true;
      script.defer = true;

      script.onload = () => {
        setRecaptchaLoaded(true);
      };

      script.onerror = () => {
        console.error(
          "Failed to load reCAPTCHA script",
        );

        setRecaptchaLoaded(true);
      };

      document.head.appendChild(
        script,
      );
    } catch (err) {
      console.error(
        "reCAPTCHA script loading error:",
        err,
      );

      setRecaptchaLoaded(true);
    }
  };

  // =========================================================
  // LOCAL STORAGE
  // =========================================================

  useEffect(() => {
    if (
      typeof window !== "undefined"
    ) {
      setSubmissionCount(
        parseInt(
          localStorage.getItem(
            "formSubmissionCount",
          ) || "0",
          10,
        ),
      );

      setLastSubmissionTime(
        parseInt(
          localStorage.getItem(
            "lastSubmissionTime",
          ) || "0",
          10,
        ),
      );
    }
  }, []);

  // =========================================================
  // SUCCESS POPUP AUTO-CLOSE
  // =========================================================

  useEffect(() => {
    if (!showPopup) {
      return;
    }

    const timer =
      window.setTimeout(() => {
        setShowPopup(false);
      }, 5000);

    const handleEscape = (
      event,
    ) => {
      if (
        event.key === "Escape"
      ) {
        setShowPopup(false);
      }
    };

    window.addEventListener(
      "keydown",
      handleEscape,
    );

    return () => {
      window.clearTimeout(
        timer,
      );

      window.removeEventListener(
        "keydown",
        handleEscape,
      );
    };
  }, [showPopup]);

  // =========================================================
  // NAME CHANGE
  // =========================================================

  const handleChange = (
    e,
  ) => {
    const {
      name,
      value,
    } = e.target;

    setFormData(
      (prevData) => ({
        ...prevData,
        [name]: value,
      }),
    );

    setErrorMessage("");

    if (!userInteracted) {
      setUserInteracted(
        true,
      );

      loadRecaptcha();
    }
  };

  // =========================================================
  // PHONE CHANGE
  // =========================================================

  const handlePhoneChange = (
    phone,
  ) => {
    setFormData(
      (prevData) => ({
        ...prevData,
        phone,
      }),
    );

    setErrorMessage("");

    if (!userInteracted) {
      setUserInteracted(
        true,
      );

      loadRecaptcha();
    }
  };

  // =========================================================
  // VALIDATION
  // =========================================================

  const validateForm = () => {
    if (
      !formData.fullName ||
      !formData.phone
    ) {
      setErrorMessage(
        "Please fill in all fields",
      );

      return false;
    }

    if (
      !isValidInternationalPhone(
        formData.phone,
      )
    ) {
      setErrorMessage(
        "Please enter a valid international phone number",
      );

      return false;
    }

    const now =
      Date.now();

    const hoursPassed =
      (now -
        lastSubmissionTime) /
      (1000 * 60 * 60);

    if (
      hoursPassed >= 24
    ) {
      setSubmissionCount(0);

      if (
        typeof window !== "undefined"
      ) {
        localStorage.setItem(
          "formSubmissionCount",
          "0",
        );

        localStorage.setItem(
          "lastSubmissionTime",
          now.toString(),
        );
      }
    } else if (
      submissionCount >= 3
    ) {
      setErrorMessage(
        "You have reached the maximum submission limit. Try again after 24 hours.",
      );

      return false;
    }

    return true;
  };

  // =========================================================
  // API SUBMISSION
  // =========================================================

  const onRecaptchaSuccess =
    async () => {
      try {
        const response =
          await fetch(
            "https://api.telecrm.in/enterprise/67a30ac2989f94384137c2ff/autoupdatelead",
            {
              method: "POST",

              headers: {
                "Content-Type":
                  "application/json",

                Authorization: `Bearer ${process.env.NEXT_PUBLIC_TELECRM_API_KEY}`,
              },

              body:
                JSON.stringify(
                  {
                    fields: {
                      name:
                        formData.fullName,

                      phone:
                        getInternationalPhoneValue(
                          formData.phone,
                        ),

                      source:
                        "Dholera Insider",
                    },

                    source:
                      "Dholera Insider Website",

                    tags: [
                      "Dholera Investment",
                      "Website Lead",
                    ],
                  },
                ),
            },
          );

        const responseText =
          await response.text();

        if (response.ok) {
          setFormData({
            fullName: "",
            phone: "",
          });

          setErrorMessage("");

          setShowPopup(true);

          setSubmissionCount(
            (prev) => {
              const newCount =
                prev + 1;

              if (
                typeof window !==
                "undefined"
              ) {
                localStorage.setItem(
                  "formSubmissionCount",
                  newCount.toString(),
                );

                localStorage.setItem(
                  "lastSubmissionTime",
                  Date.now().toString(),
                );
              }

              return newCount;
            },
          );

          window.dataLayer =
            window.dataLayer ||
            [];

          window.dataLayer.push({
            event:
              "lead_form",
          });
        } else {
          let errorData;

          try {
            errorData =
              JSON.parse(
                responseText,
              );
          } catch {
            errorData = {
              message:
                responseText,
            };
          }

          throw new Error(
            errorData.message ||
              "Error submitting form",
          );
        }
      } catch (error) {
        console.error(
          "Form submission error:",
          error,
        );

        setErrorMessage(
          error.message ||
            "Error submitting form. Please try again.",
        );
      } finally {
        setIsLoading(false);

        if (
          typeof window !==
            "undefined" &&
          window.grecaptcha &&
          recaptchaWidgetId.current !==
            null
        ) {
          try {
            window.grecaptcha.reset(
              recaptchaWidgetId.current,
            );
          } catch (err) {
            console.error(
              "Error resetting reCAPTCHA:",
              err,
            );
          }
        }
      }
    };

  // =========================================================
  // SUBMIT
  // =========================================================

  const handleSubmit =
    async (e) => {
      e.preventDefault();

      if (isLoading) {
        return;
      }

      setIsLoading(true);

      setErrorMessage("");

      if (!validateForm()) {
        setIsLoading(false);

        return;
      }

      if (
        !recaptchaLoaded
      ) {
        loadRecaptcha();

        setErrorMessage(
          "Loading verification... Please try again in a moment.",
        );

        setIsLoading(false);

        return;
      }

      if (
        typeof window !==
          "undefined" &&
        window.grecaptcha &&
        recaptchaLoaded &&
        siteKey
      ) {
        try {
          if (
            recaptchaWidgetId.current ===
              null &&
            recaptchaRef.current
          ) {
            recaptchaWidgetId.current =
              window.grecaptcha.render(
                recaptchaRef.current,
                {
                  sitekey:
                    siteKey,

                  callback:
                    onRecaptchaSuccess,

                  theme:
                    "light",
                },
              );
          } else if (
            recaptchaWidgetId.current !==
            null
          ) {
            window.grecaptcha.reset(
              recaptchaWidgetId.current,
            );

            window.grecaptcha.execute(
              recaptchaWidgetId.current,
            );
          }
        } catch (error) {
          console.error(
            "Error rendering reCAPTCHA:",
            error,
          );

          setErrorMessage(
            "Error with verification. Please try again.",
          );

          setIsLoading(false);
        }
      } else {
        setErrorMessage(
          "reCAPTCHA not loaded. Please refresh and try again.",
        );

        setIsLoading(false);
      }
    };

  // =========================================================
  // FIELD ERROR STATES
  // =========================================================

  const fullNameHasError =
    errorMessage ===
      "Please fill in all fields" &&
    !formData.fullName;

  const phoneHasError =
    (errorMessage ===
      "Please fill in all fields" &&
      !formData.phone) ||
    errorMessage ===
      "Please enter a valid international phone number";

  const closeSuccessPopup =
    () => {
      setShowPopup(false);
    };

  return (
    <>
      <style>{`
        /* ===================================================
           CRITICAL MOBILE WIDTH PROTECTION

           This is the important fix.
        =================================================== */

        .bma-form-section,
        .bma-form-section *,
        .bma-form-section *::before,
        .bma-form-section *::after {
          box-sizing: border-box;
        }

        .bma-form-section {
          position: relative;

          width: 100%;
          max-width: 100%;

          min-width: 0;

          /*
           * DO NOT use overflow: visible here.
           *
           * Horizontal content is clipped so decorative
           * elements/dropdowns cannot enlarge document width.
           *
           * Vertical dropdown remains visible because the
           * country list itself stays inside the phone field
           * and this section has enough vertical room.
           */
          overflow-x: clip;

          background: #EEF2F9 ;

          isolation: isolate;
        }

        .bma-form-inner {
          position: relative;

          width: 100%;
          max-width: 72rem;

          min-width: 0;

          margin: 0 auto;
        }

        /* ===================================================
           FORM CARD
        =================================================== */

        .bma-form-card {
          position: relative;

          z-index: 20;

          width: 100%;
          max-width: 100%;

          min-width: 0;

          /*
           * Vertical overflow remains visible so dropdown
           * can open below the phone field.
           */
          overflow: visible;

          border:
            1px solid
            rgba(
              246,
              195,
              67,
              0.62
            );

          background:
            #ffffff;

          box-shadow:
            0 24px 65px
              rgba(
                5,
                26,
                58,
                0.08
              ),
            0 8px 20px
              rgba(
                5,
                26,
                58,
                0.04
              );
        }

        .bma-form-card::before {
          content: "";

          position: absolute;

          top: -1px;
          left: 50%;

          width: 72px;
          height: 4px;

          transform:
            translateX(-50%);

          border-radius:
            0 0 999px 999px;

          background:
            #051a3a;
        }

        /* ===================================================
           FORM WRAPPER
        =================================================== */

        .bma-form-element {
          position: relative;

          z-index: 30;

          width: 100%;
          max-width: 64rem;

          min-width: 0;

          margin-left: auto;
          margin-right: auto;
        }

        .bma-field-grid {
          width: 100%;

          min-width: 0;
        }

        .bma-field-column {
          width: 100%;

          min-width: 0;
        }

        /* ===================================================
           NAME FIELD
        =================================================== */

        .bma-name-shell {
          display: flex;

          width: 100%;
          max-width: 100%;

          min-width: 0;

          height: 54px;

          align-items: center;

          overflow: hidden;

          border:
            1px solid
            #dfe5ed;

          border-radius:
            14px;

          background:
            #f8fafc;

          transition:
            border-color
              180ms ease,
            background-color
              180ms ease,
            box-shadow
              180ms ease;
        }

        .bma-name-shell:hover {
          border-color:
            #c9d2dd;

          background:
            #ffffff;
        }

        .bma-name-shell:focus-within {
          border-color:
            #d9a51f;

          background:
            #ffffff;

          box-shadow:
            0 0 0 4px
              rgba(
                246,
                195,
                67,
                0.14
              );
        }

        .bma-name-shell-error {
          border-color:
            #d92d20;

          background:
            #fffafa;
        }

        .bma-name-input {
          width: 100%;
          max-width: 100%;

          min-width: 0;

          height: 52px;

          padding:
            0 16px;

          border: 0;

          outline: 0;

          background:
            transparent;

          color:
            #051a3a;

          font-family:
            inherit;

          font-size:
            15px;

          font-weight:
            500;
        }

        .bma-name-input::placeholder {
          color:
            #98a2b3;

          font-weight:
            400;
        }

        /* ===================================================
           PHONE FIELD
        =================================================== */

        .bma-phone-container {
          position: relative;

          z-index: 80;

          width: 100%;
          max-width: 100%;

          min-width: 0;

          overflow: visible;
        }

        .bma-phone-shell {
          position: relative;

          z-index: 80;

          width: 100%;
          max-width: 100%;

          min-width: 0;

          height: 54px;

          overflow: visible;

          border:
            1px solid
            #dfe5ed;

          border-radius:
            14px;

          background:
            #f8fafc;

          transition:
            border-color
              180ms ease,
            background-color
              180ms ease,
            box-shadow
              180ms ease;
        }

        .bma-phone-shell:hover {
          border-color:
            #c9d2dd;

          background:
            #ffffff;
        }

        .bma-phone-shell:focus-within {
          border-color:
            #d9a51f;

          background:
            #ffffff;

          box-shadow:
            0 0 0 4px
              rgba(
                246,
                195,
                67,
                0.14
              );
        }

        .bma-phone-shell-error {
          border-color:
            #d92d20;

          background:
            #fffafa;
        }

        /* ===================================================
           RECAPTCHA
        =================================================== */

        .bma-recaptcha-wrapper {
          position: relative;

          z-index: 5;

          width: 100%;

          max-width: 100%;

          overflow: hidden;
        }

        /* ===================================================
           SUCCESS MODAL
        =================================================== */

        @keyframes bmaBackdropIn {
          from {
            opacity: 0;
          }

          to {
            opacity: 1;
          }
        }

        @keyframes bmaModalIn {
          from {
            opacity: 0;

            transform:
              translateY(14px)
              scale(0.97);
          }

          to {
            opacity: 1;

            transform:
              translateY(0)
              scale(1);
          }
        }

        @keyframes bmaSuccessIn {
          from {
            opacity: 0;

            transform:
              scale(0.6);
          }

          70% {
            opacity: 1;

            transform:
              scale(1.08);
          }

          to {
            opacity: 1;

            transform:
              scale(1);
          }
        }

        @keyframes bmaProgress {
          from {
            transform:
              scaleX(1);
          }

          to {
            transform:
              scaleX(0);
          }
        }

        .bma-success-backdrop {
          animation:
            bmaBackdropIn
            180ms ease-out;
        }

        .bma-success-modal {
          animation:
            bmaModalIn
            260ms
            cubic-bezier(
              0.22,
              1,
              0.36,
              1
            );
        }

        .bma-success-icon {
          animation:
            bmaSuccessIn
            420ms
            cubic-bezier(
              0.22,
              1,
              0.36,
              1
            );
        }

        .bma-success-progress {
          transform-origin:
            left;

          animation:
            bmaProgress
            5s linear
            forwards;
        }

        /* ===================================================
           MOBILE
        =================================================== */

        @media (
          max-width: 639px
        ) {
          .bma-form-section {
            width: 100%;

            max-width: 100%;

            overflow-x: clip;
          }

          .bma-form-inner,
          .bma-form-card,
          .bma-form-element,
          .bma-field-grid,
          .bma-field-column,
          .bma-name-shell,
          .bma-phone-container,
          .bma-phone-shell {
            width: 100%;

            max-width: 100%;

            min-width: 0;
          }

          .bma-form-card::before {
            width: 58px;

            height: 3px;
          }

          .bma-name-shell,
          .bma-phone-shell {
            height: 52px;

            border-radius:
              12px;
          }

          .bma-name-input {
            height: 50px;

            padding-left:
              13px;

            padding-right:
              13px;

            font-size:
              14px;
          }
        }

        @media (
          max-width: 380px
        ) {
          .bma-recaptcha-scale {
            transform:
              scale(0.86);

            transform-origin:
              top center;

            margin-bottom:
              -10px;
          }
        }

        @media (
          prefers-reduced-motion:
            reduce
        ) {
          .bma-success-backdrop,
          .bma-success-modal,
          .bma-success-icon,
          .bma-success-progress {
            animation:
              none !important;
          }
        }
      `}</style>

      {/* =====================================================
          FORM SECTION
      ====================================================== */}

      <section className="bma-form-section px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
        {/* ===================================================
            BACKGROUND DECORATION

            Changed from a fixed Tailwind 780px element
            that could create page overflow.

            It is now safely clipped by the form section.
        =================================================== */}

        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-[-180px] -z-10 h-[360px] w-[min(780px,160vw)] -translate-x-1/2 rounded-full bg-[#F6C343]/[0.07] blur-[90px]"
        />

        {/* ===================================================
            INNER
        =================================================== */}

        <div className="bma-form-inner">
          <div
            id="contact-form-container"
            className="bma-form-card rounded-[22px] px-5 py-7 sm:rounded-[26px] sm:px-8 sm:py-9 lg:px-10 lg:py-10 xl:px-12"
          >
            {/* ===============================================
                HEADER
            ================================================ */}

            <div className="mx-auto w-full max-w-3xl text-center">
              <h2 className="break-words text-[clamp(1.55rem,7vw,2.35rem)] font-bold leading-[1.15] tracking-[-0.035em] text-[#051A3A] sm:text-[clamp(1.55rem,3vw,2.35rem)]">
                {title}
              </h2>

              <p className="mx-auto mt-3 max-w-2xl text-[13px] leading-6 text-[#667085] sm:text-[14px] lg:text-[15px]">
                Share your details to speak
                with our team about Dholera
                residential projects and
                available plots.
              </p>
            </div>

            {/* ===============================================
                FORM
            ================================================ */}

            <form
              onSubmit={
                handleSubmit
              }
              noValidate
              className="bma-form-element mt-7 sm:mt-9"
            >
              {/* =============================================
                  ERROR
              ============================================== */}

              {errorMessage && (
                <div
                  role="alert"
                  aria-live="polite"
                  className="mb-5 flex w-full max-w-full items-start gap-3 rounded-xl border border-[#FDA29B] bg-[#FFFBFA] px-4 py-3.5 text-[#B42318]"
                >
                  <div className="mt-[1px] flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#FEE4E2]">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      className="h-4 w-4"
                      aria-hidden="true"
                    >
                      <path
                        d="M12 8v4m0 4h.01M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10Z"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>

                  <div className="min-w-0">
                    <p className="text-[13px] font-semibold">
                      Please check your
                      details
                    </p>

                    <p className="mt-0.5 break-words text-[12px] leading-5 sm:text-[13px]">
                      {errorMessage}
                    </p>
                  </div>
                </div>
              )}

              {/* =============================================
                  FIELD GRID
              ============================================== */}

              <div className="bma-field-grid grid grid-cols-1 items-end gap-5 lg:grid-cols-12 lg:gap-4">
                {/* ===========================================
                    NAME
                ============================================ */}

                <div className="bma-field-column lg:col-span-4">
                  <label
                    htmlFor="fullName"
                    className="mb-2 block text-[12px] font-semibold text-[#344054] sm:text-[13px]"
                  >
                    Full Name

                    <span className="ml-1 text-[#D92D20]">
                      *
                    </span>
                  </label>

                  <div
                    className={`bma-name-shell ${
                      fullNameHasError
                        ? "bma-name-shell-error"
                        : ""
                    }`}
                  >
                    <div className="flex h-full w-12 shrink-0 items-center justify-center text-[#98A2B3]">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        className="h-[18px] w-[18px]"
                        aria-hidden="true"
                      >
                        <path
                          d="M20 21a8 8 0 0 0-16 0m12-13a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z"
                          stroke="currentColor"
                          strokeWidth="1.7"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>

                    <div className="h-6 w-px shrink-0 bg-[#E4E7EC]" />

                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={
                        formData.fullName
                      }
                      onChange={
                        handleChange
                      }
                      required
                      autoComplete="name"
                      aria-invalid={
                        fullNameHasError
                      }
                      className="bma-name-input"
                      placeholder="Enter your name"
                    />
                  </div>
                </div>

                {/* ===========================================
                    PHONE
                ============================================ */}

                <div className="bma-field-column relative z-[80] lg:col-span-5">
                  <label
                    htmlFor="phone"
                    className="mb-2 block text-[12px] font-semibold text-[#344054] sm:text-[13px]"
                  >
                    Phone Number

                    <span className="ml-1 text-[#D92D20]">
                      *
                    </span>
                  </label>

                  <div className="bma-phone-container">
                    <div
                      className={`bma-phone-shell ${
                        phoneHasError
                          ? "bma-phone-shell-error"
                          : ""
                      }`}
                    >
                      <InternationalPhoneInput
                        value={
                          formData.phone
                        }
                        onChange={
                          handlePhoneChange
                        }
                        inputProps={{
                          id: "phone",
                          name: "phone",
                          autoComplete:
                            "tel",
                          "aria-invalid":
                            phoneHasError,
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* ===========================================
                    SUBMIT
                ============================================ */}

                <div className="bma-field-column relative z-10 flex lg:col-span-3 lg:items-end">
                  <button
                    type="submit"
                    disabled={
                      isLoading
                    }
                    className="group flex h-[54px] w-full max-w-full items-center justify-center gap-2.5 rounded-[14px] bg-[#051A3A] px-5 text-[13px] font-bold text-white shadow-[0_9px_24px_rgba(5,26,58,0.16)] transition-all duration-200 hover:-translate-y-[1px] hover:bg-[#0B2B55] hover:shadow-[0_12px_30px_rgba(5,26,58,0.22)] focus:outline-none focus:ring-4 focus:ring-[#F6C343]/30 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 sm:text-sm"
                  >
                    {isLoading ? (
                      <>
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          className="h-[18px] w-[18px] animate-spin"
                          aria-hidden="true"
                        >
                          <circle
                            cx="12"
                            cy="12"
                            r="9"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            opacity="0.25"
                          />

                          <path
                            d="M21 12a9 9 0 0 0-9-9"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                          />
                        </svg>

                        <span>
                          Submitting...
                        </span>
                      </>
                    ) : (
                      <>
                        <span>
                          Get A Call Back
                        </span>

                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          className="h-[17px] w-[17px] text-[#F6C343] transition-transform duration-200 group-hover:translate-x-1"
                          aria-hidden="true"
                        >
                          <path
                            d="M5 12h14m-5-5 5 5-5 5"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* =============================================
                  RECAPTCHA
              ============================================== */}

              <div className="bma-recaptcha-wrapper mt-5 flex justify-center">
                <div
                  ref={
                    recaptchaRef
                  }
                  className="bma-recaptcha-scale max-w-full"
                />
              </div>

              {/* =============================================
                  TRUST ITEMS
              ============================================== */}
             

              <div className="relative z-0 mt-6 grid w-full grid-cols-2 divide-x divide-[#EAECF0] border-t border-[#EAECF0] pt-4 sm:mt-7 sm:grid-cols-3 sm:pt-5">
                {/* ===========================================
                    100% CONFIDENTIAL
                ============================================ */}

                <div className="flex min-w-0 items-center justify-center gap-1.5 px-2 text-[10px] font-medium text-[#667085] sm:gap-2.5 sm:px-3 sm:text-[12px]">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    className="h-[15px] w-[15px] shrink-0 text-[#D89E0D] sm:h-[17px] sm:w-[17px]"
                    aria-hidden="true"
                  >
                    <path
                      d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />

                    <path
                      d="m9.5 12 1.7 1.7 3.5-3.8"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>

                  <span className="whitespace-nowrap">
                    100% Confidential
                  </span>
                </div>

                {/* ===========================================
                    EXPERT CONSULTATION
                ============================================ */}

                <div className="flex min-w-0 items-center justify-center gap-1.5 px-2 text-[10px] font-medium text-[#667085] sm:gap-2.5 sm:px-3 sm:text-[12px]">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    className="h-[15px] w-[15px] shrink-0 text-[#D89E0D] sm:h-[17px] sm:w-[17px]"
                    aria-hidden="true"
                  >
                    <path
                      d="M8.7 3.8 10.4 8 8 9.5a15.2 15.2 0 0 0 6.5 6.5l1.5-2.4 4.2 1.7c.5.2.8.7.8 1.2V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.5 0 1 .3 1.2.8Z"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>

                  <span className="whitespace-nowrap">
                    Expert Consultation
                  </span>
                </div>

                {/* ===========================================
                    LATEST PROJECT UPDATES

                    Hidden on mobile.
                    Visible from sm breakpoint and above.
                ============================================ */}

                <div className="hidden min-w-0 items-center justify-center gap-2.5 px-3 text-[12px] font-medium text-[#667085] sm:flex">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    className="h-[17px] w-[17px] shrink-0 text-[#D89E0D]"
                    aria-hidden="true"
                  >
                    <path
                      d="M5 19v-6m4 6V9m5 10V5m5 14v-9"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                    />
                  </svg>

                  <span className="whitespace-nowrap">
                    Latest Project Updates
                  </span>
                </div>
              </div>
            
            </form>
          </div>
        </div>
      </section>

      {/* =====================================================
          SUCCESS MODAL
      ====================================================== */}

      {showPopup && (
        <div
          className="bma-success-backdrop fixed inset-0 z-[9999] flex items-center justify-center bg-[#051A3A]/65 px-4 py-8 backdrop-blur-[3px]"
          onClick={
            closeSuccessPopup
          }
          role="presentation"
        >
          <div
            className="bma-success-modal relative w-full max-w-[440px] overflow-hidden rounded-[24px] border border-white/20 bg-white shadow-[0_30px_100px_rgba(0,0,0,0.30)]"
            onClick={(e) =>
              e.stopPropagation()
            }
            role="dialog"
            aria-modal="true"
            aria-labelledby="success-modal-title"
            aria-describedby="success-modal-description"
          >
            <div className="absolute left-0 top-0 h-[3px] w-full bg-[#EAECF0]">
              <div className="bma-success-progress h-full w-full bg-[#F6C343]" />
            </div>

            <button
              type="button"
              onClick={
                closeSuccessPopup
              }
              aria-label="Close success popup"
              className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-[#EAECF0] bg-white text-[#667085] transition-all duration-200 hover:border-[#D0D5DD] hover:bg-[#F9FAFB] hover:text-[#051A3A] focus:outline-none focus:ring-4 focus:ring-[#F6C343]/25"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="h-[18px] w-[18px]"
                aria-hidden="true"
              >
                <path
                  d="M6 6l12 12M18 6 6 18"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
            </button>

            <div className="px-6 pb-7 pt-10 text-center sm:px-9 sm:pb-9">
              <div className="bma-success-icon mx-auto flex h-[76px] w-[76px] items-center justify-center rounded-full bg-[#F6C343]/15">
                <div className="flex h-[54px] w-[54px] items-center justify-center rounded-full bg-[#F6C343] shadow-[0_10px_25px_rgba(246,195,67,0.32)]">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    className="h-7 w-7 text-[#051A3A]"
                    aria-hidden="true"
                  >
                    <path
                      d="M5 12.5 9.2 16.7 19 7"
                      stroke="currentColor"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>

              <p className="mt-5 text-[10px] font-bold uppercase tracking-[0.17em] text-[#9B710D] sm:text-[11px]">
                Request Received
              </p>

              <h3
                id="success-modal-title"
                className="mt-2 text-[27px] font-bold tracking-[-0.035em] text-[#051A3A] sm:text-[30px]"
              >
                Thank You!
              </h3>

              <p
                id="success-modal-description"
                className="mx-auto mt-3 max-w-[350px] text-[13px] leading-6 text-[#667085] sm:text-[15px]"
              >
                Your request has been
                submitted successfully.
                We&apos;ll contact you
                shortly.
              </p>

              <button
                type="button"
                onClick={
                  closeSuccessPopup
                }
                className="mt-6 inline-flex min-h-[46px] w-full items-center justify-center rounded-xl bg-[#051A3A] px-7 text-[13px] font-bold text-white transition-all duration-200 hover:bg-[#0B2B55] focus:outline-none focus:ring-4 focus:ring-[#F6C343]/25 sm:w-auto sm:min-w-[150px] sm:text-sm"
              >
                Close
              </button>

              <p className="mt-4 text-[10px] text-[#98A2B3] sm:text-[11px]">
                This message will close
                automatically in a few
                seconds.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}