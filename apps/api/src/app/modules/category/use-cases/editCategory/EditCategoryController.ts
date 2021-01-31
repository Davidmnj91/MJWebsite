import { BaseController } from '../../../../core/infra/BaseController';
import { EditCategoryCommand, EditCategoryUseCase } from './EditCategoryUseCase';

export class EditCategoryController extends BaseController {
  private readonly useCase: EditCategoryUseCase;

  constructor(useCase: EditCategoryUseCase) {
    super();
    this.useCase = useCase;
  }

  async executeImpl() {
    const { name, parent_id, children, cover } = this.req.body;
    const id = this.req.params.id;
    const newCover = this.req.files.cover;

    const updateRequest: EditCategoryCommand = {
      id,
      update: { name, parent_id, children, cover },
      newCover,
    };

    try {
      const result = await this.useCase.execute(updateRequest);

      if (result.isLeft()) {
        const error = result.value.getValue();

        switch (error.type) {
          case 'VALIDATION_ERRORS':
            return this.invalidEntity(error.error);
          case 'EDIT_CATEGORY_ERROR':
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
