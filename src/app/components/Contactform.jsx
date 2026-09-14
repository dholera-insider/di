"use client";
import { useState, useEffect, useRef, useId } from "react";
import { FaUser } from "react-icons/fa";
import Image from "next/image";
import { motion } from "framer-motion";
import logo from "@/app/assets/icons/logo.png";
import useLeadDialog from "./useLeadDialog";
import InternationalPhoneInput, {
  getInternationalPhoneValue,
  isValidInternationalPhone,
} from "./InternationalPhoneInput";
import { submitLead, leadStorage, loadLeadCaptcha, renderLeadCaptcha, resetLeadCaptcha } from "@/lib/lead-client";


export default function ContactForm({
  onClose,
  title = "Talk to a Dholera Expert",
}) {
  const [isLoading, setIsLoading] = useState(false);
  const dialogRef = useLeadDialog();
  const headingId = useId();
  const [formData, setFormData] = useState({ fullName: "", phone: "" });
  const [showPopup, setShowPopup] = useState(false);
  const [submissionCount, setSubmissionCount] = useState(0);
  const [lastSubmissionTime, setLastSubmissionTime] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [recaptchaLoaded, setRecaptchaLoaded] = useState(false);
  const recaptchaRef = useRef(null);
  const submitLock = useRef(false);
  const requestLock = useRef(false);
  const latestSuccess = useRef(null);
  const mounted = useRef(true);
  const closeTimer = useRef(null);
  useEffect(() => { mounted.current = true; return () => { mounted.current = false; clearTimeout(closeTimer.current); }; }, []);
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  const handleClose = () => {
    if (onClose && typeof onClose === 'function') {
      onClose();
    }
  };



  useEffect(() => {
    const loadRecaptcha = () => {
    loadLeadCaptcha().then(() => setRecaptchaLoaded(true)).catch((error) => {
      setRecaptchaLoaded(false);
      setErrorMessage(error.message);
    });
  };

    loadRecaptcha();

    if (typeof window !== "undefined") {
      setSubmissionCount(
        parseInt(leadStorage.getItem("formSubmissionCount") || "0", 10)
      );
      setLastSubmissionTime(
        parseInt(leadStorage.getItem("lastSubmissionTime") || "0", 10)
      );
    }

    const handleClickInside = (e) => {
      e.stopPropagation();
    };

    const handleEscapeKey = (event) => {
      if (event.key === 'Escape') {
        handleClose();
      }
    };

    document.addEventListener('keydown', handleEscapeKey);

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setErrorMessage("");
  };

  const validateForm = () => {
    if (!formData.fullName || !formData.phone) {
      setErrorMessage("Please fill in all fields");
      return false;
    }

    if (!isValidInternationalPhone(formData.phone)) {
      setErrorMessage("Please enter a valid international phone number");
      return false;
    }

    const now = Date.now();
    const hoursPassed = (now - lastSubmissionTime) / (1000 * 60 * 60);

    if (hoursPassed >= 24) {
      setSubmissionCount(0);
      leadStorage.setItem("formSubmissionCount", "0");
      leadStorage.setItem("lastSubmissionTime", now.toString());
    } else if (submissionCount >= 3) {
      setErrorMessage(
        "You have reached the maximum submission limit. Try again after 24 hours."
      );
      return false;
    }

    return true;
  };

  const onRecaptchaSuccess = async (token) => {
    if (!mounted.current) return;
    if (requestLock.current) return;
    requestLock.current = true;
    try {
      const now = Date.now();

      const response = await submitLead(
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",

          },
          body: JSON.stringify({
            fullName: formData.fullName,
            phone: getInternationalPhoneValue(formData.phone),
            recaptchaToken: token,
            source: "Dholera Insider",
          }),
        }
      );
      if (!mounted.current) return;

      const data =
        response.status !== 204 ? await response.json().catch(() => ({})) : {};

      if (response.ok) {
        setFormData({ fullName: "", phone: "" });
        setShowPopup(true);
        setSubmissionCount((prev) => {
          const newCount = prev + 1;
          leadStorage.setItem("formSubmissionCount", newCount.toString());
          leadStorage.setItem("lastSubmissionTime", now.toString());
          return newCount;
        });

        closeTimer.current = setTimeout(() => {
          if (onClose) onClose();
        }, 2000);


      } else {
        throw new Error(data.message || "Error submitting form");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setErrorMessage(
        error.message || "Error submitting form. Please try again."
      );
    } finally {
      requestLock.current = false;
      setIsLoading(false);
      submitLock.current = false;

      if (window.grecaptcha && recaptchaRef.current) {
        resetLeadCaptcha(recaptchaRef.current);
      }
    }
  };
  useEffect(() => { latestSuccess.current = onRecaptchaSuccess; });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitLock.current) return;
    submitLock.current = true;
    setIsLoading(true);
    setErrorMessage("");
    try {
      await loadLeadCaptcha();
      if (!mounted.current) return;
      setRecaptchaLoaded(true);
    } catch (error) {
      setErrorMessage(error.message);
      setIsLoading(false);
      submitLock.current = false;
      return;
    }

    if (!validateForm()) {
      setIsLoading(false);
      submitLock.current = false;
      return;
    }

    if (window.grecaptcha && Boolean(window.grecaptcha?.render)) {
      try {
        if (recaptchaRef.current && !recaptchaRef.current.innerHTML) {
          renderLeadCaptcha(recaptchaRef.current, {
            "expired-callback": () => { submitLock.current = false; setIsLoading(false); setErrorMessage("Verification expired. Please try again."); },
            "error-callback": () => { submitLock.current = false; setIsLoading(false); setErrorMessage("Verification failed to connect. Please try again."); },
            sitekey: siteKey,
            callback: (...args) => latestSuccess.current(...args),
            theme: "dark",
          });
        } else {
          resetLeadCaptcha(recaptchaRef.current);
        }
      } catch (error) {
        console.error("Error rendering reCAPTCHA:", error);
        setErrorMessage("Error with verification. Please try again.");
        setIsLoading(false);
      submitLock.current = false;
      }
    } else {
      setErrorMessage("reCAPTCHA not loaded. Please refresh and try again.");
      setIsLoading(false);
      submitLock.current = false;
    }
  };

  return (
    <div
      className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 p-4 z-[1000]"
      onClick={onClose}
      role="dialog"
      ref={dialogRef}
      aria-modal="true"
      aria-labelledby={headingId}
    >
      <motion.div
        id="contact-form-container"
        initial={{ scale: 0.9, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 50 }}
        className="bg-[#051A3A] text-[#FDFCFA] p-5 sm:p-8 rounded-xl shadow-2xl border border-[#F6C343] max-w-md w-full relative max-h-[calc(100dvh-2rem)] overflow-y-auto"
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
            id={headingId}
            className="text-xl md:text-3xl font-bold text-white mb-2"
          >
            {title}
          </h2>
          <p className="text-[#FDFCFA]/80 text-sm">
            Get Expert Guidance on Dholera Investment
          </p>
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
              <input aria-label="Full name" maxLength={200} autoComplete="name"
                name="fullName"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleChange}
                required
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
                  id: `${headingId}-phone`,
                  name: "phone",
                  placeholder: "Phone Number",
                }}
              />
            </div>

            <div className="flex justify-center">
              <div ref={recaptchaRef}></div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-6 bg-[#F6C343] text-[#051A3A] rounded-lg hover:bg-[#FDFCFA] transition-all shadow-lg hover:shadow-[#F6C343]/20 font-semibold disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading
                ? "Verifying..."
                : recaptchaLoaded
                  ? "Get A Call Back"
                  : "Loading..."}
            </button>
          </form>
        )}
      </motion.div>
    </div>
  );
}
