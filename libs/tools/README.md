# Tools

Module contain general tools.

### Seeds

Tool for start seeds. Input: ormconfig path.
Orm config must contains seeds patterns:

##### Example ormconfig

```
{
   "type": "postgres",
   "host": "127.0.0.1",
   "port": 5432,
   "username": "transfer",
   "password": "transfer",
   "database": "transfer",
   "synchronize": false,
   "logging": false,
   "entities": [
      "dist/apps/backend/src/app/database/entities/**/*.js"
   ],
   "migrations": [
      "dist/apps/backend/src/migrations/**/*.js"
   ],
   "subscribers": [
      "dist/apps/backend/src/subscriber/**/*.js"
   ],
   "seeds": [
      "dist/apps/backend/src/seeds/**/*.js"
   ],
   "cli": {
      "entitiesDir": "apps/backend/src/app/database/entities",
      "migrationsDir": "apps/backend/src/migrations",
      "subscribersDir": "apps/backend/src/subscriber"
   }
}
```

##### Example start:

```
node ./dist/libs/tools/src/seeds/seed.run.js ./apps/backend/ormconfig.json
```
