export function calculateAvgRating(reviews) {
  if (!reviews || reviews.length === 0) return "0.0";

  const total = reviews.reduce((curr, total) => curr + total, 0);
  return (total / reviews.length).toFixed(1);
}
