import { Client, ClientProps } from '@mj-website/api-interfaces';
import { QueryableRepository } from '@mj-website/criteria';
import { EntityRepository } from 'typeorm';
import { ClientEntity } from '../domain/ClientEntity';
import { ClientRepository } from '../domain/ClientRepository';

@EntityRepository(ClientEntity)
export class PgClientRepository extends QueryableRepository<ClientEntity> implements ClientRepository {
  async edit(id: string, client: ClientProps): Promise<Client> {
    return this.update(id, client).then((result) => result.raw[0]);
  }

  async deleteById(id: string): Promise<boolean> {
    return this.delete(id).then((result) => result.raw);
  }
}
