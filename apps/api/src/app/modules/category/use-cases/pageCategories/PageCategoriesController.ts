import { BaseController } from '../../../../core/infra/BaseController';
import { PaginationFromQueryParams } from '../../../../utils/PaginationUtils';
import { PageCategoriesUseCase, PageCategoryCommand } from './PageCategoriesUseCase';

export class PageCategoriesController extends BaseController {
  private readonly useCase: PageCategoriesUseCase;

  constructor(useCase: PageCategoriesUseCase) {
    super();
    this.useCase = useCase;
  }

  async executeImpl() {
    const query = this.req.body;
    const pagination = PaginationFromQueryParams(this.req);

    const command: PageCategoryCommand = { query, pagination };

    try {
      const result = await this.useCase.execute(command);

      if (result.isLeft()) {
        const error = result.value.getValue();

        switch (error.type) {
          case 'FIND_CATEGORY_ERROR':
            return this.fail(error.error);
          default:
            return this.fail(error);
        }
      } else {
        return this.ok(result.value.getValue());
      }
    } catch (err) {
      return this.fail(err);
    }
  }
}
