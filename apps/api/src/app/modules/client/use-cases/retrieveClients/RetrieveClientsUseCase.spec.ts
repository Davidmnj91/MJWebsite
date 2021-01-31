import { Client, ClientProps } from '@mj-website/api-interfaces';
import * as Faker from 'faker';
import { ClientRepository } from '../../domain/ClientRepository';
import { FakeClientRepository } from '../../persistance/FakeClientRepository';
import { ClientService } from '../../services/ClientService';
import { RetrieveClientsCommand, RetrieveClientsUseCase } from './RetrieveClientsUseCase';

let clientService: ClientService;
let useCase: RetrieveClientsUseCase;

describe('RetrieveClientsUseCase', () => {
  beforeEach(() => {
    const fakeClientRepo: ClientRepository = new FakeClientRepository();

    clientService = new ClientService(fakeClientRepo);
    useCase = new RetrieveClientsUseCase(clientService);
  });

  it('Should be able to retrieve clients', async () => {
    let errorOccurred = false;

    const clients: ClientProps[] = [...Array(100)].map((_) => ({
      name: Faker.name.firstName(),
      description: Faker.name.lastName(),
    }));

    try {
      const addedClients = await Promise.all(clients.map((c) => clientService.add(c)));

      expect(addedClients.every((r) => r.isSuccess)).toBeTruthy();

      const command: RetrieveClientsCommand = undefined;

      const result = await useCase.execute(command);

      expect(result.isRight).toBeTruthy();

      const retrievedClients = <Client[]>result.value.getValue();

      expect(retrievedClients.length).toEqual(100);
    } catch (err) {
      errorOccurred = true;
    }

    expect(errorOccurred).toBeFalsy();
  });
});
