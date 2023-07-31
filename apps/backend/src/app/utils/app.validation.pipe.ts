import { HttpException, HttpStatus, Injectable, ValidationError, ValidationPipe, } from '@nestjs/common';

@Injectable()
export class AppValidationPipe extends ValidationPipe {
  constructor() {
    super({
      exceptionFactory: (errors) => this.#transformErrors(errors),
    });
  }

  #transformErrors(errors: readonly ValidationError[]): HttpException {
    return new HttpException(
      errors.map((err) => `${err.property}: ${Object.values(err.constraints || {}).join(', ')}`).join(', '),
      HttpStatus.BAD_REQUEST
    );
  }
}
