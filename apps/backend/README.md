# Backend-service

Main backend service with REST-API interface.

### Build

```
npm run build backend
```

### Run

```
npm start backend
```

### Migrations

Create:

```
npx typeorm migration:create --config ./apps/backend/ormconfig.json --name <name>
```

Run:

```
npm run build backend
npx typeorm migration:run --config ./apps/backend/ormconfig.json -t=each
```

### Seeders

```
npm run build backend
node ./dist/libs/tools/src/seeds/seed.run.js ./apps/backend/ormconfig.json
```
