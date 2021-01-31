import { BaseController } from '../../../../core/infra/BaseController';
import { RetrieveMediaByIdUseCase } from './RetrieveMediaByIdUseCase';

export class RetrieveMediaByIdController extends BaseController {
  private readonly useCase: RetrieveMediaByIdUseCase;

  constructor(useCase: RetrieveMediaByIdUseCase) {
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
