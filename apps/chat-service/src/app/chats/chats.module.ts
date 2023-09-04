import { Global, Module, } from '@nestjs/common';
import { TypeOrmModule, } from '@nestjs/typeorm';

import { File, } from './entities/File.entity';
import { Message, } from './entities/Message.entity';
import { Room, } from './entities/Room.entity';
import { User, } from './entities/User.entity';
import { UserMessage, } from './entities/UserMessage';

@Global()
@Module({
  imports: [ TypeOrmModule.forFeature([
    File,
    Message,
    Room,
    User,
    UserMessage
    ]) ]
  })
export class ChatModule {}
