// components/ui/location-card.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { type Location } from "@/lib/data/locations";

export interface LocationCardProps {
  location: Location;
}

export function LocationCard({ location }: LocationCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden h-full">
      {/* === Изображение === */}
      <div className="relative h-48">
        <Image
          src={location.image || "/placeholder.svg"}
          alt={`Nomado Breeze in ${location.name}`}
          fill
          className="object-cover"
        />
        <div className="absolute top-3 left-3 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
          Active Now
        </div>
        <div className="absolute top-3 right-3 bg-yellow-400 text-gray-900 px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
          <span>★</span>
          {location.rating}
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
            className="text-gray-600"
          >
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
          <span className="text-sm text-gray-600">{location.name}</span>
        </div>

        {/* === Описание === */}
        <p className="text-gray-700 text-sm leading-relaxed mb-4">
          {location.description}
        </p>

        {/* === Часы работы === */}
        <div className="flex items-center gap-2 mb-4">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-gray-600"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12,6 12,12 16,14"></polyline>
          </svg>
          <span className="text-sm text-gray-600">{location.openingHours}</span>
        </div>

        {/* === Фичи === */}
        <div className="flex flex-wrap gap-2 mb-4">
          {location.features.slice(0, 3).map((feature, index) => (
            <span
              key={index}
              className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
            >
              {feature}
            </span>
          ))}
          {location.features.length > 3 && (
            <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
              +{location.features.length - 3} more
            </span>
          )}
        </div>

        {/* === Цена и кнопка === */}
        <div className="flex items-center justify-between">
          <div className="text-lg font-bold text-gray-900">
            {location.price}/day
          </div>
          <Link
            href={`/booking?location=${location.id}`}
            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded text-sm font-medium transition-colors"
          >
            Book Day Pass →
          </Link>
        </div>
      </div>
    </div>
  );
}