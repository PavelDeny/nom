// lib/validation/userSchemas.ts
import { z } from "zod";

export const createUserSchema = z.object({
  email: z.string().email({ message: "Неверный формат email" }),
  name: z.string().min(2, { message: "Имя должно быть не менее 2 символов" }),
  role: z
    .enum(["guest", "franchisee", "admin"], {
      message: "Роль может быть только guest, franchisee или admin",
    })
    .optional()
    .default("guest"),
});

export const updateUserSchema = z
  .object({
    id: z.string().min(1, { message: "ID обязателен" }),
    name: z.string().min(2, { message: "Имя слишком короткое" }).optional(),
    email: z.string().email({ message: "Неверный email" }).optional(),
    role: z
      .enum(["guest", "franchisee", "admin"], { message: "Недопустимая роль" })
      .optional(),
  })
  .required({ id: true });
