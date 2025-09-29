// src/lib/mongo/models/Space.ts
import { Schema, model, Types, models, Document } from "mongoose";

// Интерфейс ISpace расширяет Document из mongoose, чтобы корректно типизировать документ MongoDB
export interface ISpace extends Document {
  franchiseId: Types.ObjectId;
  name: string;
  slug: string;
  description?: string;
  address: string;
  location: {
    type: "Point";
    coordinates: [number, number]; // [lng, lat]
  };
  beach: {
    name: string;
    slug: string;
    distanceMeters: number;
  };
  amenities: string[];
  vibes: string[];
  photos: string[];
  ratingAvg: number;
  ratingCount: number;
  status: "draft" | "pending" | "published";
  createdAt?: Date;
  updatedAt?: Date;
}

const SpaceSchema = new Schema<ISpace>(
  {
    franchiseId: {
      type: Schema.Types.ObjectId,
      ref: "Franchise",
      index: true,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
      match: [
        /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
        "Slug может содержать только буквы, цифры и дефисы",
      ],
    },
    description: String,
    address: {
      type: String,
      required: true,
    },
    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinates: {
        type: [Number],
        index: "2dsphere",
        required: true,
        validate: {
          validator: function (coords: number[]) {
            return (
              coords.length === 2 &&
              coords[0] >= -180 &&
              coords[0] <= 180 &&
              coords[1] >= -90 &&
              coords[1] <= 90
            );
          },
          message: "Координаты вне допустимого диапазона",
        },
      },
    },
    beach: {
      name: { type: String, required: true },
      slug: { type: String, required: true },
      distanceMeters: { type: Number, required: true, min: 0 },
    },
    amenities: [
      {
        type: String,
        enum: [
          "wifi",
          "ac",
          "showers",
          "lockers",
          "phoneBooths",
          "kitchen",
          "parking",
          "24h",
          "surfboardRacks",
        ],
      },
    ],
    vibes: [
      {
        type: String,
        enum: ["cozy", "boho", "minimal", "tropical"],
      },
    ],
    photos: [String],
    ratingAvg: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    ratingCount: {
      type: Number,
      default: 0,
      min: 0,
    },
    status: {
      type: String,
      enum: ["draft", "pending", "published"],
      default: "draft",
    },
  },
  {
    timestamps: true,
  },
);

// Убедимся, что индекс создан
SpaceSchema.index({ location: "2dsphere" });
SpaceSchema.index({ slug: 1 }, { unique: true });

export const SpaceModel = models.Space || model("Space", SpaceSchema);
