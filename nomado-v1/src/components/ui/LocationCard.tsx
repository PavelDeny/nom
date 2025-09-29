// components/sections/LocationCard.tsx
"use client";

import Image from "next/image";
import Link from "next/link";

export interface Location {
  id: string;
  name: string;
  image: string;
  price: string;
  rating: number;
  description: string;
  openingHours: string;
  features: string[];
}

interface LocationCardProps {
  location: Location;
}

export function LocationCard({ location }: LocationCardProps) {
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
          alt={`Nomado Breeze in ${location.name}`}
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
          Active Now
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
          <span style={{ marginRight: "0.25rem" }}>★</span>
          {location.rating}
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
      </div>

      {/* === Открытие и фичи === */}
      <div style={{ padding: "0.75rem 0" }}>
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
            <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{location.openingHours}</span>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
          {location.features.slice(0, 3).map((feature, i) => (
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
              {feature}
            </span>
          ))}
          {location.features.length > 3 && (
            <span
              style={{
                backgroundColor: "#e0e0e0",
                color: "#2d9c78",
                padding: "0.25rem 0.5rem",
                borderRadius: "0.25rem",
                fontSize: "0.75rem",
              }}
            >
              +{location.features.length - 3} more
            </span>
          )}
        </div>
      </div>

      {/* === Цена и кнопка === */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingTop: "0.75rem",
        }}
      >
        <div>
          <span
            style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#2d9c78" }}
          >
            {location.price}
          </span>
          <span style={{ fontSize: "0.75rem", color: "#666" }}>/day</span>
        </div>
        <Link
          href={`/booking?location=${encodeURIComponent(location.name)}`}
          style={{
            backgroundColor: "#f97316",
            color: "white",
            padding: "0.5rem 1rem",
            borderRadius: "0.25rem",
            textDecoration: "none",
            fontSize: "0.875rem",
            fontWeight: "bold",
          }}
        >
          Book Day Pass
        </Link>
      </div>
    </div>
  );
}
