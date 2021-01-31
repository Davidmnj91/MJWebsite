import { Client, PropType } from '@mj-website/api-interfaces';
import { Either, left, Result, right } from '@mj-website/monads';
import { UseCase } from '../../../../core/infra/UseCase';
import { ClientErrors } from '../../domain/ClientErrors';
import { ClientService } from '../../services/ClientService';

export type RetrieveClientByIdCommand = PropType<Client, 'id'>;

export type RetrieveClientByIdResponse = Either<Result<ClientErrors>, Result<Client>>;

export class RetrieveClientByIdUseCase implements UseCase<RetrieveClientByIdCommand, RetrieveClientByIdResponse> {
  private readonly clientService: ClientService;

  constructor(clientService: ClientService) {
    this.clientService = clientService;
  }

  async execute(command: RetrieveClientByIdCommand): Promise<RetrieveClientByIdResponse> {
    const id = command;

    const retrievedClient = await this.clientService.findById(id);
    if (retrievedClient.isFailure) {
      return left(ClientErrors.createFindClientError(retrievedClient.error));
    }

    return right(retrievedClient);
  }
}
