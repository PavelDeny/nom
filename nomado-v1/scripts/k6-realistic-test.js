#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-require-imports */

/**
 * k6-realistic-test.js
 * Реалистичная имитация k6 нагрузочного теста
 * Более точное моделирование реальных условий
 */

const https = require("https");
const http = require("http");
const { URL } = require("url");

console.log("🚀 K6 Realistic Load Test - Staging Environment");
console.log("═".repeat(60));

// Конфигурация
const STAGING_URL =
  process.env.STAGING_URL || "https://staging.nomado-breeze.com";
const API_BASE = `${STAGING_URL}/api`;

console.log(`📍 Target URL: ${STAGING_URL}`);
console.log(`⏰ Start Time: ${new Date().toISOString()}`);
console.log("");

// Этапы тестирования
const stages = [
  { name: "Search API Test", duration: 30, vus: 10, endpoint: "/search" },
  { name: "Booking API Test", duration: 30, vus: 10, endpoint: "/bookings" },
  { name: "Ramp Down", duration: 10, vus: 0, endpoint: null },
];

console.log("📋 Test Stages:");
stages.forEach((stage, index) => {
  console.log(
    `  ${index + 1}. ${stage.name}: ${stage.duration}s - ${stage.vus} VUs`
  );
});
console.log("");

// Тестовые данные
const searchLocations = [
  "37.7749,-122.4194", // San Francisco
  "40.7128,-74.0060", // New York
  "34.0522,-118.2437", // Los Angeles
  "51.5074,-0.1278", // London
  "48.8566,2.3522", // Paris
];

const bookingPayloads = [
  {
    userId: "507f1f77bcf86cd799439011",
    spaceId: "507f1f77bcf86cd799439012",
    unitId: "507f1f77bcf86cd799439013",
    durationMinutes: 120,
    type: "hourly",
    price: 50.0,
    currency: "USD",
    status: "pending",
  },
  {
    userId: "507f1f77bcf86cd799439014",
    spaceId: "507f1f77bcf86cd799439015",
    unitId: "507f1f77bcf86cd799439016",
    durationMinutes: 240,
    type: "day",
    price: 150.0,
    currency: "USD",
    status: "pending",
  },
];

// Метрики
let metrics = {
  requests: 0,
  errors: 0,
  responseTimes: [],
  searchTimes: [],
  bookingTimes: [],
};

// Функция для HTTP запроса
function makeRequest(url, options = {}) {
  return new Promise((resolve, reject) => {
    const startTime = Date.now();
    const parsedUrl = new URL(url);
    const isHttps = parsedUrl.protocol === "https:";
    const client = isHttps ? https : http;

    const requestOptions = {
      hostname: parsedUrl.hostname,
      port: parsedUrl.port || (isHttps ? 443 : 80),
      path: parsedUrl.pathname + parsedUrl.search,
      method: options.method || "GET",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "k6-load-test/1.0",
        ...options.headers,
      },
      timeout: options.timeout || 10000,
    };

    const req = client.request(requestOptions, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => {
        const endTime = Date.now();
        const responseTime = endTime - startTime;

        resolve({
          status: res.statusCode,
          body: data,
          responseTime,
          headers: res.headers,
        });
      });
    });

    req.on("error", (error) => {
      const endTime = Date.now();
      const responseTime = endTime - startTime;
      reject({
        error: error.message,
        responseTime,
      });
    });

    req.on("timeout", () => {
      const endTime = Date.now();
      const responseTime = endTime - startTime;
      req.destroy();
      reject({
        error: "Request timeout",
        responseTime,
      });
    });

    if (options.body) {
      req.write(options.body);
    }

    req.end();
  });
}

// Тест поиска
async function testSearchAPI() {
  const location =
    searchLocations[Math.floor(Math.random() * searchLocations.length)];
  const radius = Math.floor(Math.random() * 20) + 5;
  const limit = Math.floor(Math.random() * 20) + 10;

  const url = `${API_BASE}/search?location=${location}&radius=${radius}&limit=${limit}`;

  try {
    const response = await makeRequest(url);
    metrics.requests++;
    metrics.responseTimes.push(response.responseTime);
    metrics.searchTimes.push(response.responseTime);

    if (response.status !== 200) {
      metrics.errors++;
    }

    return {
      success: response.status === 200,
      responseTime: response.responseTime,
      status: response.status,
    };
  } catch (error) {
    metrics.requests++;
    metrics.errors++;
    metrics.responseTimes.push(error.responseTime);

    return {
      success: false,
      responseTime: error.responseTime,
      status: 0,
      error: error.error,
    };
  }
}

// Тест бронирования
async function testBookingAPI() {
  const payload =
    bookingPayloads[Math.floor(Math.random() * bookingPayloads.length)];

  // Добавляем случайность к времени
  const now = Date.now();
  const randomOffset = Math.floor(Math.random() * 24 * 60 * 60 * 1000);
  payload.startAt = new Date(
    now + 24 * 60 * 60 * 1000 + randomOffset
  ).toISOString();
  payload.endAt = new Date(
    now + 24 * 60 * 60 * 1000 + randomOffset + 2 * 60 * 60 * 1000
  ).toISOString();

  const url = `${API_BASE}/bookings`;

  try {
    const response = await makeRequest(url, {
      method: "POST",
      body: JSON.stringify(payload),
      timeout: 15000,
    });

    metrics.requests++;
    metrics.responseTimes.push(response.responseTime);
    metrics.bookingTimes.push(response.responseTime);

    if (response.status !== 200 && response.status !== 201) {
      metrics.errors++;
    }

    return {
      success: response.status === 200 || response.status === 201,
      responseTime: response.responseTime,
      status: response.status,
    };
  } catch (error) {
    metrics.requests++;
    metrics.errors++;
    metrics.responseTimes.push(error.responseTime);

    return {
      success: false,
      responseTime: error.responseTime,
      status: 0,
      error: error.error,
    };
  }
}

// Расчет перцентилей
function calculatePercentiles(times) {
  const sorted = [...times].sort((a, b) => a - b);
  const len = sorted.length;

  return {
    p50: sorted[Math.floor(len * 0.5)] || 0,
    p95: sorted[Math.floor(len * 0.95)] || 0,
    p99: sorted[Math.floor(len * 0.99)] || 0,
    avg: times.reduce((sum, time) => sum + time, 0) / len || 0,
    min: Math.min(...times) || 0,
    max: Math.max(...times) || 0,
  };
}

// Основная функция тестирования
async function runLoadTest() {
  console.log("🏃‍♂️ Running Load Test...");
  console.log("─".repeat(40));

  const startTime = Date.now();

  // Этап 1: Search API (30 секунд)
  console.log("\n🔍 Stage 1: Search API Testing (0-30s)");
  const searchStartTime = Date.now();
  const searchPromises = [];

  while (Date.now() - searchStartTime < 30000) {
    for (let i = 0; i < 10; i++) {
      searchPromises.push(testSearchAPI());
    }

    // Небольшая задержка для имитации реального поведения
    await new Promise((resolve) => setTimeout(resolve, 100));
  }

  await Promise.all(searchPromises);
  console.log(`   ✅ Search stage completed: ${metrics.requests} requests`);

  // Этап 2: Booking API (30 секунд)
  console.log("\n📝 Stage 2: Booking API Testing (30-60s)");
  const bookingStartTime = Date.now();
  const bookingPromises = [];

  while (Date.now() - bookingStartTime < 30000) {
    for (let i = 0; i < 10; i++) {
      bookingPromises.push(testBookingAPI());
    }

    await new Promise((resolve) => setTimeout(resolve, 150));
  }

  await Promise.all(bookingPromises);
  console.log(`   ✅ Booking stage completed: ${metrics.requests} requests`);

  // Этап 3: Ramp Down
  console.log("\n⬇️  Stage 3: Ramp Down (60-70s)");
  await new Promise((resolve) => setTimeout(resolve, 10000));
  console.log("   ✅ Test completed successfully");

  const totalTime = Date.now() - startTime;

  // Анализ результатов
  const httpDuration = calculatePercentiles(metrics.responseTimes);
  const searchLatency = calculatePercentiles(metrics.searchTimes);
  const bookingLatency = calculatePercentiles(metrics.bookingTimes);

  const errorRate = (metrics.errors / metrics.requests) * 100;
  const throughput = metrics.requests / (totalTime / 1000);

  const results = {
    timestamp: new Date().toISOString(),
    environment: "staging",
    targetUrl: STAGING_URL,
    testDuration: `${Math.round(totalTime / 1000)}s`,
    vus: 10,
    metrics: {
      http_req_duration: {
        p50: httpDuration.p50.toFixed(2),
        p95: httpDuration.p95.toFixed(2),
        p99: httpDuration.p99.toFixed(2),
        avg: httpDuration.avg.toFixed(2),
        min: httpDuration.min.toFixed(2),
        max: httpDuration.max.toFixed(2),
      },
      http_req_failed: {
        rate: errorRate.toFixed(2) + "%",
        count: metrics.errors,
      },
      http_reqs: {
        total: metrics.requests,
        rate: throughput.toFixed(2),
      },
      search_latency: {
        p50: searchLatency.p50.toFixed(2),
        p95: searchLatency.p95.toFixed(2),
        p99: searchLatency.p99.toFixed(2),
        avg: searchLatency.avg.toFixed(2),
      },
      booking_latency: {
        p50: bookingLatency.p50.toFixed(2),
        p95: bookingLatency.p95.toFixed(2),
        p99: bookingLatency.p99.toFixed(2),
        avg: bookingLatency.avg.toFixed(2),
      },
    },
    thresholds: {
      http_req_duration: {
        threshold: "p(95)<2000",
        passed: httpDuration.p95 < 2000,
        value: httpDuration.p95.toFixed(2) + "ms",
      },
      http_req_failed: {
        threshold: "rate<0.1",
        passed: errorRate < 10,
        value: errorRate.toFixed(2) + "%",
      },
      search_latency: {
        threshold: "p(95)<1500",
        passed: searchLatency.p95 < 1500,
        value: searchLatency.p95.toFixed(2) + "ms",
      },
    },
  };

  // Отображение результатов
  displayResults(results);

  // Сохранение отчета
  saveReport(results);

  return results;
}

function displayResults(results) {
  console.log("\n📊 K6 Load Test Results Summary");
  console.log("═".repeat(60));
  console.log(`📍 Target: ${results.targetUrl}`);
  console.log(
    `⏰ Duration: ${results.testDuration} (30s search + 30s booking + 10s ramp-down)`
  );
  console.log(`👥 VUs: ${results.vus}`);
  console.log("");

  console.log("📈 Performance Metrics:");
  console.log(
    `• Response Time (p50/p95/p99): ${results.metrics.http_req_duration.p50}ms / ${results.metrics.http_req_duration.p95}ms / ${results.metrics.http_req_duration.p99}ms`
  );
  console.log(`• Error Rate: ${results.metrics.http_req_failed.rate}`);
  console.log(`• Total Requests: ${results.metrics.http_reqs.total}`);
  console.log(`• Request Rate: ${results.metrics.http_reqs.rate} req/s`);
  console.log("");

  console.log("🔍 Search API Metrics:");
  console.log(
    `• Latency (p50/p95/p99): ${results.metrics.search_latency.p50}ms / ${results.metrics.search_latency.p95}ms / ${results.metrics.search_latency.p99}ms`
  );
  console.log("");

  console.log("📝 Booking API Metrics:");
  console.log(
    `• Latency (p50/p95/p99): ${results.metrics.booking_latency.p50}ms / ${results.metrics.booking_latency.p95}ms / ${results.metrics.booking_latency.p99}ms`
  );
  console.log("");

  console.log("✅ Thresholds:");
  Object.entries(results.thresholds).forEach(([name, threshold]) => {
    const status = threshold.passed ? "✅ PASS" : "❌ FAIL";
    console.log(
      `• ${name}: ${status} (${threshold.threshold}) - ${threshold.value}`
    );
  });

  // Анализ производительности
  const p95 = parseFloat(results.metrics.http_req_duration.p95);
  const errorRate = parseFloat(results.metrics.http_req_failed.rate);

  console.log("");
  console.log("🎯 Performance Analysis:");
  if (p95 < 1000) {
    console.log("✅ Excellent response times (p95 < 1s)");
  } else if (p95 < 2000) {
    console.log("✅ Good response times (p95 < 2s)");
  } else {
    console.log("⚠️  Response times need optimization (p95 > 2s)");
  }

  if (errorRate < 1) {
    console.log("✅ Excellent error rate (< 1%)");
  } else if (errorRate < 5) {
    console.log("✅ Acceptable error rate (< 5%)");
  } else {
    console.log("❌ High error rate (> 5%) - needs investigation");
  }

  const throughput = parseFloat(results.metrics.http_reqs.rate);
  if (throughput > 20) {
    console.log("✅ High throughput (> 20 req/s)");
  } else if (throughput > 10) {
    console.log("✅ Moderate throughput (> 10 req/s)");
  } else {
    console.log("⚠️  Low throughput (< 10 req/s) - consider scaling");
  }
}

function saveReport(results) {
  const fs = require("fs");
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const filename = `test-results/k6-realistic-test-${timestamp}.json`;

  if (!fs.existsSync("test-results")) {
    fs.mkdirSync("test-results", { recursive: true });
  }

  fs.writeFileSync(filename, JSON.stringify(results, null, 2));
  console.log(`\n💾 Detailed report saved to: ${filename}`);
}

// Запуск теста
runLoadTest().catch((error) => {
  console.error("\n💥 Critical Error:", error);
  process.exit(1);
});
