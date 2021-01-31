import { BaseController } from '../../../../core/infra/BaseController';
import { RetrieveClientsUseCase } from './RetrieveClientsUseCase';

export class RetrieveClientsController extends BaseController {
  private readonly useCase: RetrieveClientsUseCase;

  constructor(useCase: RetrieveClientsUseCase) {
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
