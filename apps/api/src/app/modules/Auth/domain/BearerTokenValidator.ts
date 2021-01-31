import * as Yup from 'yup';
import { ModelValidator } from '../../../core/domain/ModelValidator';

export type BearerTokenProps = {
  bearerToken: string;
};

class BearerTokenValidator extends ModelValidator<BearerTokenProps> {
  readonly schema = Yup.object({
    bearerToken: Yup.string().matches(
      /^Bearer\s[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/,
      'Token must be of type bearer token'
    ),
  });
}

export const bearerTokenValidator = new BearerTokenValidator();
