import { AbstractEntity, } from '@libs/utils/database';
import { Column, Entity, } from 'typeorm';

@Entity({ schema: 'logs', })
export class Session extends AbstractEntity {

  @Column({
    type: 'uuid'
    })
    userId!: string;

  @Column({
    nullable: true
    })
    userAgent?: string;

  @Column()
    ip!: string;
}