// components/sections/LocationsSection.tsx
"use client";

import { useState } from "react";
import { LocationCard } from "@/components/ui/location-card";
import { ComingSoonCard } from "@/components/ui/coming-soon-card";
import { SeasonalRouteCard } from "@/components/ui/seasonal-route-card";
import { LocationTabs, type TabType } from "@/components/ui/location-tabs";
import {
  activeLocations,
  comingSoonLocations,
  seasonalRoutes,
} from "@/lib/data/locations";

export interface LocationsSectionProps {
  title?: string;
  subtitle?: string;
}

// === Компонент ===
export function LocationsSection({
  title = "Discover Our Global Network",
  subtitle = "From tropical beaches to mountain retreats, our mobile coworking units follow the perfect weather and inspiring locations year-round",
}: LocationsSectionProps) {
  const [activeTab, setActiveTab] = useState<TabType>("active");

  return (
    <section id="locations" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            {title}
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {subtitle}
          </p>
        </div>

        {/* Navigation Tabs */}
        <LocationTabs activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Content Grid */}
        <div className="mt-8">
          {/* === Active Locations Tab === */}
          {activeTab === "active" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activeLocations.map((location) => (
                <LocationCard key={location.id} location={location} />
              ))}
            </div>
          )}

          {/* === Coming Soon Tab === */}
          {activeTab === "coming-soon" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {comingSoonLocations.map((location) => (
                <ComingSoonCard key={location.id} location={location} />
              ))}
            </div>
          )}

          {/* === Seasonal Routes Tab === */}
          {activeTab === "seasonal" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {seasonalRoutes.map((route) => (
                <SeasonalRouteCard key={route.id} route={route} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
