// app/api/reviews/route.ts
import { NextResponse } from "next/server";
import { connectToMongo } from "@/lib/mongo/connect";
import { ReviewModel } from "@/lib/mongo/models/Review";
import { BookingModel } from "@/lib/mongo/models/Booking";
import { createReviewSchema } from "@/lib/validation/reviewSchemas";

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

  const parsed = createReviewSchema.safeParse(body);
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

  const { bookingId, userId } = parsed.data;

  // Проверяем, что бронирование завершено и принадлежит пользователю
  const booking = await BookingModel.findOne({
    _id: bookingId,
    userId,
    status: "confirmed",
  });
  if (!booking || new Date(booking.endAt) > new Date()) {
    return NextResponse.json(
      {
        success: false,
        error: "Вы можете оставить отзыв только после посещения",
      },
      { status: 403 },
    );
  }

  try {
    const review = await ReviewModel.create(parsed.data);
    return NextResponse.json({ success: true, data: review }, { status: 201 });
  } catch (error: unknown) {
    console.error("POST /api/reviews:", error);
    return NextResponse.json(
      { success: false, error: "Не удалось добавить отзыв" },
      { status: 500 },
    );
  }
}
