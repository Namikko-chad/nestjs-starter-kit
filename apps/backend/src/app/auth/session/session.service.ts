import { Inject, Injectable, } from '@nestjs/common';
import { CacheService, } from '@libs/utils/cache.service';
import { Utils, } from '@libs/utils/utils';

import { AuthConfig, } from '../auth.config';
import { Token, } from '../auth.dto';
import { AuthTokenService, } from '../auth.token.service';
import { JwtResponse, } from '../strategies/jwt.constants';
import { Session, } from './session.entity';
// import { SessionRepository, } from './session.repository';

export interface SessionPayload {
  userId: string;
  userAgent?: string;
  ip: string;
}

export interface JwtPayload {
  sessionId: string;
}

@Injectable()
export class SessionService {
  @Inject()
  private readonly _config: AuthConfig;
  @Inject()
  private readonly _authTokenService: AuthTokenService;
  @Inject()
  private readonly _service: CacheService;
  // @Inject()
  // private readonly _repository: SessionRepository;

  get(sessionId: string): Promise<Session> {
  	return this._service.get(`session:${sessionId}`) as Promise<Session>;
  }

  async update(
  	sessionId: string,
  	payload: SessionPayload
  ): Promise<void> {
  	await this._service.set(`session:${sessionId}`, payload);
  }

  async delete(sessionId: string | number) {
  	await this._service.del(`session:${sessionId}`);
  }

  async create(payload: SessionPayload): Promise<JwtResponse> {
    // FIXME repair typeorm repository
  	// const session = this._repository.create(payload);
    // await this._repository.save(session);
    const session = new Session();
    session.id = Utils.getUUID();
    session.userId = payload.userId;
    session.ip = payload.ip;
    session.userAgent = payload.userAgent;
  	await this._service.set(`session:${session.id}`, session, this._config.jwt.refresh.lifetime);
    const accessToken = this._authTokenService.createToken(Token.Access, { sessionId: session.id, });
    const refreshToken = this._authTokenService.createToken(Token.Refresh, { sessionId: session.id, });

    return { accessToken, refreshToken, };
  }
}
