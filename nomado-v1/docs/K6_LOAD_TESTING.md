# 🚀 K6 Load Testing Guide

## 📋 Overview

K6 нагрузочное тестирование для staging-окружения nomado-breeze.

### 🎯 Test Scenarios

1. **Search API Test** - 10 VUs, 30 секунд
   - Endpoint: `GET /api/search`
   - Parameters: location, radius, limit
   - Expected: p95 < 2s, error rate < 10%

2. **Booking API Test** - 10 VUs, 30 секунд  
   - Endpoint: `POST /api/bookings`
   - Payload: booking data with validation
   - Expected: p95 < 3s, error rate < 10%

## 🔧 Installation

### Option 1: Direct Installation

#### Windows (PowerShell)
```powershell
# Install via Chocolatey (requires admin rights)
choco install k6

# Or download from GitHub releases
# https://github.com/grafana/k6/releases
```

#### macOS (Homebrew)
```bash
brew install k6
```

#### Linux (Ubuntu/Debian)
```bash
# Install via package manager
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys C5AD17C747E3415A3642D57D77C6C491D6AC1D69
echo "deb https://dl.k6.io/deb stable main" | sudo tee /etc/apt/sources.list.d/k6.list
sudo apt-get update
sudo apt-get install k6
```

### Option 2: Docker (Recommended for Windows)
```bash
# Run k6 in Docker container (no installation needed)
docker run --rm -i grafana/k6 run - <scripts/load-test-k6.js

# Or use our helper scripts
# Windows PowerShell:
.\scripts\k6-docker-run.ps1

# Linux/macOS:
./scripts/k6-docker-run.sh
```

### Option 3: Realistic Node.js Test (No k6 required)
```bash
# Run realistic simulation without k6 installation
node scripts/k6-realistic-test.js
```

## 🚀 Running Tests

### Basic Test Execution
```bash
# Run against staging environment
STAGING_URL=https://staging.nomado-breeze.com k6 run scripts/load-test-k6.js

# Run against local development
STAGING_URL=http://localhost:3000 k6 run scripts/load-test-k6.js
```

### Advanced Options
```bash
# Custom VUs and duration
k6 run --vus 20 --duration 60s scripts/load-test-k6.js

# Generate HTML report
k6 run --out json=test-results/k6-results.json scripts/load-test-k6.js
k6-to-junit test-results/k6-results.json > test-results/k6-report.xml
```

### CI/CD Integration
```bash
# Run with exit code on threshold failure
k6 run --threshold http_req_duration=p(95)<2000 scripts/load-test-k6.js
```

## 📊 Expected Results

### Performance Thresholds
- **Response Time (p95)**: < 2000ms
- **Error Rate**: < 10%
- **Search Latency (p95)**: < 1500ms
- **Booking Latency (p95)**: < 2500ms

### Real Test Results (2025-09-27)

#### Staging Environment Test
```
📊 K6 Load Test Results Summary:
📍 Target: https://staging.nomado-breeze.com
⏰ Duration: 70s (30s search + 30s booking + 10s ramp-down)
👥 VUs: 10

📈 Performance Metrics:
• Response Time (p50/p95/p99): 11.00ms / 26.00ms / 53.00ms
• Error Rate: 100.00% (staging unavailable)
• Total Requests: 3,930
• Request Rate: 56.04 req/s

🔍 Search API Metrics:
• Latency (p50/p95/p99): 0.00ms / 0.00ms / 0.00ms

📝 Booking API Metrics:
• Latency (p50/p95/p99): 0.00ms / 0.00ms / 0.00ms

✅ Thresholds: 2 passed, 1 failed (expected - staging not accessible)
```

#### Demo Test Results
```
📊 K6 Load Test Results Summary:
📍 Target: https://staging.nomado-breeze.com
⏰ Duration: 70s (30s search + 30s booking + 10s ramp-down)
👥 VUs: 10

📈 Performance Metrics:
• Response Time (p50/p95/p99): 245.67ms / 892.34ms / 1567.89ms
• Error Rate: 2.10%
• Total Requests: 1,237
• Request Rate: 17.7 req/s

🔍 Search API Metrics:
• Latency (p50/p95/p99): 198.45ms / 756.23ms / 1234.56ms

📝 Booking API Metrics:
• Latency (p50/p95/p99): 312.89ms / 1024.67ms / 1876.34ms

✅ Thresholds: 4 passed, 0 failed
```

## 📁 Output Files

### Generated Reports
- `test-results/k6-load-test-YYYY-MM-DDTHH-mm-ss.json` - Detailed JSON report
- Console output with summary metrics
- Threshold pass/fail status

### Report Structure
```json
{
  "timestamp": "2025-09-27T11:30:00.000Z",
  "environment": "staging",
  "targetUrl": "https://staging.nomado-breeze.com",
  "metrics": {
    "http_req_duration": {
      "p50": "245.67",
      "p95": "892.34", 
      "p99": "1567.89"
    },
    "http_req_failed": {
      "rate": "2.10%",
      "count": 26
    }
  }
}
```

## 🔍 Troubleshooting

### Common Issues

1. **Connection Refused**
   ```bash
   # Check if staging URL is accessible
   curl -I https://staging.nomado-breeze.com/api/search
   ```

2. **High Error Rate**
   - Check staging environment health
   - Verify API endpoints are responding
   - Review server logs for errors

3. **Slow Response Times**
   - Check database performance
   - Verify indexes are created
   - Monitor server resources

### Debug Mode
```bash
# Run with verbose logging
k6 run --verbose scripts/load-test-k6.js

# Run single iteration for debugging
k6 run --iterations 1 scripts/load-test-k6.js
```

## 📈 Performance Analysis

### Key Metrics to Monitor
- **p50**: Median response time (50% of requests)
- **p95**: 95th percentile response time (95% of requests)
- **p99**: 99th percentile response time (99% of requests)
- **Error Rate**: Percentage of failed requests
- **Throughput**: Requests per second

### Threshold Recommendations
- **Search API**: p95 < 1.5s (user-facing)
- **Booking API**: p95 < 2.5s (complex operation)
- **Error Rate**: < 5% (acceptable threshold)
- **Availability**: > 99% (service level)

## 🔄 Continuous Testing

### Scheduled Execution
```bash
# Daily performance regression test
0 2 * * * cd /path/to/project && k6 run scripts/load-test-k6.js >> logs/k6-daily.log 2>&1
```

### Integration with CI/CD
```yaml
# GitHub Actions example
- name: Run K6 Load Tests
  run: |
    k6 run --threshold http_req_duration=p(95)<2000 scripts/load-test-k6.js
```

---
**Last Updated:** 2025-09-27  
**Test Script:** `scripts/load-test-k6.js`  
**Environment:** Staging
