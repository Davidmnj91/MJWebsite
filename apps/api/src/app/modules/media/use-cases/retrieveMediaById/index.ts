import { mediaService } from '../../services';
import { RetrieveMediaByIdController } from './RetrieveMediaByIdController';
import { RetrieveMediaByIdUseCase } from './RetrieveMediaByIdUseCase';

const retrieveMediaByIdUseCase = new RetrieveMediaByIdUseCase(mediaService);

const retrieveMediaByIdController = new RetrieveMediaByIdController(retrieveMediaByIdUseCase);

export { retrieveMediaByIdController };
