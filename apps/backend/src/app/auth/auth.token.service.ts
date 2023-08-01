import { Inject, Injectable, } from '@nestjs/common';
import { JwtService, } from '@nestjs/jwt';
import { JwtPayload, } from 'jsonwebtoken';

import { AuthConfig, } from './auth.config';
import { Token, } from './auth.dto';

@Injectable()
export class AuthTokenService extends JwtService {
  constructor(@Inject(AuthConfig) private readonly config: AuthConfig) {
    super();
  }

  public createToken(tokenType: Token, data: object): string {
    const payload: JwtPayload = {
      ...data,
      timestamp: Date.now(),
    };

    return super.sign(payload, {
      // eslint-disable-next-line security/detect-object-injection
      secret: this.config.jwt[tokenType].secret,
      expiresIn: 642000000,
    });
  }

  public decodeToken(tokenType: Token, token: string): JwtPayload {
    return super.verify<JwtPayload>(token, {
      // eslint-disable-next-line security/detect-object-injection
      secret: this.config.jwt[tokenType].secret,
    });
  }

  // public refreshToken(tokenType: Token, token: string) {

  // }
}
