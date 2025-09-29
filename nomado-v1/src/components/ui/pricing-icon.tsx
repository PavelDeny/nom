// components/ui/pricing-icon.tsx
"use client";

export interface PricingIconProps {
  icon: "briefcase" | "crown" | "award";
  variant: "explorer" | "pro" | "elite";
}

// === Карта иконок ===
const iconMap = {
  briefcase: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
      <rect width="20" height="14" x="2" y="6" rx="2"></rect>
    </svg>
  ),
  crown: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M11.562 3.266a.5.5 0 0 1 .876 0L15.39 8.87a1 1 0 0 0 1.516.294L21.183 5.5a.5.5 0 0 1 .798.519l-2.834 10.246a1 1 0 0 1-.956.734H5.81a1 1 0 0 1-.957-.734L2.02 6.02a.5.5 0 0 1 .798-.519l4.276 3.664a1 1 0 0 0 1.516-.294z"></path>
      <path d="M5 21h14"></path>
    </svg>
  ),
  award: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526"></path>
      <circle cx="12" cy="8" r="6"></circle>
    </svg>
  ),
};

export function PricingIcon({ icon, variant }: PricingIconProps) {
  const getIconStyles = () => {
    switch (variant) {
      case "explorer":
        return {
          backgroundColor: "#E0F7F3",
          color: "#2D5B4C",
        };
      case "pro":
        return {
          backgroundColor: "#FEF3C7",
          color: "#f97316",
        };
      case "elite":
        return {
          backgroundColor: "#E0F7F3",
          color: "#2D5B4C",
        };
      default:
        return {
          backgroundColor: "#E0F7F3",
          color: "#2D5B4C",
        };
    }
  };

  const styles = getIconStyles();

  return (
    <div
      style={{
        width: "64px",
        height: "64px",
        backgroundColor: styles.backgroundColor,
        color: styles.color,
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: "0 auto 1rem",
      }}
    >
      <div style={{ fontSize: "1.5rem" }}>
        {iconMap[icon] && iconMap[icon]()}
      </div>
    </div>
  );
}
