import { Controller, Get, Headers, Param, Request, UseGuards, UsePipes, ValidationPipe, } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags, } from '@nestjs/swagger';
import { RequestAuth, } from '@libs/utils/dto';
import { Exception, } from '@libs/utils/Exception';

import { AuthParamsDTO, } from './auth.dto';
import { AuthErrors, AuthErrorsMessages, } from './auth.errors';
import { AuthTokenService, } from './auth.token.service';
import { JwtAccessGuard, } from './guards/jwt-access.guard';
import { JwtRefreshGuard, } from './guards/jwt-refresh.guard';
import { MultipleAuthorizeGuard, MultipleGuardsReferences, } from './guards/multiple.guard';
import { JwtResponse, } from './strategies/jwt.constants';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly _service: AuthTokenService) {}

  @Get('refresh')
  @ApiOperation({
    description: 'JWT token refresh',
    })
  @ApiBearerAuth()
  @UseGuards(JwtRefreshGuard)
  async refresh(@Request() req: RequestAuth): Promise<JwtResponse> {
    const session = req.user;

    // const data = await this._service.refresh(session);
    const data = {
      accessToken: '',
      refreshToken: '',
    };

    return Promise.resolve(data);
  }

  // @Post('token/generate/:tokenType')
  // @ApiOperation({
  //   summary: 'Generate token for authorization',
  //   })
  // @AuthPublic()
  // @UsePipes(new ValidationPipe({ transform: true, whitelist: true, forbidNonWhitelisted: true, }))
  // tokenGenerate(@Param() params: AuthParamsDTO, @Body() payload: AuthBodyDTO): { token: string } {
  //   return {
  //     token: this._service.createToken(params.tokenType, {
  //       userId: payload.userId, 
  //       fileId: payload?.fileId,
  //     }),
  //   };
  // }

  @Get('token/info/:tokenType')
  @ApiOperation({
    summary: 'Use this endpoint to decode token',
    })
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true, forbidNonWhitelisted: true, }))
  tokenInfo(@Param() params: AuthParamsDTO, @Headers() headers: Record<string, string>): unknown {
    const authorization = headers?.['authorization'] ;
    if (!authorization)
      throw new Exception(AuthErrors.TokenNotFound, AuthErrorsMessages[AuthErrors.TokenNotFound]);

    return this._service.decodeToken(params.tokenType, authorization.slice(7));
  }

  @Get('token/validate/:tokenType')
  @ApiOperation({
    summary: 'Use this endpoint to validate token',
    })
  @MultipleGuardsReferences(JwtAccessGuard, JwtRefreshGuard)
  @UseGuards(MultipleAuthorizeGuard)
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  tokenValidate(): void {}
}
