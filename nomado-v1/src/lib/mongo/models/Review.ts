// src/lib/mongo/models/Review.ts
import { Schema, model, Types, models, Document } from "mongoose";

export interface IReview extends Document {
  bookingId: Types.ObjectId;
  spaceId: Types.ObjectId;
  userId: Types.ObjectId;
  rating: number; // 1..5
  text: string;
  photos?: string[]; // URL изображений
  createdAt?: Date;
  updatedAt?: Date;
}

const ReviewSchema = new Schema<IReview>(
  {
    bookingId: {
      type: Schema.Types.ObjectId,
      ref: "Booking",
      required: true,
      index: true,
      unique: true, // Один отзыв на одно бронирование
    },
    spaceId: {
      type: Schema.Types.ObjectId,
      ref: "Space",
      required: true,
      index: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    text: {
      type: String,
      required: true,
      minlength: 10,
      maxlength: 2000,
    },
    photos: [
      {
        type: String,
        validate: {
          validator: (url: string) => /^https?:\/\/.+/.test(url),
          message: "Должен быть валидным URL",
        },
      },
    ],
  },
  {
    timestamps: true,
  },
);

// Индекс: один пользователь — один отзыв на пространство (опционально)
ReviewSchema.index({ userId: 1, spaceId: 1 }, { unique: true });

export const ReviewModel = models.Review || model("Review", ReviewSchema);
