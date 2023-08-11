import { Column, Entity, } from 'typeorm';

import { AbstractEntity, } from '@libs/utils/database';

import { UserRole, UserStatus, } from './users.enum';

@Entity()
export class User extends AbstractEntity {

  @Column({
    nullable: true
    })
    username?: string;
  
  @Column({
    nullable: true,
    unique: true
    })
    email: string;
  
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

  @Column({
    type: 'text',
    nullable: true
    })
    avatar?: string;
}
