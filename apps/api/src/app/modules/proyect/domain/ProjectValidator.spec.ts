import { createValidationErrors } from '../../../core/domain/ModelValidator';
import { ProjectValidator } from './ProjectValidator';
describe('Project Validator Test', () => {
  const projectValidator = new ProjectValidator();
  test('Project should be valid', async () => {
    const project = {
      name: 'Test',
      children: [],
      cover: {},
    };
    const result = await projectValidator.validate(project);
    expect(result.isSuccess).toBeTruthy();
  });
  test('Project should not be valid', async () => {
    const project = {
      name: undefined,
      children: [],
      cover: undefined,
    };
    const result = await projectValidator.validate(project);
    expect(result.isFailure).toBeTruthy();
    expect(result.getValue()).toEqual(createValidationErrors({ name: 'Name is required', cover: 'Cover is required' }));
  });
});
