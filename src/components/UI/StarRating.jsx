import { useState } from "react";
import { Star } from "lucide-react";
import Button from "./Button";

export default function StarRating({ value, onChange }) {
  const [hoveredRating, setHoveredRating] = useState(0);

  const activeRating = hoveredRating || value;

  return (
    <div className="flex gap-4.5" onMouseLeave={() => setHoveredRating(0)}>
      {[1, 2, 3, 4, 5].map((starValue) => {
        const isActive = starValue <= activeRating;

        return (
          <Star
            key={starValue}
            className={`w-12.5 h-12.5 cursor-pointer ${isActive ? "fill-[#F4A316] text-[#F4A316]" : "text-gray-300"}`}
            onMouseEnter={() => setHoveredRating(starValue)}
            onClick={() => onChange?.(starValue)}
          />
        );
      })}
    </div>
  );
}
