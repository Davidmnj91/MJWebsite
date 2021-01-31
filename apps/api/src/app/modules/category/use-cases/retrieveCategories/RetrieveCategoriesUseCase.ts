import { Category } from '@mj-website/api-interfaces';
import { IQuery } from '@mj-website/criteria';
import { Either, left, Result, right } from '@mj-website/monads';
import { UseCase } from '../../../../core/infra/UseCase';
import { CategoryErrors } from '../../domain/CategoryErrors';
import { CategoryService } from '../../services/CategoryService';

export type RetrieveCategoriesCommand = IQuery<Category>;

export type RetrieveCategoriesResponse = Either<Result<CategoryErrors>, Result<Array<Category>>>;

export class RetrieveCategoriesUseCase implements UseCase<RetrieveCategoriesCommand, RetrieveCategoriesResponse> {
  private readonly categoryService: CategoryService;

  constructor(categoryService: CategoryService) {
    this.categoryService = categoryService;
  }

  async execute(command: RetrieveCategoriesCommand): Promise<RetrieveCategoriesResponse> {
    const query = command;

    const retrievedCategories = await this.categoryService.getAll(query);
    if (retrievedCategories.isFailure) {
      return left(CategoryErrors.createFindCategoryError(retrievedCategories.error));
    }

    return right(retrievedCategories);
  }
}
