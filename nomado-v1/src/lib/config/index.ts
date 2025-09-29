// src/lib/config/index.ts
/**
 * Centralized configuration for the application
 * All environment variables and app settings are managed here
 */

export interface DatabaseConfig {
  uri: string;
  maxPoolSize: number;
  connectTimeoutMS: number;
  serverSelectionTimeoutMS: number;
  autoIndex: boolean;
}

export interface AppConfig {
  nodeEnv: string;
  isProduction: boolean;
  isDevelopment: boolean;
  database: DatabaseConfig;
}

/**
 * Get MongoDB URI from environment variables
 */
function getMongoUri(): string {
  const uri = process.env.MONGODB_URI || process.env.MONGODB_URL;
  if (!uri) {
    throw new Error("Missing MONGODB_URI or MONGODB_URL in environment");
  }
  return uri;
}

/**
 * Get database configuration
 */
function getDatabaseConfig(): DatabaseConfig {
  return {
    uri: getMongoUri(),
    maxPoolSize: Number(process.env.MONGODB_MAX_POOL_SIZE ?? 10),
    connectTimeoutMS: Number(process.env.MONGODB_CONNECT_TIMEOUT_MS ?? 10000),
    serverSelectionTimeoutMS: Number(
      process.env.MONGODB_SERVER_SELECTION_TIMEOUT_MS ?? 5000,
    ),
    autoIndex: process.env.NODE_ENV !== "production",
  };
}

/**
 * Main application configuration
 */
export const config: AppConfig = {
  nodeEnv: process.env.NODE_ENV || "development",
  isProduction: process.env.NODE_ENV === "production",
  isDevelopment: process.env.NODE_ENV === "development",
  database: getDatabaseConfig(),
};

/**
 * Export individual config sections for convenience
 */
export const { database, nodeEnv, isProduction, isDevelopment } = config;
