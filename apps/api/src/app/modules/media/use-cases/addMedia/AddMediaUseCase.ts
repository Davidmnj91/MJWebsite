import { Media } from '@mj-website/api-interfaces';
import { Either, left, Result, right } from '@mj-website/monads';
import { UploadedFile } from 'express-fileupload';
import { UseCase } from '../../../../core/infra/UseCase';
import { MediaService } from '../../../media/services/MediaService';
import { MediaErrors } from '../../domain/MediaErrors';

export type AddMediaCommand = UploadedFile | UploadedFile[];

export type AddMediaResponse = Either<Result<MediaErrors>, Result<Media>>;

export class AddMediaUseCase implements UseCase<AddMediaCommand, AddMediaResponse> {
  private readonly mediaService: MediaService;

  constructor(mediaService: MediaService) {
    this.mediaService = mediaService;
  }

  async execute(command: AddMediaCommand): Promise<AddMediaResponse> {
    const media = command;

    const coverFile = media as UploadedFile;
    const addedMedia = await this.mediaService.saveFile(coverFile);
    if (addedMedia.isFailure) {
      return left(MediaErrors.createSaveMediaError(addedMedia.error));
    }

    return right(addedMedia);
  }
}
