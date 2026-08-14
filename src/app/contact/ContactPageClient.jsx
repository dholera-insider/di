"use client";

import { useEffect, useRef, useState } from "react";
import {
  CheckCircle2,
  Clock,
  Mail,
  MapPin,
  Phone,
  Send,
} from "lucide-react";

import InternationalPhoneInput, {
  getInternationalPhoneValue,
  isValidInternationalPhone,
} from "../components/InternationalPhoneInput";

const discussionPoints = [
  "Verified residential plot projects",
  "Dholera Smart City investment opportunities",
  "Project pricing and availability",
  "Legal documentation guidance",
  "Remote buying process",
  "NRI investment assistance",
];

const initialFormData = {
  fullName: "",
  country: "",
  email: "",
  phone: "",
  interestedProject: "",
  message: "",
};

export default function ContactPageClient({ faqs = [] }) {
  const [formData, setFormData] = useState(initialFormData);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [submissionCount, setSubmissionCount] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [recaptchaLoaded, setRecaptchaLoaded] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const recaptchaRef = useRef(null);
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  useEffect(() => {
    const loadRecaptcha = () => {
      if (typeof window !== "undefined" && !window.grecaptcha && siteKey) {
        const existingScript = document.querySelector(
          'script[src="https://www.google.com/recaptcha/api.js"]',
        );

        if (existingScript) {
          existingScript.addEventListener(
            "load",
            () => setRecaptchaLoaded(true),
            { once: true },
          );
          return;
        }

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
      } else {
        setRecaptchaLoaded(true);
      }
    };

    loadRecaptcha();

    if (typeof window !== "undefined") {
      const storedCount = Number.parseInt(
        localStorage.getItem("formSubmissionCount") || "0",
        10,
      );
      const storedSubmissionTime = Number.parseInt(
        localStorage.getItem("lastSubmissionTime") || "0",
        10,
      );

      if (storedSubmissionTime) {
        const hoursPassed =
          (Date.now() - storedSubmissionTime) / (1000 * 60 * 60);

        if (hoursPassed >= 24) {
          setSubmissionCount(0);
          localStorage.setItem("formSubmissionCount", "0");
          localStorage.setItem("lastSubmissionTime", Date.now().toString());
        } else {
          setSubmissionCount(storedCount);
          setIsDisabled(storedCount >= 3);
        }
      } else {
        setSubmissionCount(storedCount);
        setIsDisabled(storedCount >= 3);
      }
    }

    return () => {
      if (
        typeof window !== "undefined" &&
        window.grecaptcha &&
        recaptchaRef.current
      ) {
        try {
          window.grecaptcha.reset();
        } catch (error) {
          console.error("reCAPTCHA cleanup error:", error);
        }
      }
    };
  }, [siteKey]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((currentData) => ({ ...currentData, [name]: value }));
    setErrorMessage("");
  };

  const validateForm = () => {
    if (
      !formData.fullName.trim() ||
      !formData.country.trim() ||
      !formData.phone.trim()
    ) {
      setErrorMessage("Please fill in all required fields");
      return false;
    }

    if (
      formData.email &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    ) {
      setErrorMessage("Please enter a valid email address");
      return false;
    }

    if (!isValidInternationalPhone(formData.phone)) {
      setErrorMessage("Please enter a valid international phone number");
      return false;
    }

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
              country: formData.country,
              phone: getInternationalPhoneValue(formData.phone),
              email: formData.email || "",
              source: "Dholera Insider",
              message: formData.message || "",
              interestedIn: formData.interestedProject || "",
            },
            source: "Dholera Insider Website - Contact Form",
            tags: ["Dholera Investment", "Website Lead", "Contact Form"],
            recaptchaToken: token,
          }),
        },
      );

      const responseText = await response.text();

      if (!response.ok) {
        throw new Error(responseText || "Submission failed");
      }

      if (
        responseText === "OK" ||
        responseText.toLowerCase().includes("success")
      ) {
        setFormData(initialFormData);
        setShowSuccess(true);

        const newCount = submissionCount + 1;
        setSubmissionCount(newCount);
        localStorage.setItem("formSubmissionCount", newCount.toString());
        localStorage.setItem("lastSubmissionTime", Date.now().toString());
      } else {
        setErrorMessage("Submission received but with unexpected response");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setErrorMessage(`Error submitting form: ${error.message}`);
    } finally {
      setIsLoading(false);

      if (window.grecaptcha && recaptchaRef.current) {
        try {
          window.grecaptcha.reset();
        } catch (error) {
          console.error("Error resetting reCAPTCHA:", error);
        }
      }
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    if (!validateForm()) {
      setIsLoading(false);
      return;
    }

    if (!recaptchaLoaded || !window.grecaptcha || !siteKey) {
      setErrorMessage(
        "Security verification not loaded. Please refresh the page.",
      );
      setIsLoading(false);
      return;
    }

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
      window.grecaptcha.execute();
    }
  };

  return (
    <main className="bg-[#FDFCFA] text-[#162033]">
      <section className="bg-[#051A3A] px-4 pb-[clamp(3.5rem,7vw,6rem)] pt-32 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl text-center">
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.18em] text-[#F6C343]">
            Decoding Dholera for NRIs
          </p>
          <h1 className="text-[clamp(2.25rem,5vw,4.5rem)] font-bold leading-[1.08] tracking-[-0.035em]">
            Contact Dholera Insider
          </h1>
          <div className="mx-auto mt-6 max-w-4xl space-y-4 text-base leading-8 text-white/80 md:text-lg">
            <p>
              Have questions about Dholera investment for NRIs? Our team is
              here to help you explore verified residential plots in Dholera
              Smart City with clear guidance and complete transparency.
            </p>
            <p>
              Whether you're looking for project details, pricing, or the
              remote buying process, we're just a message away.
            </p>
          </div>
        </div>
      </section>

      <section className="px-4 py-[clamp(3.5rem,6vw,5rem)] sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-2 lg:gap-12">
          <div className="rounded-2xl border border-[#051A3A]/10 bg-white p-6 shadow-[0_16px_40px_rgba(5,26,58,.08)] sm:p-8">
            <h2 className="text-[clamp(1.75rem,3vw,2.5rem)] font-bold text-[#051A3A]">
              Get in Touch
            </h2>
            <div className="mt-4 h-1 w-16 rounded-full bg-[#F6C343]" />
            <p className="mt-6 text-base leading-8 text-[#2B364D]">
              Connect with our team to discuss:
            </p>
            <ul className="mt-6 grid gap-4">
              {discussionPoints.map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <CheckCircle2
                    className="mt-0.5 h-5 w-5 shrink-0 text-[#B98500]"
                    aria-hidden="true"
                  />
                  <span className="leading-7 text-[#2B364D]">{point}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl bg-[#051A3A] p-6 text-white shadow-[0_16px_40px_rgba(5,26,58,.16)] sm:p-8">
            <h2 className="text-[clamp(1.75rem,3vw,2.5rem)] font-bold">
              Contact Information
            </h2>
            <div className="mt-4 h-1 w-16 rounded-full bg-[#F6C343]" />
            <div className="mt-8 space-y-6">
              <div className="flex items-start gap-4">
                <MapPin
                  className="mt-1 h-6 w-6 shrink-0 text-[#F6C343]"
                  aria-hidden="true"
                />
                <div>
                  <h3 className="font-bold">Office Address</h3>
                  <p className="mt-1 leading-7 text-white/75">
                    3rd Floor, H-110, Sector 63 Rd, H Block, Sector 63, Noida,
                    Uttar Pradesh 201301
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Phone
                  className="mt-1 h-6 w-6 shrink-0 text-[#F6C343]"
                  aria-hidden="true"
                />
                <div>
                  <h3 className="font-bold">Phone</h3>
                  <a
                    href="tel:+919211820887"
                    className="mt-1 inline-block text-white/75 transition-colors hover:text-[#F6C343]"
                  >
                    +91 9211820887
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Mail
                  className="mt-1 h-6 w-6 shrink-0 text-[#F6C343]"
                  aria-hidden="true"
                />
                <div>
                  <h3 className="font-bold">Email</h3>
                  <a
                    href="mailto:info@dholerainsider.com"
                    className="mt-1 inline-block break-all text-white/75 transition-colors hover:text-[#F6C343]"
                  >
                    info@dholerainsider.com
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4 border-t border-white/10 pt-6">
                <Clock
                  className="mt-1 h-6 w-6 shrink-0 text-[#F6C343]"
                  aria-hidden="true"
                />
                <div>
                  <h3 className="font-bold">Business Hours</h3>
                  <p className="mt-1 text-white/75">Monday - Saturday</p>
                  <p className="mt-1 text-white/75">9:30 AM - 9:00 PM (IST)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#EEF2F9] px-4 py-[clamp(2.75rem,5vw,4rem)] sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="mb-6 text-center">
            <h2 className="text-[clamp(1.625rem,3vw,2.25rem)] font-bold text-[#051A3A]">
              Send Us Your Enquiry
            </h2>
            <p className="mx-auto mt-3 max-w-3xl text-sm leading-7 text-[#2B364D] sm:text-base">
              Complete the enquiry form and our team will get back to you with
              the information you need.
            </p>
          </div>

          <div className="rounded-2xl bg-[#051A3A] p-5 shadow-[0_20px_50px_rgba(5,26,58,.2)] sm:p-6">
            {showSuccess ? (
              <div className="py-8 text-center text-white" role="status">
                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#F6C343]">
                  <CheckCircle2
                    className="h-8 w-8 text-[#051A3A]"
                    aria-hidden="true"
                  />
                </div>
                <h3 className="text-2xl font-bold">Thank You!</h3>
                <p className="mt-3 text-white/75">
                  Your enquiry has been submitted successfully. Our team will
                  contact you shortly.
                </p>
                <button
                  type="button"
                  onClick={() => setShowSuccess(false)}
                  className="mt-6 min-h-12 rounded-lg bg-[#F6C343] px-6 py-3 font-bold text-[#051A3A] transition-colors hover:bg-white"
                >
                  Send Another Enquiry
                </button>
              </div>
            ) : isDisabled ? (
              <p className="py-8 text-center font-semibold text-white">
                You have reached the maximum submission limit. Try again after
                24 hours.
              </p>
            ) : (
              <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-3">
                {errorMessage && (
                  <div
                    className="rounded-lg border border-[#B42318] bg-[#B42318]/15 p-3 text-sm text-white md:col-span-3"
                    role="alert"
                  >
                    {errorMessage}
                  </div>
                )}

                <div>
                  <label htmlFor="fullName" className="mb-1.5 block text-sm font-medium text-white">
                    Full Name
                  </label>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    autoComplete="name"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    className="min-h-11 w-full rounded-lg border border-white/15 bg-white px-3 py-2.5 text-[#162033] outline-none transition focus:border-[#F6C343] focus:ring-2 focus:ring-[#F6C343]/40"
                  />
                </div>

                <div>
                  <label htmlFor="country" className="mb-1.5 block text-sm font-medium text-white">
                    Country
                  </label>
                  <input
                    id="country"
                    name="country"
                    type="text"
                    autoComplete="country-name"
                    value={formData.country}
                    onChange={handleChange}
                    required
                    className="min-h-11 w-full rounded-lg border border-white/15 bg-white px-3 py-2.5 text-[#162033] outline-none transition focus:border-[#F6C343] focus:ring-2 focus:ring-[#F6C343]/40"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-white">
                    Phone Number
                  </label>
                  <InternationalPhoneInput
                    value={formData.phone}
                    onChange={(phone) => {
                      setFormData((currentData) => ({
                        ...currentData,
                        phone,
                      }));
                      setErrorMessage("");
                    }}
                    inputProps={{
                      id: "phone",
                      name: "phone",
                      autoComplete: "tel",
                    }}
                  />
                </div>

                <div className="md:col-span-3">
                  <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-white">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={3}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full resize-y rounded-lg border border-white/15 bg-white px-3 py-2.5 text-[#162033] outline-none transition focus:border-[#F6C343] focus:ring-2 focus:ring-[#F6C343]/40"
                  />
                </div>

                <div className="flex justify-center md:col-span-3">
                  <div ref={recaptchaRef} />
                </div>

                <button
                  type="submit"
                  disabled={isLoading || isDisabled || !recaptchaLoaded}
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-[#F6C343] px-6 py-2.5 font-bold text-[#051A3A] transition-colors hover:bg-white disabled:cursor-not-allowed disabled:bg-[#6C7484] disabled:text-white md:col-span-3"
                >
                  <Send className="h-5 w-5" aria-hidden="true" />
                  {isLoading ? "Sending..." : "Request a Call Back"}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      <section className="px-4 py-[clamp(3.5rem,6vw,5rem)] sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="mb-10 text-center">
            <h2 className="text-[clamp(1.75rem,3.4vw,2.75rem)] font-bold text-[#051A3A]">
              FAQs
            </h2>
            <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-[#F6C343]" />
          </div>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <article
                key={faq.question}
                className="rounded-2xl border border-[#051A3A]/10 bg-white p-6 shadow-sm"
              >
                <h3 className="text-lg font-bold text-[#051A3A]">
                  {faq.question}
                </h3>
                <p className="mt-3 leading-7 text-[#2B364D]">{faq.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
