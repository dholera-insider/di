"use client"
import { useState, useEffect, useRef } from "react";
import { FaUser, FaEnvelope } from "react-icons/fa";
import InternationalPhoneInput, {
  getInternationalPhoneValue,
  isValidInternationalPhone,
} from "../components/InternationalPhoneInput";

export default function LeadForm({ title, headline, buttonName, onClose }) {
  const [isLoading, setIsLoading] = useState(false);
  const [submissionCount, setSubmissionCount] = useState(0);
  const [isDisabled, setIsDisabled] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [recaptchaLoaded, setRecaptchaLoaded] = useState(false);
  const recaptchaRef = useRef(null);
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    // Load reCAPTCHA script
    const loadRecaptcha = () => {
      if (typeof window !== "undefined" && !window.grecaptcha) {
        const script = document.createElement("script");
        script.src = "https://www.google.com/recaptcha/api.js";
        script.async = true;
        script.defer = true;
        script.onload = () => setRecaptchaLoaded(true);
        script.onerror = () => {
          console.error("Failed to load reCAPTCHA script");
          setRecaptchaLoaded(true); // Still allow form submission
        };
        document.head.appendChild(script);
      } else if (window.grecaptcha) {
        setRecaptchaLoaded(true);
      }
    };

    loadRecaptcha();

    // Cleanup function
    return () => {
      if (window.grecaptcha && recaptchaRef.current) {
        try {
          window.grecaptcha.reset();
        } catch (e) {
          console.log("reCAPTCHA cleanup error:", e);
        }
      }
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrorMessage(""); // Clear error on change
  };

  const validateForm = () => {
    if (!formData.fullName || !formData.phone) {
      setErrorMessage("Please fill in all required fields");
      return false;
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setErrorMessage("Please enter a valid email address");
      return false;
    }

    if (!isValidInternationalPhone(formData.phone)) {
      setErrorMessage("Please enter a valid international phone number");
      return false;
    }

    return true;
  };

  const onRecaptchaSuccess = async (token) => {
    try {
      // Get submission count and last submission timestamp
      let submissionCount = localStorage.getItem("formSubmissionCount") || 0;
      let lastSubmissionTime = localStorage.getItem("lastSubmissionTime");

      // Check if 24 hours have passed since the last submission
      if (lastSubmissionTime) {
        const timeDifference = Date.now() - parseInt(lastSubmissionTime, 10);
        const hoursPassed = timeDifference / (1000 * 60 * 60);

        if (hoursPassed >= 24) {
          // Reset submission count after 24 hours
          submissionCount = 0;
          localStorage.setItem("formSubmissionCount", 0);
          localStorage.setItem("lastSubmissionTime", Date.now().toString());
        }
      }

      // Restrict submission after 20 attempts
      if (submissionCount >= 3) {
        setErrorMessage("You have reached the maximum submission limit. Try again after 24 hours.");
        setIsDisabled(true);
        return;
      }

      // API Request
      const response = await fetch(
        "https://api.telecrm.in/enterprise/67a30ac2989f94384137c2ff/autoupdatelead",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_TELECRM_API_KEY}`,
          },
          body: JSON.stringify({
            fields: {
              name: formData.fullName,
              phone: getInternationalPhoneValue(formData.phone),
              email: formData.email,
              source: "Dholera Insider",
            },
            source: "Dholera Insider Website",
            tags: ["Dholera Investment", "Website Lead"],
            recaptchaToken: token,
          }),
        }
      );

      // Store response text before parsing
      const responseText = await response.text();

      // Check response status and handle accordingly
      if (response.ok) {
        if (
          responseText === "OK" ||
          responseText.toLowerCase().includes("success")
        ) {
          setFormData({ fullName: "", email: "", phone: "" });
          setShowPopup(true);

          // Increment submission count & store time
          submissionCount++;
          setSubmissionCount(submissionCount);
          localStorage.setItem("formSubmissionCount", submissionCount);
          localStorage.setItem("lastSubmissionTime", Date.now().toString());
          window.dataLayer = window.dataLayer || [];
          window.dataLayer.push({
            event: "lead_form",
            page_name:project
          });

        } else {
          console.log("Response Text:", responseText);
          setErrorMessage("Submission received but with unexpected response");
        }
      } else {
        console.error("Server Error:", responseText);
        throw new Error(responseText || "Submission failed");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setErrorMessage(`Error submitting form: ${error.message}`);
    } finally {
      setIsLoading(false);
      
      // Reset reCAPTCHA
      if (window.grecaptcha && recaptchaRef.current) {
        window.grecaptcha.reset();
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    if (!validateForm()) {
      setIsLoading(false);
      return;
    }

    if (!recaptchaLoaded || !window.grecaptcha) {
      setErrorMessage("Security verification not loaded. Please refresh the page.");
      setIsLoading(false);
      return;
    }

    // Render reCAPTCHA if not already rendered
    if (!recaptchaRef.current.innerHTML) {
      try {
        window.grecaptcha.render(recaptchaRef.current, {
          sitekey: siteKey,
          callback: onRecaptchaSuccess,
          theme: "light",
        });
      } catch (error) {
        console.error("Error rendering reCAPTCHA:", error);
        setErrorMessage("Error with verification. Please try again.");
        setIsLoading(false);
      }
    } else {
      // Execute existing reCAPTCHA
      window.grecaptcha.execute();
    }
  };

  return (
    <div className="relative">
      <div className="bg-[#051A3A] p-8 shadow-2xl w-full mx-auto border border-[#F6C343] rounded-xl">
        <h2 className="text-2xl font-semibold text-center text-white mb-6">
          {title}
        </h2>
        <h2 className="text-sm font-medium text-center text-[#FDFCFA]/80 mb-6">
          {headline}
        </h2>

        {errorMessage && (
          <div className="mb-4 rounded-lg border border-[#B42318] bg-[#B42318]/15 p-3 text-[#FDFCFA]">
            {errorMessage}
          </div>
        )}

        {isDisabled ? (
          <p className="text-center text-red-500 font-semibold">
            You have reached the maximum submission limit. Try again after 24 hours.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name Input */}
            <div className="relative">
              <FaUser className="absolute left-4 top-4 text-[#6C7484]" />
              <input
                name="fullName"
                placeholder="Full Name *"
                value={formData.fullName}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-[#2B364D] bg-[#FDFCFA] p-4 pl-12 text-[#162033] placeholder:text-[#6C7484] focus:outline-none focus:ring-2 focus:ring-[#F6C343] transition shadow-sm"
              />
            </div>

            {/* Email Input */}
            <div className="relative">
              <FaEnvelope className="absolute left-4 top-4 text-[#6C7484]" />
              <input
                name="email"
                type="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                className="w-full rounded-lg border border-[#2B364D] bg-[#FDFCFA] p-4 pl-12 text-[#162033] placeholder:text-[#6C7484] focus:outline-none focus:ring-2 focus:ring-[#F6C343] transition shadow-sm"
              />
            </div>

            {/* Phone Number Input */}
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
                  placeholder: "Phone Number *",
                }}
              />
            </div>

            {/* reCAPTCHA */}
            <div className="flex justify-center">
              <div ref={recaptchaRef}></div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || isDisabled || !recaptchaLoaded}
              className={`w-full p-4 text-white text-lg font-semibold rounded-xl shadow-md transition-all duration-300 ${
                isLoading || isDisabled || !recaptchaLoaded
                  ? "bg-[#6C7484] cursor-not-allowed text-[#FDFCFA]"
                  : "bg-[#F6C343] text-[#051A3A] hover:bg-[#FDFCFA] hover:shadow-lg active:scale-95"
              }`}
            >
              {isLoading ? "Submitting..." : "Get A Call Back"}
            </button>
          </form>
        )}
      </div>

      {/* Success Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-[#051A3A] p-8 rounded-xl max-w-md w-full shadow-lg border border-[#F6C343]">
            <h3 className="text-2xl font-bold text-center text-white mb-4">
              Thank You!
            </h3>
            <p className="text-center text-[#FDFCFA]/80 mb-6">
              Your form has been submitted successfully. We'll get back to you
              soon.
            </p>
            <button
              onClick={() => setShowPopup(false)}
              className="w-full bg-[#F6C343] hover:bg-[#FDFCFA] text-[#051A3A] font-semibold py-3 px-4 rounded-lg transition duration-300"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
