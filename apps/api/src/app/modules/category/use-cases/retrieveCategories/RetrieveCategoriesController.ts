import { BaseController } from '../../../../core/infra/BaseController';
import { RetrieveCategoriesUseCase } from './RetrieveCategoriesUseCase';

export class RetrieveCategoriesController extends BaseController {
  private readonly useCase: RetrieveCategoriesUseCase;

  constructor(useCase: RetrieveCategoriesUseCase) {
    super();
    this.useCase = useCase;
  }

  async executeImpl() {
    const query = this.req.body;

    try {
      const result = await this.useCase.execute(query);

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
