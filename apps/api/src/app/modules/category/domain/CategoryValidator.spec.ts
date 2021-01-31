import { createValidationErrors } from '../../../core/domain/ModelValidator';
import { CategoryValidator } from './CategoryValidator';
describe('Category Validator Test', () => {
  const categoryValidator = new CategoryValidator();
  test('Category should be valid', async () => {
    const category = {
      name: 'Test',
      children: [],
      cover: {},
    };
    const result = await categoryValidator.validate(category);
    expect(result.isSuccess).toBeTruthy();
  });
  test('Category should not be valid', async () => {
    const category = {
      name: undefined,
      children: [],
      cover: undefined,
    };
    const result = await categoryValidator.validate(category);
    expect(result.isFailure).toBeTruthy();
    expect(result.getValue()).toEqual(createValidationErrors({ name: 'Name is required', cover: 'Cover is required' }));
  });
});
