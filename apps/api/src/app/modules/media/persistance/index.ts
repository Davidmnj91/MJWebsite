import { getConnection } from 'typeorm';
import { PgMediaRepository } from './PgMediaRepository';
import { UploadedFileRepository } from './UploadedFileRepository';

const mediaRepository = getConnection().getCustomRepository(PgMediaRepository);
const storageMediaRepository = new UploadedFileRepository();

export { mediaRepository, storageMediaRepository };
