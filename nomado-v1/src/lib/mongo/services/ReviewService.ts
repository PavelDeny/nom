// src/lib/mongo/services/ReviewService.ts
import { BaseCrudService } from "../BaseCrudService";
import { IReview, ReviewModel } from "../models/Review";

export class ReviewService extends BaseCrudService<IReview> {
  constructor() {
    super(ReviewModel);
  }

  async findBySpace(spaceId: string) {
    return this.model
      .find({ spaceId })
      .populate("userId", "name avatarUrl")
      .exec();
  }

  async hasUserReviewed(userId: string, spaceId: string) {
    const review = await this.model
      .findOne({ userId, spaceId })
      .lean() // ← быстрее, если не нужно сохранять
      .exec();
    return !!review;
  }
}
