// components/sections/ComingSoonCard.tsx
"use client";

import Image from "next/image";

export interface ComingSoonLocation {
  id: string;
  name: string;
  image: string;
  openingDate: string;
  description: string;
  concept: string;
  features: string[];
}

interface ComingSoonCardProps {
  location: ComingSoonLocation;
}

export function ComingSoonCard({ location }: ComingSoonCardProps) {
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
          src={location.image || "/placeholder.svg"}
          alt={`Coming soon to ${location.name}`}
          fill
          style={{ objectFit: "cover", borderRadius: "0.5rem" }}
        />
        <div
          style={{
            position: "absolute",
            top: "0.5rem",
            left: "0.5rem",
            backgroundColor: "#f97316",
            color: "white",
            padding: "0.25rem 0.5rem",
            borderRadius: "0.25rem",
            fontSize: "0.75rem",
            fontWeight: "bold",
          }}
        >
          Coming Soon
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
          {location.openingDate}
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
          {location.name}
        </h3>
        <p
          style={{ color: "#2d9c78", lineHeight: 1.5, marginBottom: "0.75rem" }}
        >
          {location.description}
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
          <p style={{ fontWeight: "bold", marginBottom: "0.25rem" }}>
            Concept Preview:
          </p>
          <p>{location.concept}</p>
        </div>
      </div>

      {/* === Фичи и кнопка === */}
      <div style={{ padding: "0.75rem 0" }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
          {location.features.map((feature, i) => (
            <span
              key={i}
              style={{
                backgroundColor: "#f97316",
                color: "white",
                padding: "0.25rem 0.5rem",
                borderRadius: "0.25rem",
                fontSize: "0.75rem",
              }}
            >
              {feature}
            </span>
          ))}
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
            Opening {location.openingDate}
          </div>
          <button
            style={{
              border: "1px solid #f97316",
              color: "#f97316",
              padding: "0.5rem 1rem",
              borderRadius: "0.25rem",
              backgroundColor: "white",
              fontSize: "0.875rem",
              fontWeight: "bold",
            }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#f97316"
              strokeWidth="2"
            >
              <path d="M15 17h4v2a2 2 0 01-2 2H5a2 2 0 01-2-2v-2h4l1-4h8a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v2a2 2 0 002 2h10l-1 4H9a2 2 0 00-2 2v2a2 2 0 002 2h6z" />
            </svg>
            Get Notified
          </button>
        </div>
      </div>
    </div>
  );
}
