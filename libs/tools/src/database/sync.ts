import { ConfigModule, ConfigService, } from '@nestjs/config';
import { databaseConfig, } from '@libs/config/database';
import { DataSource, } from 'typeorm';

async function init() {
  ConfigModule.forRoot();
  const config = new ConfigService();
  const dataSource = new DataSource({
    ...databaseConfig(config),
    entities: ['dist/**/*.entity.js'],
    synchronize: true,
  });
  await dataSource.initialize();
  console.log('Database sync complete');
}

init().catch((error) => console.log(error));
