import { Client, PropType } from '@mj-website/api-interfaces';
import { Either, left, Result, right } from '@mj-website/monads';
import { UseCase } from '../../../../core/infra/UseCase';
import { ClientErrors } from '../../domain/ClientErrors';
import { ClientService } from '../../services/ClientService';

export type DeleteClientCommand = PropType<Client, 'id'>;

export type DeleteClientResponse = Either<Result<ClientErrors>, Result<boolean>>;

export class DeleteClientUseCase implements UseCase<DeleteClientCommand, DeleteClientResponse> {
  private readonly clientService: ClientService;

  constructor(clientService: ClientService) {
    this.clientService = clientService;
  }

  async execute(command: DeleteClientCommand): Promise<DeleteClientResponse> {
    const id = command;

    const deletedClient = await this.clientService.deleteById(id);
    if (deletedClient.isFailure) {
      return left(ClientErrors.createDeleteClientError(deletedClient.error));
    }

    return right(deletedClient);
  }
}
