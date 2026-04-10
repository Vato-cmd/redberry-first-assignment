import { useState } from "react";
import StarRating from "./UI/StarRating";

export default function ReviewSection() {
  const [rating, setRating] = useState(0);

  return (
    <div className="flex flex-col ga-2">
      <p className="text-[#666666] text-[20px] font-medium">
        Rate your experience
      </p>
      <StarRating value={rating} onChange={setRating} />

      <p>Selected rating: {rating}</p>
    </div>
  );
}
