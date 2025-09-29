#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-require-imports */

/**
 * concurrent-booking-test.js
 * Скрипт для симуляции concurrent booking запросов
 * Отправляет 10 одновременных POST запросов с одинаковым payload
 */

const http = require("http");
const https = require("https");
const { URL } = require("url");

console.log("🚀 Concurrent Booking Test");
console.log("═".repeat(50));

// Конфигурация
const TARGET_URL = process.env.TARGET_URL || "http://localhost:3000";
const API_ENDPOINT = `${TARGET_URL}/api/bookings`;
const CONCURRENT_REQUESTS = 10;

console.log(`📍 Target: ${API_ENDPOINT}`);
console.log(`👥 Concurrent requests: ${CONCURRENT_REQUESTS}`);
console.log(`⏰ Start time: ${new Date().toISOString()}`);
console.log("");

// Тестовый payload - одинаковый для всех запросов
const bookingPayload = {
  userId: "507f1f77bcf86cd799439011",
  spaceId: "507f1f77bcf86cd799439012",
  unitId: "507f1f77bcf86cd799439013",
  startAt: "2025-09-28T10:00:00.000Z",
  endAt: "2025-09-28T12:00:00.000Z",
  slot: {
    startAt: "2025-09-28T10:00:00.000Z",
    endAt: "2025-09-28T12:00:00.000Z",
    available: true,
  },
  durationMinutes: 120,
  type: "hourly",
  price: 50.0,
  currency: "USD",
  status: "pending",
};

console.log("📋 Test Payload:");
console.log(JSON.stringify(bookingPayload, null, 2));
console.log("");

// Статистика
let stats = {
  total: 0,
  successful: 0,
  conflicts: 0,
  errors: 0,
  responseTimes: [],
  responses: [],
};

// Функция для HTTP запроса
function makeRequest(requestId) {
  return new Promise((resolve) => {
    const startTime = Date.now();
    const parsedUrl = new URL(API_ENDPOINT);
    const isHttps = parsedUrl.protocol === "https:";
    const client = isHttps ? https : http;

    const postData = JSON.stringify(bookingPayload);

    const options = {
      hostname: parsedUrl.hostname,
      port: parsedUrl.port || (isHttps ? 443 : 80),
      path: parsedUrl.pathname,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(postData),
        "User-Agent": `concurrent-booking-test/${requestId}`,
      },
      timeout: 10000,
    };

    const req = client.request(options, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => {
        const endTime = Date.now();
        const responseTime = endTime - startTime;

        const response = {
          requestId,
          status: res.statusCode,
          responseTime,
          body: data,
          timestamp: new Date().toISOString(),
        };

        resolve(response);
      });
    });

    req.on("error", (error) => {
      const endTime = Date.now();
      const responseTime = endTime - startTime;

      const response = {
        requestId,
        status: 0,
        responseTime,
        error: error.message,
        timestamp: new Date().toISOString(),
      };

      resolve(response);
    });

    req.on("timeout", () => {
      const endTime = Date.now();
      const responseTime = endTime - startTime;

      const response = {
        requestId,
        status: 0,
        responseTime,
        error: "Request timeout",
        timestamp: new Date().toISOString(),
      };

      req.destroy();
      resolve(response);
    });

    req.write(postData);
    req.end();
  });
}

// Основная функция тестирования
async function runConcurrentTest() {
  console.log("🏃‍♂️ Starting concurrent requests...");
  console.log("─".repeat(40));

  const startTime = Date.now();

  // Создаем массив промисов для concurrent запросов
  const requests = Array.from({ length: CONCURRENT_REQUESTS }, (_, i) =>
    makeRequest(i + 1)
  );

  // Ждем завершения всех запросов
  const responses = await Promise.all(requests);

  const totalTime = Date.now() - startTime;

  // Анализируем результаты
  responses.forEach((response) => {
    stats.total++;
    stats.responseTimes.push(response.responseTime);
    stats.responses.push(response);

    if (response.status === 201) {
      stats.successful++;
    } else if (response.status === 409) {
      stats.conflicts++;
    } else {
      stats.errors++;
    }
  });

  // Отображаем результаты
  displayResults(totalTime);

  // Сохраняем детальный отчет
  saveDetailedReport(totalTime);

  return stats;
}

function displayResults(totalTime) {
  console.log("\n📊 Concurrent Booking Test Results");
  console.log("═".repeat(50));

  console.log(`⏰ Total execution time: ${totalTime}ms`);
  console.log(`👥 Total requests: ${stats.total}`);
  console.log("");

  console.log("📈 Response Statistics:");
  console.log(
    `• ✅ Successful (201): ${stats.successful} (${(
      (stats.successful / stats.total) *
      100
    ).toFixed(1)}%)`
  );
  console.log(
    `• ⚠️  Conflicts (409): ${stats.conflicts} (${(
      (stats.conflicts / stats.total) *
      100
    ).toFixed(1)}%)`
  );
  console.log(
    `• ❌ Errors (other): ${stats.errors} (${(
      (stats.errors / stats.total) *
      100
    ).toFixed(1)}%)`
  );
  console.log("");

  if (stats.responseTimes.length > 0) {
    const sortedTimes = [...stats.responseTimes].sort((a, b) => a - b);
    const avgTime =
      stats.responseTimes.reduce((sum, time) => sum + time, 0) /
      stats.responseTimes.length;
    const minTime = Math.min(...stats.responseTimes);
    const maxTime = Math.max(...stats.responseTimes);
    const p50 = sortedTimes[Math.floor(sortedTimes.length * 0.5)];
    const p95 = sortedTimes[Math.floor(sortedTimes.length * 0.95)];

    console.log("⏱️  Response Time Analysis:");
    console.log(`• Average: ${avgTime.toFixed(2)}ms`);
    console.log(`• Min: ${minTime}ms`);
    console.log(`• Max: ${maxTime}ms`);
    console.log(`• P50: ${p50}ms`);
    console.log(`• P95: ${p95}ms`);
    console.log("");
  }

  // Анализ результатов
  console.log("🎯 Analysis:");
  if (stats.conflicts > 0) {
    console.log("✅ Booking conflict detection is working correctly");
    console.log(
      `   ${stats.conflicts} requests correctly identified as conflicts`
    );
  } else if (stats.successful > 1) {
    console.log("⚠️  Multiple bookings created - potential race condition");
    console.log("   Consider implementing proper locking mechanisms");
  } else if (stats.successful === 1) {
    console.log("✅ Only one booking created - proper conflict handling");
  } else {
    console.log("❌ No successful bookings - check server configuration");
  }

  if (stats.errors > 0) {
    console.log(
      `❌ ${stats.errors} requests failed with errors - check server logs`
    );
  }
}

function saveDetailedReport(totalTime) {
  /* eslint-disable @typescript-eslint/no-require-imports */
  const fs = require("fs");
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const filename = `test-results/concurrent-booking-test-${timestamp}.json`;

  if (!fs.existsSync("test-results")) {
    fs.mkdirSync("test-results", { recursive: true });
  }

  const report = {
    timestamp: new Date().toISOString(),
    testConfig: {
      targetUrl: API_ENDPOINT,
      concurrentRequests: CONCURRENT_REQUESTS,
      payload: bookingPayload,
    },
    executionTime: totalTime,
    statistics: {
      total: stats.total,
      successful: stats.successful,
      conflicts: stats.conflicts,
      errors: stats.errors,
      successRate: ((stats.successful / stats.total) * 100).toFixed(1) + "%",
      conflictRate: ((stats.conflicts / stats.total) * 100).toFixed(1) + "%",
      errorRate: ((stats.errors / stats.total) * 100).toFixed(1) + "%",
    },
    responseTimes: {
      average:
        stats.responseTimes.reduce((sum, time) => sum + time, 0) /
        stats.responseTimes.length,
      min: Math.min(...stats.responseTimes),
      max: Math.max(...stats.responseTimes),
      p50: stats.responseTimes.sort((a, b) => a - b)[
        Math.floor(stats.responseTimes.length * 0.5)
      ],
      p95: stats.responseTimes.sort((a, b) => a - b)[
        Math.floor(stats.responseTimes.length * 0.95)
      ],
    },
    responses: stats.responses,
  };

  fs.writeFileSync(filename, JSON.stringify(report, null, 2));
  console.log(`\n💾 Detailed report saved to: ${filename}`);
}

// Запуск теста
runConcurrentTest().catch((error) => {
  console.error("\n💥 Critical Error:", error);
  process.exit(1);
});
