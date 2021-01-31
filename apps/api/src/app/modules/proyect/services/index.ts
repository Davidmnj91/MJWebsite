import { projectRepository } from '../persistance';
import { ProjectService } from './ProjectService';

const projectService = new ProjectService(projectRepository);

export { projectService };
