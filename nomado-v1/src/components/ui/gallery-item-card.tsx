// components/ui/gallery-item-card.tsx
"use client";

import Image from "next/image";

// === Типы ===
export interface GalleryItem {
  id: string;
  title: string;
  description: string;
  image: string;
  icon: React.ReactNode;
  features: string[];
}

export interface GalleryItemCardProps {
  item: GalleryItem;
  variant?: "teal" | "orange";
  buttonText?: string;
}

// === Компонент ===
export function GalleryItemCard({
  item,
  buttonText = "Learn More",
}: GalleryItemCardProps) {
  const cardStyles = {
    backgroundColor: "white",
    borderRadius: "0.5rem",
    overflow: "hidden",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    height: "100%",
    display: "flex",
    flexDirection: "column" as const,
  };

  const imageContainerStyles = {
    position: "relative" as const,
    height: "200px",
    overflow: "hidden",
  };

  const iconStyles = {
    position: "absolute" as const,
    top: "1rem",
    left: "1rem",
    width: "40px",
    height: "40px",
    backgroundColor: "#E0F2F1", // Светло-зеленый фон
    color: "#2E7D60", // Темно-зеленый иконка
    borderRadius: "0.5rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
  };

  const contentStyles = {
    padding: "1.5rem",
    flex: 1,
    display: "flex",
    flexDirection: "column" as const,
  };

  const titleStyles = {
    fontSize: "1.25rem",
    fontWeight: "bold",
    color: "#2E7D60", // Темно-зеленый заголовок
    marginBottom: "0.75rem",
    lineHeight: 1.3,
  };

  const descriptionStyles = {
    color: "#333333", // Темно-серый текст
    fontSize: "0.875rem",
    lineHeight: 1.5,
    marginBottom: "1rem",
    flex: 1,
  };

  const featuresContainerStyles = {
    display: "flex",
    flexWrap: "wrap" as const,
    gap: "0.5rem",
    marginBottom: "1rem",
  };

  const featureStyles = {
    backgroundColor: "#E0F2F1", // Светло-зеленый фон
    color: "#2E7D60", // Темно-зеленый текст
    padding: "0.25rem 0.75rem",
    borderRadius: "1rem",
    fontSize: "0.75rem",
    fontWeight: "500",
  };

  const buttonStyles = {
    backgroundColor: "transparent",
    color: "#2E7D60", // Темно-зеленый текст
    border: "1px solid #2E7D60", // Темно-зеленая граница
    padding: "0.5rem 1rem",
    borderRadius: "0.5rem",
    fontSize: "0.875rem",
    fontWeight: "500",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    transition: "all 0.2s ease",
    alignSelf: "flex-start",
  };

  return (
    <div style={cardStyles}>
      {/* === Изображение с иконкой === */}
      <div style={imageContainerStyles}>
        <Image
          src={item.image || "/placeholder.svg"}
          alt={item.title}
          fill
          style={{ objectFit: "cover" }}
        />
        <div style={iconStyles}>{item.icon}</div>
      </div>

      {/* === Контент === */}
      <div style={contentStyles}>
        <h3 style={titleStyles}>{item.title}</h3>

        <p style={descriptionStyles}>{item.description}</p>

        {/* === Теги (только первые 2) === */}
        <div style={featuresContainerStyles}>
          {item.features.slice(0, 2).map((feature) => (
            <span key={feature} style={featureStyles}>
              {feature}
            </span>
          ))}
        </div>

        {/* === Кнопка === */}
        <button style={buttonStyles}>
          {buttonText}
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
