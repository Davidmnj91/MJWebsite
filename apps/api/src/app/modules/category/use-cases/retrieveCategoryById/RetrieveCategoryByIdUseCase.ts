import { Category, PropType } from '@mj-website/api-interfaces';
import { Either, left, Result, right } from '@mj-website/monads';
import { UseCase } from '../../../../core/infra/UseCase';
import { CategoryErrors } from '../../domain/CategoryErrors';
import { CategoryService } from '../../services/CategoryService';

export type RetrieveCategoryByIdCommand = PropType<Category, 'id'>;

export type RetrieveCategoryByIdResponse = Either<Result<CategoryErrors>, Result<Category>>;

export class RetrieveCategoryByIdUseCase implements UseCase<RetrieveCategoryByIdCommand, RetrieveCategoryByIdResponse> {
  private readonly categoryService: CategoryService;

  constructor(categoryService: CategoryService) {
    this.categoryService = categoryService;
  }

  async execute(command: RetrieveCategoryByIdCommand): Promise<RetrieveCategoryByIdResponse> {
    const id = command;

    const retrievedCategory = await this.categoryService.findById(id);
    if (retrievedCategory.isFailure) {
      return left(CategoryErrors.createFindCategoryError(retrievedCategory.error));
    }

    return right(retrievedCategory);
  }
}
