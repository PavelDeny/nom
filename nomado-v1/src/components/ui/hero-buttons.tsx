// components/ui/hero-buttons.tsx
"use client";

export interface HeroButtonsProps {
  primaryButtonText?: string;
  primaryButtonHref?: string;
  secondaryButtonText?: string;
}

export function HeroButtons({
  primaryButtonText = "Start Your Workation",
  primaryButtonHref = "/test",
  secondaryButtonText = "Watch Demo",
}: HeroButtonsProps) {
  return (
    <div
      style={{
        display: "flex",
        gap: "1rem",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "wrap",
      }}
    >
      {/* === Основная кнопка === */}
      <a
        href={primaryButtonHref}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "0.5rem",
          backgroundColor: "#f97316",
          color: "white",
          padding: "1rem 2rem",
          borderRadius: "0.5rem",
          textDecoration: "none",
          fontSize: "1.125rem",
          fontWeight: "bold",
          boxShadow: "0 4px 14px 0 rgba(249, 115, 22, 0.39)",
          transition: "all 0.3s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-2px)";
          e.currentTarget.style.boxShadow =
            "0 6px 20px 0 rgba(249, 115, 22, 0.5)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow =
            "0 4px 14px 0 rgba(249, 115, 22, 0.39)";
        }}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2"
        >
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
        </svg>
        {primaryButtonText}
      </a>

      {/* === Вторичная кнопка === */}
      <button
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "0.5rem",
          backgroundColor: "transparent",
          color: "#2d9c78",
          border: "2px solid #2d9c78",
          padding: "1rem 2rem",
          borderRadius: "0.5rem",
          fontSize: "1.125rem",
          fontWeight: "bold",
          cursor: "pointer",
          transition: "all 0.3s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = "#2d9c78";
          e.currentTarget.style.color = "white";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "transparent";
          e.currentTarget.style.color = "#2d9c78";
        }}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <polygon points="5,3 19,12 5,21" />
        </svg>
        {secondaryButtonText}
      </button>
    </div>
  );
}
