import { Router } from 'express';
import { authGuardMiddleware } from '../../auth/use-cases/guard';
import { createAddClientController } from '../use-cases/addClient';
import { deleteClientController } from '../use-cases/deleteClient';
import { editClientController } from '../use-cases/editClient';
import { pageClientsController } from '../use-cases/pageClients';
import { retrieveClientByIdController } from '../use-cases/retrieveClientById';
import { retrieveClientsController } from '../use-cases/retrieveClients';

const clientRouter: Router = Router();

clientRouter.get('/:id', (req, res) => retrieveClientByIdController.execute(req, res));
clientRouter.post('/list', (req, res) => retrieveClientsController.execute(req, res));
clientRouter.post('/paged', (req, res) => pageClientsController.execute(req, res));
clientRouter.post('/', (req, res) => createAddClientController.execute(req, res));
clientRouter.put('/:id', authGuardMiddleware.execute, (req, res) => editClientController.execute(req, res));
clientRouter.delete('/:id', authGuardMiddleware.execute, (req, res) => deleteClientController.execute(req, res));

export { clientRouter };
