import { projectService } from '../../services';
import { RetrieveProjectByIdController } from './RetrieveProjectByIdController';
import { RetrieveProjectByIdUseCase } from './RetrieveProjectByIdUseCase';

const retrieveProjectByIdUseCase = new RetrieveProjectByIdUseCase(projectService);

const retrieveProjectByIdController = new RetrieveProjectByIdController(retrieveProjectByIdUseCase);

export { retrieveProjectByIdController };
