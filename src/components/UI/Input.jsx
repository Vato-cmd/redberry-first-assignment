import eye from "../../assets/eye.png";
import eyeclosed from "../../assets/eye-closed.png";
import arrowDown from "../../assets/arrow-down.svg";

import { useState } from "react";

export default function Input({
  label,
  type = "text",
  name,
  value,
  onChange,
  placeholder = "",
  error = "",
  required = false,
  disabled = false,
  readOnly = false,
  isValid = false,
  onBlur,
  icons,
  options = [],
}) {
  const [visible, setIsVisible] = useState(false);
  const isPassword = type === "password";
  const inputType = isPassword && visible ? "text" : type;

  return (
    <div className="flex flex-col">
      {label && (
        <label
          htmlFor={name}
          className="text-[14px] font-medium text-[#3D3D3D] mb-2"
        >
          {label}
          {required && <span>*</span>}
        </label>
      )}
      <div className="relative ">
        {type === "select" ? (
          <select
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            disabled={disabled}
            onBlur={onBlur}
            className={`w-full text-[#ADADAD] rounded-lg border-[1.5px] appearance-none pl-4 py-3 outline-none transition ${
              disabled
                ? "border-[#D1D1D1] bg-[#F5F5F5] text-[#8A8A8A]"
                : error
                  ? "text-[#F4161A] border-[#F4161A]"
                  : isValid
                    ? "text-[#1DC31D] border-[#1DC31D]"
                    : "border-[#D1D1D1] text-[#141414]"
            }`}
          >
            <option value="">Age</option>

            {options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        ) : (
          <>
            {name === "mobileNumber" && (
              <span className="absolute left-3.25 top-1/2 -translate-y-1/2 text-[#d1d1d1] font-medium ">
                +995 |
              </span>
            )}
            <input
              id={name}
              name={name}
              type={inputType}
              value={value}
              onChange={onChange}
              disabled={disabled}
              readOnly={readOnly}
              onBlur={onBlur}
              placeholder={placeholder}
              className={`w-full rounded-lg border-[1.5px] py-3 outline-none transition
                ${name === "mobileNumber" ? "pl-16 pr-4" : "px-4"}
                ${
                  disabled
                    ? "border-[#D1D1D1] bg-[#F5F5F5] text-[#8A8A8A]"
                    : error
                      ? "text-[#F4161A] border-[#F4161A] focus:border-[#F4161A]"
                      : isValid
                        ? "text-[#1DC31D] border-[#1DC31D] focus:border-[#1DC31D]"
                        : "border-[#D1D1D1] text-[#141414] focus:border-[#D1D1D1]"
                }`}
            />
          </>
        )}
        {isPassword ? (
          <img
            src={visible ? eye : eyeclosed}
            alt={visible ? "Hide password" : "Show password"}
            className="w-5.5 h-5.5 absolute right-3.75 top-1/2 -translate-y-1/2 cursor-pointer"
            onClick={() => setIsVisible((prev) => !prev)}
          />
        ) : icons ? (
          <img
            src={type === "select" ? arrowDown : icons}
            alt="field status icon"
            className={`${type === "select" ? "w-2.5 h-[11.89px]" : "w-4.5 h-4.5"}  absolute right-3.75 top-1/2 -translate-y-1/2`}
          />
        ) : null}
      </div>

      {error && <p className=" text-[12px] text-[#F4161A]">{error}</p>}
    </div>
  );
}
