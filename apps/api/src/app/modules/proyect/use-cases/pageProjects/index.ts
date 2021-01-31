import { projectService } from '../../services';
import { PageProjectsController } from './PageProjectsController';
import { PageProjectsUseCase } from './PageProjectsUseCase';

const pageProjectsUseCase = new PageProjectsUseCase(projectService);

const pageProjectsController = new PageProjectsController(pageProjectsUseCase);

export { pageProjectsController };
