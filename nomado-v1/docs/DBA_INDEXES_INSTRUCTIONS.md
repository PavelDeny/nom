# 🗄️ DBA: Инструкции по созданию индексов MongoDB

## ⚠️ ВАЖНО: НЕ ЗАПУСКАТЬ В PRODUCTION!

Этот документ содержит инструкции для создания индексов в **staging-окружении** MongoDB.

## 📋 Создаваемые индексы

### 1. **users.email** - UNIQUE
```javascript
db.users.createIndex({ email: 1 }, { unique: true, background: true })
```

### 2. **spaces.location** - 2DSPHERE (геопространственный)
```javascript
db.spaces.createIndex({ location: "2dsphere" }, { background: true })
```

### 3. **availabilities** - COMPOUND UNIQUE
```javascript
db.availabilities.createIndex({ unitId: 1, date: 1 }, { unique: true, background: true })
```

### 4. **Дополнительные индексы для производительности:**

#### reviews - COMPOUND UNIQUE
```javascript
db.reviews.createIndex({ userId: 1, spaceId: 1 }, { unique: true, background: true })
```

#### bookings - PERFORMANCE INDEXES
```javascript
db.bookings.createIndex({ userId: 1, startAt: 1 }, { background: true })
db.bookings.createIndex({ unitId: 1, startAt: 1 }, { background: true })
db.bookings.createIndex({ paymentIntentId: 1 }, { unique: true, sparse: true, background: true })
```

## 🚀 Автоматический скрипт

### Подготовка staging-окружения:

```bash
# 1. Установить переменные окружения
export NODE_ENV=staging
export MONGODB_URI="mongodb://staging-server:27017/nomado-breeze-staging"
export DB_NAME="nomado-breeze-staging"

# 2. Перейти в директорию проекта
cd /path/to/nomado-v1

# 3. Запустить скрипт
node scripts/ensure-indexes.js
```

### Ожидаемый вывод скрипта:

```
🔍 Проверка окружения...
NODE_ENV: staging
MONGODB_URI: ***скрыто***
DB_NAME: nomado-breeze-staging
✅ Окружение безопасно для создания индексов

🚀 Запуск скрипта создания индексов...
⏰ Время запуска: 2025-09-27T10:58:01.375Z

🔌 Подключение к MongoDB...
✅ Подключение установлено

📧 Создание индекса для users.email...
✅ Индекс users.email создан успешно

🌍 Создание индекса для spaces.location...
✅ Индекс spaces.location (2dsphere) создан успешно

📅 Создание индекса для availabilities (unitId, date)...
✅ Индекс availabilities (unitId, date) создан успешно

⚡ Создание дополнительных индексов...
✅ Индекс reviews (userId, spaceId) создан успешно
✅ Индекс bookings (userId, startAt) создан успешно
✅ Индекс bookings (unitId, startAt) создан успешно
✅ Индекс bookings (paymentIntentId) создан успешно

📊 Информация об индексах:

🗂️  Коллекция: users
Количество индексов: 2
  1. _id_: {"_id": 1} (unique)
  2. email_1: {"email": 1} (unique, background)

🗂️  Коллекция: spaces
Количество индексов: 2
  1. _id_: {"_id": 1} (unique)
  2. location_2dsphere: {"location": "2dsphere"} (background, 2dsphere)

🗂️  Коллекция: availabilities
Количество индексов: 2
  1. _id_: {"_id": 1} (unique)
  2. unitId_1_date_1: {"unitId": 1, "date": 1} (unique, background)

🗂️  Коллекция: reviews
Количество индексов: 2
  1. _id_: {"_id": 1} (unique)
  2. userId_1_spaceId_1: {"userId": 1, "spaceId": 1} (unique, background)

🗂️  Коллекция: bookings
Количество индексов: 4
  1. _id_: {"_id": 1} (unique)
  2. userId_1_startAt_1: {"userId": 1, "startAt": 1} (background)
  3. unitId_1_startAt_1: {"unitId": 1, "startAt": 1} (background)
  4. paymentIntentId_1: {"paymentIntentId": 1} (unique, sparse, background)

✅ Все индексы проверены и созданы
🔌 Соединение с MongoDB закрыто

🎉 Скрипт завершен успешно!
⏰ Время завершения: 2025-09-27T10:58:15.123Z
```

## 🔍 Ручная проверка индексов

После запуска скрипта проверьте индексы вручную:

```bash
# Подключение к MongoDB staging
mongosh "mongodb://staging-server:27017/nomado-breeze-staging"

# Проверка индексов для каждой коллекции
db.users.getIndexes()
db.spaces.getIndexes()
db.availabilities.getIndexes()
db.reviews.getIndexes()
db.bookings.getIndexes()
```

## ⚠️ Возможные ошибки и решения

### 1. **Ошибка дублирования данных (11000)**
```
⚠️  Индекс users.email уже существует или есть дубликаты
```
**Решение:** Проверить дубликаты и очистить данные перед созданием уникального индекса.

### 2. **Ошибка подключения**
```
❌ Критическая ошибка: MongoServerSelectionError: connect ECONNREFUSED
```
**Решение:** Проверить доступность MongoDB сервера и правильность URI.

### 3. **Ошибка окружения**
```
❌ ОШИБКА: Этот скрипт нельзя запускать в production!
```
**Решение:** Убедиться, что NODE_ENV=staging, а не production.

## 📊 Мониторинг производительности

После создания индексов мониторьте:

1. **Время выполнения запросов**
2. **Использование памяти**
3. **Размер индексов**
4. **Статистику использования индексов**

```javascript
// Проверка статистики индексов
db.users.aggregate([{ $indexStats: {} }])
db.spaces.aggregate([{ $indexStats: {} }])
db.availabilities.aggregate([{ $indexStats: {} }])
```

## 🚨 Безопасность

- ✅ **НЕ ЗАПУСКАЙТЕ** в production без предварительного тестирования
- ✅ **СОЗДАЙТЕ BACKUP** базы данных перед созданием индексов
- ✅ **ТЕСТИРУЙТЕ** на staging-окружении
- ✅ **МОНИТОРЬТЕ** производительность после создания индексов

## 📞 Поддержка

При возникновении проблем:
1. Проверьте логи выполнения скрипта
2. Убедитесь в правильности переменных окружения
3. Проверьте доступность MongoDB сервера
4. Обратитесь к команде разработки

---
**Последнее обновление:** 2025-09-27  
**Версия скрипта:** 1.0  
**Статус:** Готов к запуску в staging
