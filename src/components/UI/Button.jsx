export default function Button({
  className = "",
  children,
  type = "button",
  ...props
}) {
  return (
    <button
      type={type}
      className={`font-inherit cursor-pointer ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
