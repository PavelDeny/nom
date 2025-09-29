#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-require-imports */

/**
 * concurrent-booking-demo.js
 * Демонстрационная версия concurrent booking теста
 * Симулирует результаты без реальных HTTP запросов
 */

console.log("🚀 Concurrent Booking Test - Demo Mode");
console.log("═".repeat(50));

// Конфигурация
const TARGET_URL = "http://localhost:3000";
const API_ENDPOINT = `${TARGET_URL}/api/bookings`;
const CONCURRENT_REQUESTS = 10;

console.log(`📍 Target: ${API_ENDPOINT}`);
console.log(`👥 Concurrent requests: ${CONCURRENT_REQUESTS}`);
console.log(`⏰ Start time: ${new Date().toISOString()}`);
console.log("");

// Тестовый payload
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

// Симуляция результатов
function simulateConcurrentTest() {
  console.log("🏃‍♂️ Simulating concurrent requests...");
  console.log("─".repeat(40));

  const startTime = Date.now();

  // Симулируем различные сценарии
  const scenarios = [
    {
      name: "Ideal Conflict Handling",
      successful: 1,
      conflicts: 9,
      errors: 0,
      avgResponseTime: 150,
    },
    {
      name: "Race Condition Detected",
      successful: 3,
      conflicts: 7,
      errors: 0,
      avgResponseTime: 200,
    },
    {
      name: "Server Under Load",
      successful: 2,
      conflicts: 6,
      errors: 2,
      avgResponseTime: 800,
    },
  ];

  // Выбираем случайный сценарий
  const scenario = scenarios[Math.floor(Math.random() * scenarios.length)];

  console.log(`🎭 Simulating scenario: ${scenario.name}`);
  console.log("");

  // Генерируем детальные результаты
  const responses = [];
  const responseTimes = [];

  // Успешные запросы
  for (let i = 0; i < scenario.successful; i++) {
    const responseTime = scenario.avgResponseTime + Math.random() * 100 - 50;
    responseTimes.push(responseTime);

    responses.push({
      requestId: i + 1,
      status: 201,
      responseTime: Math.round(responseTime),
      body: JSON.stringify({
        success: true,
        message: "Booking slot validated successfully",
        data: {
          message: "Slot available (placeholder)",
          bookingId: `booking_${Date.now()}_${i}`,
        },
      }),
      timestamp: new Date().toISOString(),
    });
  }

  // Конфликтные запросы
  for (
    let i = scenario.successful;
    i < scenario.successful + scenario.conflicts;
    i++
  ) {
    const responseTime = scenario.avgResponseTime + Math.random() * 100 - 50;
    responseTimes.push(responseTime);

    responses.push({
      requestId: i + 1,
      status: 409,
      responseTime: Math.round(responseTime),
      body: JSON.stringify({
        success: false,
        error: "Requested time conflicts with an unavailable slot",
      }),
      timestamp: new Date().toISOString(),
    });
  }

  // Ошибки
  for (
    let i = scenario.successful + scenario.conflicts;
    i < CONCURRENT_REQUESTS;
    i++
  ) {
    const responseTime = scenario.avgResponseTime + Math.random() * 500;
    responseTimes.push(responseTime);

    responses.push({
      requestId: i + 1,
      status: 500,
      responseTime: Math.round(responseTime),
      body: JSON.stringify({
        success: false,
        error: "Internal server error",
      }),
      timestamp: new Date().toISOString(),
    });
  }

  const totalTime = Date.now() - startTime;

  // Статистика
  const stats = {
    total: CONCURRENT_REQUESTS,
    successful: scenario.successful,
    conflicts: scenario.conflicts,
    errors: scenario.errors,
    responseTimes,
    responses,
  };

  displayResults(stats, totalTime, scenario.name);
  saveDetailedReport(stats, totalTime, scenario.name);

  return stats;
}

function displayResults(stats, totalTime, scenarioName) {
  console.log("\n📊 Concurrent Booking Test Results");
  console.log("═".repeat(50));
  console.log(`🎭 Scenario: ${scenarioName}`);
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
    console.log(`• Min: ${Math.round(minTime)}ms`);
    console.log(`• Max: ${Math.round(maxTime)}ms`);
    console.log(`• P50: ${Math.round(p50)}ms`);
    console.log(`• P95: ${Math.round(p95)}ms`);
    console.log("");
  }

  // Анализ результатов
  console.log("🎯 Analysis:");
  if (stats.conflicts > 0) {
    console.log("✅ Booking conflict detection is working correctly");
    console.log(
      `   ${stats.conflicts} requests correctly identified as conflicts`
    );
  }

  if (stats.successful > 1) {
    console.log("⚠️  Multiple bookings created - potential race condition");
    console.log("   Consider implementing proper locking mechanisms");
  } else if (stats.successful === 1) {
    console.log("✅ Only one booking created - proper conflict handling");
  }

  if (stats.errors > 0) {
    console.log(
      `❌ ${stats.errors} requests failed with errors - check server logs`
    );
  }

  // Рекомендации
  console.log("");
  console.log("💡 Recommendations:");
  if (stats.successful > 1) {
    console.log("• Implement database-level locking for booking slots");
    console.log("• Use optimistic locking with version fields");
    console.log("• Consider using Redis for distributed locking");
  }

  if (stats.errors > stats.total * 0.1) {
    console.log("• Check server capacity and scaling needs");
    console.log("• Monitor database connection pool");
    console.log("• Implement circuit breaker pattern");
  }

  if (stats.conflicts === stats.total - stats.successful) {
    console.log("• Excellent conflict handling implementation");
    console.log("• Consider adding retry logic for failed requests");
  }
}

function saveDetailedReport(stats, totalTime, scenarioName) {
  const fs = require("fs");
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const filename = `test-results/concurrent-booking-demo-${timestamp}.json`;

  if (!fs.existsSync("test-results")) {
    fs.mkdirSync("test-results", { recursive: true });
  }

  const report = {
    timestamp: new Date().toISOString(),
    testConfig: {
      targetUrl: API_ENDPOINT,
      concurrentRequests: CONCURRENT_REQUESTS,
      payload: bookingPayload,
      mode: "demo",
    },
    scenario: scenarioName,
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

// Запуск демо
simulateConcurrentTest();
