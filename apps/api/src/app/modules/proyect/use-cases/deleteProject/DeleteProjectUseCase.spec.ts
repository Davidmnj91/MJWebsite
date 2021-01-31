import { ProjectProps } from '@mj-website/api-interfaces';
import * as Faker from 'faker';
import { ProjectRepository } from '../../domain/ProjectRepository';
import { FakeProjectRepository } from '../../persistance/FakeProjectRepository';
import { ProjectService } from '../../services/ProjectService';
import { DeleteProjectUseCase } from './DeleteProjectUseCase';

let projectService: ProjectService;
let useCase: DeleteProjectUseCase;

describe('DeleteProjectUseCase', () => {
  beforeEach(() => {
    const fakeProjectRepo: ProjectRepository = new FakeProjectRepository();

    projectService = new ProjectService(fakeProjectRepo);
    useCase = new DeleteProjectUseCase(projectService);
  });

  it('Should be able to delete project', async () => {
    let errorOccurred = false;

    const project: ProjectProps = {
      name: Faker.name.firstName(),
      description: Faker.name.lastName(),
    };
    try {
      const addedProjectResult = await projectService.add(project);
      expect(addedProjectResult.isSuccess).toBeTruthy();

      const result = await useCase.execute(addedProjectResult.getValue().id);

      expect(result.isRight).toBeTruthy();

      const collection = await projectService.getAll();
      expect(collection.getValue().length).toEqual(0);

      const removedProject = <boolean>result.value.getValue();
      expect(removedProject).toBeTruthy();
    } catch (err) {
      errorOccurred = true;
    }

    expect(errorOccurred).toBeFalsy();
  });
});
