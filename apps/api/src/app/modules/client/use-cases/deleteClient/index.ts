import { clientService } from '../../services';
import { DeleteClientController } from './DeleteClientController';
import { DeleteClientUseCase } from './DeleteClientUseCase';

const deleteClientUseCase = new DeleteClientUseCase(clientService);

const deleteClientController = new DeleteClientController(deleteClientUseCase);

export { deleteClientController };
