export function getWeeklyScheduleKey(label) {
  if (label === "Monday - Wednesday") return "mon-wed";
  if (label === "Tuesday - Thursday") return "tue-thu";
  if (label === "Friday - Saturday") return "fri-sat";
  if (label === "Weekend Only") return "weekend";

  return null;
}

export function getTimeSlotKey(label) {
  if (label.startsWith("Morning")) return "morning";
  if (label.startsWith("Afternoon")) return "afternoon";
  if (label.startsWith("Evening")) return "evening";

  return null;
}

export function getSessionTypeKey(name) {
  return name;
}

export function getOptionClasses(isSelected, disabled = false, slotType = "") {
  if (disabled) {
    return "border-[#D1D1D1] bg-[#F5F5F5] text-[#D1D1D1]";
  }
  return isSelected
    ? `border-[#958FEF] bg-[#dddbfa] text-[#4F46E5]`
    : `border-[#D1D1D1] bg-white ${slotType === "week" ? "text-[#292929]" : "text-[#666666]"}`;
}

export function formatWeeklyLabel(label) {
  return label === "Weekend Only" ? "Weekend" : label;
}

export function formatTimeSlotLabel(label) {
  const firstSpaceIndex = label.indexOf(" ");

  return {
    period: label.slice(0, firstSpaceIndex),
    timeRange: label
      .slice(firstSpaceIndex + 1)
      .replace("(", "")
      .replace(")", ""),
  };
}

export function formatSessionTypeName(name) {
  if (name === "in_person") return "In-Person";
  if (name === "online") return "Online";
  if (name === "hybrid") return "Hybrid";
  return name;
}

export function formatWeekdayLabel(label) {
  if (label === "Weekend Only") return "Weekend";
  const cleanWeekDays = label.split(" - ");
  const firstDay = cleanWeekDays[0].slice(0, 3);
  const secondDay = cleanWeekDays[cleanWeekDays.length - 1].slice(0, 3);
  const joinedDays = `${firstDay} - ${secondDay}`;

  return joinedDays;
}
