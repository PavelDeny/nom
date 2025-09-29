// app/api/spaces/[id]/route.ts
import { NextResponse } from "next/server";
import { connectToMongo } from "@/lib/mongo/connect";
import { SpaceService } from "@/lib/mongo/services/SpaceService";
import { createSpaceSchema } from "@/lib/validation/spaceSchemas";

const service = new SpaceService();

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  await connectToMongo();
  const { id } = await params;
  const space = await service.findById(id);
  if (!space) {
    return NextResponse.json(
      { success: false, error: "Коворкинг не найден" },
      { status: 404 },
    );
  }
  return NextResponse.json({ success: true, space });
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
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

  const parsed = createSpaceSchema.partial().safeParse(body);
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
    const { id } = await params;
    const updated = await service.updateById(id, parsed.data);
    if (!updated) {
      return NextResponse.json(
        { success: false, error: "Коворкинг не найден" },
        { status: 404 },
      );
    }
    return NextResponse.json({ success: true, updated });
  } catch (error: unknown) {
    console.error("PUT /api/spaces/[id]:", error);
    return NextResponse.json(
      { success: false, error: "Не удалось обновить коворкинг" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  await connectToMongo();
  try {
    const { id } = await params;
    const removed = await service.deleteById(id);
    if (!removed) {
      return NextResponse.json(
        { success: false, error: "Коворкинг не найден" },
        { status: 404 },
      );
    }
    return NextResponse.json({ success: true, removed });
  } catch (error: unknown) {
    console.error("DELETE /api/spaces/[id]:", error);
    return NextResponse.json(
      { success: false, error: "Не удалось удалить коворкинг" },
      { status: 500 },
    );
  }
}
