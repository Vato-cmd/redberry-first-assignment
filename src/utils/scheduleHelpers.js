export function getOptionClasses(isSelected) {
  return isSelected
    ? "border-[#8B7FFF] bg-[#F5F3FF] text-[#6D5DF6]"
    : "border-[#D1D1D1] bg-white text-[#141414]";
}

export function formatWeeklyLabel(label) {
  return label === "Weekend Only" ? "Weekend" : label;
}

export function formatTimeSlotLabel(label) {
  const firstSpaceIndex = label.indexOf(" ");

  return {
    period: label.slice(0, firstSpaceIndex),
    timeRange: label.slice(firstSpaceIndex + 1),
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
  const joinedDays = `${firstDay}-${secondDay}`;

  return joinedDays;
}
