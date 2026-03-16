### 1. Update your database tables to match the new schema
npx drizzle-kit push

### 2. Run the seed script to migrate all data from db.ts & projects.json
npx drizzle-kit seed
