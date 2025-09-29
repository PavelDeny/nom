// components/ui/contact-icon.tsx
"use client";

// === Типы ===
export interface ContactIconProps {
  name: string;
  size?: number;
  color?: string;
}

// === Карта иконок ===
const iconMap = {
  Mail: ({
    size = 24,
    color = "#2d9c78",
  }: {
    size?: number;
    color?: string;
  }) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
    >
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <path d="M22 6l-10 7L2 6" />
    </svg>
  ),
  Phone: ({
    size = 24,
    color = "#2d9c78",
  }: {
    size?: number;
    color?: string;
  }) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-3" />
      <path d="M16 3.08v3a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V3.08" />
      <path d="M14 10v4a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-4" />
      <path d="M16 10v4a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-4" />
    </svg>
  ),
  MapPin: ({
    size = 24,
    color = "#2d9c78",
  }: {
    size?: number;
    color?: string;
  }) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
    >
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
      <circle cx="12" cy="9" r="1" />
    </svg>
  ),
  Clock: ({
    size = 24,
    color = "#2D5B4C",
  }: {
    size?: number;
    color?: string;
  }) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  ),
  Globe: ({
    size = 24,
    color = "#F9A825",
  }: {
    size?: number;
    color?: string;
  }) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20" />
      <path d="M12 2v20" />
    </svg>
  ),
  Lightning: ({
    size = 24,
    color = "white",
  }: {
    size?: number;
    color?: string;
  }) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
    >
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  ),
};

// === Компонент ===
export function ContactIcon({ name, size, color }: ContactIconProps) {
  const IconComponent = iconMap[name as keyof typeof iconMap];

  if (!IconComponent) {
    return null;
  }

  return <IconComponent size={size} color={color} />;
}
