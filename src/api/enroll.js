const BASE_URL = "https://api.redclass.redberryinternship.ge/api";

export async function deleteEnrolledCourse({ enrollmentId, token }) {
  const response = await fetch(`${BASE_URL}/enrollments/${enrollmentId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to delete the course");
  }
}

export async function getCoursesInProgress({ token }) {
  const response = await fetch(`${BASE_URL}/courses/in-progress`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch in-progress courses");
  }
  return data;
}

export async function completeEnrolledCourse({ courseId, token }) {
  const response = await fetch(`${BASE_URL}/enrollments/${courseId}/complete`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to complete the course");
  }

  return data;
}

export async function enrollToTheCourse({
  courseId,
  courseScheduleId,
  force = false,
  token,
}) {
  const response = await fetch(`${BASE_URL}/enrollments`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
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
    const error = new Error(data.message || "Failed to enroll in the course");
    error.status = response.status;
    error.data = data;

    throw error;
  }

  return data;
}
