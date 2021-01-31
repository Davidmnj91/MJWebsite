import { EntityProps, NamedProps } from './BaseModel';
import { Category } from './Category';
import { Client } from './Client';
import { Media } from './Media';
import { UpdateRequest } from './Requests';

export type PhotoProps = {
  order: number;
  file: Media;
};
export interface Photo extends EntityProps, PhotoProps {
  project: Project;
}

export type ProjectProps = {
  client: Client;
  category: Category;
  photos: PhotoProps[];
} & NamedProps;

export interface Project extends EntityProps, ProjectProps {}

export type CreateProjectDto = {
  category_id: string;
  client_id: string;
  name: string;
  photos: Array<{ order: number; image: any }>;
  images: any;
};

export type EditProjectDto = {
  category_id: string;
  client_id: string;
  name: string;
  deletedPhotosIds: string[];
  editedPhotos: UpdateRequest<PhotoProps>[];
  addedPhotos: Array<{ order: number; image: any }>;
  images: any;
};
