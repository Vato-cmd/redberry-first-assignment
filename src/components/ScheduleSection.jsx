export default function ScheduleSection({
  title,
  isLoading,
  loadingText,
  children,
  className,
}) {
  return (
    <section>
      <h1>{title}</h1>
      <div className={className}>
        {isLoading ? <p>{loadingText}</p> : children}
      </div>
    </section>
  );
}
