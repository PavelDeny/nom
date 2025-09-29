// components/sections/ReviewsSection.tsx
"use client";

import { ReviewsCarousel } from "@/components/ui/reviews-carousel";
import { ReviewsStats } from "@/components/ui/reviews-stats";
import { SectionHeader } from "@/components/ui/section-header";
import {
  defaultReviews,
  defaultStats,
  type Review,
} from "@/lib/data/reviews-data";

export interface ReviewsSectionProps {
  title?: string;
  subtitle?: string;
  reviews?: Review[];
  stats?: {
    averageRating: number;
    totalReviews: string;
    locationsVisited: string;
  };
}

// === Компонент ===
export function ReviewsSection({
  title = "What Our Nomads Say",
  subtitle = "Join over 10,000 digital nomads who've transformed their work and life with Nomado Breeze",
  reviews = defaultReviews,
  stats = defaultStats,
}: ReviewsSectionProps) {
  return (
    <section
      id="reviews"
      style={{ backgroundColor: "#F8FDFB", padding: "4rem 0" }}
    >
      <div className="container mx-auto px-4">
        <SectionHeader title={title} subtitle={subtitle} />

        <ReviewsCarousel reviews={reviews} />

        <ReviewsStats {...stats} />
      </div>
    </section>
  );
}
