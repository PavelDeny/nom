// src/lib/utils/date.ts
/**
 * Date utility functions
 */

/**
 * Format date to ISO string
 */
export function formatDate(date: Date | string): string {
  return new Date(date).toISOString();
}

/**
 * Check if date is valid
 */
export function isValidDate(date: Date | string): boolean {
  const d = new Date(date);
  return !isNaN(d.getTime());
}

/**
 * Get start of day
 */
export function startOfDay(date: Date | string): Date {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

/**
 * Get end of day
 */
export function endOfDay(date: Date | string): Date {
  const d = new Date(date);
  d.setHours(23, 59, 59, 999);
  return d;
}

/**
 * Check if two date ranges overlap
 */
export function dateRangesOverlap(
  start1: Date | string,
  end1: Date | string,
  start2: Date | string,
  end2: Date | string,
): boolean {
  const s1 = new Date(start1);
  const e1 = new Date(end1);
  const s2 = new Date(start2);
  const e2 = new Date(end2);

  return s1 < e2 && s2 < e1;
}

/**
 * Get date string in YYYY-MM-DD format
 */
export function getDateString(date: Date | string): string {
  return new Date(date).toISOString().split("T")[0];
}

/**
 * Combine date and time strings
 */
export function combineDateAndTime(dateStr: string, timeStr: string): Date {
  const [hours, minutes] = timeStr.split(":").map(Number);
  const date = new Date(dateStr);
  date.setHours(hours, minutes, 0, 0);
  return date;
}
