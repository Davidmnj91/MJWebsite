import { projectService } from '../../services';
import { EditProjectController } from './EditProjectController';
import { EditProjectUseCase } from './EditProjectUseCase';

const editProjectUseCase = new EditProjectUseCase(projectService);

const editProjectController = new EditProjectController(editProjectUseCase);

export { editProjectController };
