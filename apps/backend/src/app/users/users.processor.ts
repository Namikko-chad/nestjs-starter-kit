import { Inject, Injectable, } from '@nestjs/common';
import { QueryRunner, } from 'typeorm';

import { User, } from './user.entity';
import { UserRole, UserStatus, } from './user.enum';
import { UsersRepository, } from './user.repository';

@Injectable()
export class UserProcessor {
  @Inject(UsersRepository)
  private readonly _repository: UsersRepository;

  async get(userId: string): Promise<User | null> {
    return this._repository.findOneBy({
      id: userId,
    });
  }

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

  async changeRole(userId: string, role: UserRole, queryRunner?: QueryRunner): Promise<void> {
    await this._repository.update({
      id: userId,
    }, {
      role,
    }, {
      queryRunner,
    });
  }
}