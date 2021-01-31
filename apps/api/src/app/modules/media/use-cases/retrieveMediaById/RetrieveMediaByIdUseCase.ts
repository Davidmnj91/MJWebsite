import { Media, MediaFile, PropType } from '@mj-website/api-interfaces';
import { Either, left, Result, right } from '@mj-website/monads';
import { UseCase } from '../../../../core/infra/UseCase';
import { MediaErrors } from '../../domain/MediaErrors';
import { MediaService } from '../../services/MediaService';

export type RetrieveMediaByIdCommand = PropType<Media, 'id'>;

export type RetrieveMediaByIdResponse = Either<Result<MediaErrors>, Result<MediaFile>>;

export class RetrieveMediaByIdUseCase implements UseCase<RetrieveMediaByIdCommand, RetrieveMediaByIdResponse> {
  private readonly mediaService: MediaService;

  constructor(mediaService: MediaService) {
    this.mediaService = mediaService;
  }

  async execute(command: RetrieveMediaByIdCommand): Promise<RetrieveMediaByIdResponse> {
    const id = command;

    const retrievedMedia = await this.mediaService.retrieveFile(id);
    if (retrievedMedia.isFailure) {
      return left(MediaErrors.createFindMediaError(retrievedMedia.error));
    }

    return right(retrievedMedia);
  }
}
