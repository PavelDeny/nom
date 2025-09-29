// components/sections/LocationTabs.tsx
"use client";

interface LocationTabsProps {
  activeTab: "active" | "coming-soon" | "seasonal";
  onTabChange: (tab: "active" | "coming-soon" | "seasonal") => void;
}

export function LocationTabs({ activeTab, onTabChange }: LocationTabsProps) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "0.75rem",
        marginBottom: "1.5rem",
      }}
    >
      <button
        onClick={() => onTabChange("active")}
        style={{
          padding: "0.5rem 1rem",
          border: "1px solid #2d9c78",
          backgroundColor: activeTab === "active" ? "#2d9c78" : "white",
          color: activeTab === "active" ? "white" : "#2d9c78",
          borderRadius: "0.25rem",
          cursor: "pointer",
        }}
      >
        Active Locations
      </button>
      <button
        onClick={() => onTabChange("coming-soon")}
        style={{
          padding: "0.5rem 1rem",
          border: "1px solid #2d9c78",
          backgroundColor: activeTab === "coming-soon" ? "#2d9c78" : "white",
          color: activeTab === "coming-soon" ? "white" : "#2d9c78",
          borderRadius: "0.25rem",
          cursor: "pointer",
        }}
      >
        Coming Soon
      </button>
      <button
        onClick={() => onTabChange("seasonal")}
        style={{
          padding: "0.5rem 1rem",
          border: "1px solid #2d9c78",
          backgroundColor: activeTab === "seasonal" ? "#2d9c78" : "white",
          color: activeTab === "seasonal" ? "white" : "#2d9c78",
          borderRadius: "0.25rem",
          cursor: "pointer",
        }}
      >
        Seasonal Routes
      </button>
    </div>
  );
}
