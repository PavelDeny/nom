# ORM Responsibilities Draft

## Current State
Both Mongoose and TypeORM models exist for the same entities:

### Mongoose Models (src/lib/mongo/models/)
- User.ts
- Space.ts
- Booking.ts
- Review.ts
- Availability.ts

### TypeORM Entities (src/lib/typeorm/entities/)
- User.ts

## Recommended Distribution

### TypeORM (Primary CRUD Operations)
**Responsibility**: Main application data operations, complex queries, transactions

**Entities to migrate to TypeORM**:
- User (✅ already exists)
- Booking (migrate from Mongoose)
- Space (migrate from Mongoose)
- Review (migrate from Mongoose)
- Availability (migrate from Mongoose)

**Benefits**:
- Better TypeScript integration
- Advanced query capabilities
- Transaction support
- Relationship management

### Mongoose (Aggregations & Analytics)
**Responsibility**: Complex aggregations, analytics, bulk operations

**Keep for**:
- Analytics queries
- Bulk data operations
- Complex aggregations
- Reporting features

## Migration Plan

### Phase 1: Standardize User Entity
- Keep TypeORM User as primary
- Remove Mongoose User model
- Update all User references

### Phase 2: Migrate Core Entities
- Migrate Booking, Space, Review to TypeORM
- Update repository factory
- Update service implementations

### Phase 3: Cleanup
- Remove duplicate Mongoose models
- Update documentation
- Performance testing

## Implementation Notes
- Repository factory already supports both ORMs
- Services can be updated to use TypeORM as primary
- Mongoose can be kept for specific use cases
