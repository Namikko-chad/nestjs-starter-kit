import { AbstractEntity, } from '@libs/utils/database';
import { Column, Entity, } from 'typeorm';

@Entity({ schema: 'logs', })
export class Session extends AbstractEntity {

  @Column()
    userId!: string;

  @Column()
    userAgent?: string;

  @Column()
    ip!: string;
}