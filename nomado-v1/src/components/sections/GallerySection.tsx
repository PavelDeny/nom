// components/sections/GallerySection.tsx
"use client";

import { useState } from "react";
import { GalleryTabs, type GalleryTabType } from "@/components/ui/gallery-tabs";
import { GalleryGrid } from "@/components/ui/gallery-grid";
import { GalleryCTA } from "@/components/ui/gallery-cta";
import {
  workspaceTypes,
  locationTypes,
  communityPrograms,
  equipmentFacilities,
} from "@/lib/data/gallery-data";

export interface GallerySectionProps {
  title?: string;
  subtitle?: string;
}

// === Компонент ===
export function GallerySection({
  title = "Experience Our Spaces",
  subtitle = "Take a visual journey through our inspiring mobile workspaces and the incredible locations we visit",
}: GallerySectionProps) {
  const [activeTab, setActiveTab] = useState<GalleryTabType>("workspaces");

  // === Определение данных и стилей для активного таба ===
  const getTabData = () => {
    switch (activeTab) {
      case "workspaces":
        return {
          items: workspaceTypes,
          variant: "teal" as const,
          buttonText: "Learn More",
        };
      case "locations":
        return {
          items: locationTypes,
          variant: "orange" as const,
          buttonText: "Explore Locations",
        };
      case "community":
        return {
          items: communityPrograms,
          variant: "teal" as const,
          buttonText: "Join Community",
        };
      case "equipment":
        return {
          items: equipmentFacilities,
          variant: "orange" as const,
          buttonText: "View Equipment",
        };
      default:
        return {
          items: workspaceTypes,
          variant: "teal" as const,
          buttonText: "Learn More",
        };
    }
  };

  const { items, variant, buttonText } = getTabData();

  return (
    <section
      id="gallery"
      style={{ backgroundColor: "white", padding: "4rem 0" }}
    >
      <div className="container mx-auto px-4">
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <h2
            style={{
              fontSize: "2.5rem",
              fontWeight: "bold",
              color: "#2D5B4C",
              marginBottom: "1rem",
            }}
          >
            {title}
          </h2>
          <p
            style={{
              fontSize: "1.125rem",
              color: "#2D5B4C",
              maxWidth: "700px",
              margin: "0 auto",
            }}
          >
            {subtitle}
          </p>
        </div>

        <GalleryTabs activeTab={activeTab} onTabChange={setActiveTab} />

        <GalleryGrid items={items} variant={variant} buttonText={buttonText} />

        <GalleryCTA />
      </div>
    </section>
  );
}
