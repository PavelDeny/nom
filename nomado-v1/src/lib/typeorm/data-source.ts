// src/lib/typeorm/data-source.ts
import "reflect-metadata";
import { DataSource, DataSourceOptions } from "typeorm";
import { config } from "@/lib/config";

declare global {
  var __nomado_typeorm_ds: DataSource | undefined;
}

/**
 * getDataSource
 * - singleton-ish factory for TypeORM DataSource (MongoDB)
 * - uses centralized configuration
 * - places driver-level options into `extra`
 * - initializes the DataSource before returning
 */
export async function getDataSource(): Promise<DataSource> {
  if (global.__nomado_typeorm_ds && global.__nomado_typeorm_ds.isInitialized) {
    return global.__nomado_typeorm_ds;
  }

  const opts: DataSourceOptions = {
    type: "mongodb",
    url: config.database.uri,
    entities: [__dirname + "/entities/*.{ts,js}"],
    synchronize: !config.isProduction, // only auto-sync in non-prod
    logging: !config.isProduction,
    extra: {
      maxPoolSize: config.database.maxPoolSize,
      connectTimeoutMS: config.database.connectTimeoutMS,
      serverSelectionTimeoutMS: config.database.serverSelectionTimeoutMS,
    },
  };

  const ds = new DataSource(opts);

  // initialize and cache
  if (!ds.isInitialized) {
    await ds.initialize();
  }
  global.__nomado_typeorm_ds = ds;
  return ds;
}
