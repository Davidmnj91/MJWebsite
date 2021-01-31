import { ClientProps } from '@mj-website/api-interfaces';
import * as Faker from 'faker';
import { ClientRepository } from '../../domain/ClientRepository';
import { FakeClientRepository } from '../../persistance/FakeClientRepository';
import { ClientService } from '../../services/ClientService';
import { DeleteClientUseCase } from './DeleteClientUseCase';

let clientService: ClientService;
let useCase: DeleteClientUseCase;

describe('DeleteClientUseCase', () => {
  beforeEach(() => {
    const fakeClientRepo: ClientRepository = new FakeClientRepository();

    clientService = new ClientService(fakeClientRepo);
    useCase = new DeleteClientUseCase(clientService);
  });

  it('Should be able to delete client', async () => {
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
      expect(collection.getValue().length).toEqual(0);

      const removedClient = <boolean>result.value.getValue();
      expect(removedClient).toBeTruthy();
    } catch (err) {
      errorOccurred = true;
    }

    expect(errorOccurred).toBeFalsy();
  });
});
