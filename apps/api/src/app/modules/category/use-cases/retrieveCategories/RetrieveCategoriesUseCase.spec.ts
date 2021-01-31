import { Category, CategoryProps } from '@mj-website/api-interfaces';
import * as Faker from 'faker';
import { CategoryRepository } from '../../domain/CategoryRepository';
import { FakeCategoryRepository } from '../../persistance/FakeCategoryRepository';
import { CategoryService } from '../../services/CategoryService';
import { RetrieveCategoriesCommand, RetrieveCategoriesUseCase } from './RetrieveCategoriesUseCase';

let categoryService: CategoryService;
let useCase: RetrieveCategoriesUseCase;

describe('RetrieveCategoriesUseCase', () => {
  beforeEach(() => {
    const fakeCategoryRepo: CategoryRepository = new FakeCategoryRepository();

    categoryService = new CategoryService(fakeCategoryRepo);
    useCase = new RetrieveCategoriesUseCase(categoryService);
  });

  it('Should be able to retrieve categories', async () => {
    let errorOccurred = false;

    const categories: CategoryProps[] = [...Array(100)].map((_) => ({
      name: Faker.name.firstName(),
      cover: undefined,
    }));

    try {
      const addedCategories = await Promise.all(categories.map((c) => categoryService.add(c)));

      expect(addedCategories.every((r) => r.isSuccess)).toBeTruthy();

      const command: RetrieveCategoriesCommand = undefined;

      const result = await useCase.execute(command);

      expect(result.isRight).toBeTruthy();

      const retrievedCategories = <Category[]>result.value.getValue();

      expect(retrievedCategories.length).toEqual(100);
    } catch (err) {
      errorOccurred = true;
    }

    expect(errorOccurred).toBeFalsy();
  });
});
