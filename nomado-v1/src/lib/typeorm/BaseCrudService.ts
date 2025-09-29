// lib/typeorm/BaseCrudService.ts
import {
  Repository,
  FindOptionsWhere,
  ObjectId,
  DeleteResult,
  ObjectLiteral,
} from "typeorm";

export interface Pagination {
  page?: number; // 1-based
  pageSize?: number;
}

export interface QueryOptions<T> {
  filter?: FindOptionsWhere<T> | FindOptionsWhere<T>[];
  sort?: Record<string, 1 | -1>;
  pagination?: Pagination;
}

export class BaseCrudService<T extends ObjectLiteral> {
  protected repo: Repository<T>;

  constructor(repo: Repository<T>) {
    this.repo = repo;
  }

  async create(input: Partial<T>): Promise<T> {
    const entity = this.repo.create(input as T);
    return this.repo.save(entity);
  }

  async findMunknown(options: QueryOptions<T> = {}) {
    const { filter, sort, pagination } = options;
    const where = filter ?? {};
    const order = sort as unknown;
    const skip =
      pagination?.page && pagination?.pageSize
        ? (pagination.page - 1) * pagination.pageSize
        : undefined;
    const take = pagination?.pageSize;

    const [items, total] = await this.repo.findAndCount({
      where,
      order,
      skip,
      take,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any); // ← TypeORM требует `as any` для MongoDB

    return { items, total };
  }

  async findById(id: string): Promise<T | null> {
    if (!ObjectId.isValid(id)) {
      return null;
    }
    return this.repo.findOne({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      where: { _id: new ObjectId(id) } as any,
    });
  }

  async updateById(id: string, updates: Partial<T>): Promise<T | null> {
    if (!ObjectId.isValid(id)) {
      return null;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await this.repo.update({ _id: new ObjectId(id) } as any, updates);
    return this.findById(id);
  }

  async deleteById(id: string): Promise<DeleteResult> {
    if (!ObjectId.isValid(id)) {
      return { raw: {}, affected: 0 };
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return this.repo.delete({ _id: new ObjectId(id) } as any);
  }
}
