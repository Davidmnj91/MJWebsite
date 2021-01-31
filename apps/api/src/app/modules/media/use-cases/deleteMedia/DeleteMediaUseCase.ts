import { Media, PropType } from '@mj-website/api-interfaces';
import { Either, left, Result, right } from '@mj-website/monads';
import { UseCase } from '../../../../core/infra/UseCase';
import { MediaService } from '../../../media/services/MediaService';
import { MediaErrors } from '../../domain/MediaErrors';

export type DeleteMediaCommand = PropType<Media, 'id'>;

export type DeleteMediaResponse = Either<Result<MediaErrors>, Result<boolean>>;

export class DeleteMediaUseCase implements UseCase<DeleteMediaCommand, DeleteMediaResponse> {
  private readonly mediaService: MediaService;

  constructor(mediaService: MediaService) {
    this.mediaService = mediaService;
  }

  async execute(command: DeleteMediaCommand): Promise<DeleteMediaResponse> {
    const id = command;

    const deletedMedia = await this.mediaService.deleteFile(id);
    if (deletedMedia.isFailure) {
      return left(MediaErrors.createDeleteMediaError(deletedMedia.error));
    }

    return right(Result.ok(true));
  }
}
