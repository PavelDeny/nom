// components/ui/coming-soon-card.tsx
"use client";

import Image from "next/image";
import { type ComingSoonLocation } from "@/lib/data/locations";

export interface ComingSoonCardProps {
  location: ComingSoonLocation;
}

export function ComingSoonCard({ location }: ComingSoonCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden h-full">
      {/* === Изображение === */}
      <div className="relative h-48">
        <Image
          src={location.image || "/placeholder.svg"}
          alt={`Coming soon to ${location.name}`}
          fill
          className="object-cover"
        />
        <div className="absolute top-3 left-3 bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
          Coming Soon
        </div>
        <div className="absolute top-3 right-3 bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
          {location.openingDate}
        </div>
      </div>

      {/* === Контент карточки === */}
      <div className="p-4">
        {/* === Локация === */}
        <div className="flex items-center gap-2 mb-3">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-orange-500"
          >
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
          <span className="text-sm font-semibold text-gray-900">{location.name}</span>
        </div>

        {/* === Описание === */}
        <p className="text-gray-600 text-sm leading-relaxed mb-4">
          {location.description}
        </p>

        {/* === Концепт Preview === */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
          <div className="text-xs text-green-700 font-medium mb-1">Concept Preview:</div>
          <div className="text-sm text-green-800">{location.concept}</div>
        </div>

        {/* === Фичи === */}
        <div className="flex flex-wrap gap-2 mb-4">
          {location.features.map((feature, index) => (
            <span
              key={index}
              className="bg-orange-100 text-orange-700 px-2 py-1 rounded-full text-xs font-medium"
            >
              {feature}
            </span>
          ))}
        </div>

        {/* === Нижняя часть с датой и кнопкой === */}
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-600">
            Opening {location.openingDate}
          </div>
          <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"></path>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
            </svg>
            Get Notified
          </button>
        </div>
      </div>
    </div>
  );
}