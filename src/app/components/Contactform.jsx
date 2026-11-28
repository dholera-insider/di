"use client";
import { useState, useEffect, useRef } from "react";
import { FaUser } from "react-icons/fa";
import { motion } from "framer-motion";
import InternationalPhoneInput, {
  getInternationalPhoneValue,
  isValidInternationalPhone,
} from "./InternationalPhoneInput";

export default function ContactForm({
  onClose,
  title = "Talk to an Expert",
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ fullName: "", phone: "" });
  const [showPopup, setShowPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [recaptchaLoaded, setRecaptchaLoaded] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState("");
  const [isLocalDevelopment, setIsLocalDevelopment] = useState(false);
  const recaptchaRef = useRef(null);
  const widgetIdRef = useRef(null);
  const submittingRef = useRef(false);
  const mountedRef = useRef(false);
  const closeTimerRef = useRef(null);
  const submissionHistoryRef = useRef({ count: 0, time: 0 });
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  const handleClose = () => {
    if (onClose && typeof onClose === 'function') {
      onClose();
    }
  };

  useEffect(() => {
    mountedRef.current = true;
    let readinessTimer;
    let script;
    let attempts = 0;

    try {
      submissionHistoryRef.current = {
        count: Number(localStorage.getItem("formSubmissionCount")) || 0,
        time: Number(localStorage.getItem("lastSubmissionTime")) || 0,
      };
    } catch {
      // Browser storage restrictions must not prevent a CRM submission.
    }

    const loadingFailed = () => {
      window.clearTimeout(readinessTimer);
      if (!mountedRef.current) return;
      setRecaptchaLoaded(false);
      setRecaptchaToken("");
      setErrorMessage(
        "Verification could not load. Please check your connection and refresh the page."
      );
    };

    const renderWhenReady = () => {
      if (!mountedRef.current) return;

      // api.js can finish loading before the widget API is ready.
      if (typeof window.grecaptcha?.render !== "function") {
        if (attempts++ < 150) {
          readinessTimer = window.setTimeout(renderWhenReady, 100);
        } else {
          loadingFailed();
        }
        return;
      }

      try {
        if (widgetIdRef.current === null) {
          widgetIdRef.current = window.grecaptcha.render(recaptchaRef.current, {
            sitekey: siteKey,
            theme: "dark",
            callback: (token) => {
              if (!mountedRef.current) return;
              setRecaptchaToken(token);
              setErrorMessage("");
            },
            "expired-callback": () => {
              if (!mountedRef.current || submittingRef.current) return;
              setRecaptchaToken("");
              setErrorMessage("Verification expired. Please verify again.");
            },
            "error-callback": () => {
              if (!mountedRef.current || submittingRef.current) return;
              setRecaptchaToken("");
              setErrorMessage("Verification failed. Please check your connection and try again.");
            },
          });
        }
        setRecaptchaLoaded(true);
      } catch {
        loadingFailed();
      }
    };

    const localDevelopment =
      process.env.NODE_ENV === "development" &&
      ["localhost", "127.0.0.1", "[::1]"].includes(window.location.hostname);
    setIsLocalDevelopment(localDevelopment);

    if (localDevelopment) {
      // Production keys may not allow localhost. The server checks this too.
      setRecaptchaLoaded(true);
    } else if (!siteKey) {
      setErrorMessage("Verification is temporarily unavailable. Please contact us directly.");
    } else {
      // Share the existing script, but keep this form's widget and token separate.
      script = document.querySelector('script[src^="https://www.google.com/recaptcha/api.js"]');
      if (!script && typeof window.grecaptcha?.render !== "function") {
        script = document.createElement("script");
        script.src = "https://www.google.com/recaptcha/api.js";
        script.async = true;
        script.defer = true;
        document.head.appendChild(script);
      }
      script?.addEventListener("error", loadingFailed);
      renderWhenReady();
    }

    return () => {
      mountedRef.current = false;
      window.clearTimeout(readinessTimer);
      window.clearTimeout(closeTimerRef.current);
      script?.removeEventListener("error", loadingFailed);
      if (widgetIdRef.current !== null) {
        try {
          window.grecaptcha?.reset(widgetIdRef.current);
        } catch {
          // The widget may already have been removed when the modal closes.
        }
      }
    };
  }, [siteKey]);

  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === "Escape") onClose?.();
    };

    document.addEventListener("keydown", handleEscapeKey);
    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [onClose]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setErrorMessage("");
  };

  const validateForm = () => {
    if (!formData.fullName.trim() || !formData.phone) {
      setErrorMessage("Please fill in all fields");
      return false;
    }

    if (!isValidInternationalPhone(formData.phone)) {
      setErrorMessage("Please enter a valid international phone number");
      return false;
    }

    const now = Date.now();
    const history = submissionHistoryRef.current;
    const hoursPassed = (now - history.time) / (1000 * 60 * 60);

    if (hoursPassed >= 24) {
      submissionHistoryRef.current = { count: 0, time: 0 };
    } else if (history.count >= 3) {
      setErrorMessage(
        "You have reached the maximum submission limit. Try again after 24 hours."
      );
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submittingRef.current) return;
    setErrorMessage("");

    if (!validateForm()) return;

    if (!isLocalDevelopment && (!recaptchaLoaded || !recaptchaToken)) {
      setErrorMessage("Please complete the verification before submitting.");
      return;
    }

    submittingRef.current = true;
    setIsLoading(true);

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: formData.fullName.trim(),
          phone: getInternationalPhoneValue(formData.phone),
          ...(isLocalDevelopment
            ? { formType: "contact-modal" }
            : { recaptchaToken }),
        }),
      });
      const data = await response.json().catch(() => null);

      if (!response.ok || data?.success !== true) {
        throw new Error(data?.message || "Unable to submit your request. Please try again.");
      }

      if (!mountedRef.current) return;

      setFormData({ fullName: "", phone: "" });
      setShowPopup(true);
      const history = {
        count: submissionHistoryRef.current.count + 1,
        time: Date.now(),
      };
      submissionHistoryRef.current = history;
      try {
        localStorage.setItem("formSubmissionCount", history.count.toString());
        localStorage.setItem("lastSubmissionTime", history.time.toString());
      } catch {
        // The lead was accepted even if browser storage is unavailable.
      }

      closeTimerRef.current = window.setTimeout(() => onClose?.(), 2000);
      try {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({ event: "lead_form" });
      } catch {
        // Analytics must not change the outcome of a successful submission.
      }
    } catch (error) {
      console.error("Form submission error:", error);
      if (mountedRef.current) {
        setErrorMessage(error.message || "Error submitting form. Please try again.");
      }
    } finally {
      submittingRef.current = false;
      if (mountedRef.current) {
        setIsLoading(false);
        setRecaptchaToken("");
        if (widgetIdRef.current !== null) {
          try {
            window.grecaptcha?.reset(widgetIdRef.current);
          } catch {
            setRecaptchaLoaded(false);
          }
        }
      }
    }
  };

  return (
    <div
      className="fixed inset-0 flex justify-center items-start overflow-y-auto overscroll-contain bg-black bg-opacity-50 p-4 z-[1000]"
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-form-title"
    >
      <motion.div
        id="contact-form-container"
        initial={{ scale: 0.9, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 50 }}
        className="my-auto bg-[#051A3A] text-[#FDFCFA] p-8 rounded-xl shadow-2xl border border-[#F6C343] max-w-md w-full relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            handleClose();
          }}
          className="absolute top-4 right-4 text-[#FDFCFA]/80 hover:text-[#F6C343] focus:outline-none"
          aria-label="Close form"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center mb-6"
        >
          <h2
            id="contact-form-title"
            className="text-xl md:text-3xl font-bold text-white mb-2"
          >
            {title}
          </h2>
          {/* <p className="text-[#FDFCFA]/80 text-sm">
            Get Expert Guidance on Dholera Investment
          </p> */}
        </motion.div>

        {showPopup ? (
          <div className="text-center py-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="mb-4 inline-block"
            >
              <div className="w-16 h-16 bg-[#F6C343] rounded-full flex items-center justify-center mx-auto">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 text-[#051A3A]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </motion.div>
            <h3 className="text-2xl font-bold text-white mb-2">Thank You!</h3>
            <p className="text-[#FDFCFA]/80">
              Your request has been submitted successfully. We&apos;ll contact you
              shortly.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            {errorMessage && (
              <div role="alert" className="rounded-lg border border-[#B42318] bg-[#B42318]/15 p-3 text-sm text-[#FDFCFA]">
                {errorMessage}
              </div>
            )}

            <div className="relative">
              <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#6C7484]" />
              <input
                name="fullName"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleChange}
                required
                maxLength={200}
                autoComplete="name"
                disabled={isLoading}
                className="w-full rounded-lg border border-[#2B364D] bg-[#FDFCFA] p-4 pl-12 text-[#162033] placeholder:text-[#6C7484] focus:outline-none focus:ring-2 focus:ring-[#F6C343]"
              />
            </div>

            <div className="relative">
              <InternationalPhoneInput
                value={formData.phone}
                onChange={(phone) => {
                  setFormData((prevData) => ({ ...prevData, phone }));
                  setErrorMessage("");
                }}
                inputProps={{
                  id: "phone",
                  name: "phone",
                  placeholder: "Phone Number",
                  disabled: isLoading,
                }}
              />
            </div>

            {!isLocalDevelopment && (
              <div className="flex justify-center">
                <div ref={recaptchaRef}></div>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading || !recaptchaLoaded}
              className="w-full py-3 px-6 bg-[#F6C343] text-[#051A3A] rounded-lg hover:bg-[#FDFCFA] transition-all shadow-lg hover:shadow-[#F6C343]/20 font-semibold disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading
                ? "Submitting..."
                : recaptchaLoaded
                  ? "Get a Call Back"
                  : "Loading..."}
            </button>
          </form>
        )}
      </motion.div>
    </div>
  );
}
