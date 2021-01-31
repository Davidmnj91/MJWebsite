import { Media, PaginationResponse, PaginationResponseOf } from '@mj-website/api-interfaces';
import { IQuery, Pagination } from '@mj-website/criteria';
import { Either, left, Result, right } from '@mj-website/monads';
import { UseCase } from '../../../../core/infra/UseCase';
import { MediaErrors } from '../../domain/MediaErrors';
import { MediaPersistenceService } from '../../services/MediaPersistenceService';

export type PageMediaCommand = {
  query: IQuery<Media>;
  pagination: Pagination;
};
export type PageMediaResponse = Either<Result<MediaErrors>, Result<PaginationResponse<Media>>>;

export class PageMediaUseCase implements UseCase<PageMediaCommand, PageMediaResponse> {
  private readonly mediaService: MediaPersistenceService;

  constructor(mediaService: MediaPersistenceService) {
    this.mediaService = mediaService;
  }

  async execute(command: PageMediaCommand): Promise<PageMediaResponse> {
    const { query, pagination } = command;

    const pagedMedia = await this.mediaService.getAllPaged(query, pagination);
    if (pagedMedia.isFailure) {
      return left(MediaErrors.createFindMediaError(pagedMedia.error));
    }

    const response = pagedMedia.map(([media, size]) => PaginationResponseOf<Media>(media, size, pagination));

    return right(response);
  }
}
