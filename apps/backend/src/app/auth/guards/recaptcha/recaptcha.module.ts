import { Module, } from '@nestjs/common';
import { ConfigService, } from '@nestjs/config';

import { RecaptchaConfig, } from './recaptcha.config';
import { RecaptchaGuard, } from './recaptcha.guard';

// FIXME resolve dependencies
@Module({
  providers: [ConfigService, RecaptchaConfig, RecaptchaGuard],
  exports: [RecaptchaGuard],
  })
export class RecaptchaModule {}
