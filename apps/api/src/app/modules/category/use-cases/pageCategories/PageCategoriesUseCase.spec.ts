import { Category, CategoryProps, PaginationResponse } from '@mj-website/api-interfaces';
import * as Faker from 'faker';
import { CategoryRepository } from '../../domain/CategoryRepository';
import { FakeCategoryRepository } from '../../persistance/FakeCategoryRepository';
import { CategoryService } from '../../services/CategoryService';
import { PageCategoriesUseCase, PageCategoryCommand } from './PageCategoriesUseCase';

let categoryService: CategoryService;
let useCase: PageCategoriesUseCase;

describe('PageCategoriesUseCase', () => {
  beforeEach(() => {
    const fakeCategoryRepo: CategoryRepository = new FakeCategoryRepository();

    categoryService = new CategoryService(fakeCategoryRepo);
    useCase = new PageCategoriesUseCase(categoryService);
  });

  it('Should be able to page categories', async () => {
    let errorOccurred = false;

    const categories: CategoryProps[] = [...Array(100)].map((_) => ({
      name: Faker.name.firstName(),
      cover: undefined,
      children: [],
    }));

    try {
      const addedCategories = await Promise.all(categories.map((c) => categoryService.add(c)));

      expect(addedCategories.every((r) => r.isSuccess)).toBeTruthy();

      const command: PageCategoryCommand = {
        query: undefined,
        pagination: { count: 20, page: 2 },
      };

      const result = await useCase.execute(command);

      expect(result.isRight).toBeTruthy();

      const pagedCategories = <PaginationResponse<Category>>result.value.getValue();

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
