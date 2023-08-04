import { ExecutionContext, Injectable, UnauthorizedException, } from '@nestjs/common';
import { Reflector, } from '@nestjs/core';
import { AuthGuard, } from '@nestjs/passport';
import { lastValueFrom, } from 'rxjs';

import { IS_PUBLIC_KEY, IS_TRY, } from '../auth.decorators';

@Injectable()
export class JwtAccessGuard extends AuthGuard('jwt-access') {
  constructor(private reflector: Reflector) {
    super();
  }

  override async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [context.getHandler(), context.getClass()]);

    if (isPublic) {
      return true;
    }

    const isTry = this.reflector.getAllAndOverride<boolean>(IS_TRY, [context.getHandler(), context.getClass()]);
    const canActivePipe = await super.canActivate(context);
    const isSuperCanActivate = typeof canActivePipe === 'boolean' ? canActivePipe : lastValueFrom(canActivePipe);
    console.log(isSuperCanActivate);
    console.log(isTry);

    return isSuperCanActivate && isTry;
  }

  override handleRequest<TUser>(err: Error, user: TUser) {
    if (err || !user) {
      throw err || new UnauthorizedException();
    }

    return user;
  }
}
