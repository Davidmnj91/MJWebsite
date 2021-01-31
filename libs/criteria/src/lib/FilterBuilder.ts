import {
  AndFilter,
  BetweenFilter,
  Equals,
  EqualsFilter,
  Filter,
  GreaterOrEqualFilter,
  GreaterThan,
  GreaterThanFilter,
  In,
  InFilter,
  isNotNull,
  isNull,
  KeysMatching,
  LessOrEqualFilter,
  LessThanFilter,
  Like,
  LikeFilter,
  NegateFilter,
  NotEquals,
  NotEqualsFilter,
  NotFilter,
  NotNullFilter,
  NullFilter,
  OrFilter,
} from './Filters';
import { coerceArray } from './utils';

export class FilterBuilder<E> {
  static Builder<E>() {
    return new FilterBuilder<E>();
  }

  public AndFilter(builder: (fb: FilterBuilder<E>) => Filter | Filter[]): Filter {
    return AndFilter(...coerceArray(builder(this)));
  }

  public OrFilter(builder: (fb: FilterBuilder<E>) => Filter | Filter[]): Filter {
    return OrFilter(...coerceArray(builder(this)));
  }

  public Not(builder: (fb: FilterBuilder<E>) => NegateFilter): NotFilter {
    return NotFilter(builder(this));
  }

  public IsNull<T extends keyof E>(key: T): NullFilter<E, T> {
    return isNull(key);
  }

  public IsNotNull<T extends keyof E>(key: T): NotNullFilter<E, T> {
    return isNotNull(key);
  }

  public Equals<T extends keyof E>(key: T, value: E[T]): EqualsFilter<E, T> {
    return Equals(key, value);
  }

  public NotEquals<T extends keyof E>(key: T, value: E[T]): NotEqualsFilter<E, T> {
    return NotEquals(key, value);
  }
  public Like<T extends keyof E>(key: T, value: E[T]): LikeFilter<E, T> {
    return Like(key, value);
  }
  public In<T extends keyof E>(key: T, value: E[T][]): InFilter<E, T> {
    return In(key, value);
  }
  public Greater<T extends keyof E>(key: T & KeysMatching<E, number | Date>, value: E[T]): GreaterThanFilter<E, T> {
    return GreaterThan(key, value);
  }
  public GreaterEqual<T extends keyof E>(
    key: T & KeysMatching<E, number | Date>,
    value: E[T]
  ): GreaterOrEqualFilter<E, T> {
    return GreaterOrEqualFilter(key, value);
  }
  public Less<T extends keyof E>(key: T & KeysMatching<E, number | Date>, value: E[T]): LessThanFilter<E, T> {
    return LessThanFilter(key, value);
  }
  public LessEqual<T extends keyof E>(key: T & KeysMatching<E, number | Date>, value: E[T]): LessOrEqualFilter<E, T> {
    return LessOrEqualFilter(key, value);
  }
  public Between<T extends keyof E>(
    key: T & KeysMatching<E, number | Date>,
    minValue: E[T],
    maxValue: E[T]
  ): BetweenFilter<E, T> {
    return BetweenFilter(key, minValue, maxValue);
  }
}
