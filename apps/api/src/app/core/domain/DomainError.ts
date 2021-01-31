import { TypedError } from './TypedError';

export interface DomainError extends TypedError {
  message: string;
  error?: any;
}
