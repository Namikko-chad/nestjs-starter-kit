import { ExecutionContext, Injectable, UnauthorizedException, } from '@nestjs/common';
import { AuthGuard, } from '@nestjs/passport';
import { lastValueFrom, } from 'rxjs';

@Injectable()
export class JwtAccessGuard extends AuthGuard('jwt-access') {
  constructor() {
    super();
  }

  override async canActivate(context: ExecutionContext): Promise<boolean> {
    const canActivePipe = await super.canActivate(context);
    const isSuperCanActivate = typeof canActivePipe === 'boolean' ? canActivePipe : lastValueFrom(canActivePipe);

    return isSuperCanActivate;
  }

  override handleRequest<TUser>(err: Error, user: TUser) {
    if (err || !user) {
      throw err || new UnauthorizedException();
    }

    return user;
  }
}
