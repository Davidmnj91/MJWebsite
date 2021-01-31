import { CreateProjectDto, Project } from '@mj-website/api-interfaces';
import http from '../../services/http';

const basePath = `${process.env.NX_API_URL}/projects`;

export const ProjectApi = {
  getAll: () => http.post<Project[]>(`${basePath}/list`),
  getById: (id: number) => http.get<Project>(`${basePath}/${id}`),
  post: (entity: CreateProjectDto) => {
    const json = JSON.stringify({
      name: entity.name,
      client_id: entity.client_id,
      category_id: entity.category_id,
      photos: entity.photos,
    });
    const formData = new FormData();
    formData.append('content', json);
    entity.images.forEach((image) => {
      formData.append('images', image, image.name);
    });
    return http.post<Project>(basePath, {
      body: formData,
      method: 'POST',
    });
  },
  put: (id: number, entity: Project) =>
    http.put<Project>(`${basePath}/${id}`, {
      body: JSON.stringify(entity),
      method: 'PUT',
    }),
  delete: (id: number) => http.delete(`${basePath}/${id}`),
};
