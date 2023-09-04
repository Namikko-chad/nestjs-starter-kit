import { Column, Entity, JoinColumn, ManyToOne, } from 'typeorm';

import { AbstractEntity, } from '@libs/utils';

import { Room, } from './Room.entity';

@Entity({
  schema: 'chat'
  })
export class User extends AbstractEntity {

  @Column({
    type: 'uuid',
    nullable: false,
    })
    roomId!: string;

  @Column({
    type: 'uuid',
    nullable: false,
    })
    userId!: string;

  @ManyToOne(() => Room, room => room.id)
  @JoinColumn({ 
    name: 'roomId',
    referencedColumnName: 'id',
    })
    room: Room;
}
