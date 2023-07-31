import { Inject, Injectable, } from '@nestjs/common';
import { CacheService, } from '@libs/utils/cache.service';

import { AuthConfig, } from '../auth.config';
import { Token, } from '../auth.dto';
import { AuthTokenService, } from '../auth.token.service';
import { Session, } from './session.entity';
import { SessionRepository, } from './session.repository';

export interface SessionPayload {
  userId: string;
  userAgent: string;
  ip: string;
}

export interface JwtPayload {
  id: string;
}

@Injectable()
export class SessionService {
  @Inject()
  private readonly _config: AuthConfig;
  @Inject()
  private readonly _authTokenService: AuthTokenService;
  @Inject()
  private readonly _service: CacheService;
  @Inject()
  private readonly _repository: SessionRepository;

  get(id: string): Promise<Session> {
  	return this._service.get(id) as Promise<Session>;
  }

  async update(
  	id: string,
  	payload: SessionPayload
  ): Promise<void> {
  	await this._service.set(id, payload);
  }

  async delete(sessionId: string | number) {
  	await this._service.del(`session:${sessionId}`);
  }

  async create(payload: SessionPayload) {
  	const session = this._repository.create(payload);
    await this._repository.save(session);
  	await this._service.set(`session:${session.id}`, session, this._config.jwt.refresh.lifetime);
    const accessToken = this._authTokenService.createToken(Token.Access, { sessionId: session.id, });
    const refreshToken = this._authTokenService.createToken(Token.Refresh, { sessionId: session.id, });

    return { accessToken, refreshToken, };
  }
}
