import { Module, } from '@nestjs/common';
import { TypeOrmModule, } from '@nestjs/typeorm';
import { AppConfig, } from '@libs/config/app';

import { UsersModule, } from '../../../users';
import { AuthNativeController, } from './auth.native.controller';
import { AuthNative, } from './auth.native.entity';
import { AuthNativeRepository, } from './auth.native.repository';
import { AuthNativeService, } from './auth.native.service';

@Module({
  imports: [TypeOrmModule.forFeature([AuthNative]), UsersModule],
  controllers: [AuthNativeController],
  providers: [AppConfig, AuthNativeRepository, AuthNativeService]
  })
export class AuthNativeModule {}