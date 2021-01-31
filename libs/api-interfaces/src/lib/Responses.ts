import { Pagination } from '@mj-website/criteria';

export type PaginationResponse<M> = {
  total: number;
  records: Array<M>;
} & Pagination;

export const PaginationResponseOf = <M>(
  collection: M[],
  total: number,
  pagination: Pagination
): PaginationResponse<M> => {
  return { records: collection, total, ...pagination };
};
