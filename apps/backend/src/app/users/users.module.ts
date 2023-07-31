import { Module, } from '@nestjs/common';
import { TypeOrmModule, } from '@nestjs/typeorm';

import { User, } from './entities';
import { UsersRepository, } from './repository';
import { UsersController, } from './users.controller';
import { UsersService, } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
  exports: [UsersService],
  })
export class UsersModule {}
