import { Category, CategoryProps } from '@mj-website/api-interfaces';
import { IQuery, Pagination } from '@mj-website/criteria';
import { Result } from '@mj-website/monads';
import { CategoryRepository } from '../domain/CategoryRepository';

export class CategoryService {
  constructor(private _repository: CategoryRepository) {}

  async add(category: CategoryProps): Promise<Result<Category>> {
    try {
      const addedCategory = await this._repository.save(category);
      return Result.ok(addedCategory);
    } catch (e) {
      return Result.fail(e);
    }
  }

  async findById(id: string): Promise<Result<Category>> {
    try {
      const foundCategory = await this._repository.findOne(id);
      return Result.ok(foundCategory);
    } catch (e) {
      return Result.fail(e);
    }
  }

  async getAll(query?: IQuery<Category>): Promise<Result<Category[]>> {
    try {
      const foundCategories = await this._repository.getAll(query);
      return Result.ok(foundCategories);
    } catch (e) {
      return Result.fail(e);
    }
  }

  async getAllPaged(query?: IQuery<Category>, pagination?: Pagination): Promise<Result<[Array<Category>, number]>> {
    try {
      const foundCategories = await this._repository.getAllPaged(query, pagination);

      return Result.ok(foundCategories);
    } catch (e) {
      return Result.fail(e);
    }
  }

  async edit(id: string, category: CategoryProps): Promise<Result<Category>> {
    try {
      const updatedCategory = await this._repository.edit(id, category);
      return Result.ok(updatedCategory);
    } catch (e) {
      return Result.fail(e);
    }
  }

  async deleteById(id: string): Promise<Result<boolean>> {
    try {
      const deletedCategory = await this._repository.deleteById(id);
      return Result.ok(deletedCategory);
    } catch (e) {
      return Result.fail(e);
    }
  }
}
