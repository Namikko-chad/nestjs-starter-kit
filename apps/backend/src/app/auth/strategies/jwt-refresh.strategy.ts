import { Inject, Injectable, } from '@nestjs/common';
import { PassportStrategy, } from '@nestjs/passport';
import { Exception, } from '@libs/utils/Exception';
import { ExtractJwt, Strategy, } from 'passport-jwt';

import { UsersErrors, UsersErrorsMessages, UsersRepository, } from '../../users';
import { AuthConfig, } from '../auth.config';
import { SessionErrors, SessionErrorsMessages, } from '../session';
import { JwtPayload, SessionService, } from '../session/session.service';

@Injectable()
export default class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  @Inject() private readonly _service: SessionService;
  @Inject() private readonly _userRepository: UsersRepository;

  constructor(
    @Inject(AuthConfig) config: AuthConfig
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.jwt.refresh.secret,
    });
  }

  async validate({ sessionId, }: JwtPayload) {
    if (!sessionId) {
      return null;
    }
 
    const session = await this._service.get(sessionId);

    if (!session) {
      throw new Exception(SessionErrors.SessionNotFound, SessionErrorsMessages[SessionErrors.SessionNotFound], {
        sessionId: sessionId,
      });
    }
    
    const user = await this._userRepository.findOne({
      where: {
        id: session.userId,
      },
    });

    if (!user) {
      await this._service.delete(sessionId);

      throw new Exception(UsersErrors.UserNotFound, UsersErrorsMessages[UsersErrors.UserNotFound], {
        userId: session.userId,
      });
    }

    return session;
  }
}
