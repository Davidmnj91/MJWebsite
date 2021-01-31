import { MediaFile } from '@mj-website/api-interfaces';
import * as Faker from 'faker';
import { existsSync, mkdirSync, rmdirSync, unlinkSync } from 'fs';
import { FsMediaRepository } from './FsMediaRepository';

xdescribe('Storage Media Repository Test', () => {
  const mediaRepository = new FsMediaRepository();
  const directory = 'TestTemp';

  beforeAll(() => {
    mkdirSync(directory);
  });

  afterAll(() => {
    rmdirSync(directory, { recursive: true });
  });

  it('should be able to save media', async () => {
    let errorOccurred = false;

    const mediaProps: MediaFile = {
      name: `${directory}/${Faker.system.fileName()}`,
      data: Buffer.from(Faker.image.business()),
    };

    try {
      await mediaRepository.createFile(mediaProps);

      expect(existsSync(mediaProps.name)).toBeTruthy();
    } catch (err) {
      errorOccurred = true;
    } finally {
      unlinkSync(mediaProps.name);
    }

    expect(errorOccurred).toBeFalsy();
  });

  it('should be able to retrieve media by path', async () => {
    let errorOccurred = false;

    const mediaProps: MediaFile = {
      name: `${directory}/${Faker.system.fileName()}`,
      data: Buffer.from(Faker.image.business()),
    };

    try {
      await mediaRepository.createFile(mediaProps);

      const retrievedMedia = await mediaRepository.readFile(mediaProps.name);

      expect(retrievedMedia).toEqual(mediaProps.data);
    } catch (err) {
      errorOccurred = true;
    } finally {
      unlinkSync(mediaProps.name);
    }
    expect(errorOccurred).toBeFalsy();
  });

  it('should be able to delete media', async () => {
    let errorOccurred = false;

    const mediaProps: MediaFile = {
      name: `${directory}/${Faker.system.fileName()}`,
      data: Buffer.from(Faker.image.business()),
    };

    try {
      await mediaRepository.createFile(mediaProps);

      await mediaRepository.deleteFile(mediaProps.name);

      expect(existsSync(mediaProps.name)).toBeFalsy();
    } catch (err) {
      errorOccurred = true;
    }

    expect(errorOccurred).toBeFalsy();
  });
});
