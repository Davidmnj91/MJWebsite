import { Client, ClientProps } from '@mj-website/api-interfaces';
import { Either, left, Result, right } from '@mj-website/monads';
import { UseCase } from '../../../../core/infra/UseCase';
import { ClientErrors } from '../../domain/ClientErrors';
import { clientValidator } from '../../domain/ClientValidator';
import { ClientService } from '../../services/ClientService';

export type AddClientCommand = ClientProps;

export type AddClientResponse = Either<Result<ClientErrors>, Result<Client>>;

export class AddClientUseCase implements UseCase<AddClientCommand, AddClientResponse> {
  private readonly clientService: ClientService;

  constructor(clientService: ClientService) {
    this.clientService = clientService;
  }

  async execute(command: AddClientCommand): Promise<AddClientResponse> {
    const client = command;
    const validClient = await clientValidator.validate(client);

    if (validClient.isFailure) {
      return left(ClientErrors.createInvalidClientError(validClient.getValue()));
    }

    const addedClient = await this.clientService.add(client);
    if (addedClient.isFailure) {
      return left(ClientErrors.createAddClientError(addedClient.error));
    }

    return right(addedClient);
  }
}
