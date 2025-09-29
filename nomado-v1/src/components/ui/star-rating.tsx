// components/ui/star-rating.tsx
"use client";

// === Типы ===
export interface StarRatingProps {
  rating: number;
  size?: "sm" | "md" | "lg";
}

// === Компонент ===
export function StarRating({ rating, size = "md" }: StarRatingProps) {
  const sizeMap = {
    sm: { width: 12, height: 12 },
    md: { width: 16, height: 16 },
    lg: { width: 20, height: 20 },
  };

  const { width, height } = sizeMap[size];

  return (
    <div style={{ display: "flex" }}>
      {Array.from({ length: 5 }, (_, i) => {
        const isHalfStar = i === Math.floor(rating) && rating % 1 !== 0;
        const isFullStar =
          i < Math.floor(rating) ||
          (i === Math.floor(rating) && rating % 1 === 0);

        return (
          <svg
            key={i}
            width={width}
            height={height}
            viewBox="0 0 24 24"
            fill={isFullStar ? "#f97316" : isHalfStar ? "#f97316" : "#e5e7eb"}
            stroke="#e5e7eb"
            strokeWidth="2"
            className="inline-block"
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        );
      })}
    </div>
  );
}
