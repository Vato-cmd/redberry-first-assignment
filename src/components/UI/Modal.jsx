import Button from "./Button";
import cross from "../../assets/cross.svg";
import backwardsArrow from "../../assets/backwards-arrow.png";
import { useEffect } from "react";

export default function Modal({
  isOpen,
  onClose,
  children,
  className = "",
  showBackwardsArrow = false,
  onBack,
}) {
  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(e) {
      if (e.key === "Escape") {
        onClose?.();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="flex items-center justify-center gap-3 fixed inset-0 z-50 bg-[#b8b8b8]/50 px-4"
      onClick={onClose}
    >
      <div
        className={`relative w-full max-w-115 max-h-screen rounded-xl bg-white p-5 ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
        <Button
          className="absolute right-3.75 top-[20.5px] text-[28px] leading-none text-[#8A8A8A]"
          onClick={onClose}
        >
          <img src={cross} alt="close icon" />
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
