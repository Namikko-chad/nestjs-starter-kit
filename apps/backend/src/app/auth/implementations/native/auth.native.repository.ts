import { Injectable, } from '@nestjs/common';
import { AbstractRepository, } from '@libs/utils/database';
import { JoinType, } from '@libs/utils/database/AbstractRepository';
import { EntityManager, SelectQueryBuilder, } from 'typeorm';

import { AuthNative, } from './auth.native.entity';

interface AuthNativeFilter {
  readonly userId?: string;
  readonly email?: string;
}

type AuthNativeJoinable = 
 | 'Users';

interface AuthNativeJoinVariables {
  readonly username?: string;
}

@Injectable()
export class AuthNativeRepository extends AbstractRepository<
  AuthNative, 
  AuthNativeFilter,
  AuthNativeJoinable,
  AuthNativeJoinVariables
  > {
  constructor(entityManager: EntityManager) {
    super(AuthNative, entityManager);
  }

  protected override _joinBuild(
    query: SelectQueryBuilder<AuthNative>, 
    tables: AuthNativeJoinable[], 
    type: JoinType, 
    variables?: AuthNativeJoinVariables
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
    _query: SelectQueryBuilder<AuthNative>, 
    _filter: AuthNativeFilter
  ) {
    if (_filter.userId) _query.andWhere({ userId: _filter.userId, });

    return _query;
  }
}