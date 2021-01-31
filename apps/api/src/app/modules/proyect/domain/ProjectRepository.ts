import { Project, ProjectProps, PropType } from '@mj-website/api-interfaces';
import { IQuery, Pagination } from '@mj-website/criteria';

export interface ProjectRepository {
  save(project: ProjectProps): Promise<Project>;
  findOne(id: string): Promise<Project>;
  getAll(query: IQuery<Project>): Promise<Project[]>;
  getAllPaged(query: IQuery<Project>, pagination: Pagination): Promise<[Project[], number]>;
  edit(id: PropType<Project, 'id'>, project: ProjectProps): Promise<Project>;
  deleteById(id: string): Promise<boolean>;
}
