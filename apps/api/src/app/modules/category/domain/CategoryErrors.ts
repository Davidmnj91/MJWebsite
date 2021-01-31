import { Category } from '@mj-website/api-interfaces';
import { Result } from '@mj-website/monads';
import { DomainError } from '../../../core/domain/DomainError';
import { ValidationErrors } from '../../../core/domain/ModelValidator';

export type CategoryErrors =
  | { type: 'VALIDATION_ERRORS'; error: ValidationErrors<Category> }
  | { type: 'ADD_CATEGORY_ERROR'; error: DomainError }
  | { type: 'EDIT_CATEGORY_ERROR'; error: DomainError }
  | { type: 'DELETE_CATEGORY_ERROR'; error: DomainError }
  | { type: 'FIND_CATEGORY_ERROR'; error: DomainError };

const createInvalidCategoryError = (errors: ValidationErrors<Category>): Result<CategoryErrors> => {
  return Result.fail({ type: 'VALIDATION_ERRORS', error: errors });
};

const createAddCategoryError = (error): Result<CategoryErrors> => {
  return Result.fail<CategoryErrors>({
    type: 'ADD_CATEGORY_ERROR',
    message: 'Cannot add Category',
    error,
  });
};

const createEditCategoryError = (error): Result<CategoryErrors> => {
  return Result.fail<CategoryErrors>({
    type: 'EDIT_CATEGORY_ERROR',
    message: 'Cannot edit Category',
    error,
  });
};

const createDeleteCategoryError = (error): Result<CategoryErrors> => {
  return Result.fail<CategoryErrors>({
    type: 'DELETE_CATEGORY_ERROR',
    message: 'Cannot remove Category',
    error,
  });
};

const createFindCategoryError = (error): Result<CategoryErrors> => {
  return Result.fail<CategoryErrors>({
    type: 'FIND_CATEGORY_ERROR',
    message: 'Cannot find Category',
    error,
  });
};

export const CategoryErrors = {
  createInvalidCategoryError,
  createAddCategoryError,
  createEditCategoryError,
  createDeleteCategoryError,
  createFindCategoryError,
};
