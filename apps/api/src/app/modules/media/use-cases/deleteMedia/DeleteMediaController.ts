import { BaseController } from '../../../../core/infra/BaseController';
import { DeleteMediaUseCase } from './DeleteMediaUseCase';

export class DeleteMediaController extends BaseController {
  private readonly useCase: DeleteMediaUseCase;

  constructor(useCase: DeleteMediaUseCase) {
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
          case 'DELETE_MEDIA_ERROR':
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
