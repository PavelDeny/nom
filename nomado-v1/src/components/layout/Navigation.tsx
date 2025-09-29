// components/layout/Navigation.tsx
"use client";

export interface NavigationProps {
  links?: Array<{
    href: string;
    label: string;
  }>;
}

const defaultLinks = [
  { href: "#locations", label: "Locations" },
  { href: "#features", label: "Features" },
  { href: "#gallery", label: "Gallery" },
  { href: "#reviews", label: "Reviews" },
  { href: "#pricing", label: "Pricing" },
  { href: "#contact", label: "Contact" },
];

export function Navigation({ links = defaultLinks }: NavigationProps) {
  return (
    <nav style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
      {links.map((link) => (
        <a
          key={link.href}
          href={link.href}
          style={{
            color: "#2D5B4C",
            textDecoration: "none",
            fontWeight: "500",
            fontSize: "0.875rem",
            transition: "color 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "#f97316";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "#2D5B4C";
          }}
        >
          {link.label}
        </a>
      ))}
    </nav>
  );
}
