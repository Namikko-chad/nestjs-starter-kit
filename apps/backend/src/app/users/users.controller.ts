import { Controller, Get, Param, ParseUUIDPipe, } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags, } from '@nestjs/swagger';
import { Exception, } from '@libs/utils/Exception';

import { UsersErrors, UsersErrorsMessages, } from './users.errors';
import { UsersService, } from './users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  #service: UsersService;

  constructor(service: UsersService) {
    this.#service = service;
  }

  @ApiOperation({ summary: 'Requests user model' })
  @ApiOkResponse({ description: 'User model' })
  @Get('/:id')
  async getUser(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string): Promise<void> {
    const user = await this.#service.getUser(id);

    if (!user) throw new Exception(UsersErrors.UserNotFound, UsersErrorsMessages[UsersErrors.UserNotFound]);
  }
}