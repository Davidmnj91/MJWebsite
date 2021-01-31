import { Client, ClientProps, UpdateRequest } from '@mj-website/api-interfaces';
import { Either, left, Result, right } from '@mj-website/monads';
import { UseCase } from '../../../../core/infra/UseCase';
import { ClientErrors } from '../../domain/ClientErrors';
import { clientValidator } from '../../domain/ClientValidator';
import { ClientService } from '../../services/ClientService';

export type EditClientCommand = UpdateRequest<ClientProps>;

export type EditClientResponse = Either<Result<ClientErrors>, Result<Client>>;

export class EditClientUseCase implements UseCase<EditClientCommand, EditClientResponse> {
  private readonly clientService: ClientService;

  constructor(clientService: ClientService) {
    this.clientService = clientService;
  }

  async execute(command: EditClientCommand): Promise<EditClientResponse> {
    const { id, update } = command;
    const validClient = await clientValidator.validate(update);

    if (validClient.isFailure) {
      return left(ClientErrors.createInvalidClientError(validClient.getValue()));
    }

    const editedClient = await this.clientService.edit(id, update);
    if (editedClient.isFailure) {
      return left(ClientErrors.createEditClientError(editedClient.error));
    }

    return right(editedClient);
  }
}
