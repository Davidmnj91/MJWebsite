import { Filter, FilterBuilder } from '@mj-website/criteria';
import * as Faker from 'faker';
import { getConnection } from 'typeorm';
import { PgTestRepository } from './PgTestRepository';
import connection from './TestDatabase';
import { TestEntity, TestProps } from './TestEntity';

describe('PostgreTypeOrm', () => {
  beforeAll(async () => {
    await connection.create();
  });

  afterAll(async () => {
    await connection.clear();
    await connection.close();
  });

  beforeEach(async () => {
    await connection.clear();
  });

  it('removes an entity', async () => {
    const testProps: TestProps = {
      name: Faker.name.firstName(),
      age: Faker.random.number(),
      description: Faker.name.lastName(),
    };

    const testRepo = getConnection().getCustomRepository(PgTestRepository);

    const result = await testRepo.add(testProps);

    expect(result.isSuccess).toBeTruthy();

    const addedTest = result.getValue();
    const deleted = await testRepo.deleteById(addedTest.id);
    expect(deleted.isSuccess).toBeTruthy();

    const stored = await testRepo.count();
    expect(stored).toEqual(0);
  });

  it('creates an entity', async () => {
    const testProps: TestProps = {
      name: Faker.name.firstName(),
      age: Faker.random.number(),
      description: Faker.name.lastName(),
    };

    const testRepo = getConnection().getCustomRepository(PgTestRepository);

    const result = await testRepo.add(testProps);

    expect(result.isSuccess).toBeTruthy();

    const stored = await testRepo.count();
    expect(stored).toEqual(1);
  });

  it('edits an entity', async () => {
    const testProps: TestProps = {
      name: Faker.name.firstName(),
      age: Faker.random.number(),
      description: Faker.name.lastName(),
    };

    const testToEdit: TestProps = {
      name: Faker.name.firstName(),
      age: Faker.random.number(),
      description: Faker.name.lastName(),
    };

    const testRepo = getConnection().getCustomRepository(PgTestRepository);

    const result = await testRepo.add(testProps);

    expect(result.isSuccess).toBeTruthy();

    const addedTest = result.getValue();
    const edited = await testRepo.edit(addedTest.id, testToEdit);
    expect(edited.isSuccess).toBeTruthy();

    const editedResult = edited.getValue();
    expect(editedResult.id).toEqual(addedTest.id);
    expect(editedResult.name).toEqual(testToEdit.name);
  });

  it('finds an entity by id', async () => {
    const testProps: TestProps = {
      name: Faker.name.firstName(),
      age: Faker.random.number(),
      description: Faker.name.lastName(),
    };

    const testRepo = getConnection().getCustomRepository(PgTestRepository);

    const result = await testRepo.add(testProps);

    expect(result.isSuccess).toBeTruthy();

    const addedTest = result.getValue();

    const foundById = await testRepo.findById(addedTest.id);
    expect(foundById.isSuccess).toBeTruthy();
    expect(foundById.getValue()).toEqual(addedTest);
  });
});

describe('finds an entity by criteria', () => {
  beforeAll(async (done) => {
    await connection.create();
    done();
  });

  afterAll(async () => {
    await connection.clear();
    await connection.close();
  });

  it('Should run queries', async () => {
    const testProps: TestProps[] = [...Array(10)].map((_, i) => ({
      name: `${i} - ${Faker.name.firstName()}`,
      description: Faker.name.lastName(),
      age: i * i,
    }));

    const testRepo = getConnection().getCustomRepository(PgTestRepository);
    const addedTests = await Promise.all(testProps.map((c) => testRepo.add(c)));

    const tests = addedTests.map((t) => t.getValue());
    const cases: { filter: Filter; expected: TestEntity[] }[] = [
      {
        filter: FilterBuilder.Builder<TestEntity>().Equals('name', tests[0].name),
        expected: [tests[0]],
      },
      {
        filter: FilterBuilder.Builder<TestEntity>().NotEquals('name', tests[0].name),
        expected: tests.slice(1, 10),
      },
      {
        filter: FilterBuilder.Builder<TestEntity>().Not((fb) => fb.Like('name', tests[0].name.substr(0, 4))),
        expected: tests.slice(1, 10),
      },
      {
        filter: FilterBuilder.Builder<TestEntity>().In('description', [tests[0].description, tests[1].description]),
        expected: [tests[0], tests[1]],
      },
      {
        filter: FilterBuilder.Builder<TestEntity>().Greater('age', tests[8].age),
        expected: [tests[9]],
      },
      {
        filter: FilterBuilder.Builder<TestEntity>().GreaterEqual('age', tests[8].age),
        expected: [tests[8], tests[9]],
      },
      {
        filter: FilterBuilder.Builder<TestEntity>().Less('age', tests[8].age),
        expected: tests.slice(0, 8),
      },
      {
        filter: FilterBuilder.Builder<TestEntity>().LessEqual('age', tests[8].age),
        expected: tests.slice(0, 9),
      },
      {
        filter: FilterBuilder.Builder<TestEntity>().Between('age', tests[5].age, tests[8].age),
        expected: tests.slice(5, 9),
      },
      {
        filter: FilterBuilder.Builder<TestEntity>().Not((fb) => fb.Between('age', tests[0].age, tests[3].age)),
        expected: tests.slice(4, 10),
      },
    ];

    for (const c of cases) {
      const eqRetrieved = await testRepo.getAll({ filter: c.filter });
      expect(eqRetrieved.isSuccess).toBeTruthy();
      const values = eqRetrieved
        .getValue()
        .map((t) => t.id)
        .sort((s1, s2) => s1.localeCompare(s2));
      const expectedValues = c.expected.map((t) => t.id).sort((s1, s2) => s1.localeCompare(s2));
      expect({ msg: `failed ${JSON.stringify(c.filter)}`, value: values }).toEqual({
        msg: `failed ${JSON.stringify(c.filter)}`,
        value: expectedValues,
      });
    }
  });
});
