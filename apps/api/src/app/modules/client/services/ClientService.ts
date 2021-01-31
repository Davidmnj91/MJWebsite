import { Client, ClientProps } from '@mj-website/api-interfaces';
import { IQuery, Pagination } from '@mj-website/criteria';
import { Result } from '@mj-website/monads';
import { ClientRepository } from '../domain/ClientRepository';

export class ClientService {
  constructor(private _repository: ClientRepository) {}

  async add(client: ClientProps): Promise<Result<Client>> {
    try {
      const addedClient = await this._repository.save(client);
      return Result.ok(addedClient);
    } catch (e) {
      return Result.fail(e);
    }
  }

  async findById(id: string): Promise<Result<Client>> {
    try {
      const foundClient = await this._repository.findOne(id);
      return Result.ok(foundClient);
    } catch (e) {
      return Result.fail(e);
    }
  }

  async getAll(query?: IQuery<Client>): Promise<Result<Client[]>> {
    try {
      const foundClients = await this._repository.getAll(query);
      return Result.ok(foundClients);
    } catch (e) {
      return Result.fail(e);
    }
  }

  async getAllPaged(query?: IQuery<Client>, pagination?: Pagination): Promise<Result<[Array<Client>, number]>> {
    try {
      const foundClients = await this._repository.getAllPaged(query, pagination);

      return Result.ok(foundClients);
    } catch (e) {
      return Result.fail(e);
    }
  }

  async edit(id: string, client: ClientProps): Promise<Result<Client>> {
    try {
      const updatedClient = await this._repository.edit(id, client);
      return Result.ok(updatedClient);
    } catch (e) {
      return Result.fail(e);
    }
  }

  async deleteById(id: string): Promise<Result<boolean>> {
    try {
      const deletedClient = await this._repository.deleteById(id);
      return Result.ok(deletedClient);
    } catch (e) {
      return Result.fail(e);
    }
  }
}
