import { Media, MediaFile, MediaProps, PropType } from '@mj-website/api-interfaces';
import { Result } from '@mj-website/monads';
import { UploadedFile } from 'express-fileupload';
import { MediaRepository } from '../domain/MediaRepository';
import { StorageMediaRepository } from '../domain/MediaStorageRepository';
import { buildName } from '../utils';

export class MediaService {
  constructor(
    private _mediaRepository: MediaRepository,
    private _storageMediaRepository: StorageMediaRepository<UploadedFile>
  ) {}

  async saveFile(file: UploadedFile): Promise<Result<Media>> {
    const name = buildName(file);

    try {
      const path = await this._storageMediaRepository.createFile(file, name);

      const mediaProps: MediaProps = {
        name: name,
        path,
        original_name: file.name,
        mimeType: file.mimetype,
        type: 'PHOTO',
      };

      const persistedFile = await this._mediaRepository.save(mediaProps);

      return Result.ok(persistedFile);
    } catch (error) {
      await this._storageMediaRepository.deleteFile(file.tempFilePath);
      return Result.fail(error);
    }
  }

  async retrieveFile(id: PropType<Media, 'id'>): Promise<Result<MediaFile>> {
    try {
      const file = await this._mediaRepository.findOne(id);

      const data = await this._storageMediaRepository.readFile(file.path);

      const result: MediaFile = { ...file, data };

      return Result.ok(result);
    } catch (error) {
      return Result.fail(error);
    }
  }

  async deleteFile(id: PropType<Media, 'id'>): Promise<Result<void>> {
    try {
      const toRemoveFile = await this._mediaRepository.findOne(id);
      await this._mediaRepository.deleteById(id);

      await this._storageMediaRepository.deleteFile(toRemoveFile.name);

      return Result.ok();
    } catch (error) {
      Result.fail(error);
    }
  }
}
