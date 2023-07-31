import { HttpException, HttpExceptionOptions, } from '@nestjs/common';

export class Exception extends HttpException {
  constructor(public code: number, public msg: string, public data?: Readonly<Record<string, unknown>>, options?: HttpExceptionOptions) {
    super(msg, code, options);
  }
}
