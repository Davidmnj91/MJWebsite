import { clientService } from '../../services';
import { RetrieveClientsController } from './RetrieveClientsController';
import { RetrieveClientsUseCase } from './RetrieveClientsUseCase';

const retrieveClientsUseCase = new RetrieveClientsUseCase(clientService);

const retrieveClientsController = new RetrieveClientsController(retrieveClientsUseCase);

export { retrieveClientsController };
