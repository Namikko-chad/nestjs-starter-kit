import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger, } from '@nestjs/common';
import { HttpAdapterHost, } from '@nestjs/core';
import { Exception, } from '@libs/utils/Exception';
import { JsonWebTokenError, } from 'jsonwebtoken';


@Catch()
export class AppExceptionsFilter implements ExceptionFilter {
  private readonly _adapter: HttpAdapterHost;
  private readonly _logger = new Logger('API Request');

  constructor(adapter: HttpAdapterHost) {
    this._adapter = adapter;
  }

  catch(exception: object, host: ArgumentsHost): void {
    const { httpAdapter, } = this._adapter;
    const ctx = host.switchToHttp();
    let httpStatus: number;
    let message: string | object;

    switch (exception.constructor.name) {
      case 'HttpException':
      case 'UnauthorizedException':
      case 'NotFoundException':

      case 'ForbiddenException': {
        httpStatus = (exception as HttpException).getStatus();
        message = (exception as HttpException).getResponse();
        break;
      }

      case 'JsonWebTokenError': {
        httpStatus = HttpStatus.UNAUTHORIZED;
        message = (exception as JsonWebTokenError).message;
        break;
      }

      case 'Exception': {
        httpStatus = (exception as Exception).code;
        message = (exception as Exception).message;
        break;
      }

      default: {
        httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
        message = 'Internal server Error';
      }
    }

    if (httpStatus === HttpStatus.INTERNAL_SERVER_ERROR) {
      this._logger.error(exception, (exception as Error).stack);
    }

    const responseBody = {
      ok: false,
      code: httpStatus,
      data: exception instanceof Exception ? exception.data : {},
      msg:
        typeof message === 'string'
          ? message
          : Array.isArray((message as { message: string | string[] }).message)
            ? (message as { message: string[] }).message.join(', ')
            : (message as { message: string }).message,
    };

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus > 1000 ? Math.floor(httpStatus / 1000) : httpStatus);
  }
}
