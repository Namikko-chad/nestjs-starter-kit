import { HttpServer, INestApplication, } from '@nestjs/common';
import { Test, TestingModule, } from '@nestjs/testing';
import { TypeOrmModule, } from '@nestjs/typeorm';
import supertest from 'supertest';
import { v4, } from 'uuid';

import { afterAll, beforeAll, describe, expect, it, } from '@jest/globals';

import { UsersModule, } from './users.module';
import { UsersService, } from './users.service';

describe('Users controller', () => {
  let moduleRef: TestingModule;
  let app: INestApplication;
  let httpServer: HttpServer;
  let usersService: UsersService;

  beforeAll(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [
        UsersModule,
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          synchronize: true,
          dropSchema: true,
          retryAttempts: 0,
          autoLoadEntities: true,
        })
      ],
    }).compile();

    usersService = moduleRef.get(UsersService);

    app = moduleRef.createNestApplication();
    httpServer = app.getHttpServer() as HttpServer;

    await app.init();
  });

  afterAll(async () => {
    await moduleRef.close();
    await app.close();
  });

  it('load user by id', async () => {
    // Should throw exception with invalid id format
    await supertest(httpServer).get('/users/v4').expect(400);

    // Should throw expection with non-existent user
    await supertest(httpServer).get(`/users/${v4()}`).expect(404);

    const userId = await usersService.createUser();

    // Should return created user
    const response = await supertest(httpServer).get(`/users/${userId}`).expect(200);

    expect(response.body.id).toBe(userId);
  });
});
