"use client";

import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import React, { useState, useEffect, useLayoutEffect, useRef } from "react";
import logo from "@/app/assets/icons/NewLogo.webp";
import { AiOutlineMenu, AiOutlineClose, AiOutlineDown } from "react-icons/ai";
import { AnimatePresence, LazyMotion, domAnimation, m } from "framer-motion";
import { MenuIcon } from "lucide-react";

const MotionLink = m.create(Link);

const ContactForm = dynamic(() => import("./Contactform"), {
  ssr: false,
});

const Header = () => {
  const pathname = usePathname();
  const isInvestorPage = pathname === "/investor" || pathname?.startsWith("/investor/");
  const isBlogPage =
    pathname === "/dholera-sir-blogs" || pathname?.startsWith("/dholera-sir-blogs/");
  const prefetchLinks = isInvestorPage || isBlogPage ? false : null;
  const [header, setHeader] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileActiveDropdown, setMobileActiveDropdown] = useState(null);
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);
  const mobileMenuRef = useRef(null);

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
            ? "bg-[#faf8f3] text-[#0b1d3a] border border-[#faf8f3]"
            : "bg-[#0b1d3a] text-[#faf8f3] border border-[#faf8f3]"
        }`}
      >
        {status === "sold-out" ? "Sold Out" : status}
      </span>
    );
  };

  // Main navigation items (visible on desktop)
  const mainNavItems = [
    /* { name: "NRI Investor", href: "/nri-investor" }, */
    { name: "Home", href: "/" },
    {
      name: "NRI Investors",
      key: "investor",
      items: [
        { name: "Bahrain", href: "/investor/bahrain" },
        { name: "Dubai", href: "/investor/dubai" },
        { name: "Oman", href: "/investor/oman" },
        { name: "Kuwait", href: "/investor/kuwait" },
        { name: "Singapore", href: "/investor/singapore" },
        { name: "Qatar", href: "/investor/qatar" },
        { name: "Hong Kong", href: "/investor/hong-kong" }, 
        { name: "Saudi Arabia", href: "/investor/saudi-arabia" },
      ],
    },
    { name: "Dholera Blogs", href: "/dholera-sir-blogs" },
    { name: "About Dholera", href: "/about-dholera-sir" },
    { name: "Dholera Updates", href: "/dholera-sir-updates" },

  ];

  // Hamburger menu items
  const hamburgerMenuItems = [
    { name: "Contact Us", href: "/contact" },

    { name: "About", href: "/about-us" },
    { name: "Gallery", href: "/gallery" },

  ];

  const isLinkActive = (href) => {
    if (!href) return false;
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const isNavItemActive = (item) => {
    if (item.items) {
      return item.items.some((subItem) => isLinkActive(subItem.href));
    }
    return isLinkActive(item.href);
  };

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

  // Reset article routes before paint so navigation opens at the page header.
  useLayoutEffect(() => {
    const isArticlePage = ["/dholera-sir-blogs", "/dholera-sir-updates"].some(
      (path) => pathname === path || pathname.startsWith(`${path}/`),
    );

    if (isArticlePage && !window.location.hash) {
      // Skip the global smooth scrolling so the destination starts at the top.
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }
  }, [pathname]);

  // Close open navigation UI whenever the App Router changes pages.
  useEffect(() => {
    setActiveDropdown(null);
    setMobileActiveDropdown(null);
    setMobileMenuOpen(false);
  }, [pathname]);

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY >= 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
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
    if (!mobileMenuOpen && !isContactFormOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [mobileMenuOpen, isContactFormOpen]);

  useEffect(() => {
    if (!mobileMenuOpen) {
      setMobileActiveDropdown(null);
      return;
    }

    const previousFocus = document.activeElement;
    const menu = mobileMenuRef.current;
    menu?.querySelector("button")?.focus({ preventScroll: true });

    const handleMenuKeyDown = (event) => {
      if (event.key === "Escape") setMobileMenuOpen(false);
      if (event.key !== "Tab") return;

      const focusable = [...(menu?.querySelectorAll('a[href], button:not(:disabled)') || [])]
        .filter((element) => element.getClientRects().length > 0);
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };

    const desktop = window.matchMedia("(min-width: 1024px)");
    const closeOnDesktop = () => {
      if (desktop.matches) setMobileMenuOpen(false);
    };
    closeOnDesktop();
    desktop.addEventListener("change", closeOnDesktop);
    document.addEventListener("keydown", handleMenuKeyDown);

    return () => {
      desktop.removeEventListener("change", closeOnDesktop);
      document.removeEventListener("keydown", handleMenuKeyDown);
      if (previousFocus?.isConnected) previousFocus.focus({ preventScroll: true });
    };
  }, [mobileMenuOpen]);

  return (
    <LazyMotion features={domAnimation}>
      {/* Main Header */}
      <m.div
        initial={false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ease-out
          ${
            scrolled
              ? "h-20 backdrop-blur-xl bg-[#0b1d3a] border-b border-[#faf8f3]/20 shadow-2xl"
              : "h-20 max-sm:h-20 backdrop-blur-md bg-[#0b1d3a]"
          }`}
      >
        {/* Glassmorphism overlay */}
        <div className="absolute inset-0 bg-[#0b1d3a]"></div>

        <div className="w-full max-w-7xl mx-auto h-full flex justify-between items-center relative site-gutter">
          {/* Enhanced Logo */}
          <MotionLink
            prefetch={prefetchLinks}
            href="/"
            className="group shrink-0"
            whileHover={{ scale: 1.05, rotate: 2 }}
            whileTap={{ scale: 0.95 }}
          >
            <div
              className="relative h-16 w-20 transition-all duration-300 lg:h-24 lg:w-24"
            >
              <div className="absolute inset-0  blur-lg group-hover:blur-xl transition-all duration-300"></div>
              <Image
                src={logo}
                alt="Dholera Insider Logo"
                width={100}
                height={100}
                className="relative z-10 h-full w-full object-contain drop-shadow-2xl lg:h-[100px] lg:w-[100px]"
                priority={!isInvestorPage}
                loading="eager"
                quality={85}
                placeholder="blur"
                fetchPriority={isInvestorPage ? "auto" : "high"}
              />


            </div>
          </MotionLink>

          {/* Enhanced Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-2">
            {mainNavItems.map((item, index) => (
              <m.div
                key={item.name}
                initial={false}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.5 }}
                className="relative dropdown-container"
              >
                {item.items ? (
                  <>
                    <m.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`dropdown-trigger group flex items-center px-5 py-3 font-semibold tracking-wide transition-all duration-300 relative ${
                        isNavItemActive(item)
                          ? "text-[#F6C343]"
                          : "text-[#faf8f3]"
                      }`}
                      onClick={(e) => toggleDropdown(item.key, e)}
                      aria-expanded={activeDropdown === item.key}
                      aria-haspopup="menu"
                    >
                      <span className="relative z-10 drop-shadow-lg">
                        {item.name}
                      </span>
                      <AiOutlineDown
                        className={`relative z-10 ml-2 text-sm transition-transform duration-300 ${
                          activeDropdown === item.key ? "rotate-180" : ""
                        }`}
                        aria-hidden="true"
                      />

                      <span
                        aria-hidden="true"
                        className={`absolute inset-0 rounded-lg transition-all duration-300 ${
                          isNavItemActive(item)
                            ? "bg-[#faf8f3]/10 opacity-100"
                            : "bg-[#faf8f3]/10 opacity-0 group-hover:opacity-100"
                        }`}
                      ></span>
                      <span
                        aria-hidden="true"
                        className={`absolute bottom-0 h-0.5 bg-[#F6C343] transition-all duration-300 ${
                          isNavItemActive(item)
                            ? "left-0 w-full"
                            : "left-1/2 w-0 group-hover:left-0 group-hover:w-full"
                        }`}
                      ></span>
                    </m.button>

                    <AnimatePresence>
                      {activeDropdown === item.key && (
                        <m.div
                          initial={{ opacity: 0, y: -10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -10, scale: 0.95 }}
                          transition={{ duration: 0.2, ease: "easeOut" }}
                          className="absolute top-full left-0 mt-4 w-72 backdrop-blur-xl bg-[#0b1d3a] border border-[#faf8f3]/20 rounded-2xl shadow-2xl py-4 z-50 dropdown-container"
                          onClick={(e) => e.stopPropagation()}
                          role="menu"
                        >
                          <div className="absolute -top-2 left-8 w-4 h-4 bg-[#0b1d3a] border-l border-t border-[#faf8f3]/20 rotate-45"></div>

                          {item.items.map((subItem, subIndex) => (
                            <m.div
                              key={subItem.name}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{
                                delay: 0.05 * subIndex,
                                duration: 0.3,
                              }}
                              className="border-b border-[#faf8f3]/10 last:border-0"
                            >
                              <Link prefetch={prefetchLinks}
                                href={subItem.href}
                                className={`flex items-center justify-between px-6 py-3 text-sm transition-all duration-200 group ${
                                  isLinkActive(subItem.href)
                                    ? "bg-[#faf8f3]/10 text-[#F6C343]"
                                    : "text-[#faf8f3] hover:bg-[#faf8f3]/10"
                                }`}
                                onClick={() => setActiveDropdown(null)}
                                role="menuitem"
                              >
                                <span>{subItem.name}</span>
                                <StatusBadge status={subItem.status} />

                              </Link>
                            </m.div>
                          ))}
                        </m.div>
                      )}
                    </AnimatePresence>
                  </>
                ) : (
                  <Link prefetch={prefetchLinks}
                    href={item.href}
                    className={`group relative px-5 py-3 font-semibold tracking-wide transition-all duration-300 ${
                      isNavItemActive(item) ? "text-[#F6C343]" : "text-[#faf8f3]"
                    }`}
                  >
                    <span className="relative z-10 drop-shadow-lg">
                      {item.name}
                    </span>
                    <div
                      className={`absolute inset-0 rounded-lg transition-all duration-300 ${
                        isNavItemActive(item)
                          ? "bg-[#faf8f3]/10 opacity-100"
                          : "bg-[#faf8f3]/10 opacity-0 group-hover:opacity-100"
                      }`}
                    ></div>
                    <div
                      className={`absolute bottom-0 h-0.5 bg-[#F6C343] transition-all duration-300 ${
                        isNavItemActive(item)
                          ? "left-0 w-full"
                          : "left-1/2 w-0 group-hover:w-full group-hover:left-0"
                      }`}
                    ></div>
                  </Link>
                )}
              </m.div>
            ))}

            {/* Enhanced Menu Dropdown */}
            <div
              className="relative dropdown-container"
              onMouseEnter={() => setActiveDropdown("hamburgerMenu")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <m.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="dropdown-trigger group flex items-center px-5 py-3 text-[#faf8f3] font-semibold tracking-wide transition-all duration-300 relative"
                onHoverStart={(e) => toggleDropdown("hamburgerMenu", e)}
                aria-label="More navigation"
              >
                <span className="relative z-10 drop-shadow-lg">
                  <MenuIcon />
                </span>

                <span aria-hidden="true" className="absolute inset-0 bg-[#faf8f3]/10 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300"></span>
              </m.button>

              <AnimatePresence>
                {activeDropdown === "hamburgerMenu" && (
                  <m.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="absolute top-full right-0 mt-4 w-72 backdrop-blur-xl bg-[#0b1d3a] border border-[#faf8f3]/20 rounded-2xl shadow-2xl py-4 z-50 max-h-96 overflow-y-auto dropdown-container"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="absolute -top-2 right-8 w-4 h-4 bg-[#0b1d3a] border-l border-t border-[#faf8f3]/20 rotate-45"></div>

                    {hamburgerMenuItems.map((item, index) => {
                      if (item.items) {
                        return (
                          <m.div
                            key={item.key}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 * index, duration: 0.3 }}
                            className="border-b border-[#faf8f3]/10 last:border-0"
                          >
                            <div className="px-6 py-3 font-semibold text-[#faf8f3] bg-[#faf8f3]/10">
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
                                      className="block w-full text-left px-4 py-2 hover:bg-[#faf8f3]/10 text-sm text-[#faf8f3] transition-all duration-200 rounded-lg mx-2"
                                    >
                                      {subItem.name}
                                    </button>
                                  );
                                }
                                return (
                                  <Link prefetch={prefetchLinks}
                                    key={subItem.name}
                                    href={subItem.href}
                                    className="block px-4 py-2 hover:bg-[#faf8f3]/10 text-sm text-[#faf8f3] transition-all duration-200 rounded-lg mx-2"
                                    onClick={() => setActiveDropdown(null)}
                                  >
                                    {subItem.name}
                                  </Link>
                                );
                              })}
                            </div>
                          </m.div>
                        );
                      }
                      return (
                        <m.div
                          key={item.name}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 * index, duration: 0.3 }}
                        >
                          <Link prefetch={prefetchLinks}
                            href={item.href}
                            className={`block px-6 py-3 text-sm transition-all duration-200 ${
                              isNavItemActive(item)
                                ? "bg-[#faf8f3]/10 text-[#F6C343]"
                                : "text-[#faf8f3] hover:bg-[#faf8f3]/10"
                            }`}
                            onClick={() => setActiveDropdown(null)}
                          >
                            {item.name}
                          </Link>
                        </m.div>
                      );
                    })}
                  </m.div>
                )}
              </AnimatePresence>
            </div>
          </nav>

          {/* Enhanced Mobile Menu Button */}
          <m.button
            whileTap={{ scale: 0.95 }}
            type="button"
            className="relative z-[101] grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-[#faf8f3]/20 bg-[#faf8f3]/10 text-[#faf8f3] transition-colors hover:bg-[#faf8f3]/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F6C343] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b1d3a] lg:hidden"
            onClick={() => setMobileMenuOpen((isOpen) => !isOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
          >
            <m.span
              className="flex items-center justify-center"
              animate={{ rotate: mobileMenuOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {mobileMenuOpen ? (
                <AiOutlineClose className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <AiOutlineMenu className="block h-6 w-6" aria-hidden="true" />
              )}
            </m.span>
          </m.button>
        </div>
      </m.div>

      {/* Mobile menu drawer slides in from the right. */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed inset-0 z-[120] bg-black/50 lg:hidden"
            onClick={(event) => {
              if (event.target === event.currentTarget) setMobileMenuOpen(false);
            }}
          >
            <m.div
              ref={mobileMenuRef}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="absolute inset-y-0 right-0 flex h-screen w-[min(88vw,360px)] min-w-0 flex-col overflow-hidden border-l border-[#faf8f3]/10 bg-[#0b1d3a] shadow-2xl supports-[height:100dvh]:h-dvh"
              role="dialog"
              aria-modal="true"
              aria-label="Navigation menu"
            >
            <div className="flex h-20 shrink-0 items-center justify-end border-b border-[#faf8f3]/10 px-4 sm:px-6">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
                className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-[#faf8f3]/20 bg-[#faf8f3]/10 text-[#faf8f3] transition-colors hover:bg-[#faf8f3]/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F6C343] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b1d3a]"
              >
                <AiOutlineClose className="block h-6 w-6" aria-hidden="true" />
              </button>
            </div>

            {/* Mobile Menu Content */}
            <nav id="mobile-navigation" aria-label="Mobile navigation" className="min-h-0 flex-1 overflow-x-hidden overflow-y-auto overscroll-contain px-4 py-4 pb-[max(1rem,env(safe-area-inset-bottom))] sm:px-6 sm:pt-6">
              <div className="mx-auto w-full max-w-lg space-y-2">
                {mainNavItems.map((item, index) => (
                  <m.div
                    key={item.name}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index, duration: 0.4 }}
                  >
                    {item.items ? (
                      <div
                        className={`rounded-xl overflow-hidden border ${
                          isNavItemActive(item)
                            ? "border-[#F6C343]/70 bg-[#faf8f3]/10"
                            : "border-[#faf8f3]/20"
                        }`}
                      >
                        <button
                          type="button"
                          aria-expanded={mobileActiveDropdown === item.key}
                          aria-controls={`mobile-submenu-${item.key}`}
                          className={`flex min-h-12 w-full items-center justify-between gap-3 px-4 py-3 text-left text-base font-semibold leading-6 transition-colors hover:bg-[#faf8f3]/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#F6C343] ${
                            isNavItemActive(item)
                              ? "text-[#F6C343]"
                              : "text-[#faf8f3] hover:text-[#faf8f3]"
                          }`}
                          onClick={() =>
                            setMobileActiveDropdown(
                              mobileActiveDropdown === item.key
                                ? null
                                : item.key,
                            )
                          }
                        >
                          <span>{item.name}</span>
                          <m.span
                            className="inline-flex"
                            animate={{
                              rotate:
                                mobileActiveDropdown === item.key ? 180 : 0,
                            }}
                            transition={{ duration: 0.3 }}
                          >
                            <AiOutlineDown />
                          </m.span>
                        </button>

                        <AnimatePresence>
                          {mobileActiveDropdown === item.key && (
                            <m.div
                              id={`mobile-submenu-${item.key}`}
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="bg-[#faf8f3]/5 border-t border-[#faf8f3]/10"
                            >
                              <ul className="space-y-1 p-2">
                                {item.items.map((subItem) => (
                                  <li key={subItem.name}>
                                    <Link prefetch={prefetchLinks}
                                      href={subItem.href}
                                      onClick={() => setMobileMenuOpen(false)}
                                      className={`flex min-h-11 items-center justify-between gap-3 rounded-lg px-4 py-2.5 text-sm leading-6 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#F6C343] ${
                                        isLinkActive(subItem.href)
                                          ? "bg-[#faf8f3]/10 text-[#F6C343]"
                                          : "text-[#faf8f3] hover:bg-[#faf8f3]/10"
                                      }`}
                                    >
                                      <span>{subItem.name}</span>
                                      <StatusBadge status={subItem.status} />
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </m.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <Link prefetch={prefetchLinks}
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`block min-h-12 rounded-xl border px-4 py-3 text-base font-semibold leading-6 transition-colors hover:bg-[#faf8f3]/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#F6C343] ${
                          isNavItemActive(item)
                            ? "border-[#F6C343]/70 bg-[#faf8f3]/10 text-[#F6C343]"
                            : "border-transparent text-[#faf8f3] hover:border-[#faf8f3]/20"
                        }`}
                      >
                        {item.name}
                      </Link>
                    )}
                  </m.div>
                ))}

                <m.div
                  initial={{ opacity: 0, scaleX: 0 }}
                  animate={{ opacity: 1, scaleX: 1 }}
                  transition={{ delay: 0.4, duration: 0.4 }}
                  className="!my-4 h-px bg-[#faf8f3]/20"
                ></m.div>

                {hamburgerMenuItems.map((item, index) => {
                  if (item.items) {
                    return (
                      <m.div
                        key={item.key}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + 0.1 * index, duration: 0.4 }}
                        className={`border rounded-xl overflow-hidden ${
                          isNavItemActive(item)
                            ? "border-[#F6C343]/70 bg-[#faf8f3]/10"
                            : "border-[#faf8f3]/10 bg-[#faf8f3]/5"
                        }`}
                      >
                        <button
                          type="button"
                          aria-expanded={mobileActiveDropdown === item.key}
                          aria-controls={`mobile-submenu-${item.key}`}
                          className={`flex min-h-12 w-full items-center justify-between gap-3 px-4 py-3 text-left text-base font-semibold leading-6 transition-colors hover:bg-[#faf8f3]/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#F6C343] ${
                            isNavItemActive(item)
                              ? "text-[#F6C343]"
                              : "text-[#faf8f3] hover:text-[#faf8f3]"
                          }`}
                          onClick={() =>
                            setMobileActiveDropdown(
                              mobileActiveDropdown === item.key
                                ? null
                                : item.key,
                            )
                          }
                        >
                          <span>{item.name}</span>
                          <m.span
                            className="inline-flex"
                            animate={{
                              rotate:
                                mobileActiveDropdown === item.key ? 180 : 0,
                            }}
                            transition={{ duration: 0.3 }}
                          >
                            <AiOutlineDown />
                          </m.span>
                        </button>

                        <AnimatePresence>
                          {mobileActiveDropdown === item.key && (
                            <m.div
                              id={`mobile-submenu-${item.key}`}
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="bg-[#faf8f3]/5 border-t border-[#faf8f3]/10"
                            >
                              <ul className="space-y-1 p-2">
                                {item.items.map((subItem) => {
                                  if (subItem.onClick) {
                                    return (
                                      <li key={subItem.name}>
                                        <button
                                          onClick={() => {
                                            subItem.onClick();
                                            setMobileActiveDropdown(null);
                                          }}
                                          className="block min-h-11 w-full rounded-lg px-4 py-2.5 text-left text-sm leading-6 text-[#faf8f3] transition-colors hover:bg-[#faf8f3]/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#F6C343]"
                                        >
                                          {subItem.name}
                                        </button>
                                      </li>
                                    );
                                  }
                                  return (
                                    <li key={subItem.name}>
                                      <Link prefetch={prefetchLinks}
                                        href={subItem.href}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className={`block min-h-11 rounded-lg px-4 py-2.5 text-sm leading-6 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#F6C343] ${
                                          isLinkActive(subItem.href)
                                            ? "bg-[#faf8f3]/10 text-[#F6C343]"
                                            : "text-[#faf8f3] hover:text-[#faf8f3] hover:bg-[#faf8f3]/10"
                                        }`}
                                      >
                                        {subItem.name}
                                      </Link>
                                    </li>
                                  );
                                })}
                              </ul>
                            </m.div>
                          )}
                        </AnimatePresence>
                      </m.div>
                    );
                  }
                  return (
                    <m.div
                      key={item.name}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + 0.1 * index, duration: 0.4 }}
                    >
                      <Link prefetch={prefetchLinks}
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`block min-h-12 rounded-xl border px-4 py-3 text-base font-semibold leading-6 transition-colors hover:bg-[#faf8f3]/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#F6C343] ${
                          isNavItemActive(item)
                            ? "border-[#F6C343]/70 bg-[#faf8f3]/10 text-[#F6C343]"
                            : "border-transparent text-[#faf8f3] hover:border-[#faf8f3]/20"
                        }`}
                      >
                        {item.name}
                      </Link>
                    </m.div>
                  );
                })}
              </div>
            </nav>
            </m.div>
          </m.div>
        )}
      </AnimatePresence>

      {/* Contact Form Modal */}
      <AnimatePresence>
        {isContactFormOpen && (
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center bg-[#0b1d3a]/70 backdrop-blur-sm z-[1000]"
          >
            <ContactForm onClose={closeContactForm} />
          </m.div>
        )}
      </AnimatePresence>
    </LazyMotion>
  );
};

export default Header;
