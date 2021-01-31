import { clientService } from '../../services';
import { EditClientController } from './EditClientController';
import { EditClientUseCase } from './EditClientUseCase';

const editClientUseCase = new EditClientUseCase(clientService);

const editClientController = new EditClientController(editClientUseCase);

export { editClientController };
