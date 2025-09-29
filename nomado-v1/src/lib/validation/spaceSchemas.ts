// lib/validation/spaceSchemas.ts
import { z } from "zod";

export const createSpaceSchema = z.object({
  franchiseId: z.string().min(1, { message: "ID франшизы обязателен" }),
  name: z.string().min(2, { message: "Имя должно быть не менее 2 символов" }),
  slug: z
    .string()
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
      message: "Slug может содержать только буквы, цифры и дефисы",
    })
    .min(2),
  description: z.string().min(10).optional(),
  address: z.string().min(5),
  location: z.object({
    coordinates: z
      .tuple([z.number(), z.number()]) // [lng, lat]
      .refine((coords) => {
        const [lng, lat] = coords;
        return lng >= -180 && lng <= 180 && lat >= -90 && lat <= 90;
      }, "Координаты вне допустимого диапазона"),
  }),
  beach: z.object({
    name: z.string().min(1),
    slug: z.string().min(1),
    distanceMeters: z.number().int().nonnegative(),
  }),
  amenities: z
    .array(
      z.enum([
        "wifi",
        "ac",
        "showers",
        "lockers",
        "phoneBooths",
        "kitchen",
        "parking",
        "24h",
        "surfboardRacks",
      ]),
    )
    .optional(),
  vibes: z.array(z.enum(["cozy", "boho", "minimal", "tropical"])).optional(),
  photos: z.array(z.string().url()).optional(),
  status: z.enum(["draft", "pending", "published"]).optional().default("draft"),
});

export const updateSpaceSchema = createSpaceSchema.partial();
