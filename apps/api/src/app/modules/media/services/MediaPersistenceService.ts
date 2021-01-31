import { Media, MediaProps } from '@mj-website/api-interfaces';
import { IQuery, Pagination } from '@mj-website/criteria';
import { Result } from '@mj-website/monads';
import { MediaRepository } from '../domain/MediaRepository';

export class MediaPersistenceService {
  constructor(private _repository: MediaRepository) {}

  async add(media: MediaProps): Promise<Result<Media>> {
    try {
      const addedMedia = await this._repository.save(media);
      return Result.ok(addedMedia);
    } catch (e) {
      return Result.fail(e);
    }
  }

  async findById(id: string): Promise<Result<Media>> {
    try {
      const foundMedia = await this._repository.findOne(id);
      return Result.ok(foundMedia);
    } catch (e) {
      return Result.fail(e);
    }
  }

  async getAll(query?: IQuery<Media>): Promise<Result<Media[]>> {
    try {
      const foundMedia = await this._repository.getAll(query);
      return Result.ok(foundMedia);
    } catch (e) {
      return Result.fail(e);
    }
  }

  async getAllPaged(query?: IQuery<Media>, pagination?: Pagination): Promise<Result<[Array<Media>, number]>> {
    try {
      const foundMedia = await this._repository.getAllPaged(query, pagination);

      return Result.ok(foundMedia);
    } catch (e) {
      return Result.fail(e);
    }
  }

  async edit(id: string, media: MediaProps): Promise<Result<Media>> {
    try {
      const updatedMedia = await this._repository.edit(id, media);
      return Result.ok(updatedMedia);
    } catch (e) {
      return Result.fail(e);
    }
  }

  async deleteById(id: string): Promise<Result<boolean>> {
    try {
      const deletedMedia = await this._repository.deleteById(id);
      return Result.ok(deletedMedia);
    } catch (e) {
      return Result.fail(e);
    }
  }
}
