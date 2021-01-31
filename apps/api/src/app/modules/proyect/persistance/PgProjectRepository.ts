import { Project, ProjectProps } from '@mj-website/api-interfaces';
import { QueryableRepository } from '@mj-website/criteria';
import { EntityRepository } from 'typeorm';
import { ProjectEntity } from '../domain/ProjectEntity';
import { ProjectRepository } from '../domain/ProjectRepository';

@EntityRepository(ProjectEntity)
export class PgProjectRepository extends QueryableRepository<Project> implements ProjectRepository {
  edit(id: string, project: ProjectProps): Promise<Project> {
    return this.update(id, project).then((result) => result.raw[0]);
  }
  deleteById(id: string): Promise<boolean> {
    return this.delete(id).then((result) => result.raw);
  }
}
