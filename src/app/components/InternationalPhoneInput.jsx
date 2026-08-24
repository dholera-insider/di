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
  containerClass = "relative z-20 w-full overflow-visible",
  inputClass = "!w-full !h-[50px] !rounded-lg !border !border-[#2B364D] !bg-[#FDFCFA] !py-3 !pl-14 !pr-4 !text-[#162033] placeholder:!text-[#6C7484] focus:!outline-none focus:!ring-2 focus:!ring-[#F6C343]",
  buttonClass = "!rounded-l-lg !border !border-[#2B364D] !bg-[#FDFCFA] hover:!bg-[#FDFCFA]",
  dropdownClass = "!z-[10000] !max-h-60 !bg-white !text-[#162033] !shadow-2xl",
}) {
  const [country, setCountry] = useState("in");
  const hasUserInteracted = useRef(false);

  useEffect(() => {
    const detectCountry = async () => {
      try {
        const response = await fetch("/api/country", {
          cache: "no-store",
        });

        if (!response.ok) return;

        const data = await response.json();

        if (
          data.country &&
          !hasUserInteracted.current &&
          !value
        ) {
          setCountry(data.country);
        }
      } catch (error) {
        console.error("Country detection failed:", error);
      }
    };

    detectCountry();
  }, [value]);

  return (
    <PhoneInput
      country={country}
      enableSearch
      countryCodeEditable={false}
      enableAreaCodes={false}
      preferredCountries={preferredCountries}
      value={value}
      onChange={(phone, countryData, event, formattedValue) => {
        hasUserInteracted.current = true;

        if (countryData?.countryCode) {
          setCountry(countryData.countryCode);
        }

        onChange?.(
          phone,
          countryData,
          event,
          formattedValue
        );
      }}
      containerClass={containerClass}
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
  );
}