# Rollback Runbook
## Nomado Breeze - Emergency Rollback Procedures

### 🚨 **Emergency Contacts**
- **DevOps Team**: devops@nomado-breeze.com
- **On-Call Engineer**: +1-XXX-XXX-XXXX
- **Slack Channel**: #nomado-emergency

---

## 🎯 **Quick Rollback Commands**

### ⚡ **Immediate Rollback (Last Known Good)**
```bash
# 1. Rollback to previous release
helm rollback nomado-breeze -n production

# 2. Check rollback status
helm status nomado-breeze -n production

# 3. Verify pods are running
kubectl get pods -n production -l app=nomado-breeze

# 4. Check health endpoints
curl -f https://api.nomado-breeze.com/health
```

---

## 📋 **Detailed Rollback Procedures**

### 🔍 **Step 1: Assess Current Situation**

#### Check deployment status
```bash
# Check current deployment status
kubectl get deployments -n production

# Check pod status
kubectl get pods -n production -l app=nomado-breeze

# Check service status
kubectl get services -n production

# Check ingress status
kubectl get ingress -n production
```

#### Check application logs
```bash
# Check application logs
kubectl logs -n production -l app=nomado-breeze --tail=100

# Check specific pod logs
kubectl logs -n production <pod-name> --tail=100

# Check previous pod logs if current is failing
kubectl logs -n production <pod-name> --previous
```

#### Check resource usage
```bash
# Check resource usage
kubectl top pods -n production

# Check node resources
kubectl top nodes

# Check events
kubectl get events -n production --sort-by='.lastTimestamp'
```

---

### 🔄 **Step 2: Determine Rollback Strategy**

#### Option A: Helm Rollback (Recommended)
```bash
# List available releases
helm list -n production

# Get release history
helm history nomado-breeze -n production

# Rollback to specific revision
helm rollback nomado-breeze <revision-number> -n production

# Rollback to previous release (default)
helm rollback nomado-breeze -n production

# Force rollback if needed
helm rollback nomado-breeze <revision-number> -n production --force
```

#### Option B: Manual Rollback (If Helm fails)
```bash
# Scale down current deployment
kubectl scale deployment nomado-breeze -n production --replicas=0

# Apply previous manifest
kubectl apply -f manifests/previous-release/

# Scale up deployment
kubectl scale deployment nomado-breeze -n production --replicas=3
```

#### Option C: Blue-Green Rollback
```bash
# Switch traffic to blue environment
kubectl patch service nomado-breeze -n production -p '{"spec":{"selector":{"version":"blue"}}}'

# Verify traffic switch
kubectl get service nomado-breeze -n production -o yaml
```

---

### ⚙️ **Step 3: Execute Rollback**

#### Helm Rollback Commands
```bash
# 1. Rollback to previous release
helm rollback nomado-breeze -n production

# 2. Wait for rollback to complete
kubectl rollout status deployment/nomado-breeze -n production --timeout=300s

# 3. Verify rollback success
helm status nomado-breeze -n production

# 4. Check rollback history
helm history nomado-breeze -n production
```

#### Manual Verification
```bash
# Check deployment status
kubectl get deployment nomado-breeze -n production -o wide

# Check pod status
kubectl get pods -n production -l app=nomado-breeze -o wide

# Check replica set
kubectl get rs -n production -l app=nomado-breeze

# Check service endpoints
kubectl get endpoints nomado-breeze -n production
```

---

### 🏥 **Step 4: Health Check Procedures**

#### Application Health Checks
```bash
# 1. Basic health check
curl -f https://api.nomado-breeze.com/health

# 2. Detailed health check
curl -f https://api.nomado-breeze.com/health/detailed

# 3. Database connectivity check
curl -f https://api.nomado-breeze.com/health/database

# 4. External services check
curl -f https://api.nomado-breeze.com/health/external

# 5. Custom health check with timeout
curl -f --max-time 30 https://api.nomado-breeze.com/health
```

#### Load Balancer Health Checks
```bash
# Check ingress controller
kubectl get ingress nomado-breeze -n production

# Check ingress controller logs
kubectl logs -n ingress-nginx -l app.kubernetes.io/name=ingress-nginx

# Test from multiple regions (if applicable)
curl -f https://api.nomado-breeze.com/health --connect-timeout 10
```

#### Database Health Checks
```bash
# Check MongoDB connection
kubectl exec -n production deployment/nomado-breeze -- node -e "
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection failed:', err));
"

# Check TypeORM connection
kubectl exec -n production deployment/nomado-breeze -- node -e "
const { getDataSource } = require('./src/lib/typeorm/data-source');
getDataSource().then(ds => {
  console.log('TypeORM connected');
  ds.destroy();
}).catch(err => console.error('TypeORM connection failed:', err));
"
```

---

### 📊 **Step 5: Post-Rollback Verification**

#### Functional Testing
```bash
# 1. Test API endpoints
curl -X GET https://api.nomado-breeze.com/api/users
curl -X GET https://api.nomado-breeze.com/api/search?lat=37.7749&lng=-122.4194
curl -X POST https://api.nomado-breeze.com/api/bookings -H "Content-Type: application/json" -d '{"test": "data"}'

# 2. Test frontend
curl -f https://nomado-breeze.com

# 3. Test authentication
curl -X POST https://api.nomado-breeze.com/api/auth/login -H "Content-Type: application/json" -d '{"email": "test@example.com", "password": "test"}'

# 4. Test file uploads (if applicable)
curl -X POST https://api.nomado-breeze.com/api/upload -F "file=@test.jpg"
```

#### Performance Testing
```bash
# 1. Response time check
curl -w "@curl-format.txt" -o /dev/null -s https://api.nomado-breeze.com/health

# 2. Load test (basic)
for i in {1..10}; do
  curl -f https://api.nomado-breeze.com/health &
done
wait

# 3. Memory usage check
kubectl top pods -n production -l app=nomado-breeze
```

#### Monitoring Verification
```bash
# 1. Check metrics
kubectl port-forward -n monitoring svc/prometheus 9090:9090 &
curl -f http://localhost:9090/api/v1/query?query=up{job="nomado-breeze"}

# 2. Check logs
kubectl logs -n production -l app=nomado-breeze --tail=50 | grep -E "(ERROR|WARN|INFO)"

# 3. Check events
kubectl get events -n production --sort-by='.lastTimestamp' | tail -20
```

---

## 🚨 **Emergency Procedures**

### 🔥 **Critical Issues (P0)**

#### Complete Service Failure
```bash
# 1. Immediate rollback
helm rollback nomado-breeze -n production --force

# 2. Scale to zero if rollback fails
kubectl scale deployment nomado-breeze -n production --replicas=0

# 3. Deploy last known good version
kubectl apply -f manifests/emergency-backup/

# 4. Scale up
kubectl scale deployment nomado-breeze -n production --replicas=3

# 5. Notify team
curl -X POST https://hooks.slack.com/services/XXX/XXX/XXX \
  -H 'Content-type: application/json' \
  --data '{"text":"🚨 CRITICAL: Nomado Breeze emergency rollback executed"}'
```

#### Database Issues
```bash
# 1. Check database connectivity
kubectl exec -n production deployment/nomado-breeze -- node -e "
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('DB OK'))
  .catch(err => console.error('DB FAILED:', err));
"

# 2. Rollback database migrations if needed
kubectl exec -n production deployment/nomado-breeze -- npm run migrate:rollback

# 3. Check database logs
kubectl logs -n production -l app=mongodb --tail=100
```

#### Security Issues
```bash
# 1. Immediate scale down
kubectl scale deployment nomado-breeze -n production --replicas=0

# 2. Check for suspicious activity
kubectl logs -n production -l app=nomado-breeze --tail=1000 | grep -E "(ERROR|WARN|unauthorized|forbidden)"

# 3. Review ingress logs
kubectl logs -n ingress-nginx -l app.kubernetes.io/name=ingress-nginx --tail=1000

# 4. Deploy secure version
helm upgrade nomado-breeze ./charts/nomado-breeze -n production --set security.enabled=true
```

---

## 📋 **Rollback Checklists**

### ✅ **Pre-Rollback Checklist**
- [ ] Document current issue and impact
- [ ] Notify stakeholders (Slack, email)
- [ ] Take screenshot of current metrics
- [ ] Backup current configuration
- [ ] Verify rollback target is available
- [ ] Check for any ongoing deployments

### ✅ **During Rollback Checklist**
- [ ] Execute rollback command
- [ ] Monitor rollout status
- [ ] Watch pod creation/termination
- [ ] Check service endpoints
- [ ] Verify health checks
- [ ] Monitor error rates

### ✅ **Post-Rollback Checklist**
- [ ] Verify all services are healthy
- [ ] Test critical user journeys
- [ ] Check monitoring dashboards
- [ ] Verify database connectivity
- [ ] Test API endpoints
- [ ] Check external integrations
- [ ] Update incident documentation
- [ ] Schedule post-mortem if needed

---

## 🔧 **Troubleshooting Common Issues**

### ❌ **Rollback Fails**

#### Helm Rollback Issues
```bash
# Check helm status
helm status nomado-breeze -n production

# Check for stuck resources
kubectl get all -n production -l app=nomado-breeze

# Force delete stuck resources
kubectl delete pod <stuck-pod> -n production --force --grace-period=0

# Retry rollback
helm rollback nomado-breeze -n production --force
```

#### Pod Stuck in Pending
```bash
# Check pod events
kubectl describe pod <pod-name> -n production

# Check node resources
kubectl describe nodes

# Check persistent volume claims
kubectl get pvc -n production

# Delete stuck pod
kubectl delete pod <pod-name> -n production --force
```

#### Service Not Accessible
```bash
# Check service endpoints
kubectl get endpoints nomado-breeze -n production

# Check ingress configuration
kubectl describe ingress nomado-breeze -n production

# Check DNS resolution
kubectl exec -n production deployment/nomado-breeze -- nslookup api.nomado-breeze.com

# Restart ingress controller if needed
kubectl rollout restart deployment/ingress-nginx-controller -n ingress-nginx
```

---

## 📊 **Monitoring and Alerting**

### 📈 **Key Metrics to Monitor**
```bash
# 1. Application metrics
kubectl port-forward -n monitoring svc/prometheus 9090:9090 &
curl "http://localhost:9090/api/v1/query?query=rate(http_requests_total[5m])"

# 2. Error rates
curl "http://localhost:9090/api/v1/query?query=rate(http_requests_total{status=~'5..'}[5m])"

# 3. Response times
curl "http://localhost:9090/api/v1/query?query=histogram_quantile(0.95, rate(http_request_duration_seconds_bucket[5m]))"

# 4. Pod status
kubectl get pods -n production -l app=nomado-breeze -o jsonpath='{.items[*].status.phase}'
```

### 🚨 **Alert Conditions**
- Pod restart count > 5 in 10 minutes
- Error rate > 5% for 5 minutes
- Response time > 3 seconds for 5 minutes
- CPU usage > 80% for 10 minutes
- Memory usage > 90% for 10 minutes

---

## 📞 **Communication Templates**

### 📢 **Rollback Notification**
```
🚨 INCIDENT: Nomado Breeze Rollback Executed

**Time**: $(date)
**Reason**: [Brief description]
**Action Taken**: Rolled back to revision [X]
**Impact**: [User impact description]
**ETA**: [Expected resolution time]
**Status**: Monitoring post-rollback health

**Next Update**: [Time]
**Contact**: [On-call engineer]
```

### ✅ **Resolution Notification**
```
✅ RESOLVED: Nomado Breeze Rollback Complete

**Resolution Time**: $(date)
**Final Status**: All services healthy
**User Impact**: Resolved
**Post-Mortem**: Scheduled for [date/time]

**Services Verified**:
- ✅ API Health Checks
- ✅ Database Connectivity  
- ✅ Frontend Access
- ✅ Authentication
- ✅ Core User Journeys

Thank you for your patience.
```

---

## 📚 **Additional Resources**

### 🔗 **Useful Commands Reference**
```bash
# Quick status check
alias nomado-status='kubectl get all -n production -l app=nomado-breeze'

# Quick logs
alias nomado-logs='kubectl logs -n production -l app=nomado-breeze -f'

# Quick health check
alias nomado-health='curl -f https://api.nomado-breeze.com/health'

# Quick rollback
alias nomado-rollback='helm rollback nomado-breeze -n production'
```

### 📖 **Documentation Links**
- [Kubernetes Rollback Guide](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/#rolling-back-a-deployment)
- [Helm Rollback Guide](https://helm.sh/docs/helm/helm_rollback/)
- [Prometheus Monitoring](https://prometheus.io/docs/guides/go-application/)
- [Grafana Dashboards](https://grafana.com/docs/)

---

*Runbook Version: 1.0*  
*Last Updated: 2025-09-27*  
*Next Review: 2025-10-27*
