// app/api/search/route.ts
import { NextResponse } from "next/server";
import { connectToMongo } from "@/lib/mongo/connect";
import { SpaceModel } from "@/lib/mongo/models/Space";
import { PipelineStage } from "mongoose";

export async function GET(req: Request) {
  await connectToMongo();
  const { searchParams } = new URL(req.url);

  // 1. Получаем параметры
  const lng = Number(searchParams.get("lng"));
  const lat = Number(searchParams.get("lat"));
  const maxDistance = Number(searchParams.get("max")) || 5000;
  const amenities = searchParams.getAll("amenity");

  // 2. Валидация координат
  if (!lng || !lat || isNaN(lng) || isNaN(lat)) {
    return NextResponse.json(
      { success: false, error: "Некорректные координаты" },
      { status: 400 },
    );
  }

  // 3. Формируем пайплайн
  const pipeline: PipelineStage[] = [
    {
      $geoNear: {
        near: { type: "Point", coordinates: [lng, lat] },
        distanceField: "distMeters",
        spherical: true,
        maxDistance,
      },
    },
    { $match: { status: "published" } },
  ];

  // 4. Фильтр по удобствам
  if (amenities.length > 0) {
    pipeline.push({
      $match: {
        amenities: { $all: amenities },
      },
    });
  }

  // 5. Проекция: только нужные поля
  pipeline.push({
    $project: {
      name: 1,
      slug: 1,
      photos: { $slice: ["$photos", 1] }, // первое фото
      ratingAvg: 1,
      beach: 1,
      distMeters: 1,
    },
  });

  // 6. Сортировка и лимит
  pipeline.push({ $sort: { distMeters: 1, ratingAvg: -1 } }, { $limit: 50 });

  try {
    const items = await SpaceModel.aggregate(pipeline);
    return NextResponse.json(
      { success: true, data: { items } },
      { status: 200 },
    );
  } catch (error: unknown) {
    console.error("Ошибка в /api/search:", error);
    return NextResponse.json(
      { success: false, error: "Не удалось выполнить поиск" },
      { status: 500 },
    );
  }
}
