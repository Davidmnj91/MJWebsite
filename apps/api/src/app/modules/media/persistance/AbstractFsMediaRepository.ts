import { existsSync, mkdirSync, promises } from 'fs';
import { StorageMediaRepository } from '../domain/MediaStorageRepository';

export abstract class AbstractFsMediaRepository<M> implements StorageMediaRepository<M> {
  protected uploadDir = process.env.MEDIA_PATH;

  constructor() {
    if (!existsSync(this.uploadDir)) {
      mkdirSync(this.uploadDir);
    }
  }

  abstract createFile(mediaFile: M, name?: string): Promise<string>;

  readFile(fullPath: string): Promise<Buffer> {
    return promises.readFile(fullPath);
  }
  deleteFile(fullPath: string): Promise<void> {
    return promises.unlink(fullPath);
  }
}
