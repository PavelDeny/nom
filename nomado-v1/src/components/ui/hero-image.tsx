// components/ui/hero-image.tsx
"use client";

import Image from "next/image";

export interface HeroImageProps {
  heroImage?: string;
  heroImageAlt?: string;
}

export function HeroImage({
  heroImage = "./images/hero-nomado-breeze.jpg",
  heroImageAlt = "Nomado Breeze mobile coworking space on a tropical beach",
}: HeroImageProps) {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "500px",
        borderRadius: "1rem",
        overflow: "hidden",
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
      }}
    >
      <Image
        src={heroImage}
        alt={heroImageAlt}
        fill
        style={{
          objectFit: "cover",
        }}
        priority
      />

      {/* === Overlay gradient === */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "40%",
          background: "linear-gradient(transparent, rgba(0, 0, 0, 0.7))",
        }}
      />

      {/* === Floating stats === */}
      <div
        style={{
          position: "absolute",
          top: "1rem",
          right: "1rem",
          backgroundColor: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(10px)",
          padding: "1rem",
          borderRadius: "0.75rem",
          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div
          style={{
            fontSize: "0.875rem",
            color: "#666",
            marginBottom: "0.25rem",
          }}
        >
          Active Locations
        </div>
        <div style={{ fontSize: "2rem", fontWeight: "bold", color: "#2d9c78" }}>
          6+
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          bottom: "1rem",
          left: "1rem",
          backgroundColor: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(10px)",
          padding: "1rem",
          borderRadius: "0.75rem",
          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div
          style={{
            fontSize: "0.875rem",
            color: "#666",
            marginBottom: "0.25rem",
          }}
        >
          Community
        </div>
        <div style={{ fontSize: "2rem", fontWeight: "bold", color: "#f97316" }}>
          10K+
        </div>
      </div>
    </div>
  );
}
