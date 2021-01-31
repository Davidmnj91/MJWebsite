import { Project, PropType } from '@mj-website/api-interfaces';
import { Either, left, Result, right } from '@mj-website/monads';
import { UseCase } from '../../../../core/infra/UseCase';
import { MediaService } from '../../../media/services/MediaService';
import { ProjectErrors } from '../../domain/ProjectErrors';
import { ProjectService } from '../../services/ProjectService';

export type DeleteProjectCommand = PropType<Project, 'id'>;

export type DeleteProjectResponse = Either<Result<ProjectErrors>, Result<boolean>>;

export class DeleteProjectUseCase implements UseCase<DeleteProjectCommand, DeleteProjectResponse> {
  private readonly projectService: ProjectService;
  private readonly mediaService: MediaService;

  constructor(projectService: ProjectService, mediaService: MediaService) {
    this.projectService = projectService;
    this.mediaService = mediaService;
  }

  async execute(command: DeleteProjectCommand): Promise<DeleteProjectResponse> {
    const id = command;

    const retrievedProject = await this.projectService.findById(id);
    if (retrievedProject.isFailure) {
      return left(ProjectErrors.createDeleteProjectError(retrievedProject.error));
    }

    const project = retrievedProject.getValue();
    if (!project) {
      return left(ProjectErrors.createDeleteProjectError(`Cannot find project with id ${id}`));
    }

    const { photos } = project;
    const deletedMedias = await Promise.all(photos.map((p) => this.mediaService.deleteFile(p.file.id)));

    if (deletedMedias.some((m) => m.isFailure)) {
      const error = deletedMedias.find((m) => m.isFailure)[0];
      return left(ProjectErrors.createDeleteProjectError(error));
    }

    const deletedProject = await this.projectService.deleteById(id);
    if (deletedProject.isFailure) {
      return left(ProjectErrors.createDeleteProjectError(deletedProject.error));
    }

    return right(deletedProject);
  }
}
