import { createValidationErrors } from '../../../core/domain/ModelValidator';
import { ClientValidator } from './ClientValidator';
describe('Client Validator Test', () => {
  const clientValidator = new ClientValidator();
  test('Client should be valid', async () => {
    const client = {
      name: 'Test',
      description: undefined,
    };
    const result = await clientValidator.validate(client);
    expect(result.isSuccess).toBeTruthy();
  });
  test('Client should not be valid', async () => {
    const client = {
      name: undefined,
      description: undefined,
    };
    const result = await clientValidator.validate(client);
    expect(result.isFailure).toBeTruthy();
    expect(result.getValue()).toEqual(createValidationErrors({ name: 'Name is required' }));
  });
});
