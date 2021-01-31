import { Router } from 'express';
import { authGuardMiddleware } from '../../auth/use-cases/guard';
import { createAddMediaController } from '../use-cases/addMedia';
import { deleteMediaController } from '../use-cases/deleteMedia';
import { editMediaController } from '../use-cases/editMedia';
import { pageMediaController } from '../use-cases/pageMedia';
import { retrieveMediaController } from '../use-cases/retrieveMedia';
import { retrieveMediaByIdController } from '../use-cases/retrieveMediaById';

const mediaRouter: Router = Router();

mediaRouter.get('/:id', (req, res) => retrieveMediaByIdController.execute(req, res));
mediaRouter.post('/list', (req, res) => retrieveMediaController.execute(req, res));
mediaRouter.post('/paged', (req, res) => pageMediaController.execute(req, res));
mediaRouter.post('/', (req, res) => createAddMediaController.execute(req, res));
mediaRouter.put('/:id', authGuardMiddleware.execute, (req, res) => editMediaController.execute(req, res));
mediaRouter.delete('/:id', authGuardMiddleware.execute, (req, res) => deleteMediaController.execute(req, res));

export { mediaRouter };
