import { Result } from '@mj-website/monads';
import { StorageMediaRepository } from '../domain/MediaStorageRepository';

export class StorageMediaService<T> {
  constructor(private _repository: StorageMediaRepository<T>) {}

  async createFile(mediaFile: T, name?: string): Promise<Result<void>> {
    try {
      await this._repository.createFile(mediaFile, name);
      return Result.ok();
    } catch (e) {
      return Result.fail(e);
    }
  }

  async readFile(fullPath: string): Promise<Result<Buffer>> {
    try {
      const fileData = await this._repository.readFile(fullPath);
      return Result.ok(fileData);
    } catch (e) {
      return Result.fail(e);
    }
  }

  async deleteFile(fullPath: string): Promise<Result<void>> {
    try {
      await this._repository.deleteFile(fullPath);
      return Result.ok();
    } catch (e) {
      return Result.fail(e);
    }
  }
}
