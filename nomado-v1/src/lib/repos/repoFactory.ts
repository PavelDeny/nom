// src/lib/repos/repoFactory.ts
import { wrapMongooseModel, wrapTypeormRepo, IRepo } from "./wrappers";
import { getDataSource } from "@/lib/typeorm/data-source";
import { connectToMongo } from "@/lib/mongo/connect";

/**
 * entityMapping можно расширять: для каждой сущности указываем, где искать реализацию
 * defaultPreference: 'typeorm' | 'mongoose'
 */
const entityMapping: Record<string, { typeorm?: string; mongoose?: string }> = {
  User: {
    typeorm: "@/lib/typeorm/entities/User",
    mongoose: "@/lib/mongo/models/User",
  },
  Booking: {
    typeorm: "@/lib/typeorm/entities/Booking",
    mongoose: "@/lib/mongo/models/Booking",
  },
  Space: {
    typeorm: "@/lib/typeorm/entities/Space",
    mongoose: "@/lib/mongo/models/Space",
  },
  Availability: { mongoose: "@/lib/mongo/models/Availability" },
  // add more mappings as needed
};

export type RepoOptions = { preference?: "typeorm" | "mongoose" };

/**
 * getRepo - возвращает IRepo для сущности по имени
 */
export async function getRepo<T = unknown>(
  entityName: string,
  opts: RepoOptions = {},
): Promise<IRepo<T>> {
  const mapping = entityMapping[entityName];
  // default preference: typeorm
  const preference = opts.preference || "typeorm";

  if (preference === "typeorm" && mapping?.typeorm) {
    try {
      const ds = await getDataSource();
      // require entity class to get repository
      const ent = await import(mapping.typeorm);
      const entityClass = ent?.default || Object.values(ent)[0];
      const repo = ds.getMongoRepository(entityClass);
      return wrapTypeormRepo(repo);
    } catch (err) {
      // fallback to mongoose
      console.warn(
        `TypeORM repo for ${entityName} not available, falling back to Mongoose:`,
        err,
      );
    }
  }

  if (mapping?.mongoose) {
    await connectToMongo();
    try {
      const mod = await import(mapping.mongoose);
      const model = mod?.default || Object.values(mod)[0];
      return wrapMongooseModel(model);
    } catch (err) {
      throw new Error(
        `Neither TypeORM nor Mongoose repo available for ${entityName}: ${err}`,
      );
    }
  }

  throw new Error(`Entity mapping not found for ${entityName}`);
}
