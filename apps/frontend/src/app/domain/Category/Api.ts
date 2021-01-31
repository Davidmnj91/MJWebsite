import { Category } from '@mj-website/api-interfaces';
import http from '../../services/http';

const basePath = `${process.env.NX_API_URL}/categories`;

export const CategoryApi = {
  getAll: () => http.post<Category[]>(`${basePath}/list`),
  getById: (id: number) => http.get<Category>(`${basePath}/${id}`),
  post: (entity: Category) =>
    http.post<Category>(basePath, {
      body: JSON.stringify(entity),
      method: 'POST',
    }),
  put: (id: number, entity: Category) =>
    http.put<Category>(`${basePath}/${id}`, {
      body: JSON.stringify(entity),
      method: 'PUT',
    }),
  delete: (id: number) => http.delete(`${basePath}/${id}`),
};
