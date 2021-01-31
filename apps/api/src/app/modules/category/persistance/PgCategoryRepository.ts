import { Category, CategoryProps } from '@mj-website/api-interfaces';
import { QueryableRepository } from '@mj-website/criteria';
import { EntityRepository } from 'typeorm';
import { CategoryEntity } from '../domain/CategoryEntity';
import { CategoryRepository } from '../domain/CategoryRepository';

@EntityRepository(CategoryEntity)
export class PgCategoryRepository extends QueryableRepository<CategoryEntity> implements CategoryRepository {
  async edit(id: string, category: CategoryProps): Promise<Category> {
    return this.update(id, category).then((result) => result.raw[0]);
  }

  async deleteById(id: string): Promise<boolean> {
    return this.delete(id).then((result) => result.raw);
  }
}
