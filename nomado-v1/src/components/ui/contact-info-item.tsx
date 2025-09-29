// components/ui/contact-info-item.tsx
"use client";

import { ContactIcon } from "./contact-icon";

// === Типы ===
export interface ContactInfoItemProps {
  icon: string;
  title: string;
  content: string;
  description: string;
}

// === Компонент ===
export function ContactInfoItem({
  icon,
  title,
  content,
  description,
}: ContactInfoItemProps) {
  return (
    <div style={{ display: "flex", alignItems: "start", gap: "0.75rem" }}>
      <div
        style={{
          width: "48px",
          height: "48px",
          backgroundColor: "#e0f7f3",
          borderRadius: "0.5rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ContactIcon name={icon} />
      </div>
      <div>
        <p
          style={{
            fontWeight: "bold",
            color: "#2D5B4C",
            marginBottom: "0.25rem",
          }}
        >
          {title}
        </p>
        <p style={{ color: "#2D5B4C", marginBottom: "0.25rem" }}>{content}</p>
        <p style={{ color: "#666", fontSize: "0.875rem" }}>{description}</p>
      </div>
    </div>
  );
}
