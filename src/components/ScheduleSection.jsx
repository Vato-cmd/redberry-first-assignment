import Button from "./UI/Button";

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
        className=""
        disabled={isDisabled}
      >
        <h1>{title}</h1>
        <span>{isOpen ? "⬇️" : "⬆️"}</span>
      </Button>

      {isOpen && (
        <div className={className}>
          {isLoading ? <p>{loadingText}</p> : children}
        </div>
      )}
    </section>
  );
}
