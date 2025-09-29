// components/ui/gallery-tabs.tsx
"use client";

// === Типы ===
export type GalleryTabType =
  | "workspaces"
  | "locations"
  | "community"
  | "equipment";

export interface GalleryTabsProps {
  activeTab: GalleryTabType;
  onTabChange: (tab: GalleryTabType) => void;
}

// === Данные табов ===
const tabs = [
  { id: "workspaces" as const, label: "Workspaces" },
  { id: "locations" as const, label: "Locations" },
  { id: "community" as const, label: "Community" },
  { id: "equipment" as const, label: "Equipment" },
];

// === Компонент ===
export function GalleryTabs({ activeTab, onTabChange }: GalleryTabsProps) {
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
