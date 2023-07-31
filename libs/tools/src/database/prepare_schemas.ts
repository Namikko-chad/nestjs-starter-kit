import { ConfigModule, ConfigService, } from '@nestjs/config';
import { databaseConfig, } from '@libs/config/database';
import { DataSource, } from 'typeorm';

const schemas = ['public', 'logs'];

async function init(): Promise<void> {
  ConfigModule.forRoot();
  const config = new ConfigService();
  const dataSource = new DataSource({
    ...databaseConfig(config),
  });
  await dataSource.initialize();
  const queryRunner = dataSource.createQueryRunner();

  try {
    await queryRunner.connect();
    await queryRunner.startTransaction();
    
    for (const schema of schemas) {
      await queryRunner.query(`CREATE SCHEMA IF NOT EXISTS ${schema}`);
    }

    await queryRunner.commitTransaction();
  } catch (error) {
    await queryRunner.rollbackTransaction();
    console.error('Error creating schemas:', error);
  } finally {
    await queryRunner.release();
    await dataSource.destroy();
  }
}

init().catch((error) => console.log(error));