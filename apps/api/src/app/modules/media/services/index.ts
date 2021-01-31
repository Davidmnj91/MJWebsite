import { mediaRepository, storageMediaRepository } from '../persistance';
import { MediaPersistenceService } from './MediaPersistenceService';
import { MediaService } from './MediaService';
import { StorageMediaService } from './StorageMediaService';

const mediaService = new MediaService(mediaRepository, storageMediaRepository);
const mediaPersistenceService = new MediaPersistenceService(mediaRepository);
const storageMediaService = new StorageMediaService(storageMediaRepository);

export { mediaService, mediaPersistenceService, storageMediaService };
