import { Category, CategoryProps, PropType } from '@mj-website/api-interfaces';
import { IQuery, Pagination } from '@mj-website/criteria';

export interface CategoryRepository {
  save(category: CategoryProps): Promise<Category>;
  findOne(id: string): Promise<Category>;
  getAll(query: IQuery<Category>): Promise<Category[]>;
  getAllPaged(query: IQuery<Category>, pagination: Pagination): Promise<[Category[], number]>;
  edit(id: PropType<Category, 'id'>, category: CategoryProps): Promise<Category>;
  deleteById(id: string): Promise<boolean>;
}
