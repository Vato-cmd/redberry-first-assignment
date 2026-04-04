export default function Input({
  label,
  type = "text",
  name,
  value,
  onChange,
  placeholder = "",
  error = "",
  required = false,
}) {
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label
          htmlFor={name}
          className="text-[14px] font-medium text-[#0A0A0A]"
        >
          {label}
          {required && <span> *</span>}
        </label>
      )}

      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full rounded-lg border-[1.5px] px-4 py-3 outline-none transition ${
          error
            ? "border-red-500 focus:border-red-500"
            : "border-[#D1D1D1] focus:border-[#4F46E5]"
        }`}
      />

      {error && <p className="text-[12px] text-red-500">{error}</p>}
    </div>
  );
}
