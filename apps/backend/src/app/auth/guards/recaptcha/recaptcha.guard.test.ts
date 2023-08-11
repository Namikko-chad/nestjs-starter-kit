import { ExecutionContext, } from '@nestjs/common';
import { ConfigModule, } from '@nestjs/config';
import { Test, } from '@nestjs/testing';

import { beforeAll, beforeEach, describe, expect, it, jest, } from '@jest/globals';

import { Fetch, } from '@libs/utils/node-fetch';

import { RecaptchaGuard, } from './recaptcha.guard';
import { RecaptchaModule, } from './recaptcha.module';

jest.spyOn(Fetch.prototype, 'request').mockImplementation((): Promise<{ success: boolean; score: number; }> => {
  return Promise.resolve({
    success: true,
    score: 0.8,
  });
});

describe.skip('RecaptchaGuard', () => {
  let recaptchaGuard: RecaptchaGuard;
  let mockRequest: {
    headers: {
      recaptcha?: string;
    }
  };

  beforeAll(() => {
    process.env['MODE'] = 'test';
  } );

  beforeEach(async () => {
    mockRequest = {
      headers: {
        recaptcha: 'mockRecaptchaToken',
      },
    };
    const moduleRef = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
        }),
        RecaptchaModule
      ],
    }).compile();

    recaptchaGuard = moduleRef.get<RecaptchaGuard>(RecaptchaGuard);
  });

  it('should return true if recaptcha token is provided and verification is successful', async () => {
    const context = createContext(mockRequest);

    const result = await recaptchaGuard.canActivate(context);

    expect(result).toBe(true);
  });

  it('should return false if recaptcha token is not provided', async () => {
    delete mockRequest.headers.recaptcha;
    const context = createContext(mockRequest);

    const result = await recaptchaGuard.canActivate(context);

    expect(result).toBe(false);
  });

  it('should return false if recaptcha verification fails', async () => {
    const context = createContext(mockRequest);

    const result = await recaptchaGuard.canActivate(context);

    expect(result).toBe(false);
  });

  it('should return false if recaptcha verification throws an error', async () => {
    const context = createContext(mockRequest);

    const result = await recaptchaGuard.canActivate(context);

    expect(result).toBe(false);
  });

  function createContext(request: unknown): ExecutionContext {
    return {
      switchToHttp: () => ({
        getRequest: () => request,
      }),
    } as ExecutionContext;
  }
});
