#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-require-imports */

/**
 * smoke-tests.js
 * Автоматизированные smoke-тесты для staging-окружения
 * Тестирует основные API endpoints
 */

const fetch = require("node-fetch");

// Конфигурация
const BASE_URL = process.env.API_BASE_URL || "http://localhost:3000";
const STAGING_URL =
  process.env.STAGING_URL || "https://staging.nomado-breeze.com";

const API_URL = process.env.NODE_ENV === "staging" ? STAGING_URL : BASE_URL;

console.log("🧪 Запуск smoke-тестов для staging...");
console.log(`📍 API URL: ${API_URL}`);
console.log(`⏰ Время запуска: ${new Date().toISOString()}`);
console.log("─".repeat(60));

// Результаты тестов
const testResults = [];

// Утилиты
async function makeRequest(endpoint, options = {}) {
  const url = `${API_URL}${endpoint}`;
  const defaultOptions = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const requestOptions = { ...defaultOptions, ...options };

  console.log(`\n🔗 ${requestOptions.method || "GET"} ${endpoint}`);

  try {
    const response = await fetch(url, requestOptions);
    const responseText = await response.text();

    let responseBody;
    try {
      responseBody = JSON.parse(responseText);
    } catch {
      responseBody = responseText;
    }

    const result = {
      url,
      method: requestOptions.method || "GET",
      status: response.status,
      statusText: response.statusText,
      headers: Object.fromEntries(response.headers.entries()),
      body: responseBody,
      timestamp: new Date().toISOString(),
    };

    console.log(`✅ Status: ${response.status} ${response.statusText}`);
    console.log(`📄 Response:`, JSON.stringify(responseBody, null, 2));

    return result;
  } catch (error) {
    console.error(`❌ Error:`, error.message);
    return {
      url,
      method: requestOptions.method || "GET",
      error: error.message,
      timestamp: new Date().toISOString(),
    };
  }
}

// Тест 1: Create User
async function testCreateUser() {
  console.log("\n🧪 ТЕСТ 1: Create User");
  console.log("─".repeat(40));

  const userData = {
    email: `test-user-${Date.now()}@example.com`,
    name: "Test User",
    role: "guest",
  };

  const result = await makeRequest("/api/users", {
    method: "POST",
    body: JSON.stringify(userData),
  });

  testResults.push({
    test: "create_user",
    result,
    expected: { status: [200, 201] },
    passed: result.status === 200 || result.status === 201,
  });

  return result;
}

// Тест 2: Geo-search
async function testGeoSearch() {
  console.log("\n🧪 ТЕСТ 2: Geo-search");
  console.log("─".repeat(40));

  const searchParams = new URLSearchParams({
    location: "37.7749,-122.4194", // San Francisco coordinates
    radius: "10",
    limit: "10",
  });

  const result = await makeRequest(`/api/search?${searchParams}`);

  testResults.push({
    test: "geo_search",
    result,
    expected: { status: [200] },
    passed: result.status === 200,
  });

  return result;
}

// Тест 3: Create Booking (Happy Path)
async function testCreateBooking() {
  console.log("\n🧪 ТЕСТ 3: Create Booking (Happy Path)");
  console.log("─".repeat(40));

  const bookingData = {
    userId: "507f1f77bcf86cd799439011", // Mock ObjectId
    spaceId: "507f1f77bcf86cd799439012", // Mock ObjectId
    unitId: "507f1f77bcf86cd799439013", // Mock ObjectId
    startAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // Tomorrow
    endAt: new Date(
      Date.now() + 24 * 60 * 60 * 1000 + 2 * 60 * 60 * 1000
    ).toISOString(), // Tomorrow + 2 hours
    durationMinutes: 120,
    type: "hourly",
    price: 50.0,
    currency: "USD",
    status: "pending",
  };

  const result = await makeRequest("/api/bookings", {
    method: "POST",
    body: JSON.stringify(bookingData),
  });

  testResults.push({
    test: "create_booking_happy",
    result,
    expected: { status: [200, 201] },
    passed: result.status === 200 || result.status === 201,
  });

  return result;
}

// Тест 4: Create Conflicting Booking (Expect 409)
async function testCreateConflictingBooking() {
  console.log("\n🧪 ТЕСТ 4: Create Conflicting Booking (Expect 409)");
  console.log("─".repeat(40));

  const conflictingBookingData = {
    userId: "507f1f77bcf86cd799439011",
    spaceId: "507f1f77bcf86cd799439012",
    unitId: "507f1f77bcf86cd799439013",
    startAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // Same time as previous
    endAt: new Date(
      Date.now() + 24 * 60 * 60 * 1000 + 2 * 60 * 60 * 1000
    ).toISOString(),
    durationMinutes: 120,
    type: "hourly",
    price: 50.0,
    currency: "USD",
    status: "pending",
  };

  const result = await makeRequest("/api/bookings", {
    method: "POST",
    body: JSON.stringify(conflictingBookingData),
  });

  testResults.push({
    test: "create_booking_conflict",
    result,
    expected: { status: [409] },
    passed: result.status === 409,
  });

  return result;
}

// Тест 5: Request Non-existent Page (Assert 404)
async function testNotFoundPage() {
  console.log("\n🧪 ТЕСТ 5: Request Non-existent Page (Assert 404)");
  console.log("─".repeat(40));

  const result = await makeRequest("/api/non-existent-endpoint");

  testResults.push({
    test: "not_found_page",
    result,
    expected: { status: [404] },
    passed: result.status === 404,
  });

  return result;
}

// Основная функция
async function runSmokeTests() {
  try {
    console.log("🚀 Начинаем smoke-тесты...\n");

    // Запускаем все тесты
    await testCreateUser();
    await testGeoSearch();
    await testCreateBooking();
    await testCreateConflictingBooking();
    await testNotFoundPage();

    // Анализ результатов
    console.log("\n📊 РЕЗУЛЬТАТЫ ТЕСТИРОВАНИЯ");
    console.log("═".repeat(60));

    const totalTests = testResults.length;
    const passedTests = testResults.filter((test) => test.passed).length;
    const failedTests = totalTests - passedTests;

    console.log(`📈 Всего тестов: ${totalTests}`);
    console.log(`✅ Прошло: ${passedTests}`);
    console.log(`❌ Провалилось: ${failedTests}`);
    console.log(
      `📊 Успешность: ${((passedTests / totalTests) * 100).toFixed(1)}%`
    );

    console.log("\n📋 ДЕТАЛЬНЫЕ РЕЗУЛЬТАТЫ:");
    console.log("─".repeat(60));

    testResults.forEach((test, index) => {
      const status = test.passed ? "✅" : "❌";
      console.log(`${index + 1}. ${status} ${test.test.toUpperCase()}`);
      console.log(`   Expected: ${test.expected.status.join(" or ")}`);
      console.log(`   Actual: ${test.result.status || "ERROR"}`);
      if (!test.passed) {
        console.log(`   Error: ${test.result.error || "Status mismatch"}`);
      }
      console.log();
    });

    // Сохранение результатов
    const resultsFile = `test-results/smoke-test-results-${Date.now()}.json`;
    require("fs").writeFileSync(
      resultsFile,
      JSON.stringify(
        {
          timestamp: new Date().toISOString(),
          environment: process.env.NODE_ENV || "development",
          apiUrl: API_URL,
          summary: {
            total: totalTests,
            passed: passedTests,
            failed: failedTests,
            successRate: ((passedTests / totalTests) * 100).toFixed(1) + "%",
          },
          tests: testResults,
        },
        null,
        2
      )
    );

    console.log(`💾 Результаты сохранены в: ${resultsFile}`);

    // Возвращаем код выхода
    if (failedTests > 0) {
      console.log("\n❌ НЕКОТОРЫЕ ТЕСТЫ ПРОВАЛИЛИСЬ!");
      process.exit(1);
    } else {
      console.log("\n🎉 ВСЕ ТЕСТЫ ПРОШЛИ УСПЕШНО!");
      process.exit(0);
    }
  } catch (error) {
    console.error("\n💥 КРИТИЧЕСКАЯ ОШИБКА:", error);
    process.exit(1);
  }
}

// Проверка зависимостей
try {
  require("node-fetch");
} catch (error) {
  console.error("❌ Ошибка: node-fetch не установлен");
  console.error("Установите: npm install node-fetch");
  process.exit(1);
}

// Запуск тестов
runSmokeTests();
