import { getOptionClasses } from "../utils/scheduleHelpers";
import Button from "./UI/Button";

export default function ScheduleOption({
  isSelected,
  onClick,
  children,
  disabled = false,
  className,
}) {
  return (
    <Button
      disabled={disabled}
      className={`${getOptionClasses(isSelected, disabled)} ${className}`}
      onClick={disabled ? undefined : onClick}
    >
      {children}
    </Button>
  );
}
