import { Inject, Injectable, } from '@nestjs/common';
import { ConfigService, } from '@nestjs/config';

interface RecaptchaConfigInterface {
  secret: string;
  score?: number;
}

@Injectable()
export class RecaptchaConfig {
  public readonly recaptcha: RecaptchaConfigInterface;

  constructor(@Inject(ConfigService) private readonly configService: ConfigService) {
    this.recaptcha = {
      secret: this.configService.getOrThrow<string>('RECAPTCHA_SECRET_KEY'),
      score: this.configService.get<number>('RECAPTCHA_SCORE_LIMIT') ?? 0.5,
    };
  }
}
