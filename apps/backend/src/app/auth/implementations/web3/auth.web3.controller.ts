import { Body, Controller, Inject, Post, Req, UseGuards, UsePipes, ValidationPipe, } from '@nestjs/common';
import { ApiOperation, ApiTags, } from '@nestjs/swagger';

import { RequestAuth, } from '../../../dto';
import { JwtAccessGuard, } from '../../guards';
import { JwtResponse, } from '../../strategies/jwt.constants';
import { SignatureDto, } from './auth.web3.dto';
import { AuthWeb3Service, } from './auth.web3.service';

@ApiTags('auth')
@Controller('auth/web3')
@UsePipes(new ValidationPipe({ transform: true, whitelist: true, forbidNonWhitelisted: true, }))
export class AuthWeb3Controller {
  @Inject()
  private readonly _service: AuthWeb3Service;

  @Post('sign-up')
  @ApiOperation({
    summary: 'Sign up',
    })
  async signUp(@Req() request: RequestAuth, @Body() payload: SignatureDto): Promise<JwtResponse> {
    const { ip, } = request;
    const userAgent = request.headers['user-agent'];
    const tokens = await this._service.signUp({
      ...payload,
      ip,
      userAgent,
    });

    return tokens;
  }

  @Post('sign-up/append')
  @ApiOperation({
    summary: 'Append to exists account',
    })
  @UseGuards(JwtAccessGuard)
  async signUpAppend(@Req() req: RequestAuth, @Body() payload: SignatureDto) {
    const session = req.user;
    await this._service.signUpAppend(session, payload);
  }
}