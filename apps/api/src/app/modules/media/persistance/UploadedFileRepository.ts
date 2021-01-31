import { UploadedFile } from 'express-fileupload';
import { AbstractFsMediaRepository } from './AbstractFsMediaRepository';

export class UploadedFileRepository extends AbstractFsMediaRepository<UploadedFile> {
  createFile(mediaFile: UploadedFile, name?: string): Promise<string> {
    const path = `${this.uploadDir}/${name || mediaFile.name}`;
    return mediaFile.mv(path).then(() => path);
  }
}
