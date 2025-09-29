// lib/mongo/models/User.ts
import { Schema, model, models, Document } from "mongoose";

export interface IUser extends Document {
  email: string;
  name: string;
  //  role: 'user' | 'admin';
  role: "guest" | "franchisee" | "admin"; // ← обновлено!
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    // role: { type: String, enum: ['user', 'admin'], default: 'user' },
    role: {
      type: String,
      enum: ["guest", "franchisee", "admin"],
      default: "guest",
    },
  },
  { timestamps: true },
);

// Добавляем индекс для email
UserSchema.index({ email: 1 }, { unique: true });

export const UserModel = models.User || model<IUser>("User", UserSchema);
