import { Inject, Injectable, } from '@nestjs/common';
import { QueryRunner, } from 'typeorm';

import { User, } from './users.entity';
import { UserStatus, } from './users.enum';
import { UsersRepository, } from './users.repository';

@Injectable()
export class UsersProcessor {
  @Inject(UsersRepository)
  private readonly _repository: UsersRepository;

  async create(payload: Partial<User>, queryRunner?: QueryRunner): Promise<User> {
    const user = this._repository.create(payload);

    return this._repository.save(user, { queryRunner, });
  }

  async changeStatus(userId: string, status: UserStatus, queryRunner?: QueryRunner): Promise<void> {
    await this._repository.update({
      id: userId,
    }, {
      status,
    }, {
      queryRunner,
    });
  }

  async changeEmail(userId: string, email: string, queryRunner?:QueryRunner): Promise<void> {
    await this._repository.update({
      id: userId,
    }, {
      email,
    }, {
      queryRunner,
    });
  }
}