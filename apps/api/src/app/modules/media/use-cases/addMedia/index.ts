import { mediaService } from '../../../media/services';
import { CreateMediaController } from './AddMediaController';
import { AddMediaUseCase } from './AddMediaUseCase';

const addMediaUseCase = new AddMediaUseCase(mediaService);

const createAddMediaController = new CreateMediaController(addMediaUseCase);

export { createAddMediaController };
