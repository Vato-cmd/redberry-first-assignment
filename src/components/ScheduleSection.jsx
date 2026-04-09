import Button from "./UI/Button";
import StepIcon from "./UI/StepIcon";
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
  step,
  isCompleted,
}) {
  return (
    <section className={`${isDisabled ? "opacity-50" : ""}`}>
      <Button
        type="button"
        onClick={!isDisabled ? onToggle : undefined}
        className="flex items-center justify-between w-full mb-4.5"
        disabled={isDisabled}
      >
        <div className="flex items-center gap-2">
          <StepIcon
            number={step}
            active={!isDisabled}
            completed={isCompleted}
          />
          <h1
            className={`text-[24px] font-semibold ${!isDisabled ? "text-[#130E67]" : ""}`}
          >
            {title}
          </h1>
        </div>
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

      {isOpen && <div className={`${className} mb-8`}>{children}</div>}
    </section>
  );
}
