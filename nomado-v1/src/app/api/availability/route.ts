// app/api/availability/route.ts
import { NextResponse } from "next/server";
import { connectToMongo } from "@/lib/mongo/connect";
import { AvailabilityModel } from "@/lib/mongo/models/Availability";

export async function GET(req: Request) {
  await connectToMongo();
  const { searchParams } = new URL(req.url);
  const unitId = searchParams.get("unitId");
  const date = searchParams.get("date"); // YYYY-MM-DD

  if (!unitId || !date) {
    return NextResponse.json(
      { success: false, error: "Требуются unitId и date" },
      { status: 400 },
    );
  }

  try {
    const availability = await AvailabilityModel.findOne({ unitId, date });
    return NextResponse.json({
      success: true,
      data: availability || { unitId, date, slots: [], exceptions: [] },
    });
  } catch (error: unknown) {
    console.error("GET /api/availability:", error);
    return NextResponse.json(
      { success: false, error: "Не удалось загрузить доступность" },
      { status: 500 },
    );
  }
}
