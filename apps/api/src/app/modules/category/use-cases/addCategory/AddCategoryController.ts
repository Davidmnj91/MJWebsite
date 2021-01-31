import { BaseController } from '../../../../core/infra/BaseController';
import { AddCategoryUseCase } from './AddCategoryUseCase';

export class CreateCategoryController extends BaseController {
  private readonly useCase: AddCategoryUseCase;

  constructor(useCase: AddCategoryUseCase) {
    super();
    this.useCase = useCase;
  }

  async executeImpl() {
    const { name, parent_id, children } = this.req.body;
    const cover = this.req.files.cover;

    try {
      const result = await this.useCase.execute({ name, parent_id, children, cover });

      if (result.isLeft()) {
        const error = result.value.getValue();

        switch (error.type) {
          case 'VALIDATION_ERRORS':
            return this.invalidEntity(error.error);
          case 'ADD_CATEGORY_ERROR':
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
