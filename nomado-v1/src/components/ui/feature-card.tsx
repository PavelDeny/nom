// components/ui/feature-card.tsx
"use client";

import { Icon } from "./icon";

export interface FeatureCardProps {
  id: string;
  icon: string;
  title: string;
  description: string;
  color: string;
  iconColor: string;
}

export function FeatureCard({
  icon,
  title,
  description,
  color,
}: FeatureCardProps) {
  return (
    <div
      style={{
        backgroundColor: "white",
        borderRadius: "1rem",
        padding: "2rem",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* === Иконка === */}
      <div
        style={{
          width: "64px",
          height: "64px",
          backgroundColor: color.includes("teal") ? "#E0F7F3" : "#FFF4E6",
          borderRadius: "0.75rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "1.5rem",
        }}
      >
        <div
          style={{
            color: color.includes("teal") ? "#2D5B4C" : "#f97316",
            fontSize: "1.5rem",
          }}
        >
          <Icon
            name={
              icon as
                | "Laptop"
                | "Wifi"
                | "Monitor"
                | "Leaf"
                | "Users"
                | "Shield"
            }
          />
        </div>
      </div>

      {/* === Заголовок и описание === */}
      <div>
        <h3
          style={{
            fontSize: "1.25rem",
            fontWeight: "bold",
            marginBottom: "0.75rem",
            color: "#2D5B4C",
          }}
        >
          {title}
        </h3>
        <p
          style={{
            color: "#2D5B4C",
            lineHeight: 1.6,
            fontSize: "0.875rem",
          }}
        >
          {description}
        </p>
      </div>
    </div>
  );
}
