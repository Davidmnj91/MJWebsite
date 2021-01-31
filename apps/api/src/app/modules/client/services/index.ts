import { clientRepository } from '../persistance';
import { ClientService } from './ClientService';

const clientService = new ClientService(clientRepository);

export { clientService };
