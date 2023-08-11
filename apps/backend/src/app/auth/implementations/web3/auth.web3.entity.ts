import { BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, OneToOne, PrimaryColumn, } from 'typeorm';

import { Utils, } from '@libs/utils/utils';

import { User, } from '../../../users';

@Entity({
  name: 'UsersWeb3'
  })
export class AuthWeb3 {

  @PrimaryColumn({
    type: 'uuid'
    })
    userId: string;

  @Column()
    address: string;

  @OneToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
    user: User;

  @BeforeInsert()
  @BeforeUpdate()
  private _normalizeAddress(): void {
    if (!this.address) {
      return;
    }

    if (Utils.isEthAddress(this.address))
      this.address = this.address.toLowerCase();
  }
}