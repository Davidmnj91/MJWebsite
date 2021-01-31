import { BaseController } from '../../../../core/infra/BaseController';
import { EditClientCommand, EditClientUseCase } from './EditClientUseCase';

export class EditClientController extends BaseController {
  private readonly useCase: EditClientUseCase;

  constructor(useCase: EditClientUseCase) {
    super();
    this.useCase = useCase;
  }

  async executeImpl() {
    const { name, description } = this.req.body;
    const id = this.req.params.id;

    const updateRequest: EditClientCommand = {
      id,
      update: { name, description },
    };

    try {
      const result = await this.useCase.execute(updateRequest);

      if (result.isLeft()) {
        const error = result.value.getValue();

        switch (error.type) {
          case 'VALIDATION_ERRORS':
            return this.invalidEntity(error.error);
          case 'EDIT_CLIENT_ERROR':
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
