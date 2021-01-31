import { CategoryProps } from '@mj-website/api-interfaces';

export type CategoryMutation = Omit<CategoryProps, 'cover'>;
