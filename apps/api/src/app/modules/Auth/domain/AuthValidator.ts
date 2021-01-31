import { AuthProps } from '@mj-website/api-interfaces';
import { totp } from 'otplib';
import * as Yup from 'yup';
import { ModelValidator } from '../../../core/domain/ModelValidator';

class AuthValidator extends ModelValidator<AuthProps> {
  protected readonly schema = Yup.object({
    auth_code: Yup.string().test('auth_code_validator', 'Auth code is not valid', (value) =>
      totp.check(value, process.env.AUTH_SECRET)
    ),
  });
}

export const authValidator = new AuthValidator();
