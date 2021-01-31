import { Category } from '@mj-website/api-interfaces';
import * as Faker from 'faker';
import * as td from 'testdouble';
import { MediaService } from '../../../media/services/MediaService';
import { CategoryRepository } from '../../domain/CategoryRepository';
import { CategoryValidator } from '../../domain/CategoryValidator';
import { FakeCategoryRepository } from '../../persistance/FakeCategoryRepository';
import { CategoryService } from '../../services/CategoryService';
import { AddCategoryCommand, AddCategoryUseCase } from './AddCategoryUseCase';

let categoryService: CategoryService;
let useCase: AddCategoryUseCase;

xdescribe('AddCategoryUseCase', () => {
  beforeEach(() => {
    const fakeCategoryService: CategoryRepository = new FakeCategoryRepository();
    const fakeMediaService: MediaService = td.object<MediaService>();
    const categoryValidator: CategoryValidator = new CategoryValidator();

    categoryService = new CategoryService(fakeCategoryService);
    useCase = new AddCategoryUseCase(categoryValidator, categoryService, fakeMediaService);
  });

  it('Should be able to add category use case', async () => {
    let errorOccurred = false;

    const category: AddCategoryCommand = {
      name: Faker.name.firstName(),
      children: [],
      cover: undefined,
    };
    try {
      let collection = await categoryService.getAll();
      expect(collection.getValue().length).toEqual(0);

      const result = await useCase.execute(category);

      expect(result.isRight).toBeTruthy();

      collection = await categoryService.getAll();
      expect(collection.getValue().length).toEqual(1);

      const addedCategory = <Category>result.value.getValue();
      const found = await categoryService.findById(addedCategory.id);
      expect(found.getValue()).toEqual(addedCategory);
    } catch (err) {
      errorOccurred = true;
    }

    expect(errorOccurred).toBeFalsy();
  });
});
