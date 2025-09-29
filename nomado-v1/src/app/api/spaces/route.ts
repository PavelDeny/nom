// app/api/spaces/route.ts
import { NextResponse } from "next/server";
import { connectToMongo } from "@/lib/mongo/connect";
import { SpaceService } from "@/lib/mongo/services/SpaceService";
import { createSpaceSchema } from "@/lib/validation/spaceSchemas";
import { ObjectId } from "mongodb";

const service = new SpaceService();

export async function GET(req: Request) {
  await connectToMongo();
  const { searchParams } = new URL(req.url);
  const page = Number(searchParams.get("page") || 1);
  const pageSize = Number(searchParams.get("pageSize") || 10);

  try {
    const result = await service.findMany({
      pagination: { page, pageSize },
    });
    return NextResponse.json({ success: true, result }, { status: 200 });
  } catch (error: unknown) {
    console.error("GET /api/spaces:", error);
    return NextResponse.json(
      { success: false, error: "Не удалось загрузить коворкинги" },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  await connectToMongo();
  let body;

  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { success: false, error: "Невозможно разобрать JSON" },
      { status: 400 },
    );
  }

  const parsed = createSpaceSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        success: false,
        error: "Неверные данные",
        details: parsed.error.issues.map((i) => i.message),
      },
      { status: 400 },
    );
  }

  try {
    const data = parsed.data;

    const spaceToCreate = {
      ...data,
      franchiseId: new ObjectId(data.franchiseId),
      location: {
        type: "Point" as const,
        coordinates: data.location.coordinates,
      },
    };

    const created = await service.create(spaceToCreate);
    return NextResponse.json({ success: true, created }, { status: 201 });
  } catch (error: unknown) {
    if (
      error &&
      typeof error === "object" &&
      "code" in error &&
      error.code === 11000
    ) {
      return NextResponse.json(
        { success: false, error: "Коворкинг с таким slug уже существует" },
        { status: 409 },
      );
    }
    console.error("POST /api/spaces:", error);
    return NextResponse.json(
      { success: false, error: "Не удалось создать коворкинг" },
      { status: 500 },
    );
  }
}
