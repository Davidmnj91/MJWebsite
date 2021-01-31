import { MediaFile } from '@mj-website/api-interfaces';
import { BaseFakeRepo } from '../../../core/infra/BaseFakeRepo';
import { StorageMediaRepository } from '../domain/MediaStorageRepository';

export class FakeStorageMediaRepository extends BaseFakeRepo<MediaFile> implements StorageMediaRepository<MediaFile> {
  compareFakeItems(a: MediaFile, b: MediaFile): boolean {
    return a.name === b.name;
  }

  createFile(mediaFile: MediaFile, name?: string): Promise<string> {
    const { name: fileName, data } = mediaFile;
    this.addFakeItem({
      name: name || fileName,
      original_name: name || fileName,
      path: name,
      mimeType: name,
      type: 'PHOTO',
      data,
    });
    return Promise.resolve(name);
  }

  readFile(fullPath: string): Promise<Buffer> {
    const file = this._items.find((i) => i.name === fullPath);
    if (file) {
      return Promise.resolve(Buffer.from(file.data));
    } else {
      return Promise.reject(`Cannot found item with id ${fullPath}`);
    }
  }

  deleteFile(fullPath: string): Promise<void> {
    const found = this._items.findIndex((i) => i.name === fullPath);
    if (found < 0) {
      return Promise.reject(`Cannot found item with id ${fullPath}`);
    }

    this._items.splice(found, 1);
    return Promise.resolve();
  }
}
