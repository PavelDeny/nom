// components/ui/gallery-grid.tsx
"use client";

import { GalleryItemCard, type GalleryItem } from "./gallery-item-card";

// === Типы ===
export interface GalleryGridProps {
  items: GalleryItem[];
  variant?: "teal" | "orange";
  buttonText?: string;
}

// === Компонент ===
export function GalleryGrid({
  items,
  variant = "teal",
  buttonText,
}: GalleryGridProps) {
  const gridStyles = {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)", // 2x2 сетка
    gap: "1.5rem",
    marginBottom: "2rem",
    backgroundColor: "white", // Белый фон для контента
    borderRadius: "0 0 0.5rem 0.5rem", // Скругленные нижние углы
  };

  return (
    <div style={gridStyles}>
      {items.map((item) => (
        <GalleryItemCard
          key={item.id}
          item={item}
          variant={variant}
          buttonText={buttonText}
        />
      ))}
    </div>
  );
}
