"use client";

import { useEffect, useRef, useState } from "react";
import "./HomePageFormInput.css";

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
  const containerRef = useRef(null);
  const fallbackInputRef = useRef(null);
  const restoreFocusRef = useRef(false);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [PhoneInput, setPhoneInput] = useState(null);

  useEffect(() => {
    if (shouldLoad) return undefined;

    if (!("IntersectionObserver" in window)) {
      setShouldLoad(true);
      return undefined;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setShouldLoad(true);
        observer.disconnect();
      }
    }, { rootMargin: "400px 0px" });

    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [shouldLoad]);

  useEffect(() => {
    if (!shouldLoad) return undefined;
    let cancelled = false;

    // Load country data, flags, and package CSS only near the form.
    Promise.all([
      import("react-phone-input-2"),
      import("react-phone-input-2/lib/style.css"),
    ]).then(([module]) => {
      if (!cancelled) setPhoneInput(() => module.default);
    }).catch((error) => {
      console.error("Phone input could not be enhanced:", error);
    });

    return () => { cancelled = true; };
  }, [shouldLoad]);

  // =========================================================
  // COUNTRY AUTO DETECTION
  // Existing functionality preserved
  // =========================================================

  useEffect(() => {
    if (!shouldLoad || value || hasUserInteracted.current) return undefined;
    const controller = new AbortController();

    const detectCountry = async () => {
      try {
        const response = await fetch("/api/country", {
          cache: "no-store",
          signal: controller.signal,
        });
        if (!response.ok) return;

        const data = await response.json();
        if (data.country && !hasUserInteracted.current && !value) {
          setCountry(String(data.country).toLowerCase());
        }
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Country detection failed:", error);
        }
      }
    };

    detectCountry();
    return () => controller.abort();
  }, [shouldLoad, value]);

  return (
    <div ref={containerRef} className="w-full min-w-0">
      {PhoneInput ? (
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
            ref: (input) => {
              if (input && restoreFocusRef.current) {
                restoreFocusRef.current = false;
                input.focus({ preventScroll: true });
              }
              if (typeof inputProps?.ref === "function") inputProps.ref(input);
              else if (inputProps?.ref) inputProps.ref.current = input;
            },
          }}
        />
      ) : (
        <div className={`bma-phone-root react-tel-input ${containerClass}`}>
          <input
            type="tel"
            required
            autoComplete="tel"
            inputMode="tel"
            placeholder="Enter phone number"
            {...inputProps}
            ref={(input) => {
              if (!input && fallbackInputRef.current === document.activeElement) {
                restoreFocusRef.current = true;
              }
              fallbackInputRef.current = input;
            }}
            className={`form-control ${inputClass}`}
            value={value ? `+${value}` : ""}
            onFocus={(event) => {
              setShouldLoad(true);
              inputProps?.onFocus?.(event);
            }}
            onBlur={(event) => {
              restoreFocusRef.current = false;
              inputProps?.onBlur?.(event);
            }}
            onChange={(event) => {
              hasUserInteracted.current = true;
              onChange?.(event.target.value.replace(/\D/g, ""));
            }}
          />
        </div>
      )}
    </div>
  );
}