import bcrypt from 'bcrypt';
import { BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, OneToOne, PrimaryColumn, } from 'typeorm';

import { User, } from '../../../users';
import { AuthNativeSecurity, } from './auth.native.interfaces';

@Entity({
  name: 'UsersNative'
  })
export class AuthNative {

  @PrimaryColumn({
    type: 'uuid'
    })
    userId: string;

  @Column()
    email: string;

  @Column({
    select: false
    })
    password: string;

  @Column({
    type: 'jsonb'
    })
    security: AuthNativeSecurity;

  @OneToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
    user: User;

  @BeforeInsert()
  private _beforeInsert(): void {
    this.email = this.email ? this.email.toLowerCase() : this.email;
  }

  @BeforeInsert()
  @BeforeUpdate()
  private _encryptPassword(): void {
    if (!this.password) {
      return;
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(this.password, salt);

    this.password = hash;
  }

  passwordCompare(pwd: string): boolean {
    if (!this.password) {
      return false;
    }

    return bcrypt.compareSync(pwd, this.password.replace(/^\$2y/, '$2a'));
  }
}