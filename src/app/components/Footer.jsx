import Link from "next/link";
import React from "react";
import {
  MapPin,
  Mail,
  Phone,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
} from "lucide-react";
import "../about-us/about.css";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#0b1d3a] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Google Maps Section */}
        {/* <div className="bg-[#faf8f3] shadow-2xl p-2 mb-12 rounded-lg">
          <div className="w-full h-full">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4221.747891952484!2d77.0385836!3d28.4197016!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4ee757eb04faba1b%3A0x653f6f2b14991ba!2sDholera%20Insider!5e1!3m2!1sen!2sin!4v1750661065842!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: "455px", borderRadius: "0.75rem" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div> */}

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Us Column */}
          <div>
            <h3 className="text-xl font-semibold text-[#faf8f3] mb-4 border-b border-[#faf8f3]/30 pb-2">
              About Us
            </h3>
            <p className="text-[#faf8f3] mb-4">
              Dholera Insider a trusted real estate developer in Dholera,
              offering premium residential plots with clear titles, transparent
              processes, and long-term investment potential.
            </p>

            {/* Newsletter Signup */}
            {/*             <div className="space-y-3 mt-6">
              <h4 className="text-lg font-semibold text-[#faf8f3]">
                Stay Updated
              </h4>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-3 py-2 bg-[#0b1d3a]/50 border border-[#faf8f3]/30 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-[#faf8f3] focus:border-[#faf8f3] text-[#faf8f3] placeholder-[#faf8f3]/70 text-sm"
                />
                <button className="px-4 py-2 bg-[#faf8f3] text-[#0b1d3a] hover:bg-[#faf8f3]/90 rounded-r-lg font-medium transition-all duration-300 text-sm">
                  Subscribe
                </button>
              </div>
            </div> */}

            {/* Social Media Icons */}
            <div className="flex space-x-4 mt-6">
              <Link
                href="https://www.facebook.com/profile.php?id=61578651603291"
                className="text-[#faf8f3]/70 hover:text-[#faf8f3] transition"
              >
                <Facebook size={20} />
              </Link>
              <Link
                href="https://x.com/Dholera_Insider"
                className="text-[#faf8f3]/70 hover:text-[#faf8f3] transition"
              >
                <Twitter size={20} />
              </Link>
              <Link
                href="https://www.instagram.com/dholerainsider/"
                className="text-[#faf8f3]/70 hover:text-[#faf8f3] transition"
              >
                <Instagram size={20} />
              </Link>
              <Link
                href="https://www.youtube.com/@DholeraInsider"
                className="text-[#faf8f3]/70 hover:text-[#faf8f3] transition"
              >
                <Youtube size={20} />
              </Link>
            </div>
          </div>

          {/* Quick Links Column */}
          <div>
            <h3 className="text-xl font-semibold text-[#faf8f3] mb-4 border-b border-[#faf8f3]/30 pb-2">
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/about-us"
                  className="text-[#faf8f3] hover:text-[#faf8f3] transition flex items-center"
                >
                  <span className="mr-2">›</span> About Us
                </Link>
              </li>

              <li>
                <Link
                  href="/about-dholera-sir"
                  className="text-[#faf8f3] hover:text-[#faf8f3] transition flex items-center"
                >
                  <span className="mr-2">›</span> About Dholera
                </Link>
              </li>
              <li>
                <Link
                  href="/dholera-sir-updates"
                  className="text-[#faf8f3] hover:text-[#faf8f3] transition flex items-center"
                >
                  <span className="mr-2">›</span> Dholera Updates
                </Link>
              </li>
              <li>
                <Link
                  href="/dholera-sir-blogs"
                  className="text-[#faf8f3] hover:text-[#faf8f3] transition flex items-center"
                >
                  <span className="mr-2">›</span> Dholera Blogs
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-[#faf8f3] hover:text-[#faf8f3] transition flex items-center"
                >
                  <span className="mr-2">›</span> Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Policies Column */}
          <div>
            <h3 className="text-xl font-semibold text-[#faf8f3] mb-4 border-b border-[#faf8f3]/30 pb-2">
              Our Projects
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/residential-projects-in-dholera/westwyn-estate"
                  className="text-[#faf8f3] hover:text-[#faf8f3] transition flex items-center"
                >
                  <span className="mr-2">›</span>WestWyn Estates
                </Link>
              </li>
              <li>
                <Link
                  href="/residential-projects-in-dholera/westwyn-residency"
                  className="text-[#faf8f3] hover:text-[#faf8f3] transition flex items-center"
                >
                  <span className="mr-2">›</span>WestWyn Residency
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h3 className="text-xl font-semibold text-[#faf8f3] mb-4 border-b border-[#faf8f3]/30 pb-2">
              Contact Us
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <div className="flex-shrink-0 text-[#faf8f3] mr-3 mt-1">
                  <MapPin size={18} />
                </div>
                <span className="text-[#faf8f3]">
                  3rd Floor, H-110, Sector 63 Road, H Block, Sector 63, Noida,
                  Uttar Pradesh 201301
                </span>
              </li>
              <li className="flex items-center">
                <div className="flex-shrink-0 text-[#faf8f3] mr-3">
                  <Mail size={18} />
                </div>
                <Link
                  href="mailto:info@dholerainsider.com"
                  className="text-[#faf8f3] hover:text-[#faf8f3] transition"
                >
                  info@dholerainsider.com
                </Link>
              </li>
              <li className="flex items-center">
                <div className="flex-shrink-0 text-[#faf8f3] mr-3">
                  <Phone size={18} />
                </div>
                <Link
                  href="tel:+919211820887"
                  className="text-[#faf8f3] hover:text-[#faf8f3] transition"
                >
                  +91 9211820887
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright Bar */}
        <div className="mt-12 pt-6 border-t border-[#faf8f3]/20">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-[#faf8f3]/70 text-sm mb-4 md:mb-0">
              Copyright &copy; {year} Dholera Insider. All Rights Reserved.
            </p>
            <div className="flex space-x-4 text-sm">
              <Link
                href="/policies/privacy"
                className="text-[#faf8f3]/70 hover:text-[#faf8f3] transition"
              >
                Privacy Policy
              </Link>
              <span className="text-[#faf8f3]/70">|</span>
              <Link
                href="/policies/terms-and-conditions"
                className="text-[#faf8f3]/70 hover:text-[#faf8f3] transition"
              >
                Terms and Conditions
              </Link>
              <span className="text-[#faf8f3]/70">|</span>
              <Link
                href="/contact"
                className="text-[#faf8f3]/70 hover:text-[#faf8f3] transition"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
