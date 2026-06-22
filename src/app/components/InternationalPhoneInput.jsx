"use client";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const preferredCountries = ["in", "ae", "om", "bh", "sa", "qa", "kw", "sg"];

export const getInternationalPhoneValue = (phone) =>
  phone ? `+${phone.replace(/\D/g, "")}` : "";

export const isValidInternationalPhone = (phone) =>
  /^\d{8,15}$/.test(phone.replace(/\D/g, ""));

export default function InternationalPhoneInput({
  value,
  onChange,
  inputProps,
  containerClass = "w-full",
  inputClass = "!w-full !h-[50px] !rounded-lg !border !border-[#2B364D] !bg-[#FDFCFA] !py-3 !pl-14 !pr-4 !text-[#162033] placeholder:!text-[#6C7484] focus:!outline-none focus:!ring-2 focus:!ring-[#F6C343]",
  buttonClass = "!rounded-l-lg !border !border-[#2B364D] !bg-[#FDFCFA] hover:!bg-[#FDFCFA]",
  dropdownClass = "!text-[#162033]",
}) {
  return (
    <PhoneInput
      country="in"
      enableSearch
      countryCodeEditable={false}
      enableAreaCodes={false}
      preferredCountries={preferredCountries}
      value={value}
      onChange={onChange}
      containerClass={containerClass}
      inputClass={inputClass}
      buttonClass={buttonClass}
      dropdownClass={dropdownClass}
      inputProps={{
        type: "tel",
        required: true,
        placeholder: "Enter phone number",
        ...inputProps,
      }}
    />
  );
}
