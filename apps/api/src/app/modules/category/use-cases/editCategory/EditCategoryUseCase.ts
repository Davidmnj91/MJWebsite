import { Category, CategoryProps, UpdateRequest } from '@mj-website/api-interfaces';
import { Either, left, Result, right } from '@mj-website/monads';
import { UploadedFile } from 'express-fileupload';
import { UseCase } from '../../../../core/infra/UseCase';
import { CategoryErrors } from '../../domain/CategoryErrors';
import { categoryValidator } from '../../domain/CategoryValidator';
import { CategoryService } from '../../services/CategoryService';

export type EditCategoryCommand = UpdateRequest<CategoryProps> & { newCover?: UploadedFile | UploadedFile[] };

export type EditCategoryResponse = Either<Result<CategoryErrors>, Result<Category>>;

export class EditCategoryUseCase implements UseCase<EditCategoryCommand, EditCategoryResponse> {
  private readonly categoryService: CategoryService;

  constructor(categoryService: CategoryService) {
    this.categoryService = categoryService;
  }

  async execute(command: EditCategoryCommand): Promise<EditCategoryResponse> {
    const { id, update } = command;
    const validCategory = await categoryValidator.validate(update);

    if (validCategory.isFailure) {
      return left(CategoryErrors.createInvalidCategoryError(validCategory.getValue()));
    }

    const editedCategory = await this.categoryService.edit(id, update);
    if (editedCategory.isFailure) {
      return left(CategoryErrors.createEditCategoryError(editedCategory.error));
    }

    return right(editedCategory);
  }
}
