# PR Note: PoC Services & Entity Migration Plan
## Review Checklist and Migration Strategy

### 🎯 **PR Overview**
This PR introduces Proof-of-Concept (PoC) services (`UserService`, `BookingService`) using the new `RepoFactory` pattern and provides a migration plan for transitioning from direct ORM usage to the centralized repository pattern.

---

## ✅ **Review Checklist for PoC Services**

### 🔍 **UserService PoC Review**

#### **File**: `src/lib/poC/services/UserService.ts`

**Check these items:**
- [ ] **Interface compatibility** - Does `UserService` interface match existing usage?
- [ ] **CRUD operations** - Are all required methods implemented?
- [ ] **Error handling** - Proper error propagation from repository layer?
- [ ] **Type safety** - All methods properly typed with `User` interface?
- [ ] **Async/await** - Proper promise handling throughout?
- [ ] **Input validation** - Are input parameters validated?
- [ ] **Repository injection** - Does `RepoFactory` work correctly?

**Key methods to verify:**
```typescript
✅ create(input: UserCreateInput): Promise<User>
✅ findMany(opts?: { page?: number; pageSize?: number }): Promise<{ items: User[]; total: number }>
✅ findById(id: string): Promise<User | null>
✅ updateById(id: string, updates: UserUpdateInput): Promise<User | null>
✅ deleteById(id: string): Promise<boolean>
✅ findByEmail(email: string): Promise<User | null>
```

#### **Test scenarios:**
- [ ] Create user with valid data
- [ ] Create user with duplicate email (should handle conflict)
- [ ] Find user by ID (existing and non-existing)
- [ ] Update user with valid and invalid data
- [ ] Delete existing and non-existing user
- [ ] Pagination works correctly
- [ ] Email search functionality

---

### 🔍 **BookingService PoC Review**

#### **File**: `src/lib/poC/services/BookingService.ts`

**Check these items:**
- [ ] **Interface compatibility** - Matches existing booking operations?
- [ ] **CRUD operations** - All booking lifecycle methods present?
- [ ] **Error handling** - Proper error handling for booking conflicts?
- [ ] **Type safety** - All methods typed with `Booking` interface?
- [ ] **Date handling** - Proper handling of `startAt`/`endAt` dates?
- [ ] **Status management** - Booking status transitions handled?

**Key methods to verify:**
```typescript
✅ create(input: BookingCreateInput): Promise<Booking>
✅ findMany(opts?: { page?: number; pageSize?: number }): Promise<{ items: Booking[]; total: number }>
✅ findById(id: string): Promise<Booking | null>
✅ updateById(id: string, updates: BookingUpdateInput): Promise<Booking | null>
✅ deleteById(id: string): Promise<boolean>
```

#### **Test scenarios:**
- [ ] Create booking with valid time slot
- [ ] Create booking with conflicting time slot
- [ ] Find bookings by user ID
- [ ] Update booking status (pending → confirmed → cancelled)
- [ ] Delete booking
- [ ] Handle date/time edge cases

---

## 🔄 **Entity Migration Plan**

### 📋 **Phase 1: Users (Week 1-2)**

#### **Scope**: Migrate user-related operations to PoC services

**Steps:**
1. **Update API routes** to use `UserService`
   - [ ] `src/app/api/users/route.ts`
   - [ ] `src/app/api/users/[id]/route.ts`
   - [ ] `src/app/api/users-typeorm/route.ts`

2. **Replace direct ORM calls**:
   ```typescript
   // Before
   const user = await UserModel.findById(id);
   
   // After
   const userService = await UserService.createInstance();
   const user = await userService.findById(id);
   ```

3. **Update authentication logic**:
   - [ ] Login/register endpoints
   - [ ] JWT token generation
   - [ ] Password hashing verification

4. **Testing & validation**:
   - [ ] Run existing user tests
   - [ ] Manual testing of user flows
   - [ ] Performance comparison

**Success criteria:**
- [ ] All user API endpoints work with PoC service
- [ ] No breaking changes in API contracts
- [ ] Performance within 10% of original
- [ ] All tests pass

---

### 📋 **Phase 2: Bookings (Week 3-4)**

#### **Scope**: Migrate booking operations and fix race condition

**Steps:**
1. **Update booking API routes**:
   - [ ] `src/app/api/bookings/route.ts`
   - [ ] `src/app/api/bookings/[id]/route.ts`

2. **Implement real conflict detection**:
   ```typescript
   // Add to BookingService
   async checkConflicts(unitId: string, startAt: Date, endAt: Date): Promise<boolean> {
     const existing = await this.repo.findMany({
       unitId,
       status: { $in: ['confirmed', 'pending'] },
       $or: [
         { startAt: { $lt: endAt }, endAt: { $gt: startAt } }
       ]
     });
     return existing.items.length > 0;
   }
   ```

3. **Add database constraints**:
   - [ ] Create unique compound index for booking slots
   - [ ] Add optimistic locking with version fields
   - [ ] Implement Redis distributed locking

4. **Testing & validation**:
   - [ ] Run concurrent booking tests
   - [ ] Verify conflict detection works
   - [ ] Load testing with fixed logic

**Success criteria:**
- [ ] Concurrent booking test shows 1 success, 9 conflicts
- [ ] No duplicate bookings for same time slot
- [ ] Response time < 3 seconds under load
- [ ] All booking functionality preserved

---

### 📋 **Phase 3: Spaces (Week 5-6)**

#### **Scope**: Migrate space-related operations

**Steps:**
1. **Create SpaceService PoC**:
   ```typescript
   export class SpaceService {
     // CRUD operations
     // Geo-search functionality
     // Availability checking
     // Rating/photo management
   }
   ```

2. **Update space API routes**:
   - [ ] `src/app/api/spaces/route.ts`
   - [ ] `src/app/api/spaces/[id]/route.ts`
   - [ ] `src/app/api/search/route.ts`

3. **Implement geo-search optimization**:
   - [ ] Optimize MongoDB geoNear queries
   - [ ] Add proper indexing for location searches
   - [ ] Cache frequently searched locations

4. **Testing & validation**:
   - [ ] Geo-search performance testing
   - [ ] Space CRUD operations
   - [ ] Integration with booking system

**Success criteria:**
- [ ] Geo-search response time < 1 second
- [ ] All space operations work correctly
- [ ] Proper error handling for invalid coordinates
- [ ] Integration with booking system maintained

---

## 🧪 **Testing Strategy**

### **Unit Tests**
```bash
# Test PoC services
npm test -- --testPathPattern="poC/services"

# Test specific services
npm test -- UserService.test.ts
npm test -- BookingService.test.ts
```

### **Integration Tests**
```bash
# Test API endpoints with PoC services
npm test -- --testPathPattern="api.*route"

# Test concurrent scenarios
npm test -- concurrent-booking.test.js
```

### **Load Tests**
```bash
# Run k6 load tests
npm run load-test

# Run concurrent booking tests
npm run test:concurrent
```

---

## 📊 **Migration Metrics**

### **Performance Benchmarks**
- **Response Time**: Should remain within 10% of original
- **Throughput**: Maintain or improve request/second
- **Memory Usage**: Monitor for memory leaks
- **Error Rate**: Should not increase

### **Quality Metrics**
- **Test Coverage**: Maintain >90% coverage
- **Type Safety**: Zero TypeScript errors
- **API Compatibility**: No breaking changes
- **Documentation**: All new methods documented

---

## ⚠️ **Risk Mitigation**

### **Rollback Plan**
- [ ] Keep original ORM calls commented out during migration
- [ ] Feature flags for gradual rollout
- [ ] Database migration rollback procedures
- [ ] Monitoring and alerting for performance degradation

### **Monitoring**
- [ ] Application performance monitoring
- [ ] Database query performance
- [ ] Error rate monitoring
- [ ] User experience metrics

---

## 🎯 **Success Criteria**

### **Phase 1 (Users)**
- [ ] All user operations migrated to PoC service
- [ ] No breaking changes in user API
- [ ] Performance within acceptable limits

### **Phase 2 (Bookings)**
- [ ] Booking race condition fixed
- [ ] Conflict detection working correctly
- [ ] Concurrent booking test passes

### **Phase 3 (Spaces)**
- [ ] All space operations migrated
- [ ] Geo-search optimized
- [ ] Integration with booking system maintained

### **Overall**
- [ ] All entities using PoC services
- [ ] Repository pattern fully implemented
- [ ] Performance improved or maintained
- [ ] Code maintainability improved

---

## 📅 **Timeline**

```
Week 1-2: Users migration
Week 3-4: Bookings migration + race condition fix
Week 5-6: Spaces migration
Week 7:   Final testing and optimization
Week 8:   Production deployment
```

---

*PR Note Version: 1.0*  
*Created: 2025-09-27*  
*Review Required: PoC Services & Migration Plan*
