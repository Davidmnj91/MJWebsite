import { ClientProps } from '@mj-website/api-interfaces';
import * as Faker from 'faker';
import { FakeClientRepository } from '../persistance/FakeClientRepository';
import { ClientService } from './ClientService';

describe('Client Repository Test', () => {
  const clientRepository = new FakeClientRepository();
  const clientService = new ClientService(clientRepository);

  beforeEach(() => {
    clientRepository.clear();
  });

  it('should be able to add client', async () => {
    let errorOccurred = false;

    const clientProps: ClientProps = {
      name: Faker.name.firstName(),
      description: Faker.name.lastName(),
    };

    try {
      const addedClientResult = await clientService.add(clientProps);
      const addedClient = addedClientResult.getValue();

      expect(addedClientResult.isSuccess).toBeTruthy();
      expect(addedClient).toEqual({ ...addedClient, ...clientProps });
    } catch (err) {
      errorOccurred = true;
    }

    expect(errorOccurred).toBeFalsy();
  });

  it('should be able to edit client', async () => {
    let errorOccurred = false;

    const clientProps: ClientProps = {
      name: Faker.name.firstName(),
      description: Faker.name.lastName(),
    };

    const modifyClient: ClientProps = {
      name: Faker.name.firstName(),
      description: Faker.name.lastName(),
    };

    try {
      const addedClientResult = await clientService.add(clientProps);
      const addedClient = addedClientResult.getValue();

      expect(addedClientResult.isSuccess).toBeTruthy();
      expect(addedClient).toEqual({ ...addedClient, ...clientProps });

      const editedClientResult = await clientService.edit(addedClient.id, modifyClient);
      const editedClient = editedClientResult.getValue();

      expect(editedClientResult.isSuccess).toBeTruthy();
      expect(editedClient).toEqual({ ...editedClient, ...modifyClient });
    } catch (err) {
      errorOccurred = true;
    }

    expect(errorOccurred).toBeFalsy();
  });

  it('should be able to edit client', async () => {
    let errorOccurred = false;

    const clientProps: ClientProps = {
      name: Faker.name.firstName(),
      description: Faker.name.lastName(),
    };

    const modifyClient: ClientProps = {
      name: Faker.name.firstName(),
      description: Faker.name.lastName(),
    };

    try {
      const addedClientResult = await clientService.add(clientProps);
      const addedClient = addedClientResult.getValue();

      expect(addedClientResult.isSuccess).toBeTruthy();
      expect(addedClient).toEqual({ ...addedClient, ...clientProps });

      const deletedClientResult = await clientService.edit(addedClient.id, modifyClient);
      const deletedClient = deletedClientResult.getValue();

      expect(deletedClientResult.isSuccess).toBeTruthy();
      expect(deletedClient).toBeTruthy();
    } catch (err) {
      errorOccurred = true;
    }

    expect(errorOccurred).toBeFalsy();
  });

  it('should be able to retrieve client by id', async () => {
    let errorOccurred = false;

    const clientProps: ClientProps = {
      name: Faker.name.firstName(),
      description: Faker.name.lastName(),
    };

    try {
      const addedClientResult = await clientService.add(clientProps);
      const addedClient = addedClientResult.getValue();

      expect(addedClientResult.isSuccess).toBeTruthy();
      expect(addedClient).toEqual({ ...addedClient, ...clientProps });

      const retrievedClientResult = await clientService.findById(addedClient.id);
      const retrievedClient = retrievedClientResult.getValue();

      expect(retrievedClientResult.isSuccess).toBeTruthy();
      expect(retrievedClient).toEqual(addedClient);
    } catch (err) {
      errorOccurred = true;
    }

    expect(errorOccurred).toBeFalsy();
  });

  it('should be able to get clients', async () => {
    let errorOccurred = false;

    const clients: ClientProps[] = [...Array(10)].map((_) => ({
      name: Faker.name.firstName(),
      description: Faker.name.lastName(),
    }));

    try {
      const addedClients = await Promise.all(clients.map((c) => clientService.add(c)));

      expect(addedClients.every((r) => r.isSuccess)).toBeTruthy();

      const retrievedClientsResult = await clientService.getAll();
      const retrievedClients = retrievedClientsResult.getValue();

      expect(retrievedClientsResult.isSuccess).toBeTruthy();
      expect(retrievedClients.length).toEqual(clients.length);
    } catch (err) {
      errorOccurred = true;
    }

    expect(errorOccurred).toBeFalsy();
  });
});
