import { Inject, Injectable, } from '@nestjs/common';
import { PassportStrategy, } from '@nestjs/passport';
import { ExtractJwt, Strategy, } from 'passport-jwt';

import { AuthConfig, } from '../auth.config';
import { JwtPayload, SessionService, } from '../session/session.service';

@Injectable()
export default class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  private readonly _service: SessionService;

  constructor(
    @Inject(AuthConfig) config: AuthConfig,
    session: SessionService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.jwt.refresh.secret,
    });

    this._service = session;
  }

  async validate(payload: JwtPayload) {
    if (!payload.id) {
      return null;
    }

    const session = await this._service.get(payload.id);

    return session;
  }
}
