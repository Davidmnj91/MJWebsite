import { clientService } from '../../services';
import { PageClientsController } from './PageClientsController';
import { PageClientsUseCase } from './PageClientsUseCase';

const pageClientsUseCase = new PageClientsUseCase(clientService);

const pageClientsController = new PageClientsController(pageClientsUseCase);

export { pageClientsController };
