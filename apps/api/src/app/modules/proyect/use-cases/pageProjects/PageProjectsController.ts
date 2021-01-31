import { BaseController } from '../../../../core/infra/BaseController';
import { PaginationFromQueryParams } from '../../../../utils/PaginationUtils';
import { PageProjectCommand, PageProjectsUseCase } from './PageProjectsUseCase';

export class PageProjectsController extends BaseController {
  private readonly useCase: PageProjectsUseCase;

  constructor(useCase: PageProjectsUseCase) {
    super();
    this.useCase = useCase;
  }

  async executeImpl() {
    const query = this.req.body;
    const pagination = PaginationFromQueryParams(this.req);

    const command: PageProjectCommand = { query, pagination };

    try {
      const result = await this.useCase.execute(command);

      if (result.isLeft()) {
        const error = result.value.getValue();

        switch (error.type) {
          case 'FIND_PROJECT_ERROR':
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
