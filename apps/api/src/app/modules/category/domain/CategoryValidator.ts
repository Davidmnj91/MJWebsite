import * as Yup from 'yup';
import { ModelValidator } from '../../../core/domain/ModelValidator';
import { CategoryMutation } from './CategoryMutations';

class CategoryValidator extends ModelValidator<CategoryMutation> {
  protected readonly schema = Yup.object({
    name: Yup.string().required('Name is required'),
    /* children: Yup.object().when(['parent_id', 'children'], (category) => {
      return Yup.boolean().test(
        'Depth <= 2',
        'Category tree depth cannot exceed 2',
        () => category.parent_id && category.children.length
      );
    }), */
    cover: Yup.object().required('Cover is required'),
  });
}

export const categoryValidator = new CategoryValidator();
