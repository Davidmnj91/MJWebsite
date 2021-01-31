import { BaseController } from '../../../../core/infra/BaseController';
import { RetrieveCategoryByIdUseCase } from './RetrieveCategoryByIdUseCase';

export class RetrieveCategoryByIdController extends BaseController {
  private readonly useCase: RetrieveCategoryByIdUseCase;

  constructor(useCase: RetrieveCategoryByIdUseCase) {
    super();
    this.useCase = useCase;
  }

  async executeImpl() {
    const id = this.req.params.id;

    try {
      const result = await this.useCase.execute(id);

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
