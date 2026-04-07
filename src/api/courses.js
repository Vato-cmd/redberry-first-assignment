const BASE_URL = "https://api.redclass.redberryinternship.ge/api";

export async function getCourses() {
  const response = await fetch(`${BASE_URL}/courses`);

  if (!response.ok) {
    throw new Error("Failed to fetch the courses");
  }
  const data = await response.json();
  return data.data;
}

export async function getFeaturedCourses() {
  const response = await fetch(`${BASE_URL}/courses/featured`);

  if (!response.ok) {
    throw new Error("Failed to fetch the featured courses");
  }

  const data = await response.json();
  return data.data;
}

export async function getCourseById(id) {
  const response = await fetch(`${BASE_URL}/courses/${id}`);

  if (!response.ok) {
    throw new Error("Failed to load the course details");
  }

  const data = await response.json();

  return data.data;
}
