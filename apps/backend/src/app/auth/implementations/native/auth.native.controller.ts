import { Body, Controller, Inject, Post, Req, UsePipes, ValidationPipe, } from '@nestjs/common';
import { ApiOperation, ApiTags, } from '@nestjs/swagger';
import { Throttle, } from '@nestjs/throttler';
import { AppConfig, } from '@libs/config/app';
import { Request, } from 'express';

import { PasswordRecoveryConfirmDto,PasswordRecoveryDto, SignInDto, SignUpConfirmDto, SignUpDto, SignUpResendDto, } from './auth.native.dto';
import { AuthNativeService, } from './auth.native.service';

@ApiTags('auth')
@Controller('auth')
@UsePipes(new ValidationPipe({ transform: true, whitelist: true, forbidNonWhitelisted: true, }))
export class AuthNativeController {
  @Inject()
  private readonly _appConfig: AppConfig;

  @Inject()
  private readonly _service: AuthNativeService;

  @Post('sign-up')
  @ApiOperation({
    description: 'Sign up',
    })
  async signUp(@Body() payload: SignUpDto): Promise<void | { token: unknown; }> {
    const res = await this._service.signUp(payload);
    if (this._appConfig.development)
      return {
        token: res.security.emailConfirmation?.['code'],
      };
  }

  @Post('sign-up/confirm')
  @ApiOperation({
    description: 'Sign up confirm',
    })
  async signUpConfirm(@Body() payload: SignUpConfirmDto) {
    return await this._service.signUpConfirm(payload);
  }

  @Post('sign-up/resend')
  @ApiOperation({
    description: 'Resend sign up',
    })
  @Throttle(1, 60)
  async signUpResend(@Body() payload: SignUpResendDto) {
    await this._service.signUpResend(payload);
  }

  @Post('sign-in')
  @ApiOperation({
    description: 'Sign in',
    })
  async signIn(@Req() request: Request, @Body() payload: SignInDto) {
    const { ip, } = request;
    const userAgent = request.headers['user-agent'];
    const response = await this._service.signIn({
      ...payload,
      userAgent,
      ip,
    });

    return response;
  }

  @Post('password-recovery')
  @ApiOperation({
    description: 'Password recovery',
    })
  @Throttle(1, 60)
  async passwordRecovery(@Body() payload: PasswordRecoveryDto) {
    await this._service.passwordRecovery(payload);
  }

  @Post('password-recovery/confirm')
  @ApiOperation({
    description: 'Password recovery confirm',
    })
  async passwordRecoveryConfirm(@Body() payload: PasswordRecoveryConfirmDto) {
    await this._service.passwordRecoveryConfirm(payload);
  }
}