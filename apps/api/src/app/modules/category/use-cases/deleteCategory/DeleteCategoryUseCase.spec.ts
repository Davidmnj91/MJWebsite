import { CategoryProps } from '@mj-website/api-interfaces';
import * as Faker from 'faker';
import * as td from 'testdouble';
import { MediaService } from '../../../media/services/MediaService';
import { CategoryRepository } from '../../domain/CategoryRepository';
import { FakeCategoryRepository } from '../../persistance/FakeCategoryRepository';
import { CategoryService } from '../../services/CategoryService';
import { DeleteCategoryUseCase } from './DeleteCategoryUseCase';

let categoryService: CategoryService;
let useCase: DeleteCategoryUseCase;

describe('DeleteCategoryUseCase', () => {
  beforeEach(() => {
    const fakeCategoryRepo: CategoryRepository = new FakeCategoryRepository();

    categoryService = new CategoryService(fakeCategoryRepo);
    useCase = new DeleteCategoryUseCase(categoryService, td.object<MediaService>());
  });

  it('Should be able to delete category', async () => {
    let errorOccurred = false;

    const category: CategoryProps = {
      name: Faker.name.firstName(),
      children: [],
      cover: undefined,
    };
    try {
      const addedCategoryResult = await categoryService.add(category);
      expect(addedCategoryResult.isSuccess).toBeTruthy();

      const result = await useCase.execute(addedCategoryResult.getValue().id);

      expect(result.isRight).toBeTruthy();

      const collection = await categoryService.getAll();
      expect(collection.getValue().length).toEqual(0);

      const removedCategory = <boolean>result.value.getValue();
      expect(removedCategory).toBeTruthy();
    } catch (err) {
      errorOccurred = true;
    }

    expect(errorOccurred).toBeFalsy();
  });
});
