import { MediaProps } from '@mj-website/api-interfaces';
import * as Faker from 'faker';
import { FakeMediaRepository } from '../persistance/FakeMediaRepository';
import { MediaPersistenceService } from './MediaPersistenceService';

describe('Media Persistence Service Test', () => {
  const mediaRepository = new FakeMediaRepository();
  const mediaService = new MediaPersistenceService(mediaRepository);

  it('should be able to add media', async () => {
    let errorOccurred = false;

    const mediaProps: MediaProps = {
      type: 'PHOTO',
      name: Faker.name.firstName(),
      path: Faker.system.filePath(),
      mimeType: Faker.system.mimeType(),
    };

    try {
      const addedMediaResult = await mediaService.add(mediaProps);
      const addedMedia = addedMediaResult.getValue();

      expect(addedMediaResult.isSuccess).toBeTruthy();
      expect(addedMedia).toEqual({ ...addedMedia, ...mediaProps });
    } catch (err) {
      errorOccurred = true;
    }

    expect(errorOccurred).toBeFalsy();
  });

  it('should be able to retrieve media by id', async () => {
    let errorOccurred = false;

    const mediaProps: MediaProps = {
      type: 'PHOTO',
      name: Faker.name.firstName(),
      path: Faker.system.filePath(),
      mimeType: Faker.system.mimeType(),
    };

    try {
      const addedMediaResult = await mediaService.add(mediaProps);
      const addedMedia = addedMediaResult.getValue();

      expect(addedMediaResult.isSuccess).toBeTruthy();
      expect(addedMedia).toEqual({ ...addedMedia, ...mediaProps });

      const retrievedMediaResult = await mediaService.findById(addedMedia.id);
      const retrievedMedia = retrievedMediaResult.getValue();

      expect(retrievedMediaResult.isSuccess).toBeTruthy();
      expect(retrievedMedia).toEqual(addedMedia);
    } catch (err) {
      errorOccurred = true;
    }

    expect(errorOccurred).toBeFalsy();
  });

  it('should be able to edit media', async () => {
    let errorOccurred = false;

    const mediaProps: MediaProps = {
      type: 'PHOTO',
      name: Faker.name.firstName(),
      path: Faker.system.filePath(),
      mimeType: Faker.system.mimeType(),
    };

    const modifyMedia: MediaProps = {
      type: 'PHOTO',
      name: Faker.name.firstName(),
      path: Faker.system.filePath(),
      mimeType: Faker.system.mimeType(),
    };

    try {
      const addedMediaResult = await mediaService.add(mediaProps);
      const addedMedia = addedMediaResult.getValue();

      expect(addedMediaResult.isSuccess).toBeTruthy();
      expect(addedMedia).toEqual({ ...addedMedia, ...mediaProps });

      const editedMediaResult = await mediaService.edit(addedMedia.id, modifyMedia);
      const editedMedia = editedMediaResult.getValue();

      expect(editedMediaResult.isSuccess).toBeTruthy();
      expect(editedMedia).toEqual({ ...editedMedia, ...modifyMedia });
    } catch (err) {
      errorOccurred = true;
    }

    expect(errorOccurred).toBeFalsy();
  });

  it('should be able to delete media', async () => {
    let errorOccurred = false;

    const mediaProps: MediaProps = {
      type: 'PHOTO',
      name: Faker.name.firstName(),
      path: Faker.system.filePath(),
      mimeType: Faker.system.mimeType(),
    };

    try {
      const addedMediaResult = await mediaService.add(mediaProps);
      const addedMedia = addedMediaResult.getValue();

      expect(addedMediaResult.isSuccess).toBeTruthy();

      const deletedMediaResult = await mediaService.deleteById(addedMedia.id);
      const deletedMedia = deletedMediaResult.getValue();

      expect(deletedMediaResult.isSuccess).toBeTruthy();
      expect(deletedMedia).toBeTruthy();
    } catch (err) {
      errorOccurred = true;
    }

    expect(errorOccurred).toBeFalsy();
  });
});
