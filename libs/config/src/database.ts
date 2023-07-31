import { ConfigService, } from '@nestjs/config';
import { DefaultNamingStrategy, NamingStrategyInterface, Table, } from 'typeorm';
import { DataSourceOptions, } from 'typeorm/data-source/DataSourceOptions';

class CustomNamingStrategy extends DefaultNamingStrategy implements NamingStrategyInterface {
  override tableName(targetName: string, userSpecifiedName?: string): string {
    return userSpecifiedName ?? `${targetName}s`;
  }

  override primaryKeyName(tableOrName: Table | string): string {
    return `${typeof tableOrName === 'string' ? tableOrName : tableOrName.name}_pkey`;
  }
}

export function databaseConfig(configService: ConfigService): DataSourceOptions {
  return {
    namingStrategy: new CustomNamingStrategy(),
    type: 'postgres',
    host: configService.get<string>('DB_HOST') ?? 'localhost',
    port: configService.get<number>('DB_PORT') ?? 5432,
    username: configService.getOrThrow<string>('DB_USERNAME'),
    password: configService.getOrThrow<string>('DB_PASSWORD'),
    database: configService.getOrThrow<string>('DB_DATABASE'),
    synchronize: false,
    migrationsRun: false,
    logging: configService.get<string>('DEBUG') === 'true',
  };
}
