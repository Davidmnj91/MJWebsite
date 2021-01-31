import { Client, ClientProps } from '@mj-website/api-interfaces';
import * as Faker from 'faker';
import { ClientRepository } from '../../domain/ClientRepository';
import { ClientValidator } from '../../domain/ClientValidator';
import { FakeClientRepository } from '../../persistance/FakeClientRepository';
import { ClientService } from '../../services/ClientService';
import { AddClientUseCase } from './AddClientUseCase';

let clientService: ClientService;
let useCase: AddClientUseCase;

describe('AddClientUseCase', () => {
  beforeEach(() => {
    const fakeClientRepo: ClientRepository = new FakeClientRepository();
    const clientValidator: ClientValidator = new ClientValidator();

    clientService = new ClientService(fakeClientRepo);
    useCase = new AddClientUseCase(clientService, clientValidator);
  });

  it('Should be able to add client use case', async () => {
    let errorOccurred = false;

    const client: ClientProps = {
      name: Faker.name.firstName(),
      description: Faker.name.lastName(),
    };
    try {
      let collection = await clientService.getAll();
      expect(collection.getValue().length).toEqual(0);

      const result = await useCase.execute(client);

      expect(result.isRight).toBeTruthy();

      collection = await clientService.getAll();
      expect(collection.getValue().length).toEqual(1);

      const addedClient = <Client>result.value.getValue();
      const found = await clientService.findById(addedClient.id);
      expect(found.getValue()).toEqual(addedClient);
    } catch (err) {
      errorOccurred = true;
    }

    expect(errorOccurred).toBeFalsy();
  });
});
