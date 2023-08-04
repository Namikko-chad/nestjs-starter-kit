import { Inject, Injectable, } from '@nestjs/common';
import { Exception, } from '@libs/utils/Exception';
import { InviteTokenService, } from '@libs/utils/invite-token.service';
import { DataSource, } from 'typeorm';

import { UsersRepository, } from '../../../users';
import { UserProcessor, } from '../../../users/users.processor';
import { SessionService, } from '../../session/session.service';
import { JwtResponse, } from '../../strategies/jwt.constants';
import { InviteCreateDto, InviteDto, } from './auth.invite.dto';
import { AuthInviteErrors, AuthInviteErrorsMessages, } from './auth.invite.errors';
import { InvitePayload, } from './auth.invite.interface';

@Injectable()
export class AuthInviteService {
  @Inject()
  private readonly _ds: DataSource;

  @Inject()
  private readonly _userProcessor: UserProcessor;

  @Inject()
  private readonly _userRepository: UsersRepository;

  @Inject()
  private readonly _sessionService: SessionService;

  @Inject()
  private readonly _inviteTokenService: InviteTokenService;

  async signUp(payload: InviteDto & {
    userAgent?: string;
    ip: string;
  }): Promise<JwtResponse> {
    const queryRunner = this._ds.createQueryRunner();
    await queryRunner.startTransaction();

    try {
      const invitePayload = this._inviteTokenService.getPayload<InvitePayload>(payload.invite);
      if (new Date(invitePayload.expiredAt) < new Date())
        throw new Exception(AuthInviteErrors.InviteExpired, AuthInviteErrorsMessages[AuthInviteErrors.InviteExpired], {
          expiredAt: invitePayload.expiredAt,
        });
      
      let user = await this._userRepository.findOneBy({
        email: invitePayload.email,
      });

      if (!user) {
        user = await this._userProcessor.create({
          email: invitePayload.email,
          role: invitePayload.role,
        }, queryRunner);
      }

      await queryRunner.commitTransaction();
      const tokens = this._sessionService.create({
        userId: user.id,
        userAgent: payload.userAgent,
        ip: payload.ip,
      });

      return tokens;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async create(payload: InviteCreateDto): Promise<string> {
    return Promise.resolve(this._inviteTokenService.create(payload));
  }
}