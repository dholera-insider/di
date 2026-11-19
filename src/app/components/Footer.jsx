
import Link from "next/link";
import Image from "next/image";
import {
  MapPin,
  Mail,
  Phone,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  ChevronRight,
} from "lucide-react";

import logo from "@/app/assets/icons/NewLogo.webp";

const quickLinks = [
  {
    label: "About Dholera",
    href: "/about-dholera-sir",
  },
  {
    label: "Dholera Updates",
    href: "/dholera-sir-updates",
  },
  {
    label: "Dholera Blogs",
    href: "/dholera-sir-blogs",
  },
  {
    label: "Contact Us",
    href: "/contact",
  },
  {
    label: "About Us",
    href: "/about-us",
  },
];

const socialLinks = [
  {
    name: "Facebook",
    href: "https://www.facebook.com/dholerainsider/",
    Icon: Facebook,
  },
  {
    name: "Twitter",
    href: "https://x.com/Dholera_Insider",
    Icon: Twitter,
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/dholerainsider/",
    Icon: Instagram,
  },
  {
    name: "YouTube",
    href: "https://www.youtube.com/@DholeraInsider",
    Icon: Youtube,
  },
];

// Common header alignment for all footer columns.
// Reduced header height fixes excessive bottom spacing.
const footerHeaderClass = `
  flex
  h-[64px]
  sm:h-[66px]
  lg:h-[68px]
  items-center
  border-b
  border-[#faf8f3]/30
  pb-1
`;

const footerHeadingClass = `
  m-0
  text-lg
  sm:text-xl
  font-semibold
  leading-7
  text-[#faf8f3]
`;

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#0b1d3a] py-2">
      <div
        className="
          mx-auto
          w-full
          max-w-7xl
          px-4
          sm:px-6
          lg:px-8
        "
      >

        {/* Main Footer Grid */}
        <div
          className="
            grid
            grid-cols-1
            gap-x-8
            gap-y-8
            md:grid-cols-2
            lg:grid-cols-3
            lg:gap-x-10
          "
        >

          {/* Column 1: Logo and About */}
          <div className="min-w-0">

            {/* Logo Header */}
            <div className={footerHeaderClass}>
              <Link
                href="/"
                aria-label="Dholera Insider Home"
                className="inline-flex items-center"
              >
                <Image
                  src={logo}
                  alt="Dholera Insider Logo"
                  priority={false}
                  className="
                    block
                    h-[52px]
                    sm:h-[54px]
                    lg:h-[58px]
                    w-auto
                    max-w-[115px]
                    object-contain
                  "
                />
              </Link>
            </div>

            {/* Description */}
            <p
              className="
                mt-4
                mb-0
                max-w-[42ch]
                text-sm
                sm:text-base
                leading-6
                text-[#faf8f3]/90
              "
            >
              Dholera Insider helps NRIs explore verified
              residential plots in Dholera with clear
              documentation, transparent processes, and
              dedicated investment support.
            </p>

            {/* Social Media Icons */}
            <div
              className="
                mt-4
                flex
                flex-wrap
                items-center
                gap-2
              "
            >
              {socialLinks.map(({ name, href, Icon }) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={name}
                  className="
                    flex
                    h-11
                    w-11
                    items-center
                    justify-center
                    rounded-md
                    text-[#faf8f3]/75
                    transition-colors
                    duration-200
                    hover:bg-[#faf8f3]/10
                    hover:text-[#faf8f3]
                    focus-visible:outline
                    focus-visible:outline-2
                    focus-visible:outline-offset-2
                    focus-visible:outline-[#faf8f3]
                  "
                >
                  <Icon size={20} aria-hidden="true" />
                </a>
              ))}
            </div>

          </div>

          {/* Column 2: Quick Links */}
          <nav
            aria-label="Footer Quick Links"
            className="min-w-0"
          >

            {/* Heading */}
            <div className={footerHeaderClass}>
              <h3 className={footerHeadingClass}>
                Quick Links
              </h3>
            </div>

            {/* Navigation Links */}
            <ul className="mt-3 space-y-1">
              {quickLinks.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="
                      group
                      flex
                      min-h-10
                      items-center
                      gap-2
                      rounded-md
                      text-sm
                      sm:text-base
                      text-[#faf8f3]/90
                      transition-colors
                      duration-200
                      hover:text-[#faf8f3]
                      focus-visible:outline
                      focus-visible:outline-2
                      focus-visible:outline-offset-2
                      focus-visible:outline-[#faf8f3]
                    "
                  >
                    <ChevronRight
                      size={16}
                      aria-hidden="true"
                      className="
                        shrink-0
                        transition-transform
                        duration-200
                        group-hover:translate-x-1
                      "
                    />

                    <span>{label}</span>
                  </Link>
                </li>
              ))}
            </ul>

          </nav>

          {/* Column 3: Contact Us */}
          <div className="min-w-0">

            {/* Heading */}
            <div className={footerHeaderClass}>
              <h3 className={footerHeadingClass}>
                Contact Us
              </h3>
            </div>

            {/* Contact Details */}
            <address className="mt-4 not-italic">
              <ul
                className="
                  space-y-4
                  text-sm
                  sm:text-base
                  text-[#faf8f3]/90
                "
              >

                {/* Office Address */}
                <li className="flex items-start gap-3">
                  <MapPin
                    size={19}
                    aria-hidden="true"
                    className="mt-1 shrink-0"
                  />

                  <span className="leading-6">
                    303, 3rd Floor, H-110,
                    <br />
                    Sector 63, Noida,
                    <br />
                    Uttar Pradesh-201301
                  </span>
                </li>

                {/* Email */}
                <li className="flex items-start gap-3">
                  <Mail
                    size={19}
                    aria-hidden="true"
                    className="mt-0.5 shrink-0"
                  />

                  <a
                    href="mailto:info@dholerainsider.com"
                    className="
                      min-w-0
                      break-words
                      leading-6
                      transition-colors
                      hover:text-[#faf8f3]
                      hover:underline
                    "
                  >
                    info@dholerainsider.com
                  </a>
                </li>

                {/* Phone */}
                <li className="flex items-start gap-3">
                  <Phone
                    size={19}
                    aria-hidden="true"
                    className="mt-0.5 shrink-0"
                  />

                  <a
                    href="tel:+919211820887"
                    className="
                      leading-6
                      transition-colors
                      hover:text-[#faf8f3]
                      hover:underline
                    "
                  >
                    +91 92 11 82 08 87
                  </a>
                </li>

              </ul>
            </address>

          </div>
        </div>

        {/* Copyright Section */}
        <div
          className="
            mt-8
            border-t
            border-[#faf8f3]/20
            pt-6
          "
        >
          <div
            className="
              flex
              flex-col
              items-center
              gap-4
              text-center
              lg:flex-row
              lg:justify-between
              lg:text-left
            "
          >

            {/* Copyright */}
            <p
              className="
                m-0
                text-sm
                leading-6
                text-[#faf8f3]/70
              "
            >
              Copyright &copy; {year} Dholera Insider.
              {" "}All Rights Reserved.
            </p>

            {/* Footer Policies */}
            <nav
              aria-label="Legal and Policy Links"
              className="
                flex
                flex-wrap
                items-center
                justify-center
                gap-x-4
                gap-y-2
                text-sm
              "
            >
              <Link
                href="/policies/privacy-policies"
                className="
                  text-[#faf8f3]/70
                  transition
                  hover:text-[#faf8f3]
                  hover:underline
                "
              >
                Privacy Policy
              </Link>

              <Link
                href="/policies/terms-and-conditions"
                className="
                  text-[#faf8f3]/70
                  transition
                  hover:text-[#faf8f3]
                  hover:underline
                "
              >
                Terms and Conditions
              </Link>

              <Link
                href="/contact"
                className="
                  text-[#faf8f3]/70
                  transition
                  hover:text-[#faf8f3]
                  hover:underline
                "
              >
                Contact
              </Link>
            </nav>

          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
