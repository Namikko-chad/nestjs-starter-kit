import { Body, Controller, Get, Inject, Param, ParseUUIDPipe, Put, Request, UseGuards, } from '@nestjs/common';
import { ApiOperation, ApiTags, } from '@nestjs/swagger';

import { Exception, } from '@libs/utils/Exception';

import { JwtAccessGuard, } from '../auth';
import { RequestAuth, } from '../dto';
import { UsersUpdateDto, } from './users.dto';
import { User, } from './users.entity';
import { UsersErrors, UsersErrorsMessages, } from './users.errors';
import { UsersService, } from './users.service';

@ApiTags('user')
@Controller('user')
@UseGuards(JwtAccessGuard)
export class UsersController {
  @Inject()
  private readonly _service: UsersService;

  @ApiOperation({ 
    summary: 'Requests profile' 
    })
  @Get()
  async getMe(@Request() req: RequestAuth): Promise<User> {
    const { user: session, } = req;
    
    const user = await this._service.getUser(session.userId);

    if (!user)
      throw new Exception(UsersErrors.UserNotFound, UsersErrorsMessages[UsersErrors.UserNotFound]);

    return user;
  }

  @ApiOperation({
    summary: 'Update profile'
    })
  @Put()
  async update(@Request() req: RequestAuth, @Body() payload: UsersUpdateDto): Promise<User> {
    const { user: session, } = req;

    return this._service.update(session.userId, payload);
    
  }
}