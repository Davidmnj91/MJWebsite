import { PaginationResponse, Project, ProjectProps } from '@mj-website/api-interfaces';
import * as Faker from 'faker';
import { ProjectRepository } from '../../domain/ProjectRepository';
import { FakeProjectRepository } from '../../persistance/FakeProjectRepository';
import { ProjectService } from '../../services/ProjectService';
import { PageCategoriesUseCase, PageProjectCommand } from './PageCategoriesUseCase';

let projectService: ProjectService;
let useCase: PageCategoriesUseCase;

describe('PageCategoriesUseCase', () => {
  beforeEach(() => {
    const fakeProjectRepo: ProjectRepository = new FakeProjectRepository();

    projectService = new ProjectService(fakeProjectRepo);
    useCase = new PageCategoriesUseCase(projectService);
  });

  it('Should be able to page categories', async () => {
    let errorOccurred = false;

    const categories: ProjectProps[] = [...Array(100)].map((_) => ({
      name: Faker.name.firstName(),
      cover: undefined,
      children: [],
    }));

    try {
      const addedCategories = await Promise.all(categories.map((c) => projectService.add(c)));

      expect(addedCategories.every((r) => r.isSuccess)).toBeTruthy();

      const command: PageProjectCommand = {
        query: undefined,
        pagination: { count: 20, page: 2 },
      };

      const result = await useCase.execute(command);

      expect(result.isRight).toBeTruthy();

      const pagedCategories = <PaginationResponse<Project>>result.value.getValue();

      expect(pagedCategories.records.length).toEqual(20);
      expect(pagedCategories.total).toEqual(100);
      expect(pagedCategories.page).toEqual(2);
      expect(pagedCategories.count).toEqual(20);
    } catch (err) {
      errorOccurred = true;
    }

    expect(errorOccurred).toBeFalsy();
  });
});
