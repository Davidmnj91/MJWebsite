import { mediaPersistenceService } from '../../services';
import { RetrieveMediaController } from './RetrieveMediaController';
import { RetrieveMediaUseCase } from './RetrieveMediaUseCase';

const retrieveMediaUseCase = new RetrieveMediaUseCase(mediaPersistenceService);

const retrieveMediaController = new RetrieveMediaController(retrieveMediaUseCase);

export { retrieveMediaController };
