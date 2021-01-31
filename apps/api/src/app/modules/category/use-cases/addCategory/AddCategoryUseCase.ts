import { Category } from '@mj-website/api-interfaces';
import { Either, left, Result, right } from '@mj-website/monads';
import { UploadedFile } from 'express-fileupload';
import { UseCase } from '../../../../core/infra/UseCase';
import { MediaService } from '../../../media/services/MediaService';
import { CategoryErrors } from '../../domain/CategoryErrors';
import { CategoryMutation } from '../../domain/CategoryMutations';
import { categoryValidator } from '../../domain/CategoryValidator';
import { CategoryService } from '../../services/CategoryService';

export type AddCategoryCommand = CategoryMutation & { cover: UploadedFile | UploadedFile[] };

export type AddCategoryResponse = Either<Result<CategoryErrors>, Result<Category>>;

export class AddCategoryUseCase implements UseCase<AddCategoryCommand, AddCategoryResponse> {
  private readonly categoryService: CategoryService;
  private readonly mediaService: MediaService;

  constructor(categoryService: CategoryService, mediaService: MediaService) {
    this.categoryService = categoryService;
    this.mediaService = mediaService;
  }

  async execute(command: AddCategoryCommand): Promise<AddCategoryResponse> {
    const category = command;
    const validCategory = await categoryValidator.validate(category);

    if (validCategory.isFailure) {
      return left(CategoryErrors.createInvalidCategoryError(validCategory.getValue()));
    }

    const coverFile = category.cover as UploadedFile;
    const createdFile = await this.mediaService.saveFile(coverFile);
    if (createdFile.isFailure) {
      return left(CategoryErrors.createAddCategoryError(createdFile.error));
    }

    const addedCategory = await this.categoryService.add({ name: category.name, cover: createdFile.getValue() });
    if (addedCategory.isFailure) {
      return left(CategoryErrors.createAddCategoryError(addedCategory.error));
    }

    return right(addedCategory);
  }
}
