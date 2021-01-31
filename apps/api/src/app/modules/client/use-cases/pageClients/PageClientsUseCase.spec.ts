import { Client, ClientProps, PaginationResponse } from '@mj-website/api-interfaces';
import * as Faker from 'faker';
import { ClientRepository } from '../../domain/ClientRepository';
import { FakeClientRepository } from '../../persistance/FakeClientRepository';
import { ClientService } from '../../services/ClientService';
import { PageClientCommand, PageClientsUseCase } from './PageClientsUseCase';

let clientService: ClientService;
let useCase: PageClientsUseCase;

describe('PageClientsUseCase', () => {
  beforeEach(() => {
    const fakeClientRepo: ClientRepository = new FakeClientRepository();

    clientService = new ClientService(fakeClientRepo);
    useCase = new PageClientsUseCase(clientService);
  });

  it('Should be able to page clients', async () => {
    let errorOccurred = false;

    const clients: ClientProps[] = [...Array(100)].map((_) => ({
      name: Faker.name.firstName(),
      description: Faker.name.lastName(),
    }));

    try {
      const addedClients = await Promise.all(clients.map((c) => clientService.add(c)));

      expect(addedClients.every((r) => r.isSuccess)).toBeTruthy();

      const command: PageClientCommand = {
        query: undefined,
        pagination: { count: 20, page: 2 },
      };

      const result = await useCase.execute(command);

      expect(result.isRight).toBeTruthy();

      const pagedClients = <PaginationResponse<Client>>result.value.getValue();

      expect(pagedClients.records.length).toEqual(20);
      expect(pagedClients.total).toEqual(100);
      expect(pagedClients.page).toEqual(2);
      expect(pagedClients.count).toEqual(20);
    } catch (err) {
      errorOccurred = true;
    }

    expect(errorOccurred).toBeFalsy();
  });
});
