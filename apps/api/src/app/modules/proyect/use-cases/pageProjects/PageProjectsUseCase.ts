import { PaginationResponse, PaginationResponseOf, Project } from '@mj-website/api-interfaces';
import { IQuery, Pagination } from '@mj-website/criteria';
import { Either, left, Result, right } from '@mj-website/monads';
import { UseCase } from '../../../../core/infra/UseCase';
import { ProjectErrors } from '../../domain/ProjectErrors';
import { ProjectService } from '../../services/ProjectService';

export type PageProjectCommand = {
  query: IQuery<Project>;
  pagination: Pagination;
};
export type PageProjectResponse = Either<Result<ProjectErrors>, Result<PaginationResponse<Project>>>;

export class PageProjectsUseCase implements UseCase<PageProjectCommand, PageProjectResponse> {
  private readonly projectService: ProjectService;

  constructor(projectService: ProjectService) {
    this.projectService = projectService;
  }

  async execute(command: PageProjectCommand): Promise<PageProjectResponse> {
    const { query, pagination } = command;

    const pagedProjects = await this.projectService.getAllPaged(query, pagination);
    if (pagedProjects.isFailure) {
      return left(ProjectErrors.createFindProjectError(pagedProjects.error));
    }

    const response = pagedProjects.map(([projects, size]) => PaginationResponseOf<Project>(projects, size, pagination));

    return right(response);
  }
}
