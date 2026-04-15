import { useState } from "react";
import { useEnroll } from "../context/EnrollContext";
import { useAuth } from "../context/AuthContext";

import StarRating from "./UI/StarRating";

export default function ReviewSection({
  courseId,
  reviews = [],
  isRated = false,
  onReviewSuccess,
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [justSubmitted, setJustSubmitted] = useState(false);
  const [error, setError] = useState("");

  const { submitReview } = useEnroll();
  const { user } = useAuth();

  const currentUserReview = reviews.find((review) => review.userId === user.id);
  const existingRating = currentUserReview?.rating ?? 0;

  async function handleRatingSubmit(starValue) {
    try {
      setError("");
      setIsSubmitting(true);

      await submitReview({ courseId, rating: starValue });
      setJustSubmitted(true);
      await onReviewSuccess?.();
    } catch (error) {
      setError(error.message || "Failed to submit review");
    } finally {
      setIsSubmitting(false);
    }
  }

  function getMessage() {
    if (justSubmitted) return "Thanks for your review";
    if (isRated) return "You have already reviewed this course";
    return "Rate your experience";
  }

  return (
    <div className="flex flex-col gap-2 mt-9.75 items-center">
      <p className="text-[#736BEA] text-[20px] font-medium">{getMessage()}</p>

      <StarRating
        value={existingRating}
        onChange={handleRatingSubmit}
        disabled={isRated || isSubmitting}
      />

      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}
