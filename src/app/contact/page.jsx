"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  MessageSquare,
  Users,
  Building,
  CheckCircle2,
  Star,
  ArrowRight,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

const ContactUsPage = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    interestedIn: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [submissionCount, setSubmissionCount] = useState(0);
  const [lastSubmissionTime, setLastSubmissionTime] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [recaptchaLoaded, setRecaptchaLoaded] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const recaptchaRef = useRef(null);
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  useEffect(() => {
    // Load reCAPTCHA script
    const loadRecaptcha = () => {
      if (typeof window !== "undefined" && !window.grecaptcha && siteKey) {
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
      } else if (window.grecaptcha || !siteKey) {
        setRecaptchaLoaded(true);
      }
    };

    loadRecaptcha();

    // Get submission count from localStorage
    if (typeof window !== "undefined") {
      const storedCount = parseInt(
        localStorage.getItem("formSubmissionCount") || "0",
        10,
      );
      const lastSubmissionTime = parseInt(
        localStorage.getItem("lastSubmissionTime") || "0",
        10,
      );

      // Check if 24 hours have passed since the last submission
      if (lastSubmissionTime) {
        const timeDifference = Date.now() - lastSubmissionTime;
        const hoursPassed = timeDifference / (1000 * 60 * 60);

        if (hoursPassed >= 24) {
          // Reset submission count after 24 hours
          setSubmissionCount(0);
          localStorage.setItem("formSubmissionCount", "0");
          localStorage.setItem("lastSubmissionTime", Date.now().toString());
        } else {
          setSubmissionCount(storedCount);
          // Check if limit reached (using 3 for contact form vs 20 for bulk form)
          if (storedCount >= 3) {
            setIsDisabled(true);
          }
        }
      } else {
        setSubmissionCount(storedCount);
      }
    }

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
  }, [siteKey]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setErrorMessage(""); // Clear error messages on input change
  };

  const validateForm = () => {
    if (!formData.fullName.trim() || !formData.phone.trim()) {
      setErrorMessage("Please fill in all required fields");
      return false;
    }

    // Email validation (optional field)
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setErrorMessage("Please enter a valid email address");
      return false;
    }

    // Phone validation - accept various formats (10-15 digits)
    if (!/^\d{10,15}$/.test(formData.phone.replace(/\D/g, ""))) {
      setErrorMessage("Please enter a valid phone number (10-15 digits)");
      return false;
    }

    // Check submission limits
    if (submissionCount >= 3) {
      setErrorMessage(
        "You have reached the maximum submission limit. Try again after 24 hours.",
      );
      setIsDisabled(true);
      return false;
    }

    return true;
  };

  const onRecaptchaSuccess = async (token) => {
    try {
      // API Request using the same endpoint as BulkLandForm
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
              email: formData.email || "",
              source: "Dholera Insider",
              subject: formData.subject || "",
              message: formData.message || "",
              interestedIn: formData.interestedIn || "",
            },
            source: "Dholera Insider Website - Contact Form",
            tags: ["Dholera Investment", "Website Lead", "Contact Form"],
            recaptchaToken: token,
          }),
        },
      );

      // Store response text before parsing
      const responseText = await response.text();
      console.log("TeleCRM Response:", responseText);

      // Check response status and handle accordingly
      if (response.ok) {
        if (
          responseText === "OK" ||
          responseText.toLowerCase().includes("success")
        ) {
          // Success handling
          setFormData({
            fullName: "",
            email: "",
            phone: "",
            subject: "",
            message: "",
            interestedIn: "",
          });
          setShowSuccess(true);

          // Update submission count
          const newCount = submissionCount + 1;
          setSubmissionCount(newCount);
          if (typeof window !== "undefined") {
            localStorage.setItem("formSubmissionCount", newCount.toString());
            localStorage.setItem("lastSubmissionTime", Date.now().toString());
          }
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
        try {
          window.grecaptcha.reset();
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

    if (!recaptchaLoaded || !window.grecaptcha) {
      setErrorMessage(
        "Security verification not loaded. Please refresh the page.",
      );
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

  const contactMethods = [
    {
      icon: Phone,
      title: "Call Us",
      details: "+91 92118 20887",
      description: "Mon-Sun 10AM to 8PM",
      action: "tel:+919211820887",
      color: "bg-emerald-500",
    },
    {
      icon: FaWhatsapp,
      title: "WhatsApp",
      details: "+91 92118 20887",
      description: "Quick responses 24/7",
      action: "https://wa.me/919211820887",
      color: "bg-green-500",
    },
    {
      icon: Mail,
      title: "Email Us",
      details: "info@dholerainsider.com",
      description: "We'll respond within 24 hours",
      action: "mailto:info@dholerainsider.com",
      color: "bg-blue-500",
    },
  ];

  const officeInfo = {
    address: "Dholera SIR, Gujarat, India",
    timing: "Monday - Saturday: 9:00 AM - 6:00 PM",
    description:
      "Visit our office for personalized consultation and site visits.",
  };

  const stats = [
    { number: "500+", label: "Happy Clients" },
    { number: "50+", label: "Projects Completed" },
    { number: "10+", label: "Years Experience" },
    { number: "24/7", label: "Customer Support" },
  ];

  const faqs = [
    {
      question: "What is Dholera SIR?",
      answer:
        "Dholera Special Investment Region (SIR) is India's first greenfield smart city being developed as part of the Delhi-Mumbai Industrial Corridor (DMIC).",
    },
    {
      question: "Why invest in Dholera Smart City Project?",
      answer:
        "Dholera Smart City Project offers massive infrastructure development, connectivity to major cities, government backing, and significant appreciation potential.",
    },
    {
      question: "Do you provide site visits?",
      answer:
        "Yes, we provide free site visits to help you make informed investment decisions. Contact us to schedule your visit.",
    },
    {
      question: "What are the payment options?",
      answer:
        "We offer flexible payment plans including EMI options, and accept various payment methods for your convenience.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
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
                "https://dholerainsider.com/contact?search_term_string={search_term_string}",
              "query-input": "required name=search_term_string",
            },
          }),
        }}
      />

      <title>Get in Touch with Dholera Insider – Smart City Experts</title>
      <meta
        name="description"
        content="Connect with Dholera Insider for the latest Smart City news, project updates, and help with planning your investment in Dholera Smart City. Contact us now!"
      />
      <meta
        name="keywords"
        content="Dholera plots, Dholera Smart City, smart city consultants, Dholera investment, investment in Dholera"
      />
      <link rel="canonical" href="https://www.dholerainsider.com/contact" />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 via-emerald-900 to-teal-900 text-white py-20">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="container mx-auto px-6 pt-16 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-6">
              Get In <span className="text-emerald-400">Touch</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-8">
              Ready to invest in India's first smart city? Let's discuss your
              Dholera investment journey.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="bg-white/10 backdrop-blur-sm rounded-lg p-4 min-w-[120px]"
                >
                  <div className="text-2xl font-bold text-emerald-400">
                    {stat.number}
                  </div>
                  <div className="text-sm text-gray-200">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Multiple Ways to <span className="text-emerald-600">Connect</span>
            </h2>
            <p className="text-xl text-gray-600">
              Choose your preferred method to get in touch with our experts
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {contactMethods.map((method, index) => (
              <motion.a
                key={index}
                href={method.action}
                target={method.action.startsWith("http") ? "_blank" : "_self"}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-white rounded-2xl p-8 text-center shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 group"
              >
                <div
                  className={`${method.color} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6`}
                >
                  <method.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors">
                  {method.title}
                </h3>
                <p className="text-lg font-semibold text-emerald-600 mb-2">
                  {method.details}
                </p>
                <p className="text-gray-600">{method.description}</p>
                <div className="mt-4 inline-flex items-center text-emerald-600 font-medium group-hover:translate-x-1 transition-transform">
                  Contact Now <ArrowRight className="w-4 h-4 ml-2" />
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Office Info */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl p-8 shadow-xl"
            >
              <h3 className="text-3xl font-bold text-gray-900 mb-6">
                Send Us a <span className="text-emerald-600">Message</span>
              </h3>

              {showSuccess ? (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-center py-8"
                >
                  <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-10 h-10 text-white" />
                  </div>
                  <h4 className="text-2xl font-bold text-gray-900 mb-4">
                    Message Sent!
                  </h4>
                  <p className="text-gray-600 mb-6">
                    Thank you for your inquiry. We'll get back to you within 24
                    hours.
                  </p>
                  <button
                    onClick={() => setShowSuccess(false)}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : isDisabled ? (
                <div className="text-center py-8">
                  <p className="text-center text-red-600 font-semibold">
                    You have reached the maximum submission limit. Try again
                    after 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {errorMessage && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-800 text-sm">
                      {errorMessage}
                    </div>
                  )}

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                        placeholder="Enter your phone number"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                      placeholder="Enter your email address"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      I'm Interested In
                    </label>
                    <select
                      name="interestedIn"
                      value={formData.interestedIn}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                    >
                      <option value="">Select your interest</option>
                      <option value="residential">Residential Plots</option>
                      <option value="commercial">Commercial Properties</option>
                      <option value="industrial">Industrial Land</option>
                      <option value="investment">
                        Investment Opportunities
                      </option>
                      <option value="site-visit">Free Site Visit</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                      placeholder="Brief subject of your inquiry"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors resize-none"
                      placeholder="Tell us more about your requirements..."
                    />
                  </div>

                  <div className="flex justify-center">
                    <div ref={recaptchaRef}></div>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading || isDisabled || !recaptchaLoaded}
                    className={`w-full font-bold text-white py-4 px-6 rounded-lg transition-colors flex items-center justify-center gap-2 ${
                      isLoading || isDisabled || !recaptchaLoaded
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-emerald-600 hover:bg-emerald-700"
                    }`}
                  >
                    {isLoading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </motion.div>

            {/* Office Info & Map */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              {/* Office Details */}
              <div className="bg-white rounded-2xl p-8 shadow-xl">
                <h3 className="text-3xl font-bold text-gray-900 mb-6">
                  Visit Our <span className="text-emerald-600">Office</span>
                </h3>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-emerald-100 p-3 rounded-lg">
                      <MapPin className="w-6 h-6 text-emerald-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">Address</h4>
                      <p className="text-gray-600">{officeInfo.address}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-emerald-100 p-3 rounded-lg">
                      <Clock className="w-6 h-6 text-emerald-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">
                        Office Hours
                      </h4>
                      <p className="text-gray-600">{officeInfo.timing}</p>
                      <p className="text-sm text-gray-500 mt-1">
                        Sunday: Closed
                      </p>
                    </div>
                  </div>

                  <div className="bg-emerald-50 p-6 rounded-lg">
                    <h4 className="font-bold text-emerald-800 mb-2">
                      Why Visit Us?
                    </h4>
                    <p className="text-emerald-700 text-sm">
                      {officeInfo.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-gradient-to-br from-emerald-600 to-teal-600 rounded-2xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-4">
                  Need Immediate Assistance?
                </h3>
                <p className="mb-6 text-emerald-100">
                  Our experts are ready to help you with your Dholera investment
                  queries.
                </p>

                <div className="space-y-3">
                  <a
                    href="tel:+919211820887"
                    className="block bg-white/20 hover:bg-white/30 rounded-lg p-4 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5" />
                      <span className="font-medium">
                        Call Now: +91 92118 20887
                      </span>
                    </div>
                  </a>

                  <a
                    href="https://wa.me/919211820887"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block bg-white/20 hover:bg-white/30 rounded-lg p-4 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <MessageSquare className="w-5 h-5" />
                      <span className="font-medium">WhatsApp Chat</span>
                    </div>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked{" "}
              <span className="text-emerald-600">Questions</span>
            </h2>
            <p className="text-xl text-gray-600">
              Quick answers to common questions about Dholera investments
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors"
              >
                <h4 className="text-lg font-bold text-gray-900 mb-3">
                  {faq.question}
                </h4>
                <p className="text-gray-600">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold mb-4">
              Ready to Start Your Investment Journey?
            </h2>
            <p className="text-xl text-emerald-100 mb-8 max-w-2xl mx-auto">
              Join hundreds of satisfied investors who have secured their future
              in India's first smart city.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="tel:+919211820887"
                className="bg-white text-emerald-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-bold transition-colors flex items-center gap-2"
              >
                <Phone className="w-5 h-5" />
                Call Now
              </a>
              <a
                href="https://wa.me/919211820887"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-emerald-700 hover:bg-emerald-800 px-8 py-4 rounded-lg font-bold transition-colors flex items-center gap-2"
              >
                <FaWhatsapp className="w-5 h-5" />
                WhatsApp Us
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ContactUsPage;
