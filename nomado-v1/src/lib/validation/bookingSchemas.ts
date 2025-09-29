// lib/validation/bookingSchemas.ts
import { z } from "zod";

// Вспомогательная проверка даты
const isValidDate = (dateStr: string) => !isNaN(Date.parse(dateStr));

export const createBookingSchema = z.object({
  userId: z.string().min(1, { message: "ID пользователя обязателен" }),
  spaceId: z.string().min(1, { message: "ID пространства обязателен" }),
  unitId: z.string().min(1, { message: "ID юнита обязателен" }),
  startAt: z
    .string()
    .datetime({ message: "startAt должно быть в формате ISO" })
    .refine(isValidDate, "startAt — некорректная дата"),
  endAt: z
    .string()
    .datetime({ message: "endAt должно быть в формате ISO" })
    .refine(isValidDate, "endAt — некорректная дата"),
  type: z.enum(["hourly", "day", "week", "month"], {
    message: "Недопустимый тип бронирования",
  }),
  price: z
    .number()
    .nonnegative({ message: "Цена не может быть отрицательной" }),
  currency: z
    .string()
    .length(3, { message: "Код валюты должен быть из 3 букв" })
    .default("USD"),
});

// Для обновления — все поля опциональны
export const updateBookingSchema = createBookingSchema.partial();

// Проверка: endAt > startAt
export const validateBookingTimes = (data: { startAt?: string; endAt?: string }) => {
  if (!data.startAt || !data.endAt) return true;
  const start = new Date(data.startAt);
  const end = new Date(data.endAt);
  return end > start;
};
