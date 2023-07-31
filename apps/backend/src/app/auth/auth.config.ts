import { Injectable, } from '@nestjs/common';
import { ConfigService, } from '@nestjs/config';

import { Token, } from './auth.dto';

interface JwtTokenInterface {
  secret: string;
  lifetime: number;
}

export interface JwtAuthInterface {
  [Token.Access]: JwtTokenInterface;
  [Token.Refresh]: JwtTokenInterface;
}

@Injectable()
export class AuthConfig {
  /** JWT auth secrets */
  public jwt: JwtAuthInterface;

  constructor(private readonly configService: ConfigService) {
    this.jwt = {
      [Token.Access]: {
        secret: this.configService.getOrThrow<string>('JWT_ACCESS_SECRET'),
        lifetime: this.configService.get<number>('JWT_ACCESS_LIFETIME') ?? 86400,
      },
      [Token.Refresh]: {
        secret: this.configService.getOrThrow<string>('JWT_REFRESH_SECRET'),
        lifetime: this.configService.get<number>('JWT_REFRESH_LIFETIME') ?? 86400,
      },
    };
  }
}
