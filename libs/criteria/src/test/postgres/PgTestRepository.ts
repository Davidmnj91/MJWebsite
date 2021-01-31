import { IQuery, Pagination, TypeOrmQueryResolver } from '@mj-website/criteria';
import { Result } from '@mj-website/monads';
import { EntityRepository, Repository } from 'typeorm';
import { TestEntity, TestProps } from './TestEntity';
import { TestRepository } from './TestRepository';

@EntityRepository(TestEntity)
export class PgTestRepository extends Repository<TestEntity> implements TestRepository {
  async add(test: TestProps): Promise<Result<TestEntity>> {
    try {
      const addedTest = await this.save(test);
      return Result.ok(addedTest);
    } catch (e) {
      return Result.fail(e);
    }
  }

  async findById(id: string): Promise<Result<TestEntity>> {
    try {
      const foundTest = await this.findOne(id);
      return Result.ok(foundTest);
    } catch (e) {
      return Result.fail(e);
    }
  }

  async getAll(query: IQuery<TestProps>): Promise<Result<TestEntity[]>> {
    try {
      const qb = this.createQueryBuilder();
      const foundTests = await new TypeOrmQueryResolver<TestEntity>(qb).resolve(query).getMany();

      return Result.ok(foundTests);
    } catch (e) {
      return Result.fail(e);
    }
  }

  async getAllPaged(query: IQuery<TestProps>, pagination: Pagination): Promise<Result<[Array<TestEntity>, number]>> {
    try {
      const qb = this.createQueryBuilder();
      const foundTests = await new TypeOrmQueryResolver<TestEntity>(qb).resolve(query, pagination).getManyAndCount();

      return Result.ok(foundTests);
    } catch (e) {
      return Result.fail(e);
    }
  }

  async edit(id: string, test: TestProps): Promise<Result<TestEntity>> {
    try {
      const updatedTest = await this.save({ id, ...test });
      return Result.ok(updatedTest);
    } catch (e) {
      return Result.fail(e);
    }
  }

  async deleteById(id: string): Promise<Result<boolean>> {
    try {
      const deletedTest = await this.delete(id);
      return Result.ok(deletedTest.raw);
    } catch (e) {
      return Result.fail(e);
    }
  }
}
