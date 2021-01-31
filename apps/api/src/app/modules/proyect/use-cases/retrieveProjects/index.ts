import { projectService } from '../../services';
import { RetrieveProjectsController } from './RetrieveProjectsController';
import { RetrieveProjectsUseCase } from './RetrieveProjectsUseCase';

const retrieveProjectsUseCase = new RetrieveProjectsUseCase(projectService);

const retrieveProjectsController = new RetrieveProjectsController(retrieveProjectsUseCase);

export { retrieveProjectsController };
