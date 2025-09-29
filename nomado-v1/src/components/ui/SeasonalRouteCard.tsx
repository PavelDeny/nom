// components/sections/SeasonalRouteCard.tsx
"use client";

import Image from "next/image";

export interface SeasonalRoute {
  id: string;
  name: string;
  image: string;
  season: string;
  locations: string;
  description: string;
  perks: string[];
  icon: string;
}

interface SeasonalRouteCardProps {
  route: SeasonalRoute;
}

export function SeasonalRouteCard({ route }: SeasonalRouteCardProps) {
  const getIconEmoji = (icon: string) => {
    switch (icon) {
      case "Sun":
        return "☀️";
      case "Snowflake":
        return "❄️";
      case "Waves":
        return "🌊";
      case "Mountain":
        return "⛰️";
      default:
        return "📍";
    }
  };

  return (
    <div
      style={{
        border: "1px dashed gray",
        backgroundColor: "#f0f0f0",
        padding: "0.5rem",
        borderRadius: "0.5rem",
        height: "100%",
      }}
    >
      {/* === Изображение === */}
      <div style={{ position: "relative", height: "200px" }}>
        <Image
          src={route.image || "/placeholder.svg"}
          alt={route.name}
          fill
          style={{ objectFit: "cover", borderRadius: "0.5rem" }}
        />
        <div
          style={{
            position: "absolute",
            top: "0.5rem",
            left: "0.5rem",
            backgroundColor: "#2d9c78",
            color: "white",
            padding: "0.25rem 0.5rem",
            borderRadius: "0.25rem",
            fontSize: "0.75rem",
            fontWeight: "bold",
          }}
        >
          Seasonal Route
        </div>
        <div
          style={{
            position: "absolute",
            top: "0.5rem",
            right: "0.5rem",
            backgroundColor: "white",
            color: "#2d9c78",
            padding: "0.25rem 0.5rem",
            borderRadius: "0.25rem",
            fontSize: "0.75rem",
            fontWeight: "bold",
          }}
        >
          {getIconEmoji(route.icon)}
        </div>
      </div>

      {/* === Заголовок и описание === */}
      <div style={{ padding: "0.75rem 0" }}>
        <h3
          style={{
            fontSize: "1.25rem",
            fontWeight: "bold",
            marginBottom: "0.5rem",
          }}
        >
          {route.name}
        </h3>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            marginBottom: "0.75rem",
          }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#2d9c78"
            strokeWidth="2"
          >
            <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span>{route.season}</span>
        </div>
        <p
          style={{ color: "#2d9c78", lineHeight: 1.5, marginBottom: "0.75rem" }}
        >
          {route.description}
        </p>
        <div
          style={{
            backgroundColor: "#e0e0e0",
            padding: "0.5rem",
            borderRadius: "0.25rem",
            fontSize: "0.75rem",
            color: "#2d9c78",
          }}
        >
          <p style={{ fontWeight: "bold", marginBottom: "0.25rem" }}>Route:</p>
          <p>{route.locations}</p>
        </div>
      </div>

      {/* === Перки и кнопка === */}
      <div style={{ padding: "0.75rem 0" }}>
        <div>
          <p style={{ fontWeight: "bold", marginBottom: "0.5rem" }}>
            Seasonal Perks:
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "0.5rem",
            }}
          >
            {route.perks.map((perk, i) => (
              <span
                key={i}
                style={{
                  backgroundColor: "#e0e0e0",
                  color: "#2d9c78",
                  padding: "0.25rem 0.5rem",
                  borderRadius: "0.25rem",
                  fontSize: "0.75rem",
                }}
              >
                {perk}
              </span>
            ))}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: "0.75rem",
          }}
        >
          <div style={{ fontSize: "0.75rem", color: "#666" }}>
            Open {route.season}
          </div>
          <button
            style={{
              backgroundColor: "#2d9c78",
              color: "white",
              padding: "0.5rem 1rem",
              borderRadius: "0.25rem",
              textDecoration: "none",
              fontSize: "0.875rem",
              fontWeight: "bold",
            }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
            >
              <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Plan Visit
          </button>
        </div>
      </div>
    </div>
  );
}
