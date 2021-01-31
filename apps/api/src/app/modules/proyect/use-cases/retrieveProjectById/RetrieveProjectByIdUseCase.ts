import { Project, PropType } from '@mj-website/api-interfaces';
import { Either, left, Result, right } from '@mj-website/monads';
import { UseCase } from '../../../../core/infra/UseCase';
import { ProjectErrors } from '../../domain/ProjectErrors';
import { ProjectService } from '../../services/ProjectService';

export type RetrieveProjectByIdCommand = PropType<Project, 'id'>;

export type RetrieveProjectByIdResponse = Either<Result<ProjectErrors>, Result<Project>>;

export class RetrieveProjectByIdUseCase implements UseCase<RetrieveProjectByIdCommand, RetrieveProjectByIdResponse> {
  private readonly projectService: ProjectService;

  constructor(projectService: ProjectService) {
    this.projectService = projectService;
  }

  async execute(command: RetrieveProjectByIdCommand): Promise<RetrieveProjectByIdResponse> {
    const id = command;

    const retrievedProject = await this.projectService.findById(id);
    if (retrievedProject.isFailure) {
      return left(ProjectErrors.createFindProjectError(retrievedProject.error));
    }

    return right(retrievedProject);
  }
}
