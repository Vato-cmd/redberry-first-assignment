export default function Button({ className, children, ...props }) {
  return (
    <button className={`font-inherit cursor-pointer ${className}`} {...props}>
      {children}
    </button>
  );
}
