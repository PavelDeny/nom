// src/lib/mongo/models/Availability.ts
import { Schema, model, Types, models } from "mongoose";

export interface IAvailability {
  unitId: Types.ObjectId;
  date: string; // 'YYYY-MM-DD'
  slots: {
    from: string; // '09:00'
    to: string; // '17:00'
    available: boolean;
  }[];
  exceptions: {
    from: string;
    to: string;
    reason: string;
  }[];
  createdAt?: Date;
  updatedAt?: Date;
}

const AvailabilitySchema = new Schema<IAvailability>(
  {
    unitId: {
      type: Schema.Types.ObjectId,
      ref: "Unit",
      index: true,
      required: true,
    },
    date: {
      type: String,
      match: /^\d{4}-\d{2}-\d{2}$/,
      required: true,
      index: true,
    },
    slots: [
      {
        from: {
          type: String,
          required: true,
          match: /^([0-1]\d|2[0-3]):[0-5]\d$/,
        },
        to: {
          type: String,
          required: true,
          match: /^([0-1]\d|2[0-3]):[0-5]\d$/,
        },
        available: { type: Boolean, default: true },
      },
    ],
    exceptions: [
      {
        from: String,
        to: String,
        reason: String,
      },
    ],
  },
  {
    timestamps: true,
  },
);

// Уникальный составной индекс — критически важен!
AvailabilitySchema.index({ unitId: 1, date: 1 }, { unique: true });

export const AvailabilityModel =
  models.Availability || model("Availability", AvailabilitySchema);
