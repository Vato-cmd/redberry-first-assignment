const BASE_URL = "https://api.redclass.redberryinternship.ge/api";

export async function submitReview({ courseId, rating, token }) {
  const response = await fetch(`${BASE_URL}/courses/${courseId}/reviews`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ rating }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to submit a review");
  }

  return data;
}
