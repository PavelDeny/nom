// components/layout/Footer.tsx
"use client";

import Image from "next/image";

// === Компонент флагов ===
const FlagIcon = ({ country }: { country: string }) => {
  const flags = {
    Indonesia: () => (
      <svg width="16" height="12" viewBox="0 0 16 12">
        <rect width="16" height="6" fill="#FF0000" />
        <rect y="6" width="16" height="6" fill="#FFFFFF" />
      </svg>
    ),
    Mexico: () => (
      <svg width="16" height="12" viewBox="0 0 16 12">
        <rect width="5.33" height="12" fill="#006847" />
        <rect x="5.33" width="5.33" height="12" fill="#FFFFFF" />
        <rect x="10.67" width="5.33" height="12" fill="#CE1126" />
        <circle cx="8" cy="6" r="1.5" fill="#006847" />
      </svg>
    ),
    "Costa Rica": () => (
      <svg width="16" height="12" viewBox="0 0 16 12">
        <rect width="16" height="2.4" fill="#002B7F" />
        <rect y="2.4" width="16" height="1.2" fill="#FFFFFF" />
        <rect y="3.6" width="16" height="2.4" fill="#CE1126" />
        <rect y="6" width="16" height="1.2" fill="#FFFFFF" />
        <rect y="7.2" width="16" height="2.4" fill="#002B7F" />
      </svg>
    ),
    Portugal: () => (
      <svg width="16" height="12" viewBox="0 0 16 12">
        <rect width="8" height="12" fill="#046A38" />
        <rect x="8" width="8" height="12" fill="#DA020E" />
        <circle cx="8" cy="6" r="2" fill="#FFD700" />
      </svg>
    ),
    Thailand: () => (
      <svg width="16" height="12" viewBox="0 0 16 12">
        <rect width="16" height="2.4" fill="#ED1C24" />
        <rect y="2.4" width="16" height="1.2" fill="#FFFFFF" />
        <rect y="3.6" width="16" height="2.4" fill="#241F4B" />
        <rect y="6" width="16" height="1.2" fill="#FFFFFF" />
        <rect y="7.2" width="16" height="2.4" fill="#ED1C24" />
      </svg>
    ),
    Greece: () => (
      <svg width="16" height="12" viewBox="0 0 16 12">
        <rect width="16" height="12" fill="#0D5EAF" />
        <rect y="0" width="16" height="1.33" fill="#FFFFFF" />
        <rect y="2.67" width="16" height="1.33" fill="#FFFFFF" />
        <rect y="5.33" width="16" height="1.33" fill="#FFFFFF" />
        <rect y="8" width="16" height="1.33" fill="#FFFFFF" />
        <rect y="10.67" width="16" height="1.33" fill="#FFFFFF" />
        <rect x="0" y="0" width="5.33" height="5.33" fill="#FFFFFF" />
        <rect x="1.33" y="1.33" width="2.67" height="1.33" fill="#0D5EAF" />
        <rect x="1.33" y="3.33" width="2.67" height="1.33" fill="#0D5EAF" />
      </svg>
    ),
  };

  const FlagComponent = flags[country as keyof typeof flags];
  return FlagComponent ? <FlagComponent /> : null;
};

export interface FooterProps {
  logoSrc?: string;
  logoAlt?: string;
  brandName?: string;
  tagline?: string;
  description?: string;
  socialLinks?: Array<{
    name: string;
    href: string;
  }>;
  locations?: Array<{
    flag: string;
    text: string;
  }>;
  services?: string[];
  companyLinks?: string[];
}

// === Дефолтные значения ===
const defaultSocialLinks = [
  { name: "Instagram", href: "#" },
  { name: "Twitter", href: "#" },
  { name: "LinkedIn", href: "#" },
  { name: "YouTube", href: "#" },
];

const defaultLocations = [
  { flag: "Indonesia", text: "Bali, Indonesia" },
  { flag: "Mexico", text: "Tulum, Mexico" },
  { flag: "Costa Rica", text: "Costa Rica" },
  { flag: "Portugal", text: "Lisbon, Portugal (Soon)" },
  { flag: "Thailand", text: "Thailand (Soon)" },
  { flag: "Greece", text: "Greece (Soon)" },
];

const defaultServices = [
  "Day Passes",
  "Monthly Memberships",
  "Premium Subscriptions",
  "Equipment Rental",
  "Team Bookings",
  "Custom Workations",
];

const defaultCompanyLinks = [
  "About Our Mission",
  "Sustainability Report",
  "Nomad Resources",
  "Partner With Us",
  "Careers",
  "Press Kit",
];

export function Footer({
  logoSrc = "/images/nomado-breeze-logo.png",
  logoAlt = "Nomado Breeze Logo",
  brandName = "Nomado Breeze",
  tagline = "Follow the Nomad Breeze Plan",
  description = "Empowering digital nomads with premium mobile coworking spaces, professional equipment rental, and exclusive workation experiences in paradise locations worldwide.",
  socialLinks = defaultSocialLinks,
  locations = defaultLocations,
  services = defaultServices,
  companyLinks = defaultCompanyLinks,
}: FooterProps) {
  return (
    <footer style={{ backgroundColor: "#2D5B4C", padding: "4rem 0 2rem" }}>
      <div className="container mx-auto px-4">
        {/* === Основной контент === */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr 1fr",
            gap: "3rem",
            marginBottom: "3rem",
          }}
        >
          {/* === Логотип и описание === */}
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                marginBottom: "1rem",
              }}
            >
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  backgroundColor: "white",
                  borderRadius: "0.5rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Image
                  src={logoSrc || "/placeholder.svg"}
                  alt={logoAlt}
                  width={24}
                  height={24}
                  style={{ objectFit: "contain" }}
                />
              </div>
              <div>
                <h3
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: "bold",
                    color: "white",
                    margin: 0,
                  }}
                >
                  {brandName}
                </h3>
                <p
                  style={{ fontSize: "0.875rem", color: "#A8D5BA", margin: 0 }}
                >
                  {tagline}
                </p>
              </div>
            </div>

            <p
              style={{
                color: "#A8D5BA",
                marginBottom: "1.5rem",
                lineHeight: 1.6,
                fontSize: "0.875rem",
              }}
            >
              {description}
            </p>

            {/* === Социальные сети === */}
            <div style={{ display: "flex", gap: "0.75rem" }}>
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  style={{
                    border: "1px solid #A8D5BA",
                    color: "#A8D5BA",
                    padding: "0.5rem 1rem",
                    borderRadius: "0.5rem",
                    textDecoration: "none",
                    fontSize: "0.875rem",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#A8D5BA";
                    e.currentTarget.style.color = "#2D5B4C";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                    e.currentTarget.style.color = "#A8D5BA";
                  }}
                >
                  {social.name}
                </a>
              ))}
            </div>
          </div>

          {/* === Locations === */}
          <div>
            <h4
              style={{
                fontWeight: "bold",
                fontSize: "1.125rem",
                color: "#ffffff",
                marginBottom: "1rem",
              }}
            >
              Locations
            </h4>
            <ul style={{ listStyle: "none", paddingLeft: "0", margin: 0 }}>
              {locations.map((location, index) => (
                <li
                  key={index}
                  style={{
                    margin: "0.5rem 0",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  <FlagIcon country={location.flag} />
                  <span style={{ color: "#A8D5BA", fontSize: "0.875rem" }}>
                    {location.text}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* === Services === */}
          <div>
            <h4
              style={{
                fontWeight: "bold",
                fontSize: "1.125rem",
                color: "white",
                marginBottom: "1rem",
              }}
            >
              Services
            </h4>
            <ul style={{ listStyle: "none", paddingLeft: "0", margin: 0 }}>
              {services.map((service, index) => (
                <li key={index} style={{ margin: "0.5rem 0" }}>
                  <span style={{ color: "#A8D5BA", fontSize: "0.875rem" }}>
                    {service}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* === Company === */}
          <div>
            <h4
              style={{
                fontWeight: "bold",
                fontSize: "1.125rem",
                color: "white",
                marginBottom: "1rem",
              }}
            >
              Company
            </h4>
            <ul style={{ listStyle: "none", paddingLeft: "0", margin: 0 }}>
              {companyLinks.map((link, index) => (
                <li key={index} style={{ margin: "0.5rem 0" }}>
                  <span style={{ color: "#A8D5BA", fontSize: "0.875rem" }}>
                    {link}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* === Нижняя часть: copyright === */}
        <div
          style={{
            borderTop: "1px solid #A8D5BA",
            paddingTop: "2rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          <p style={{ color: "#A8D5BA", fontSize: "0.875rem", margin: 0 }}>
            &copy; 2025 {brandName}. {tagline} - Your workation booking
            coworking around the world.
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#A8D5BA"
              strokeWidth="2"
            >
              <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
            </svg>
          </div>
        </div>
      </div>
    </footer>
  );
}
