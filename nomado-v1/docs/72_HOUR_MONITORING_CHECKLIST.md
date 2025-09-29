# 72-Hour Monitoring Checklist
## Nomado Breeze - Post-Deployment Monitoring Plan

### 🎯 **Monitoring Overview**
Comprehensive 72-hour monitoring plan for post-deployment validation, including performance metrics, error tracking, database monitoring, and incident response procedures.

---

## 📊 **Critical Metrics to Monitor**

### ⚡ **Performance Metrics**

#### **Response Time (p95)**
- **Target**: < 2 seconds
- **Warning**: 2-3 seconds
- **Critical**: > 3 seconds

**Monitoring Commands:**
```bash
# Check p95 response time
curl "http://localhost:9090/api/v1/query?query=histogram_quantile(0.95,rate(http_request_duration_seconds_bucket{job=\"nomado-breeze\"}[5m]))"

# Check average response time
curl "http://localhost:9090/api/v1/query?query=rate(http_request_duration_seconds_sum{job=\"nomado-breeze\"}[5m])/rate(http_request_duration_seconds_count{job=\"nomado-breeze\"}[5m])"

# Check response time by endpoint
curl "http://localhost:9090/api/v1/query?query=histogram_quantile(0.95,rate(http_request_duration_seconds_bucket{job=\"nomado-breeze\",endpoint=~\".*\"}[5m]))"
```

#### **Throughput (Requests/Second)**
- **Target**: > 100 req/s
- **Warning**: 50-100 req/s
- **Critical**: < 50 req/s

**Monitoring Commands:**
```bash
# Check request rate
curl "http://localhost:9090/api/v1/query?query=rate(http_requests_total{job=\"nomado-breeze\"}[5m])"

# Check request rate by endpoint
curl "http://localhost:9090/api/v1/query?query=rate(http_requests_total{job=\"nomado-breeze\",endpoint=~\".*\"}[5m])"
```

---

### ❌ **Error Rate Monitoring**

#### **HTTP Error Rates**
- **Target**: < 1%
- **Warning**: 1-5%
- **Critical**: > 5%

**Monitoring Commands:**
```bash
# Check 4xx error rate
curl "http://localhost:9090/api/v1/query?query=rate(http_requests_total{job=\"nomado-breeze\",status=~\"4..\"}[5m])/rate(http_requests_total{job=\"nomado-breeze\"}[5m])"

# Check 5xx error rate
curl "http://localhost:9090/api/v1/query?query=rate(http_requests_total{job=\"nomado-breeze\",status=~\"5..\"}[5m])/rate(http_requests_total{job=\"nomado-breeze\"}[5m])"

# Check error rate by endpoint
curl "http://localhost:9090/api/v1/query?query=rate(http_requests_total{job=\"nomado-breeze\",status=~\"5..\",endpoint=~\".*\"}[5m])/rate(http_requests_total{job=\"nomado-breeze\",endpoint=~\".*\"}[5m])"
```

#### **Application Error Rates**
- **Target**: < 0.1%
- **Warning**: 0.1-1%
- **Critical**: > 1%

**Monitoring Commands:**
```bash
# Check application errors
curl "http://localhost:9090/api/v1/query?query=rate(application_errors_total{job=\"nomado-breeze\"}[5m])"

# Check error types
curl "http://localhost:9090/api/v1/query?query=rate(application_errors_total{job=\"nomado-breeze\",error_type=~\".*\"}[5m])"
```

---

### 🗄️ **Database Monitoring**

#### **Slow Query Detection**
- **Target**: < 100ms
- **Warning**: 100-500ms
- **Critical**: > 500ms

**Monitoring Commands:**
```bash
# Check MongoDB slow queries
kubectl exec -n production deployment/nomado-breeze -- node -e "
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.db.admin().command({currentOp: 1, 'active': true, 'secs_running': {'$gt': 1}})
  .then(result => console.log('Slow queries:', result.inprog.length))
  .catch(err => console.error('Error:', err));
"

# Check TypeORM query performance
kubectl exec -n production deployment/nomado-breeze -- node -e "
const { getDataSource } = require('./src/lib/typeorm/data-source');
getDataSource().then(ds => {
  ds.query('SHOW PROCESSLIST').then(result => {
    const slowQueries = result.filter(q => q.Time > 1);
    console.log('Slow queries:', slowQueries.length);
  });
}).catch(err => console.error('Error:', err));
"
```

#### **Database Connection Pool**
- **Target**: < 80% utilization
- **Warning**: 80-90%
- **Critical**: > 90%

**Monitoring Commands:**
```bash
# Check MongoDB connection pool
curl "http://localhost:9090/api/v1/query?query=mongodb_connections_current{job=\"nomado-breeze\"}"

# Check connection pool utilization
curl "http://localhost:9090/api/v1/query?query=mongodb_connections_current{job=\"nomado-breeze\"}/mongodb_connections_available{job=\"nomado-breeze\"}"
```

---

## 🚨 **Alert Configuration**

### 📱 **Alert Rules**

#### **Critical Alerts (P0)**
```yaml
# High error rate
- alert: HighErrorRate
  expr: rate(http_requests_total{status=~"5.."}[5m]) / rate(http_requests_total[5m]) > 0.05
  for: 2m
  labels:
    severity: critical
    team: backend
  annotations:
    summary: "High error rate detected"
    description: "Error rate is {{ $value | humanizePercentage }} for {{ $labels.job }}"

# High response time
- alert: HighResponseTime
  expr: histogram_quantile(0.95, rate(http_request_duration_seconds_bucket[5m])) > 3
  for: 5m
  labels:
    severity: critical
    team: backend
  annotations:
    summary: "High response time detected"
    description: "p95 response time is {{ $value }}s for {{ $labels.job }}"

# Database connection issues
- alert: DatabaseConnectionIssues
  expr: mongodb_connections_current / mongodb_connections_available > 0.9
  for: 1m
  labels:
    severity: critical
    team: backend
  annotations:
    summary: "Database connection pool near capacity"
    description: "Connection pool utilization is {{ $value | humanizePercentage }}"
```

#### **Warning Alerts (P1)**
```yaml
# Medium error rate
- alert: MediumErrorRate
  expr: rate(http_requests_total{status=~"5.."}[5m]) / rate(http_requests_total[5m]) > 0.01
  for: 5m
  labels:
    severity: warning
    team: backend
  annotations:
    summary: "Medium error rate detected"
    description: "Error rate is {{ $value | humanizePercentage }} for {{ $labels.job }}"

# Medium response time
- alert: MediumResponseTime
  expr: histogram_quantile(0.95, rate(http_request_duration_seconds_bucket[5m])) > 2
  for: 10m
  labels:
    severity: warning
    team: backend
  annotations:
    summary: "Medium response time detected"
    description: "p95 response time is {{ $value }}s for {{ $labels.job }}"

# Low throughput
- alert: LowThroughput
  expr: rate(http_requests_total[5m]) < 50
  for: 10m
  labels:
    severity: warning
    team: backend
  annotations:
    summary: "Low throughput detected"
    description: "Request rate is {{ $value }} req/s for {{ $labels.job }}"
```

---

## 📞 **Notification Procedures**

### 👥 **Escalation Matrix**

#### **Level 1: On-Call Engineer**
- **Contact**: +1-XXX-XXX-XXXX
- **Slack**: @oncall-engineer
- **Email**: oncall@nomado-breeze.com
- **Response Time**: 15 minutes
- **Responsibilities**: Initial triage, basic troubleshooting

#### **Level 2: Senior Engineer**
- **Contact**: +1-XXX-XXX-XXXX
- **Slack**: @senior-engineer
- **Email**: senior@nomado-breeze.com
- **Response Time**: 30 minutes
- **Responsibilities**: Complex troubleshooting, deployment issues

#### **Level 3: Engineering Manager**
- **Contact**: +1-XXX-XXX-XXXX
- **Slack**: @eng-manager
- **Email**: manager@nomado-breeze.com
- **Response Time**: 1 hour
- **Responsibilities**: Major incidents, resource allocation

#### **Level 4: CTO**
- **Contact**: +1-XXX-XXX-XXXX
- **Slack**: @cto
- **Email**: cto@nomado-breeze.com
- **Response Time**: 2 hours
- **Responsibilities**: Critical business impact, external communication

---

### 📢 **Alert Routing**

#### **Critical Alerts (P0)**
```
Slack: #nomado-critical-alerts
Email: critical-alerts@nomado-breeze.com
SMS: +1-XXX-XXX-XXXX
PagerDuty: nomado-critical
```

#### **Warning Alerts (P1)**
```
Slack: #nomado-warnings
Email: warnings@nomado-breeze.com
PagerDuty: nomado-warnings
```

#### **Info Alerts (P2)**
```
Slack: #nomado-info
Email: info@nomado-breeze.com
```

---

## 🔄 **Response Procedures**

### ⚡ **Immediate Response (0-15 minutes)**

#### **Critical Issues (P0)**
1. **Acknowledge Alert**
   ```bash
   # Acknowledge in PagerDuty
   curl -X POST https://api.pagerduty.com/incidents/{id}/acknowledge \
     -H "Authorization: Token token=YOUR_TOKEN" \
     -H "Content-Type: application/json"
   ```

2. **Initial Assessment**
   ```bash
   # Check system status
   kubectl get pods -n production -l app=nomado-breeze
   kubectl get services -n production
   kubectl get ingress -n production
   
   # Check logs
   kubectl logs -n production -l app=nomado-breeze --tail=100
   
   # Check metrics
   curl "http://localhost:9090/api/v1/query?query=up{job=\"nomado-breeze\"}"
   ```

3. **Notify Team**
   ```bash
   # Send Slack notification
   curl -X POST https://hooks.slack.com/services/XXX/XXX/XXX \
     -H 'Content-type: application/json' \
     --data '{"text":"🚨 CRITICAL ALERT: High error rate detected - investigating"}'
   ```

#### **Warning Issues (P1)**
1. **Monitor Closely**
   ```bash
   # Check if issue is escalating
   curl "http://localhost:9090/api/v1/query?query=rate(http_requests_total{status=~\"5..\"}[5m])"
   ```

2. **Document Issue**
   ```bash
   # Create incident ticket
   echo "Warning alert: $(date) - $(curl -s 'http://localhost:9090/api/v1/query?query=rate(http_requests_total{status=~\"5..\"}[5m])')" >> /tmp/incidents.log
   ```

---

### 🔧 **Troubleshooting Steps (15-60 minutes)**

#### **High Error Rate**
```bash
# 1. Check application logs
kubectl logs -n production -l app=nomado-breeze --tail=1000 | grep -E "(ERROR|WARN)"

# 2. Check database connectivity
kubectl exec -n production deployment/nomado-breeze -- node -e "
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB OK'))
  .catch(err => console.error('MongoDB Error:', err));
"

# 3. Check external services
curl -f https://api.nomado-breeze.com/health/external

# 4. Check resource usage
kubectl top pods -n production -l app=nomado-breeze

# 5. Check for memory leaks
kubectl exec -n production deployment/nomado-breeze -- node -e "
console.log('Memory usage:', process.memoryUsage());
console.log('Heap usage:', process.memoryUsage().heapUsed / 1024 / 1024, 'MB');
"
```

#### **High Response Time**
```bash
# 1. Check slow queries
kubectl exec -n production deployment/nomado-breeze -- node -e "
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.db.admin().command({currentOp: 1, 'active': true, 'secs_running': {'$gt': 1}})
  .then(result => console.log('Slow queries:', result.inprog))
  .catch(err => console.error('Error:', err));
"

# 2. Check CPU usage
kubectl top pods -n production -l app=nomado-breeze

# 3. Check network latency
kubectl exec -n production deployment/nomado-breeze -- ping -c 5 api.nomado-breeze.com

# 4. Check disk I/O
kubectl exec -n production deployment/nomado-breeze -- iostat -x 1 5
```

#### **Database Issues**
```bash
# 1. Check connection pool
kubectl exec -n production deployment/nomado-breeze -- node -e "
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);
console.log('Connections:', mongoose.connection.readyState);
console.log('Pool size:', mongoose.connection.db.serverConfig.poolSize);
"

# 2. Check database locks
kubectl exec -n production deployment/nomado-breeze -- node -e "
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.db.admin().command({currentOp: 1, 'active': true, 'waitingForLock': true})
  .then(result => console.log('Locked operations:', result.inprog.length))
  .catch(err => console.error('Error:', err));
"

# 3. Check index usage
kubectl exec -n production deployment/nomado-breeze -- node -e "
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.db.collection('bookings').stats()
  .then(stats => console.log('Index usage:', stats.indexSizes))
  .catch(err => console.error('Error:', err));
"
```

---

### 🚀 **Recovery Actions (60+ minutes)**

#### **Auto-Recovery**
```bash
# 1. Restart pods if needed
kubectl rollout restart deployment/nomado-breeze -n production

# 2. Scale up if under load
kubectl scale deployment nomado-breeze -n production --replicas=5

# 3. Clear cache if needed
kubectl exec -n production deployment/nomado-breeze -- node -e "
const redis = require('redis');
const client = redis.createClient(process.env.REDIS_URL);
client.flushdb().then(() => console.log('Cache cleared'));
"
```

#### **Manual Recovery**
```bash
# 1. Rollback if necessary
helm rollback nomado-breeze -n production

# 2. Deploy hotfix
kubectl apply -f manifests/hotfix/

# 3. Database maintenance
kubectl exec -n production deployment/nomado-breeze -- node -e "
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.db.admin().command({replSetResizeOplog: 1, size: 1024})
  .then(() => console.log('Oplog resized'))
  .catch(err => console.error('Error:', err));
"
```

---

## 📋 **72-Hour Monitoring Schedule**

### **Hour 0-6: Immediate Post-Deployment**
- [ ] **Every 15 minutes**: Check critical metrics
- [ ] **Every 30 minutes**: Check error rates
- [ ] **Every hour**: Check database performance
- [ ] **Every 2 hours**: Check resource usage

**Key Commands:**
```bash
# Quick health check
curl -f https://api.nomado-breeze.com/health

# Check metrics
curl "http://localhost:9090/api/v1/query?query=rate(http_requests_total{status=~\"5..\"}[5m])"

# Check pods
kubectl get pods -n production -l app=nomado-breeze
```

### **Hour 6-24: Extended Monitoring**
- [ ] **Every 30 minutes**: Check critical metrics
- [ ] **Every hour**: Check error rates and performance
- [ ] **Every 2 hours**: Check database performance
- [ ] **Every 4 hours**: Check resource usage and logs

**Key Commands:**
```bash
# Performance check
curl "http://localhost:9090/api/v1/query?query=histogram_quantile(0.95,rate(http_request_duration_seconds_bucket[5m]))"

# Database check
kubectl exec -n production deployment/nomado-breeze -- node -e "
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.db.admin().command({currentOp: 1, 'active': true, 'secs_running': {'$gt': 1}})
  .then(result => console.log('Slow queries:', result.inprog.length));
"
```

### **Hour 24-72: Stable Monitoring**
- [ ] **Every hour**: Check critical metrics
- [ ] **Every 2 hours**: Check error rates and performance
- [ ] **Every 4 hours**: Check database performance
- [ ] **Every 8 hours**: Check resource usage and logs

**Key Commands:**
```bash
# Comprehensive check
curl "http://localhost:9090/api/v1/query?query=rate(http_requests_total[5m])"
curl "http://localhost:9090/api/v1/query?query=rate(http_requests_total{status=~\"5..\"}[5m])"
curl "http://localhost:9090/api/v1/query?query=histogram_quantile(0.95,rate(http_request_duration_seconds_bucket[5m]))"
```

---

## 📊 **Monitoring Dashboard**

### **Grafana Dashboard Queries**
```promql
# Response Time Panel
histogram_quantile(0.95, rate(http_request_duration_seconds_bucket{job="nomado-breeze"}[5m]))

# Error Rate Panel
rate(http_requests_total{status=~"5.."}[5m]) / rate(http_requests_total[5m])

# Throughput Panel
rate(http_requests_total[5m])

# Database Connections Panel
mongodb_connections_current{job="nomado-breeze"}

# Memory Usage Panel
container_memory_usage_bytes{container="nomado-breeze"}

# CPU Usage Panel
rate(container_cpu_usage_seconds_total{container="nomado-breeze"}[5m])
```

---

## 📝 **Incident Documentation**

### **Incident Report Template**
```
## Incident Report

**Incident ID**: INC-YYYY-MM-DD-XXX
**Start Time**: YYYY-MM-DD HH:MM:SS UTC
**End Time**: YYYY-MM-DD HH:MM:SS UTC
**Duration**: X hours Y minutes
**Severity**: P0/P1/P2
**Status**: Resolved/Investigating/Mitigated

### Impact
- **Affected Services**: [List services]
- **User Impact**: [Description]
- **Business Impact**: [Description]

### Root Cause
[Detailed analysis of root cause]

### Resolution
[Steps taken to resolve]

### Prevention
[Actions to prevent recurrence]

### Lessons Learned
[Key takeaways]
```

---

## 🔗 **Useful Links**

### **Monitoring Tools**
- **Grafana**: http://grafana.nomado-breeze.com
- **Prometheus**: http://prometheus.nomado-breeze.com
- **Kibana**: http://kibana.nomado-breeze.com
- **PagerDuty**: https://nomado-breeze.pagerduty.com

### **Documentation**
- **Runbook**: [docs/rollback.md](./rollback.md)
- **API Documentation**: [docs/API.md](./API.md)
- **Deployment Guide**: [docs/DEPLOYMENT.md](./DEPLOYMENT.md)

---

*Monitoring Checklist Version: 1.0*  
*Last Updated: 2025-09-27*  
*Next Review: 2025-10-27*
