import { SelectQueryBuilder } from 'typeorm';
import { AndFilter, ConjunctionFilter, Filter } from './Filters';
import { IQuery } from './IQuery';
import { Pagination } from './Pagination';
import { QueryResolver } from './QueryResolver';

export class TypeOrmQueryResolver<Entity> implements QueryResolver<Entity, SelectQueryBuilder<Entity>> {
  private readonly qb: SelectQueryBuilder<Entity>;

  constructor(qb: SelectQueryBuilder<Entity>) {
    this.qb = qb;
  }

  resolve(query?: IQuery<Entity>, pagination?: Pagination): SelectQueryBuilder<Entity> {
    if (!query) return;

    if (query.filter) {
      const whereClause = new WhereBuilder<Entity>(this.qb, query.filter);
      whereClause.build();
    }

    if (query.sort) {
      this.qb.orderBy(query.sort);
    }

    if (pagination) {
      const { page, count } = pagination;
      const offset = (page - 1) * count;
      this.qb.skip(offset);
      this.qb.take(count);
    }

    return this.qb;
  }
}

type ParamValue = string | number | Date | Array<string | number | Date>;

export class WhereBuilder<Entity> {
  private params: Record<string, ParamValue> = {};
  private paramsCount = 0;

  constructor(private readonly qb: SelectQueryBuilder<Entity>, private filtersExpression: Filter) {}

  build() {
    const whereSql = this.buildExpressionRec(this.filtersExpression);
    this.qb.where(whereSql, this.params);
  }

  private buildExpressionRec(fe: Filter): string {
    const filter = this.coerceFilter(fe);
    const sqLExpr = this.buildQuerySegment(filter);

    return sqLExpr === '' ? '' : sqLExpr;
  }

  private buildQuerySegment(fe: ConjunctionFilter): string {
    const conjunctionType = fe.type === 'AND_FILTER' ? ' AND ' : ' OR ';
    return `(${fe.filters.map((f) => this.buildFilter(f)).join(conjunctionType)})`;
  }

  private buildFilter(filter: Filter, negate = false): string {
    if (filter.type === 'AND_FILTER' || filter.type === 'OR_FILTER') {
      return this.buildQuerySegment(filter);
    }
    if (filter.type === 'NOT_FILTER') {
      return this.buildFilter(filter.filter, true);
    }

    switch (filter.type) {
      case 'NULL_FILTER':
        return `${filter.key} IS NULL`;
      case 'NOT_NULL_FILTER':
        return `${filter.key} IS NOT NULL`;
      case 'EQUALS_FILTER': {
        const paramName = this.buildParamName(filter.key);
        this.params[paramName] = filter.value;
        return `${filter.key} = :${paramName}`;
      }
      case 'NOT_EQUALS_FILTER': {
        const paramName = this.buildParamName(filter.key);
        this.params[paramName] = filter.value;
        return `${filter.key} != :${paramName}`;
      }
      case 'LIKE_FILTER': {
        const paramName = this.buildParamName(filter.key);
        this.params[paramName] = `%${filter.value}%`;
        return `${filter.key}${negate ? ' NOT' : ''} LIKE :${paramName}`;
      }
      case 'IN_FILTER': {
        const paramName = this.buildParamName(filter.key);
        this.params[paramName] = filter.value;
        return `${filter.key}${negate ? ' NOT' : ''} IN (:...${paramName})`;
      }
      case 'GREATER_THAN_FILTER': {
        const paramName = this.buildParamName(filter.key);
        this.params[paramName] = filter.value;
        return `${filter.key} > :${paramName}`;
      }
      case 'GREATER_EQUAL_FILTER': {
        const paramName = this.buildParamName(filter.key);
        this.params[paramName] = filter.value;
        return `${filter.key} >= :${paramName}`;
      }
      case 'LESS_THAN_FILTER': {
        const paramName = this.buildParamName(filter.key);
        this.params[paramName] = filter.value;
        return `${filter.key} < :${paramName}`;
      }
      case 'LESS_EQUAL_FILTER': {
        const paramName = this.buildParamName(filter.key);
        this.params[paramName] = filter.value;
        return `${filter.key} <= :${paramName}`;
      }
      case 'BETWEEN_FILTER': {
        const minParam = this.buildParamName(filter.key);
        const maxParam = this.buildParamName(filter.key);
        this.params[minParam] = filter.minValue;
        this.params[maxParam] = filter.maxValue;
        return `${filter.key}${negate ? ' NOT' : ''} BETWEEN :${minParam} AND :${maxParam}`;
      }
      default:
        throw new Error(`Unknown filter operation: ${filter}`);
    }
  }

  private coerceFilter(filter: Filter): ConjunctionFilter {
    if (filter.type === 'AND_FILTER' || filter.type === 'OR_FILTER') {
      return filter;
    }
    return AndFilter(filter);
  }

  private buildParamName(name: string): string {
    return `${name}_${++this.paramsCount}`;
  }
}
