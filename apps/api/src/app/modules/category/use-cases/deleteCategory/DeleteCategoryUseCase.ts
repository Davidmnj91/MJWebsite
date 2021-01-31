import { Category, PropType } from '@mj-website/api-interfaces';
import { Either, left, Result, right } from '@mj-website/monads';
import { UseCase } from '../../../../core/infra/UseCase';
import { MediaService } from '../../../media/services/MediaService';
import { CategoryErrors } from '../../domain/CategoryErrors';
import { CategoryService } from '../../services/CategoryService';

export type DeleteCategoryCommand = PropType<Category, 'id'>;

export type DeleteCategoryResponse = Either<Result<CategoryErrors>, Result<boolean>>;

export class DeleteCategoryUseCase implements UseCase<DeleteCategoryCommand, DeleteCategoryResponse> {
  private readonly categoryService: CategoryService;
  private readonly mediaService: MediaService;

  constructor(categoryService: CategoryService, mediaService: MediaService) {
    this.categoryService = categoryService;
    this.mediaService = mediaService;
  }

  async execute(command: DeleteCategoryCommand): Promise<DeleteCategoryResponse> {
    const id = command;

    const toDeleteCategory = await this.categoryService.findById(id);
    if (toDeleteCategory.isFailure) {
      return left(CategoryErrors.createDeleteCategoryError(toDeleteCategory.error));
    }

    const deletedCategory = await this.categoryService.deleteById(id);
    if (deletedCategory.isFailure) {
      return left(CategoryErrors.createDeleteCategoryError(deletedCategory.error));
    }

    const deletedCover = await this.mediaService.deleteFile(toDeleteCategory.getValue().id);
    if (deletedCategory.isFailure) {
      return left(CategoryErrors.createDeleteCategoryError(deletedCover.error));
    }

    return right(deletedCategory);
  }
}
