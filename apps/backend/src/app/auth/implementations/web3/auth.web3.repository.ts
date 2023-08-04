import { Injectable, } from '@nestjs/common';
import { AbstractRepository, } from '@libs/utils/database';
import { JoinType, } from '@libs/utils/database/AbstractRepository';
import { EntityManager, SelectQueryBuilder, } from 'typeorm';

import { AuthWeb3, } from './auth.web3.entity';

interface AuthWeb3Filter {
  readonly userId?: string;
  readonly email?: string;
}

type AuthWeb3Joinable = 
 | 'Users';

interface AuthWeb3JoinVariables {
  readonly username?: string;
}

@Injectable()
export class AuthWeb3Repository extends AbstractRepository<
  AuthWeb3, 
  AuthWeb3Filter,
  AuthWeb3Joinable,
  AuthWeb3JoinVariables
  > {
  constructor(entityManager: EntityManager) {
    super(AuthWeb3, entityManager);
  }

  protected override _joinBuild(
    query: SelectQueryBuilder<AuthWeb3>, 
    tables: AuthWeb3Joinable[], 
    type: JoinType, 
    variables?: AuthWeb3JoinVariables
  ) {
    if (!tables) {
      return;
    }

    const alias = query.alias;

    for (const table of tables) {
      switch (table) {
        case 'Users': {
          const method = type === 'inner' 
            ? 'innerJoinAndMapOne' 
            : 'leftJoinAndMapOne';
            
          let joinCause = `users.id = ${alias}.userId`;

          if (variables?.username) {
            joinCause += ` or users.username = '${variables.username}'`;
          }

          query[method](
            `${alias}.users`, 
            'Users', 
            'users', 
            joinCause
          );

          break;
        }
      }
    }

    return query;
  }

  protected override _filterBuild(
    _query: SelectQueryBuilder<AuthWeb3>, 
    _filter: AuthWeb3Filter
  ) {
    if (_filter.userId) _query.andWhere({ userId: _filter.userId, });

    return _query;
  }
}