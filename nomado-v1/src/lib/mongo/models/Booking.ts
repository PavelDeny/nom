// src/lib/mongo/models/Booking.ts
import { Schema, model, Types, models, Document } from "mongoose";

export interface IBooking extends Document {
  userId: Types.ObjectId;
  spaceId: Types.ObjectId;
  unitId: Types.ObjectId;
  startAt: Date;
  endAt: Date;
  durationMinutes: number;
  type: "hourly" | "day" | "week" | "month";
  price: number;
  currency: string;
  status: "pending" | "confirmed" | "cancelled" | "refunded";
  paymentIntentId?: string;
  receiptUrl?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const BookingSchema = new Schema<IBooking>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    spaceId: {
      type: Schema.Types.ObjectId,
      ref: "Space",
      required: true,
      index: true,
    },
    unitId: {
      type: Schema.Types.ObjectId,
      ref: "Unit",
      required: true,
      index: true,
    },
    startAt: {
      type: Date,
      required: true,
    },
    endAt: {
      type: Date,
      required: true,
    },
    durationMinutes: {
      type: Number,
      required: true,
      min: 15,
    },
    type: {
      type: String,
      enum: ["hourly", "day", "week", "month"],
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    currency: {
      type: String,
      required: true,
      uppercase: true,
      match: /^[A-Z]{3}$/,
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled", "refunded"],
      default: "pending",
    },
    paymentIntentId: String,
    receiptUrl: String,
  },
  {
    timestamps: true,
  },
);

// Индексы для производительности
BookingSchema.index({ userId: 1, startAt: 1 });
BookingSchema.index({ unitId: 1, startAt: 1 });
BookingSchema.index({ paymentIntentId: 1 }, { unique: true, sparse: true });

export const BookingModel = models.Booking || model("Booking", BookingSchema);
