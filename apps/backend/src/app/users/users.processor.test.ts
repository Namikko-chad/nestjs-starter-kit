import { INestApplication, } from '@nestjs/common';
import { ConfigModule, } from '@nestjs/config';
import { Test, TestingModule, } from '@nestjs/testing';

import { afterAll, beforeAll, describe, expect, it, } from '@jest/globals';

import { Utils, } from '@libs/utils';

import { DatabaseModule, } from '../database/database.module';
import { User, } from './users.entity';
import { UserStatus, } from './users.enum';
import { UsersModule, } from './users.module';
import { UsersProcessor, } from './users.processor';
import { UsersRepository, } from './users.repository';

describe('Users controller test', () => {
  let moduleRef: TestingModule;
  let app: INestApplication;
  let usersProcessor: UsersProcessor;
  let usersRepository: UsersRepository;
  let user: User | null;

  beforeAll(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
        }),
        DatabaseModule,
        UsersModule
      ],
    }).compile();

    usersProcessor = moduleRef.get(UsersProcessor);
    usersRepository = moduleRef.get(UsersRepository);
    app = moduleRef.createNestApplication();

    await app.init();
  });

  afterAll(async () => {
    await moduleRef.close();
    await app.close();
  });

  it('should create user', async () => {
    user = await usersProcessor.create({
      username: 'testname',
    });
    expect(user.id).toStrictEqual(expect.any(String));
  });

  it('should change status', async () => {
    if (!user)
      throw new Error('User is not created');
    await usersProcessor.changeStatus(user.id, UserStatus.Active);
    user = await usersRepository.findOneBy({
      id: user.id,
    }) as User;
    expect(user.status).toEqual(UserStatus.Active);
  });

  it('should change email', async () => {
    if (!user)
      throw new Error('User is not created');
    const newEmail = `${Utils.getUUID()}@test.ch`;
    await usersProcessor.changeEmail(user.id, newEmail);
    user = await usersRepository.findOneBy({
      id: user.id,
    }) as User;
    expect(user.email).toBe(newEmail);
  });
});