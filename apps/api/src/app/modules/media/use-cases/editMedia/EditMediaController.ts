import { BaseController } from '../../../../core/infra/BaseController';
import { EditMediaCommand, EditMediaUseCase } from './EditMediaUseCase';

export class EditMediaController extends BaseController {
  private readonly useCase: EditMediaUseCase;

  constructor(useCase: EditMediaUseCase) {
    super();
    this.useCase = useCase;
  }

  async executeImpl() {
    const id = this.req.params.id;
    const newMedia = this.req.files.cover;

    const updateRequest: EditMediaCommand = {
      id,
      update: newMedia,
    };

    try {
      const result = await this.useCase.execute(updateRequest);

      if (result.isLeft()) {
        const error = result.value.getValue();

        switch (error.type) {
          case 'VALIDATION_ERRORS':
            return this.invalidEntity(error.error);
          case 'EDIT_MEDIA_ERROR':
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
