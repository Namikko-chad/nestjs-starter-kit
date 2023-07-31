import { Module, } from '@nestjs/common';
import { ConfigService, } from '@nestjs/config';

import { RecaptchaConfig, } from './recaptcha.config';
import { RecaptchaGuard, } from './recaptcha.guard';

@Module({
  providers: [ConfigService, RecaptchaConfig, RecaptchaGuard],
  exports: [RecaptchaGuard],
  })
export class RecaptchaModule {}
