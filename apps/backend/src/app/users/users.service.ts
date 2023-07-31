import { Injectable, } from '@nestjs/common';

import { User, } from './entities';
import { UsersRepository, } from './repository';

@Injectable()
export class UsersService {
  repository: UsersRepository;

  constructor(repository: UsersRepository) {
    this.repository = repository;
  }

  async createUser(): Promise<string> {
    const { id, } = await this.repository.save(this.repository.create());

    return id;
  }

  async getUser(id: string): Promise<User | null> {
    const user = await this.repository.getOne({ filter: { id, }, });

    return user;
  }
}
