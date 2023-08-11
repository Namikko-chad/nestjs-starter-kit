import { DeepPartial, } from 'typeorm';

import { AbstractGenerator, } from '@libs/utils/database/AbstractGenerator';
import { Utils, } from '@libs/utils/utils';

import { User, } from './users.entity';

export class UsersGenerator extends AbstractGenerator<User> {

  override default(): DeepPartial<User> {
    return {
      id: Utils.getUUID(),
      username: 'TestUserName',
      email: `${Utils.getUUID()}@test.ch`,
      avatar: Buffer.from('').toString('base64'),
    };
  }
}