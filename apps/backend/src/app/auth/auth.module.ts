import { Module, } from '@nestjs/common';
import { ConfigService, } from '@nestjs/config';
import { JwtModule, } from '@nestjs/jwt';

import { AuthConfig, } from './auth.config';
import { AuthController, } from './auth.controller';
import { AuthTokenService, } from './auth.token.service';
import { JwtAccessGuard, } from './guards/jwt-access.guard';
import { JwtRefreshGuard, } from './guards/jwt-refresh.guard';
import { RecaptchaGuard } from './guards/recaptcha/recaptcha.guard';

@Module({
  imports: [JwtModule.register({})],
  controllers: [AuthController],
  providers: [ConfigService, AuthConfig, AuthTokenService, JwtAccessGuard, JwtRefreshGuard, RecaptchaGuard],
  exports: [AuthTokenService, JwtAccessGuard, JwtRefreshGuard, RecaptchaGuard],
  })
export class AuthModule {}
