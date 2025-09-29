// __tests__/booking-slot-overlap.test.ts
import { isSlotConflicting } from "@/lib/booking-slot-utils";

describe("isSlotConflicting", () => {
  const slotTemplate = {
    startAt: "2025-01-01T10:00:00.000Z",
    endAt: "2025-01-01T11:00:00.000Z",
    available: false,
  };

  test("returns true when overlapping and slot is not available", () => {
    const start = new Date("2025-01-01T10:30:00.000Z");
    const end = new Date("2025-01-01T10:45:00.000Z");
    expect(isSlotConflicting(slotTemplate, start, end)).toBe(true);
  });

  test("returns false when overlapping but slot is available", () => {
    const start = new Date("2025-01-01T10:30:00.000Z");
    const end = new Date("2025-01-01T10:45:00.000Z");
    expect(isSlotConflicting({ ...slotTemplate, available: true }, start, end)).toBe(false);
  });

  test("returns false when not overlapping regardless of availability", () => {
    const start = new Date("2025-01-01T11:30:00.000Z");
    const end = new Date("2025-01-01T12:00:00.000Z");
    expect(isSlotConflicting(slotTemplate, start, end)).toBe(false);
  });
});
