import { Category, CategoryProps } from '@mj-website/api-interfaces';
import { ArraySqlQueryResolver, IQuery, Pagination } from '@mj-website/criteria';
import { Result } from '@mj-website/monads';
import * as Faker from 'faker';
import { BaseFakeRepo } from '../../../core/infra/BaseFakeRepo';
import { CategoryRepository } from '../domain/CategoryRepository';

export class FakeCategoryRepository extends BaseFakeRepo<Category> implements CategoryRepository {
  compareFakeItems(a: Category, b: Category): boolean {
    return a.id === b.id;
  }

  save(category: CategoryProps): Promise<Category> {
    const toAddCategory: Category = {
      id: Faker.random.uuid(),
      created_at: new Date(),
      updated_at: new Date(),
      ...category,
    };
    this.addFakeItem(toAddCategory);

    return Promise.resolve(toAddCategory);
  }

  findOne(id: string): Promise<Category> {
    const found = this._items.find((i) => i.id === id);
    if (found) {
      return Promise.resolve(found);
    } else {
      return Promise.reject(`Cannot found item with id ${id}`);
    }
  }

  getAll(query?: IQuery<Category>): Promise<Category[]> {
    const queryPredicate = new ArraySqlQueryResolver<Category>().resolve(query);
    const queriedItems = this._items
      .filter((c) => queryPredicate.where(c))
      .sort((c1, c2) => queryPredicate.sort(c1, c2));

    return Promise.resolve(queriedItems);
  }

  getAllPaged(query?: IQuery<Category>, pagination?: Pagination): Promise<[Array<Category>, number]> {
    const start = ((pagination.page || 1) - 1) * (pagination.count || 5);
    const end = start + (pagination.count || 5);
    const queryPredicate = new ArraySqlQueryResolver<Category>().resolve(query);
    const queriedItems = this._items
      .filter((c) => queryPredicate.where(c))
      .sort((c1, c2) => queryPredicate.sort(c1, c2));

    const paginatedRecords = queriedItems.slice(start, end);

    return Promise.resolve([paginatedRecords, queriedItems.length]);
  }

  edit(id: string, category: CategoryProps): Promise<Category> {
    const found = this._items.findIndex((i) => i.id === id);
    if (found < 0) {
      return Promise.reject(Result.fail(`Cannot found item with id ${id}`));
    }
    this._items[found] = { ...this._items[found], ...category };
    return Promise.resolve(this._items[found]);
  }

  deleteById(id: string): Promise<boolean> {
    const found = this._items.findIndex((i) => i.id === id);
    if (found < 0) {
      return Promise.reject(`Cannot found item with id ${id}`);
    }

    this._items.splice(found, 1);
    return Promise.resolve(true);
  }
}
