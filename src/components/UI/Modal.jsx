import Button from "./Button";
import iconClose from "../../assets/close-icon.png";
import backwardsArrow from "../../assets/backwards-arrow.png";

export default function Modal({
  isOpen,
  onClose,
  children,
  className = "",
  showBackwardsArrow = false,
  onBack,
}) {
  if (!isOpen) return null;

  return (
    <div
      className="flex items-center justify-center gap-3 fixed inset-0 z-50 bg-[#b8b8b8]/50 px-4"
      onClick={onClose}
    >
      <div
        className={`relative w-full max-w-115 rounded-xl bg-white p-12.5 ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
        <Button
          className="absolute right-3.75 top-[16.5px] text-[28px] leading-none text-[#8A8A8A]"
          onClick={onClose}
        >
          <img src={iconClose} alt="close icon" />
        </Button>
        {showBackwardsArrow && (
          <Button
            className="absolute left-4.25 top-[16.5px] text-[28px] leading-none text-[#8A8A8A]"
            onClick={onBack}
          >
            <img src={backwardsArrow} alt="backwards arrow" />
          </Button>
        )}

        {children}
      </div>
    </div>
  );
}
