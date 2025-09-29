// app/api/bookings/[id]/route.ts
import { NextResponse } from "next/server";
import { connectToMongo } from "@/lib/mongo/connect";
import { BookingModel } from "@/lib/mongo/models/Booking";
import { updateBookingSchema } from "@/lib/validation/bookingSchemas"; // partial

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  await connectToMongo();
  const { id } = await params;
  const booking = await BookingModel.findById(id);
  if (!booking) {
    return NextResponse.json(
      { success: false, error: "Бронирование не найдено" },
      { status: 404 },
    );
  }
  // Возвращаем найденное бронирование, если оно существует
  return NextResponse.json({ success: true, data: booking }, { status: 200 });
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

  const parsed = updateBookingSchema.safeParse(body);
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
    const updated = await BookingModel.findByIdAndUpdate(
      id,
      parsed.data,
      { new: true },
    );
    if (!updated) {
      return NextResponse.json(
        { success: false, error: "Бронирование не найдено" },
        { status: 404 },
      );
    }
    return NextResponse.json({ success: true, data: updated });
  } catch (error: unknown) {
    console.error("PUT /api/bookings/[id]:", error);
    return NextResponse.json(
      { success: false, error: "Не удалось обновить бронирование" },
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
    const deleted = await BookingModel.findByIdAndDelete(id);
    if (!deleted) {
      return NextResponse.json(
        { success: false, error: "Бронирование не найдено" },
        { status: 404 },
      );
    }
    return NextResponse.json({ success: true, data: deleted });
  } catch (error: unknown) {
    console.error("DELETE /api/bookings/[id]:", error);
    return NextResponse.json(
      { success: false, error: "Не удалось удалить бронирование" },
      { status: 500 },
    );
  }
}
