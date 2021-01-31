import { projectService } from '../../services';
import { DeleteProjectController } from './DeleteProjectController';
import { DeleteProjectUseCase } from './DeleteProjectUseCase';

const deleteProjectUseCase = new DeleteProjectUseCase(projectService);

const deleteProjectController = new DeleteProjectController(deleteProjectUseCase);

export { deleteProjectController };
