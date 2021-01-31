import { totp } from 'otplib';
import { createValidationErrors } from '../../../core/domain/ModelValidator';
import { AuthValidator } from './AuthValidator';
describe('Auth Validator Test', () => {
  const authValidator = new AuthValidator();

  it('Auth code should be valid', async () => {
    totp.check = jest.fn().mockReturnValue(true);
    const auth_code = '456789';

    const result = await authValidator.validate({ auth_code, state: '' });
    expect(result.isSuccess).toBeTruthy();
  });
  it('Auth code should not be valid', async () => {
    totp.check = jest.fn().mockReturnValue(false);
    const auth_code = '456789';

    const result = await authValidator.validate({ auth_code, state: '' });
    expect(result.isFailure).toBeTruthy();
    expect(result.getValue()).toEqual(createValidationErrors({ auth_code: 'Auth code is not valid' }));
  });
});
