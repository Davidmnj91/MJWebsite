import { clientService } from '../../services';
import { RetrieveClientByIdController } from './RetrieveClientByIdController';
import { RetrieveClientByIdUseCase } from './RetrieveClientByIdUseCase';

const retrieveClientByIdUseCase = new RetrieveClientByIdUseCase(clientService);

const retrieveClientByIdController = new RetrieveClientByIdController(retrieveClientByIdUseCase);

export { retrieveClientByIdController };
