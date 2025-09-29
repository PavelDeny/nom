// components/ui/service-highlight-card.tsx
"use client";

import { ContactIcon } from "./contact-icon";

// === Типы ===
export interface ServiceHighlightCardProps {
  icon: string;
  title: string;
  description: string;
  iconColor?: string;
}

// === Компонент ===
export function ServiceHighlightCard({
  icon,
  title,
  description,
  iconColor = "#2D5B4C",
}: ServiceHighlightCardProps) {
  return (
    <div
      style={{
        border: "1px solid #F9DCC4",
        borderRadius: "0.75rem",
        padding: "1.5rem",
        backgroundColor: "white",
        boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          marginBottom: "0.75rem",
        }}
      >
        <ContactIcon name={icon} size={24} color={iconColor} />
        <h4 style={{ fontWeight: "bold", color: "#2D5B4C" }}>{title}</h4>
      </div>
      <p style={{ color: "#666", fontSize: "0.875rem" }}>{description}</p>
    </div>
  );
}
