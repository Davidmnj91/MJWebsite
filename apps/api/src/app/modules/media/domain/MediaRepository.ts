import { Media, MediaProps, PropType } from '@mj-website/api-interfaces';
import { IQuery, Pagination } from '@mj-website/criteria';

export interface MediaRepository {
  save(media: MediaProps): Promise<Media>;
  findOne(id: string): Promise<Media>;
  getAll(query: IQuery<Media>): Promise<Media[]>;
  getAllPaged(query: IQuery<Media>, pagination: Pagination): Promise<[Media[], number]>;
  edit(id: PropType<Media, 'id'>, media: MediaProps): Promise<Media>;
  deleteById(id: string): Promise<boolean>;
}
