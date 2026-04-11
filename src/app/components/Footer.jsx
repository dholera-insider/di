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
import "../about-us/about.css"

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-gray-900 to-teal-900 animate-gradient-x py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Google Maps Section */}
        {/* <div className="bg-white shadow-2xl p-2 mb-12 rounded-lg">
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
            <h3 className="text-xl font-semibold text-blue-400 mb-4 border-b border-blue-200 pb-2">
              About Us
            </h3>
            <p className="text-white mb-4">
              Your trusted source for insights, updates, and opportunities in
              India's first planned smart city - Dholera.
            </p>

            {/* Newsletter Signup */}
{/*             <div className="space-y-3 mt-6">
              <h4 className="text-lg font-semibold text-slate-200">
                Stay Updated
              </h4>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-slate-400 text-sm"
                />
                <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-emerald-500 hover:from-blue-600 hover:to-emerald-600 rounded-r-lg font-medium transition-all duration-300 text-sm">
                  Subscribe
                </button>
              </div>
            </div> */}

            {/* Social Media Icons */}
            <div className="flex space-x-4 mt-6">
              <Link
                href="https://www.facebook.com/profile.php?id=61578651603291"
                className="text-gray-500 hover:text-blue-400 transition"
              >
                <Facebook size={20} />
              </Link>
              <Link
                href="https://x.com/Dholera_Insider"
                className="text-gray-500 hover:text-blue-400 transition"
              >
                <Twitter size={20} />
              </Link>
              <Link
                href="https://www.instagram.com/dholerainsider/"
                className="text-gray-500 hover:text-pink-400 transition"
              >
                <Instagram size={20} />
              </Link>
              <Link
                href="https://www.youtube.com/@DholeraInsider"
                className="text-gray-500 hover:text-red-400 transition"
              >
                <Youtube size={20} />
              </Link>
            </div>
          </div>

          {/* Quick Links Column */}
          <div>
            <h3 className="text-xl font-semibold text-blue-400 mb-4 border-b border-blue-200 pb-2">
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/about-us"
                  className="text-white hover:text-blue-400 transition flex items-center"
                >
                  <span className="mr-2">›</span> About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/residential-projects-in-dholera/westwyn-estate"
                  className="text-white hover:text-blue-400 transition flex items-center"
                >
                  <span className="mr-2">›</span>Residential Projects
                </Link>
              </li>
              <li>
                <Link
                  href="/about-dholera-sir"
                  className="text-white hover:text-blue-400 transition flex items-center"
                >
                  <span className="mr-2">›</span> About Dholera
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-white hover:text-blue-400 transition flex items-center"
                >
                  <span className="mr-2">›</span> Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="/sitemap.xml"
                  className="text-white hover:text-blue-400 transition flex items-center"
                >
                  <span className="mr-2">›</span> Sitemap
                </Link>
              </li>
            </ul>
          </div>

          {/* Policies Column */}
          <div>
            <h3 className="text-xl font-semibold text-blue-400 mb-4 border-b border-blue-200 pb-2">
              Policies
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/policies/privacy-policies"
                  className="text-white hover:text-blue-400 transition flex items-center"
                >
                  <span className="mr-2">›</span> Privacy Policy
                </Link>
              </li>
              <li>
                <Link                       
                  href="/policies/terms-and-conditions"
                  className="text-white hover:text-blue-400 transition flex items-center"
                >
                  <span className="mr-2">›</span> Terms & Conditions      
                </Link>
              </li>
              <li>
                <Link
                  href="/policies/refund-and-cancellation"
                  className="text-white hover:text-blue-400 transition flex items-center"
                >
                  <span className="mr-2">›</span> Refund & Cancellation
                </Link>
              </li>
              <li>
                <Link
                  href="/policies/copyright-policy"
                  className="text-white hover:text-blue-400 transition flex items-center"
                >
                  <span className="mr-2">›</span> Copyright Policy
                </Link>
              </li>
              {/* <li>
                <Link
                  href="/policies/buy-back-policy"
                  className="text-white hover:text-blue-400 transition flex items-center"
                >
                  <span className="mr-2">›</span> Buy Back Policy
                </Link>
              </li> */}
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h3 className="text-xl font-semibold text-blue-400 mb-4 border-b border-blue-200 pb-2">
              Contact Us
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <div className="flex-shrink-0 text-blue-400 mr-3 mt-1">
                  <MapPin size={18} />
                </div>
                <span className="text-white">
                  620 JMD Megapolis, Sector-48, Sohna Road, Gurugram, India
                </span>
              </li>
              <li className="flex items-center">
                <div className="flex-shrink-0 text-emerald-400 mr-3">
                  <Mail size={18} />
                </div>
                <Link
                  href="mailto:info@dholerainsider.com"
                  className="text-white hover:text-blue-400 transition"
                >
                  info@dholerainsider.com
                </Link>
              </li>
              <li className="flex items-center">
                <div className="flex-shrink-0 text-purple-400 mr-3">
                  <Phone size={18} />
                </div>
                <Link
                  href="tel:+919211820887"
                  className="text-white hover:text-blue-400 transition"
                >
                  +91 9211820887
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright Bar */}
        <div className="mt-12 pt-6 border-t border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              Copyright &copy; {year} Dholera Insider. All Rights Reserved.
            </p>
            <div className="flex space-x-4 text-sm">
              <Link
                href="/policies/privacy"
                className="text-gray-400 hover:text-blue-400 transition"
              >
                Privacy Policy
              </Link>
              <span className="text-gray-400">|</span>
              <Link
                href="/policies/terms-and-conditions"
                className="text-gray-400 hover:text-blue-400 transition"
              >
                Terms and Conditions
              </Link>
              <span className="text-gray-400">|</span>
              <Link
                href="/contact"
                className="text-gray-400 hover:text-blue-400 transition"
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
