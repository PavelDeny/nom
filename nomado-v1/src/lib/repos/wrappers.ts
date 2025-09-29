// src/lib/repos/wrappers.ts
import { ObjectId } from "mongodb";

export interface IRepoFindManyOptions {
  page?: number;
  pageSize?: number;
  sort?: Record<string, 1 | -1>;
  limit?: number;
  projection?: Record<string, 0 | 1>;
}

export interface IRepo<T> {
  create(input: Partial<T>): Promise<T>;
  findMany(query?: Record<string, unknown>, opts?: IRepoFindManyOptions): Promise<{ items: T[]; total: number }>;
  findById(id: string): Promise<T | null>;
  updateById(id: string, updates: Partial<T>): Promise<T | null>;
  deleteById(id: string): Promise<boolean>;
  distinct?(field: string, filter?: Record<string, unknown>): Promise<string[]>;
  aggregate?(pipeline: Record<string, unknown>[]): Promise<unknown[]>;
}

/**
 * wrapMongooseModel - обёртка для Mongoose model чтобы соответствовать IRepo
 */
export function wrapMongooseModel<T>(model: unknown): IRepo<T> {
  const mongooseModel = model as {
    create: (input: Partial<T>) => Promise<T>;
    find: (query: Record<string, unknown>) => {
      skip: (n: number) => { limit: (n: number) => {
         exec(): Promise<T[]>; sort: (sort: Record<string, 1 | -1>) => { exec: () => Promise<T[]> } 
} };
      exec: () => Promise<T[]>;
    };
    countDocuments: (query: Record<string, unknown>) => Promise<number>;
    findById: (id: string) => { exec: () => Promise<T | null> };
    findByIdAndUpdate: (id: string, updates: Partial<T>, opts: { new: boolean }) => { exec: () => Promise<T | null> };
    findByIdAndDelete: (id: string) => { exec: () => Promise<T | null> };
    distinct: (field: string, filter?: Record<string, unknown>) => { exec: () => Promise<string[]> };
    aggregate: (pipeline: Record<string, unknown>[]) => { exec: () => Promise<unknown[]> };
  };

  return {
    async create(input: Partial<T>): Promise<T> {
      return mongooseModel.create(input);
    },
    async findMany(query: Record<string, unknown> = {}, opts: IRepoFindManyOptions = {}): Promise<{ items: T[]; total: number }> {
      const hasLimit = typeof opts.limit === "number" && opts.limit! > 0;
      const page = Number(opts.page || 1);
      const pageSize = Number((hasLimit ? opts.limit : opts.pageSize) || 20);
      // apply projection if provided
      const projection = opts.projection;
      // use 'as any' to call find with projection in our loose typing stub
      let q = (mongooseModel.find as unknown as (query: Record<string, unknown>, proj?: Record<string, 0 | 1>) => ReturnType<typeof mongooseModel.find>)(query, projection)
        .skip((page - 1) * pageSize)
        .limit(pageSize);
      // Проверяем, был ли передан параметр сортировки, и если да — применяем его
      // Проверяем, был ли передан параметр сортировки, и если да — применяем его
      // Для корректной типизации, проверяем, что у q есть метод sort
      if (opts.sort && typeof (q as { sort?: (sort: Record<string, 1 | -1>) => unknown }).sort === "function") {
        // Метод sort доступен только после limit, поэтому вызываем его здесь
        q = (q as { sort: (sort: Record<string, 1 | -1>) => unknown }).sort(opts.sort) as typeof q;
      }
      // Выполняем запрос на получение элементов и подсчёт общего количества документов параллельно
      const [items, total] = await Promise.all([
        q.exec(),
        mongooseModel.countDocuments(query),
      ]);
      // Возвращаем результат в виде объекта с массивом элементов и общим количеством
      return { items, total };
    },
    async findById(id: string): Promise<T | null> {
      return mongooseModel.findById(id).exec();
    },
    async updateById(id: string, updates: Partial<T>): Promise<T | null> {
      return mongooseModel.findByIdAndUpdate(id, updates, { new: true }).exec();
    },
    async deleteById(id: string): Promise<boolean> {
      const result = await mongooseModel.findByIdAndDelete(id).exec();
      return !!result;
    },
    async distinct(field: string, filter?: Record<string, unknown>): Promise<string[]> {
      return mongooseModel.distinct(field, filter).exec();
    },
    async aggregate(pipeline: Record<string, unknown>[]): Promise<unknown[]> {
      return mongooseModel.aggregate(pipeline).exec();
    },
  };
}

/**
 * wrapTypeormRepo - обёртка для TypeORM MongoRepository
 */
export function wrapTypeormRepo<T>(repo: unknown): IRepo<T> {
  const typeormRepo = repo as {
    create: (input: Partial<T>) => T;
    save: (entity: T) => Promise<T>;
    findAndCount: (options: {
      where?: Record<string, unknown>;
      skip?: number;
      take?: number;
      order?: Record<string, 1 | -1>;
    }) => Promise<[T[], number]>;
    findOne: (options: { where: Record<string, unknown> }) => Promise<T | null>;
    update: (criteria: Record<string, unknown>, updates: Partial<T>) => Promise<{ affected?: number }>;
    delete: (criteria: Record<string, unknown>) => Promise<{ affected?: number }>;
  };

  return {
    async create(input: Partial<T>): Promise<T> {
      const entity = typeormRepo.create(input);
      return typeormRepo.save(entity);
    },
    async findMany(query: Record<string, unknown> = {}, opts: IRepoFindManyOptions = {}): Promise<{ items: T[]; total: number }> {
      const where = query;
      const usingLimit = typeof opts.limit === "number" && opts.limit! > 0;
      const skip = usingLimit ? undefined : (opts.page && opts.pageSize ? (opts.page - 1) * opts.pageSize : undefined);
      const take = usingLimit ? opts.limit : opts.pageSize;
      const order = opts.sort;
      // Note: projection is not supported in TypeORM MongoRepository via findAndCount reliably; ignoring if provided
      const [items, total] = await typeormRepo.findAndCount({ where, skip, take, order });
      return { items, total };
    },
    async findById(id: string): Promise<T | null> {
      // for mongodb ObjectId primary
      return typeormRepo.findOne({ where: { _id: new ObjectId(id) } });
    },
    async updateById(id: string, updates: Partial<T>): Promise<T | null> {
      await typeormRepo.update({ _id: new ObjectId(id) }, updates);
      return this.findById(id);
    },
    async deleteById(id: string): Promise<boolean> {
      const result = await typeormRepo.delete({ _id: new ObjectId(id) });
      return !!(result.affected && result.affected > 0);
    },
    // TypeORM не поддерживает aggregate/distinct в MongoRepository API — fallback оставить пустым
  };
}
