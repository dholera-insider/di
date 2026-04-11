"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import "./about.css";

const benefits = [
  {
    title: "Dholera-Focused Expertise",
    description:
      "We work exclusively within Dholera Smart City, allowing us to offer deeper insights into planning zones, growth corridors, and future-ready locations. Our focused approach helps investors make informed, location-driven decisions.",
  },
  {
    title: "Infrastructure-Led Plot Selection",
    description:
      "Every plot we offer is evaluated based on infrastructure proximity—including the activation area, expressway connectivity, airport zone, and upcoming industrial clusters. This ensures alignment with Dholera’s long-term development roadmap.",
  },
  {
    title: "Legally Aligned & Verified Listings",
    description:
      "We prioritize clarity and compliance. All listed plots are checked for zoning, documentation, and development status to reduce risk and ensure a smooth, transparent buying experience.",
  },
  {
    title: "Market & Policy Insights",
    description:
      "As a dedicated Dholera insights platform, we track government announcements, policy updates, and the latest Dholera developments to help investors understand how planning and infrastructure decisions impact future value.",
  },
  {
    title: "Long-Term Investment Approach",
    description:
      "Our recommendations are driven by future growth potential, not short-term speculation. We focus on plots positioned to benefit from planned infrastructure, industrial expansion, and sustainable urban development.",
  },
  {
    title: "Dedicated Investor Support",
    description:
      "From initial consultation to site visits and documentation guidance, we offer end-to-end support throughout your investment journey—ensuring clarity, confidence, and continued assistance even after booking.",
  },
];

export default function Aboutus() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    location: "",
    message: "",
  });
  const [showPopup, setShowPopup] = useState(false);
  const [submissionCount, setSubmissionCount] = useState(0);
  const [lastSubmissionTime, setLastSubmissionTime] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [recaptchaLoaded, setRecaptchaLoaded] = useState(false);
  const recaptchaRef = useRef(null);
  const recaptchaWidgetId = useRef(null);
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  useEffect(() => {
    const loadRecaptcha = () => {
      if (typeof window !== "undefined" && !window.grecaptcha) {
        try {
          const script = document.createElement("script");
          script.src = "https://www.google.com/recaptcha/api.js";
          script.async = true;
          script.defer = true;
          script.onload = () => setRecaptchaLoaded(true);
          script.onerror = () => {
            console.error("Failed to load reCAPTCHA script");
            setRecaptchaLoaded(true);
          };
          document.head.appendChild(script);
        } catch (err) {
          console.error("reCAPTCHA script loading error:", err);
          setRecaptchaLoaded(true);
        }
      } else if (window.grecaptcha) {
        setRecaptchaLoaded(true);
      }
    };

    loadRecaptcha();

    // Get submission count from localStorage
    if (typeof window !== "undefined") {
      setSubmissionCount(
        parseInt(localStorage.getItem("formSubmissionCount") || "0", 10),
      );
      setLastSubmissionTime(
        parseInt(localStorage.getItem("lastSubmissionTime") || "0", 10),
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
    setErrorMessage(""); // Clear error messages on input change
  };

  const validateForm = () => {
    if (!formData.fullName || !formData.phone) {
      setErrorMessage("Please fill in all required fields");
      return false;
    }

    // Simple phone validation
    if (!/^\d{10,15}$/.test(formData.phone)) {
      setErrorMessage("Please enter a valid phone number (10-15 digits)");
      return false;
    }

    // Check submission limits
    const now = Date.now();
    const hoursPassed = (now - lastSubmissionTime) / (1000 * 60 * 60);

    if (hoursPassed >= 24) {
      // Reset counter if 24 hours have passed
      setSubmissionCount(0);
      if (typeof window !== "undefined") {
        localStorage.setItem("formSubmissionCount", "0");
        localStorage.setItem("lastSubmissionTime", now.toString());
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
    try {
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
              phone: formData.phone,
              source: "Dholera Insider",
            },
            source: "Dholera Insider Website",
            tags: ["Dholera Investment", "Website Lead"],
          }),
        },
      );

      const responseText = await response.text();

      if (response.ok) {
        // Success handling
        setFormData({ fullName: "", phone: "", location: "", message: "" });
        setShowPopup(true);
        setSubmissionCount((prev) => {
          const newCount = prev + 1;
          if (typeof window !== "undefined") {
            localStorage.setItem("formSubmissionCount", newCount.toString());
            localStorage.setItem("lastSubmissionTime", Date.now().toString());
          }
          return newCount;
        });

        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          event: "lead_form",
          page_name: project,
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
      setIsLoading(false);

      // Reset reCAPTCHA
      if (window.grecaptcha && recaptchaWidgetId.current !== null) {
        try {
          window.grecaptcha.reset(recaptchaWidgetId.current);
        } catch (err) {
          console.error("Error resetting reCAPTCHA:", err);
        }
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

    // If reCAPTCHA is loaded, render it in the ref
    if (window.grecaptcha && recaptchaLoaded && siteKey) {
      try {
        // Check if reCAPTCHA widget is already rendered
        if (recaptchaWidgetId.current === null && recaptchaRef.current) {
          recaptchaWidgetId.current = window.grecaptcha.render(
            recaptchaRef.current,
            {
              sitekey: siteKey,
              callback: onRecaptchaSuccess,
              theme: "dark",
            },
          );
        } else if (recaptchaWidgetId.current !== null) {
          // Reset and execute existing widget
          window.grecaptcha.reset(recaptchaWidgetId.current);
          window.grecaptcha.execute(recaptchaWidgetId.current);
        }
      } catch (error) {
        console.error("Error rendering reCAPTCHA:", error);
        setErrorMessage("Error with verification. Please try again.");
        setIsLoading(false);
      }
    } else {
      setErrorMessage("reCAPTCHA not loaded. Please refresh and try again.");
      setIsLoading(false);
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <title>
        About Dholera Insider – Your Trusted Dholera Real Estate Partner
      </title>
      <meta
        name="title"
        content="About Dholera Insider – Your Trusted Dholera Real Estate Partner"
      />
      <meta
        name="description"
        content="Learn about Dholera Insider’s role in Dholera real estate and how our smart city consultants guide investors in Dholera Smart City."
      />
      <meta
        name="keywords"
        content="Dholera real estate, smart city consultants, Dholera Smart City, Dholera investment, investment in Dholera."
      />
      <link rel="canonical" href="https://www.dholerainsider.com/about-us" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "Dholera Insider",
            url: "https://dholerainsider.com/",
            potentialAction: {
              "@type": "SearchAction",
              target:
                "https://dholerainsider.com/about-us?search_term_string={search_term_string}",
              "query-input": "required name=search_term_string",
            },
          }),
        }}
      />

      <main className="bg-gradient-to-b from-gray-900 via-emerald-900 to-teal-900 text-white min-h-screen">
        {/* Hero Section */}
        <section className="text-center px-6 py-20 md:py-28 max-w-4xl mx-auto">
          <motion.h1
            className="text-3xl md:text-4xl pt-12 font-extrabold mb-6 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            About <span className="text-teal-300">Dholera Insider</span>
          </motion.h1>
          <motion.p
            className="text-lg text-teal-100 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Dholera Insider is your trusted source for authentic, real-time
            insights into Gujarat’s first smart city - Dholera SIR. We bring you
            verified updates, investment opportunities, and exclusive coverage
            to help you make informed decisions.
          </motion.p>
        </section>

        <section className="bg-white py-8">
          <div
            className={`grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto`}
          >
            {/* Left Content */}
            <div className="space-y-8 flex flex-col">
              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-gray-100 flex-1 flex flex-col">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
                  Our Mission
                </h3>
                <p className="text-gray-700 leading-relaxed mb-6 flex-1">
                  At Dholera Insider, our mission is to empower investors,
                  businesses, and citizens with transparent, data-backed news
                  about the Dholera Smart City project. We focus on accurate
                  updates, infrastructure progress, and opportunities that shape
                  the future of sustainable urban growth in India.
                </p>
              </div>
            </div>

            {/* Right Content */}
            <div className="space-y-8 flex flex-col">
              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-gray-100 flex-1 flex flex-col">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
                  Our Vision
                </h3>
                <p className="text-gray-700 leading-relaxed mb-6 flex-1">
                  We envision a digitally connected, eco-friendly city where
                  innovation meets sustainability. Our goal is to be the most
                  reliable media hub for everything happening in Dholera SIR,
                  from real estate trends to government initiatives and upcoming
                  investments.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="bg-gradient-to-br from-gray-900 via-slate-800 to-teal-900">
            {/* Why Dholera Smart City Section */}
            <div className="py-16 max-w-7xl mx-auto px-4">
              {/* Heading */}
              <div className="text-center mb-12">
                <h2 className="text-4xl max-sm:text-2xl font-bold text-white mb-4">
                  Why Choose Us
                </h2>
                <div className="w-32 h-1 bg-gradient-to-r from-teal-400 to-teal-600 mx-auto rounded-full"></div>
              </div>

              {/* 3 Column Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {benefits.map((benefit, index) => (
                  <div
                    key={index}
                    className="bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/15 transition-all duration-300 border border-white/20"
                  >
                    <h3 className="text-xl font-semibold text-teal-300 mb-3">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-100 text-sm leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="bg-white py-8 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-teal-900">
              Our Core Values
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "Transparency",
                  desc: "We ensure that every report, insight, and update we publish is backed by verified data - empowering investors with factual information to make confident and strategic investment choices in Dholera Smart City Project.",
                },
                {
                  title: "Expertise",
                  desc: "Our team leverages years of experience and in-depth knowledge of Dholera SIR to provide investors with actionable insights, market analysis, and strategic guidance for informed decision-making.",
                },
                {
                  title: "Community",
                  desc: "We believe in building a strong and informed investor community - connecting citizens, developers, and policymakers to create meaningful collaboration and long-term growth within Dholera SIR.",
                },
              ].map((value, i) => (
                <motion.div
                  key={i}
                  className="bg-white/10 rounded-2xl p-6 shadow-lg backdrop-blur-md hover:bg-white/20 transition-all"
                  whileHover={{ scale: 1.03 }}
                >
                  <h3 className="text-2xl font-semibold mb-3 text-teal-900">
                    {value.title}
                  </h3>
                  <p className="text-gray-900 leading-relaxed">{value.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white py-8 px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-teal-900">
              Our Commitment to Clients
            </h2>
            <div className="gap-8 text-gray-900 text-lg border-gray-100 border-2 shadow-lg p-4 rounded-xl">
              <p>
                Our commitment is built on transparency, accuracy, and
                reliability. Every update shared on our platform is carefully
                reviewed to ensure it reflects verified progress related to the
                Dholera Smart City project.
              </p>
              <p>
                We aim to empower our readers with trustworthy insights into
                ongoing and upcoming opportunities, supported by factual
                reporting and long-term vision. By consistently sharing relevant
                Dholera latest news and development updates, we help individuals
                and businesses make informed decisions aligned with Dholera’s
                growth roadmap.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Reach Out Section */}
      <section className="py-16 bg-gradient-to-r from-gray-900 to-teal-900 animate-gradient-x">
        <div className="container mx-auto px-6 sm:px-12">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-white text-3xl sm:text-4xl font-bold text-center">
              Know More About Dholera, With Dholera Insider
            </h2>
            {showPopup ? (
              <div className="text-center py-8">
                <div className="mb-4 inline-block">
                  <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-10 w-10 text-white"
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
                <p className="text-gray-300">
                  Your request has been submitted successfully. We'll contact
                  you shortly.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                id="contact-form-container"
                className="mt-12 space-y-6"
              >
                {errorMessage && (
                  <div className="p-3 bg-red-500 bg-opacity-20 border border-red-400 text-red-100 rounded-lg text-sm">
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
                    <input
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
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
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                      placeholder="Enter your phone number"
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
                    className="w-full bg-teal-600 hover:bg-teal-700 disabled:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
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
