import { BaseController } from '../../../../core/infra/BaseController';
import { PaginationFromQueryParams } from '../../../../utils/PaginationUtils';
import { PageClientCommand, PageClientsUseCase } from './PageClientsUseCase';

export class PageClientsController extends BaseController {
  private readonly useCase: PageClientsUseCase;

  constructor(useCase: PageClientsUseCase) {
    super();
    this.useCase = useCase;
  }

  async executeImpl() {
    const query = this.req.body;
    const pagination = PaginationFromQueryParams(this.req);

    const command: PageClientCommand = { query, pagination };

    try {
      const result = await this.useCase.execute(command);

      if (result.isLeft()) {
        const error = result.value.getValue();

        switch (error.type) {
          case 'FIND_CLIENT_ERROR':
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
