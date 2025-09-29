// components/ui/location-tabs.tsx
"use client";

export type TabType = "active" | "coming-soon" | "seasonal";

export interface LocationTabsProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export function LocationTabs({ activeTab, onTabChange }: LocationTabsProps) {
  const tabs = [
    { id: "active" as const, label: "Active Locations" },
    { id: "coming-soon" as const, label: "Coming Soon" },
    { id: "seasonal" as const, label: "Seasonal Routes" },
  ];

  return (
    <div className="mb-8">
      <div className="flex bg-gray-100 rounded-lg p-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex-1 px-6 py-2 text-sm font-medium rounded-md transition-colors ${
              activeTab === tab.id
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}
