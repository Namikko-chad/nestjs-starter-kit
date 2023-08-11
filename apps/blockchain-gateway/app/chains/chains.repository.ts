import { Injectable, } from '@nestjs/common';

import { AbstractRepository, } from '@libs/utils';

import { Chain, } from './chains.entity';

@Injectable()
export class ChainsRepository extends AbstractRepository<Chain> {}
