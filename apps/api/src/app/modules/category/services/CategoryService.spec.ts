import { CategoryProps } from '@mj-website/api-interfaces';
import * as Faker from 'faker';
import { FakeCategoryRepository } from '../persistance/FakeCategoryRepository';
import { CategoryService } from './CategoryService';

describe('Category Repository Test', () => {
  const categoryRepository = new FakeCategoryRepository();
  const categoryService = new CategoryService(categoryRepository);

  beforeEach(() => {
    categoryRepository.clear();
  });

  it('should be able to add category', async () => {
    let errorOccurred = false;

    const categoryProps: CategoryProps = {
      name: Faker.name.firstName(),
      children: [],
      cover: undefined,
    };

    try {
      const addedCategoryResult = await categoryService.add(categoryProps);
      const addedCategory = addedCategoryResult.getValue();

      expect(addedCategoryResult.isSuccess).toBeTruthy();
      expect(addedCategory).toEqual({ ...addedCategory, ...categoryProps });
    } catch (err) {
      errorOccurred = true;
    }

    expect(errorOccurred).toBeFalsy();
  });

  it('should be able to edit category', async () => {
    let errorOccurred = false;

    const categoryProps: CategoryProps = {
      name: Faker.name.firstName(),
      children: [],
      cover: undefined,
    };

    const modifyCategory: CategoryProps = {
      name: Faker.name.firstName(),
      children: [],
      cover: undefined,
    };

    try {
      const addedCategoryResult = await categoryService.add(categoryProps);
      const addedCategory = addedCategoryResult.getValue();

      expect(addedCategoryResult.isSuccess).toBeTruthy();
      expect(addedCategory).toEqual({ ...addedCategory, ...categoryProps });

      const editedCategoryResult = await categoryService.edit(addedCategory.id, modifyCategory);
      const editedCategory = editedCategoryResult.getValue();

      expect(editedCategoryResult.isSuccess).toBeTruthy();
      expect(editedCategory).toEqual({ ...editedCategory, ...modifyCategory });
    } catch (err) {
      errorOccurred = true;
    }

    expect(errorOccurred).toBeFalsy();
  });

  it('should be able to edit category', async () => {
    let errorOccurred = false;

    const categoryProps: CategoryProps = {
      name: Faker.name.firstName(),
      children: [],
      cover: undefined,
    };

    const modifyCategory: CategoryProps = {
      name: Faker.name.firstName(),
      children: [],
      cover: undefined,
    };

    try {
      const addedCategoryResult = await categoryService.add(categoryProps);
      const addedCategory = addedCategoryResult.getValue();

      expect(addedCategoryResult.isSuccess).toBeTruthy();
      expect(addedCategory).toEqual({ ...addedCategory, ...categoryProps });

      const deletedCategoryResult = await categoryService.edit(addedCategory.id, modifyCategory);
      const deletedCategory = deletedCategoryResult.getValue();

      expect(deletedCategoryResult.isSuccess).toBeTruthy();
      expect(deletedCategory).toBeTruthy();
    } catch (err) {
      errorOccurred = true;
    }

    expect(errorOccurred).toBeFalsy();
  });

  it('should be able to retrieve category by id', async () => {
    let errorOccurred = false;

    const categoryProps: CategoryProps = {
      name: Faker.name.firstName(),
      children: [],
      cover: undefined,
    };

    try {
      const addedCategoryResult = await categoryService.add(categoryProps);
      const addedCategory = addedCategoryResult.getValue();

      expect(addedCategoryResult.isSuccess).toBeTruthy();
      expect(addedCategory).toEqual({ ...addedCategory, ...categoryProps });

      const retrievedCategoryResult = await categoryService.findById(addedCategory.id);
      const retrievedCategory = retrievedCategoryResult.getValue();

      expect(retrievedCategoryResult.isSuccess).toBeTruthy();
      expect(retrievedCategory).toEqual(addedCategory);
    } catch (err) {
      errorOccurred = true;
    }

    expect(errorOccurred).toBeFalsy();
  });

  it('should be able to get categories', async () => {
    let errorOccurred = false;

    const categories: CategoryProps[] = [...Array(10)].map((_) => ({
      name: Faker.name.firstName(),
      children: [],
      cover: undefined,
    }));

    try {
      const addedCategories = await Promise.all(categories.map((c) => categoryService.add(c)));

      expect(addedCategories.every((r) => r.isSuccess)).toBeTruthy();

      const retrievedCategoriesResult = await categoryService.getAll();
      const retrievedCategories = retrievedCategoriesResult.getValue();

      expect(retrievedCategoriesResult.isSuccess).toBeTruthy();
      expect(retrievedCategories.length).toEqual(categories.length);
    } catch (err) {
      errorOccurred = true;
    }

    expect(errorOccurred).toBeFalsy();
  });
});
