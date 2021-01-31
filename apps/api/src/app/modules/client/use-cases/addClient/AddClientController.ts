import { BaseController } from '../../../../core/infra/BaseController';
import { AddClientUseCase } from './AddClientUseCase';

export class CreateClientController extends BaseController {
  private readonly useCase: AddClientUseCase;

  constructor(useCase: AddClientUseCase) {
    super();
    this.useCase = useCase;
  }

  async executeImpl() {
    const { name, description } = this.req.body;

    try {
      const result = await this.useCase.execute({ name, description });

      if (result.isLeft()) {
        const error = result.value.getValue();

        switch (error.type) {
          case 'VALIDATION_ERRORS':
            return this.invalidEntity(error.error);
          case 'ADD_CLIENT_ERROR':
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
