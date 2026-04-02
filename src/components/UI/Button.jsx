export default function Button({ classes, children }) {
  return <button className={`font-inherit ${classes}`}>{children}</button>;
}
