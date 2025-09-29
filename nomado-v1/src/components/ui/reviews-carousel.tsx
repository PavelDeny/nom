// components/ui/reviews-carousel.tsx
"use client";

import { useState, useCallback, useEffect } from "react";
import { ReviewCard, type Review } from "./review-card";

// === Типы ===
export interface ReviewsCarouselProps {
  reviews: Review[];
  autoRotateInterval?: number;
}

// === Компонент ===
export function ReviewsCarousel({
  reviews,
  autoRotateInterval = 5000,
}: ReviewsCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Вычисляем количество слайдов (по 3 карточки на слайд)
  const totalSlides = Math.ceil(reviews.length / 3);

  // Получаем карточки для текущего слайда
  const getCurrentSlideReviews = () => {
    const startIndex = currentSlide * 3;
    return reviews.slice(startIndex, startIndex + 3);
  };

  // Автоматическое перелистывание
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % totalSlides);
    }, autoRotateInterval);

    return () => clearInterval(interval);
  }, [totalSlides, autoRotateInterval]);

  const scrollTo = useCallback((slideIndex: number) => {
    setCurrentSlide(slideIndex);
  }, []);

  return (
    <div style={{ marginBottom: "2rem" }}>
      {/* === Сетка из 3 карточек === */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "1.5rem",
          marginBottom: "1.5rem",
        }}
      >
        {getCurrentSlideReviews().map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>

      {/* === Индикаторы слайдов === */}
      <div style={{ display: "flex", justifyContent: "center", gap: "0.5rem" }}>
        {Array.from({ length: totalSlides }, (_, index) => (
          <button
            key={index}
            onClick={() => scrollTo(index)}
            style={{
              width: "12px",
              height: "12px",
              borderRadius: "50%",
              backgroundColor: index === currentSlide ? "#6B9080" : "#D9D9D9",
              transition: "background-color 0.3s ease",
              cursor: "pointer",
              border: "none",
            }}
          />
        ))}
      </div>
    </div>
  );
}
