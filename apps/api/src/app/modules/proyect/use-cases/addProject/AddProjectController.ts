import { UploadedFile } from 'express-fileupload';
import { BaseController } from '../../../../core/infra/BaseController';
import { AddProjectUseCase } from './AddProjectUseCase';

export class AddProjectController extends BaseController {
  private readonly useCase: AddProjectUseCase;

  constructor(useCase: AddProjectUseCase) {
    super();
    this.useCase = useCase;
  }

  async executeImpl() {
    const content = JSON.parse(this.req.body.content);
    const { name, client_id, category_id } = content;
    const images = this.req.files.images as UploadedFile[];

    try {
      const photos = content.photos.reduce((acc, p) => {
        acc.push({ order: p.order, image: images.find((i) => i.name === p.image) });
        return acc;
      }, []);
      const result = await this.useCase.execute({ category_id, client_id, name, photos });

      if (result.isLeft()) {
        const error = result.value.getValue();

        switch (error.type) {
          case 'VALIDATION_ERRORS':
            return this.invalidEntity(error.error);
          case 'ADD_PROJECT_ERROR':
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
