import { Filter, IQuery, Pagination, SortedProps } from '@mj-website/criteria';
import { QueryResolver } from './QueryResolver';

export type ArrayQueryResolverResult<E> = {
  where: (e: E) => boolean;
  sort: (e1: E, e2: E) => number;
  filter: (e: E, i: number) => boolean;
};

export class ArraySqlQueryResolver<Entity> implements QueryResolver<Entity, ArrayQueryResolverResult<Entity>> {
  resolve(query?: IQuery<Entity>, pagination?: Pagination) {
    const result: ArrayQueryResolverResult<Entity> = {
      where: (e) => true,
      sort: (e1, e2) => null,
      filter: (e, i) => true,
    };

    if (!query) return result;

    const { filter, sort } = query;

    if (filter) {
      result.where = this.buildFilter(filter);
    }

    if (sort) {
      result.sort = this.buildSort(sort);
    }

    if (pagination) {
      const { page, count } = pagination;
      const offset = (page - 1) * count;

      result.filter = (_, i) => i >= offset && i < offset + count;
    }

    return result;
  }

  private buildFilter(filter: Filter): (e: Entity) => boolean {
    switch (filter.type) {
      case 'AND_FILTER':
        return filter.filters.reduce(
          (acc, f) => acc && this.buildFilter(f),
          (e) => true
        );
      case 'OR_FILTER':
        return filter.filters.reduce(
          (acc, f) => acc || this.buildFilter(f),
          (e) => true
        );
      case 'NOT_FILTER':
        return (e) => !this.buildFilter(filter.filter);
      case 'NULL_FILTER':
        return (e: Entity) => e[filter.key] === null;
      case 'NOT_NULL_FILTER':
        return (e: Entity) => e[filter.key] !== null;
      case 'EQUALS_FILTER':
        return (e: Entity) => e[filter.key] === filter.value;
      case 'NOT_EQUALS_FILTER':
        return (e: Entity) => e[filter.key] !== filter.value;
      case 'LIKE_FILTER':
        return (e: Entity) => `${e[filter.key]}`.includes(`${filter.value}`);
      case 'IN_FILTER':
        return (e: Entity) => filter.value.some((v) => v === e[filter.key]);
      case 'GREATER_THAN_FILTER':
        return (e: Entity) => e[filter.key] > filter.value;
      case 'GREATER_EQUAL_FILTER':
        return (e: Entity) => e[filter.key] >= filter.value;
      case 'LESS_THAN_FILTER':
        return (e: Entity) => e[filter.key] < filter.value;
      case 'LESS_EQUAL_FILTER':
        return (e: Entity) => e[filter.key] <= filter.value;
      case 'BETWEEN_FILTER':
        return (e: Entity) => e[filter.key] >= filter.minValue && e[filter.key] < filter.maxValue;
      default:
        throw new Error(`Unknown filter type: ${filter}`);
    }
  }

  private buildSort(sort: SortedProps<Entity>): (e1: Entity, e2: Entity) => number {
    return Object.keys(sort).reduce(
      (acc, k) => {
        const sortFn = (e1: Entity, e2: Entity) => (sort[k] === 'ASC' ? e1[k] - e2[k] : e2[k] - e1[k]);
        acc = acc || sortFn;
        return acc;
      },
      (e1: Entity, e2: Entity) => null
    );
  }
}
