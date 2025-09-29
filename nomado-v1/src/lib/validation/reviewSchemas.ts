// lib/validation/reviewSchemas.ts
import { z } from "zod";

export const createReviewSchema = z.object({
  bookingId: z.string().min(1, { message: "ID бронирования обязателен" }),
  spaceId: z.string().min(1, { message: "ID коворкинга обязателен" }),
  userId: z.string().min(1, { message: "ID пользователя обязателен" }),
  rating: z.number().int().min(1).max(5, { message: "Рейтинг — от 1 до 5" }),
  text: z
    .string()
    .min(10, { message: "Текст отзыва должен быть не менее 10 символов" })
    .max(2000),
  photos: z.array(z.string().url()).max(10).optional(),
});

export const updateReviewSchema = createReviewSchema
  .omit({ bookingId: true, userId: true, spaceId: true })
  .partial();
