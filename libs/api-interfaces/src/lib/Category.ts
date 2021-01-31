import { EntityProps, NamedProps } from './BaseModel';
import { Media } from './Media';

export type CategoryProps = {
  parent_id?: Category;
  children?: Category[];
  cover: Media;
} & NamedProps;

export interface Category extends EntityProps, CategoryProps {}

export type CreateCategoryDto = {
  name: string;
  parent_id?: string;
  children_ids: string[];
  cover?: any;
};
