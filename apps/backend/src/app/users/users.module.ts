import { Module, } from '@nestjs/common';
import { TypeOrmModule, } from '@nestjs/typeorm';

import { User, } from './user.entity';
import { UsersRepository, } from './user.repository';
import { UsersController, } from './users.controller';
import { UserProcessor, } from './users.processor';
import { UsersService, } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersRepository, UsersService, UserProcessor],
  exports: [UsersService, UserProcessor],
  })
export class UsersModule {}
