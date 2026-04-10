import { useState } from "react";
import { Star } from "lucide-react";

import Button from "./Button";

export default function StarRating({ value = 0, onChange, disabled = false }) {
  const [hoveredRating, setHoveredRating] = useState(0);

  const activeRating = hoveredRating || value;

  return (
    <div
      className="flex gap-4.5"
      onMouseLeave={() => {
        if (disabled) return;
        setHoveredRating(0);
      }}
    >
      {[1, 2, 3, 4, 5].map((starValue) => {
        const isActive = starValue <= activeRating;

        return (
          <Button
            key={starValue}
            type="button"
            disabled={disabled}
            className="cursor-pointer"
            onMouseEnter={() => {
              if (disabled) return;
              setHoveredRating(starValue);
            }}
            onClick={() => {
              if (disabled) return;
              onChange?.(starValue);
            }}
          >
            <Star
              className={`w-12.5 h-12.5 ${isActive ? "fill-[#F4A316] text-[#F4A316]" : "text-gray-300"}`}
            />
          </Button>
        );
      })}
    </div>
  );
}
