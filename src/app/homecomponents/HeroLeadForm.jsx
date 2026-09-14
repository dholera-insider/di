"use client";

import { useEffect, useRef, useState } from "react";
import { FaUser } from "react-icons/fa";
import InternationalPhoneInput, {
  getInternationalPhoneValue,
  isValidInternationalPhone,
} from "../components/InternationalPhoneInput";
import { submitLead, leadStorage, loadLeadCaptcha, renderLeadCaptcha, resetLeadCaptcha } from "@/lib/lead-client";


export default function HeroLeadForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ fullName: "", phone: "" });
  const [showSubmissionSuccess, setShowSubmissionSuccess] = useState(false);
  const [submissionCount, setSubmissionCount] = useState(0);
  const [lastSubmissionTime, setLastSubmissionTime] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [recaptchaLoaded, setRecaptchaLoaded] = useState(false);
  const recaptchaRef = useRef(null);
  const submitLock = useRef(false);
  const requestLock = useRef(false);
  const latestSuccess = useRef(null);
  const mounted = useRef(true);
  useEffect(() => { mounted.current = true; return () => { mounted.current = false; }; }, []);
  const recaptchaWidgetId = useRef(null);
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  useEffect(() => {
    if (typeof window !== "undefined") {
      setSubmissionCount(
        parseInt(leadStorage.getItem("formSubmissionCount") || "0", 10),
      );
      setLastSubmissionTime(
        parseInt(leadStorage.getItem("lastSubmissionTime") || "0", 10),
      );
    }

    const loadRecaptcha = () => {
    loadLeadCaptcha().then(() => setRecaptchaLoaded(true)).catch((error) => {
      setRecaptchaLoaded(false);
      setErrorMessage(error.message);
    });
  };

    loadRecaptcha();
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
        "You have reached the maximum submission limit. Try again after 24 hours.",
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
            fields: {
              name: formData.fullName,
              phone: getInternationalPhoneValue(formData.phone),
              source: "Dholera Insider",
            },
            source: "Dholera Insider",
            tags: ["Dholera Investment", "Website Lead", "BookMyAssets"],
            recaptchaToken: token,
          }),
        },
      );
      if (!mounted.current) return;

      if (response.ok) {
        setFormData({ fullName: "", phone: "" });
        setShowSubmissionSuccess(true);
        setSubmissionCount((prev) => {
          const newCount = prev + 1;
          leadStorage.setItem("formSubmissionCount", newCount.toString());
          leadStorage.setItem("lastSubmissionTime", now.toString());
          return newCount;
        });



      } else {
        throw new Error("Error submitting form");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setErrorMessage(
        error.message || "Error submitting form. Please try again.",
      );
    } finally {
      requestLock.current = false;
      setIsLoading(false);
      submitLock.current = false;
      if (window.grecaptcha && recaptchaWidgetId.current !== null) {
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

    if (!siteKey) {
      setErrorMessage("Verification is not configured. Please call us directly.");
      setIsLoading(false);
      submitLock.current = false;
      return;
    }

    if (window.grecaptcha && Boolean(window.grecaptcha?.render)) {
      try {
        if (recaptchaWidgetId.current === null && recaptchaRef.current) {
          recaptchaWidgetId.current = renderLeadCaptcha(
            recaptchaRef.current,
            {
            "expired-callback": () => { submitLock.current = false; setIsLoading(false); setErrorMessage("Verification expired. Please try again."); },
            "error-callback": () => { submitLock.current = false; setIsLoading(false); setErrorMessage("Verification failed to connect. Please try again."); },
              sitekey: siteKey,
              callback: (...args) => latestSuccess.current(...args),
              theme: "dark",
            },
          );
        } else if (recaptchaWidgetId.current !== null) {
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
    <div className="w-full rounded-2xl border border-[#F6C343] bg-[#051A3A] p-5 shadow-2xl shadow-[#051A3A]/25 sm:p-6">
      <div className="mb-5 text-center">
        <h2 className="text-xl font-bold leading-tight text-[#FDFCFA] md:text-2xl">
         Start Your Dholera Investment
        </h2>

      </div>

      {showSubmissionSuccess ? (
        <div className="py-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#F6C343]">
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
          <h3 className="mb-2 text-2xl font-bold text-[#F6C343]">
            Thank You!
          </h3>
          <p className="text-sm leading-6 text-[#FDFCFA]/80">
            Your request has been submitted successfully. We will contact you
            shortly.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {errorMessage && (
            <div role="alert" className="rounded-lg border border-[#B42318] bg-[#B42318]/15 p-3 text-sm text-[#FDFCFA]">
              {errorMessage}
            </div>
          )}

          <div className="relative">
            <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6C7484]" />
            <input aria-label="Full name" maxLength={200} autoComplete="name"
              name="fullName"
              placeholder="Enter your full name"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-[#2B364D] bg-[#FDFCFA] p-3 pl-12 text-[#162033] placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#F6C343]"
            />
          </div>

          <InternationalPhoneInput
            value={formData.phone}
            onChange={(phone) => {
              setFormData((prevData) => ({ ...prevData, phone }));
              setErrorMessage("");
            }}
            inputProps={{
              id: "hero-phone",
              name: "phone",
              placeholder: "Enter phone number",
            }}
          />

          <div className="flex justify-center">
            <div ref={recaptchaRef}></div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#F6C343] px-6 py-4 text-lg font-bold text-[#051A3A] shadow-lg transition-all hover:bg-[#FDFCFA] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isLoading ? (
              <>
                <span className="h-5 w-5 rounded-full border-2 border-[#051A3A]/30 border-t-[#051A3A] animate-spin"></span>
                Verifying...
              </>
            ) : recaptchaLoaded ? (
              "Get A Call Back"
            ) : (
              "Loading..."
            )}
          </button>

          <p className="text-center text-xs leading-5 text-[#FDFCFA]">
            We respect your privacy. Your details are safe with us.
          </p>
        </form>
      )}
    </div>
  );
}
