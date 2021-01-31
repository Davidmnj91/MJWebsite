import { BaseController } from '../../../../core/infra/BaseController';
import { RetrieveProjectsUseCase } from './RetrieveProjectsUseCase';

export class RetrieveProjectsController extends BaseController {
  private readonly useCase: RetrieveProjectsUseCase;

  constructor(useCase: RetrieveProjectsUseCase) {
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
