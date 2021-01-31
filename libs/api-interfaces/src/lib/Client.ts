import { EntityProps, NamedProps } from './BaseModel';

export type ClientProps = {
  description: string;
} & NamedProps;

export interface Client extends ClientProps, EntityProps {}
