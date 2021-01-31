import { AuthProps } from '@mj-website/api-interfaces';
import { Result } from '@mj-website/monads';
import { DomainError } from '../../../core/domain/DomainError';
import { ValidationErrors } from '../../../core/domain/ModelValidator';

export type AuthErrors =
  | { type: 'VALIDATION_ERRORS'; error: ValidationErrors<AuthProps> }
  | { type: 'GENERATE_TOKEN_ERROR'; error: DomainError }
  | { type: 'CHECK_TOKEN_ERROR'; error: DomainError };

const createInvalidAuthCodeError = (errors: ValidationErrors<AuthProps>): Result<AuthErrors> => {
  return Result.fail({ type: 'VALIDATION_ERRORS', error: errors });
};

const createTokenError = (error): Result<AuthErrors> => {
  return Result.fail<AuthErrors>({
    type: 'GENERATE_TOKEN_ERROR',
    message: 'Error while generating token',
    error,
  });
};

const checkTokenError = (error): Result<AuthErrors> => {
  return Result.fail<AuthErrors>({
    type: 'CHECK_TOKEN_ERROR',
    message: 'Error while checking token',
    error,
  });
};

export const AuthErrors = {
  createInvalidAuthCodeError,
  createTokenError,
  checkTokenError,
};
