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
            error
              ? "text-[#F4161A] focus:text-[#F4161A]"
              : "border-[#D1D1D1] focus:border-[#4F46E5]"
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
