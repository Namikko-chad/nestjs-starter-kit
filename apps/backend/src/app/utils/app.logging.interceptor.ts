import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor, } from '@nestjs/common';
import { Observable, } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly _logger = new Logger('API Request');

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const request = context.switchToHttp().getRequest<{
      method: string;
      originalUrl: string;
    }>();
    this._logger.log(`${request.method} ${request.originalUrl}`);

    return next.handle().pipe();
  }
}
