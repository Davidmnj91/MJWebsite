import { Client, ClientProps } from '@mj-website/api-interfaces';
import * as Faker from 'faker';
import { ClientRepository } from '../../domain/ClientRepository';
import { ClientValidator } from '../../domain/ClientValidator';
import { FakeClientRepository } from '../../persistance/FakeClientRepository';
import { ClientService } from '../../services/ClientService';
import { EditClientUseCase } from './EditClientUseCase';

let clientService: ClientService;
let useCase: EditClientUseCase;

describe('EditClientUseCase', () => {
  beforeEach(() => {
    const fakeClientRepo: ClientRepository = new FakeClientRepository();
    const clientValidator: ClientValidator = new ClientValidator();

    clientService = new ClientService(fakeClientRepo);
    useCase = new EditClientUseCase(clientService, clientValidator);
  });

  it('Should be able to edit client', async () => {
    let errorOccurred = false;

    const client: ClientProps = {
      name: Faker.name.firstName(),
      description: Faker.name.lastName(),
    };

    const modifyClient: ClientProps = {
      name: Faker.name.firstName(),
      description: Faker.name.lastName(),
    };

    try {
      const addedClientResult = await clientService.add(client);
      expect(addedClientResult.isSuccess).toBeTruthy();

      const result = await useCase.execute({ id: addedClientResult.getValue().id, update: modifyClient });

      expect(result.isRight).toBeTruthy();

      const collection = await clientService.getAll();
      expect(collection.getValue().length).toEqual(1);

      const modifiedClient = <Client>result.value.getValue();
      expect(modifiedClient).toEqual({ ...(<Client>addedClientResult.getValue()), ...modifyClient });
    } catch (err) {
      errorOccurred = true;
    }

    expect(errorOccurred).toBeFalsy();
  });
});
