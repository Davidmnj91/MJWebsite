import { Result } from '@mj-website/monads';
import { ObjectSchema, ValidationError } from 'yup';

export type ValidationErrorProps<T> = { [P in keyof T]?: string };

export type ValidationErrors<T> = {
  errors: ValidationErrorProps<T>;
};

export const createValidationErrors = <T>(errors: ValidationErrorProps<T>): ValidationErrors<T> => ({
  errors,
});

export interface Validator<T> {
  validate(model: T): Promise<Result<ValidationErrors<T>>>;
}

export abstract class ModelValidator<T> implements Validator<T> {
  protected abstract get schema(): ObjectSchema<any>;

  async validate(model: T): Promise<Result<ValidationErrors<T>>> {
    try {
      await this.schema.validate(model, { abortEarly: false });
      return Result.ok();
    } catch (error) {
      const validationErrors = (<ValidationError>error).inner.reduce((acc, e) => {
        return { ...acc, [e.path]: e.message };
      }, {});
      return Result.fail(createValidationErrors(validationErrors));
    }
  }
}
