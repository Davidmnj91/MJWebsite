import { UploadedFile } from 'express-fileupload';
import { BaseController } from '../../../../core/infra/BaseController';
import { EditProjectUseCase } from './EditProjectUseCase';

export class EditProjectController extends BaseController {
  private readonly useCase: EditProjectUseCase;

  constructor(useCase: EditProjectUseCase) {
    super();
    this.useCase = useCase;
  }

  async executeImpl() {
    const id = this.req.params.id;
    const content = JSON.parse(this.req.body.content);
    const { name, client_id, category_id, deletedPhotosIds, editedPhotos } = content;
    const images = this.req.files.images as UploadedFile[];

    try {
      const addedPhotos = content.photos.reduce((acc, p) => {
        acc.push({ order: p.order, image: images.find((i) => i.name === p.image) });
        return acc;
      }, []);
      const result = await this.useCase.execute({
        id,
        update: {
          category_id,
          client_id,
          name,
          deletedPhotosIds,
          editedPhotos,
          addedPhotos,
        },
      });

      if (result.isLeft()) {
        const error = result.value.getValue();

        switch (error.type) {
          case 'VALIDATION_ERRORS':
            return this.invalidEntity(error.error);
          case 'EDIT_PROJECT_ERROR':
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
