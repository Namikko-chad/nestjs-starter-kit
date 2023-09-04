import { Column, Entity, JoinColumn, ManyToOne, OneToMany, } from 'typeorm';

import { AbstractEntity, } from '@libs/utils';

// import { File, } from './File';
import { Room, } from './Room.entity';

@Entity({
  schema: 'chat'
  })
export class Message extends AbstractEntity {
  @Column({
    type: 'uuid',
    nullable: false,
    })
    userId!: string;

  @Column({
    type: 'uuid',
    nullable: false,
    })
    roomId!: string;

  @Column({
    type: 'text',
    })
    message!: string;

  // @OneToMany(() => File, File => File.messageId)
  // @JoinColumn({ 
  //   name: 'id',
  //   referencedColumnName: 'messageId',
  //   })
  //   files: File[];

  @ManyToOne(() => Room, room => room.id)
  @JoinColumn({ 
    name: 'roomId',
    referencedColumnName: 'id',
    })
    room: Room;
}
