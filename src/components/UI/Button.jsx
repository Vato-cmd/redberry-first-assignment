export default function Button({
  className = "",
  children,
  type = "button",
  disabled,
  ...props
}) {
  return (
    <button
      type={type}
      className={`font-inherit cursor-pointer ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
