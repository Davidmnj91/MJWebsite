import { Client, ClientProps } from '@mj-website/api-interfaces';
import * as Faker from 'faker';
import { ClientRepository } from '../../domain/ClientRepository';
import { FakeClientRepository } from '../../persistance/FakeClientRepository';
import { ClientService } from '../../services/ClientService';
import { RetrieveClientByIdUseCase } from './RetrieveClientByIdUseCase';

let clientService: ClientService;
let useCase: RetrieveClientByIdUseCase;

describe('RetrieveClientByIdUseCase', () => {
  beforeEach(() => {
    const fakeClientRepo: ClientRepository = new FakeClientRepository();

    clientService = new ClientService(fakeClientRepo);
    useCase = new RetrieveClientByIdUseCase(clientService);
  });

  it('Should be able to find client by id', async () => {
    let errorOccurred = false;

    const client: ClientProps = {
      name: Faker.name.firstName(),
      description: Faker.name.lastName(),
    };
    try {
      const addedClientResult = await clientService.add(client);
      expect(addedClientResult.isSuccess).toBeTruthy();

      const result = await useCase.execute(addedClientResult.getValue().id);

      expect(result.isRight).toBeTruthy();

      const collection = await clientService.getAll();
      expect(collection.getValue().length).toEqual(1);

      const addedClient = <Client>result.value.getValue();
      expect(addedClientResult.getValue()).toEqual(addedClient);
    } catch (err) {
      errorOccurred = true;
    }

    expect(errorOccurred).toBeFalsy();
  });
});
