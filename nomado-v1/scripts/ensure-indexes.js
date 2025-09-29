#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-require-imports */

/**
 * ensure-indexes.js
 * Скрипт для создания индексов в MongoDB staging-окружении
 * НЕ ЗАПУСКАТЬ В PRODUCTION!
 */

const { MongoClient } = require("mongodb");

// Конфигурация
const MONGODB_URI = process.env.MONGODB_URI || process.env.MONGODB_URL;
const DB_NAME = process.env.DB_NAME || "nomado-breeze";

// Проверка окружения
const isProduction = process.env.NODE_ENV === "production";
const isStaging =
  process.env.NODE_ENV === "staging" || MONGODB_URI?.includes("staging");

console.log("🔍 Проверка окружения...");
console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
console.log(`MONGODB_URI: ${MONGODB_URI ? "***скрыто***" : "не установлен"}`);
console.log(`DB_NAME: ${DB_NAME}`);

if (isProduction) {
  console.error("❌ ОШИБКА: Этот скрипт нельзя запускать в production!");
  process.exit(1);
}

if (
  !isStaging &&
  !MONGODB_URI?.includes("localhost") &&
  !MONGODB_URI?.includes("127.0.0.1")
) {
  console.error(
    "❌ ОШИБКА: Скрипт можно запускать только в staging или localhost!"
  );
  process.exit(1);
}

if (!MONGODB_URI) {
  console.error("❌ ОШИБКА: MONGODB_URI не установлен!");
  process.exit(1);
}

console.log("✅ Окружение безопасно для создания индексов");

async function ensureIndexes() {
  const client = new MongoClient(MONGODB_URI);

  try {
    console.log("\n🔌 Подключение к MongoDB...");
    await client.connect();
    console.log("✅ Подключение установлено");

    const db = client.db(DB_NAME);

    // 1. Users collection - email unique index
    console.log("\n📧 Создание индекса для users.email...");
    try {
      await db
        .collection("users")
        .createIndex({ email: 1 }, { unique: true, background: true });
      console.log("✅ Индекс users.email создан успешно");
    } catch (error) {
      if (error.code === 11000) {
        console.log("⚠️  Индекс users.email уже существует или есть дубликаты");
      } else {
        console.error("❌ Ошибка создания индекса users.email:", error.message);
      }
    }

    // 2. Spaces collection - location 2dsphere index
    console.log("\n🌍 Создание индекса для spaces.location...");
    try {
      await db
        .collection("spaces")
        .createIndex({ location: "2dsphere" }, { background: true });
      console.log("✅ Индекс spaces.location (2dsphere) создан успешно");
    } catch (error) {
      console.error(
        "❌ Ошибка создания индекса spaces.location:",
        error.message
      );
    }

    // 3. Availabilities collection - compound unique index
    console.log("\n📅 Создание индекса для availabilities (unitId, date)...");
    try {
      await db
        .collection("availabilities")
        .createIndex(
          { unitId: 1, date: 1 },
          { unique: true, background: true }
        );
      console.log("✅ Индекс availabilities (unitId, date) создан успешно");
    } catch (error) {
      if (error.code === 11000) {
        console.log(
          "⚠️  Индекс availabilities (unitId, date) уже существует или есть дубликаты"
        );
      } else {
        console.error(
          "❌ Ошибка создания индекса availabilities:",
          error.message
        );
      }
    }

    // 4. Дополнительные индексы для производительности
    console.log("\n⚡ Создание дополнительных индексов...");

    // Reviews - compound unique index
    try {
      await db
        .collection("reviews")
        .createIndex(
          { userId: 1, spaceId: 1 },
          { unique: true, background: true }
        );
      console.log("✅ Индекс reviews (userId, spaceId) создан успешно");
    } catch (error) {
      if (error.code === 11000) {
        console.log("⚠️  Индекс reviews (userId, spaceId) уже существует");
      } else {
        console.error("❌ Ошибка создания индекса reviews:", error.message);
      }
    }

    // Bookings - performance indexes
    try {
      await db
        .collection("bookings")
        .createIndex({ userId: 1, startAt: 1 }, { background: true });
      console.log("✅ Индекс bookings (userId, startAt) создан успешно");

      await db
        .collection("bookings")
        .createIndex({ unitId: 1, startAt: 1 }, { background: true });
      console.log("✅ Индекс bookings (unitId, startAt) создан успешно");

      await db
        .collection("bookings")
        .createIndex(
          { paymentIntentId: 1 },
          { unique: true, sparse: true, background: true }
        );
      console.log("✅ Индекс bookings (paymentIntentId) создан успешно");
    } catch (error) {
      console.error("❌ Ошибка создания индексов bookings:", error.message);
    }

    // 5. Получение информации об индексах
    console.log("\n📊 Информация об индексах:");

    const collections = [
      "users",
      "spaces",
      "availabilities",
      "reviews",
      "bookings",
    ];

    for (const collectionName of collections) {
      console.log(`\n🗂️  Коллекция: ${collectionName}`);
      try {
        const indexes = await db.collection(collectionName).indexes();
        console.log(`Количество индексов: ${indexes.length}`);
        indexes.forEach((index, i) => {
          const name = index.name || "unnamed";
          const key = JSON.stringify(index.key);
          const options = [];
          if (index.unique) options.push("unique");
          if (index.sparse) options.push("sparse");
          if (index.background) options.push("background");
          if (index["2dsphereIndexVersion"]) options.push("2dsphere");

          const optionsStr =
            options.length > 0 ? ` (${options.join(", ")})` : "";
          console.log(`  ${i + 1}. ${name}: ${key}${optionsStr}`);
        });
      } catch (error) {
        console.error(
          `❌ Ошибка получения индексов для ${collectionName}:`,
          error.message
        );
      }
    }

    console.log("\n✅ Все индексы проверены и созданы");
  } catch (error) {
    console.error("❌ Критическая ошибка:", error);
    process.exit(1);
  } finally {
    await client.close();
    console.log("\n🔌 Соединение с MongoDB закрыто");
  }
}

// Запуск скрипта
console.log("🚀 Запуск скрипта создания индексов...");
console.log(`⏰ Время запуска: ${new Date().toISOString()}`);

ensureIndexes()
  .then(() => {
    console.log("\n🎉 Скрипт завершен успешно!");
    console.log(`⏰ Время завершения: ${new Date().toISOString()}`);
    process.exit(0);
  })
  .catch((error) => {
    console.error("\n💥 Скрипт завершился с ошибкой:", error);
    console.log(`⏰ Время ошибки: ${new Date().toISOString()}`);
    process.exit(1);
  });
