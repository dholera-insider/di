"use client";

import React, { useEffect, useId, useRef, useState } from "react";

import InternationalPhoneInput, {
  getInternationalPhoneValue,
  isValidInternationalPhone,
} from "./InternationalPhoneInput";

const DAY_MS = 24 * 60 * 60 * 1000;
const MAX_SUBMISSIONS = 3;

let recaptchaPromise = null;

// Shared across instances. Do not append the same script twice.
function loadRecaptcha() {
  if (typeof window === "undefined") {
    return Promise.reject(
      new Error("Verification is only available in the browser."),
    );
  }

  if (typeof window.grecaptcha?.render === "function") {
    return Promise.resolve(window.grecaptcha);
  }

  if (recaptchaPromise) return recaptchaPromise;

  recaptchaPromise = new Promise((resolve, reject) => {
    let script = document.querySelector(
      'script[src*="/recaptcha/api.js"]',
    );

    const ownsScript = !script;

    let settled = false;
    let interval;
    let timeout;

    const finish = (error) => {
      if (settled) return;

      settled = true;

      clearInterval(interval);
      clearTimeout(timeout);

      script?.removeEventListener("error", handleError);

      if (error) {
        if (ownsScript) script?.remove();
        reject(error);
      } else {
        resolve(window.grecaptcha);
      }
    };

    const checkReady = () => {
      if (typeof window.grecaptcha?.render === "function") {
        finish();
      }
    };

    const handleError = () => {
      finish(
        new Error(
          "Verification could not load. Check your connection and try again.",
        ),
      );
    };

    if (ownsScript) {
      window.__dholeraFormRecaptchaReady = checkReady;

      script = document.createElement("script");

      script.src =
        "https://www.google.com/recaptcha/api.js?onload=__dholeraFormRecaptchaReady&render=explicit";

      script.async = true;
      script.defer = true;
    }

    script.addEventListener("error", handleError, { once: true });

    interval = setInterval(checkReady, 100);

    timeout = setTimeout(() => {
      finish(
        new Error(
          "Verification timed out. Check your connection or content blocker and try again.",
        ),
      );
    }, 15000);

    if (ownsScript) document.head.appendChild(script);

    checkReady();
  }).catch((error) => {
    recaptchaPromise = null;
    throw error;
  });

  return recaptchaPromise;
}

function readQuota(fallback) {
  let quota = fallback;

  try {
    const count = Number(
      localStorage.getItem("formSubmissionCount") ?? fallback.count,
    );

    const last = Number(
      localStorage.getItem("lastSubmissionTime") ?? fallback.last,
    );

    quota = {
      count:
        Number.isFinite(count) && count > 0
          ? Math.floor(count)
          : 0,

      last:
        Number.isFinite(last) && last > 0
          ? last
          : 0,
    };
  } catch {
    // Continue with the in-memory quota if storage is unavailable.
  }

  const elapsed = Date.now() - quota.last;

  return !quota.last || elapsed < 0 || elapsed >= DAY_MS
    ? { count: 0, last: 0 }
    : quota;
}

export default function CommonForm({
  title = "Start Your Dholera Investment",
}) {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
  });

  const [status, setStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [captchaVisible, setCaptchaVisible] = useState(false);

  const instanceId = useId();

  const nameId = `${instanceId}-name`;
  const phoneId = `${instanceId}-phone`;
  const errorId = `${instanceId}-error`;
  const headingId = `${instanceId}-heading`;

  const formDataRef = useRef(formData);
  const statusRef = useRef("idle");
  const mountedRef = useRef(false);
  const submitIntentRef = useRef(false);
  const requestActiveRef = useRef(false);
  const successRef = useRef(false);

  const quotaRef = useRef({
    count: 0,
    last: 0,
  });

  const recaptchaRef = useRef(null);
  const widgetIdRef = useRef(null);
  const requestControllerRef = useRef(null);

  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  useEffect(() => {
    mountedRef.current = true;
    quotaRef.current = readQuota(quotaRef.current);

    return () => {
      mountedRef.current = false;
      submitIntentRef.current = false;

      requestControllerRef.current?.abort();

      if (
        widgetIdRef.current !== null &&
        window.grecaptcha?.reset
      ) {
        try {
          window.grecaptcha.reset(widgetIdRef.current);
        } catch {
          // The widget may already be removed during navigation.
        }
      }
    };
  }, []);

  function updateStatus(nextStatus) {
    statusRef.current = nextStatus;

    if (mountedRef.current) {
      setStatus(nextStatus);
    }
  }

  function resetCaptcha() {
    if (
      widgetIdRef.current !== null &&
      window.grecaptcha?.reset
    ) {
      try {
        window.grecaptcha.reset(widgetIdRef.current);
      } catch {
        // Cleanup errors must not replace a submission result.
      }
    }
  }

  function preloadCaptcha() {
    if (siteKey && !successRef.current) {
      // A submit attempt will display any loading error.
      loadRecaptcha().catch(() => {});
    }
  }

  function updateField(name, value) {
    if (
      requestActiveRef.current ||
      successRef.current
    ) {
      return;
    }

    const next = {
      ...formDataRef.current,
      [name]: value ?? "",
    };

    formDataRef.current = next;

    setFormData(next);
    setErrorMessage("");

    preloadCaptcha();
  }

  function validateAndGetPayload() {
    const current = formDataRef.current;

    if (!current.fullName.trim() || !current.phone) {
      setErrorMessage("Please fill in all fields");
      return null;
    }

    if (!isValidInternationalPhone(current.phone)) {
      setErrorMessage(
        "Please enter a valid international phone number",
      );

      return null;
    }

    quotaRef.current = readQuota(quotaRef.current);

    if (quotaRef.current.count >= MAX_SUBMISSIONS) {
      setErrorMessage(
        "You have reached the maximum submission limit. Try again after 24 hours.",
      );

      return null;
    }

    return {
      fullName: current.fullName.trim(),
      phone: getInternationalPhoneValue(current.phone),
    };
  }

  function recordSuccess() {
    const current = readQuota(quotaRef.current);

    const next = {
      count: current.count + 1,
      last: Date.now(),
    };

    quotaRef.current = next;

    try {
      localStorage.setItem(
        "formSubmissionCount",
        String(next.count),
      );

      localStorage.setItem(
        "lastSubmissionTime",
        String(next.last),
      );
    } catch {
      // An accepted lead must remain successful if storage fails.
    }

    try {
      window.dataLayer = window.dataLayer || [];

      window.dataLayer.push({
        event: "lead_form",
      });
    } catch {
      // Analytics failure must not cause duplicate lead submission.
    }
  }

  async function submitVerifiedLead(token) {
    if (
      !mountedRef.current ||
      !submitIntentRef.current ||
      requestActiveRef.current ||
      successRef.current
    ) {
      return;
    }

    // Read current values, not values captured by an old callback.
    const payload = validateAndGetPayload();

    if (!payload) {
      submitIntentRef.current = false;
      updateStatus("idle");
      return;
    }

    if (!token) {
      submitIntentRef.current = false;
      updateStatus("idle");

      setErrorMessage(
        "Please complete the verification and try again.",
      );

      return;
    }

    submitIntentRef.current = false;
    requestActiveRef.current = true;

    updateStatus("submitting");
    setErrorMessage("");

    const controller = new AbortController();

    requestControllerRef.current = controller;

    const timeout = setTimeout(() => {
      controller.abort();
    }, 45000);

    try {
      const response = await fetch("/api/lead", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          ...payload,
          recaptchaToken: token,
        }),

        signal: controller.signal,
      });

      const text = await response.text();

      let result = null;

      try {
        result = JSON.parse(text);
      } catch {
        // A proxy or missing route may return HTML instead.
      }

      if (!response.ok || result?.success !== true) {
        throw new Error(
          (typeof result?.message === "string" &&
            result.message) ||
            `Unable to confirm submission (HTTP ${response.status}). Please contact us before retrying.`,
        );
      }

      successRef.current = true;

      recordSuccess();

      if (mountedRef.current) {
        const empty = {
          fullName: "",
          phone: "",
        };

        formDataRef.current = empty;

        setFormData(empty);
        updateStatus("success");
      }
    } catch (error) {
      if (mountedRef.current) {
        setErrorMessage(
          error.name === "AbortError" ||
            error instanceof TypeError
            ? "We could not confirm your submission. Check your connection and contact us before submitting again."
            : error.message ||
                "Error submitting form. Please try again.",
        );

        updateStatus("idle");
      }
    } finally {
      clearTimeout(timeout);

      requestControllerRef.current = null;
      requestActiveRef.current = false;

      if (
        mountedRef.current &&
        !successRef.current
      ) {
        resetCaptcha();
      }
    }
  }

  function handleCaptchaFailure(message) {
    if (
      !mountedRef.current ||
      requestActiveRef.current ||
      successRef.current
    ) {
      return;
    }

    submitIntentRef.current = false;

    updateStatus("idle");
    setErrorMessage(message);

    resetCaptcha();
  }

  async function handleSubmit(event) {
    event.preventDefault();
    event.stopPropagation();

    if (
      statusRef.current === "loading" ||
      requestActiveRef.current ||
      successRef.current
    ) {
      return;
    }

    setErrorMessage("");

    if (!validateAndGetPayload()) return;

    if (!siteKey) {
      setErrorMessage(
        "Verification is not configured. Please contact us directly.",
      );

      return;
    }

    submitIntentRef.current = true;

    updateStatus("loading");

    try {
      const api = await loadRecaptcha();

      if (
        !mountedRef.current ||
        successRef.current
      ) {
        return;
      }

      if (!recaptchaRef.current) {
        throw new Error(
          "Verification could not start. Please refresh and try again.",
        );
      }

      setCaptchaVisible(true);

      if (widgetIdRef.current === null) {
        widgetIdRef.current = api.render(
          recaptchaRef.current,
          {
            sitekey: siteKey,
            theme: "light",
            size: "compact",

            callback: (token) => {
              void submitVerifiedLead(token);
            },

            "expired-callback": () => {
              handleCaptchaFailure(
                "Verification expired. Please verify again and submit.",
              );
            },

            "error-callback": () => {
              handleCaptchaFailure(
                "Verification failed to connect. Check your connection and try again.",
              );
            },
          },
        );
      }

      updateStatus("verifying");

      const token = api.getResponse(widgetIdRef.current);

      if (token) {
        await submitVerifiedLead(token);
      }
    } catch (error) {
      if (mountedRef.current) {
        handleCaptchaFailure(
          error.message ||
            "Error with verification. Please try again.",
        );
      }
    }
  }

  const isBusy =
    status === "loading" ||
    status === "submitting";

  const buttonText =
    status === "loading"
      ? "Loading verification..."
      : status === "submitting"
        ? "Submitting..."
        : status === "verifying"
          ? "Complete verification"
          : "Get A Call Back";

  return (
    <section
      id="contact-form-container"
      aria-labelledby={headingId}
      onClick={(event) => event.stopPropagation()}
      className="relative isolate w-full bg-[#F7F9FC] px-3 py-7 sm:px-5 sm:py-9 md:px-6 md:py-12 lg:px-8 lg:py-14"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(circle at 10% 10%, rgba(246,195,67,0.08), transparent 30%), radial-gradient(circle at 90% 90%, rgba(5,26,58,0.05), transparent 32%)",
        }}
      />

      <div className="mx-auto w-full max-w-6xl">
        <div className="form-card relative rounded-[18px] border border-[#E7C76E] bg-white shadow-[0_18px_55px_rgba(5,26,58,0.08)] sm:rounded-[20px]">
          <div
            aria-hidden="true"
            className="absolute left-1/2 top-0 h-1 w-16 -translate-x-1/2 rounded-b-full bg-[#051A3A] sm:w-[72px]"
          />

          <div className="px-4 py-6 sm:px-6 sm:py-7 md:px-8 md:py-8 lg:px-10 lg:py-9">
            {/* Centered on desktop, tablet and mobile. */}
            <div className="mx-auto w-full max-w-3xl text-center">
              <h2
                id={headingId}
                className="text-center text-[23px] font-bold leading-[1.2] tracking-[-0.025em] text-[#10203B] sm:text-[27px] md:text-[30px] lg:text-[32px]"
              >
                {title}
              </h2>
            </div>

            {status === "success" ? (
              <div
                role="status"
                aria-live="polite"
                className="flex min-h-[220px] flex-col items-center justify-center px-2 py-6 text-center"
              >
                <div className="success-icon mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#FFF8E5] ring-1 ring-[#E7C76E]">
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="h-8 w-8 text-[#051A3A]"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>

                <h3 className="text-2xl font-bold text-[#10203B]">
                  Thank You!
                </h3>

                <p className="mt-2 max-w-lg text-sm leading-6 text-[#667085]">
                  Your request has been submitted successfully.
                  We&apos;ll contact you shortly.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                noValidate
                className="mt-6 sm:mt-7"
              >
                {errorMessage && (
                  <div
                    id={errorId}
                    role="alert"
                    className="mb-5 break-words rounded-xl border border-[#F3B7B3] bg-[#FFF4F3] px-4 py-3 text-sm leading-5 text-[#B42318]"
                  >
                    {errorMessage}
                  </div>
                )}

                <div className="grid min-w-0 grid-cols-1 items-end gap-4 md:grid-cols-2 md:gap-5 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.15fr)_auto] lg:gap-4">
                  {/* Full name */}
                  <div className="min-w-0">
                    <label
                      htmlFor={nameId}
                      className="mb-2 block text-[13px] font-semibold text-[#25324B]"
                    >
                      Full Name
                    </label>

                    <div className="flex h-12 min-w-0 items-center rounded-lg border border-[#D8DEE8] bg-[#FBFCFE] transition-colors focus-within:border-[#D8AA38] focus-within:ring-2 focus-within:ring-[#F6C343]/20">
                      <span
                        aria-hidden="true"
                        className="flex w-10 shrink-0 items-center justify-center text-[#98A2B3]"
                      >
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          className="h-[17px] w-[17px]"
                        >
                          <path
                            strokeLinecap="round"
                            d="M20 21a8 8 0 0 0-16 0"
                          />

                          <circle cx="12" cy="7" r="4" />
                        </svg>
                      </span>

                      <input
                        id={nameId}
                        type="text"
                        name="fullName"
                        autoComplete="name"
                        value={formData.fullName}
                        onFocus={preloadCaptcha}
                        onChange={(event) => {
                          updateField(
                            "fullName",
                            event.target.value,
                          );
                        }}
                        disabled={status === "submitting"}
                        required
                        aria-describedby={
                          errorMessage ? errorId : undefined
                        }
                        placeholder="Enter your name"
                        className="h-full min-w-0 flex-1 rounded-r-lg border-0 bg-transparent pr-3 text-base text-[#17233B] outline-none placeholder:text-[#9AA3B2] disabled:opacity-70 sm:text-sm"
                      />
                    </div>
                  </div>

                  {/* Existing international phone component */}
                  <div className="min-w-0">
                    <label
                      htmlFor={phoneId}
                      className="mb-2 block text-[13px] font-semibold text-[#25324B]"
                    >
                      Phone Number
                    </label>

                    <div className="phone-field-shell relative min-w-0 rounded-lg border border-[#D8DEE8] bg-[#FBFCFE] px-1 transition-colors focus-within:border-[#D8AA38] focus-within:ring-2 focus-within:ring-[#F6C343]/20">
                      <InternationalPhoneInput
                        value={formData.phone}
                        onChange={(phone) => {
                          updateField("phone", phone);
                        }}
                        inputProps={{
                          id: phoneId,
                          name: "phone",
                          autoComplete: "tel",
                          disabled: status === "submitting",
                          "aria-describedby": errorMessage
                            ? errorId
                            : undefined,
                        }}
                      />
                    </div>
                  </div>

                  {/* Single submit entry point */}
                  <div className="md:col-span-2 lg:col-span-1">
                    <button
                      type="submit"
                      disabled={isBusy}
                      className="group flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-[#051A3A] px-5 py-3 text-sm font-bold text-white shadow-[0_7px_18px_rgba(5,26,58,0.16)] transition-colors hover:bg-[#0A284F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D8AA38] focus-visible:ring-offset-2 disabled:cursor-wait disabled:opacity-65 lg:min-w-[176px]"
                    >
                      <span>{buttonText}</span>

                      {!isBusy && status !== "verifying" && (
                        <svg
                          aria-hidden="true"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          className="h-4 w-4 shrink-0 text-[#F6C343]"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 12h14m-6-6 6 6-6 6"
                          />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>

                {/* Keep the host mounted for explicit widget rendering. */}
                <div
                  className={
                    captchaVisible
                      ? "mt-5 flex min-w-0 flex-col items-center gap-3"
                      : "flex min-w-0 flex-col items-center"
                  }
                >
                  {captchaVisible && status === "verifying" && (
                    <p
                      role="status"
                      className="text-center text-sm text-[#667085]"
                    >
                      Complete the verification below. Your request
                      will then submit automatically.
                    </p>
                  )}

                  <div ref={recaptchaRef} />
                </div>

                {/* Trust indicators */}
                <div className="mt-5 grid grid-cols-1 gap-3 border-t border-[#EDF0F4] pt-5 sm:mt-6 sm:grid-cols-3 sm:gap-2">
                  <div className="flex items-center justify-center gap-2 text-xs text-[#737D8F]">
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#DCA82D"
                      strokeWidth="1.8"
                      className="h-[17px] w-[17px] shrink-0"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 3 5 6v5c0 4.6 2.8 8.2 7 10 4.2-1.8 7-5.4 7-10V6l-7-3Z"
                      />

                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m9.5 12 1.6 1.6 3.4-3.6"
                      />
                    </svg>

                    <span>100% Confidential</span>
                  </div>

                  <div className="flex items-center justify-center gap-2 text-xs text-[#737D8F] sm:border-x sm:border-[#E7EAF0]">
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#DCA82D"
                      strokeWidth="1.8"
                      className="h-[17px] w-[17px] shrink-0"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.33 1.78.62 2.63a2 2 0 0 1-.45 2.11L8 9.73a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.85.29 1.73.5 2.63.62A2 2 0 0 1 22 16.92Z"
                      />
                    </svg>

                    <span>Expert Consultation</span>
                  </div>

                  <div className="flex items-center justify-center gap-2 text-xs text-[#737D8F]">
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#DCA82D"
                      strokeWidth="1.8"
                      className="h-[17px] w-[17px] shrink-0"
                    >
                      <path
                        strokeLinecap="round"
                        d="M4 20v-6m6 6V10m6 10V4m6 16V8"
                      />
                    </svg>

                    <span>Latest Project Updates</span>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .phone-field-shell {
          width: 100%;
          min-height: 48px;
        }

        .phone-field-shell :global(input[name="phone"]) {
          min-width: 0 !important;
          max-width: 100%;
          height: 46px !important;
          border: 0 !important;
          background: transparent !important;
          box-shadow: none !important;
          font-size: 16px !important;
          color: #17233b !important;
        }

        .phone-field-shell
          :global(input[name="phone"]::placeholder) {
          color: #9aa3b2;
        }

        .phone-field-shell :global(*) {
          box-sizing: border-box;
        }

        .success-icon {
          animation: success-in 0.3s ease-out;
        }

        @keyframes success-in {
          from {
            opacity: 0;
            transform: scale(0.8);
          }

          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @media (min-width: 640px) {
          .phone-field-shell :global(input[name="phone"]) {
            font-size: 14px !important;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .success-icon {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}