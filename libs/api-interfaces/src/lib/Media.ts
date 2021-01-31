import { EntityProps, NamedProps } from './BaseModel';

export type FileMediaType = 'PHOTO' | 'VIDEO';

export type MediaProps = {
  type: FileMediaType;
  path: string;
  original_name: string;
  mimeType: string;
} & NamedProps;

export interface Media extends MediaProps, EntityProps {}

export type MediaFile = {
  data: Buffer;
} & MediaProps;
