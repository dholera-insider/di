"use client";

import { useEffect, useRef, useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const preferredCountries = [
  "in",
  "ae",
  "om",
  "bh",
  "sa",
  "qa",
  "kw",
  "sg",
  "hk",
];

export const getInternationalPhoneValue = (phone) =>
  phone ? `+${phone.replace(/\D/g, "")}` : "";

export const isValidInternationalPhone = (phone) =>
  /^\d{8,15}$/.test(phone.replace(/\D/g, ""));

export default function InternationalPhoneInput({
  value,
  onChange,
  inputProps,
  containerClass = "",
  inputClass = "",
  buttonClass = "",
  dropdownClass = "",
}) {
  const [country, setCountry] = useState("in");

  const hasUserInteracted = useRef(false);

  // =========================================================
  // COUNTRY AUTO DETECTION
  // Existing functionality preserved
  // =========================================================

  useEffect(() => {
    if (value || hasUserInteracted.current) return;
    let cancelled = false;
    const detectCountry = async () => {
      try {
        const response = await fetch("/api/country", {
          cache: "no-store",
        });

        if (!response.ok) {
          return;
        }

        const data = await response.json();

        if (
          !cancelled && typeof data.country === "string" && /^[a-z]{2}$/.test(data.country) &&
          !hasUserInteracted.current &&
          !value
        ) {
          setCountry(
            String(data.country).toLowerCase(),
          );
        }
      } catch (error) {
        console.error(
          "Country detection failed:",
          error,
        );
      }
    };

    detectCountry();
    return () => { cancelled = true; };
  }, [value]);

  return (
    <>
      <style>{`
        /* ===================================================
           ROOT
        =================================================== */

        .bma-phone-root.react-tel-input {
          position: relative;

          z-index: 100;

          width: 100% !important;
          max-width: 100% !important;
          min-width: 0 !important;

          height: 52px;

          overflow: visible !important;

          font-family: inherit;
        }

        /* ===================================================
           PHONE INPUT
        =================================================== */

        .bma-phone-root.react-tel-input .form-control {
          position: relative;

          z-index: 1;

          width: 100% !important;
          max-width: 100% !important;
          min-width: 0 !important;

          height: 52px !important;

          margin: 0 !important;

          padding: 0 16px 0 94px !important;

          border: 0 !important;

          border-radius: 13px !important;

          outline: none !important;

          background: transparent !important;

          box-shadow: none !important;

          color: #051a3a !important;

          font-family: inherit !important;
          font-size: 15px !important;
          font-weight: 500 !important;

          line-height: 52px !important;
        }

        .bma-phone-root.react-tel-input
          .form-control::placeholder {
          color: #98a2b3 !important;
          opacity: 1;

          font-weight: 400 !important;
        }

        .bma-phone-root.react-tel-input
          .form-control:focus {
          outline: none !important;

          box-shadow: none !important;
        }

        /* ===================================================
           FLAG DROPDOWN WRAPPER
        =================================================== */

        .bma-phone-root.react-tel-input
          .flag-dropdown {
          position: absolute !important;

          z-index: 20 !important;

          top: 4px !important;
          bottom: 4px !important;
          left: 4px !important;

          width: 74px !important;

          border: 0 !important;

          border-radius: 10px !important;

          background: transparent !important;

          box-shadow: none !important;

          overflow: visible !important;
        }

        /* ===================================================
           SELECTED COUNTRY BUTTON
        =================================================== */

        .bma-phone-root.react-tel-input
          .selected-flag {
          position: relative;

          display: flex !important;

          width: 74px !important;
          height: 44px !important;

          align-items: center !important;
          justify-content: flex-start !important;

          padding: 0 12px !important;

          cursor: pointer !important;

          border: 1px solid
            rgba(216, 158, 13, 0.42) !important;

          border-radius: 10px !important;

          background:
            linear-gradient(
              180deg,
              #fffaf0 0%,
              #fff4d9 100%
            ) !important;

          box-shadow:
            0 1px 2px rgba(5, 26, 58, 0.03),
            inset 0 0 0 1px
              rgba(255, 255, 255, 0.6) !important;

          transition:
            border-color 180ms ease,
            background 180ms ease,
            box-shadow 180ms ease !important;
        }

        /* Hover */

        .bma-phone-root.react-tel-input
          .selected-flag:hover {
          border-color:
            rgba(216, 158, 13, 0.72) !important;

          background:
            linear-gradient(
              180deg,
              #fff8e5 0%,
              #ffeec5 100%
            ) !important;

          box-shadow:
            0 3px 8px
              rgba(216, 158, 13, 0.1) !important;
        }

        /* ===================================================
           OPEN STATE
        =================================================== */

        .bma-phone-root.react-tel-input
          .flag-dropdown.open {
          background: transparent !important;

          border-radius: 10px !important;
        }

        .bma-phone-root.react-tel-input
          .flag-dropdown.open
          .selected-flag {
          border-color: #d9a51f !important;

          border-radius: 10px !important;

          background:
            linear-gradient(
              180deg,
              #fff8e2 0%,
              #ffecb6 100%
            ) !important;

          box-shadow:
            0 0 0 3px
              rgba(246, 195, 67, 0.14) !important;
        }

        /* ===================================================
           FLAG
        =================================================== */

        .bma-phone-root.react-tel-input
          .selected-flag
          .flag {
          position: absolute !important;

          top: 50% !important;
          left: 14px !important;

          margin-top: -5px !important;
        }

        /* Arrow */

        .bma-phone-root.react-tel-input
          .selected-flag
          .arrow {
          left: 22px !important;

          margin-top: -2px !important;

          border-top-color: #667085 !important;
        }

        .bma-phone-root.react-tel-input
          .selected-flag
          .arrow.up {
          border-bottom-color: #667085 !important;
        }

        /* ===================================================
           COUNTRY DROPDOWN

           Important:
           This must be able to extend OVER the next section.
        =================================================== */

        .bma-phone-root.react-tel-input
          .country-list {
          position: absolute !important;

          z-index: 999999 !important;

          top: calc(100% + 9px) !important;
          left: 0 !important;
          right: auto !important;

          width:
            min(
              335px,
              calc(100vw - 32px)
            ) !important;

          max-width:
            calc(100vw - 32px) !important;

          max-height: 320px !important;

          margin: 0 !important;

          padding: 7px !important;

          overflow-x: hidden !important;
          overflow-y: auto !important;

          border: 1px solid #e4e7ec !important;

          border-radius: 14px !important;

          background: #ffffff !important;

          box-shadow:
            0 28px 70px
              rgba(5, 26, 58, 0.2),
            0 8px 22px
              rgba(5, 26, 58, 0.09) !important;
        }

        /* ===================================================
           SEARCH AREA
        =================================================== */

        .bma-phone-root.react-tel-input
          .country-list
          .search {
          position: sticky !important;

          z-index: 5 !important;

          top: -7px !important;

          margin: -1px -1px 6px !important;

          padding: 8px !important;

          background:
            rgba(
              255,
              255,
              255,
              0.98
            ) !important;

          backdrop-filter: blur(8px);
        }

        .bma-phone-root.react-tel-input
          .country-list
          .search-box {
          width: 100% !important;
          max-width: 100% !important;

          height: 40px !important;

          margin: 0 !important;

          padding: 0 12px !important;

          border: 1px solid #dfe5ed !important;

          border-radius: 10px !important;

          outline: none !important;

          background: #f8fafc !important;

          box-shadow: none !important;

          color: #051a3a !important;

          font-family: inherit !important;
          font-size: 13px !important;
        }

        .bma-phone-root.react-tel-input
          .country-list
          .search-box::placeholder {
          color: #98a2b3 !important;
        }

        .bma-phone-root.react-tel-input
          .country-list
          .search-box:focus {
          border-color: #d9a51f !important;

          background: #ffffff !important;

          box-shadow:
            0 0 0 3px
              rgba(
                246,
                195,
                67,
                0.14
              ) !important;
        }

        /* ===================================================
           COUNTRY ROW
        =================================================== */

        .bma-phone-root.react-tel-input
          .country-list
          .country {
          display: flex !important;

          width: 100% !important;
          min-width: 0 !important;

          min-height: 43px !important;

          align-items: center !important;

          margin: 1px 0 !important;

          padding: 8px 10px !important;

          cursor: pointer !important;

          border-radius: 9px !important;

          background: transparent !important;

          color: #344054 !important;

          transition:
            background-color 140ms ease,
            color 140ms ease !important;
        }

        .bma-phone-root.react-tel-input
          .country-list
          .country:hover {
          background: #f8fafc !important;

          color: #051a3a !important;
        }

        /* Selected row */

        .bma-phone-root.react-tel-input
          .country-list
          .country.highlight {
          background: #fff6dc !important;

          color: #051a3a !important;
        }

        .bma-phone-root.react-tel-input
          .country-list
          .country-name {
          min-width: 0;

          overflow: hidden;

          text-overflow: ellipsis;

          white-space: nowrap;

          font-size: 13px !important;
          font-weight: 500 !important;
        }

        .bma-phone-root.react-tel-input
          .country-list
          .dial-code {
          flex-shrink: 0;

          margin-left: auto !important;

          color: #667085 !important;

          font-size: 12px !important;
          font-weight: 500 !important;
        }

        /* ===================================================
           SCROLLBAR
        =================================================== */

        .bma-phone-root.react-tel-input
          .country-list::-webkit-scrollbar {
          width: 7px;
        }

        .bma-phone-root.react-tel-input
          .country-list::-webkit-scrollbar-track {
          background: transparent;
        }

        .bma-phone-root.react-tel-input
          .country-list::-webkit-scrollbar-thumb {
          border: 2px solid #ffffff;

          border-radius: 999px;

          background: #cbd2dc;
        }

        /* ===================================================
           ERROR
        =================================================== */

        .bma-phone-shell-error
          .bma-phone-root.react-tel-input
          .selected-flag {
          border-color: #f0aaa4 !important;

          background: #fff7f7 !important;
        }

        /* ===================================================
           MOBILE
        =================================================== */

        @media (max-width: 639px) {
          .bma-phone-root.react-tel-input {
            width: 100% !important;
            max-width: 100% !important;

            height: 50px;
          }

          .bma-phone-root.react-tel-input
            .form-control {
            height: 50px !important;

            padding-left: 88px !important;

            line-height: 50px !important;

            font-size: 14px !important;
          }

          .bma-phone-root.react-tel-input
            .flag-dropdown {
            width: 68px !important;
          }

          .bma-phone-root.react-tel-input
            .selected-flag {
            width: 68px !important;
            height: 42px !important;

            border-radius: 9px !important;
          }

          .bma-phone-root.react-tel-input
            .country-list {
            /*
             * Fits inside mobile viewport while still
             * remaining wide enough to read countries.
             */

            width:
              min(
                320px,
                calc(100vw - 40px)
              ) !important;

            max-width:
              calc(100vw - 40px) !important;

            max-height: 300px !important;
          }
        }

        @media (max-width: 360px) {
          .bma-phone-root.react-tel-input
            .country-list {
            width:
              calc(100vw - 32px) !important;

            max-width:
              calc(100vw - 32px) !important;
          }
        }
      `}</style>

      <PhoneInput
        country={country}
        enableSearch
        countryCodeEditable={false}
        enableAreaCodes={false}
        preferredCountries={preferredCountries}
        value={value}
        onChange={(
          phone,
          countryData,
          event,
          formattedValue,
        ) => {
          hasUserInteracted.current = true;

          if (countryData?.countryCode) {
            setCountry(
              countryData.countryCode,
            );
          }

          onChange?.(
            phone,
            countryData,
            event,
            formattedValue,
          );
        }}
        containerClass={`bma-phone-root ${containerClass}`}
        inputClass={inputClass}
        buttonClass={buttonClass}
        dropdownClass={dropdownClass}
        inputProps={{
          type: "tel",
          required: true,
          autoComplete: "tel",
          inputMode: "tel",
          placeholder: "Enter phone number",
          ...inputProps,
        }}
      />
    </>
  );
}
