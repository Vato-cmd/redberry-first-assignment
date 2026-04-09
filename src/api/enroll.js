const BASE_URL = "https://api.redclass.redberryinternship.ge/api";

export async function enrollToTheCourse({
  courseId,
  courseScheduleId,
  force = false,
  token,
}) {
  const response = await fetch(`${BASE_URL}/enrollments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      courseId,
      courseScheduleId,
      force,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to enroll in the course");
  }

  return data;
}
