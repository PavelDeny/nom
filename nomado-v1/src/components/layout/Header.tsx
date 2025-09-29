// components/layout/Header.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { Navigation } from "./Navigation";

export interface HeaderProps {
  logoSrc?: string;
  logoAlt?: string;
  brandName?: string;
  tagline?: string;
  showNavigation?: boolean;
  showAdminLink?: boolean;
}

export function Header({
  logoSrc = "/images/nomado-breeze-logo.png",
  logoAlt = "Nomado Breeze Logo",
  brandName = "Nomado Breeze",
  tagline = "Follow the Nomad Breeze Plan",
  showNavigation = true,
  showAdminLink = true,
}: HeaderProps) {
  return (
    <header style={{ backgroundColor: "white", padding: "1rem 0" }}>
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* === Логотип и бренд === */}
        <Link
          href="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            textDecoration: "none",
          }}
        >
          {/* Логотип */}
          <div
            style={{
              width: "48px",
              height: "48px",
              backgroundColor: "#F5F5DC", // светло-бежевый фон
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "8px",
            }}
          >
            <Image
              src={logoSrc}
              alt={logoAlt}
              width={32}
              height={32}
              style={{ objectFit: "contain" }}
            />
          </div>

          {/* Название бренда */}
          <div>
            <div
              style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
            >
              <span
                style={{
                  color: "#2D5B4C",
                  fontWeight: "bold",
                  fontSize: "1.5rem",
                }}
              >
                {brandName}
              </span>
            </div>
            <p
              style={{
                color: "#A8D5BA",
                fontSize: "0.75rem",
                margin: 0,
                marginTop: "-0.25rem",
              }}
            >
              {tagline}
            </p>
          </div>
        </Link>

        {/* === Навигация === */}
        {showNavigation && <Navigation />}

        {/* === Кнопки справа === */}
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          {showAdminLink && (
            <Link href="/admin" style={{ textDecoration: "none" }}>
              <button
                style={{
                  border: "1px solid #2D5B4C",
                  color: "#2D5B4C",
                  backgroundColor: "white",
                  padding: "0.5rem 1rem",
                  borderRadius: "0.5rem",
                  fontSize: "0.875rem",
                  fontWeight: "500",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#2D5B4C";
                  e.currentTarget.style.color = "white";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "white";
                  e.currentTarget.style.color = "#2D5B4C";
                }}
              >
                {/* Иконка глобуса */}
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M2 12h20" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
                Admin
              </button>
            </Link>
          )}

          <Link href="/booking" style={{ textDecoration: "none" }}>
            <button
              style={{
                backgroundColor: "#f97316",
                color: "white",
                padding: "0.5rem 1rem",
                borderRadius: "0.5rem",
                fontSize: "0.875rem",
                fontWeight: "600",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                boxShadow: "0 2px 4px rgba(249, 115, 22, 0.3)",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#ea580c";
                e.currentTarget.style.transform = "translateY(-1px)";
                e.currentTarget.style.boxShadow =
                  "0 4px 8px rgba(249, 115, 22, 0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#f97316";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow =
                  "0 2px 4px rgba(249, 115, 22, 0.3)";
              }}
            >
              {/* Иконка календаря */}
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              Book Now
            </button>
          </Link>
        </div>
      </div>
    </header>
  );
}
