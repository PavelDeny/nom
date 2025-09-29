// src/lib/booking-slot-utils.ts

/**
 * isSlotConflicting
 * - slot: { startAt: Date | string, endAt: Date | string, available: boolean }
 * - startAt / endAt: Date objects for the desired booking range
 *
 * Возвращает true только если:
 *  - Есть временное пересечение (overlap),
 *  - И слот помечен как недоступный (available === false).
 *
 * Примечание: входные данные могут содержать строки ISO; внутри функции мы приводим их к Date.
 */
export function isSlotConflicting(
  slot: { startAt: Date | string; endAt: Date | string; available: boolean },
  startAt: Date,
  endAt: Date,
): boolean {
  const slotStart =
    slot.startAt instanceof Date ? slot.startAt : new Date(slot.startAt);
  const slotEnd =
    slot.endAt instanceof Date ? slot.endAt : new Date(slot.endAt);

  const overlaps = startAt < slotEnd && endAt > slotStart;
  return overlaps && !slot.available;
}
