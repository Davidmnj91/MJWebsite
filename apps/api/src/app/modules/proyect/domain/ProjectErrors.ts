import { Project } from '@mj-website/api-interfaces';
import { Result } from '@mj-website/monads';
import { DomainError } from '../../../core/domain/DomainError';
import { ValidationErrors } from '../../../core/domain/ModelValidator';

export type ProjectErrors =
  | { type: 'VALIDATION_ERRORS'; error: ValidationErrors<Project> }
  | { type: 'ADD_PROJECT_ERROR'; error: DomainError }
  | { type: 'EDIT_PROJECT_ERROR'; error: DomainError }
  | { type: 'DELETE_PROJECT_ERROR'; error: DomainError }
  | { type: 'FIND_PROJECT_ERROR'; error: DomainError };

const createInvalidProjectError = (errors: ValidationErrors<Project>): Result<ProjectErrors> => {
  return Result.fail({ type: 'VALIDATION_ERRORS', error: errors });
};

const createAddProjectError = (error): Result<ProjectErrors> => {
  return Result.fail<ProjectErrors>({
    type: 'ADD_PROJECT_ERROR',
    message: 'Cannot add Project',
    error,
  });
};

const createEditProjectError = (error): Result<ProjectErrors> => {
  return Result.fail<ProjectErrors>({
    type: 'EDIT_PROJECT_ERROR',
    message: 'Cannot edit Project',
    error,
  });
};

const createDeleteProjectError = (error): Result<ProjectErrors> => {
  return Result.fail<ProjectErrors>({
    type: 'DELETE_PROJECT_ERROR',
    message: 'Cannot remove Project',
    error,
  });
};

const createFindProjectError = (error): Result<ProjectErrors> => {
  return Result.fail<ProjectErrors>({
    type: 'FIND_PROJECT_ERROR',
    message: 'Cannot find Project',
    error,
  });
};

export const ProjectErrors = {
  createInvalidProjectError,
  createAddProjectError,
  createEditProjectError,
  createDeleteProjectError,
  createFindProjectError,
};
