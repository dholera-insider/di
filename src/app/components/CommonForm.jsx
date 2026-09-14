"use client";
import { useState, useEffect, useRef } from "react";
import React from "react";
// REMOVED: import { motion } from "framer-motion";
import "../about-us/about.css";
import InternationalPhoneInput, {
  getInternationalPhoneValue,
  isValidInternationalPhone,
} from "./InternationalPhoneInput";
import { submitLead, leadStorage, loadLeadCaptcha, renderLeadCaptcha, resetLeadCaptcha } from "@/lib/lead-client";


export default function CommonForm({ title = "Start Your Dholera Investment" }) {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ fullName: "", phone: "" });
  const [showPopup, setShowPopup] = useState(false);
  const [submissionCount, setSubmissionCount] = useState(0);
  const [lastSubmissionTime, setLastSubmissionTime] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [recaptchaLoaded, setRecaptchaLoaded] = useState(false);
  const [userInteracted, setUserInteracted] = useState(false);
  const recaptchaRef = useRef(null);
  const submitLock = useRef(false);
  const requestLock = useRef(false);
  const latestSuccess = useRef(null);
  const mounted = useRef(true);
  useEffect(() => { mounted.current = true; return () => { mounted.current = false; }; }, []);
  const recaptchaWidgetId = useRef(null);
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  // OPTIMIZATION: Lazy load reCAPTCHA only after user interaction
  const loadRecaptcha = () => {
    loadLeadCaptcha().then(() => setRecaptchaLoaded(true)).catch((error) => {
      setRecaptchaLoaded(false);
      setErrorMessage(error.message);
    });
  };

  useEffect(() => {
    // Get submission count from localStorage
    if (typeof window !== "undefined") {
      setSubmissionCount(
        parseInt(leadStorage.getItem("formSubmissionCount") || "0", 10),
      );
      setLastSubmissionTime(
        parseInt(leadStorage.getItem("lastSubmissionTime") || "0", 10),
      );
    }

    // Prevent modal close when clicking inside
    const handleClickInside = (e) => {
      e.stopPropagation();
    };

    const formElement = document.getElementById("contact-form-container");
    if (formElement) {
      formElement.addEventListener("click", handleClickInside);
    }

    return () => {
      if (formElement) {
        formElement.removeEventListener("click", handleClickInside);
      }
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setErrorMessage("");

    // OPTIMIZATION: Load reCAPTCHA on first user interaction
    if (!userInteracted) {
      setUserInteracted(true);
      loadRecaptcha();
    }
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
      if (typeof window !== "undefined") {
        leadStorage.setItem("formSubmissionCount", "0");
        leadStorage.setItem("lastSubmissionTime", now.toString());
      }
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
      const response = await submitLead(
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",

          },
          body: JSON.stringify({
            recaptchaToken: token,
            fields: {
              name: formData.fullName,
              phone: getInternationalPhoneValue(formData.phone),
              source: "Dholera Insider",
            },
            source: "Dholera Insider Website",
            tags: ["Dholera Investment", "Website Lead"],
          }),
        },
      );
      if (!mounted.current) return;

      const responseText = await response.text();

      if (response.ok) {
        setFormData({ fullName: "", phone: "" });
        setShowPopup(true);
        setSubmissionCount((prev) => {
          const newCount = prev + 1;
          if (typeof window !== "undefined") {
            leadStorage.setItem("formSubmissionCount", newCount.toString());
            leadStorage.setItem("lastSubmissionTime", Date.now().toString());
          }
          return newCount;
        });


      } else {
        let errorData;
        try {
          errorData = JSON.parse(responseText);
        } catch {
          errorData = { message: responseText };
        }
        throw new Error(errorData.message || "Error submitting form");
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
        try {
          resetLeadCaptcha(recaptchaRef.current);
        } catch (err) {
          console.error("Error resetting reCAPTCHA:", err);
        }
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

    // Ensure reCAPTCHA is loaded before proceeding
    if (!Boolean(window.grecaptcha?.render)) {
      loadRecaptcha();
      setErrorMessage("Loading verification... Please try again in a moment.");
      setIsLoading(false);
      submitLock.current = false;
      return;
    }

    if (window.grecaptcha && Boolean(window.grecaptcha?.render) && siteKey) {
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
    <div>
      {/* OPTIMIZATION: Use CSS animation instead of Framer Motion */}
      <style jsx>{`
        @keyframes scaleIn {
          from {
            transform: scale(0);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
        .success-icon {
          animation: scaleIn 0.3s ease-out;
        }
      `}</style>

      <section className="bg-[#051A3A] py-12">
        <div className="container mx-auto px-6 sm:px-8">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-white text-lg md:text-2xl font-bold text-center">
              {title}
            </h2>
            {showPopup ? (
              <div className="text-center py-8">
                {/* CHANGED: Replaced motion.div with CSS animation */}
                <div className="mb-4 inline-block success-icon">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#F6C343]">
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
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  Thank You!
                </h3>
                <p className="text-[#FDFCFA]/80">
                  Your request has been submitted successfully. We&apos;ll contact
                  you shortly.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="mt-12 max-w-4xl mx-auto space-y-6"
              >
                {errorMessage && (
                  <div role="alert" className="rounded-lg border border-[#B42318] bg-[#B42318]/15 p-3 text-sm text-[#FDFCFA]">
                    {errorMessage}
                  </div>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="fullName"
                      className="block text-white text-sm font-medium mb-2"
                    >
                      Full Name
                    </label>
                    <input aria-label="Full name" maxLength={200} autoComplete="name"
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                      className="w-full rounded-lg border border-[#2B364D] bg-[#FDFCFA] px-4 py-3 text-[#162033] placeholder:text-[#6C7484] focus:outline-none focus:ring-2 focus:ring-[#F6C343]"
                      placeholder="Enter your name"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-white text-sm font-medium mb-2"
                    >
                      Phone Number
                    </label>
                    <InternationalPhoneInput
                      value={formData.phone}
                      onChange={(phone) => {
                        setFormData((prevData) => ({
                          ...prevData,
                          phone,
                        }));
                        setErrorMessage("");

                        if (!userInteracted) {
                          setUserInteracted(true);
                          loadRecaptcha();
                        }
                      }}
                      inputProps={{
                        id: "phone",
                        name: "phone",
                      }}
                    />
                  </div>
                </div>

                <div className="flex justify-center">
                  <div ref={recaptchaRef}></div>
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full rounded-lg bg-[#F6C343] px-6 py-3 font-bold text-[#051A3A] transition duration-300 hover:bg-[#FDFCFA] disabled:bg-[#6C7484] disabled:text-[#FDFCFA]"
                  >
                    {isLoading ? "Submitting..." : "Get A Call Back"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
