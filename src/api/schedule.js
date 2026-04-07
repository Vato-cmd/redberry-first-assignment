const BASE_URL = "https://api.redclass.redberryinternship.ge/api";

export async function getWeeklySchedule(courseId) {
  const response = await fetch(
    `${BASE_URL}/courses/${courseId}/weekly-schedules`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch weekly schedules");
  }

  const data = await response.json();

  return data.data;
}

export async function getTimeSlot(courseId, weekId) {
  const response = await fetch(
    `${BASE_URL}/courses/${courseId}/time-slots?weekly_schedule_id=${weekId}`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch time slots");
  }

  const data = await response.json();

  return data.data;
}

export async function getSessionType(courseId, weekId, timeSlotId) {
  const response = await fetch(
    `${BASE_URL}/courses/${courseId}/session-types?weekly_schedule_id=${weekId}&time_slot_id=${timeSlotId}`,
  );

  if (!response.ok) {
    throw new Error("Failed to session types");
  }

  const data = await response.json();

  return data.data;
}
