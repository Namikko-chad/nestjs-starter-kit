import { Body, Controller, Inject, Post, } from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiTags, } from '@nestjs/swagger';

import { RecaptchaGuard, } from '../../guards/recaptcha/recaptcha.guard';
import { AuthNativeService, } from './auth.native.service';

@ApiTags('auth')
@Controller('auth')
export class AuthNativeController {
  @Inject()
  private readonly _service: AuthNativeService;

  @Post('sign-up')
  @ApiOperation({
    description: 'Sign up',
    })
  @ApiHeader({
    name: 'recaptcha',
    description: 'The reCAPTCHA token for validation',
    })
  @UseGuards(RecaptchaGuard)
  async signUp(@Body() payload: SignUpDto) {
    await this._service.signUp(payload);
  }

  @Get('sign-up/confirm')
  @ApiOperation({
    description: 'Sign up confirm',
    })
  async signUpConfirm(@Query() query: TokenDto) {
    const response = await this._service.signUpConfirm(query);

    return response;
  }

  @Post('sign-in')
  @ApiOperation({
    description: 'Sign in',
    })
  @ApiHeader({
    name: 'recaptcha',
    description: 'The reCAPTCHA token for validation',
    })
  @UseGuards(RecaptchaGuard)
  async signIn(@Body() payload: SignInDto) {
    const response = await this._service.signIn(payload);

    return response;
  }

  @Post('sign-up/resend')
  @ApiOperation({
    description: 'Resend sign up',
    })
  @UseGuards(RecaptchaGuard)
  @Throttle(config.rate_limit.resend.default.limit, config.rate_limit.resend.default.rate)
  async signUpResend(@Body() payload: SignUpResendDto) {
    await this._service.signUpResend(payload);
  }

  @Post('password-recovery')
  @ApiOperation({
    description: 'Password recovery',
    })
  @ApiHeader({
    name: 'recaptcha',
    description: 'The reCAPTCHA token for validation',
    })
  @UseGuards(RecaptchaGuard)
  @Throttle(config.rate_limit.resend.default.limit, config.rate_limit.resend.default.rate)
  async passwordRecovery(@Body() payload: PasswordRecoveryDto) {
    await this._service.passwordRecovery(payload);
  }

  @Put('password-recovery/confirm')
  @ApiOperation({
    description: 'Password recovery confirm',
    })
  @UseGuards(RecaptchaGuard)
  async passwordRecoveryConfirm(@Query() query: TokenDto, @Body() payload: PasswordRecoveryConfirmDto) {
    await this._service.passwordRecoveryConfirm(query, payload);
  }
}