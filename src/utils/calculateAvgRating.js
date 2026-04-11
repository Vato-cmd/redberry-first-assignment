export function calculateAvgRating(reviews) {
  if (!reviews || reviews.length === 0) return "0.0";

  const total = reviews.reduce((sum, reviews) => sum + reviews.rating, 0);
  return (total / reviews.length).toFixed(1);
}
