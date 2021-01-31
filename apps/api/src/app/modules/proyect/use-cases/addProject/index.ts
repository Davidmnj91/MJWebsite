import { categoryRepository } from '../../../category/persistance';
import { clientRepository } from '../../../client/persistance';
import { mediaService } from '../../../media/services';
import { projectRepository } from '../../persistance';
import { AddProjectController } from './AddProjectController';
import { AddProjectUseCase } from './AddProjectUseCase';

const addProjectUseCase = new AddProjectUseCase(clientRepository, categoryRepository, mediaService, projectRepository);

const addProjectController = new AddProjectController(addProjectUseCase);

export { addProjectController };
