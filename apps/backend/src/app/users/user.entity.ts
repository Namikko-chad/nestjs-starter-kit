import { AbstractEntity, } from '@libs/utils/database';
import { Column, Entity, } from 'typeorm';

import { UserRole, UserStatus, } from './user.enum';

@Entity()
export class User extends AbstractEntity {

  @Column({
    nullable: true
    })
    username: string;
  
  @Column({
    type: 'enum',
    enum: UserStatus,
    default: UserStatus.New
    })
    status: UserStatus;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.Guest,
    })
    role: UserRole;
}
