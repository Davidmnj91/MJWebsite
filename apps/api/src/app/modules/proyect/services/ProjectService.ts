import { Project, ProjectProps } from '@mj-website/api-interfaces';
import { IQuery, Pagination } from '@mj-website/criteria';
import { Result } from '@mj-website/monads';
import { ProjectRepository } from '../domain/ProjectRepository';

export class ProjectService {
  constructor(private _repository: ProjectRepository) {}

  async add(project: ProjectProps): Promise<Result<Project>> {
    try {
      const addedProject = await this._repository.save(project);
      return Result.ok(addedProject);
    } catch (e) {
      return Result.fail(e);
    }
  }

  async findById(id: string): Promise<Result<Project>> {
    try {
      const foundProject = await this._repository.findOne(id);
      return Result.ok(foundProject);
    } catch (e) {
      return Result.fail(e);
    }
  }

  async getAll(query?: IQuery<Project>): Promise<Result<Project[]>> {
    try {
      const foundProjects = await this._repository.getAll(query);
      return Result.ok(foundProjects);
    } catch (e) {
      return Result.fail(e);
    }
  }

  async getAllPaged(query?: IQuery<Project>, pagination?: Pagination): Promise<Result<[Array<Project>, number]>> {
    try {
      const foundProjects = await this._repository.getAllPaged(query, pagination);

      return Result.ok(foundProjects);
    } catch (e) {
      return Result.fail(e);
    }
  }

  async edit(id: string, project: ProjectProps): Promise<Result<Project>> {
    try {
      const updatedProject = await this._repository.edit(id, project);
      return Result.ok(updatedProject);
    } catch (e) {
      return Result.fail(e);
    }
  }

  async deleteById(id: string): Promise<Result<boolean>> {
    try {
      const deletedProject = await this._repository.deleteById(id);
      return Result.ok(deletedProject);
    } catch (e) {
      return Result.fail(e);
    }
  }
}
