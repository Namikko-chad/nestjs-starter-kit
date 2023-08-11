import { Module, } from '@nestjs/common';
import { TypeOrmModule, } from '@nestjs/typeorm';

import { UsersController, } from './users.controller';
import { User, } from './users.entity';
import { UsersProcessor, } from './users.processor';
import { UsersRepository, } from './users.repository';
import { UsersService, } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersRepository, UsersService, UsersProcessor],
  exports: [UsersRepository, UsersService, UsersProcessor],
  })
export class UsersModule {}
