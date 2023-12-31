import {
  CacheModule,
  Global,
  Inject,
  Module,
  OnModuleDestroy,
} from '@nestjs/common';
import { ConfigService, } from '@nestjs/config';
import { ModuleRef, } from '@nestjs/core';
import { TypeOrmModule, } from '@nestjs/typeorm';
import { redisConfig, } from '@libs/config/redis';
import { CacheService, } from '@libs/utils/cache.service';
import * as redisStore from 'cache-manager-redis-store';

import { AuthConfig, } from '../auth.config';
import { AuthTokenService, } from '../auth.token.service';
import { Session, } from './session.entity';
import { SessionRepository, } from './session.repository';
import { SessionService, } from './session.service';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Session]),
  CacheModule.register({
    store: redisStore,
    ...redisConfig(new ConfigService()),
    })
  ],
  providers: [SessionRepository, AuthConfig, AuthTokenService, CacheService, SessionService],
  exports: [SessionService],
  })
export class SessionModule implements OnModuleDestroy {
  @Inject(ModuleRef) private _moduleRef: ModuleRef;

  async onModuleDestroy() {
  	const client = this._moduleRef.get(CacheService);
  	await client.close();
  }
}
