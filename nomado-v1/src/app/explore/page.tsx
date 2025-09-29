// app/explore/page.tsx
import { connectToMongo } from "@/lib/mongo/connect";
import { SpaceModel, ISpace } from "@/lib/mongo/models/Space";
import { PipelineStage, Types } from "mongoose";

export const dynamic = "force-dynamic"; // всегда свежие данные

// Явно указываем, что _id есть
type SpaceWithDistance = ISpace & { distMeters: number; _id: Types.ObjectId };

// 🔧 Конфигурация поиска — централизованное управление
const SEARCH_CONFIG = {
  // Режим: 'dev' | 'prod'
  mode: "dev" as const,

  // Координаты для разработки — Албура, Турция
  dev: {
    lng: 32.0965,
    lat: 36.5583,
    label: "Алания, Турция",
  },

  // Для продакшена: получай из URL
  getCoordsFromUrl(url: string) {
    const { searchParams } = new URL(url);
    const lng = Number(searchParams.get("lng"));
    const lat = Number(searchParams.get("lat"));

    if (lng && lat && !isNaN(lng) && !isNaN(lat)) {
      return { lng, lat };
    }
    return null;
  },
};

export default async function ExplorePage({
  searchParams,
}: {
  searchParams: { lng?: string; lat?: string };
}) {
  await connectToMongo();

  // Определяем координаты: сначала пробуем из URL, потом используем dev
  let lng: number, lat: number;

  if (SEARCH_CONFIG.mode === "dev") {
    // В dev-режиме: приоритет — URL (если есть), иначе — жёсткие координаты
    const urlCoords = SEARCH_CONFIG.getCoordsFromUrl(
      `http://localhost:3000/explore?lng=${searchParams.lng}&lat=${searchParams.lat}`,
    );
    ({ lng, lat } = urlCoords || SEARCH_CONFIG.dev);
  } else {
    // В продакшене: только из URL
    const urlCoords = SEARCH_CONFIG.getCoordsFromUrl(
      `http://localhost:3000/explore?lng=${searchParams.lng}&lat=${searchParams.lat}`,
    );
    if (!urlCoords) {
      return (
        <main>
          <h1>Ошибка</h1>
          <p>Укажите координаты: ?lng=...&lat=...</p>
        </main>
      );
    }
    ({ lng, lat } = urlCoords);
  }

  // Типизированный пайплайн
  const pipeline: PipelineStage[] = [
    {
      $geoNear: {
        near: { type: "Point", coordinates: [lng, lat] },
        distanceField: "distMeters",
        spherical: true,
        maxDistance: 5000,
      },
    },
    { $match: { status: "published" } },
    { $limit: 20 },
  ];

  let spaces: SpaceWithDistance[] = [];

  try {
    spaces = await SpaceModel.aggregate(pipeline);
  } catch (error) {
    console.error("Ошибка при выполнении геопоиска:", error);
  }

  return (
    <main>
      <h1>Коворкинги рядом</h1>
      <p className="text-sm text-gray-500">
        Поиск вокруг: {Math.round(lng * 100) / 100},{" "}
        {Math.round(lat * 100) / 100}
        {SEARCH_CONFIG.mode === "dev" && " (dev mode)"}
      </p>

      {spaces.length === 0 ? (
        <p>Пока нет доступных коворкингов.</p>
      ) : (
        <ul>
          {spaces.map((space) => (
            <li key={String(space._id)}>
              {space.name} — {Math.round(space.distMeters)} м до вас
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
