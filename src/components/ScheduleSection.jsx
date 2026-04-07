export default function ScheduleSection({
  title,
  isLoading,
  loadingText,
  children,
}) {
  return (
    <section>
      <h1>{title}</h1>
      <div>{isLoading ? <p>{loadingText}</p> : children}</div>
    </section>
  );
}
