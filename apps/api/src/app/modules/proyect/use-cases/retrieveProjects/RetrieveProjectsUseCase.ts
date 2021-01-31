import { Project } from '@mj-website/api-interfaces';
import { IQuery } from '@mj-website/criteria';
import { Either, left, Result, right } from '@mj-website/monads';
import { UseCase } from '../../../../core/infra/UseCase';
import { ProjectErrors } from '../../domain/ProjectErrors';
import { ProjectService } from '../../services/ProjectService';

export type RetrieveProjectsCommand = IQuery<Project>;

export type RetrieveProjectsResponse = Either<Result<ProjectErrors>, Result<Array<Project>>>;

export class RetrieveProjectsUseCase implements UseCase<RetrieveProjectsCommand, RetrieveProjectsResponse> {
  private readonly projectService: ProjectService;

  constructor(projectService: ProjectService) {
    this.projectService = projectService;
  }

  async execute(command: RetrieveProjectsCommand): Promise<RetrieveProjectsResponse> {
    const query = command;

    const retrievedProjects = await this.projectService.getAll(query);
    if (retrievedProjects.isFailure) {
      return left(ProjectErrors.createFindProjectError(retrievedProjects.error));
    }

    return right(retrievedProjects);
  }
}
