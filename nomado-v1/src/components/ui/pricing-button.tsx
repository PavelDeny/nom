// components/ui/pricing-button.tsx
"use client";

import Link from "next/link";

export interface PricingButtonProps {
  label: string;
  variant: "explorer" | "pro" | "elite";
  href: string;
}

export function PricingButton({ label, variant, href }: PricingButtonProps) {
  const getButtonStyles = () => {
    switch (variant) {
      case "explorer":
        return {
          background: "#2D5B4C",
          hoverBackground: "#1F3A2F",
        };
      case "pro":
        return {
          background: "#f97316",
          hoverBackground: "#ea580c",
        };
      case "elite":
        return {
          background: "linear-gradient(to right, #2D5B4C, #f97316)",
          hoverBackground: "linear-gradient(to right, #1F3A2F, #ea580c)",
        };
      default:
        return {
          background: "#2D5B4C",
          hoverBackground: "#1F3A2F",
        };
    }
  };

  const styles = getButtonStyles();

  return (
    <Link
      href={href}
      style={{
        display: "block",
        background: styles.background,
        color: "white",
        padding: "0.875rem 1.5rem",
        borderRadius: "0.5rem",
        textDecoration: "none",
        fontSize: "0.875rem",
        fontWeight: "600",
        textAlign: "center",
        transition: "all 0.3s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = styles.hoverBackground;
        e.currentTarget.style.transform = "translateY(-2px)";
        e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = styles.background;
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {label}
    </Link>
  );
}
