import { Controller, Post, Request, UseGuards, } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags, } from '@nestjs/swagger';

import { RequestAuth, } from '../dto';
import { Token, } from './auth.dto';
import { AuthTokenService, } from './auth.token.service';
import { JwtRefreshGuard, } from './guards/jwt-refresh.guard';
import { JwtResponse, } from './strategies/jwt.constants';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly _service: AuthTokenService) {}

  @Post('/token/refresh')
  @ApiOperation({
    description: 'JWT token refresh',
    })
  @ApiBearerAuth()
  @UseGuards(JwtRefreshGuard)
  async refresh(@Request() req: RequestAuth): Promise<JwtResponse> {
    const session = req.user;
    
    const accessToken = this._service.createToken(Token.Access, { sessionId: session.id, });
    const refreshToken = this._service.createToken(Token.Refresh, { sessionId: session.id, });
    const data = {
      accessToken,
      refreshToken,
    };

    return Promise.resolve(data);
  }
}
