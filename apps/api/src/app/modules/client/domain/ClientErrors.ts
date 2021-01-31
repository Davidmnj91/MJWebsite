import { Client } from '@mj-website/api-interfaces';
import { Result } from '@mj-website/monads';
import { DomainError } from '../../../core/domain/DomainError';
import { ValidationErrors } from '../../../core/domain/ModelValidator';

export type ClientErrors =
  | { type: 'VALIDATION_ERRORS'; error: ValidationErrors<Client> }
  | { type: 'ADD_CLIENT_ERROR'; error: DomainError }
  | { type: 'EDIT_CLIENT_ERROR'; error: DomainError }
  | { type: 'DELETE_CLIENT_ERROR'; error: DomainError }
  | { type: 'FIND_CLIENT_ERROR'; error: DomainError };

const createInvalidClientError = (errors: ValidationErrors<Client>): Result<ClientErrors> => {
  return Result.fail({ type: 'VALIDATION_ERRORS', error: errors });
};

const createAddClientError = (error): Result<ClientErrors> => {
  return Result.fail<ClientErrors>({
    type: 'ADD_CLIENT_ERROR',
    message: 'Cannot add Client',
    error,
  });
};

const createEditClientError = (error): Result<ClientErrors> => {
  return Result.fail<ClientErrors>({
    type: 'EDIT_CLIENT_ERROR',
    message: 'Cannot edit Client',
    error,
  });
};

const createDeleteClientError = (error): Result<ClientErrors> => {
  return Result.fail<ClientErrors>({
    type: 'DELETE_CLIENT_ERROR',
    message: 'Cannot remove Client',
    error,
  });
};

const createFindClientError = (error): Result<ClientErrors> => {
  return Result.fail<ClientErrors>({
    type: 'FIND_CLIENT_ERROR',
    message: 'Cannot find Client',
    error,
  });
};

export const ClientErrors = {
  createInvalidClientError,
  createAddClientError,
  createEditClientError,
  createDeleteClientError,
  createFindClientError,
};
