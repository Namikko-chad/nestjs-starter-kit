import { Module, } from '@nestjs/common';
import { TypeOrmModule, } from '@nestjs/typeorm';

import { Transaction, } from './transactions.entity';
import { TransactionsGenerator, } from './transactions.generator';
import { TransactionsRepository, } from './transactions.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Transaction])],
  providers: [TransactionsRepository],
  exports: [TransactionsGenerator]
  })
export class TransactionsModule {}