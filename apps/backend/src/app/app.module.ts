import { MiddlewareConsumer, Module, NestModule, RequestMethod, } from '@nestjs/common';
import { ConfigModule, } from '@nestjs/config';

import { AuthModule, } from './auth/auth.module';
import { DatabaseModule, } from './database/database.module';
import { UsersModule, } from './users';
import RequestContextMiddleware from './utils/app.request.context.middleware';

@Module({
  imports: [
  ConfigModule.forRoot({
    isGlobal: true,
    }),
  DatabaseModule,
  AuthModule,
  UsersModule,
  ],
  })
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(RequestContextMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL, });
  }
}