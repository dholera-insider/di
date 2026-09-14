"use client";

import { useEffect, useRef, useState ,useId } from "react";

import {
  CheckCircle2,
  Clock,
  Mail,
  MapPin,
  Phone,
  Send,
  Clock3,
  ChevronDown,
} from "lucide-react";

import InternationalPhoneInput, {
  getInternationalPhoneValue,
  isValidInternationalPhone,
} from "../components/InternationalPhoneInput";
import GetInTouch from "./GetInTouch";

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
  const [openIndex, setOpenIndex] = useState(-1);
  const headingId = useId();

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

  // ContactSkyLine function  
  function ContactSkyline() {
    return (
      <svg
        viewBox="0 0 1600 380"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMax slice"
        aria-hidden="true"
        focusable="false"
        shapeRendering="geometricPrecision"
        className="block h-full w-full"
      >
        {/* =====================================================
            SINGLE CONTINUOUS WHITE SILHOUETTE
        ====================================================== */}

        <path
          fill="#FFFFFF"
          d="
            M0 303

            L20 303
            L32 289
            L44 303
            L67 303

            L67 292
            L82 280
            L98 292
            L98 303

            L129 303
            L129 268
            L137 268
            L137 244
            L145 224
            L153 244
            L153 268
            L162 268
            L162 303

            L205 303
            L205 274
            L220 274
            L233 247
            L286 247
            L301 274
            L319 274
            L319 303

            L342 303
            L342 268
            L350 268
            L350 244
            L359 224
            L368 244
            L368 268
            L377 268
            L377 303

            L404 303
            L404 286
            L421 274
            L439 286
            L439 303

            L472 303
            L472 282
            L491 282
            L491 268
            L516 251
            L540 268
            L540 282
            L558 282
            L558 303

            L579 303
            L579 261
            L645 261
            L645 303

            L666 303
            L666 280
            L691 280
            L691 268
            L713 253
            L735 268
            L735 280
            L754 280
            L754 303

            L766 303
            L766 244
            L776 244
            L776 207
            L785 207
            L785 177
            L794 146
            L803 177
            L803 207
            L812 207
            L812 244
            L823 244
            L823 303

            L851 303
            L851 285
            L870 270
            L889 285
            L889 303

            L918 303
            L918 275
            L937 275
            L937 258
            Q959 230 981 258
            L981 275
            L1001 275
            L1001 303

            L1037 303
            L1037 247
            L1049 247
            L1049 216
            L1061 216
            L1061 180
            L1073 180
            L1073 142
            L1084 142
            L1084 103
            L1096 72
            L1108 103
            L1108 142
            L1120 142
            L1120 180
            L1132 180
            L1132 216
            L1144 216
            L1144 247
            L1156 247
            L1156 303

            L1182 303
            L1182 276
            L1198 276
            L1229 256
            L1260 276
            L1277 276
            L1277 303

            L1309 303
            L1309 266
            L1318 266
            L1318 240
            L1327 218
            L1336 240
            L1336 266
            L1345 266
            L1345 303

            L1377 303
            L1391 286
            L1406 303

            L1432 303
            L1432 282
            L1452 282
            L1452 267
            L1475 250
            L1498 267
            L1498 282
            L1518 282
            L1518 303

            L1540 303
            L1554 286
            L1567 303

            L1600 303

            L1600 380
            L0 380
            Z
          "
        />

        {/* =====================================================
            ROOFLINE
        ====================================================== */}

        <path
          d="
            M0 303

            L20 303
            L32 289
            L44 303
            L67 303

            L67 292
            L82 280
            L98 292
            L98 303

            L129 303
            L129 268
            L137 268
            L137 244
            L145 224
            L153 244
            L153 268
            L162 268
            L162 303

            L205 303
            L205 274
            L220 274
            L233 247
            L286 247
            L301 274
            L319 274
            L319 303

            L342 303
            L342 268
            L350 268
            L350 244
            L359 224
            L368 244
            L368 268
            L377 268
            L377 303

            L404 303
            L404 286
            L421 274
            L439 286
            L439 303

            L472 303
            L472 282
            L491 282
            L491 268
            L516 251
            L540 268
            L540 282
            L558 282
            L558 303

            L579 303
            L579 261
            L645 261
            L645 303

            L666 303
            L666 280
            L691 280
            L691 268
            L713 253
            L735 268
            L735 280
            L754 280
            L754 303

            L766 303
            L766 244
            L776 244
            L776 207
            L785 207
            L785 177
            L794 146
            L803 177
            L803 207
            L812 207
            L812 244
            L823 244
            L823 303

            L851 303
            L851 285
            L870 270
            L889 285
            L889 303

            L918 303
            L918 275
            L937 275
            L937 258
            Q959 230 981 258
            L981 275
            L1001 275
            L1001 303

            L1037 303
            L1037 247
            L1049 247
            L1049 216
            L1061 216
            L1061 180
            L1073 180
            L1073 142
            L1084 142
            L1084 103
            L1096 72
            L1108 103
            L1108 142
            L1120 142
            L1120 180
            L1132 180
            L1132 216
            L1144 216
            L1144 247
            L1156 247
            L1156 303

            L1182 303
            L1182 276
            L1198 276
            L1229 256
            L1260 276
            L1277 276
            L1277 303

            L1309 303
            L1309 266
            L1318 266
            L1318 240
            L1327 218
            L1336 240
            L1336 266
            L1345 266
            L1345 303

            L1377 303
            L1391 286
            L1406 303

            L1432 303
            L1432 282
            L1452 282
            L1452 267
            L1475 250
            L1498 267
            L1498 282
            L1518 282
            L1518 303

            L1540 303
            L1554 286
            L1567 303

            L1600 303
          "
          fill="none"
          stroke="#051A3A"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />

        {/* =====================================================
            ARCHITECTURAL DETAILS
        ====================================================== */}

        <g
          fill="none"
          stroke="#051A3A"
          strokeWidth="1.35"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
          opacity="0.92"
        >
          {/* LEFT SMALL BUILDINGS */}

          <path d="M9 310 V357" />
          <path d="M32 305 V352" />
          <path d="M73 300 V354" />
          <path d="M92 299 V354" />

          {/* LEFT TOWER */}

          <path d="M137 253 H153" />
          <path d="M137 260 H153" />
          <path d="M145 231 V220" />

          {/* CLASSIC BUILDING */}

          <path d="M214 275 H310" />

          <path d="M231 283 V351" />
          <path d="M250 283 V351" />
          <path d="M270 283 V351" />
          <path d="M289 283 V351" />

          <path d="M233 247 L224 271" />
          <path d="M254 247 V271" />
          <path d="M277 247 V271" />
          <path d="M299 271 L286 247" />

          {/* SMALL SPIRE */}

          <path d="M351 250 H367" />
          <path d="M351 259 H367" />
          <path d="M359 232 V220" />

          {/* LOW BUILDINGS */}

          <path d="M411 294 V351" />
          <path d="M430 294 V351" />

          <path d="M483 291 V351" />
          <path d="M500 291 V351" />
          <path d="M518 291 V351" />
          <path d="M536 291 V351" />

          {/* MODERN GRID BUILDING */}

          <path d="M590 272 H634" />
          <path d="M590 285 H634" />
          <path d="M590 298 H634" />

          <path d="M602 266 V351" />
          <path d="M616 266 V351" />
          <path d="M630 266 V351" />

          {/* CENTRAL LOW BUILDING */}

          <path d="M676 289 V351" />
          <path d="M697 289 V351" />
          <path d="M720 289 V351" />

          {/* CENTRAL TOWER */}

          <path d="M776 244 H812" />
          <path d="M776 233 H812" />
          <path d="M785 207 H803" />
          <path d="M785 191 H803" />
          <path d="M787 177 H801" />

          <path d="M778 257 H810" />

          <path d="M780 275 V351" />
          <path d="M794 275 V351" />
          <path d="M808 275 V351" />

          {/* CENTRAL SMALL BUILDINGS */}

          <path d="M858 294 V351" />
          <path d="M878 294 V351" />

          {/* DOME */}

          <path d="M937 275 H981" />
          <path d="M929 286 H991" />

          <path d="M940 292 V351" />
          <path d="M954 292 V351" />
          <path d="M968 292 V351" />
          <path d="M982 292 V351" />

          {/* MAIN TOWER */}

          <path d="M1049 247 H1144" />
          <path d="M1061 216 H1132" />
          <path d="M1073 180 H1120" />
          <path d="M1084 142 H1108" />
          <path d="M1084 124 H1108" />
          <path d="M1087 104 H1105" />

          <path d="M1056 264 H1137" />

          <path d="M1054 280 V351" />
          <path d="M1072 280 V351" />
          <path d="M1090 280 V351" />
          <path d="M1108 280 V351" />
          <path d="M1126 280 V351" />
          <path d="M1142 280 V351" />

          {/* CLASSIC RIGHT BUILDING */}

          <path d="M1190 281 H1269" />

          <path d="M1200 292 V351" />
          <path d="M1218 292 V351" />
          <path d="M1237 292 V351" />
          <path d="M1256 292 V351" />

          <path d="M1199 275 L1229 261 L1260 275" />

          {/* RIGHT TOWER */}

          <path d="M1318 266 H1336" />
          <path d="M1318 255 H1336" />
          <path d="M1327 230 V215" />

          <path d="M1317 283 V351" />
          <path d="M1337 283 V351" />

          {/* FAR RIGHT */}

          <path d="M1384 311 V351" />
          <path d="M1401 311 V351" />

          <path d="M1443 291 V351" />
          <path d="M1461 291 V351" />
          <path d="M1479 291 V351" />
          <path d="M1497 291 V351" />

          <path d="M1454 280 H1496" />
        </g>

        {/* =====================================================
            SMALL WINDOW DETAILS
        ====================================================== */}

        <g
          fill="#051A3A"
          opacity="0.82"
        >
          <rect
            x="786"
            y="263"
            width="4"
            height="7"
            rx="1"
          />

          <rect
            x="798"
            y="263"
            width="4"
            height="7"
            rx="1"
          />

          <rect
            x="1071"
            y="272"
            width="4"
            height="8"
            rx="1"
          />

          <rect
            x="1083"
            y="272"
            width="4"
            height="8"
            rx="1"
          />

          <rect
            x="1095"
            y="272"
            width="4"
            height="8"
            rx="1"
          />

          <rect
            x="1107"
            y="272"
            width="4"
            height="8"
            rx="1"
          />

          <rect
            x="1119"
            y="272"
            width="4"
            height="8"
            rx="1"
          />
        </g>

        {/* =====================================================
            BOTTOM HIGHLIGHT

            Slightly stronger than before.
            Same blue as the architectural outlines.
        ====================================================== */}

        <rect
          x="0"
          y="377"
          width="1600"
          height="1.5"
          fill="#051A3A"
          opacity="0.92"
        />
      </svg>
    );
  }

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
  

  const contactDetails = [
  {
    Icon: MapPin,
    label: "Office Address",
    content: (
      <span>
        3rd Floor, H-110, Sector 63 Rd, H Block, Sector 63, Noida,
        Uttar Pradesh 201301
      </span>
    ),
  },
  {
    Icon: Phone,
    label: "Phone",
    content: (
      <a
        href="tel:+919211820887"
        className="
          transition-colors
          duration-300
          hover:text-[#F6C343]
        "
      >
        +91 9211820887
      </a>
    ),
  },
  {
    Icon: Mail,
    label: "Email",
    content: (
      <a
        href="mailto:info@dholerainsider.com"
        className="
          break-all
          transition-colors
          duration-300
          hover:text-[#F6C343]
        "
      >
        info@dholerainsider.com
      </a>
    ),
  },
  {
    Icon: Clock3,
    label: "Business Hours",
    content: (
      <span>
        Monday - Saturday
        <span className="ml-1 text-white/60">
          9:30 AM - 9:00 PM (IST)
        </span>
      </span>
    ),
  },
];



  return (
    <main className="bg-[#FDFCFA] text-[#162033]">
      {/* Main contact banner section  */}
      <section
        className="
          relative
          isolate
          overflow-hidden
          text-white
        "
        style={{
          background:
            "radial-gradient(circle at 50% 5%, rgba(18,63,108,0.28) 0%, rgba(10,43,78,0.14) 28%, transparent 52%), linear-gradient(180deg, #031227 0%, #04162F 24%, #051A3A 50%, #061E40 75%, #072347 100%)",
        }}
      >
        {/* =====================================================
            SOFT TOP GLOW
        ====================================================== */}

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            left-1/2
            top-[-240px]
            -z-10
            h-[580px]
            w-[1000px]
            -translate-x-1/2
            rounded-full
            bg-[#168FD0]/[0.07]
            blur-[140px]
          "
        />

        {/* =====================================================
            MAIN CONTENT
        ====================================================== */}

        <div
          className="
            relative
            z-20
            mx-auto
            flex
            w-full
            max-w-7xl
            flex-col
            items-center

            px-5
            pb-[190px]
            pt-16
            text-center

            sm:px-8
            sm:pb-[225px]
            sm:pt-20

            lg:px-10
            lg:pb-[265px]
            lg:pt-24

            xl:pb-[280px]
          "
        >
          {/* =================================================
              EYEBROW
          ================================================== */}

          <div
            className="
              flex
              items-center
              justify-center
              gap-3

              sm:gap-4
            "
          >
            <span
              aria-hidden="true"
              className="
                h-px
                w-7
                bg-gradient-to-r
                from-transparent
                to-[#F6C343]/90

                sm:w-10
              "
            />

            <p
              className="
                text-[10px]
                font-bold
                uppercase
                tracking-[0.22em]
                text-[#F6C343]

                sm:text-xs
                sm:tracking-[0.24em]

                lg:text-[13px]
              "
            >
              Decoding Dholera for NRIs
            </p>

            <span
              aria-hidden="true"
              className="
                h-px
                w-7
                bg-gradient-to-l
                from-transparent
                to-[#F6C343]/90

                sm:w-10
              "
            />
          </div>

          {/* =================================================
              TITLE
          ================================================== */}

          <h1
            className="
              mt-5
              max-w-[1100px]

              text-[clamp(2.4rem,6vw,4.8rem)]
              font-bold
              leading-[1]
              tracking-[-0.055em]
              text-white

              sm:mt-7
            "
          >
            Contact Dholera Insider
          </h1>

          {/* =================================================
              GOLD ACCENT
          ================================================== */}

          <div
            aria-hidden="true"
            className="
              mt-6
              h-[3px]
              w-14
              rounded-full
              bg-[#F6C343]

              sm:mt-7
              sm:w-16
            "
          />

          {/* =================================================
              DESCRIPTION
          ================================================== */}

          <div
            className="
              mt-6
              max-w-[920px]

              text-[14px]
              leading-7
              text-white/70

              sm:mt-7
              sm:text-[16px]
              sm:leading-8

              lg:max-w-[960px]
              lg:text-[17px]
            "
          >
            <p>
              Have questions about Dholera investment for NRIs? Our team is here
              to help you explore verified residential plots in Dholera Smart City
              with clear guidance and complete transparency.
            </p>
          </div>

          {/* =====================================================
              SIMPLE CONTACT INFORMATION
          ====================================================== */}

          <div
            className="
              mt-9
              w-full
              max-w-6xl

              border-y
              border-white/[0.10]

              py-5

              sm:mt-10
              sm:py-6

              lg:mt-11
            "
          >
            <div
              className="
                grid
                grid-cols-1

                gap-y-5

                sm:grid-cols-2
                sm:gap-x-8
                sm:gap-y-6

                lg:grid-cols-4
                lg:gap-0
              "
            >
              {contactDetails.map(({ Icon, label, content }, index) => (
                <div
                  key={label}
                  className={`
                    group

                    flex
                    items-start
                    gap-3

                    text-left

                    lg:px-5

                    ${
                      index !== contactDetails.length - 1
                        ? "lg:border-r lg:border-white/[0.10]"
                        : ""
                    }
                  `}
                >
                  {/* =============================================
                      ICON
                  ============================================== */}

                  <div
                    className="
                      mt-0.5

                      flex
                      h-9
                      w-9
                      shrink-0

                      items-center
                      justify-center

                      rounded-lg

                      bg-[#F6C343]/10

                      text-[#F6C343]

                      transition-all
                      duration-300

                      group-hover:bg-[#F6C343]
                      group-hover:text-[#051A3A]

                      sm:h-10
                      sm:w-10
                    "
                  >
                    <Icon
                      className="
                        h-[18px]
                        w-[18px]

                        sm:h-5
                        sm:w-5
                      "
                      strokeWidth={1.7}
                      aria-hidden="true"
                    />
                  </div>

                  {/* =============================================
                      TEXT
                  ============================================== */}

                  <div className="min-w-0">
                    <h2
                      className="
                        mb-1

                        text-[10px]
                        font-bold
                        uppercase
                        tracking-[0.12em]
                        text-[#F6C343]

                        sm:text-[11px]
                      "
                    >
                      {label}
                    </h2>

                    <div
                      className="
                        max-w-[270px]

                        text-[13px]
                        font-medium
                        leading-[1.65]
                        text-white/85

                        sm:text-[13.5px]

                        lg:text-[13px]
                      "
                    >
                      {content}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* =====================================================
            SKYLINE
        ====================================================== */}

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            inset-x-0
            bottom-0
            z-10

            h-[190px]
            overflow-hidden
            text-[#169DDA]

            sm:h-[225px]

            lg:h-[265px]

            xl:h-[280px]
          "
        >
          <ContactSkyline />
        </div>
      </section>

      {/* Enquiry form section  */}
      <section
            className="
              relative
              overflow-hidden
              bg-[#F2F6FC]
              px-1
              py-10
              sm:py-10
              lg:py-14
            "
          >
            {/* =====================================================
                SECTION BACKGROUND
            ====================================================== */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 overflow-hidden"
            >
              <div
                className="
                  absolute
                  -left-[220px]
                  top-1/2
                  hidden
                  h-[600px]
                  w-[600px]
                  -translate-y-1/2
                  rounded-full
                  bg-white/60
                  blur-3xl
                  lg:block
                "
              />

              <div
                className="
                  absolute
                  -right-[220px]
                  -top-[220px]
                  h-[480px]
                  w-[480px]
                  rounded-full
                  bg-[#F6C343]/[0.04]
                  blur-3xl
                "
              />
            </div>

            {/* =====================================================
                MAIN CONTAINER
            ====================================================== */}
            <div
              className="
                relative
                z-10
                mx-auto
                w-full
                max-w-[1160px]
                px-4
                sm:px-6
                lg:px-8
              "
            >
              <div
                className="
                  flex
                  justify-center

                  lg:grid
                  lg:grid-cols-[minmax(0,460px)_minmax(0,610px)]
                  lg:items-stretch
                  lg:justify-center
                  lg:gap-[54px]
                "
              >
                {/* =================================================
                    LEFT SIDE
                    DESKTOP ONLY
                ================================================== */}
                <aside
                  aria-labelledby="contact-information-heading"
                  className="
                    relative
                    hidden
                    min-w-0
                    overflow-hidden
                    rounded-[22px]

                    lg:flex
                    lg:h-full
                    lg:flex-col
                    lg:justify-center
                  "
                >
                  {/* ===============================================
                      LEFT BACKGROUND / DECORATION

                      IMPORTANT:
                      Everything is clipped inside this aside.
                      It can no longer overlap the form.
                  ================================================ */}

                  {/* Main white lower arch */}
                  <div
                    aria-hidden="true"
                    className="
                      pointer-events-none
                      absolute
                      -bottom-[220px]
                      left-[30px]
                      h-[455px]
                      w-[455px]
                      rounded-full
                      bg-white/85
                    "
                  />

                  {/* Grey inner arch */}
                  <div
                    aria-hidden="true"
                    className="
                      pointer-events-none
                      absolute
                      -bottom-[250px]
                      left-[60px]
                      h-[400px]
                      w-[400px]
                      rounded-full
                      bg-[#E5EBF3]
                    "
                  />

                  {/* Gold outline */}
                  <div
                    aria-hidden="true"
                    className="
                      pointer-events-none
                      absolute
                      -bottom-[218px]
                      left-[68px]
                      h-[440px]
                      w-[440px]
                      rounded-full
                      border
                      border-[#F6C343]/70
                    "
                  />

                  {/* Architectural shape 1 */}
                  <div
                    aria-hidden="true"
                    className="
                      pointer-events-none
                      absolute
                      bottom-[12px]
                      right-[72px]
                      h-[116px]
                      w-[78px]
                      bg-[#CDC8BF]
                    "
                  />

                  {/* Architectural shape 2 */}
                  <div
                    aria-hidden="true"
                    className="
                      pointer-events-none
                      absolute
                      bottom-[12px]
                      right-[136px]
                      h-[82px]
                      w-[64px]
                      bg-[#DDD8D0]
                    "
                  />

                  {/* =================================================
                      LEFT CONTENT
                  ================================================== */}
                  <div
                    className="
                      relative
                      z-10
                      w-full
                      max-w-[430px]
                      px-1
                      pb-[110px]
                    "
                  >
                    <h2
                      id="contact-information-heading"
                      className="
                        max-w-[420px]
                        font-serif
                        text-[48px]
                        font-medium
                        leading-[1.03]
                        tracking-[-0.04em]
                        text-[#051A3A]

                        xl:text-[52px]
                      "
                    >
                      Have questions
                      <br />
                      about buying
                      <br />
                      in Dholera?
                    </h2>

                    {/* Gold underline */}
                    <div
                      aria-hidden="true"
                      className="
                        mt-6
                        h-[3px]
                        w-[78px]
                        rounded-full
                        bg-[#F6C343]
                      "
                    />

                    <p
                      className="
                        mt-6
                        max-w-[410px]
                        text-[15px]
                        leading-[1.85]
                        text-[#667286]
                      "
                    >
                      Whether you're looking for project details, pricing,
                      documentation, or the remote buying process, send us your
                      enquiry and our team will help you understand the next steps.
                    </p>
                  </div>
                </aside>

                {/* =================================================
                    RIGHT SIDE FORM
                ================================================== */}
                <div
                  className="
                    w-full
                    max-w-[610px]

                    lg:h-full
                    lg:max-w-none
                  "
                >
                  <form
                    onSubmit={handleSubmit}
                    className="
                      flex
                      w-full
                      flex-col
                      overflow-hidden
                      rounded-[22px]
                      border
                      border-[#DCE3EC]
                      border-t-[3px]
                      border-t-[#F6C343]
                      bg-white
                      shadow-[0_16px_45px_rgba(5,26,58,0.07)]

                      lg:h-full
                    "
                  >
                    {/* =============================================
                        FORM HEADER
                    ============================================== */}
                    <div
                      className="
                        border-b
                        border-[#E7EBF1]
                        px-5
                        py-6

                        sm:px-7

                        lg:px-8
                        lg:py-6
                      "
                    >
                      <h3
                        className="
                          text-[28px]
                          font-bold
                          leading-[1.1]
                          tracking-[-0.035em]
                          text-[#051A3A]

                          sm:text-[31px]

                          lg:text-[33px]
                        "
                      >
                        Send Us Your Enquiry
                      </h3>

                      <p
                        className="
                          mt-2
                          max-w-[470px]
                          text-[13px]
                          leading-[1.6]
                          text-[#758196]

                          sm:text-sm
                        "
                      >
                        Complete the enquiry form and our team will get back to you
                        with the information you need.
                      </p>
                    </div>

                    {/* =============================================
                        FORM BODY
                    ============================================== */}
                    <div
                      className="
                        flex
                        flex-1
                        flex-col
                        px-5
                        py-6

                        sm:px-7

                        lg:px-8
                        lg:py-6
                      "
                    >
                      {/* NAME + COUNTRY */}
                      <div className="grid gap-4 sm:grid-cols-2">
                        {/* Full Name */}
                        <div>
                          <label
                            htmlFor="fullName"
                            className="
                              mb-1.5
                              block
                              text-[10px]
                              font-bold
                              uppercase
                              tracking-[0.06em]
                              text-[#4D596C]
                            "
                          >
                            Full Name
                          </label>

                          <input
                            id="fullName"
                            name="fullName"
                            type="text"
                            placeholder="Your name"
                            className="
                              h-[48px]
                              w-full
                              rounded-[10px]
                              border
                              border-[#DBE2EC]
                              bg-[#F8FAFC]
                              px-4
                              text-sm
                              text-[#051A3A]
                              outline-none
                              transition-all
                              duration-200

                              placeholder:text-[#A4AEC0]

                              focus:border-[#F6C343]
                              focus:bg-white
                              focus:ring-4
                              focus:ring-[#F6C343]/10

                              lg:h-[46px]
                            "
                          />
                        </div>

                        {/* Country */}
                        <div>
                          <label
                            htmlFor="country"
                            className="
                              mb-1.5
                              block
                              text-[10px]
                              font-bold
                              uppercase
                              tracking-[0.06em]
                              text-[#4D596C]
                            "
                          >
                            Country
                          </label>

                          <input
                            id="country"
                            name="country"
                            type="text"
                            placeholder="Country of residence"
                            className="
                              h-[48px]
                              w-full
                              rounded-[10px]
                              border
                              border-[#DBE2EC]
                              bg-[#F8FAFC]
                              px-4
                              text-sm
                              text-[#051A3A]
                              outline-none
                              transition-all
                              duration-200

                              placeholder:text-[#A4AEC0]

                              focus:border-[#F6C343]
                              focus:bg-white
                              focus:ring-4
                              focus:ring-[#F6C343]/10

                              lg:h-[46px]
                            "
                          />
                        </div>
                      </div>

                      {/* =============================================
                          PHONE
                      ============================================== */}
                      <div className="mt-4">
                        <label
                          htmlFor="phone"
                          className="
                            mb-1.5
                            block
                            text-[10px]
                            font-bold
                            uppercase
                            tracking-[0.06em]
                            text-[#4D596C]
                          "
                        >
                          Phone Number
                        </label>

                        <div
                          className="
                            flex
                            h-[48px]
                            overflow-hidden
                            rounded-[10px]
                            border
                            border-[#DBE2EC]
                            bg-[#F8FAFC]
                            transition-all
                            duration-200

                            focus-within:border-[#F6C343]
                            focus-within:bg-white
                            focus-within:ring-4
                            focus-within:ring-[#F6C343]/10

                            lg:h-[46px]
                          "
                        >
                          <div
                            className="
                              flex
                              shrink-0
                              items-center
                              gap-2
                              border-r
                              border-[#DBE2EC]
                              px-4
                              text-sm
                              text-[#051A3A]
                            "
                          >
                            <span className="text-[10px] font-semibold">
                              IN
                            </span>

                            <span>+91</span>
                          </div>

                          <input
                            id="phone"
                            name="phone"
                            type="tel"
                            inputMode="tel"
                            placeholder="Enter your phone number"
                            className="
                              min-w-0
                              flex-1
                              bg-transparent
                              px-4
                              text-sm
                              text-[#051A3A]
                              outline-none

                              placeholder:text-[#A4AEC0]
                            "
                          />
                        </div>
                      </div>

                      {/* =============================================
                          MESSAGE
                      ============================================== */}
                      <div className="mt-4">
                        <div
                          className="
                            mb-1.5
                            flex
                            items-center
                            justify-between
                          "
                        >
                          <label
                            htmlFor="message"
                            className="
                              text-[10px]
                              font-bold
                              uppercase
                              tracking-[0.06em]
                              text-[#4D596C]
                            "
                          >
                            Message
                          </label>

                          <span className="text-[10px] text-[#A0A9B9]">
                            Optional
                          </span>
                        </div>

                        <textarea
                          id="message"
                          name="message"
                          rows={4}
                          placeholder="Tell us what you would like to know"
                          className="
                            min-h-[105px]
                            w-full
                            resize-none
                            rounded-[10px]
                            border
                            border-[#DBE2EC]
                            bg-[#F8FAFC]
                            px-4
                            py-3
                            text-sm
                            leading-6
                            text-[#051A3A]
                            outline-none
                            transition-all
                            duration-200

                            placeholder:text-[#A4AEC0]

                            focus:border-[#F6C343]
                            focus:bg-white
                            focus:ring-4
                            focus:ring-[#F6C343]/10
                          "
                        />
                      </div>

                      {/* =============================================
                          SUBMIT
                      ============================================== */}
                      <div
                        className="
                          mt-5
                          flex
                          border-t
                          border-[#E7EBF1]
                          pt-5

                          sm:justify-end

                          lg:mt-auto
                        "
                      >
                        <button
                          type="submit"
                          className="
                            inline-flex
                            h-[48px]
                            w-full
                            items-center
                            justify-center
                            gap-2.5
                            rounded-[10px]
                            bg-[#051A3A]
                            px-6
                            text-sm
                            font-semibold
                            text-white
                            transition-all
                            duration-300

                            hover:-translate-y-0.5
                            hover:bg-[#08264F]
                            hover:shadow-[0_10px_24px_rgba(5,26,58,0.16)]

                            active:translate-y-0

                            sm:w-auto
                            sm:min-w-[205px]

                            lg:h-[46px]
                          "
                        >
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            className="h-[17px] w-[17px]"
                            aria-hidden="true"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M22 2 11 13"
                            />

                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="m22 2-7 20-4-9-9-4 20-7Z"
                            />
                          </svg>

                          Request a Call Back
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
      </section>

      {/* get in touch Section  */}
      <GetInTouch />

      {/* Faq Section  */}
      <section
        id="faqs"
        className="scroll-mt-28 bg-[#EEF2F9] px-4 py-8 sm:px-6 md:py-12 lg:px-8"
        aria-labelledby={headingId}
      >
        <div className="mx-auto max-w-5xl">
          <h2
            id={headingId}
            className="font-[var(--font-oman-display)] text-[clamp(1.9rem,4vw,3.25rem)] font-bold leading-tight tracking-[-0.045em]"
          >
            FAQ
          </h2>
          <div
              aria-hidden="true"
              className="
                mt-3
                h-[3px]
                w-12
                rounded-full
                bg-[#F6C343]
              "
            />
          <div className="mt-8 divide-y divide-[#051A3A]/15 border-y border-[#051A3A]/15">
            {faqs.map((item, index) => {
              const isOpen = openIndex === index;
              const answerId = `oman-faq-answer-${index}`;
              const buttonId = `oman-faq-button-${index}`;

              return (
                <article key={item.question}>
                  <h3>
                    <button
                      id={buttonId}
                      type="button"
                      onClick={() => setOpenIndex(isOpen ? -1 : index)}
                      className="flex min-h-16 w-full items-center justify-between gap-5 py-5 text-left font-[var(--font-oman-display)] text-base font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F6C343] sm:text-lg"
                      aria-expanded={isOpen}
                      aria-controls={answerId}
                    >
                      <span className="flex items-start gap-3">
                        <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#F6C343] text-xs font-bold text-[#051A3A]">
                          Q
                        </span>
                        <span>{item.question}</span>
                      </span>
                      <ChevronDown
                        className={`h-5 w-5 shrink-0 transition-transform ${
                          isOpen ? "rotate-180" : ""
                        }`}
                        aria-hidden="true"
                      />
                    </button>
                  </h3>
                  <div
                    id={answerId}
                    role="region"
                    aria-labelledby={buttonId}
                    hidden={!isOpen}
                  >
                    <div className="flex max-w-3xl items-start gap-3 pb-5">
                      <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#051A3A] text-xs font-bold text-[#F6C343]">
                        A
                      </span>
                      <p className="text-sm leading-7 text-[#051A3A]/70 sm:text-base">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

    </main>
  );
}
