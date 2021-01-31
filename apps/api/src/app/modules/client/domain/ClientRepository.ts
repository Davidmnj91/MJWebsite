import { Client, ClientProps, PropType } from '@mj-website/api-interfaces';
import { IQuery, Pagination } from '@mj-website/criteria';

export interface ClientRepository {
  save(client: ClientProps): Promise<Client>;
  findOne(id: string): Promise<Client>;
  getAll(query: IQuery<Client>): Promise<Client[]>;
  getAllPaged(query: IQuery<Client>, pagination: Pagination): Promise<[Client[], number]>;
  edit(id: PropType<Client, 'id'>, client: ClientProps): Promise<Client>;
  deleteById(id: string): Promise<boolean>;
}
