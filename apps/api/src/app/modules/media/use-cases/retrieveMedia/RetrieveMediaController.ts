import { BaseController } from '../../../../core/infra/BaseController';
import { RetrieveMediaUseCase } from './RetrieveMediaUseCase';

export class RetrieveMediaController extends BaseController {
  private readonly useCase: RetrieveMediaUseCase;

  constructor(useCase: RetrieveMediaUseCase) {
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
