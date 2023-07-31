/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable security/detect-object-injection */
/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { 
  DeepPartial, 
  DeleteResult, 
  FindManyOptions as TypeOrmFindManyOptions,
  FindOneOptions as TypeOrmFindOneOptions,
  FindOptionsWhere, 
  ObjectID, 
  ObjectLiteral,
  QueryRunner, 
  RemoveOptions as TypeOrmRemoveOptions,
  Repository, 
  SaveOptions as TypeOrmSaveOptions,
  SelectQueryBuilder,
  UpdateResult,
} from 'typeorm';
import { QueryDeepPartialEntity, } from 'typeorm/query-builder/QueryPartialEntity';

import { AbstractEntity, } from './AbstractEntity';

export interface IBaseRepositoryJoin<Joinable, JoinVariables> {
  left?: Joinable[];
  inner?: Joinable[];
  variables?: JoinVariables;
}

export interface IBaseRepositoryGetOne<
  Filter,
  Joinable,
  JoinVariables,
  Lockable,
> {
  filter?: Filter;
  join?: IBaseRepositoryJoin<Joinable, JoinVariables>;
  lock?: Lockable[] | boolean;
  queryRunner?: QueryRunner;
  cache?: boolean | number;
}

export interface IBaseRepositoryGetMany<
  Filter,
  Joinable,
  JoinVariables,
  Lockable,
  Sortable,
> extends IBaseRepositoryGetOne<Filter, Joinable, JoinVariables, Lockable> {
  pagination?: IPagination;
  sort?: ISort<Sortable>[];
}

export interface FindOneOptions<Entity> extends TypeOrmFindOneOptions<Entity> {
  queryRunner?: QueryRunner;
}

export interface FindManyOptions<Entity>
  extends TypeOrmFindManyOptions<Entity> {
  queryRunner?: QueryRunner;
}

export interface SaveOptions extends TypeOrmSaveOptions {
  queryRunner?: QueryRunner;
}

export interface UpdateOptions {
  queryRunner?: QueryRunner;
}

export interface RemoveOptions extends TypeOrmRemoveOptions {
  queryRunner?: QueryRunner;
}

export interface DeleteOptions {
  queryRunner?: QueryRunner;
}

export interface UpdateFromOptions {
  queryRunner?: QueryRunner;
}

export interface IPagination {
  take?: number;
  skip?: number;
}

export type OrderType = 'ASC' | 'DESC';

export interface ISort<T> {
  orderBy?: OrderType;
  sortBy?: T;
}

export type JoinType = 'inner' | 'left';

type conditions<Entity> =
  | string
  | string[]
  | number
  | number[]
  | Date
  | Date[]
  | ObjectID
  | ObjectID[]
  | FindOptionsWhere<Entity>;

export abstract class AbstractRepository<
  Entity extends ObjectLiteral,
  Filter extends object = Record<string, unknown>,
  Joinable extends string = '',
  JoinVariables extends object = Record<string, unknown>,
  Lockable extends string = '',
  Sortable extends string = '',
> extends Repository<Entity> {
  protected _filterBuild(
    _query: SelectQueryBuilder<Entity>, 
    _filter: Filter
  ) {
    throw new Error('Not implemented');
  }

  protected _joinBuild(
    _query: SelectQueryBuilder<Entity>,
    _tables: Joinable[],
    _type: JoinType,
    _variables?: JoinVariables
  ) {
    throw new Error('Not implemented');
  }

  protected _sortBuild(
    _query: SelectQueryBuilder<Entity>,
    _sort: ISort<Sortable>[]
  ) {
    throw new Error('Not implemented');
  }

  protected _commonBuild(
    options: IBaseRepositoryGetOne<Filter, Joinable, JoinVariables, Lockable>,
    alias?: string
  ) {
    const query = this.createQueryBuilder(
      alias ? alias : this.metadata.tableName,
      options.queryRunner
    );

    if (options.filter) {
      this._filterBuild(query, options.filter);
    }

    if (options.join?.inner) {
      this._joinBuild(
        query,
        options.join.inner,
        'inner',
        options.join.variables
      );
    }

    if (options.join?.left) {
      this._joinBuild(query, options.join.left, 'left', options.join.variables);
    }

    if (options.queryRunner && options.lock) {
      const tables = Array.isArray(options.lock)
        ? options.lock
        : [this.metadata.tableName];
      query.setLock('pessimistic_write', undefined, tables);
    }

    if (options.cache && !(options.queryRunner || options.lock)) {
      query.cache(options.cache);
    }

    return query;
  }

  protected _manyBuild(
    query: SelectQueryBuilder<Entity>,
    options: IBaseRepositoryGetMany<
    Filter,
    Joinable,
    JoinVariables,
    Lockable,
    Sortable
    >
  ) {
    if (options.pagination) {
      query.take(options.pagination.take).skip(options.pagination.skip);
    }

    if (options.sort) {
      this._sortBuild(query, options.sort);
    }
  }

  private _queryParamsAssign(query: string, params: any[]) {
    params.forEach((value, i) => {
      const index = `$${(i + 1)}`;

      if (typeof value === 'string') {
        query = query.replace(index, `"${value}"`);
      }

      if (typeof value === 'object') {
        if (Array.isArray(value)) {
          query = query.replace(
            index,
            value
              .map((element) =>
                typeof element === 'string' ? `"${element}"` : element
              )
              .join(',')
          );
        } else {
          query = query.replace(index, value);
        }
      }

      // FIXME
      if (['number', 'boolean'].includes(typeof value)) {
        query = query.replace(index, value.toString());
      }
    });

    return query;
  }

  async getOne(
    options: IBaseRepositoryGetOne<
    Filter,
    Joinable,
    JoinVariables,
    Lockable
    > = {}
  ) {
    const query = this._commonBuild(options);
    query.take(1);

    return query.getOne();
  }

  async getMany(
    options: IBaseRepositoryGetMany<
    Filter,
    Joinable,
    JoinVariables,
    Lockable,
    Sortable
    > = {}
  ) {
    const query = this._commonBuild(options);
    this._manyBuild(query, options);

    return query.getMany();
  }

  async getManyAndCount(
    options: IBaseRepositoryGetMany<
    Filter,
    Joinable,
    JoinVariables,
    Lockable,
    Sortable
    > = {}
  ) {
    const query = this._commonBuild(options);
    this._manyBuild(query, options);

    return query.getManyAndCount();
  }

  override async findOne(
    params: FindOneOptions<Entity>
  ): Promise<Entity | null> {
    if (params?.cache && (params?.queryRunner || params?.lock)) {
      delete params.cache;
    }

    if (params?.queryRunner) {
      const data = await params.queryRunner.manager.findOne(
        this.metadata.target,
        params
      );

      return data;
    } else {
      const data = await super.findOne(params);

      return data;
    }
  }

  override async find(options?: FindManyOptions<Entity>): Promise<Entity[]> {
    if (options?.cache && (options?.queryRunner || options?.lock)) {
      delete options.cache;
    }

    if (options?.queryRunner) {
      const data = await options.queryRunner.manager.find(
        this.metadata.target,
        options
      );

      return data;
    }

    const data = await super.find(options);

    return data;
  }

  async _save<T extends DeepPartial<Entity>>(
    entity: T,
    options?: SaveOptions
  ): Promise<T> {
    if (options?.queryRunner) {
      const data = await options.queryRunner.manager.save(entity, options);

      return data;
    }

    const data = await super.save(entity, options);

    return data;
  }

  override async save<T extends DeepPartial<Entity>>(
    entity: T,
    options?: SaveOptions
  ): Promise<T> {
    const isEntity = Object.getPrototypeOf(entity) instanceof AbstractEntity;

    if (isEntity) {
      const entityUpdate = this.metadata.create();
      const columns: string[] = [];

      for (const column of this.metadata.columns) {
        columns.push(column.propertyName);
      }

      for (const property in entity) {
        if (columns.includes(property)) {
          entityUpdate[property] = entity[property];
        }
      }

      const entityUpdated = await this._save(<T>entityUpdate, options);

      for (const property in entityUpdated) {
        const value = entityUpdated[property];
        entity[property] = value;
      }

      return entityUpdated;
    }

    return this._save(entity, options);
  }

  override async update(
    criteria: FindOptionsWhere<Entity>,
    partialEntity: QueryDeepPartialEntity<Entity>,
    options?: UpdateOptions
  ): Promise<UpdateResult> {
    for (const property in partialEntity) {
      const value = partialEntity[property];

      if (typeof value === 'undefined') {
        delete partialEntity[property];
      }
    }

    if (options?.queryRunner) {
      const data = await options.queryRunner.manager.update(
        this.metadata.target,
        criteria,
        partialEntity
      );

      return data;
    }

    const data = await super.update(criteria, partialEntity);

    return data;
  }

  override remove(entities: Entity[], options?: RemoveOptions): Promise<Entity[]>;
  override remove(entity: Entity, options?: RemoveOptions): Promise<Entity>;
  override async remove(entity: Entity | Entity[], options?: RemoveOptions): Promise<Entity | Entity[]> {
    if (!Array.isArray(entity)) {
      entity = [entity];
    }

    if (options?.queryRunner) {
      const data = await options.queryRunner.manager.remove(
        this.metadata.target,
        entity,
        options
      );

      return data;
    }

    const data = await super.remove(entity, options);

    return data;
  }

  override async delete(
    criteria: conditions<Entity>,
    options?: DeleteOptions
  ): Promise<DeleteResult> {
    if (options?.queryRunner) {
      const data = await options.queryRunner.manager.delete(
        this.metadata.target,
        criteria
      );

      return data;
    }

    const data = await super.delete(criteria);

    return data;
  }

  async updateFrom(
    data: QueryDeepPartialEntity<Entity>,
    options: IBaseRepositoryGetOne<
    Filter,
    Joinable,
    JoinVariables,
    Lockable
    > = {}
  ) {
    const selectQuery = this._commonBuild(
      options,
      `${this.metadata.tableName}_filtered`
    );

    const updateQuery = this.createQueryBuilder(this.metadata.tableName).update(
      this.metadata.tableName,
      data
    );

    const [primaryColumn] = this.metadata.primaryColumns;
    const primaryColumnName = primaryColumn?.databaseName;
    
    if (!primaryColumnName)
      throw new ReferenceError('primaryColumnName not set');

    selectQuery.andWhere(
      `${selectQuery.alias}.${primaryColumnName} = ${updateQuery.alias}.${primaryColumnName}`
    );

    const [selectQuerySql, selectQueryParams] =
      selectQuery.getQueryAndParameters();

    const selectQuerySqlWithParams = this._queryParamsAssign(
      selectQuerySql,
      selectQueryParams
    );

    const updateQuerySqlFrom = selectQuerySqlWithParams.substring(
      selectQuerySqlWithParams.indexOf('FROM')
    );

    const [updateQuerySql, updateQueryParams] =
      updateQuery.getQueryAndParameters();

    const updateQuerySqlWithParams = this._queryParamsAssign(
      updateQuerySql,
      updateQueryParams
    );

    const query = updateQuerySqlWithParams + ' ' + updateQuerySqlFrom;

    if (options.queryRunner) {
      return options.queryRunner.query(query);
    }

    return this.query(query);
  }
}
