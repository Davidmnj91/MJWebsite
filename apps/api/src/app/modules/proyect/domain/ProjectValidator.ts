import * as Yup from 'yup';
import { ModelValidator } from '../../../core/domain/ModelValidator';
import { ProjectMutation } from './ProjectMutations';

class ProjectValidator extends ModelValidator<ProjectMutation> {
  protected readonly schema = Yup.object({
    name: Yup.string().required('Name is required'),
    client: Yup.object().required('Client is required'),
    category: Yup.object().required('Category is required'),
    cover: Yup.object().required('Cover is required'),
  });
}

export const projectValidator = new ProjectValidator();
