#!/bin/bash

# k6-docker-run.sh
# Запуск k6 нагрузочного теста через Docker без установки k6

echo "🚀 Запуск k6 нагрузочного теста через Docker"
echo "═".repeat(60)

# Конфигурация
STAGING_URL=${STAGING_URL:-"https://staging.nomado-breeze.com"}
SCRIPT_PATH="scripts/load-test-k6.js"

echo "📍 Target URL: $STAGING_URL"
echo "📄 Script: $SCRIPT_PATH"
echo "⏰ Start Time: $(date -Iseconds)"
echo ""

# Проверяем наличие Docker
if ! command -v docker &> /dev/null; then
    echo "❌ Docker не установлен. Установите Docker Desktop для Windows"
    echo "📥 Download: https://www.docker.com/products/docker-desktop/"
    exit 1
fi

echo "✅ Docker найден: $(docker --version)"
echo ""

# Проверяем наличие скрипта
if [ ! -f "$SCRIPT_PATH" ]; then
    echo "❌ Скрипт k6 не найден: $SCRIPT_PATH"
    exit 1
fi

echo "✅ K6 скрипт найден: $SCRIPT_PATH"
echo ""

# Создаем временную директорию для результатов
RESULTS_DIR="test-results"
mkdir -p "$RESULTS_DIR"

echo "🏃‍♂️ Запуск k6 нагрузочного теста..."
echo "─".repeat(40)

# Запускаем k6 через Docker
docker run --rm -i \
  -e STAGING_URL="$STAGING_URL" \
  -v "$(pwd)/$SCRIPT_PATH:/scripts/load-test-k6.js:ro" \
  -v "$(pwd)/$RESULTS_DIR:/test-results" \
  grafana/k6:latest run \
  --out json=/test-results/k6-results.json \
  /scripts/load-test-k6.js

EXIT_CODE=$?

echo ""
echo "📊 Результаты тестирования:"
echo "─".repeat(40)

if [ $EXIT_CODE -eq 0 ]; then
    echo "✅ Тест завершен успешно!"
else
    echo "❌ Тест завершен с ошибками (код: $EXIT_CODE)"
fi

# Проверяем создание файла результатов
if [ -f "$RESULTS_DIR/k6-results.json" ]; then
    echo "✅ Результаты сохранены в: $RESULTS_DIR/k6-results.json"
    
    # Показываем краткую сводку
    echo ""
    echo "📈 Краткая сводка результатов:"
    if command -v jq &> /dev/null; then
        # Если jq установлен, показываем красивые результаты
        echo "• Всего запросов: $(jq -r '.metrics.http_reqs.values.count' $RESULTS_DIR/k6-results.json)"
        echo "• Ошибок: $(jq -r '.metrics.http_req_failed.values.count' $RESULTS_DIR/k6-results.json)"
        echo "• Время ответа (p95): $(jq -r '.metrics.http_req_duration.values["p(95)"]' $RESULTS_DIR/k6-results.json)ms"
    else
        echo "• Файл результатов создан: $RESULTS_DIR/k6-results.json"
        echo "• Установите jq для красивого отображения: choco install jq"
    fi
else
    echo "⚠️  Файл результатов не создан"
fi

echo ""
echo "💾 Подробные результаты в: $RESULTS_DIR/"
echo "📚 Документация: docs/K6_LOAD_TESTING.md"
echo ""

exit $EXIT_CODE
