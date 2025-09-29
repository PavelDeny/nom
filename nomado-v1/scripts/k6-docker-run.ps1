# k6-docker-run.ps1
# Запуск k6 нагрузочного теста через Docker на Windows

Write-Host "🚀 Запуск k6 нагрузочного теста через Docker" -ForegroundColor Green
Write-Host ("═" * 60) -ForegroundColor Gray

# Конфигурация
$STAGING_URL = if ($env:STAGING_URL) { $env:STAGING_URL } else { "https://staging.nomado-breeze.com" }
$SCRIPT_PATH = "scripts/load-test-k6.js"

Write-Host "📍 Target URL: $STAGING_URL" -ForegroundColor Cyan
Write-Host "📄 Script: $SCRIPT_PATH" -ForegroundColor Cyan
Write-Host "⏰ Start Time: $(Get-Date -Format 'yyyy-MM-ddTHH:mm:ssZ')" -ForegroundColor Cyan
Write-Host ""

# Проверяем наличие Docker
try {
    $dockerVersion = docker --version 2>$null
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Docker найден: $dockerVersion" -ForegroundColor Green
    } else {
        throw "Docker не найден"
    }
} catch {
    Write-Host "❌ Docker не установлен. Установите Docker Desktop для Windows" -ForegroundColor Red
    Write-Host "📥 Download: https://www.docker.com/products/docker-desktop/" -ForegroundColor Yellow
    exit 1
}

Write-Host ""

# Проверяем наличие скрипта
if (-not (Test-Path $SCRIPT_PATH)) {
    Write-Host "❌ Скрипт k6 не найден: $SCRIPT_PATH" -ForegroundColor Red
    exit 1
}

Write-Host "✅ K6 скрипт найден: $SCRIPT_PATH" -ForegroundColor Green
Write-Host ""

# Создаем директорию для результатов
$RESULTS_DIR = "test-results"
if (-not (Test-Path $RESULTS_DIR)) {
    New-Item -ItemType Directory -Path $RESULTS_DIR | Out-Null
}

Write-Host "🏃‍♂️ Запуск k6 нагрузочного теста..." -ForegroundColor Yellow
Write-Host ("─" * 40) -ForegroundColor Gray

# Получаем абсолютные пути для Docker
$currentDir = (Get-Location).Path
$scriptFullPath = Join-Path $currentDir $SCRIPT_PATH
$resultsFullPath = Join-Path $currentDir $RESULTS_DIR

# Запускаем k6 через Docker
Write-Host "🐳 Запуск Docker контейнера с k6..." -ForegroundColor Blue

$dockerCommand = @(
    "run", "--rm", "-i",
    "-e", "STAGING_URL=$STAGING_URL",
    "-v", "${scriptFullPath}:/scripts/load-test-k6.js:ro",
    "-v", "${resultsFullPath}:/test-results",
    "grafana/k6:latest", "run",
    "--out", "json=/test-results/k6-results.json",
    "/scripts/load-test-k6.js"
)

try {
    & docker @dockerCommand
    $exitCode = $LASTEXITCODE
} catch {
    Write-Host "❌ Ошибка запуска Docker: $_" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "📊 Результаты тестирования:" -ForegroundColor Green
Write-Host ("─" * 40) -ForegroundColor Gray

if ($exitCode -eq 0) {
    Write-Host "✅ Тест завершен успешно!" -ForegroundColor Green
} else {
    Write-Host "❌ Тест завершен с ошибками (код: $exitCode)" -ForegroundColor Red
}

# Проверяем создание файла результатов
$resultsFile = Join-Path $RESULTS_DIR "k6-results.json"
if (Test-Path $resultsFile) {
    Write-Host "✅ Результаты сохранены в: $resultsFile" -ForegroundColor Green
    
    Write-Host ""
    Write-Host "📈 Краткая сводка результатов:" -ForegroundColor Yellow
    
    try {
        # Читаем JSON результаты
        $results = Get-Content $resultsFile | ConvertFrom-Json
        
        if ($results.metrics.http_reqs.values.count) {
            Write-Host "• Всего запросов: $($results.metrics.http_reqs.values.count)" -ForegroundColor White
        }
        if ($results.metrics.http_req_failed.values.count) {
            Write-Host "• Ошибок: $($results.metrics.http_req_failed.values.count)" -ForegroundColor White
        }
        if ($results.metrics.http_req_duration.values.'p(95)') {
            $p95 = [math]::Round($results.metrics.http_req_duration.values.'p(95)', 2)
            Write-Host "• Время ответа (p95): ${p95}ms" -ForegroundColor White
        }
        if ($results.metrics.http_req_failed.values.rate) {
            $errorRate = [math]::Round($results.metrics.http_req_failed.values.rate * 100, 2)
            Write-Host "• Процент ошибок: ${errorRate}%" -ForegroundColor White
        }
    } catch {
        Write-Host "• Файл результатов создан: $resultsFile" -ForegroundColor White
        Write-Host "• Ошибка парсинга JSON: $_" -ForegroundColor Yellow
    }
} else {
    Write-Host "⚠️  Файл результатов не создан" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "💾 Подробные результаты в: $RESULTS_DIR/" -ForegroundColor Cyan
Write-Host "📚 Документация: docs/K6_LOAD_TESTING.md" -ForegroundColor Cyan
Write-Host ""

exit $exitCode
