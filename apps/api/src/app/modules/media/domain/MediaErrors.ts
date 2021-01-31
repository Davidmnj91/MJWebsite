import { MediaProps } from '@mj-website/api-interfaces';
import { Result } from '@mj-website/monads';
import { DomainError } from '../../../core/domain/DomainError';
import { ValidationErrors } from '../../../core/domain/ModelValidator';

export type MediaErrors =
  | { type: 'VALIDATION_ERRORS'; error: ValidationErrors<MediaProps> }
  | { type: 'SAVE_MEDIA_ERROR'; error: DomainError }
  | { type: 'EDIT_MEDIA_ERROR'; error: DomainError }
  | { type: 'FIND_MEDIA_ERROR'; error: DomainError }
  | { type: 'DELETE_MEDIA_ERROR'; error: DomainError }
  | { type: 'WRITE_MEDIA_ERROR'; error: DomainError }
  | { type: 'READ_MEDIA_ERROR'; error: DomainError }
  | { type: 'UNLINK_MEDIA_ERROR'; error: DomainError };

const createInvalidMediaError = (errors: ValidationErrors<MediaProps>): Result<MediaErrors> => {
  return Result.fail({ type: 'VALIDATION_ERRORS', error: errors });
};

const createSaveMediaError = (error): Result<MediaErrors> => {
  return Result.fail<MediaErrors>({
    type: 'SAVE_MEDIA_ERROR',
    message: 'Error while saving media',
    error,
  });
};

const createEditMediaError = (error): Result<MediaErrors> => {
  return Result.fail<MediaErrors>({
    type: 'EDIT_MEDIA_ERROR',
    message: 'Error while editing media',
    error,
  });
};

const createFindMediaError = (error): Result<MediaErrors> => {
  return Result.fail<MediaErrors>({
    type: 'FIND_MEDIA_ERROR',
    message: 'Error while finding media',
    error,
  });
};

const createDeleteMediaError = (error): Result<MediaErrors> => {
  return Result.fail<MediaErrors>({
    type: 'DELETE_MEDIA_ERROR',
    message: 'Error while saving media',
    error,
  });
};

const createWriteMediaError = (error): Result<MediaErrors> => {
  return Result.fail<MediaErrors>({
    type: 'WRITE_MEDIA_ERROR',
    message: 'Error while writing media file',
    error,
  });
};

const createReadMediaError = (error): Result<MediaErrors> => {
  return Result.fail<MediaErrors>({
    type: 'READ_MEDIA_ERROR',
    message: 'Error while reading media file',
    error,
  });
};

const createUnlinkMediaError = (error): Result<MediaErrors> => {
  return Result.fail<MediaErrors>({
    type: 'UNLINK_MEDIA_ERROR',
    message: 'Error while deleting media file',
    error,
  });
};

export const MediaErrors = {
  createInvalidMediaError,
  createSaveMediaError,
  createEditMediaError,
  createFindMediaError,
  createDeleteMediaError,
  createWriteMediaError,
  createReadMediaError,
  createUnlinkMediaError,
};
