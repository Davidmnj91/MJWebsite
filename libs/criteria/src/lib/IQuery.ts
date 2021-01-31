import { Filter } from './Filters';

export type SortType = 'ASC' | 'DESC';

export type SortedProps<T> = { [P in keyof T]?: SortType };

export type IQuery<M> = {
  filter?: Filter;
  sort?: SortedProps<M>;
};
