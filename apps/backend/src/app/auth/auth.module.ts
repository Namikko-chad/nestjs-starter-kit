import { Module, } from '@nestjs/common';
import { ConfigService, } from '@nestjs/config';
import { JwtModule, } from '@nestjs/jwt';

import { UsersRepository, } from '../users';
import { AuthConfig, } from './auth.config';
import { AuthController, } from './auth.controller';
import { AuthTokenService, } from './auth.token.service';
import { JwtAccessGuard, } from './guards/jwt-access.guard';
import { JwtRefreshGuard, } from './guards/jwt-refresh.guard';
import { AuthInviteModule, } from './implementations/invite/auth.invite.module';
import { AuthNativeModule, } from './implementations/native/auth.native.module';
import { AuthWeb3Module, } from './implementations/web3/auth.web3.module';
import { SessionModule, } from './session/session.module';
import JwtAccessStrategy from './strategies/jwt-access.strategy';
import JwtRefreshStrategy from './strategies/jwt-refresh.strategy';

@Module({
  imports: [JwtModule.register({}), SessionModule, AuthNativeModule, AuthWeb3Module, AuthInviteModule],
  controllers: [AuthController],
  providers: [ConfigService, UsersRepository, AuthConfig, AuthTokenService, JwtAccessStrategy, JwtRefreshStrategy, JwtAccessGuard, JwtRefreshGuard],
  exports: [JwtAccessGuard, JwtRefreshGuard],
  })
export class AuthModule {}
