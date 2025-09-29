// src/lib/mongo/connect.ts
import mongoose, { ConnectOptions } from "mongoose";
import { config } from "@/lib/config";

declare global {
  // cache connection across module reloads (HMR / serverless)
  var __nomado_mongo_conn: Promise<typeof mongoose> | undefined;
}

/**
 * connectToMongo
 * - возращает Promise<mongoose> (кешируется в global.__nomado_mongo_conn)
 * - использует централизованную конфигурацию
 * - безопасные дефолты pool/timeout
 */
export async function connectToMongo(): Promise<typeof mongoose> {
  if (global.__nomado_mongo_conn) {
    return global.__nomado_mongo_conn;
  }

  const options: ConnectOptions = {
    maxPoolSize: config.database.maxPoolSize,
    connectTimeoutMS: config.database.connectTimeoutMS,
    serverSelectionTimeoutMS: config.database.serverSelectionTimeoutMS,
    autoIndex: config.database.autoIndex,
  };

  // cache the promise so concurrent requests reuse the same connection
  global.__nomado_mongo_conn = mongoose.connect(config.database.uri, options);
  return global.__nomado_mongo_conn;
}
