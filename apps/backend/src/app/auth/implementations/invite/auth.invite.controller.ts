import { Body, Controller, Inject, Post, Req, UsePipes, ValidationPipe, } from '@nestjs/common';
import { ApiOperation, ApiTags, } from '@nestjs/swagger';
import { Request, } from 'express';

import { JwtResponse, } from '../../strategies/jwt.constants';
import { InviteCreateDto, InviteDto, } from './auth.invite.dto';
import { AuthInviteService, } from './auth.invite.service';

@ApiTags('auth')
@Controller('auth/invite')
@UsePipes(new ValidationPipe({ transform: true, whitelist: true, forbidNonWhitelisted: true, }))
export class AuthInviteController {
  @Inject()
  private readonly _service: AuthInviteService;

  @Post('sign-up')
  @ApiOperation({
    summary: 'Sign up',
    })
  async signUp(@Req() request: Request, @Body() payload: InviteDto): Promise<JwtResponse> {
    const { ip, } = request;
    const userAgent = request.headers['user-agent'];

    const tokens = await this._service.signUp({
      ...payload,
      ip,
      userAgent,
    });

    return tokens;
  }

  @Post('create')
  @ApiOperation({
    summary: 'Create invite link',
    })
  async create(@Body() payload: InviteCreateDto): Promise<{ invite: string; }> {
    return {
      invite: await this._service.create(payload),
    };
  }
}