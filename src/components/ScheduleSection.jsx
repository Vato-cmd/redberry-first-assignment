import Button from "./UI/Button";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function ScheduleSection({
  title,
  isLoading,
  loadingText,
  children,
  className,
  isOpen = false,
  isDisabled = false,
  onToggle,
}) {
  return (
    <section className={`${isDisabled ? "opacity-50" : ""}`}>
      <Button
        type="button"
        onClick={!isDisabled ? onToggle : undefined}
        className="flex items-center justify-between w-full mb-4.5"
        disabled={isDisabled}
      >
        <h1
          className={`text-[24px] font-semibold ${!isDisabled ? "text-[#130E67]" : ""}`}
        >
          {title}
        </h1>
        <span>
          {isOpen ? (
            <ChevronDown
              className={`w-7 h-7 ${!isDisabled ? "text-[#130E67]" : ""}`}
            />
          ) : (
            <ChevronUp
              className={`w-7 h-7 ${!isDisabled ? "text-[#130E67]" : ""}`}
            />
          )}
        </span>
      </Button>

      {isOpen && (
        <div className={className}>
          {isLoading ? <p>{loadingText}</p> : children}
        </div>
      )}
    </section>
  );
}
