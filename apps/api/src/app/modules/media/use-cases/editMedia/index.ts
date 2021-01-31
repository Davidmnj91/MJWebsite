import { mediaService } from '../../services';
import { EditMediaController } from './EditMediaController';
import { EditMediaUseCase } from './EditMediaUseCase';

const editMediaUseCase = new EditMediaUseCase(mediaService);

const editMediaController = new EditMediaController(editMediaUseCase);

export { editMediaController };
