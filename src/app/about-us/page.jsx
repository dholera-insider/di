"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import "./about.css";
import InternationalPhoneInput, {
  getInternationalPhoneValue,
  isValidInternationalPhone,
} from "../components/InternationalPhoneInput";

const benefits = [
  {
    title: "Verified Residential Plot Projects",
    description:
      "Every project we present is carefully verified to ensure legal clarity and reliable documentation, giving you greater confidence in your investment.",
  },
  {
    title: "Exclusive Access Through BookMyAssets",
    description:
      "As the exclusive channel partner of BookMyAssets, we connect you with premium residential plot projects and trusted real estate opportunities in Dholera Smart City.",
  },
  {
    title: "Transparent Pricing",
    description:
      "We believe in complete transparency. You'll receive clear pricing, detailed project information, and no hidden surprises throughout the buying process.",
  },
  {
    title: "Dedicated NRI Support",
    description:
      "Our services are designed specifically for NRIs. From virtual consultations and project selection to documentation and registration support, we make investing in Dholera simple from anywhere in the world.",
  },
  {
    title: "Expert Guidance",
    description:
      "Our experienced team helps you understand the market, compare projects, and choose the right residential plot based on your investment goals.",
  },
  {
    title: "End-to-End Assistance",
    description:
      "From your first inquiry to final registration and beyond, we're with you every step of the way to ensure a smooth and stress-free experience.",
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

    if (!isValidInternationalPhone(formData.phone)) {
      setErrorMessage("Please enter a valid international phone number");
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
              phone: getInternationalPhoneValue(formData.phone),
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
      {/* SEO */}
      <title>
        About Dholera Insider – Your Trusted NRI Real Estate Partner
      </title>
      <meta
        name="title"
        content="About Dholera Insider – Your Trusted NRI Real Estate Partner"
      />
      <meta
        name="description"
        content="Learn how Dholera Insider helps NRIs invest in verified residential plots in Dholera Smart City with transparency, expert guidance, and end-to-end support."
      />
      <meta
        name="keywords"
        content="Dholera real estate, NRI investment, Dholera Smart City, verified plots, BookMyAssets channel partner"
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
          }),
        }}
      />

      {/* ── HERO ── navy, typographic, no gradients */}
      <section className="bg-[#051A3A] relative overflow-hidden">
        {/* subtle dot-grid texture */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "radial-gradient(circle, #F6C343 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        <div className="relative max-w-5xl mx-auto px-[clamp(1.5rem,calc(1rem+2vw),3rem)] pt-[clamp(8rem,calc(6rem+4vw),11rem)] pb-[clamp(4rem,calc(3rem+3vw),6rem)]">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="text-[#F6C343] text-[clamp(0.65rem,calc(0.6rem+0.15vw),0.75rem)] uppercase tracking-[0.22em] font-bold mb-[clamp(1rem,calc(0.75rem+1vw),1.5rem)]"
          >
            About Us
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-white font-bold text-[clamp(2rem,calc(1.5rem+2.5vw),3.75rem)] leading-[1.1] max-w-3xl"
          >
            About <span className="text-[#F6C343]">Dholera Insider</span>
          </motion.h1>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            style={{ transformOrigin: "left" }}
            className="w-[clamp(3.5rem,calc(2.5rem+3vw),5.5rem)] h-[3px] bg-[#F6C343] my-[clamp(1.25rem,calc(1rem+1vw),1.75rem)] rounded-full"
          />
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="text-white/75 text-[clamp(0.95rem,calc(0.875rem+0.35vw),1.15rem)] leading-relaxed max-w-2xl"
          >
            At Dholera Insider, we help NRIs invest in verified residential
            plots in Dholera Smart City with confidence. Our goal is to make
            property investment simple, transparent, and secure, no matter where
            you live.
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="text-white/75 text-[clamp(0.95rem,calc(0.875rem+0.35vw),1.15rem)] leading-relaxed max-w-2xl mt-[clamp(0.875rem,calc(0.75rem+0.5vw),1.125rem)]"
          >
            Whether you&apos;re planning to build your dream home, secure your
            family&apos;s future, or grow your investment portfolio, we provide
            trusted guidance at every step. From exploring projects to
            completing documentation, our team ensures a smooth and hassle-free
            buying experience.
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.7 }}
            className="text-white/75 text-[clamp(0.95rem,calc(0.875rem+0.35vw),1.15rem)] leading-relaxed max-w-2xl mt-[clamp(0.875rem,calc(0.75rem+0.5vw),1.125rem)]"
          >
            As the exclusive channel partner of BookMyAssets, we offer access to
            carefully selected residential plot projects backed by professional
            support and verified documentation. Our commitment is to help every
            investor make informed decisions with complete peace of mind.
          </motion.p>
        </div>
      </section>

      {/* ── IDENTITY BAR ── signature gold strip */}
      <div className="bg-[#F6C343]">
        <div className="max-w-5xl mx-auto px-[clamp(1.5rem,calc(1rem+2vw),3rem)]">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#051A3A]/20">
            {[
              { title: "Exclusive Channel Partner", sub: "of BookMyAssets" },
              { title: "100% Verified Plots", sub: "Legal clarity guaranteed" },
              {
                title: "End-to-End NRI Support",
                sub: "Inquiry to registration",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="py-[clamp(0.875rem,calc(0.7rem+0.75vw),1.125rem)] px-[clamp(1rem,calc(0.75rem+1vw),1.5rem)] text-center"
              >
                <p className="text-[#051A3A] font-bold text-[clamp(0.875rem,calc(0.82rem+0.25vw),1rem)]">
                  {item.title}
                </p>
                <p className="text-[#051A3A]/60 text-[clamp(0.7rem,calc(0.65rem+0.15vw),0.8rem)] mt-0.5">
                  {item.sub}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <main>
        {/* ── MISSION + PARTNERSHIP ── off-white, split columns */}
        <section className="bg-[#FDFCFA] py-[clamp(3.5rem,calc(2.5rem+3vw),5.5rem)] px-[clamp(1.5rem,calc(1rem+2vw),3rem)]">
          <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-x-[clamp(3rem,calc(2rem+3vw),5rem)] gap-y-[clamp(2.5rem,calc(2rem+2vw),3.5rem)]">
            {/* Mission */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
            >
              <p className="text-[#F6C343] text-[clamp(0.6rem,calc(0.55rem+0.15vw),0.7rem)] uppercase tracking-[0.2em] font-bold mb-2">
                Our Mission
              </p>
              <h2 className="text-[clamp(1.25rem,calc(1rem+1.1vw),1.75rem)] font-bold text-[#051A3A] leading-snug mb-[clamp(0.75rem,calc(0.6rem+0.6vw),1rem)]">
                Making NRI real estate investment simple from anywhere in the
                world
              </h2>
              <div className="w-10 h-[3px] bg-[#F6C343] mb-[clamp(1rem,calc(0.75rem+1vw),1.5rem)] rounded-full" />
              <p className="text-gray-600 text-[clamp(0.875rem,calc(0.82rem+0.25vw),1rem)] leading-relaxed">
                Our mission is to make NRI property investment in Dholera easy,
                transparent, and reliable. We believe that buying property from
                overseas should never be complicated. That&apos;s why we focus
                on providing verified opportunities, honest advice, and
                end-to-end assistance throughout the investment journey. Every
                recommendation we make is based on trust, transparency, and
                long-term value.
              </p>
            </motion.div>

            {/* Partnership */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.1 }}
              className="lg:border-l lg:border-[#051A3A]/10 lg:pl-[clamp(3rem,calc(2rem+3vw),5rem)]"
            >
              <p className="text-[#F6C343] text-[clamp(0.6rem,calc(0.55rem+0.15vw),0.7rem)] uppercase tracking-[0.2em] font-bold mb-2">
                Our Partnership
              </p>
              <h2 className="text-[clamp(1.25rem,calc(1rem+1.1vw),1.75rem)] font-bold text-[#051A3A] leading-snug mb-[clamp(0.75rem,calc(0.6rem+0.6vw),1rem)]">
                Backed by BookMyAssets - quality and trust you can rely on
              </h2>
              <div className="w-10 h-[3px] bg-[#F6C343] mb-[clamp(1rem,calc(0.75rem+1vw),1.5rem)] rounded-full" />
              <p className="text-gray-600 text-[clamp(0.875rem,calc(0.82rem+0.25vw),1rem)] leading-relaxed">
                Our partnership with BookMyAssets reflects our commitment to
                trust and quality. As its exclusive channel partner, Dholera
                Insider brings verified residential plot opportunities directly
                to NRI investors with professional guidance and dependable
                support. Together, we focus on delivering a transparent buying
                process, verified documentation, and personalized assistance
                that helps investors make confident decisions.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ── WHY CHOOSE US ── navy, editorial row list */}
        <section className="bg-[#051A3A] py-[clamp(3.5rem,calc(2.5rem+3vw),5.5rem)] px-[clamp(1.5rem,calc(1rem+2vw),3rem)]">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center justify-between border-b border-white/15 pb-[clamp(0.75rem,calc(0.6rem+0.5vw),1rem)] mb-[clamp(0.25rem,0.5vw,0.5rem)]">
              <p className="text-[#F6C343] text-[clamp(0.6rem,calc(0.55rem+0.15vw),0.7rem)] uppercase tracking-[0.2em] font-bold">
                Why Choose Us
              </p>
              <p className="text-white/30 text-xs">
                {benefits.length} reasons to invest with us
              </p>
            </div>
            <div>
              {benefits.map((b, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -14 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.38, delay: i * 0.07 }}
                  className="border-b border-white/10 py-[clamp(1rem,calc(0.85rem+0.75vw),1.5rem)] flex flex-col md:grid md:grid-cols-[2.5rem,1.5fr,2.5fr] gap-x-[clamp(1rem,calc(0.75rem+1vw),1.5rem)] gap-y-1 hover:bg-white/[0.04] -mx-4 px-4 transition-colors rounded-md"
                >
                  <span className="hidden md:block text-[#F6C343]/45 text-[0.68rem] font-mono font-semibold tracking-widest pt-0.5">
                    0{i + 1}
                  </span>
                  <p className="text-white font-semibold text-[clamp(0.875rem,calc(0.82rem+0.2vw),0.975rem)]">
                    {b.title}
                  </p>
                  <p className="text-white/55 text-[clamp(0.8rem,calc(0.75rem+0.15vw),0.875rem)] leading-relaxed">
                    {b.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── VALUES ── off-white, 4-col bordered cards */}
        <section className="bg-[#FDFCFA] py-[clamp(3.5rem,calc(2.5rem+3vw),5.5rem)] px-[clamp(1.5rem,calc(1rem+2vw),3rem)]">
          <div className="max-w-5xl mx-auto">
            <div className="mb-[clamp(2rem,calc(1.5rem+2vw),3rem)]">
              <p className="text-[#F6C343] text-[clamp(0.6rem,calc(0.55rem+0.15vw),0.7rem)] uppercase tracking-[0.2em] font-bold mb-1.5">
                Our Values
              </p>
              <h3 className="text-[clamp(1.25rem,calc(1rem+1.1vw),1.75rem)] font-bold text-[#051A3A]">
                What guides every decision we make
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[clamp(0.875rem,calc(0.75rem+0.75vw),1.25rem)]">
              {[
                {
                  title: "Trust",
                  desc: "We build lasting relationships through honest advice and dependable service.",
                },
                {
                  title: "Transparency",
                  desc: "Clear communication, verified information, and straightforward pricing are at the heart of everything we do.",
                },
                {
                  title: "Integrity",
                  desc: "We recommend opportunities that align with your investment goals and always put your interests first.",
                },
                {
                  title: "Commitment",
                  desc: "Our support doesn't end after your purchase. We're committed to assisting you throughout your investment journey.",
                },
              ].map((v, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="border border-[#051A3A]/10 rounded-2xl p-[clamp(1.25rem,calc(1rem+0.75vw),1.5rem)] hover:border-[#F6C343] hover:shadow-[0_4px_20px_rgba(246,195,67,0.12)] transition-all duration-300 group"
                >
                  <div className="w-[clamp(2rem,calc(1.75rem+0.5vw),2.25rem)] h-[clamp(2rem,calc(1.75rem+0.5vw),2.25rem)] rounded-full bg-[#F6C343]/15 group-hover:bg-[#F6C343]/25 flex items-center justify-center mb-[clamp(0.75rem,calc(0.6rem+0.5vw),1rem)] transition-colors">
                    <span className="text-[#F6C343] font-bold text-sm">
                      {v.title[0]}
                    </span>
                  </div>
                  <h4 className="text-[#051A3A] font-bold text-[clamp(0.9rem,calc(0.85rem+0.2vw),1rem)] mb-1.5">
                    {v.title}
                  </h4>
                  <p className="text-gray-500 text-[clamp(0.78rem,calc(0.73rem+0.2vw),0.875rem)] leading-relaxed">
                    {v.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── WHY NRIs TRUST ── navy, pill-style rows */}
        <section className="bg-[#051A3A] py-[clamp(3.5rem,calc(2.5rem+3vw),5.5rem)] px-[clamp(1.5rem,calc(1rem+2vw),3rem)]">
          <div className="max-w-5xl mx-auto">
            <div className="mb-[clamp(2rem,calc(1.5rem+2vw),3rem)]">
              <p className="text-[#F6C343] text-[clamp(0.6rem,calc(0.55rem+0.15vw),0.7rem)] uppercase tracking-[0.2em] font-bold mb-1.5">
                Trust
              </p>
              <h3 className="text-[clamp(1.25rem,calc(1rem+1.1vw),1.75rem)] font-bold text-white">
                Why NRIs trust Dholera Insider
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-[clamp(0.5rem,calc(0.4rem+0.5vw),0.75rem)]">
              {[
                "Exclusive Channel Partner of BookMyAssets",
                "Verified residential plot projects",
                "Transparent pricing and documentation",
                "Dedicated support for overseas investors",
                "Professional guidance from start to finish",
                "Secure and hassle-free remote buying experience",
                "Focus on long-term investment value",
              ].map((pt, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: i * 0.06 }}
                  className="flex items-center gap-[clamp(0.625rem,calc(0.5rem+0.5vw),0.875rem)] bg-white/[0.05] hover:bg-white/10 transition-colors rounded-lg px-[clamp(0.875rem,calc(0.75rem+0.5vw),1.125rem)] py-[clamp(0.625rem,calc(0.5rem+0.5vw),0.875rem)]"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-[clamp(0.875rem,calc(0.8rem+0.3vw),1rem)] h-[clamp(0.875rem,calc(0.8rem+0.3vw),1rem)] text-[#F6C343] shrink-0"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-white/80 text-[clamp(0.8rem,calc(0.75rem+0.15vw),0.875rem)]">
                    {pt}
                  </span>
                </motion.div>
              ))}
            </div>
            <p className="mt-[clamp(1.5rem,calc(1.25rem+1vw),2rem)] text-white/40 text-[clamp(0.78rem,calc(0.73rem+0.2vw),0.875rem)] leading-relaxed max-w-2xl">
              Our priority is to help every NRI investor make confident real
              estate decisions backed by trust, transparency, and expert
              support.
            </p>
          </div>
        </section>
      </main>

      {/* ── CTA FORM ── warm off-white #faf8f3 */}
      <section className="bg-[#faf8f3] py-[clamp(3.5rem,calc(2.5rem+3vw),5.5rem)]">
        <div className="container mx-auto px-[clamp(1.5rem,calc(1rem+2vw),3rem)]">
          <div className="max-w-4xl mx-auto">
            <p className="text-[#F6C343] text-[clamp(0.6rem,calc(0.55rem+0.15vw),0.7rem)] uppercase tracking-[0.2em] font-bold text-center mb-2">
              Get Started
            </p>
            <h5 className="text-[#051A3A] text-[clamp(1.75rem,calc(1.375rem+1.5vw),2.5rem)] font-bold text-center">
              Ready to Invest in Dholera?
            </h5>
            {showPopup ? (
              <div className="text-center py-[clamp(2rem,calc(1.5rem+1.5vw),3rem)]">
                <div className="mb-[clamp(0.75rem,calc(0.6rem+0.6vw),1rem)] inline-block">
                  <div className="w-[clamp(3.5rem,calc(3rem+1.5vw),4rem)] h-[clamp(3.5rem,calc(3rem+1.5vw),4rem)] bg-[#F6C343] rounded-full flex items-center justify-center mx-auto">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-[clamp(2rem,calc(1.75rem+1vw),2.5rem)] w-[clamp(2rem,calc(1.75rem+1vw),2.5rem)] text-[#051A3A]"
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
                <p className="text-[clamp(1.25rem,calc(1.1rem+0.8vw),1.5rem)] font-bold text-[#051A3A] mb-[clamp(0.375rem,calc(0.3rem+0.4vw),0.5rem)]">
                  Thank You!
                </p>
                <p className="text-gray-500">
                  Your request has been submitted successfully. We&apos;ll
                  contact you shortly.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                id="contact-form-container"
                className="space-y-[clamp(1rem,calc(0.75rem+1vw),1.5rem)]"
              >
                {errorMessage && (
                  <div className="rounded-xl border border-red-200 bg-red-50 p-[clamp(0.75rem,calc(0.6rem+0.6vw),1rem)] text-[clamp(0.875rem,calc(0.82rem+0.2vw),0.95rem)] text-red-700">
                    {errorMessage}
                  </div>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-[clamp(1rem,calc(0.75rem+1vw),1.5rem)]">
                  <div>
                    <label
                      htmlFor="fullName"
                      className="block text-[#051A3A] text-[clamp(0.7rem,calc(0.65rem+0.15vw),0.78rem)] font-bold uppercase tracking-[0.12em] mb-[clamp(0.375rem,calc(0.3rem+0.4vw),0.5rem)]"
                    >
                      Full Name
                    </label>
                    <input
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                      className="w-full rounded-xl border border-[#051A3A]/20 bg-white px-[clamp(0.875rem,calc(0.75rem+0.5vw),1rem)] py-[clamp(0.75rem,calc(0.6rem+0.6vw),1rem)] text-[#051A3A] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#F6C343] focus:border-transparent transition-shadow"
                      placeholder="Enter your name"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-[#051A3A] text-[clamp(0.7rem,calc(0.65rem+0.15vw),0.78rem)] font-bold uppercase tracking-[0.12em] mb-[clamp(0.375rem,calc(0.3rem+0.4vw),0.5rem)]"
                    >
                      Phone Number
                    </label>
                    <InternationalPhoneInput
                      value={formData.phone}
                      onChange={(phone) => {
                        setFormData((prevData) => ({ ...prevData, phone }));
                        setErrorMessage("");
                      }}
                      inputProps={{ id: "phone", name: "phone" }}
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
                    className="w-full rounded-xl bg-[#051A3A] px-[clamp(1rem,calc(0.75rem+1vw),1.5rem)] py-[clamp(0.875rem,calc(0.75rem+0.5vw),1.125rem)] font-bold text-white transition-all duration-300 hover:bg-[#F6C343] hover:text-[#051A3A] disabled:bg-gray-400 disabled:text-white disabled:cursor-not-allowed"
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
