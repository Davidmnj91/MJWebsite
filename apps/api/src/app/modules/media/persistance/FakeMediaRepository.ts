import { Media, MediaProps } from '@mj-website/api-interfaces';
import { ArraySqlQueryResolver, IQuery, Pagination } from '@mj-website/criteria';
import { Result } from '@mj-website/monads';
import * as Faker from 'faker';
import { BaseFakeRepo } from '../../../core/infra/BaseFakeRepo';
import { MediaRepository } from '../domain/MediaRepository';

export class FakeMediaRepository extends BaseFakeRepo<Media> implements MediaRepository {
  compareFakeItems(a: Media, b: Media): boolean {
    return a.id === b.id;
  }

  save(media: MediaProps): Promise<Media> {
    const toAddMedia: Media = { id: Faker.random.uuid(), created_at: new Date(), updated_at: new Date(), ...media };
    this.addFakeItem(toAddMedia);

    return Promise.resolve(toAddMedia);
  }

  findOne(id: string): Promise<Media> {
    const found = this._items.find((i) => i.id === id);
    if (found) {
      return Promise.resolve(found);
    } else {
      return Promise.reject(`Cannot found item with id ${id}`);
    }
  }

  getAll(query?: IQuery<Media>): Promise<Media[]> {
    const queryPredicate = new ArraySqlQueryResolver<Media>().resolve(query);
    const queriedItems = this._items
      .filter((c) => queryPredicate.where(c))
      .sort((c1, c2) => queryPredicate.sort(c1, c2));

    return Promise.resolve(queriedItems);
  }

  getAllPaged(query?: IQuery<Media>, pagination?: Pagination): Promise<[Array<Media>, number]> {
    const start = ((pagination.page || 1) - 1) * (pagination.count || 5);
    const end = start + (pagination.count || 5);
    const queryPredicate = new ArraySqlQueryResolver<Media>().resolve(query);
    const queriedItems = this._items
      .filter((c) => queryPredicate.where(c))
      .sort((c1, c2) => queryPredicate.sort(c1, c2));

    const paginatedRecords = queriedItems.slice(start, end);

    return Promise.resolve([paginatedRecords, queriedItems.length]);
  }

  edit(id: string, media: MediaProps): Promise<Media> {
    const found = this._items.findIndex((i) => i.id === id);
    if (found < 0) {
      return Promise.reject(Result.fail(`Cannot found item with id ${id}`));
    }
    this._items[found] = { ...this._items[found], ...media };
    return Promise.resolve(this._items[found]);
  }

  deleteById(id: string): Promise<boolean> {
    const found = this._items.findIndex((i) => i.id === id);
    if (found < 0) {
      return Promise.reject(`Cannot found item with id ${id}`);
    }

    this._items.splice(found, 1);
    return Promise.resolve(true);
  }
}
