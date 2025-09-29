// components/ui/hero-content.tsx
"use client";

export interface HeroContentProps {
  title: string;
  subtitle?: string;
  badgeText?: string;
}

export function HeroContent({ title, subtitle, badgeText }: HeroContentProps) {
  return (
    <div style={{ textAlign: "center", marginBottom: "2rem" }}>
      {/* === Badge === */}
      {badgeText && (
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            backgroundColor: "#f97316",
            color: "white",
            padding: "0.5rem 1rem",
            borderRadius: "2rem",
            fontSize: "0.875rem",
            fontWeight: "bold",
            marginBottom: "1.5rem",
          }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
          >
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
          </svg>
          {badgeText}
        </div>
      )}

      {/* === Заголовок === */}
      <h1
        style={{
          fontSize: "3.5rem",
          fontWeight: "bold",
          background: "linear-gradient(135deg, #2d9c78 0%, #f97316 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          marginBottom: "1rem",
          lineHeight: 1.1,
        }}
      >
        {title}
      </h1>

      {/* === Подзаголовок === */}
      {subtitle && (
        <p
          style={{
            fontSize: "1.25rem",
            color: "#2d9c78",
            maxWidth: "600px",
            margin: "0 auto",
            lineHeight: 1.6,
          }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
