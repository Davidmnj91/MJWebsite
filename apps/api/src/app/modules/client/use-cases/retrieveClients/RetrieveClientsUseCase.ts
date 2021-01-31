import { Client } from '@mj-website/api-interfaces';
import { IQuery } from '@mj-website/criteria';
import { Either, left, Result, right } from '@mj-website/monads';
import { UseCase } from '../../../../core/infra/UseCase';
import { ClientErrors } from '../../domain/ClientErrors';
import { ClientService } from '../../services/ClientService';

export type RetrieveClientsCommand = IQuery<Client>;

export type RetrieveClientsResponse = Either<Result<ClientErrors>, Result<Array<Client>>>;

export class RetrieveClientsUseCase implements UseCase<RetrieveClientsCommand, RetrieveClientsResponse> {
  private readonly clientService: ClientService;

  constructor(clientService: ClientService) {
    this.clientService = clientService;
  }

  async execute(command: RetrieveClientsCommand): Promise<RetrieveClientsResponse> {
    const query = command;

    const retrievedClients = await this.clientService.getAll(query);
    if (retrievedClients.isFailure) {
      return left(ClientErrors.createFindClientError(retrievedClients.error));
    }

    return right(retrievedClients);
  }
}
