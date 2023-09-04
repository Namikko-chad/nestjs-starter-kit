import { Column, Entity, JoinColumn, OneToMany, } from 'typeorm';

import { AbstractEntity, } from '@libs/utils';

import { File, } from './File.entity';
import { Message, } from './Message.entity';
import { User, } from './User.entity';

@Entity({
  schema: 'chat'
  })
export class Room extends AbstractEntity {

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false
    })
    name!: string;

  @Column({
    type: 'uuid',
    nullable: true
    })
    iconId?: string;


  public messageCount!: number;

  public unreadMessageCount!: number;

  @OneToMany(() => Message, message => message.roomId)
  @JoinColumn({ 
    name: 'id',
    referencedColumnName: 'roomId',
    })
    messages: Message[];

  @OneToMany(() => User, user => user.roomId)
  @JoinColumn({ 
    name: 'id',
    referencedColumnName: 'roomId',
    })
    users: User[];

  @OneToMany(() => File, file => file.roomId)
  @JoinColumn({ 
    name: 'id',
    referencedColumnName: 'roomId',
    })
    files: File[];
}
