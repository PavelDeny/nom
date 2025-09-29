// lib/mongo/BaseCrudService.ts
import {
  Model,
  FilterQuery,
  UpdateQuery,
  Document,
  HydratedDocument,
} from "mongoose";

export interface Pagination {
  page?: number; // 1-based (не 0!)
  pageSize?: number;
}

export interface QueryOptions<T> {
  filter?: FilterQuery<T>;
  projection?: Record<string, 0 | 1>; // какие поля возвращать
  sort?: Record<string, 1 | -1>;
  pagination?: Pagination;
  lean?: boolean;
}

export class BaseCrudService<T extends Document> {
  protected model: Model<T>;

  constructor(model: Model<T>) {
    this.model = model;
  }

  async create(input: Partial<T>): Promise<HydratedDocument<T>> {
    return this.model.create(input);
  }

  async findMany(options: QueryOptions<T> = {}) {
    const { filter = {}, projection, sort, pagination } = options;
    const query = this.model.find(filter, projection).sort(sort ?? {});
    if (options.lean) query.lean(); //это не обязательно, но рекомендуется для оптимизации запросов
    if (pagination?.page && pagination?.pageSize) {
      const { page, pageSize } = pagination;
      query.skip((page! - 1) * pageSize!).limit(pageSize!);
    }
    const [items, total] = await Promise.all([
      query.exec(),
      this.model.countDocuments(filter as FilterQuery<T>),
    ]);
    return { items, total };
  }

  async findById(id: string) {
    return this.model.findById(id).exec();
  }

  async updateById(id: string, updates: UpdateQuery<T>) {
    return this.model.findByIdAndUpdate(id, updates, { new: true }).exec();
  }

  async deleteById(id: string) {
    return this.model.findByIdAndDelete(id).exec();
  }
}
