import { Inject, Injectable, } from '@nestjs/common';
import { PassportStrategy, } from '@nestjs/passport';
import { Exception, } from '@libs/utils/Exception';
import { ExtractJwt, Strategy, } from 'passport-jwt';

import { AuthConfig, } from '../auth.config';
import { JwtPayload, SessionService, } from '../session/session.service';

@Injectable()
export default class JwtAccessStrategy extends PassportStrategy(Strategy, 'jwt-access') {
  private readonly _service: SessionService;
  // private readonly _userRepository: UserRepository;

  constructor(
    @Inject(AuthConfig) config: AuthConfig,
    session: SessionService 
    // @Inject(UserRepository) userRepository: UserRepository
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.jwt.access.secret,
    });

    this._service = session;

    // this._userRepository = userRepository;
  }

  async validate(payload: JwtPayload) {
    if (!payload?.id) {
      return null;
    }

    const session = await this._service.get(payload.id);

    if (!session) {
      throw new Exception(401000, 'Session not found');
    }
    
    // const user = await this._userRepository.findOne({
    //   where: {
    //     id: session.userId,
    //   },
    // });

    // if (!user) {
    //   await this._service.delete(payload.id);

    //   throw new Exception(401000, 'Session not found');
    // }

    return session;
  }
}
