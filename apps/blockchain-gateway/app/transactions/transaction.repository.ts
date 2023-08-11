import { Injectable, } from '@nestjs/common';

import { AbstractRepository, } from '@libs/utils/database';

import { Transaction, } from './transaction.entity';

@Injectable()
export class TransactionRepository extends AbstractRepository<Transaction> {}
