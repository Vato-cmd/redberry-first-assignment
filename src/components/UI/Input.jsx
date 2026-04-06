import eye from "../../assets/eye.png";
import eyeclosed from "../../assets/eye-closed.png";
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
}) {
  const [visible, setIsVisible] = useState(false);
  const isPassword = type === "password";
  const inputType = isPassword && visible ? "text" : type;

  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label
          htmlFor={name}
          className="text-[14px] font-medium text-[#3D3D3D]"
        >
          {label}
          {required && <span>*</span>}
        </label>
      )}
      <div className="relative ">
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
          className={`w-full rounded-lg border-[1.5px] px-4 py-3 outline-none transition ${
            disabled
              ? "border-[#D1D1D1] bg-[#F5F5F5] text-[#8A8A8A]"
              : error
                ? "text-[#F4161A] border-[#F4161A] focus:border-[#F4161A]"
                : isValid
                  ? "text-[#1DC31D] border-[#1DC31D] focus:border-[#1DC31D]"
                  : "border-[#D1D1D1] text-[#141414] focus:border-[#D1D1D1]"
          }`}
        />
        {isPassword && (
          <img
            src={visible ? eye : eyeclosed}
            alt={visible ? "Hide password" : "Show password"}
            className="w-5.5 h-5.5 absolute right-3.75 top-1/2 -translate-y-1/2 cursor-pointer"
            onClick={() => setIsVisible((prev) => !prev)}
          />
        )}
      </div>

      {error && <p className="text-[12px] text-[#F4161A]">{error}</p>}
    </div>
  );
}
