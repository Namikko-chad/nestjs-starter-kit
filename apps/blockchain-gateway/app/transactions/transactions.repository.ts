import { Injectable, } from '@nestjs/common';

import { AbstractRepository, } from '@libs/utils/database';

import { Transaction, } from './transactions.entity';

@Injectable()
export class TransactionsRepository extends AbstractRepository<Transaction> {}
