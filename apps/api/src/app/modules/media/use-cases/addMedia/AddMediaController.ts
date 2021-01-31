import { BaseController } from '../../../../core/infra/BaseController';
import { AddMediaUseCase } from './AddMediaUseCase';

export class CreateMediaController extends BaseController {
  private readonly useCase: AddMediaUseCase;

  constructor(useCase: AddMediaUseCase) {
    super();
    this.useCase = useCase;
  }

  async executeImpl() {
    const media = this.req.files.cover;

    try {
      const result = await this.useCase.execute(media);

      if (result.isLeft()) {
        const error = result.value.getValue();

        switch (error.type) {
          case 'VALIDATION_ERRORS':
            return this.invalidEntity(error.error);
          case 'SAVE_MEDIA_ERROR':
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
