import { Module, } from '@nestjs/common';
import { CryptoConfig, } from '@libs/config/crypto';
import { InviteTokenService, } from '@libs/utils/invite-token.service';

import { UsersModule, UsersRepository, } from '../../../users';
import { UserProcessor, } from '../../../users/users.processor';
import { AuthInviteController, } from './auth.invite.controller';
import { AuthInviteService, } from './auth.invite.service';

@Module({
  imports: [UsersModule],
  controllers: [AuthInviteController],
  providers: [CryptoConfig, InviteTokenService, UserProcessor, UsersRepository, AuthInviteService]
  })
export class AuthInviteModule {}