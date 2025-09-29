// app/api/users/route.ts
import { NextResponse } from "next/server";
import { connectToMongo } from "@/lib/mongo/connect";
import { UserService } from "@/lib/mongo/services/UserService";
import {
  createUserSchema,
  updateUserSchema,
} from "@/lib/validation/userSchemas";

const service = new UserService();

// GET: Получить список пользователей
export async function GET(req: Request) {
  await connectToMongo();
  const { searchParams } = new URL(req.url);
  const page = Number(searchParams.get("page") || 1);
  const pageSize = Number(searchParams.get("pageSize") || 10);

  try {
    const { items, total } = await service.findMany({
      pagination: { page, pageSize },
    });

    return NextResponse.json(
      {
        success: true,
        items,
        total,
      },
      { status: 200 },
    );
  } catch (error: unknown) {
    console.error("Ошибка при получении списка пользователей:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Не удалось загрузить пользователей",
      },
      { status: 500 },
    );
  }
}

// POST: Создать пользователя
export async function POST(req: Request) {
  await connectToMongo();
  let body;

  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      {
        success: false,
        error: "Невозможно разобрать JSON",
      },
      { status: 400 },
    );
  }

  const parsed = createUserSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        success: false,
        error: "Неверные данные",
        details: parsed.error.issues.map((issue) => issue.message),
      },
      { status: 400 },
    );
  }

  try {
    const created = await service.create(parsed.data);
    return NextResponse.json(
      {
        success: true,
        created,
      },
      { status: 201 },
    );
  } catch (error: unknown) {
    if (
      error &&
      typeof error === "object" &&
      "code" in error &&
      error.code === 11000
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "Пользователь с таким email уже существует",
        },
        { status: 409 },
      );
    }
    console.error("Ошибка при создании пользователя:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Не удалось создать пользователя",
      },
      { status: 500 },
    );
  }
}

// PUT: Обновить пользователя
export async function PUT(req: Request) {
  await connectToMongo();
  let body;

  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      {
        success: false,
        error: "Невозможно разобрать JSON",
      },
      { status: 400 },
    );
  }

  const parsed = updateUserSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        success: false,
        error: "Неверные данные",
        details: parsed.error.issues.map((issue) => issue.message),
      },
      { status: 400 },
    );
  }

  const { id, ...updates } = parsed.data;

  try {
    const updated = await service.updateById(id, updates);
    if (!updated) {
      return NextResponse.json(
        {
          success: false,
          error: "Пользователь не найден",
        },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        updated,
      },
      { status: 200 },
    );
  } catch (error: unknown) {
    console.error("Ошибка при обновлении пользователя:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Не удалось обновить пользователя",
      },
      { status: 500 },
    );
  }
}

// DELETE: Удалить пользователя
export async function DELETE(req: Request) {
  await connectToMongo();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json(
      {
        success: false,
        error: "Отсутствует ID",
      },
      { status: 400 },
    );
  }

  try {
    const removed = await service.deleteById(id);
    if (!removed) {
      return NextResponse.json(
        {
          success: false,
          error: "Пользователь не найден",
        },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        removed,
      },
      { status: 200 },
    );
  } catch (error: unknown) {
    console.error("Ошибка при удалении пользователя:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Не удалось удалить пользователя",
      },
      { status: 500 },
    );
  }
}
