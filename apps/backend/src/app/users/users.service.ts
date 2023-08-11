import { Inject, Injectable, } from '@nestjs/common';

import { Exception, } from '@libs/utils/Exception';

import { UsersUpdateDto, } from './users.dto';
import { User, } from './users.entity';
import { UsersErrors, UsersErrorsMessages, } from './users.errors';
import { UsersRepository, } from './users.repository';

@Injectable()
export class UsersService {
  @Inject()
  private readonly _repository: UsersRepository;

  async getUser(id: string): Promise<User | null> {
    const user = await this._repository.getOne({ filter: { id, }, });

    return user;
  }

  async update(id: string, payload: UsersUpdateDto): Promise<User> {
    const user = await this._repository.getOne({ filter: { id, }, });
    
    if (!user)
      throw new Exception(UsersErrors.UserNotFound, UsersErrorsMessages[UsersErrors.UserNotFound], {
        userId: id, 
      });

    user.avatar = payload.avatar;
    user.username = payload.username;

    return this._repository.save(user);
  }
}
