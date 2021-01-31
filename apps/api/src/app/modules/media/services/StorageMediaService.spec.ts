import { MediaFile } from '@mj-website/api-interfaces';
import * as Faker from 'faker';
import { FakeStorageMediaRepository } from '../persistance/FakeStorageMediaRepository';
import { StorageMediaService } from './StorageMediaService';

describe('Storage Media Repository Test', () => {
  const mediaRepository = new FakeStorageMediaRepository();
  const mediaService = new StorageMediaService(mediaRepository);

  it('should be able to save media', async () => {
    let errorOccurred = false;

    const mediaProps: MediaFile = {
      name: Faker.address.streetName(),
      data: Buffer.from(Faker.image.business()),
    };

    try {
      const addedMediaResult = await mediaService.createFile(mediaProps);

      expect(addedMediaResult.isSuccess).toBeTruthy();
    } catch (err) {
      errorOccurred = true;
    }

    expect(errorOccurred).toBeFalsy();
  });

  it('should be able to retrieve media by path', async () => {
    let errorOccurred = false;

    const mediaProps: MediaFile = {
      name: Faker.address.streetName(),
      data: Buffer.from(Faker.image.business()),
    };

    try {
      const addedMediaResult = await mediaService.createFile(mediaProps);
      expect(addedMediaResult.isSuccess).toBeTruthy();

      const retrievedMediaResult = await mediaService.readFile(mediaProps.name);
      const retrievedMedia = retrievedMediaResult.getValue();

      expect(retrievedMediaResult.isSuccess).toBeTruthy();
      expect(retrievedMedia).toEqual(mediaProps.data);
    } catch (err) {
      errorOccurred = true;
    }

    expect(errorOccurred).toBeFalsy();
  });

  it('should be able to delete media', async () => {
    let errorOccurred = false;

    const mediaProps: MediaFile = {
      name: Faker.address.streetName(),
      data: Buffer.from(Faker.image.business()),
    };

    try {
      const addedMediaResult = await mediaService.createFile(mediaProps);
      expect(addedMediaResult.isSuccess).toBeTruthy();

      const deletedMediaResult = await mediaService.deleteFile(mediaProps.name);

      expect(deletedMediaResult.isSuccess).toBeTruthy();
    } catch (err) {
      errorOccurred = true;
    }

    expect(errorOccurred).toBeFalsy();
  });
});
