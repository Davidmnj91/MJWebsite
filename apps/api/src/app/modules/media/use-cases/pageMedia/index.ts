import { mediaPersistenceService } from '../../services';
import { PageMediaController } from './PageMediaController';
import { PageMediaUseCase } from './PageMediaUseCase';

const pageMediaUseCase = new PageMediaUseCase(mediaPersistenceService);

const pageMediaController = new PageMediaController(pageMediaUseCase);

export { pageMediaController };
