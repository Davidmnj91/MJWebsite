import { mediaService } from '../../../media/services';
import { DeleteMediaController } from './DeleteMediaController';
import { DeleteMediaUseCase } from './DeleteMediaUseCase';

const deleteMediaUseCase = new DeleteMediaUseCase(mediaService);

const deleteMediaController = new DeleteMediaController(deleteMediaUseCase);

export { deleteMediaController };
