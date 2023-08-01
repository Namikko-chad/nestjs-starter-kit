import { Module, } from '@nestjs/common';
import { ConfigService, } from '@nestjs/config';
import { JwtModule, } from '@nestjs/jwt';

import { AuthConfig, } from './auth.config';
import { AuthController, } from './auth.controller';
import { AuthTokenService, } from './auth.token.service';
import { JwtAccessGuard, } from './guards/jwt-access.guard';
import { JwtRefreshGuard, } from './guards/jwt-refresh.guard';
import { AuthNativeModule, } from './implementations/native/auth.native.module';
import { SessionModule, } from './session/session.module';

@Module({
  imports: [JwtModule.register({}),  SessionModule, AuthNativeModule],
  controllers: [AuthController],
  providers: [ConfigService, AuthConfig, AuthTokenService, JwtAccessGuard, JwtRefreshGuard],
  exports: [AuthTokenService, JwtAccessGuard, JwtRefreshGuard],
  })
export class AuthModule {}
