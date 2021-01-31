import { Client, PaginationResponse, PaginationResponseOf } from '@mj-website/api-interfaces';
import { IQuery, Pagination } from '@mj-website/criteria';
import { Either, left, Result, right } from '@mj-website/monads';
import { UseCase } from '../../../../core/infra/UseCase';
import { ClientErrors } from '../../domain/ClientErrors';
import { ClientService } from '../../services/ClientService';

export type PageClientCommand = {
  query: IQuery<Client>;
  pagination: Pagination;
};
export type PageClientResponse = Either<Result<ClientErrors>, Result<PaginationResponse<Client>>>;

export class PageClientsUseCase implements UseCase<PageClientCommand, PageClientResponse> {
  private readonly clientService: ClientService;

  constructor(clientService: ClientService) {
    this.clientService = clientService;
  }

  async execute(command: PageClientCommand): Promise<PageClientResponse> {
    const { query, pagination } = command;

    const pagedClients = await this.clientService.getAllPaged(query, pagination);
    if (pagedClients.isFailure) {
      return left(ClientErrors.createFindClientError(pagedClients.error));
    }

    const response = pagedClients.map(([clients, size]) => PaginationResponseOf<Client>(clients, size, pagination));

    return right(response);
  }
}
