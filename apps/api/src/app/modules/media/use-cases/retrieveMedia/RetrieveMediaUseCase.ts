import { Media } from '@mj-website/api-interfaces';
import { IQuery } from '@mj-website/criteria';
import { Either, left, Result, right } from '@mj-website/monads';
import { UseCase } from '../../../../core/infra/UseCase';
import { MediaErrors } from '../../domain/MediaErrors';
import { MediaPersistenceService } from '../../services/MediaPersistenceService';

export type RetrieveMediaCommand = IQuery<Media>;

export type RetrieveMediaResponse = Either<Result<MediaErrors>, Result<Array<Media>>>;

export class RetrieveMediaUseCase implements UseCase<RetrieveMediaCommand, RetrieveMediaResponse> {
  private readonly mediaService: MediaPersistenceService;

  constructor(mediaService: MediaPersistenceService) {
    this.mediaService = mediaService;
  }

  async execute(command: RetrieveMediaCommand): Promise<RetrieveMediaResponse> {
    const query = command;

    const retrievedMedia = await this.mediaService.getAll(query);
    if (retrievedMedia.isFailure) {
      return left(MediaErrors.createFindMediaError(retrievedMedia.error));
    }

    return right(retrievedMedia);
  }
}
