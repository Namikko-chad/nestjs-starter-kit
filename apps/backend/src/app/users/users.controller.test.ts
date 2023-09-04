import { HttpServer, INestApplication, } from '@nestjs/common';
import { ConfigModule, } from '@nestjs/config';
import { Test, TestingModule, } from '@nestjs/testing';
import supertest from 'supertest';
import { DataSource, } from 'typeorm';

import { afterAll, beforeAll, describe, expect, it, } from '@jest/globals';

import { SessionService, } from '../auth';
import { AuthModule, } from '../auth/auth.module';
import { JwtResponse, } from '../auth/strategies';
import { DatabaseModule, } from '../database/database.module';
import { UsersGenerator, } from './users.generators';
import { UsersModule, } from './users.module';
import { UsersService, } from './users.service';

describe('Users controller test', () => {
  let moduleRef: TestingModule;
  let app: INestApplication;
  let httpServer: HttpServer;
  let userGenerator: UsersGenerator;
  let usersService: UsersService;
  let sessionService: SessionService;
  let authTokens: JwtResponse;
  let accessToken: string;

  beforeAll(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
        }),
        DatabaseModule,
        AuthModule,
        UsersModule
      ],
    }).compile();

    usersService = moduleRef.get(UsersService);
    const ds = moduleRef.get(DataSource);
    sessionService = moduleRef.get(SessionService);
    userGenerator = new UsersGenerator(ds);
    app = moduleRef.createNestApplication();
    httpServer = app.getHttpServer() as HttpServer;

    await app.init();

    const user = await userGenerator.create();
    authTokens = await sessionService.create({
      ip: '127.0.01',
      userId: user.id,
    });
    accessToken = authTokens.accessToken;
  });

  afterAll(async () => {
    await moduleRef.close();
    await app.close();
  });

  it('should return current user', async () => {
    // Should return created user
    const response = await supertest(httpServer).get('/user').set('Authorization', `Bearer ${accessToken}`).expect(200);
    expect(response.body.id).toStrictEqual(expect.any(String));
  });
});