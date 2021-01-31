import { createValidationErrors } from '../../../core/domain/ModelValidator';
import { BearerTokenValidator } from './BearerTokenValidator';

describe('Bearer Token Validator Test', () => {
  const bearerTokenValidator = new BearerTokenValidator();
  test('Bearer Token should be valid', async () => {
    const bearerToken =
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
    const result = await bearerTokenValidator.validate({ bearerToken });
    expect(result.isSuccess).toBeTruthy();
  });
  test('Bearer Token should not be valid', async () => {
    const bearerToken =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
    const result = await bearerTokenValidator.validate({ bearerToken });
    expect(result.isFailure).toBeTruthy();
    expect(result.getValue()).toEqual(createValidationErrors({ bearerToken: 'Token must be of type bearer token' }));
  });
});
