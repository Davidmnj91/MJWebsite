import { Category, Client, PhotoProps, Project, ProjectProps } from '@mj-website/api-interfaces';
import { Either, left, Result, right } from '@mj-website/monads';
import { UploadedFile } from 'express-fileupload';
import { UseCase } from '../../../../core/infra/UseCase';
import { CategoryRepository } from '../../../category/domain/CategoryRepository';
import { ClientRepository } from '../../../client/domain/ClientRepository';
import { MediaService } from '../../../media/services/MediaService';
import { ProjectErrors } from '../../domain/ProjectErrors';
import { ProjectRepository } from '../../domain/ProjectRepository';

export type AddProjectCommand = {
  category_id: string;
  client_id: string;
  name: string;
  photos: Array<{ order: number; image: UploadedFile }>;
};

export type AddProjectResponse = Either<Result<ProjectErrors>, Result<Project>>;

export class AddProjectUseCase implements UseCase<AddProjectCommand, AddProjectResponse> {
  constructor(
    private clientRepo: ClientRepository,
    private categoryRepo: CategoryRepository,
    private mediaService: MediaService,
    private projectRepo: ProjectRepository
  ) {}

  async execute(command: AddProjectCommand): Promise<AddProjectResponse> {
    const { category_id, client_id, name, photos } = command;

    const clientResult = await this.getClient(client_id);
    if (clientResult.isFailure) {
      return left(ProjectErrors.createAddProjectError(clientResult.getValue()));
    }

    const categoryResult = await this.getCategory(category_id);
    if (categoryResult.isFailure) {
      return left(ProjectErrors.createAddProjectError(categoryResult.getValue()));
    }

    try {
      const pictures = await Promise.all(photos.map((p) => this.mediaService.saveFile(p.image)));
      if (pictures.some((p) => p.isFailure)) {
        return left(ProjectErrors.createAddProjectError('Error while uploading files'));
      }
      const projectPhotos = pictures.map((p) => p.getValue());
      const toAddPhotos = photos.reduce((acc, p) => {
        acc.push({ order: p.order, file: projectPhotos.find((c) => c.original_name === p.image.name) });
        return acc;
      }, [] as PhotoProps[]);

      const project: ProjectProps = {
        client: clientResult.getValue(),
        category: categoryResult.getValue(),
        name,
        photos: toAddPhotos,
      };

      const addedProject = await this.projectRepo.save(project);
      return right(Result.ok(addedProject));
    } catch (error) {
      return left(ProjectErrors.createAddProjectError(error));
    }
  }

  private async getClient(client_id: string): Promise<Result<Client>> {
    const client = await this.clientRepo.findOne(client_id);

    if (client) {
      return Result.ok(client);
    } else {
      return Result.fail(`Couldn't find client by id ${client_id}`);
    }
  }

  private async getCategory(category_id: string): Promise<Result<Category>> {
    const category = await this.categoryRepo.findOne(category_id);

    if (category) {
      return Result.ok(category);
    } else {
      return Result.fail(`Couldn't find category by id ${category_id}`);
    }
  }
}
