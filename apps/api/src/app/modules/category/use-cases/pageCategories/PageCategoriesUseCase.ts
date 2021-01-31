import { Category, PaginationResponse, PaginationResponseOf } from '@mj-website/api-interfaces';
import { IQuery, Pagination } from '@mj-website/criteria';
import { Either, left, Result, right } from '@mj-website/monads';
import { UseCase } from '../../../../core/infra/UseCase';
import { CategoryErrors } from '../../domain/CategoryErrors';
import { CategoryService } from '../../services/CategoryService';

export type PageCategoryCommand = {
  query: IQuery<Category>;
  pagination: Pagination;
};
export type PageCategoryResponse = Either<Result<CategoryErrors>, Result<PaginationResponse<Category>>>;

export class PageCategoriesUseCase implements UseCase<PageCategoryCommand, PageCategoryResponse> {
  private readonly categoryService: CategoryService;

  constructor(categoryService: CategoryService) {
    this.categoryService = categoryService;
  }

  async execute(command: PageCategoryCommand): Promise<PageCategoryResponse> {
    const { query, pagination } = command;

    const pagedCategories = await this.categoryService.getAllPaged(query, pagination);
    if (pagedCategories.isFailure) {
      return left(CategoryErrors.createFindCategoryError(pagedCategories.error));
    }

    const response = pagedCategories.map(([categories, size]) =>
      PaginationResponseOf<Category>(categories, size, pagination)
    );

    return right(response);
  }
}
