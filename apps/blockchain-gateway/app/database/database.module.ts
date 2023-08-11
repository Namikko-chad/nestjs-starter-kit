import { Global, Module, } from '@nestjs/common';
import { ConfigService, } from '@nestjs/config';
import { TypeOrmModule, } from '@nestjs/typeorm';

import { databaseConfig, } from '@libs/config/database';

@Global()
@Module({
  imports: [
  TypeOrmModule.forRootAsync({
    inject: [ConfigService],
    useFactory: (config: ConfigService) => ({
      ...databaseConfig(config),
      schema: 'blockchain_gateway',
      autoLoadEntities: true,
      }),
    })
  ],
  })
export class DatabaseModule {}
