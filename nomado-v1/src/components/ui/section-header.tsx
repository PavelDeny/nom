// components/ui/section-header.tsx
"use client";

export interface SectionHeaderProps {
  title: string;
  subtitle?: string;
}

export function SectionHeader({ title, subtitle }: SectionHeaderProps) {
  return (
    <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
      <h2
        style={{
          fontSize: "3rem",
          fontWeight: "bold",
          color: "#2d9c78",
          marginBottom: "1rem",
        }}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          style={{
            fontSize: "1.25rem",
            color: "#2d9c78",
            maxWidth: "700px",
            margin: "0 auto",
          }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
