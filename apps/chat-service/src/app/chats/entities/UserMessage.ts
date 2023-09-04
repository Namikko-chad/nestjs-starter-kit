import { Column, Entity, JoinColumn, OneToOne, } from 'typeorm';

import { AbstractEntity, } from '@libs/utils';

import { MessageStatus, } from '../chats.enum';
import { Message, } from './Message.entity';
import { Room, } from './Room.entity';
import { User, } from './User.entity';

@Entity({
  schema: 'chat'
  })
export class UserMessage extends AbstractEntity {

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
    })
    roomId!: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
    })
    messageId!: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
    })
    userId!: string;

  @Column({
    type: 'enum',
    enum: MessageStatus,
    default: MessageStatus.New
    })
    status!: MessageStatus;

  @OneToOne(() => Room, Room => Room.id)
  @JoinColumn({ 
    name: 'roomId',
    referencedColumnName: 'id',
    })
    room: Room;

  @OneToOne(() => Message, Message => Message.id)
  @JoinColumn({ 
    name: 'messageId',
    referencedColumnName: 'id',
    })
    message: Message;

  @OneToOne(() => User, User => User.id)
  @JoinColumn({ 
    name: 'userId',
    referencedColumnName: 'id',
    })
    user: User;
}
