# Next Iteration: Booking Race Condition Fix
## План исправления обнаруженной проблемы

### 🚨 **Обнаруженная проблема**
**Race Condition в Booking API** - все concurrent запросы на одинаковый слот проходят успешно без проверки конфликтов.

---

## 📊 **Детали проблемы**

### 🔍 **Симптомы**
- 10 concurrent запросов с одинаковым payload → все 201 (успех)
- 0 конфликтов (409) при ожидаемых 9
- Одинаковый time slot для всех запросов
- Placeholder логика не проверяет реальные конфликты

### 📋 **Тестовый payload**
```json
{
  "userId": "507f1f77bcf86cd799439011",
  "spaceId": "507f1f77bcf86cd799439012", 
  "unitId": "507f1f77bcf86cd799439013",
  "startAt": "2025-09-28T10:00:00.000Z",
  "endAt": "2025-09-28T12:00:00.000Z",
  "slot": {
    "startAt": "2025-09-28T10:00:00.000Z",
    "endAt": "2025-09-28T12:00:00.000Z",
    "available": true
  }
}
```

---

## 🎯 **План исправления**

### 🔒 **1. Database Constraints**
```javascript
// MongoDB unique compound index
db.bookings.createIndex(
  { unitId: 1, startAt: 1, endAt: 1 }, 
  { unique: true }
);

// Альтернативный подход - partial index
db.bookings.createIndex(
  { 
    unitId: 1, 
    startAt: 1, 
    endAt: 1,
    status: 1 
  },
  { 
    unique: true,
    partialFilterExpression: { 
      status: { $in: ["confirmed", "pending"] } 
    }
  }
);
```

### 🔄 **2. Optimistic Locking**
```javascript
// Добавить version поле в Booking model
const BookingSchema = new Schema({
  // ... existing fields
  version: { type: Number, default: 0 }
});

// В API использовать findOneAndUpdate с version
const booking = await BookingModel.findOneAndUpdate(
  { 
    _id: bookingId, 
    version: expectedVersion 
  },
  { 
    ...updates, 
    version: expectedVersion + 1 
  },
  { new: true }
);

if (!booking) {
  throw new ConflictError('Booking was modified by another request');
}
```

### ⚡ **3. Redis Distributed Locking**
```javascript
// Установить Redis
npm install redis

// Реализовать distributed lock
const lockKey = `booking:${unitId}:${startAt}:${endAt}`;
const lock = await redis.set(lockKey, 'locked', 'EX', 30, 'NX');

if (!lock) {
  throw new ConflictError('Booking slot is currently being processed');
}

try {
  // Выполнить booking логику
} finally {
  await redis.del(lockKey);
}
```

### 🗄️ **4. Real Conflict Detection**
```javascript
// Заменить placeholder логику на реальную проверку
async function checkBookingConflicts(unitId, startAt, endAt) {
  const existingBookings = await BookingModel.find({
    unitId,
    status: { $in: ['confirmed', 'pending'] },
    $or: [
      { 
        startAt: { $lt: endAt }, 
        endAt: { $gt: startAt } 
      }
    ]
  });
  
  return existingBookings.length > 0;
}

// В API endpoint
if (await checkBookingConflicts(unitId, startAt, endAt)) {
  throw new ConflictError('Time slot conflicts with existing booking');
}
```

---

## 🧪 **План тестирования**

### ✅ **1. Unit Tests**
```javascript
describe('Booking Conflict Detection', () => {
  it('should detect overlapping bookings', async () => {
    // Создать существующее бронирование
    // Попытаться создать конфликтующее
    // Проверить что возвращается 409
  });
  
  it('should allow non-overlapping bookings', async () => {
    // Создать бронирования в разное время
    // Проверить что оба создаются успешно
  });
});
```

### 🔄 **2. Integration Tests**
```javascript
describe('Concurrent Booking API', () => {
  it('should handle concurrent requests correctly', async () => {
    // Запустить concurrent booking test
    // Проверить что только 1 booking создается
    // Остальные получают 409
  });
});
```

### 🚀 **3. Load Tests**
```javascript
// Использовать существующий concurrent-booking-test.js
// Запустить на исправленной версии
// Ожидаемый результат: 1 success, 9 conflicts
```

---

## 📋 **Checklist для исправления**

### 🔧 **Backend Changes**
- [ ] Добавить database constraints (unique indexes)
- [ ] Реализовать real conflict detection
- [ ] Добавить optimistic locking (version fields)
- [ ] Интегрировать Redis для distributed locking
- [ ] Обновить error handling для конфликтов
- [ ] Добавить unit tests для conflict detection

### 🧪 **Testing**
- [ ] Обновить существующие unit tests
- [ ] Создать integration tests для concurrent scenarios
- [ ] Запустить load tests с исправлениями
- [ ] Проверить backward compatibility

### 📚 **Documentation**
- [ ] Обновить API documentation
- [ ] Документировать новые error responses
- [ ] Создать migration guide если нужно
- [ ] Обновить deployment procedures

---

## ⚠️ **Риски и митигация**

### 🚨 **Потенциальные риски**
1. **Breaking changes** в API contracts
2. **Performance impact** от дополнительных проверок
3. **Database migration** requirements
4. **Redis dependency** для production

### 🛡️ **Митигация**
1. **Feature flags** для постепенного rollout
2. **Performance monitoring** и алерты
3. **Backward compatible** error responses
4. **Fallback mechanisms** если Redis недоступен

---

## 🎯 **Success Criteria**

### ✅ **Критерии успеха**
1. **Concurrent test** показывает: 1 success, 9 conflicts
2. **Response time** остается < 3 секунд
3. **No breaking changes** в API contracts
4. **100% test coverage** для conflict detection
5. **Production deployment** без downtime

---

## 📅 **Timeline**

### 🗓️ **Предполагаемый timeline**
- **Week 1**: Analysis и database constraints
- **Week 2**: Conflict detection logic
- **Week 3**: Testing и optimization
- **Week 4**: Production deployment

---

*Документ создан: 2025-09-27*  
*Статус: Ready for next iteration*  
*Приоритет: High (Race condition affects data integrity)*
