// components/ui/reviews-stats.tsx
"use client";

import { StarRating } from "./star-rating";

// === Типы ===
export interface ReviewsStatsProps {
  averageRating: number;
  totalReviews: string;
  locationsVisited: string;
}

// === Компонент ===
export function ReviewsStats({
  averageRating,
  totalReviews,
  locationsVisited,
}: ReviewsStatsProps) {
  return (
    <div style={{ textAlign: "center" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "white",
          padding: "1.5rem",
          borderRadius: "0.75rem",
          border: "1px solid #F9DCC4",
          boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
          maxWidth: "600px",
          margin: "0 auto",
        }}
      >
        {/* === Средний рейтинг === */}
        <div style={{ textAlign: "center", flex: 1 }}>
          <div
            style={{
              fontSize: "1.75rem",
              fontWeight: "bold",
              color: "#2D5B4C",
              marginBottom: "0.5rem",
            }}
          >
            {averageRating}
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "0.125rem",
              marginBottom: "0.5rem",
            }}
          >
            <StarRating rating={5} size="md" />
          </div>
          <div
            style={{
              fontSize: "0.875rem",
              color: "#2D5B4C",
              fontWeight: "500",
            }}
          >
            Average Rating
          </div>
        </div>

        {/* === Разделитель === */}
        <div
          style={{
            width: "1px",
            height: "60px",
            backgroundColor: "#D9D9D9",
            margin: "0 1rem",
          }}
        ></div>

        {/* === Общее количество отзывов === */}
        <div style={{ textAlign: "center", flex: 1 }}>
          <div
            style={{
              fontSize: "1.75rem",
              fontWeight: "bold",
              color: "#2D5B4C",
              marginBottom: "0.5rem",
            }}
          >
            {totalReviews}
          </div>
          <div
            style={{
              fontSize: "0.875rem",
              color: "#2D5B4C",
              fontWeight: "500",
            }}
          >
            Happy Nomads
          </div>
        </div>

        {/* === Разделитель === */}
        <div
          style={{
            width: "1px",
            height: "60px",
            backgroundColor: "#D9D9D9",
            margin: "0 1rem",
          }}
        ></div>

        {/* === Количество локаций === */}
        <div style={{ textAlign: "center", flex: 1 }}>
          <div
            style={{
              fontSize: "1.75rem",
              fontWeight: "bold",
              color: "#2D5B4C",
              marginBottom: "0.5rem",
            }}
          >
            {locationsVisited}
          </div>
          <div
            style={{
              fontSize: "0.875rem",
              color: "#2D5B4C",
              fontWeight: "500",
            }}
          >
            Locations Visited
          </div>
        </div>
      </div>
    </div>
  );
}
