import { Project, ProjectProps } from '@mj-website/api-interfaces';
import * as Faker from 'faker';
import { ProjectRepository } from '../../domain/ProjectRepository';
import { ProjectValidator } from '../../domain/ProjectValidator';
import { FakeProjectRepository } from '../../persistance/FakeProjectRepository';
import { ProjectService } from '../../services/ProjectService';
import { EditProjectUseCase } from './EditProjectUseCase';

let projectService: ProjectService;
let useCase: EditProjectUseCase;

describe('EditProjectUseCase', () => {
  beforeEach(() => {
    const fakeProjectRepo: ProjectRepository = new FakeProjectRepository();
    const projectValidator: ProjectValidator = new ProjectValidator();

    projectService = new ProjectService(fakeProjectRepo);
    useCase = new EditProjectUseCase(projectService, projectValidator);
  });

  it('Should be able to edit project', async () => {
    let errorOccurred = false;

    const project: ProjectProps = {
      name: Faker.name.firstName(),
      description: Faker.name.lastName(),
    };

    const modifyProject: ProjectProps = {
      name: Faker.name.firstName(),
      description: Faker.name.lastName(),
    };

    try {
      const addedProjectResult = await projectService.add(project);
      expect(addedProjectResult.isSuccess).toBeTruthy();

      const result = await useCase.execute({ id: addedProjectResult.getValue().id, update: modifyProject });

      expect(result.isRight).toBeTruthy();

      const collection = await projectService.getAll();
      expect(collection.getValue().length).toEqual(1);

      const modifiedProject = <Project>result.value.getValue();
      expect(modifiedProject).toEqual({ ...(<Project>addedProjectResult.getValue()), ...modifyProject });
    } catch (err) {
      errorOccurred = true;
    }

    expect(errorOccurred).toBeFalsy();
  });
});
