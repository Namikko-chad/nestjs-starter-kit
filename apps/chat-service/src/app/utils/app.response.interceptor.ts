import { CallHandler, ExecutionContext, Injectable, NestInterceptor, StreamableFile, } from '@nestjs/common';
import { Observable, } from 'rxjs';
import { map, } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(_context: ExecutionContext, next: CallHandler): Observable<unknown> {
    return next.handle().pipe(
      map((value: unknown) => {
        if (!(value instanceof StreamableFile))
          return {
            ok: true,
            result: value,
          };

        return value;
      })
    );
  }
}
