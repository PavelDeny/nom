// components/ui/pricing-features.tsx
"use client";

export interface PricingFeaturesProps {
  features: string[];
  variant: "explorer" | "pro" | "elite";
}

export function PricingFeatures({ features, variant }: PricingFeaturesProps) {
  const getCheckmarkColor = () => {
    switch (variant) {
      case "explorer":
        return "#16A34A";
      case "pro":
        return "#f97316";
      case "elite":
        return "#16A34A";
      default:
        return "#16A34A";
    }
  };

  const checkmarkColor = getCheckmarkColor();

  return (
    <div
      style={{
        flex: "1",
        display: "flex",
        flexDirection: "column",
        gap: "0.75rem",
        marginBottom: "1.5rem",
      }}
    >
      {features.map((feature, index) => (
        <div
          key={index}
          style={{ display: "flex", alignItems: "start", gap: "0.75rem" }}
        >
          <div
            style={{
              width: "20px",
              height: "20px",
              backgroundColor: checkmarkColor,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "0.125rem",
              flexShrink: 0,
            }}
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="3"
            >
              <path d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <span
            style={{ color: "#6B7280", fontSize: "0.875rem", lineHeight: 1.4 }}
          >
            {feature}
          </span>
        </div>
      ))}
    </div>
  );
}
