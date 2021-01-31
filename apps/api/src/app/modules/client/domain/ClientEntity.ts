import { Client } from '@mj-website/api-interfaces';
import { Column, Entity } from 'typeorm';
import { NamedEntity } from '../../../core/domain/NamedEntity';

@Entity()
export class ClientEntity extends NamedEntity implements Client {
  @Column()
  description: string;
}
