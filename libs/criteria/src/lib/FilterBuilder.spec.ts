import { FilterBuilder } from './FilterBuilder';
import {
  AndFilter,
  BetweenFilter,
  EqualsFilter,
  GreaterOrEqualFilter,
  GreaterThanFilter,
  InFilter,
  LessOrEqualFilter,
  LessThanFilter,
  LikeFilter,
  NotEqualsFilter,
  NotFilter,
  NotNullFilter,
  NullFilter,
  OrFilter,
} from './Filters';

type Model = {
  name: string;
  age: number;
  birthDate: Date;
};

describe('Filter builder', () => {
  it('should create null filter', () => {
    const expected: NullFilter<Model, 'name'> = { type: 'NULL_FILTER', key: 'name' };

    const filter = FilterBuilder.Builder<Model>().IsNull('name');

    expect(filter).toEqual(expected);
  });
  it('should create not null filter', () => {
    const expected: NotNullFilter<Model, 'name'> = { type: 'NOT_NULL_FILTER', key: 'name' };

    const filter = FilterBuilder.Builder<Model>().IsNotNull('name');

    expect(filter).toEqual(expected);
  });
  it('should create equals filter', () => {
    const expected: EqualsFilter<Model, 'name'> = { type: 'EQUALS_FILTER', key: 'name', value: 'aValue' };

    const filter = FilterBuilder.Builder<Model>().Equals('name', 'aValue');

    expect(filter).toEqual(expected);
  });
  it('should create not equals filter', () => {
    const expected: NotEqualsFilter<Model, 'name'> = { type: 'NOT_EQUALS_FILTER', key: 'name', value: 'aValue' };

    const filter = FilterBuilder.Builder<Model>().NotEquals('name', 'aValue');

    expect(filter).toEqual(expected);
  });
  it('should create like filter', () => {
    const expected: LikeFilter<Model, 'name'> = { type: 'LIKE_FILTER', key: 'name', value: 'aValue' };

    const filter = FilterBuilder.Builder<Model>().Like('name', 'aValue');

    expect(filter).toEqual(expected);
  });
  it('should create in filter', () => {
    const expected: InFilter<Model, 'name'> = { type: 'IN_FILTER', key: 'name', value: ['aValue', 'anotherValue'] };

    const filter = FilterBuilder.Builder<Model>().In('name', ['aValue', 'anotherValue']);

    expect(filter).toEqual(expected);
  });
  it('should create greater than filter', () => {
    const expected: GreaterThanFilter<Model, 'age'> = { type: 'GREATER_THAN_FILTER', key: 'age', value: 15 };

    const filter = FilterBuilder.Builder<Model>().Greater('age', 15);

    expect(filter).toEqual(expected);
  });
  it('should create greater or equals filter', () => {
    const expected: GreaterOrEqualFilter<Model, 'age'> = { type: 'GREATER_EQUAL_FILTER', key: 'age', value: 15 };

    const filter = FilterBuilder.Builder<Model>().GreaterEqual('age', 15);

    expect(filter).toEqual(expected);
  });
  it('should create less than filter', () => {
    const expected: LessThanFilter<Model, 'age'> = { type: 'LESS_THAN_FILTER', key: 'age', value: 15 };

    const filter = FilterBuilder.Builder<Model>().Less('age', 15);

    expect(filter).toEqual(expected);
  });
  it('should create less or equals filter', () => {
    const expected: LessOrEqualFilter<Model, 'age'> = { type: 'LESS_EQUAL_FILTER', key: 'age', value: 15 };

    const filter = FilterBuilder.Builder<Model>().LessEqual('age', 15);

    expect(filter).toEqual(expected);
  });
  it('should create between filter', () => {
    const expected: BetweenFilter<Model, 'age'> = { type: 'BETWEEN_FILTER', key: 'age', minValue: 15, maxValue: 20 };

    const filter = FilterBuilder.Builder<Model>().Between('age', 15, 20);

    expect(filter).toEqual(expected);
  });
  it('should create not filter', () => {
    const expected: NotFilter = { type: 'NOT_FILTER', filter: { type: 'LIKE_FILTER', key: 'name', value: 'aValue' } };

    const filter = FilterBuilder.Builder<Model>().Not((fb) => fb.Like('name', 'aValue'));

    expect(filter).toEqual(expected);
  });
  it('should create and filter', () => {
    const expected: AndFilter = {
      type: 'AND_FILTER',
      filters: [{ type: 'LIKE_FILTER', key: 'name', value: 'aValue' }],
    };

    const filter = FilterBuilder.Builder<Model>().AndFilter((fb) => fb.Like('name', 'aValue'));

    expect(filter).toEqual(expected);
  });
  it('should create or filter', () => {
    const expected: OrFilter = {
      type: 'OR_FILTER',
      filters: [{ type: 'LIKE_FILTER', key: 'name', value: 'aValue' }],
    };

    const filter = FilterBuilder.Builder<Model>().OrFilter((fb) => fb.Like('name', 'aValue'));

    expect(filter).toEqual(expected);
  });
  it('should create or filter', () => {
    const expected: OrFilter = {
      type: 'OR_FILTER',
      filters: [{ type: 'LIKE_FILTER', key: 'name', value: 'aValue' }],
    };

    const filter = FilterBuilder.Builder<Model>().OrFilter((fb) => fb.Like('name', 'aValue'));

    expect(filter).toEqual(expected);
  });
  it('should create complex filter', () => {
    const expected: OrFilter = {
      type: 'OR_FILTER',
      filters: [
        {
          type: 'AND_FILTER',
          filters: [
            { type: 'EQUALS_FILTER', key: 'age', value: 13 },
            {
              type: 'OR_FILTER',
              filters: [
                { type: 'BETWEEN_FILTER', key: 'age', minValue: 15, maxValue: 20 },
                { type: 'AND_FILTER', filters: [{ type: 'NOT_EQUALS_FILTER', key: 'name', value: 'aValue' }] },
              ],
            },
          ],
        },
        { type: 'LIKE_FILTER', key: 'name', value: 'aValue' },
      ],
    };

    const filter = FilterBuilder.Builder<Model>().OrFilter((fb) => [
      fb.AndFilter((f) => [
        f.Equals('age', 13),
        f.OrFilter((g) => [g.Between('age', 15, 20), g.AndFilter((l) => [l.NotEquals('name', 'aValue')])]),
      ]),
      fb.Like('name', 'aValue'),
    ]);

    expect(filter).toEqual(expected);
  });
});
