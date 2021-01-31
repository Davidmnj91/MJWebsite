import { Media, UpdateRequest } from '@mj-website/api-interfaces';
import { Either, left, Result, right } from '@mj-website/monads';
import { UploadedFile } from 'express-fileupload';
import { UseCase } from '../../../../core/infra/UseCase';
import { MediaErrors } from '../../domain/MediaErrors';
import { MediaService } from '../../services/MediaService';

export type EditMediaCommand = UpdateRequest<UploadedFile | UploadedFile[]>;

export type EditMediaResponse = Either<Result<MediaErrors>, Result<Media>>;

export class EditMediaUseCase implements UseCase<EditMediaCommand, EditMediaResponse> {
  private readonly mediaService: MediaService;

  constructor(mediaService: MediaService) {
    this.mediaService = mediaService;
  }

  async execute(command: EditMediaCommand): Promise<EditMediaResponse> {
    const { id, update } = command;

    const editedMedia = await this.mediaService.saveFile(update as UploadedFile);
    if (editedMedia.isFailure) {
      return left(MediaErrors.createEditMediaError(editedMedia.error));
    }

    return right(editedMedia);
  }
}
