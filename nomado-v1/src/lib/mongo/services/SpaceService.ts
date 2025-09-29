// src/lib/mongo/services/SpaceService.ts
import { BaseCrudService } from "../BaseCrudService";
import { ISpace, SpaceModel } from "../models/Space";

export class SpaceService extends BaseCrudService<ISpace> {
  constructor() {
    super(SpaceModel);
  }

  /**
   * Находит коворкинг по slug (например, /space/beach-hub)
   */
  async findBySlug(slug: string): Promise<ISpace | null> {
    return this.model.findOne({ slug }).exec();
  }

  /**
   * Находит все коворкинги владельца (franchisee)
   */
  async findByFranchiseId(franchiseId: string) {
    return this.model.find({ franchiseId }).exec();
  }
}
