import http from "k6/http";
/* eslint-disable @typescript-eslint/no-require-imports */
import { check, sleep } from "k6";
import { Rate, Trend } from "k6/metrics";

// Кастомные метрики
const errorRate = new Rate("error_rate");
const searchLatency = new Trend("search_latency");
const bookingLatency = new Trend("booking_latency");

// Конфигурация теста
export const options = {
  stages: [
    // Этап 1: Поиск - 10 VUs в течение 30 секунд
    { duration: "30s", target: 10 },
    // Этап 2: Бронирование - 10 VUs в течение 30 секунд
    { duration: "30s", target: 10 },
    // Этап 3: Снижение нагрузки
    { duration: "10s", target: 0 },
  ],
  thresholds: {
    // Пороги производительности
    http_req_duration: ["p(95)<2000"], // 95% запросов должны быть быстрее 2с
    http_req_failed: ["rate<0.1"], // Менее 10% ошибок
    error_rate: ["rate<0.05"], // Менее 5% ошибок
  },
};

// Конфигурация окружения
const STAGING_URL = __ENV.STAGING_URL || "https://staging.nomado-breeze.com";
const API_BASE = `${STAGING_URL}/api`;

console.log(`🚀 Запуск нагрузочного теста k6`);
console.log(`📍 Target URL: ${STAGING_URL}`);
console.log(`⏰ Начало: ${new Date().toISOString()}`);

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
    startAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    endAt: new Date(
      Date.now() + 24 * 60 * 60 * 1000 + 2 * 60 * 60 * 1000
    ).toISOString(),
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
    startAt: new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString(),
    endAt: new Date(
      Date.now() + 48 * 60 * 60 * 1000 + 4 * 60 * 60 * 1000
    ).toISOString(),
    durationMinutes: 240,
    type: "day",
    price: 150.0,
    currency: "USD",
    status: "pending",
  },
];

export default function () {
  const stage = getCurrentStage();

  if (stage <= 1) {
    // Этап 1: Тестирование поиска
    testSearchAPI();
  } else {
    // Этап 2: Тестирование бронирования
    testBookingAPI();
  }

  sleep(1); // Пауза между запросами
}

function testSearchAPI() {
  const location =
    searchLocations[Math.floor(Math.random() * searchLocations.length)];
  const radius = Math.floor(Math.random() * 20) + 5; // 5-25 км
  const limit = Math.floor(Math.random() * 20) + 10; // 10-30 результатов

  const params = {
    location: location,
    radius: radius.toString(),
    limit: limit.toString(),
  };

  const url = `${API_BASE}/search?${new URLSearchParams(params)}`;

  const startTime = Date.now();
  const response = http.get(url, {
    headers: {
      "Content-Type": "application/json",
      "User-Agent": "k6-load-test/1.0",
    },
    timeout: "10s",
  });
  const endTime = Date.now();

  const success = check(response, {
    "search status is 200": (r) => r.status === 200,
    "search response time < 2s": (r) => r.timings.duration < 2000,
    "search has valid JSON": (r) => {
      try {
        const body = JSON.parse(r.body);
        return body.success !== undefined;
      } catch {
        return false;
      }
    },
    "search returns data": (r) => {
      try {
        const body = JSON.parse(r.body);
        return body.data && body.data.spaces !== undefined;
      } catch {
        return false;
      }
    },
  });

  errorRate.add(!success);
  searchLatency.add(endTime - startTime);

  if (!success) {
    console.error(`❌ Search failed: ${response.status} - ${response.body}`);
  }
}

function testBookingAPI() {
  const payload =
    bookingPayloads[Math.floor(Math.random() * bookingPayloads.length)];

  // Добавляем случайность к времени для избежания конфликтов
  const now = Date.now();
  const randomOffset = Math.floor(Math.random() * 24 * 60 * 60 * 1000); // до 24 часов
  payload.startAt = new Date(
    now + 24 * 60 * 60 * 1000 + randomOffset
  ).toISOString();
  payload.endAt = new Date(
    now + 24 * 60 * 60 * 1000 + randomOffset + 2 * 60 * 60 * 1000
  ).toISOString();

  const url = `${API_BASE}/bookings`;

  const startTime = Date.now();
  const response = http.post(url, JSON.stringify(payload), {
    headers: {
      "Content-Type": "application/json",
      "User-Agent": "k6-load-test/1.0",
    },
    timeout: "15s",
  });
  const endTime = Date.now();

  const success = check(response, {
    "booking status is 200 or 201": (r) => r.status === 200 || r.status === 201,
    "booking response time < 3s": (r) => r.timings.duration < 3000,
    "booking has valid JSON": (r) => {
      try {
        const body = JSON.parse(r.body);
        return body.success !== undefined;
      } catch {
        return false;
      }
    },
  });

  errorRate.add(!success);
  bookingLatency.add(endTime - startTime);

  if (!success) {
    console.error(`❌ Booking failed: ${response.status} - ${response.body}`);
  }
}

function getCurrentStage() {
  // Простая логика определения этапа на основе времени выполнения
  const elapsed = __ENV.K6_EXECUTION_TIME || 0;
  if (elapsed < 30) return 1; // Поиск
  if (elapsed < 60) return 2; // Бронирование
  return 3; // Завершение
}

export function handleSummary(data) {
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const filename = `test-results/k6-load-test-${timestamp}.json`;

  // Создаем директорию если не существует
  if (!__ENV.K6_WORKER_ID) {
    const fs = require("fs");
    if (!fs.existsSync("test-results")) {
      fs.mkdirSync("test-results", { recursive: true });
    }
  }

  const summary = {
    timestamp: new Date().toISOString(),
    environment: "staging",
    targetUrl: STAGING_URL,
    testDuration: "70s",
    vus: 10,
    stages: [
      "30s: Search API testing (10 VUs)",
      "30s: Booking API testing (10 VUs)",
      "10s: Ramp down",
    ],
    metrics: {
      // HTTP метрики
      http_req_duration: {
        p50: data.metrics.http_req_duration.values["p(50)"].toFixed(2),
        p95: data.metrics.http_req_duration.values["p(95)"].toFixed(2),
        p99: data.metrics.http_req_duration.values["p(99)"].toFixed(2),
        avg: data.metrics.http_req_duration.values.avg.toFixed(2),
        min: data.metrics.http_req_duration.values.min.toFixed(2),
        max: data.metrics.http_req_duration.values.max.toFixed(2),
      },
      http_req_failed: {
        rate: (data.metrics.http_req_failed.values.rate * 100).toFixed(2) + "%",
        count: data.metrics.http_req_failed.values.count,
      },
      http_reqs: {
        total: data.metrics.http_reqs.values.count,
        rate: data.metrics.http_reqs.values.rate.toFixed(2),
      },
      // Кастомные метрики
      error_rate: {
        rate: (data.metrics.error_rate.values.rate * 100).toFixed(2) + "%",
      },
      search_latency: {
        p50: data.metrics.search_latency.values["p(50)"].toFixed(2),
        p95: data.metrics.search_latency.values["p(95)"].toFixed(2),
        p99: data.metrics.search_latency.values["p(99)"].toFixed(2),
        avg: data.metrics.search_latency.values.avg.toFixed(2),
      },
      booking_latency: {
        p50: data.metrics.booking_latency.values["p(50)"].toFixed(2),
        p95: data.metrics.booking_latency.values["p(95)"].toFixed(2),
        p99: data.metrics.booking_latency.values["p(99)"].toFixed(2),
        avg: data.metrics.booking_latency.values.avg.toFixed(2),
      },
    },
    thresholds: {
      passed: Object.keys(data.thresholds || {}).filter(
        (key) => data.thresholds[key].ok
      ).length,
      failed: Object.keys(data.thresholds || {}).filter(
        (key) => !data.thresholds[key].ok
      ).length,
    },
    rawData: data,
  };

  return {
    stdout: `\n📊 K6 Load Test Results Summary:
📍 Target: ${STAGING_URL}
⏰ Duration: 70s (30s search + 30s booking + 10s ramp-down)
👥 VUs: 10

📈 Performance Metrics:
• Response Time (p50/p95/p99): ${summary.metrics.http_req_duration.p50}ms / ${summary.metrics.http_req_duration.p95}ms / ${summary.metrics.http_req_duration.p99}ms
• Error Rate: ${summary.metrics.http_req_failed.rate}
• Total Requests: ${summary.metrics.http_reqs.total}
• Request Rate: ${summary.metrics.http_reqs.rate} req/s

🔍 Search API Metrics:
• Latency (p50/p95/p99): ${summary.metrics.search_latency.p50}ms / ${summary.metrics.search_latency.p95}ms / ${summary.metrics.search_latency.p99}ms

📝 Booking API Metrics:
• Latency (p50/p95/p99): ${summary.metrics.booking_latency.p50}ms / ${summary.metrics.booking_latency.p95}ms / ${summary.metrics.booking_latency.p99}ms

✅ Thresholds: ${summary.thresholds.passed} passed, ${summary.thresholds.failed} failed

💾 Detailed report saved to: ${filename}
`,
    [filename]: JSON.stringify(summary, null, 2),
  };
}
