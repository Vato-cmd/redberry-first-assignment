import { useState } from "react";
import { useEnroll } from "../context/EnrollContext";

import StarRating from "./UI/StarRating";

export default function ReviewSection({ courseId }) {
  const [rating, setRating] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const { submitReview } = useEnroll();

  async function handleRatingSubmit(starValue) {
    try {
      setError("");
      setIsSubmitting(true);
      setRating(starValue);
      await submitReview({ courseId, rating: starValue });
      setIsSubmitted(true);
    } catch (error) {
      const message = error.message || "Failed to submit review";
      setError(message);

      if (message.toLowerCase().includes("already rated")) {
        setIsSubmitted(true);
        setIsSubmitting(true);
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="flex flex-col gap-2 mt-9.75 items-center">
      <p className="text-[#736BEA] text-[20px] font-medium">
        {isSubmitted ? "Thanks for your review" : "Rate your experience"}
      </p>

      <StarRating
        value={rating}
        onChange={handleRatingSubmit}
        disabled={isSubmitted || isSubmitting}
      />

      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}
