// components/ui/review-card.tsx
"use client";

import { StarRating } from "./star-rating";

// === Типы ===
export interface Review {
  id: string;
  name: string;
  role: string;
  image: string;
  rating: number;
  review: string;
  location: string;
  verified: boolean;
}

export interface ReviewCardProps {
  review: Review;
}

// === Компонент ===
export function ReviewCard({ review }: ReviewCardProps) {
  return (
    <div
      style={{
        border: "1px solid #F9DCC4",
        backgroundColor: "white",
        padding: "1.5rem",
        borderRadius: "0.75rem",
        boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
        minHeight: "280px",
      }}
    >
      {/* === Заголовок и аватар === */}
      <div
        style={{
          display: "flex",
          alignItems: "start",
          gap: "0.75rem",
          marginBottom: "1rem",
        }}
      >
        <div
          style={{
            width: "48px",
            height: "48px",
            borderRadius: "50%",
            backgroundColor: "#e0f7f3",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#2d9c78",
            fontSize: "1.25rem",
            fontWeight: "bold",
          }}
        >
          {review.name
            .split(" ")
            .map((n) => n[0])
            .join("")}
        </div>
        <div style={{ flex: 1 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              marginBottom: "0.25rem",
            }}
          >
            <h3
              style={{ fontSize: "1rem", fontWeight: "bold", color: "#2D5B4C" }}
            >
              {review.name}
            </h3>
            {review.verified && (
              <span
                style={{
                  backgroundColor: "#e0f7f3",
                  color: "#2d9c78",
                  padding: "0.125rem 0.375rem",
                  borderRadius: "0.75rem",
                  fontSize: "0.625rem",
                  fontWeight: "bold",
                }}
              >
                Verified
              </span>
            )}
          </div>
          <p
            style={{
              fontSize: "0.875rem",
              color: "#2D5B4C",
              marginBottom: "0.5rem",
            }}
          >
            {review.role}
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <StarRating rating={review.rating} />
            <span style={{ fontSize: "0.75rem", color: "#666" }}>
              {review.location}
            </span>
          </div>
        </div>
      </div>

      {/* === Текст отзыва === */}
      <div style={{ color: "#2D5B4C", lineHeight: 1.5, fontSize: "0.875rem" }}>
        &ldquo;{review.review}&rdquo;
      </div>
    </div>
  );
}
