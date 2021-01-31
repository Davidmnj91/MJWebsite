import { Column } from 'typeorm';
import { BaseEntity } from './BaseEntity';

export class NamedEntity extends BaseEntity {
  @Column({ nullable: false, unique: true })
  name: string;
}
