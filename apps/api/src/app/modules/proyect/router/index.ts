import { Router } from 'express';
import { authGuardMiddleware } from '../../auth/use-cases/guard';
import { addProjectController } from '../use-cases/addProject';
import { deleteProjectController } from '../use-cases/deleteProject';
import { editProjectController } from '../use-cases/editProject';
import { pageProjectsController } from '../use-cases/pageProjects';
import { retrieveProjectByIdController } from '../use-cases/retrieveProjectById';
import { retrieveProjectsController } from '../use-cases/retrieveProjects';

const projectRouter: Router = Router();

projectRouter.get('/:id', (req, res) => retrieveProjectByIdController.execute(req, res));
projectRouter.post('/list', (req, res) => retrieveProjectsController.execute(req, res));
projectRouter.post('/paged', (req, res) => pageProjectsController.execute(req, res));
projectRouter.post('/', (req, res) => addProjectController.execute(req, res));
projectRouter.put('/:id', authGuardMiddleware.execute, (req, res) => editProjectController.execute(req, res));
projectRouter.delete('/:id', authGuardMiddleware.execute, (req, res) => deleteProjectController.execute(req, res));

export { projectRouter };
