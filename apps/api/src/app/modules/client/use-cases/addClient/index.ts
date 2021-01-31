import { clientService } from '../../services';
import { CreateClientController } from './AddClientController';
import { AddClientUseCase } from './AddClientUseCase';

const addClientUseCase = new AddClientUseCase(clientService);

const createAddClientController = new CreateClientController(addClientUseCase);

export { createAddClientController };
