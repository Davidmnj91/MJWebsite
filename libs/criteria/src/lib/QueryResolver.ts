import { IQuery, Pagination } from '@mj-website/criteria';

export interface QueryResolver<Entity, Result> {
  resolve(query?: IQuery<Entity>, pagination?: Pagination): Result;
}
