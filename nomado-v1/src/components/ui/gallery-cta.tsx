// components/ui/gallery-cta.tsx
"use client";

// === Типы ===
export interface GalleryCTAProps {
  text?: string;
  onClick?: () => void;
}

// === Компонент ===
export function GalleryCTA({
  text = "Take Virtual Tour",
  onClick,
}: GalleryCTAProps) {
  const containerStyles = {
    textAlign: "center" as const,
    marginTop: "2rem",
  };

  const buttonStyles = {
    backgroundColor: "#2d9c78",
    color: "white",
    padding: "0.75rem 1.5rem",
    borderRadius: "0.25rem",
    fontSize: "1rem",
    fontWeight: "bold" as const,
    border: "none",
    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",
    gap: "0.5rem",
  };

  return (
    <div style={containerStyles}>
      <button style={buttonStyles} onClick={onClick}>
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2"
        >
          <path d="M12 2v2M12 12v2M12 22v2M2 12h2M22 12h2M2 6h2M2 18h2M12 18h2M22 6h2M22 18h2" />
          <path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />
        </svg>
        {text}
      </button>
    </div>
  );
}
