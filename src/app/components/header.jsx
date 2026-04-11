"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import logo from "@/app/assets/icons/logo.webp";
import { AiOutlineMenu, AiOutlineClose, AiOutlineDown } from "react-icons/ai";
import { getPosts, getSub, projectInfo } from "@/sanity/lib/api";
import { AnimatePresence, motion } from "framer-motion";
import ContactForm from "@/app/components/Contactform";
import { MenuIcon } from "lucide-react";

const Header = () => {
  const [header, setHeader] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileActiveDropdown, setMobileActiveDropdown] = useState(null);
  const [projects, setProjects] = useState([]);
  const [insideDholeraProjects, setInsideDholeraProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);

  const openContactForm = () => {
    setIsContactFormOpen(true);
    setMobileMenuOpen(false);
  };

  const closeContactForm = () => {
    setIsContactFormOpen(false);
  };

  // Status badge component
  const StatusBadge = ({ status }) => {
    if (!status || status === "available") return null;

    return (
      <span
        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ml-2 ${
          status === "sold-out"
            ? "bg-red-500/20 text-red-300 border border-red-500/30"
            : "bg-green-500/20 text-green-300 border border-green-500/30"
        }`}
      >
        {status === "sold-out" ? "Sold Out" : status}
      </span>
    );
  };

  // Main navigation items (visible on desktop)
  const mainNavItems = [
    {
      name: "Our Residential Projects",
      key: "dholeraResidential",
      items: [
        {
          name: "WestWyn Residency",
          href: "/residential-projects-in-dholera/westwyn-residency",
          status: "available",
        },
        {
          name: "WestWyn Estates",
          href: "/residential-projects-in-dholera/westwyn-estate",
          status: "available",
        },
        {
          name: "WestWyn County",
          href: "/residential-projects-in-dholera/westwyn-county",
          status: "sold-out",
        },
        {
          name: "Paradise",
          href: "/residential-projects-in-dholera/paradise",
          status: "sold-out",
        },
        {
          name: "Paradise 2",
          href: "/residential-projects-in-dholera/paradise-2",
          status: "sold-out",
        },
        {
          name: "Orchid",
          href: "/residential-projects-in-dholera/orchid",
          status: "sold-out",
        },
        {
          name: "Marina bay",
          href: "/residential-projects-in-dholera/marina-bay",
          status: "sold-out",
        },
        {
          name: "Maple",
          href: "/residential-projects-in-dholera/maple",
          status: "sold-out",
        },
        {
          name: "Pride",
          href: "/residential-projects-in-dholera/pride",
          status: "sold-out",
        },
      ],
    },
    {
      name: "Inside Dholera",
      key: "insideDholera",
      items: [
        { name: "Dholera Blogs", href: "/dholera-sir-blogs" },
        /* { name: "Dholera Updates", href: "/dholera-sir-updates" }, */
        { name: "About Dholera SIR", href: "/about-dholera-sir" },
        { name: "Dholera Updates", href: "/dholera-sir-updates" },
      ],
    },
    { name: "Contact Us", href: "/contact" },
  ];

  // Hamburger menu items
  const hamburgerMenuItems = [
    { name: "About", href: "/about-us" },
    { name: "Gallery", href: "/gallery" },
    {
      name: "Get In Touch",
      key: "getInTouch",
      items: [
        { name: "Call Now", href: "tel:+919211820887" },
        { name: "WhatsApp Us", href: "https://wa.me/919211820887" },
        {
          name: "Book A Free Site Visit",
          onClick: openContactForm,
        },
      ],
    },
  ];

  // Handlers
  const handleHeader = () => setHeader(!header);
  const handleMobileHeader = () => {
    setHeader(false);
    setActiveDropdown(null);
    setMobileActiveDropdown(null);
  };

  const toggleDropdown = (dropdownName, e) => {
    e?.preventDefault();
    e?.stopPropagation();
    setActiveDropdown(activeDropdown === dropdownName ? null : dropdownName);
  };

  const toggleMobileDropdown = (dropdownName, e) => {
    e?.preventDefault();
    e?.stopPropagation();
    setMobileActiveDropdown(
      mobileActiveDropdown === dropdownName ? null : dropdownName,
    );
  };

  // Data fetching
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projectsData, subProjectsData, insideDholeraData] =
          await Promise.all([projectInfo(), getSub(), getPosts()]);

        const processProjects = (data) => {
          const available = data.filter(
            (project) =>
              !project.categories?.some((cat) => cat.title === "Sold Out"),
          );
          const soldOut = data.filter((project) =>
            project.categories?.some((cat) => cat.title === "Sold Out"),
          );
          return [...available, ...soldOut];
        };

        setProjects(processProjects([...projectsData, ...subProjectsData]));
        setInsideDholeraProjects(processProjects(insideDholeraData));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY >= 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Click outside handler
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        !e.target.closest(".dropdown-container") &&
        !e.target.closest(".dropdown-trigger")
      ) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen || isContactFormOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [mobileMenuOpen, isContactFormOpen]);

  // Loading state
  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed top-0 left-0 w-full h-20 backdrop-blur-lg bg-gradient-to-r from-slate-900/95 via-emerald-900/95 to-teal-900/95 border-b border-white/10 flex justify-between items-center z-50"
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="relative h-14 w-14 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full animate-pulse shadow-lg"></div>
          <div className="hidden sm:flex space-x-6">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-6 w-16 bg-white/20 rounded animate-pulse"
              ></div>
            ))}
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <>
      {/* Main Header */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ease-out
          ${
            scrolled
              ? "h-20 backdrop-blur-xl bg-gradient-to-r from-slate-900/98 via-emerald-900/98 to-teal-900/98 border-b border-white/20 shadow-2xl"
              : "h-20 max-sm:h-20 backdrop-blur-md bg-gradient-to-r from-slate-900/90 via-emerald-900/90 to-teal-900/90"
          }`}
      >
        {/* Glassmorphism overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-emerald-900/90 to-teal-900/90"></div>

        <div className="container mx-auto px-6 h-full flex justify-between items-center relative">
          {/* Enhanced Logo */}
          <Link href="/" className="group">
            <motion.div
              whileHover={{ scale: 1.05, rotate: 2 }}
              whileTap={{ scale: 0.95 }}
              className={`relative transition-all duration-300 ${
                scrolled
                  ? "h-24 max-sm:h-24 w-24"
                  : "h-24 max-sm:h-24 w-24 max-sm:w-24"
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-orange-400/20 to-teal-400/20 rounded-full blur-lg group-hover:blur-xl transition-all duration-300"></div>
              <Image
                src={logo}
                alt="Dholera Insider Logo"
                width={100}
                height={100}
                className="object-contain relative z-10 drop-shadow-2xl max-sm:pt-4 max-sm:h-20 max-sm:w-20"
                priority={true}
                quality={85}
                placeholder="blur"
                fetchPriority="high" 
              />
            </motion.div>
          </Link>

          {/* Enhanced Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-2">
            {mainNavItems.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.5 }}
                className="relative dropdown-container"
              >
                {item.items ? (
                  <>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="dropdown-trigger group flex items-center px-5 py-3 text-white font-semibold tracking-wide transition-all duration-300 relative"
                      onClick={(e) => toggleDropdown(item.key, e)}
                    >
                      <span className="relative z-10 drop-shadow-lg">
                        {item.name}
                      </span>
                      <motion.div
                        animate={{
                          rotate: activeDropdown === item.key ? 180 : 0,
                        }}
                        transition={{ duration: 0.3 }}
                        className="ml-2 relative z-10"
                      >
                        <AiOutlineDown className="drop-shadow-lg" />
                      </motion.div>
                      <div className="absolute inset-0 bg-gradient-to-r from-orange-500/0 via-orange-500/20 to-teal-500/0 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                    </motion.button>

                    <AnimatePresence>
                      {activeDropdown === item.key && (
                        <motion.div
                          initial={{ opacity: 0, y: -10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -10, scale: 0.95 }}
                          transition={{ duration: 0.2, ease: "easeOut" }}
                          className="absolute top-full left-0 mt-4 w-72 backdrop-blur-xl bg-slate-900/95 border border-white/20 rounded-2xl shadow-2xl py-4 z-50 dropdown-container"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <div className="absolute -top-2 left-8 w-4 h-4 bg-slate-900/95 border-l border-t border-white/20 rotate-45"></div>

                          {item.items.map((subItem, subIndex) => (
                            <motion.div
                              key={subItem.name}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{
                                delay: 0.05 * subIndex,
                                duration: 0.3,
                              }}
                              className="border-b border-white/10 last:border-0"
                            >
                              <Link
                                href={subItem.href}
                                className="flex items-center justify-between px-6 py-3 hover:bg-gradient-to-r hover:from-orange-500/20 hover:to-teal-500/20 text-sm text-white transition-all duration-200 group"
                                onClick={() => setActiveDropdown(null)}
                              >
                                <span>{subItem.name}</span>
                                <StatusBadge status={subItem.status} />
                              </Link>
                            </motion.div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className="group relative px-5 py-3 text-white font-semibold tracking-wide transition-all duration-300"
                  >
                    <span className="relative z-10 drop-shadow-lg">
                      {item.name}
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-500/0 via-orange-500/20 to-teal-500/0 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                    <div className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-orange-400 to-teal-400 transition-all duration-300 group-hover:w-full group-hover:left-0"></div>
                  </Link>
                )}
              </motion.div>
            ))}

            {/* Enhanced Menu Dropdown */}
            <div
              className="relative dropdown-container"
              onMouseEnter={() => setActiveDropdown("hamburgerMenu")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="dropdown-trigger group flex items-center px-5 py-3 text-white font-semibold tracking-wide transition-all duration-300 relative"
                onHoverStart={(e) => toggleDropdown("hamburgerMenu", e)}
              >
                <span className="relative z-10 drop-shadow-lg">
                  <MenuIcon />
                </span>

                <div className="absolute inset-0 bg-gradient-to-r from-orange-500/0 via-orange-500/20 to-teal-500/0 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
              </motion.button>

              <AnimatePresence>
                {activeDropdown === "hamburgerMenu" && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="absolute top-full right-0 mt-4 w-72 backdrop-blur-xl bg-slate-900/95 border border-white/20 rounded-2xl shadow-2xl py-4 z-50 max-h-96 overflow-y-auto dropdown-container"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="absolute -top-2 right-8 w-4 h-4 bg-slate-900/95 border-l border-t border-white/20 rotate-45"></div>

                    {hamburgerMenuItems.map((item, index) => {
                      if (item.items) {
                        return (
                          <motion.div
                            key={item.key}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 * index, duration: 0.3 }}
                            className="border-b border-white/10 last:border-0"
                          >
                            <div className="px-6 py-3 font-semibold text-white bg-gradient-to-r from-orange-500/10 to-transparent">
                              {item.name}
                            </div>
                            <div className="pl-6 pb-2">
                              {item.items.map((subItem) => {
                                if (subItem.onClick) {
                                  return (
                                    <button
                                      key={subItem.name}
                                      onClick={() => {
                                        subItem.onClick();
                                        setActiveDropdown(null);
                                      }}
                                      className="block w-full text-left px-4 py-2 hover:bg-gradient-to-r hover:from-orange-500/20 hover:to-teal-500/20 text-sm text-white transition-all duration-200 rounded-lg mx-2"
                                    >
                                      {subItem.name}
                                    </button>
                                  );
                                }
                                return (
                                  <Link
                                    key={subItem.name}
                                    href={subItem.href}
                                    className="block px-4 py-2 hover:bg-gradient-to-r hover:from-orange-500/20 hover:to-teal-500/20 text-sm text-white transition-all duration-200 rounded-lg mx-2"
                                    onClick={() => setActiveDropdown(null)}
                                  >
                                    {subItem.name}
                                  </Link>
                                );
                              })}
                            </div>
                          </motion.div>
                        );
                      }
                      return (
                        <motion.div
                          key={item.name}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 * index, duration: 0.3 }}
                        >
                          <Link
                            href={item.href}
                            className="block px-6 py-3 hover:bg-gradient-to-r hover:from-orange-500/20 hover:to-teal-500/20 text-sm text-white transition-all duration-200"
                            onClick={() => setActiveDropdown(null)}
                          >
                            {item.name}
                          </Link>
                        </motion.div>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </nav>

          {/* Enhanced Mobile Menu Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="lg:hidden relative z-[101] p-3 rounded-xl backdrop-blur-sm bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-all duration-300"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            <motion.div
              animate={{ rotate: mobileMenuOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {mobileMenuOpen ? (
                <AiOutlineClose className="text-2xl" />
              ) : (
                <AiOutlineMenu className="text-2xl" />
              )}
            </motion.div>
          </motion.button>
        </div>
      </motion.div>

      {/* Enhanced Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="fixed inset-0 bg-slate-900/95 backdrop-blur-2xl z-50 overflow-y-auto"
          >
            {/* Mobile Menu Header */}
            <div className="fixed top-0 left-0 right-0 h-20 bg-gradient-to-r from-slate-900/95 via-emerald-900/95 to-teal-900/95 border-b border-white/10 flex items-center justify-between px-6 z-[102]">
              <Link href="/" onClick={() => setMobileMenuOpen(false)}>
                <div className="relative h-14 w-14">
                  <Image
                    src={logo}
                    alt="Logo"
                    className="object-contain"
                    fill
                  />
                </div>
              </Link>

              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-3 rounded-xl backdrop-blur-sm bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-all duration-300"
              >
                <AiOutlineClose className="text-2xl" />
              </button>
            </div>

            {/* Mobile Menu Content */}
            <div className="pt-20 px-6 py-8 space-y-2 ">
              <div className="absolute inset-0">
                <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-teal-500/10 rounded-full blur-2xl animate-pulse"></div>
              </div>

              <div className="relative space-y-2">
                {mainNavItems.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index, duration: 0.4 }}
                  >
                    {item.items ? (
                      <div className=" rounded-xl overflow-hidden  border border-white/20 ">
                        <button
                          className="w-full flex justify-between items-center py-4 px-6 font-bold text-white hover:text-orange-400 hover:bg-white/5 transition-all duration-300"
                          onClick={() =>
                            setMobileActiveDropdown(
                              mobileActiveDropdown === item.key
                                ? null
                                : item.key,
                            )
                          }
                        >
                          <span>{item.name}</span>
                          <motion.div
                            animate={{
                              rotate:
                                mobileActiveDropdown === item.key ? 180 : 0,
                            }}
                            transition={{ duration: 0.3 }}
                          >
                            <AiOutlineDown />
                          </motion.div>
                        </button>

                        <AnimatePresence>
                          {mobileActiveDropdown === item.key && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="bg-white/5 border-t border-white/10"
                            >
                              <ul className="py-2">
                                {item.items.map((subItem) => (
                                  <li key={subItem.name}>
                                    <Link
                                      href={subItem.href}
                                      onClick={() => setMobileMenuOpen(false)}
                                      className="flex items-center justify-between py-3 px-8 text-gray-200 hover:bg-gradient-to-r hover:from-orange-500/20 hover:to-teal-500/20 hover:bg-white/5 transition-all duration-200"
                                    >
                                      <span>{subItem.name}</span>
                                      <StatusBadge status={subItem.status} />
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <Link
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="block py-4 px-6 text-xl font-bold text-white hover:text-orange-400 transition-all duration-300 hover:bg-white/5 rounded-xl border-l-4 border-transparent hover:border-orange-400"
                      >
                        {item.name}
                      </Link>
                    )}
                  </motion.div>
                ))}

                <motion.div
                  initial={{ opacity: 0, scaleX: 0 }}
                  animate={{ opacity: 1, scaleX: 1 }}
                  transition={{ delay: 0.4, duration: 0.4 }}
                  className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent my-6"
                ></motion.div>

                {hamburgerMenuItems.map((item, index) => {
                  if (item.items) {
                    return (
                      <motion.div
                        key={item.key}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + 0.1 * index, duration: 0.4 }}
                        className="border border-white/10 rounded-xl overflow-hidden bg-white/5"
                      >
                        <button
                          className="w-full flex justify-between items-center py-4 px-6 font-bold text-white hover:text-orange-400 hover:bg-white/5 transition-all duration-300"
                          onClick={() =>
                            setMobileActiveDropdown(
                              mobileActiveDropdown === item.key
                                ? null
                                : item.key,
                            )
                          }
                        >
                          <span>{item.name}</span>
                          <motion.div
                            animate={{
                              rotate:
                                mobileActiveDropdown === item.key ? 180 : 0,
                            }}
                            transition={{ duration: 0.3 }}
                          >
                            <AiOutlineDown />
                          </motion.div>
                        </button>

                        <AnimatePresence>
                          {mobileActiveDropdown === item.key && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="bg-white/5 border-t border-white/10"
                            >
                              <ul className="py-2">
                                {item.items.map((subItem) => {
                                  if (subItem.onClick) {
                                    return (
                                      <li key={subItem.name}>
                                        <button
                                          onClick={() => {
                                            subItem.onClick();
                                            setMobileActiveDropdown(null);
                                          }}
                                          className="block w-full text-left py-3 px-8 text-gray-200 hover:text-orange-400 hover:bg-white/5 transition-all duration-200"
                                        >
                                          {subItem.name}
                                        </button>
                                      </li>
                                    );
                                  }
                                  return (
                                    <li key={subItem.name}>
                                      <Link
                                        href={subItem.href}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="block py-3 px-8 text-gray-200 hover:text-orange-400 hover:bg-white/5 transition-all duration-200"
                                      >
                                        {subItem.name}
                                      </Link>
                                    </li>
                                  );
                                })}
                              </ul>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    );
                  }
                  return (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + 0.1 * index, duration: 0.4 }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="block py-4 px-6 font-semibold text-white hover:text-orange-400 transition-all duration-300 hover:bg-white/5 rounded-xl border-l-4 border-transparent hover:border-teal-400"
                      >
                        {item.name}
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Contact Form Modal */}
      <AnimatePresence>
        {isContactFormOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm z-[1000]"
          >
            <ContactForm onClose={closeContactForm} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
