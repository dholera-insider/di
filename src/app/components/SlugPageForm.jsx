"use client";
import { useState, useEffect, useRef } from "react";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import InternationalPhoneInput, {
  getInternationalPhoneValue,
  isValidInternationalPhone,
} from "./InternationalPhoneInput";
import { submitLead, leadStorage, loadLeadCaptcha, renderLeadCaptcha, resetLeadCaptcha } from "@/lib/lead-client";


export default function SlugPageForm() {
  // Popup states
  const [showFormPopup, setShowFormPopup] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    mobileNumber: "",
    email: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [recaptchaLoaded, setRecaptchaLoaded] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  const [debugScroll, setDebugScroll] = useState(0); // Add this for debugging

  const recaptchaRef = useRef(null);
  const submitLock = useRef(false);
  const requestLock = useRef(false);
  const latestSuccess = useRef(null);
  const mounted = useRef(true);
  const closeTimer = useRef(null);
  useEffect(() => { mounted.current = true; return () => { mounted.current = false; clearTimeout(closeTimer.current); }; }, []);
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  useEffect(() => {
  const handleScroll = () => {
    if (hasTriggered) return;

    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    // Better calculation to avoid division by zero
    const scrollableDistance = Math.max(documentHeight - windowHeight, 1);
    const scrollPercent = (scrollPosition / scrollableDistance) * 100;

    setDebugScroll(scrollPercent);

    if (scrollPercent >= 30 && !hasTriggered && !document.querySelector('[role="dialog"], [aria-modal="true"]')) {
      setShowFormPopup(true);
      setHasTriggered(true);
    }
  };

  // Initial check in case user refreshes mid-scroll
  handleScroll();

  window.addEventListener('scroll', handleScroll, { passive: true });
  return () => window.removeEventListener('scroll', handleScroll);
}, [hasTriggered]);

  // Load reCAPTCHA
  useEffect(() => {
    const loadRecaptcha = () => {
    loadLeadCaptcha().then(() => setRecaptchaLoaded(true)).catch((error) => {
      setRecaptchaLoaded(false);
      setErrorMessage(error.message);
    });
  };

    loadRecaptcha();

    // Escape key handler
    const handleEscapeKey = (event) => {
      if (event.key === 'Escape' && showFormPopup) {
        handlePopupClose();
      }
    };
    document.addEventListener('keydown', handleEscapeKey);

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [showFormPopup, siteKey]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setErrorMessage("");
  };

  const validateForm = () => {
    if (!formData.fullName.trim() || !formData.mobileNumber.trim()) {
      setErrorMessage("Please fill in all required fields");
      return false;
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setErrorMessage("Please enter a valid email address");
      return false;
    }

    if (!isValidInternationalPhone(formData.mobileNumber)) {
      setErrorMessage("Please enter a valid international phone number");
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
            fields: {
              name: formData.fullName,
              phone: getInternationalPhoneValue(formData.mobileNumber),
              source: "Dholera Insider",
            },
            source: "Dholera Insider Popup",
            tags: ["Dholera Investment", "Popup Lead", "Dholera Insider"],
            recaptchaToken: token,
          }),
        }
      );
      if (!mounted.current) return;

      if (response.ok) {
        setFormData({ fullName: "", mobileNumber: ""});
        setShowThankYou(true);

        closeTimer.current = setTimeout(() => {
          setShowThankYou(false);
          setShowFormPopup(false);
        }, 3000);



      } else {
        throw new Error("Error submitting form");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setErrorMessage(error.message || "Error submitting form. Please try again.");
    } finally {
      requestLock.current = false;
      setIsLoading(false);
      submitLock.current = false;
      if (window.grecaptcha && recaptchaRef.current) {
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

    if (!Boolean(window.grecaptcha?.render) || !window.grecaptcha) {
      setErrorMessage("Security verification not loaded. Please refresh the page.");
      setIsLoading(false);
      submitLock.current = false;
      return;
    }

    if (!recaptchaRef.current.innerHTML) {
      try {
        renderLeadCaptcha(recaptchaRef.current, {
            "expired-callback": () => { submitLock.current = false; setIsLoading(false); setErrorMessage("Verification expired. Please try again."); },
            "error-callback": () => { submitLock.current = false; setIsLoading(false); setErrorMessage("Verification failed to connect. Please try again."); },
          sitekey: siteKey,
          callback: (...args) => latestSuccess.current(...args),
          theme: "light",
        });
      } catch (error) {
        console.error("Error rendering reCAPTCHA:", error);
        setErrorMessage("Error with verification. Please try again.");
        setIsLoading(false);
      submitLock.current = false;
      }
    } else {
      resetLeadCaptcha(recaptchaRef.current);
    }
  };

  const handlePopupClose = () => {
    setShowFormPopup(false);
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      handlePopupClose();
    }
  };

  // Debug component to show scroll percentage
  /* const DebugInfo = () => (
    <div style={{
      position: 'fixed',
      top: '10px',
      right: '10px',
      background: 'rgba(0,0,0,0.7)',
      color: 'white',
      padding: '10px',
      borderRadius: '5px',
      zIndex: 1000,
      fontSize: '14px'
    }}>
      Scroll: {debugScroll.toFixed(2)}%
    </div>
  ); */

  return (
    <>


      <AnimatePresence>
        {showFormPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4"
            onClick={handleBackdropClick}
            role="dialog"
            aria-modal="true"
            aria-label="Talk to a Dholera Expert"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#051A3A] rounded-xl p-5 sm:p-8 max-w-md w-full shadow-2xl border border-[#F6C343] relative max-h-[calc(100dvh-2rem)] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {showThankYou ? (
                <div className="text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="mb-6"
                  >
                    <div className="w-16 h-16 bg-[#F6C343] rounded-full flex items-center justify-center mx-auto">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8 text-[#051A3A]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </motion.div>
                  <h3 className="text-2xl font-bold text-white mb-2">Thank You!</h3>
                  <p className="text-[#FDFCFA]/80">We will contact you shortly.</p>
                </div>
              ) : (
                <>
                  {/* Section 1: Heading */}
                  <div className="text-center mb-6">
                    <button
                      onClick={handlePopupClose}
                      className="absolute top-4 right-4 text-[#FDFCFA]/70 hover:text-[#F6C343] text-2xl"
                    >
                      ×
                    </button>

                    {/* Section 2: Sub-heading CTA */}
                    <p className="text-xl md:text-2xl text-white font-semibold">
                      Get Dholera Project Details
                    </p>
                  </div>

                  {/* Section 3: Form Fields */}
                  <form onSubmit={handleSubmit}>
                    {errorMessage && (
                        <div role="alert" className="rounded-lg border border-[#B42318] bg-[#B42318]/15 p-3 text-sm text-[#FDFCFA] mb-4">
                        {errorMessage}
                      </div>
                    )}

                    <div className="space-y-4 mb-6">
                      <div>
                        <label htmlFor="fullName" className="block text-white text-sm font-medium mb-2">
                          Full Name *
                        </label>
                        <input aria-label="Full name" maxLength={200} autoComplete="name"
                          type="text"
                          id="fullName"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleChange}
                          required
                          className="w-full rounded-lg border border-[#2B364D] bg-[#FDFCFA] px-4 py-3 text-[#162033] placeholder:text-[#6C7484] focus:outline-none focus:ring-2 focus:ring-[#F6C343]"
                          placeholder="Enter your full name"
                        />
                      </div>

                      <div>
                        <label htmlFor="mobileNumber" className="block text-white text-sm font-medium mb-2">
                          Mobile Number *
                        </label>
                        <InternationalPhoneInput
                          value={formData.mobileNumber}
                          onChange={(phone) => {
                            setFormData((prevData) => ({
                              ...prevData,
                              mobileNumber: phone,
                            }));
                            setErrorMessage("");
                          }}
                          inputProps={{
                            id: "mobileNumber",
                            name: "mobileNumber",
                            placeholder: "Enter phone number",
                          }}
                        />
                      </div>
                    </div>

                    <div className="flex justify-center mb-4">
                      <div ref={recaptchaRef}></div>
                    </div>

                    {/* Section 4: Submit Button with Tagline */}
                    <button
                      type="submit"
                      disabled={isLoading}
                      className={`w-full font-bold py-3 px-6 rounded-lg transition-all duration-300 ${
                        isLoading || !recaptchaLoaded
                          ? "bg-[#6C7484] cursor-not-allowed text-[#FDFCFA]"
                          : "bg-[#F6C343] hover:bg-[#FDFCFA] text-[#051A3A] transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl"
                      }`}
                    >
                      {isLoading ? (
                        <div className="flex items-center justify-center">
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Submitting...
                        </div>
                      ) : (
                        "Get A Call Back"
                      )}
                    </button>

                    {/* Section 5: Privacy Notice */}
                    <div className="text-center mt-4">
                        <p className="text-xs text-[#FDFCFA]/70">
                        We respect your privacy. Your details are safe with us.
                      </p>
                    </div>
                  </form>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
