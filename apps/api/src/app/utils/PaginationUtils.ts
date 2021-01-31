import { Pagination } from '@mj-website/criteria';
import { Request } from 'express';

export const PaginationFromQueryParams = (req: Request): Pagination => {
  const page = typeof req.query.page === 'string' ? parseInt(req.query.page, 10) || 1 : 1;
  const count = typeof req.query.count === 'string' ? parseInt(req.query.count, 10) || 0 : 25;

  return { page, count };
};
