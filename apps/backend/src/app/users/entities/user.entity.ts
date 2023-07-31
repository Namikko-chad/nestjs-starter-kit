import { AbstractEntity, } from '@libs/utils/database';
import { Entity, } from 'typeorm';

@Entity()
export class User extends AbstractEntity {}
