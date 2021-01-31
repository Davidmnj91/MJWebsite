import { BaseController } from '../../../../core/infra/BaseController';
import { RetrieveProjectByIdUseCase } from './RetrieveProjectByIdUseCase';

export class RetrieveProjectByIdController extends BaseController {
  private readonly useCase: RetrieveProjectByIdUseCase;

  constructor(useCase: RetrieveProjectByIdUseCase) {
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
