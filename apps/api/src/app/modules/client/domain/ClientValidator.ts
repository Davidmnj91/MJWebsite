import { ClientProps } from '@mj-website/api-interfaces';
import * as Yup from 'yup';
import { ModelValidator } from '../../../core/domain/ModelValidator';

class ClientValidator extends ModelValidator<ClientProps> {
  protected readonly schema = Yup.object({
    name: Yup.string().required('Name is required'),
    description: Yup.string(),
  });
}

export const clientValidator = new ClientValidator();
