// components/ui/seasonal-route-card.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { type SeasonalRoute } from "@/lib/data/locations";

export interface SeasonalRouteCardProps {
  route: SeasonalRoute;
}

export function SeasonalRouteCard({ route }: SeasonalRouteCardProps) {

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden h-full">
      {/* === Изображение === */}
      <div className="relative h-48">
        <Image
          src={route.image || "/placeholder.svg"}
          alt={route.name}
          fill
          className="object-cover"
        />
        <div className="absolute top-3 left-3 bg-green-500 text-orange-500 px-3 py-1 rounded-full text-xs font-semibold">
          Seasonal Route
        </div>
        <div className="absolute top-3 right-3 text-orange-500">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
          </svg>
        </div>
      </div>

      {/* === Контент карточки === */}
      <div className="p-4">
        {/* === Название маршрута === */}
        <div className="flex items-center gap-2 mb-2">
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
          <span className="text-sm font-semibold text-gray-900">{route.name}</span>
        </div>

        {/* === Даты работы === */}
        <div className="flex items-center gap-2 mb-3">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-gray-500"
          >
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
          </svg>
          <span className="text-sm text-gray-500">December - March</span>
        </div>

        {/* === Описание === */}
        <p className="text-gray-500 text-sm leading-relaxed mb-4">
          {route.description}
        </p>

        {/* === Маршрут === */}
        <div className="mb-4">
          <div className="text-sm font-medium text-gray-900 mb-2">Route:</div>
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
            <div className="text-sm text-green-600 font-medium">{route.locations}</div>
          </div>
        </div>

        {/* === Сезонные преимущества === */}
        <div className="mb-4">
          <div className="text-sm font-medium text-gray-900 mb-2">Seasonal Perks:</div>
          <div className="grid grid-cols-2 gap-2">
            {route.perks.map((perk, index) => (
              <span
                key={index}
                className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium"
              >
                {perk}
              </span>
            ))}
          </div>
        </div>

        {/* === Нижняя часть с датой и кнопкой === */}
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-500">
            Open December - March
          </div>
          <Link
            href={`/seasonal-routes/${route.id}`}
            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
            Plan Visit
          </Link>
        </div>
      </div>
    </div>
  );
}