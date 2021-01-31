import { BaseController } from '../../../../core/infra/BaseController';
import { PaginationFromQueryParams } from '../../../../utils/PaginationUtils';
import { PageMediaCommand, PageMediaUseCase } from './PageMediaUseCase';

export class PageMediaController extends BaseController {
  private readonly useCase: PageMediaUseCase;

  constructor(useCase: PageMediaUseCase) {
    super();
    this.useCase = useCase;
  }

  async executeImpl() {
    const query = this.req.body;
    const pagination = PaginationFromQueryParams(this.req);

    const command: PageMediaCommand = { query, pagination };

    try {
      const result = await this.useCase.execute(command);

      if (result.isLeft()) {
        const error = result.value.getValue();

        switch (error.type) {
          case 'FIND_MEDIA_ERROR':
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
