// src/app/api/bookings/route.ts
import { isSlotConflicting } from "@/lib/booking-slot-utils";
import {
  createSuccessResponse,
  createErrorResponse,
  createValidationErrorResponse,
  createConflictResponse,
  createInternalErrorResponse,
} from "@/lib/utils/http";
import { isValidDate } from "@/lib/utils/date";

/**
 * POST handler for creating bookings
 * Uses centralized utilities for consistent error handling and responses
 */
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { startAt: startRaw, endAt: endRaw, slot } = body || {};

    // Validation
    if (!startRaw || !endRaw || !slot) {
      return createValidationErrorResponse([
        "Missing required fields: startAt, endAt, slot",
      ]);
    }

    const startAt = new Date(startRaw);
    const endAt = new Date(endRaw);

    if (!isValidDate(startAt) || !isValidDate(endAt)) {
      return createErrorResponse("Invalid date format", 400);
    }

    if (endAt <= startAt) {
      return createErrorResponse("endAt must be after startAt", 400);
    }

    // Check for slot conflicts
    if (isSlotConflicting(slot, startAt, endAt)) {
      return createConflictResponse(
        "Requested time conflicts with an unavailable slot",
      );
    }

    // TODO: Implement actual booking creation using repoFactory
    // const bookingService = await BookingService.createInstance();
    // const booking = await bookingService.create({ startAt, endAt, ...body });

    return createSuccessResponse(
      { message: "Slot available (placeholder)" },
      "Booking slot validated successfully",
      201,
    );
  } catch (err: unknown) {
    console.error("Error in bookings POST:", err);
    return createInternalErrorResponse();
  }
}
