import { Client } from '@mj-website/api-interfaces';
import http from '../../services/http';

const basePath = `${process.env.NX_API_URL}/clients`;

export const ClientApi = {
  getAll: () => http.post<Client[]>(`${basePath}/list`),
  getById: (id: number) => http.get<Client>(`${basePath}/${id}`),
  post: (entity: Client) =>
    http.post<Client>(basePath, {
      body: JSON.stringify(entity),
      method: 'POST',
    }),
  put: (id: number, entity: Client) =>
    http.put<Client>(`${basePath}/${id}`, {
      body: JSON.stringify(entity),
      method: 'PUT',
    }),
  delete: (id: number) => http.delete(`${basePath}/${id}`),
};
