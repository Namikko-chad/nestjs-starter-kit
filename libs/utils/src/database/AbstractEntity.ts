import { CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn, } from 'typeorm';
import { v4 as uuidv4, } from 'uuid';

export abstract class AbstractEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuidv4();

  @CreateDateColumn({
    type: 'timestamp with time zone',
  })
  createdAt!: Date;

  @UpdateDateColumn({
    type: 'timestamp with time zone',
  })
  updatedAt!: Date;
}
