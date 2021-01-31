import { Media, MediaProps } from '@mj-website/api-interfaces';
import { QueryableRepository } from '@mj-website/criteria';
import { EntityRepository } from 'typeorm';
import { MediaEntity } from '../domain/MediaEntity';
import { MediaRepository } from '../domain/MediaRepository';

@EntityRepository(MediaEntity)
export class PgMediaRepository extends QueryableRepository<MediaEntity> implements MediaRepository {
  edit(id: string, media: MediaProps): Promise<Media> {
    return this.update(id, media).then((result) => result.raw[0]);
  }

  deleteById(id: string): Promise<boolean> {
    return this.delete(id).then((result) => result.raw);
  }
}
