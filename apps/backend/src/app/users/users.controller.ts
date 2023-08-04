import { Controller, Get, Inject, Param, ParseUUIDPipe, Request, UseGuards, } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags, } from '@nestjs/swagger';
import { Exception, } from '@libs/utils/Exception';

import { JwtAccessGuard, } from '../auth';
import { RequestAuth, } from '../dto';
import { User, } from './user.entity';
import { UsersErrors, UsersErrorsMessages, } from './users.errors';
import { UsersService, } from './users.service';

@ApiTags('users')
@Controller('users')
@UseGuards(JwtAccessGuard)
export class UsersController {
  @Inject()
  private readonly service: UsersService;

  @ApiOperation({ summary: 'Requests profile' })
  @ApiOkResponse({ description: 'User model' })
  @Get('/me')
  async getMe(@Request() req: RequestAuth): Promise<User> {
    const { user: session, } = req;
    
    const user = await this.service.getUser(session.userId);

    if (!user)
      throw new Exception(UsersErrors.UserNotFound, UsersErrorsMessages[UsersErrors.UserNotFound]);

    return user;
  }
}