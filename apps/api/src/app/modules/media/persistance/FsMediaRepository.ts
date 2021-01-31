import { MediaFile } from '@mj-website/api-interfaces';
import { promises } from 'fs';
import { AbstractFsMediaRepository } from './AbstractFsMediaRepository';

export class FsMediaRepository extends AbstractFsMediaRepository<MediaFile> {
  createFile(mediaFile: MediaFile, name?: string): Promise<string> {
    const { name: fileName, data } = mediaFile;
    const path = `${this.uploadDir}/${name || fileName}`;
    return promises.writeFile(path, data).then(() => path);
  }
}
