import { CanActivate, ExecutionContext, Inject, Injectable, } from '@nestjs/common';
import { Fetch, } from '@libs/utils/node-fetch';
import { Request, } from 'express';

import { RecaptchaConfig, } from './recaptcha.config';

interface RecaptchaRes {
  success: boolean,      // whether this request was a valid reCAPTCHA token for your site
  score?: number             // the score for this request (0.0 - 1.0)
  action?: string            // the action name for this request (important to verify)
  challenge_ts: Date,  // timestamp of the challenge load (ISO format yyyy-MM-dd'T'HH:mm:ssZZ)
  hostname: string,         // the hostname of the site where the reCAPTCHA was solved
  'error-codes'?: string[]        // optional
}

@Injectable()
export class RecaptchaGuard implements CanActivate {
  @Inject()
  private readonly _config: RecaptchaConfig;
  @Inject()
  private readonly _fetch: Fetch;

  constructor(private readonly _isEnable = true) {
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    if (!this._isEnable) {
      return true;
    }

    const request = context.switchToHttp().getRequest<Request>();

    const recaptchaToken = request.headers['recaptcha'] as string;

    if (!recaptchaToken) {
      return false;
    }

    const verifyUrl = 'https://www.google.com/recaptcha/api/siteverify';

    try {
      const response = await this._fetch.request<RecaptchaRes>('POST', verifyUrl, {
        secret: 'this._config.recaptcha.secret',
        response: recaptchaToken,
      } );
      
      const { success, score, } = response;

      if (!success) {
        return false;
      }

      if (score && this._config.recaptcha?.score) {
        if (score < this._config.recaptcha.score)
          return false;
      }

      return success;
    } catch (err) {
      return false;
    }
  }
}
