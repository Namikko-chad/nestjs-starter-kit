import { Injectable, } from '@nestjs/common';
import { EntityManager, SelectQueryBuilder, } from 'typeorm';

import { AbstractRepository, } from '@libs/utils/database';

import { User, } from './users.entity';


export interface IFilter {
  readonly id?: string;
}

@Injectable()
export class UsersRepository extends AbstractRepository<User, IFilter> {
  constructor(entityManager: EntityManager) {
    super(User, entityManager);
  }

  protected override _filterBuild(
    _query: SelectQueryBuilder<User>, 
    _filter: IFilter
  ) {
    if (_filter.id) _query.andWhere({ id: _filter.id, });

    return _query;
  }
}