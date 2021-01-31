import { IQuery, Pagination } from '@mj-website/criteria';
import { Result } from '@mj-website/monads';
import { Test, TestEntity, TestProps } from './TestEntity';

export interface TestRepository {
  add(Test: TestProps): Promise<Result<TestEntity>>;
  findById(id: string): Promise<Result<TestEntity>>;
  getAll(query: IQuery<Test>): Promise<Result<Array<TestEntity>>>;
  getAllPaged(query: IQuery<Test>, pagination: Pagination): Promise<Result<[Array<TestEntity>, number]>>;
  edit(id: string, Test: TestProps): Promise<Result<TestEntity>>;
  deleteById(id: string): Promise<Result<boolean>>;
}
