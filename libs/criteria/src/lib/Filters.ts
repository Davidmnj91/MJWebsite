export type KeysMatching<E, TYPE> = { [K in keyof E]-?: E[K] extends TYPE ? K : never }[keyof E];

export type Filter = ConjunctionFilter | PropertyFilter;

export type ConjunctionFilter = AndFilter | OrFilter;

export type NegateFilter = LikeFilter<any, any> | InFilter<any, any> | BetweenFilter<any, any>;

export type PropertyFilter =
  | NotFilter
  | NullFilter<any, any>
  | NotNullFilter<any, any>
  | EqualsFilter<any, any>
  | NotEqualsFilter<any, any>
  | LikeFilter<any, any>
  | InFilter<any, any>
  | GreaterThanFilter<any, any>
  | GreaterOrEqualFilter<any, any>
  | LessThanFilter<any, any>
  | LessOrEqualFilter<any, any>
  | BetweenFilter<any, any>;

type UnionFilter = {
  filters: Filter[];
};

type KeyValueFilter<E, F extends keyof E> = {
  key: F;
  value: E[F];
};

export type AndFilter = {
  type: 'AND_FILTER';
} & UnionFilter;

export type OrFilter = {
  type: 'OR_FILTER';
} & UnionFilter;

export type NotFilter = {
  type: 'NOT_FILTER';
  filter: NegateFilter;
};

export type NullFilter<E, F extends keyof E> = {
  type: 'NULL_FILTER';
  key: F;
};

export type NotNullFilter<E, F extends keyof E> = {
  type: 'NOT_NULL_FILTER';
  key: F;
};

export type EqualsFilter<E, F extends keyof E> = {
  type: 'EQUALS_FILTER';
} & KeyValueFilter<E, F>;

export type NotEqualsFilter<E, F extends keyof E> = {
  type: 'NOT_EQUALS_FILTER';
} & KeyValueFilter<E, F>;

export type LikeFilter<E, F extends keyof E> = {
  type: 'LIKE_FILTER';
} & KeyValueFilter<E, F>;

export type InFilter<E, F extends keyof E> = {
  type: 'IN_FILTER';
  key: F;
  value: Array<E[F]>;
};

export type GreaterThanFilter<E, F extends keyof E> = {
  type: 'GREATER_THAN_FILTER';
  key: F & KeysMatching<E, number | Date>;
  value: E[F];
};

export type GreaterOrEqualFilter<E, F extends keyof E> = {
  type: 'GREATER_EQUAL_FILTER';
  key: F & KeysMatching<E, number | Date>;
  value: E[F];
};

export type LessThanFilter<E, F extends keyof E> = {
  type: 'LESS_THAN_FILTER';
  key: F & KeysMatching<E, number | Date>;
  value: E[F];
};

export type LessOrEqualFilter<E, F extends keyof E> = {
  type: 'LESS_EQUAL_FILTER';
  key: F & KeysMatching<E, number | Date>;
  value: E[F];
};

export type BetweenFilter<E, F extends keyof E> = {
  type: 'BETWEEN_FILTER';
  key: F & KeysMatching<E, number | Date>;
  minValue: E[F];
  maxValue: E[F];
};

export const AndFilter = (...subFilters: Filter[]): AndFilter => {
  return { type: 'AND_FILTER', filters: subFilters };
};

export const OrFilter = (...subFilters: Filter[]): OrFilter => {
  return { type: 'OR_FILTER', filters: subFilters };
};

export const NotFilter = (subFilter: NegateFilter): NotFilter => {
  return { type: 'NOT_FILTER', filter: subFilter };
};

export const isNull = <E, F extends keyof E>(key: F): NullFilter<E, F> => {
  return { type: 'NULL_FILTER', key };
};

export const isNotNull = <E, F extends keyof E>(key: F): NotNullFilter<E, F> => {
  return { type: 'NOT_NULL_FILTER', key };
};

export const Equals = <E, F extends keyof E>(key: F, value: E[F]): EqualsFilter<E, F> => {
  return { type: 'EQUALS_FILTER', key, value };
};

export const NotEquals = <E, F extends keyof E>(key: F, value: E[F]): NotEqualsFilter<E, F> => {
  return { type: 'NOT_EQUALS_FILTER', key, value };
};

export const Like = <E, F extends keyof E>(key: F, value: E[F]): LikeFilter<E, F> => {
  return { type: 'LIKE_FILTER', key, value };
};

export const In = <E, F extends keyof E>(key: F, value: Array<E[F]>): InFilter<E, F> => {
  return { type: 'IN_FILTER', key, value };
};

export const GreaterThan = <E, F extends keyof E>(
  key: F & KeysMatching<E, number | Date>,
  value: E[F]
): GreaterThanFilter<E, F> => {
  return { type: 'GREATER_THAN_FILTER', key, value };
};

export const GreaterOrEqualFilter = <E, F extends keyof E>(
  key: F & KeysMatching<E, number | Date>,
  value: E[F]
): GreaterOrEqualFilter<E, F> => {
  return { type: 'GREATER_EQUAL_FILTER', key, value };
};

export const LessThanFilter = <E, F extends keyof E>(
  key: F & KeysMatching<E, number | Date>,
  value: E[F]
): LessThanFilter<E, F> => {
  return { type: 'LESS_THAN_FILTER', key, value };
};

export const LessOrEqualFilter = <E, F extends keyof E>(
  key: F & KeysMatching<E, number | Date>,
  value: E[F]
): LessOrEqualFilter<E, F> => {
  return { type: 'LESS_EQUAL_FILTER', key, value };
};

export const BetweenFilter = <E, F extends keyof E>(
  key: F & KeysMatching<E, number | Date>,
  minValue: E[F],
  maxValue: E[F]
): BetweenFilter<E, F> => {
  return { type: 'BETWEEN_FILTER', key, minValue, maxValue };
};
