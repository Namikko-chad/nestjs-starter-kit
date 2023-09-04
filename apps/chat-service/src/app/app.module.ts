import { Module, } from '@nestjs/common';
import { ConfigModule, } from '@nestjs/config';

import { ChatModule, } from './chats';
import { DatabaseModule, } from './database';

@Module({
  imports: [
  ConfigModule.forRoot({
    isGlobal: true,
    }),
  DatabaseModule,
  ChatModule
  ],
  })
export class AppModule {}
