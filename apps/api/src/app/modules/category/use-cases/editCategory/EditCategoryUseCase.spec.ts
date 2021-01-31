import { Category, CategoryProps } from '@mj-website/api-interfaces';
import * as Faker from 'faker';
import { CategoryRepository } from '../../domain/CategoryRepository';
import { CategoryValidator } from '../../domain/CategoryValidator';
import { FakeCategoryRepository } from '../../persistance/FakeCategoryRepository';
import { CategoryService } from '../../services/CategoryService';
import { EditCategoryUseCase } from './EditCategoryUseCase';

let categoryService: CategoryService;
let useCase: EditCategoryUseCase;

describe('EditCategoryUseCase', () => {
  beforeEach(() => {
    const fakeCategoryRepo: CategoryRepository = new FakeCategoryRepository();
    const categoryValidator: CategoryValidator = new CategoryValidator();

    categoryService = new CategoryService(fakeCategoryRepo);
    useCase = new EditCategoryUseCase(categoryService, categoryValidator);
  });

  it('Should be able to edit category', async () => {
    let errorOccurred = false;

    const category: CategoryProps = {
      name: Faker.name.firstName(),
      children: [],
      cover: {
        id: 'anId',
        name: Faker.name.firstName(),
        path: Faker.system.filePath(),
        mimeType: Faker.system.commonFileExt(),
        type: 'PHOTO',
      },
    };

    const modifyCategory: CategoryProps = {
      name: Faker.name.firstName(),
      children: [],
      cover: {
        id: 'anId',
        name: Faker.name.firstName(),
        path: Faker.system.filePath(),
        mimeType: Faker.system.commonFileExt(),
        type: 'PHOTO',
      },
    };

    try {
      const addedCategoryResult = await categoryService.add(category);
      expect(addedCategoryResult.isSuccess).toBeTruthy();

      const result = await useCase.execute({ id: addedCategoryResult.getValue().id, update: modifyCategory });

      expect(result.isRight).toBeTruthy();

      const collection = await categoryService.getAll();
      expect(collection.getValue().length).toEqual(1);

      const modifiedCategory = <Category>result.value.getValue();
      expect(modifiedCategory).toEqual({ ...(<Category>addedCategoryResult.getValue()), ...modifyCategory });
    } catch (err) {
      errorOccurred = true;
    }

    expect(errorOccurred).toBeFalsy();
  });
});
