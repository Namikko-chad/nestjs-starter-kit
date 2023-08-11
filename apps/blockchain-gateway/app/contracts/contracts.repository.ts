
import { Injectable, } from '@nestjs/common';

import { AbstractRepository, } from '@libs/utils';

import { Contract, } from './contracts.entity';

@Injectable()
export class ContractsRepository extends AbstractRepository<Contract> {}
