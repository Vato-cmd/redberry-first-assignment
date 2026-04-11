const BASE_URL = "https://api.redclass.redberryinternship.ge/api";

export async function getCourses() {
  const response = await fetch(`${BASE_URL}/courses`);

  if (!response.ok) {
    throw new Error("Failed to fetch the courses");
  }
  const data = await response.json();
  return data.data;
}

export async function getCategories() {
  const response = await fetch(`${BASE_URL}/categories`);

  if (!response.ok) {
    throw new Error("Failed to load the categories");
  }

  const data = await response.json();
  return data.data;
}

export async function getTopics(categoryIds = []) {
  const params = new URLSearchParams();

  categoryIds.forEach((id) => {
    params.append("categories[]", id);
  });

  const url =
    categoryIds.length > 0
      ? `${BASE_URL}/topics?${params.toString()}`
      : `${BASE_URL}/topics`;

  const response = await fetch(url, {
    headers: {
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to load the topics");
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

export async function getCourseById(id, token) {
  const response = await fetch(`${BASE_URL}/courses/${id}`, {
    headers: {
      Accept: "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

  if (!response.ok) {
    throw new Error("Failed to load the course details");
  }

  const data = await response.json();

  return data.data;
}
