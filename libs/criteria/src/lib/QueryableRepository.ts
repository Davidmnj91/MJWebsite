import { Repository } from 'typeorm';
import { IQuery } from './IQuery';
import { Pagination } from './Pagination';
import { TypeOrmQueryResolver } from './TypeOrmQueryResolver';

export class QueryableRepository<Entity> extends Repository<Entity> {
  async getAll(query: IQuery<Entity>): Promise<Entity[]> {
    const qb = this.createQueryBuilder();
    return new TypeOrmQueryResolver<Entity>(qb).resolve(query).getMany();
  }

  async getAllPaged(query: IQuery<Entity>, pagination: Pagination): Promise<[Array<Entity>, number]> {
    const qb = this.createQueryBuilder();
    return new TypeOrmQueryResolver<Entity>(qb).resolve(query, pagination).getManyAndCount();
  }
}
