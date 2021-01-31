import { Category, CategoryProps } from '@mj-website/api-interfaces';
import * as Faker from 'faker';
import { CategoryRepository } from '../../domain/CategoryRepository';
import { FakeCategoryRepository } from '../../persistance/FakeCategoryRepository';
import { CategoryService } from '../../services/CategoryService';
import { RetrieveCategoryByIdUseCase } from './RetrieveCategoryByIdUseCase';

let categoryService: CategoryService;
let useCase: RetrieveCategoryByIdUseCase;

describe('RetrieveCategoryByIdUseCase', () => {
  beforeEach(() => {
    const fakeCategoryRepo: CategoryRepository = new FakeCategoryRepository();

    categoryService = new CategoryService(fakeCategoryRepo);
    useCase = new RetrieveCategoryByIdUseCase(categoryService);
  });

  it('Should be able to find category by id', async () => {
    let errorOccurred = false;

    const category: CategoryProps = {
      name: Faker.name.firstName(),
      cover: undefined,
    };
    try {
      const addedCategoryResult = await categoryService.add(category);
      expect(addedCategoryResult.isSuccess).toBeTruthy();

      const result = await useCase.execute(addedCategoryResult.getValue().id);

      expect(result.isRight).toBeTruthy();

      const collection = await categoryService.getAll();
      expect(collection.getValue().length).toEqual(1);

      const addedCategory = <Category>result.value.getValue();
      expect(addedCategoryResult.getValue()).toEqual(addedCategory);
    } catch (err) {
      errorOccurred = true;
    }

    expect(errorOccurred).toBeFalsy();
  });
});
